import { VE_Template } from "./template";
import { ErrorInfo, VE_StringFormat } from "../utility";
import { StateConst, VE_Fsm, VE_State, VE_StateAction, VE_AssociatedState } from "../state";
import { GameObject } from "../babylon";
import { VE_Objects, VeryEngineObject } from "../object";
import { VE_Manager } from "../manager";
import { VeryVarManager, IVeryVar, VeryString, VeryBool, VarTools, VE_Variables, VeryExpression } from "../variables";
import { VE_FsmData, VE_StateData, VE_StateTriggerData, VE_StateActionData } from "../dataSource";
import { VE_Expressions, IExpression } from "../expression";
import { VE_Triggers, VE_TriggerBehaviour, VE_CustomTriggerManager } from "../trigger";
import { Trigger_Custom } from "../library/trigger";
import { VE_Actions, VE_ActionBehaviour, VE_Assignment } from "../action";
import { StateActionType, AssignType } from "../enum";
import { VerySceneVariables } from "../scene";
import { VE_AssignmentTypeJudge } from "../action/assignmentTypeJudge";

export class VE_Templates {

  public get projectName(): string {
    return this._projectName;
  }
  private _projectName: string = '';

  private _templateDic: { [key: string]: VE_Template } = {};

  private _instanceDic: { [key: string]: { [key: string]: VE_Template } } = {};

  // 当一个模板创建多份时，若之前模板没有被删除，会导致其生命周期时空
  private _instanceArray: { [key: string]: { [key: string]: VE_Template[] } } = {};


  constructor(project_name: string) {
    this._projectName = project_name;
  }

  public isCreatedTemplate(template_id: string): boolean {
    if (this._templateDic[template_id]) {
      return true;
    } else {
      return false;
    }
  }

  public addTemplate(template_id: string, template: VE_Template): void {
    this._templateDic[template_id] = template;
  }

  public getTemplate(template_id: string): VE_Template {
    return this._templateDic[template_id];
  }

  public isCreatedInstance(object_id: string, var_id: string): boolean {
    if (this._instanceDic[object_id] && this._instanceDic[object_id][var_id]) {
      return true;
    } else {
      return false;
    }
  }

  public getInstance(object_id: string, var_id: string): VE_Template {
    return this._instanceDic[object_id][var_id];
  }

  // public getState(var_id: string, state_id: string, index: number): VE_State {

  // } 

  public clear(): void {
    if (this._templateDic) {
      Object.keys(this._templateDic).forEach(key => {
        this._templateDic[key].clear();
      })
      this._templateDic = {};
    }
  }

  // TODO
  public createInstance(object_id: string, var_id: string, template: VE_Template, object_name: string, error_info: ErrorInfo, destory_on_create_new: boolean): Nullable<VE_Template> {

    let errorPos: string = "错误定位信息：（项目：" + this._projectName + "，对象：" + object_id + "，模板变量：" + var_id + "，模板名：" + template.templateID + "）";

    // 若当前已有实例，则先删除
    if (template.templateInstance !== null && destory_on_create_new) {
      template.templateInstance.unload();
      template.unload();
    }

    // （1）创建GameObject，3种情况，1、实例化当前场景中已有的模型，直接写物体名；2、Resources目录下的Prefab物体，prefab：前缀 + 实际路径；3、创建空物体，不填或者“null”；
    let gameObject: Nullable<GameObject> = null;
    let hasCreated: boolean = false;
    let newObjectID: string = template.templateID + "_" + var_id.replace(StateConst.VARIABLE_SYMBOL, "");
    if (object_name === '' || object_name.toLowerCase() === "null" || object_name.toLowerCase() === "none") {
      gameObject = new GameObject(newObjectID + "_Empty");
      hasCreated = true;
    }
    else {
      gameObject = GameObject.Find(object_name);
      if (gameObject === null) {
        error_info.isRight = false;
        error_info.message = "模板对象实例化失败：无法在场景中查找到对应名字的物体，也无法以预制件在Resources文件夹中加载，物体名：" + object_name + "！" + errorPos;
        return null;
      }
      // TODO: 无prefab类似结构
      /*
      try {
        gameObject = Resources.Load(object_name) as GameObject;
        if (gameObject == null) {
          gameObject = GameObjectTools.FindGameObject(object_name);
          if (gameObject == null) {
            error_info = "模板对象实例化失败：无法在场景中查找到对应名字的物体，也无法以预制件在TResources文件夹中加载，物体名：" + object_name + "！" + errorPos;
            return null;
          }
        }
      }
      catch
      {
        gameObject = GameObjectTools.FindGameObject(object_name);
        if (gameObject == null) {
          error_info = "模板对象实例化失败：无法在场景中查找到对应名字的物体，也无法以预制件在TResources文件夹中加载，物体名：" + object_name + "！" + errorPos;
          return null;
        }
      }
      */
    }
    // 实例化物体，物体为场景中的物体
    if (!hasCreated) {
      gameObject = GameObject.CreateInstance(gameObject);
    }
    // gameObject!.SetActive(true);
    gameObject!.name += "_" + template.counter;
    newObjectID += "_" + template.counter;
    template.increase();
    // 创建Object
    let instance: VeryEngineObject = new VeryEngineObject(this._projectName, newObjectID, gameObject!);
    template.addInstance(instance);
    instance.template = template;

    let objects: VE_Objects = VE_Manager.objects(this._projectName);
    // 添加新对象，以便于变量查找
    objects.add(newObjectID, instance);

    // 回调函数，销毁时删除Objects中的数据
    instance.setUnloadCallback(objects.unloadObject.bind(objects));

    // （2）根据Template信息，重新创建对象
    // 1）变量，判断，1.普通变量；2.公式；3.模板变量；公式挪后处理
    for (let i: number = 0; i < template.varData.count; i++) {
      let varID: string = template.varData.getVariableID(i);
      let varPara: string[] = template.varData.getVariableParas(varID);
      // 判断，1.普通变量；2.公式；3.模板变量；
      // 1.公式
      if (varPara[0] === "公式" || varPara[0].toLowerCase() === "expression") {
        continue;
      }
      // 2.普通IVeryVar变量
      else if (VeryVarManager.hasVarType(varPara[0])) {
        let errorInfo: ErrorInfo = new ErrorInfo();
        let newVar: Nullable<IVeryVar> = VeryVarManager.createVariable(varID, varPara[0], varPara[1], errorInfo);
        // TODO: List判定
        // if (isRight && newVar.VarType == VeryList._varType) {
        //   ((VeryList)newVar ).SetChildValue(this._projectName, newObjectID, ref isRight, ref errorInfo);
        // }
        // // TODO: Dictionary判定
        // if (isRight && newVar.VarType == VeryDictionary._varType) {
        //   ((VeryDictionary)newVar ).SetChildValue(this._projectName, newObjectID, ref isRight, ref errorInfo);
        // }
        if (!errorInfo.isRight || newVar === null) {
          error_info.isRight = false;
          error_info.message = "模板对象实例化失败：局部变量创建失败，局部变量：" + varID + "，" + varPara[0] + "，" + varPara[1] + "，错误信息：" + errorInfo.message + "！" + errorPos;
          return null;
        }
        else {
          instance.addVariable(varID, newVar);
        }
      }
      // 3.模板变量
      else if (this.isCreatedTemplate(varPara[0])) {
        instance.addTemplate(varID, this.getTemplate(varPara[0]).clone(newObjectID, varID));
      }
      // 未知错误
      else {
        error_info.isRight = false;
        error_info.message = "模板对象实例化失败：局部变量创建失败，当前变量不存在，局部变量：" + varID + "," + varPara[0] + "," + varPara[1] + "！" + errorPos;
        return null;
      }
    }

    // 2）状态机，状态变量创建
    for (let i: number = 0; i < template.dataSource.fsmCount; i++) {
      let fsmID: string = template.dataSource.getFsmID(i);
      let fsmData: VE_FsmData = template.dataSource.getFsmData(fsmID);
      // 创建状态变量，目前默认为string变量
      let newVar: VeryString = new VeryString();
      newVar.setValue(fsmData.initialValStr);
      // 状态机
      let fsm: VE_Fsm = new VE_Fsm(this.projectName, newObjectID, fsmID, newVar, instance);
      instance.addFsm(fsmID, fsm);
    }

    // 3）公式初始化
    for (let i: number = 0; i < template.varData.count; i++) {
      let varID: string = template.varData.getVariableID(i);
      let varPara: string[] = template.varData.getVariableParas(varID);
      // 判断，1.普通变量；2.公式；3.模板变量；
      // 1.公式
      if (varPara[0] === "公式" || varPara[0].toLowerCase() === "expression") {
        // 公式之间以从前到后的解析顺序变异，若前面的公式引用了后面的公式，会直接报错
        let errorInfo: ErrorInfo = new ErrorInfo();
        let localExp: IExpression = VE_Expressions.createLocalExpression(varID, varPara[1], this._projectName, newObjectID, errorInfo);
        if (!errorInfo.isRight || localExp === null) {
          error_info.isRight = false;
          error_info.message = "模板对象实例化失败：局部变量创建失败，公式创建错误：\n" + errorInfo.message + "，请检查！" + errorPos;
          return null;
        } else {
          instance.addExpression(varID, localExp);
        }
      }
      else {
        continue;
      }
    }

    // UGUI初始化

    // 4）触发，创建
    for (let i: number = 0; i < template.dataSource.triggerCount; i++) {
      let triggerID: string = template.dataSource.getTriggerID(i);
      let triggerPara: string[] = template.dataSource.getTriggerPara(triggerID);
      if (!VE_Triggers.hasTrigger(triggerPara[0])) {
        error_info.isRight = false;
        error_info.message = "模板对象实例化失败：当前系统中不存在该触发类型，触发：" + triggerID + "类型：" + triggerPara[0] + "，请检查！" + errorPos;
        return null;
      }
      let errorInfo: ErrorInfo = new ErrorInfo();
      let trigger: Nullable<VE_TriggerBehaviour> = VE_Triggers.createTrigger(instance, triggerID, triggerPara[0], triggerPara.slice(1), errorInfo);
      if (!errorInfo.isRight || trigger === null) {
        error_info.isRight = false;
        error_info.message = "模板对象实例化失败：触发创建错误，触发：" + triggerID + "，原因：" + errorInfo + "，请检查！" + errorPos;
        return null;
      } else {
        // 自定义触发特殊处理
        if (trigger.className === "Trigger_Custom") {
          VE_CustomTriggerManager.AddTriggerEvent(this._projectName, newObjectID, triggerID, ((<Trigger_Custom>trigger).customEvent).bind(trigger));
        }
        instance.addTrigger(triggerID, trigger);
      }
    }

    // 5）响应，创建
    for (let i: number = 0; i < template.dataSource.actionCount; i++) {
      let actionID: string = template.dataSource.getActionID(i);
      let actionPara: string[] = template.dataSource.getActionPara(actionID);
      if (!VE_Actions.hasAction(actionPara[0])) {
        error_info.isRight = false;
        error_info.message = "模板对象实例化失败：当前系统中不存在该响应类型，响应：" + actionID + "类型：" + actionPara[0] + "，请检查！" + errorPos;
        return null;
      }
      let errorInfo: ErrorInfo = new ErrorInfo();
      let action: Nullable<VE_ActionBehaviour> = VE_Actions.createAction(instance, actionID, actionPara[0], actionPara.slice(1), template.dataSource.getActionInitVal(actionID), errorInfo);
      if (!errorInfo.isRight || action === null) {
        error_info.isRight = false;
        error_info.message = "模板对象实例化失败：响应创建错误，响应：" + actionID + "，错误信息：" + errorInfo + "，请检查！" + errorPos;
        return null;
      }
      instance.addAction(actionID, action);
    }

    // 6）状态机，状态机信息关联：触发关联 + 响应关联 + 状态赋值
    for (let i: number = 0; i < template.dataSource.fsmCount; i++) {
      let fsmID: string = template.dataSource.getFsmID(i);
      let fsmData: VE_FsmData = template.dataSource.getFsmData(fsmID);
      // 状态机
      let fsm: VE_Fsm = instance.getFsm(fsmID);
      // 状态信息关联：触发激活条件，触发，逻辑表达式，状态值计算公式，响应，关联状态
      for (let p: number = 0; p < fsmData.count; p++) {
        let stateData: VE_StateData = fsmData.getStateData(p);
        let state: VE_State = new VE_State(fsm, fsm.count + 1);
        // 状态值，判断状态值不能重复，状态值为常量字符串
        state.setConstValue(stateData.ValStr);

        // // 状态值
        // if (stateData.IsInitialValue) {
        //   state.SetInitialValue(fsm.FsmVar.GetValue());
        // }
        // else {
        //   //状态赋值处理
        //   if (!StateAssignment(this._projectName, newObjectID, fsmID, VE_Manager.Variables(this._projectName), instance, fsm, stateData, state, ref error_info)) {
        //     error_info += errorPos;
        //     return null;
        //   }
        // }

        // 响应是否顺序运行
        if (stateData.isSequence) {
          state.setSequence();
        }

        // 关联状态条件
        if (stateData.logicalExp !== '') {
          let errorInfo: ErrorInfo = new ErrorInfo();
          let logicalExp: IExpression = VE_Expressions.createFsmExpression('', stateData.logicalExp, this._projectName, newObjectID, fsmID, errorInfo);
          if (!errorInfo.isRight || logicalExp === null) {
            error_info.isRight = false;
            error_info.message = "模板对象实例化失败：状态逻辑表达式：" + stateData.logicalExp + "，逻辑表达式创建失败，公式创建错误：\n：" + errorInfo.message + "，状态：" + fsmID + "，请检查！" + errorPos;
            return null;
          }
          state.logicalAssociated = logicalExp;
        }

        // 触发信息关联
        for (let s: number = 0; s < stateData.triggerCount; s++) {
          let triggerData: VE_StateTriggerData = stateData.getTrigger(s);
          // 可能为当前对象，也可能是其他对象上的触发
          let trigger: Nullable<VE_TriggerBehaviour> = VE_Triggers.findTrigger(instance, triggerData.triggerID);
          if (trigger === null) {
            error_info.isRight = false;
            error_info.message = "模板对象实例化失败：当前触发无法在模板对象中查找到，触发ID：" + triggerData.triggerID + "，状态：" + fsmID + "，请检查！" + errorPos;
            return null;
          }
          // 逻辑条件
          let logicalExp: Nullable<IExpression> = null;
          if (triggerData.logicalExp !== '') {
            // 状态逻辑表达式
            let errorInfo: ErrorInfo = new ErrorInfo();
            logicalExp = VE_Expressions.createFsmExpression('', triggerData.logicalExp, this._projectName, newObjectID, fsmID, errorInfo);
            if (!errorInfo.isRight || logicalExp === null) {
              error_info.isRight = false;
              error_info.message = "模板对象实例化失败：状态逻辑表达式：" + triggerData.logicalExp + "，逻辑表达式创建失败，公式创建错误：\n：" + errorInfo.message + "，状态：" + fsmID + "，请检查！" + errorPos;
              return null;
            }
          }
          trigger.addTriggerTarget(logicalExp, state);

          // 触发启动条件
          if (triggerData.logicalSwitch !== '') {
            // 触发启动条件
            let errorInfo: ErrorInfo = new ErrorInfo();
            let logicalSwitch: IExpression = VE_Expressions.createFsmExpression('', triggerData.logicalSwitch, this._projectName, newObjectID, fsmID, errorInfo);
            if (logicalSwitch == null) {
              error_info.isRight = false;
              error_info.message = "模板对象实例化失败：触发启动条件：" + triggerData.logicalSwitch + "，触发启动条件创建失败，公式创建错误：\n" + errorInfo.message + "状态：" + fsmID + "，请检查！" + errorPos;
              return null;
            }
            trigger.addLogicalSwitch(logicalSwitch);
          }
        }
        // 响应信息关联
        for (let s: number = 0; s < stateData.actionCount; s++) {
          let actionData: VE_StateActionData = stateData.getAction(s);
          // 正常响应
          if (actionData.type === StateActionType.Action) {
            // 可能为当前对象，也可能是其他对象上的响应
            let action: Nullable<VE_ActionBehaviour> = VE_Actions.findAction(instance, actionData.actionID);
            if (action === null) {
              error_info.isRight = false;
              error_info.message = "模板对象实例化失败：当前响应无法在模板对象中查找到，响应ID：" + actionData.actionID + "，状态：" + fsmID + "，请检查！" + errorPos;
              return null;
            }

            // 响应参数，目前默认只支持常量（两个bool值理论上可以为常量或者变量和公式值引用）
            // 启动标志
            let errorInfo: ErrorInfo = new ErrorInfo();
            let enableVar: Nullable<IVeryVar> = null;
            let enableStr: string = actionData.enabled.trim().toLowerCase();
            if (enableStr === 'false' || enableStr === '停止') {
              enableVar = new VeryBool();
              enableVar.setValue(false);
            } else if (enableStr === 'true' || enableStr === '启动') {
              enableVar = new VeryBool();
              enableVar.setValue(true);
            } else {
              // 支持变量：（1）*变量名；（2）对象名.*变量名；注意：必须返回boolean
              if (actionData.enabled.indexOf(StateConst.VARIABLE_SYMBOL) > -1) {
                errorInfo.clear();
                enableVar = VarTools.GetVeryVarWithExpression(this.projectName, newObjectID, actionData.enabled, errorInfo);
                if (!errorInfo.isRight || enableVar === null) {
                  error_info.isRight = false;
                  error_info.message = "模板对象实例化失败：响应启动参数格式不正确，错误信息：" + errorInfo.message + "，请检查！" + errorPos;
                  return null;
                }
                if (enableVar.varType !== 'bool') {
                  error_info.isRight = false;
                  error_info.message = "模板对象实例化失败：响应启动参数变量必须返回bool值类型，当前变量类型：" + enableVar.varType + "，请检查！" + errorPos;
                  return null;
                }
              } else {
                error_info.isRight = false;
                error_info.message = "模板对象实例化失败：响应启动参数允许填写格式为：“启动/true”、“停止/false”、“*变量名”、“对象名.*变量名”，且变量不能为模板变量，且变量返回值必须为bool值，当前参数不符合，参数为：" + actionData.enabled + "，请检查！" + errorPos;
                return null;
              }
            }

            // 每帧运行
            let everyFrameVar: Nullable<IVeryVar> = null;
            let everyFrameStr: string = actionData.everyFrame.trim().toLowerCase();
            if (everyFrameStr === 'false' || everyFrameStr === '一次') {
              everyFrameVar = new VeryBool();
              everyFrameVar.setValue(false);
            } else if (everyFrameStr === 'true' || everyFrameStr === '持续') {
              everyFrameVar = new VeryBool();
              everyFrameVar.setValue(true);
            } else {
              // 支持变量：（1）*变量名；（2）对象名.*变量名；注意：必须返回boolean
              if (actionData.everyFrame.indexOf(StateConst.VARIABLE_SYMBOL) > -1) {
                errorInfo.clear();
                everyFrameVar = VarTools.GetVeryVarWithExpression(this.projectName, newObjectID, actionData.everyFrame, errorInfo);
                if (!errorInfo.isRight || everyFrameVar === null) {
                  error_info.isRight = false;
                  error_info.message = "模板对象实例化失败：响应帧循环参数格式不正确，错误信息：" + errorInfo.message + "，请检查！" + errorPos;
                  return null;
                }
                if (everyFrameVar.varType !== 'bool') {
                  error_info.isRight = false;
                  error_info.message = "模板对象实例化失败：响应帧循环参数变量必须返回bool值类型，当前变量类型：" + everyFrameVar.varType + "，请检查！" + errorPos;
                  return null;
                }
              } else {
                error_info.isRight = false;
                error_info.message = "模板对象实例化失败：响应帧循环参数允许填写格式为：“持续/true”、“一次/false”、“*变量名”、“对象名.*变量名”，且变量不能为模板变量，且变量返回值必须为bool值，当前参数为：" + actionData.everyFrame + "，请检查！" + errorPos;
                return null;
              }
            }

            //顺序运行
            let isSequenceStr: string = actionData.isSequence.trim().toLowerCase();
            let isSequence: boolean = false;
            if (isSequenceStr === 'false' || isSequenceStr === '同时') {
              isSequence = false;
            } else if (isSequenceStr === 'true' || isSequenceStr === '依次') {
              isSequence = true;
            } else {
              error_info.isRight = false;
              error_info.message = "模板对象实例化失败：响应依次运行状态允许填写格式为：“同时/false”、“依次/true”，不允许填写变量，当前参数为：" + actionData.everyFrame + "，请检查！" + errorPos;
              return null;
            }

            // 创建状态响应
            let stateAction: VE_StateAction = new VE_StateAction();
            stateAction.setAction(action, enableVar, everyFrameVar, isSequence);
            state.addAction(stateAction);
          }

          // 赋值
          else {
            // 赋值响应
            if (!this.assignmentAction(this._projectName, newObjectID, fsmID, VE_Manager.variables(this._projectName), instance, actionData, state, error_info)) {
              error_info.message += errorPos;
              return null;
            }
          }
        }

        /* 
        // 关联状态
        if (fsm.isCreatedState(stateData.StateIndex)) {
          error_info = "模板对象实例化失败：当前关联ID已创建，请勿重复创建，状态：" + fsmID + "，状态赋值：" + stateData.ValStr + "，请检查！";
          return null;
        }
        else {
          fsm.addState(state, stateData.stateIndex);
        }
        */

      }
    }

    // 7）状态机，状态机信息关联：关联状态信息关联
    for (let i: number = 0; i < template.dataSource.fsmCount; i++) {
      let fsmID: string = template.dataSource.getFsmID(i);
      let fsmData: VE_FsmData = template.dataSource.getFsmData(fsmID);
      // 状态机
      let fsm: VE_Fsm = instance.getFsm(fsmID);
      // 状态信息关联：触发激活条件，触发，逻辑表达式，状态值计算公式，响应，关联状态
      for (let p: number = 0; p < fsmData.count; p++) {
        let stateData: VE_StateData = fsmData.getStateData(p);
        let state: Nullable<VE_State> = fsm.getStateInSequence(p);

        // 关联状态信息关联
        for (let s: number = 0; s < stateData.associatedStateCount; s++) {
          let associatedStateInfo: string = stateData.getAssociatedState(s);
          let associatedState: VE_AssociatedState = new VE_AssociatedState(state!);
          let multipleAssociatedState: string[] = associatedStateInfo.split(/,|，/);

          for (let www: number = 0; www < multipleAssociatedState.length; www++) {
            associatedStateInfo = multipleAssociatedState[www].trim();

            let stateValue: string = StateConst.STATE_VALUE;

            let strArray: string[] = associatedStateInfo.split('=');
            if (strArray.length === 1) {
            }
            else if (strArray.length === 2) {
              stateValue = strArray[1].trim();
            }
            else {
              error_info.isRight = false;
              error_info.message = "当前关联状态格式错误，应为“状态名 = 状态值”的形式，请检查！" + errorPos;
              return null;
            }

            // 1. 状态名√
            // 2. 对象名.状态名√
            // 3. *模板变量.状态名√
            // 4. 对象名.*局部模板变量.状态名√

            let aFsmID: string = strArray[0].trim();
            if (aFsmID.indexOf(StateConst.STATE_SEPARATOR) > -1) {
              let stateArray: string[] = aFsmID.split(StateConst.STATE_SEPARATOR[0]);
              for (let q: number = 0; q < stateArray.length; q++) {
                stateArray[q] = stateArray[q].trim();
              }
              // √对象名.*局部模板变量.状态名
              if (stateArray.length === 3) {
                if (objects.isCreated(stateArray[0])) {
                  let aObject: VeryEngineObject = objects.getVeryObject(stateArray[0]);
                  if (stateArray[1].startsWith(StateConst.VARIABLE_SYMBOL)) {
                    let varID: string = stateArray[1].substring(1);
                    if (aObject.isCreatedTemplate(varID)) {
                      let aTemplate: VE_Template = aObject.getTemplate(varID);
                      if (aTemplate.dataSource.isCreatedFsm(stateArray[2])) {
                        associatedState.addTemplate(aTemplate, stateArray[2], stateValue, errorPos);
                        //VE_AssociatedState associatedState = new VE_AssociatedState(state, aTemplate, stateArray[2], stateIndex);
                        //state.AddAssociatedState(associatedState);
                      }
                      else {
                        error_info.isRight = false;
                        error_info.message = "模板对象实例化失败：当前关联状态格式错误，当前为“对象名.*模板变量.状态名”形式，在当前对象的该模板变量中无法查找到对应状态名，状态：" + fsmID + "，关联状态：" + associatedStateInfo + "，请检查！" + errorPos;
                        return null;
                      }
                    }
                    else {
                      error_info.isRight = false;
                      error_info.message = "模板对象实例化失败：当前关联状态格式错误，当前为“对象名.*模板变量.状态名”形式，在当前对象中无法查找到该模板变量，状态：" + fsmID + "，关联状态：" + associatedStateInfo + "，请检查！" + errorPos;
                      return null;
                    }
                  }
                  else {
                    error_info.isRight = false;
                    error_info.message = "模板对象实例化失败：当前关联状态格式错误，当前为“对象名.*模板变量.状态名”形式，模板变量填写格式不正确，状态：" + fsmID + "，关联状态：" + associatedStateInfo + "，请检查！" + errorPos;
                    return null;
                  }
                }
                else {
                  error_info.isRight = false;
                  error_info.message = "模板对象实例化失败：当前关联状态格式错误，当前为“对象名.*模板变量.状态名”形式，在当前系统中无法查找到该对象名，状态：" + fsmID + "，关联状态：" + associatedStateInfo + "，请检查！" + errorPos;
                  return null;
                }

                error_info.isRight = false;
                error_info.message = "模板对象实例化失败：当前关联状态格式错误，应为“（1）状态名（2）对象名.状态名（3）*模板变量.状态名（4）对象名.*局部模板变量.状态名”几种形式，当前不符合，无法解析，状态：" + fsmID + "，关联状态：" + associatedStateInfo + "，请检查！" + errorPos;
                return null;
              }
              else if (stateArray.length === 2) {
                let aObjectID: string = stateArray[0].trim();
                aFsmID = stateArray[1].trim();
                // *模板变量.状态名
                if (aObjectID.startsWith(StateConst.VARIABLE_SYMBOL)) {
                  aObjectID = aObjectID.substring(1);
                  if (instance.isCreatedTemplate(aObjectID)) {
                    let aTemplate: VE_Template = instance.getTemplate(aObjectID);
                    if (aTemplate.dataSource.isCreatedFsm(stateArray[1])) {
                      associatedState.addTemplate(aTemplate, stateArray[1], stateValue, errorPos);
                      //VE_AssociatedState associatedState = new VE_AssociatedState(state, aTemplate, stateArray[1], stateIndex);
                      //state.AddAssociatedState(associatedState);
                    }
                    else {
                      error_info.isRight = false;
                      error_info.message = "模板对象实例化失败：当前关联状态格式错误，当前为“*模板变量.状态名”形式，在当前模板变量中无法查找到对应状态名，状态：" + fsmID + "，关联状态：" + associatedStateInfo + "，请检查！" + errorPos;
                      return null;
                    }
                  }
                  else {
                    let globalVars: VE_Variables = VE_Manager.variables(this._projectName);
                    if (globalVars.isCreatedTemplate(aObjectID)) {
                      let aTemplate: VE_Template = globalVars.getTemplate(aObjectID);
                      if (aTemplate.dataSource.isCreatedFsm(stateArray[1])) {
                        associatedState.addTemplate(aTemplate, stateArray[1], stateValue, errorPos);
                        //VE_AssociatedState associatedState = new VE_AssociatedState(state, aTemplate, stateArray[1], stateIndex);
                        //state.AddAssociatedState(associatedState);
                      }
                      else {
                        error_info.isRight = false;
                        error_info.message = "模板对象实例化失败：当前关联状态格式错误，当前为“*模板变量.状态名”形式，在当前模板变量中无法查找到对应状态名，状态：" + fsmID + "，关联状态：" + associatedStateInfo + "，请检查！" + errorPos;
                        return null;
                      }
                    }
                    else {
                      error_info.isRight = false;
                      error_info.message = "模板对象实例化失败：当前关联状态格式错误，当前为“*模板变量.状态名”形式，在当前模板变量中无法查找到该“*模板变量”，状态：" + fsmID + "，关联状态：" + associatedStateInfo + "，请检查！" + errorPos;
                      return null;
                    }
                  }
                }
                // √对象名.状态名
                else {
                  let aObject: VeryEngineObject = objects.getVeryObject(aObjectID);
                  if (aObject === null) {
                    error_info.isRight = false;
                    error_info.message = "模板对象实例化失败：当前关联状态格式错误，当前关联状态填写格式为“对象名.状态名”，当前系统中无法查找到该对象名，状态：" + fsmID + "，关联状态：" + associatedStateInfo + "，请检查！" + errorPos;
                    return null;
                  }
                  let aFsm: VE_Fsm = aObject.getFsm(aFsmID);
                  if (aFsm === null) {
                    error_info.isRight = false;
                    error_info.message = "模板对象实例化失败：当前关联状态格式错误，当前关联状态填写格式为“对象名.状态名”，当前对象名所对应的对象中无法查找到该状态名，状态：" + fsmID + "，关联状态：" + associatedStateInfo + "，请检查！" + errorPos;
                    return null;
                  }
                  let toState: Nullable<VE_State> = aFsm.getState(stateValue);
                  if (toState === null) {
                    error_info.isRight = false;
                    error_info.message = "模板对象实例化失败：当前关联状态格式错误，当前关联状态填写格式为“对象名.状态名”，当前关联状态序号超出对应状态序号范围，状态：" + fsmID + "，关联状态：" + associatedStateInfo + "，请检查！" + errorPos;
                    return null;
                  }
                  associatedState.add(toState, stateValue, errorPos);
                  //VE_AssociatedState associatedState = new VE_AssociatedState(state, toState);
                  //state.AddAssociatedState(associatedState);
                }
              }
              else {
                error_info.isRight = false;
                error_info.message = "模板对象实例化失败：当前关联状态格式错误，应为“（1）状态名（2）对象名.状态名（3）*模板变量.状态名（4）对象名.*局部模板变量.状态名”几种形式，当前不符合，无法解析，状态：" + fsmID + "，关联状态：" + associatedStateInfo + "，请检查！" + errorPos;
                return null;
              }
            }
            // 状态名
            else {
              let aFsm: VE_Fsm = instance.getFsm(aFsmID);
              if (aFsm === null) {
                error_info.isRight = false;
                error_info.message = "模板对象实例化失败：当前关联状态格式错误，当前为“状态名”形式，无法查找到该状态，状态：" + fsmID + "，关联状态：" + associatedStateInfo + "，请检查！" + errorPos;
                return null;
              }
              let toState: Nullable<VE_State> = aFsm.getState(stateValue);
              if (toState === null) {
                error_info.isRight = false;
                error_info.message = "模板对象实例化失败：当前关联状态格式错误，当前为“状态名”形式，可以查找到对象和状态，但是状态序号超出范围，状态：" + fsmID + "，关联状态：" + associatedStateInfo + "，请检查！" + errorPos;
                return null;
              }
              associatedState.add(toState, stateValue, errorPos);
              //VE_AssociatedState associatedState = new VE_AssociatedState(state, toState);
              //state.AddAssociatedState(associatedState);
            }
          }

          state!.addAssociatedState(associatedState);
        }
      }
    }


    return template;
  }

  private assignmentAction(project_name: string, object_id: string, fsm_id: string, global_vars: VE_Variables, very_object: VeryEngineObject, action_data: VE_StateActionData, state: VE_State, error_info: ErrorInfo): boolean {
    // 赋值
    let assignment: VE_Assignment = new VE_Assignment(state, action_data.totalString);
    let varID: string = action_data.varID;
    // Debug.LogWarning("赋值响应：" + action_data.TotalString);
    // （1）等号左侧： 变量必须为普通变量，允许格式：（1）*变量；（2）对象名.*变量；（3）*模板变量.*变量；（4）对象名.*模板变量.*变量；
    if (varID.indexOf(StateConst.VARIABLE_SYMBOL) > -1)  // 变量或者公式
    {
      if (varID.indexOf(StateConst.STATE_SEPARATOR) > -1) {
        let valArray: string[] = varID.split(StateConst.STATE_SEPARATOR);
        for (let q: number = 0; q < valArray.length; q++) {
          valArray[q] = valArray[q].trim();
        }
        // 对象名.*变量 or *模板变量.*变量
        if (valArray.length === 2) {
          // *模板变量.*变量，当前未实例化，只做前期语法检测，然后记录参数到状态，状态使用时，动态读取
          if (valArray[0].startsWith(StateConst.VARIABLE_SYMBOL)) {
            let templateVarID: string = valArray[0].substring(1);
            varID = valArray[1].substring(1);
            if (very_object.isCreatedTemplate(templateVarID)) {
              let template: VE_Template = very_object.getTemplate(templateVarID);
              if (template.varData.isCreatedVariable(varID)) {
                let varPara: string[] = template.varData.getVariableParas(varID);
                if (varPara[1].toLowerCase() === "expression" || varPara[1].toLowerCase() === "公式") {
                  error_info.isRight = false;
                  error_info.message = "模板对象实例化失败：赋值响应格式错误，当前赋值响应等号左侧格式“*模板变量.*变量”，该变量不能为“公式”，状态：" + fsm_id + "，赋值响应：" + action_data.totalString + "，请检查！";
                  return false;
                }
                else {
                  assignment.setLeftTemplateVar(template, varID);
                }
              }
              else if (template.dataSource.isCreatedFsm(varID)) {
                assignment.setLeftTemplateVar(template, varID);
              }
              else {
                error_info.isRight = false;
                error_info.message = "模板对象实例化失败：赋值响应格式错误，当前赋值响应等号左侧格式“*模板变量.*变量”，当前“*模板变量”可以查找到，但是无法查到对应“*变量”，状态：" + fsm_id + "，赋值响应：" + action_data.totalString + "，请检查！";
                return false;
              }
            }
            else {
              if (global_vars.isCreatedTemplate(templateVarID)) {
                let template: VE_Template = global_vars.getTemplate(templateVarID);
                if (template.varData.isCreatedVariable(varID)) {
                  let varPara: string[] = template.varData.getVariableParas(varID);
                  if (varPara[1].toLowerCase() === "expression" || varPara[1].toLowerCase() === "公式") {
                    error_info.isRight = false;
                    error_info.message = "模板对象实例化失败：赋值响应格式错误，当前赋值响应等号左侧格式“*模板变量.*变量”，该变量不能为“公式”，状态：" + fsm_id + "，赋值响应：" + action_data.totalString + "，请检查！";
                    return false;
                  }
                  else {
                    assignment.setLeftTemplateVar(template, varID);
                  }
                }
                else if (template.dataSource.isCreatedFsm(varID)) {
                  assignment.setLeftTemplateVar(template, varID);
                }
                else {
                  error_info.isRight = false;
                  error_info.message = "模板对象实例化失败：赋值响应格式错误，当前赋值响应等号左侧格式“*模板变量.*变量”，当前“*模板变量”无法在系统中查找到，状态：" + fsm_id + "，赋值响应：" + action_data.totalString + "，请检查！";
                  return false;
                }
              }
              else {
                error_info.isRight = false;
                error_info.message = "模板对象实例化失败：赋值响应格式错误，当前赋值响应等号左侧格式“*模板变量.*变量”，当前“*模板变量”可以查找到，为全局变量，但是无法查到对应“*变量”，状态：" + fsm_id + "，赋值响应：" + action_data.totalString + "，请检查！";
                return false;
              }
            }
          }
          //对象名.*变量
          else {
            let objects: VE_Objects = VE_Manager.objects(project_name);
            if (objects.isCreated(valArray[0])) {
              let aObject: VeryEngineObject = objects.getVeryObject(valArray[0]);
              varID = varID.substring(1);
              if (aObject.isCreatedExpression(varID)) {
                error_info.isRight = false;
                error_info.message = "模板对象实例化失败：赋值响应格式错误，当前赋值响应等号左侧格式“对象名.*变量”，该变量不能为“公式”，状态：" + fsm_id + "，赋值响应：" + action_data.totalString + "，请检查！";
                return false;
              }
              else if (aObject.isCreatedFsm(varID)) {
                let v: IVeryVar = aObject.getFsm(varID).fsmVar;
                assignment.setLeftVariable(v);
              }
              else if (aObject.isCreatedVariable(varID)) {
                let v: IVeryVar = aObject.getVariable(varID);
                assignment.setLeftVariable(v);
              }
              else if (aObject.isCreatedTemplate(varID)) {
                let template: VE_Template = aObject.getTemplate(varID);
                assignment.setLeftTemplate(template);
              }
              else {
                error_info.isRight = false;
                error_info.message = "模板对象实例化失败：赋值响应格式错误，赋值响应等号左侧变量格式“对象名.*变量”，当前“对象名”中无法查找到该变量，状态：" + fsm_id + "，赋值响应：" + action_data.totalString + "，请检查！";
                return false;
              }
            }
            else {
              error_info.isRight = false;
              error_info.message = "模板对象实例化失败：赋值响应格式错误，赋值响应等号左侧变量格式“对象名.*变量”，当前“对象名”无法在系统中查找到，状态：" + fsm_id + "，赋值响应：" + action_data.totalString + "，请检查！";
              return false;
            }
          }
        }
        else if (valArray.length === 3)  // 对象名.*模板变量.*变量
        {
          // 对象名.*模板变量.*变量，当前未实例化，只做前期语法检测，然后记录参数到状态，状态使用时，动态读取
          if (valArray[0].startsWith(StateConst.STATE_SEPARATOR) || !valArray[1].startsWith(StateConst.STATE_SEPARATOR) || !valArray[2].startsWith(StateConst.STATE_SEPARATOR)) {
            error_info.isRight = false;
            error_info.message = "模板对象实例化失败：赋值响应格式错误，赋值响应等号左侧变量格式错误，应为“（1）*变量；（2）对象名.*变量；（3）*模板变量.*变量；（4）对象名.*模板变量.*变量”几种形式，当前不符合，无法解析，状态：" + fsm_id + "，赋值响应：" + action_data.totalString + "，请检查！";
            return false;
          }
          else {
            let templateVarID: string = valArray[1].substring(1);
            varID = valArray[2].substring(1);
            let objects: VE_Objects = VE_Manager.objects(project_name);
            if (objects.isCreated(valArray[0])) {
              let tObject: VeryEngineObject = objects.getVeryObject(valArray[0]);
              if (tObject.isCreatedTemplate(templateVarID)) {
                let template: VE_Template = tObject.getTemplate(templateVarID);
                if (template.dataSource.isCreatedFsm(varID)) {
                  assignment.setLeftTemplateVar(template, varID);
                }
                else if (template.varData.isCreatedVariable(varID)) {
                  let varParas: string[] = template.varData.getVariableParas(varID);
                  if (varParas[1].toLowerCase() === "expression" || varParas[1].toLowerCase() === "公式") {
                    error_info.isRight = false;
                    error_info.message = "模板对象实例化失败：赋值响应格式错误，赋值响应等号左侧变量格式“对象名.*模板变量.*变量”，当前“对象名.*模板变量.*变量”为公式变量，公式变量不可直接赋值，状态：" + fsm_id + "，赋值响应：" + action_data.totalString + "，请检查！";
                    return false;
                  }
                  else {
                    assignment.setLeftTemplateVar(template, varID);
                  }
                }
                else {
                  error_info.isRight = false;
                  error_info.message = "模板对象实例化失败：赋值响应格式错误，赋值响应等号左侧变量格式“对象名.*模板变量.*变量”，当前“对象名.*模板变量”可以查找到，但是无法查到对应“*变量”，状态：" + fsm_id + "，赋值响应：" + action_data.totalString + "，请检查！";
                  return false;
                }
              }
              else {
                error_info.isRight = false;
                error_info.message = "模板对象实例化失败：赋值响应格式错误，赋值响应等号左侧变量格式“对象名.*模板变量.*变量”，当前“对象名”的对象中无法查找到该“*模板变量”，状态：" + fsm_id + "，赋值响应：" + action_data.totalString + "，请检查！";
                return false;
              }
            }
            else {
              error_info.isRight = false;
              error_info.message = "模板对象实例化失败：赋值响应格式错误，赋值响应等号左侧变量格式“对象名.*模板变量.*变量”，当前“对象名”无法在系统中查找到，状态：" + fsm_id + "，赋值响应：" + action_data.totalString + "，请检查！";
              return false;
            }
          }
        }
        else {
          error_info.isRight = false;
          error_info.message = "模板对象实例化失败：赋值响应格式错误，赋值响应等号左侧变量格式错误，应为“（1）*变量；（2）对象名.*变量；（3）*模板变量.*变量；（4）对象名.*模板变量.*变量”几种形式，当前不符合，无法解析，状态：" + fsm_id + "，赋值响应：" + action_data.totalString + "，请检查！";
          return false;
        }
      }
      else // *变量
      {
        varID = varID.substring(1);
        if (very_object.isCreatedExpression(varID)) {
          error_info.isRight = false;
          error_info.message = "模板对象实例化失败：赋值响应格式错误，当前赋值响应等号左侧格式“*变量”，该变量不能为“公式”，状态：" + fsm_id + "，赋值响应：" + action_data.totalString + "，请检查！";
          return false;
        }
        else if (very_object.isCreatedFsm(varID)) {
          let v: IVeryVar = very_object.getFsm(varID).fsmVar;
          assignment.setLeftVariable(v);
        }
        else if (very_object.isCreatedVariable(varID)) {
          let v: IVeryVar = very_object.getVariable(varID);
          assignment.setLeftVariable(v);
        }
        else if (very_object.isCreatedTemplate(varID)) {
          let template: VE_Template = very_object.getTemplate(varID);
          assignment.setLeftTemplate(template);
        }
        else {
          // 全局变量
          if (global_vars.isCreatedExpression(varID)) {
            error_info.isRight = false;
            error_info.message = "模板对象实例化失败：赋值响应格式错误，当前赋值响应等号左侧格式“*变量”，该变量不能为“公式”，状态：" + fsm_id + "，赋值响应：" + action_data.totalString + "，请检查！";
            return false;
          }
          else if (global_vars.isCreatedVariable(varID)) {
            let v: IVeryVar = global_vars.getVariable(varID);
            assignment.setLeftVariable(v);
          }
          else if (global_vars.isCreatedTemplate(varID)) {
            let template: VE_Template = global_vars.getTemplate(varID);
            assignment.setLeftTemplate(template);
          }
          else {
            // 场景变量
            // if (VerySceneVariables.Variables.isCreatedExpression(varID)) {
            //   VE_ErrorManager.Add(VE_Error.Error("", "项目：" + project_name + "，对象：" + object_id + "，状态：" + fsm_id + "，赋值响应：" + action_data.TotalString + "，当前赋值响应等号左侧格式“*变量”，该变量不能为“公式”，请检查！", ""));
            //   return false;
            // }
            // else if (VerySceneVariables.Variables.IsCreatedVariable(varID)) {
            //   IVeryVar v = VerySceneVariables.Variables.GetVariable(varID);
            //   assignment.SetLeft(v);
            // }
            // else {
            //   VE_ErrorManager.Add(VE_Error.Error("", "项目：" + project_name + "，对象：" + object_id + "，状态：" + fsm_id + "，赋值响应：" + action_data.TotalString + "，当前赋值响应等号左侧格式“*变量”，无法在当前系统中查找到该变量，请检查！", ""));
            //   return false;
            // }
            error_info.isRight = false;
            error_info.message = "模板对象实例化失败：赋值响应格式错误，当前赋值响应等号左侧格式“*变量”，无法在当前系统中查找到该变量，状态：" + fsm_id + "，赋值响应：" + action_data.totalString + "，请检查！";
            return false;
          }
        }
      }
    }
    else {
      error_info.isRight = false;
      error_info.message = "模板对象实例化失败：赋值响应格式错误，赋值响应等号左边必须为变量，状态：" + fsm_id + "，赋值响应：" + action_data.totalString + "，请检查！";
      return false;
    }


    // （2）等号右侧： 变量必须为普通变量，允许格式：（1）*变量；（2）对象名.*变量；（3）*模板变量.*变量；（4）对象名.*模板变量.*变量；（5）常量；
    varID = action_data.varValue.trim();

    // 字符串特殊处理
    if (varID.startsWith("\"") || varID.startsWith("'") || varID.startsWith("“") || varID.startsWith("‘")) {
      assignment.setRightConst(varID.substring(1, varID.length - 2).trim());
    }
    else if (VE_StringFormat.isFormulaString(varID))  // 公式处理
    {
      // Debug.LogError(varID);
      let errorInfo: ErrorInfo = new ErrorInfo();
      StateConst.AssignmentFormulaCount++;
      let localExp: IExpression = VE_Expressions.createLocalExpression(StateConst.AssignmentPrefix + StateConst.AssignmentFormulaCount.toString(), varID, project_name, object_id, errorInfo);
      if (!errorInfo.isRight || localExp === null) {
        // errorInfo = "模板对象实例化失败：局部变量创建失败，公式创建错误：\n" + errorInfo + "，请检查！" + errorPos;
        // return null;
        error_info.isRight = false;
        error_info.message = "模板对象实例化失败：赋值响应格式错误，当前赋值响应等号右侧格式“公式”，公式解析错误，请检查！错误信息：" + errorInfo.message;
        return false;
      }
      assignment.setRightVariable(new VeryExpression(localExp));
    }
    else {
      if (varID.indexOf(StateConst.VARIABLE_SYMBOL) > -1)  // 变量或者公式
      {
        if (varID.indexOf(StateConst.STATE_SEPARATOR) > -1) {
          let valArray: string[] = varID.split(StateConst.STATE_SEPARATOR);
          for (let q: number = 0; q < valArray.length; q++) {
            valArray[q] = valArray[q].trim();
          }
          // 对象名.*变量 or *模板变量.*变量
          if (valArray.length === 2) {
            // *模板变量.*变量，当前未实例化，只做前期语法检测，然后记录参数到状态，状态使用时，动态读取
            if (valArray[0].startsWith(StateConst.VARIABLE_SYMBOL)) {
              let templateVarID: string = valArray[0].substring(1);
              varID = valArray[1].substring(1);
              if (very_object.isCreatedTemplate(templateVarID)) {
                let template: VE_Template = very_object.getTemplate(templateVarID);
                if (template.varData.isCreatedVariable(varID) || template.dataSource.isCreatedFsm(varID)) {
                  // 不确定类型，需要在赋值时判断
                  assignment.setRightTemplateVariable(template, varID);
                }
                else {
                  error_info.isRight = false;
                  error_info.message = "模板对象实例化失败：赋值响应格式错误，当前赋值响应等号右侧格式“*模板变量.*变量”，当前“*模板变量”可以查找到，但是无法查到对应“*变量”，状态：" + fsm_id + "，赋值响应：" + action_data.totalString + "，请检查！";
                  return false;
                }
              }
              else {
                if (global_vars.isCreatedTemplate(templateVarID)) {
                  let template: VE_Template = global_vars.getTemplate(templateVarID);
                  if (template.varData.isCreatedVariable(varID) || template.dataSource.isCreatedFsm(varID)) {
                    // 不确定类型，需要在赋值时判断
                    assignment.setRightTemplateVariable(template, varID);
                  }
                  else {
                    error_info.isRight = false;
                    error_info.message = "模板对象实例化失败：赋值响应格式错误，当前赋值响应等号右侧格式“*模板变量.*变量”，当前“*模板变量”可以查找到，但是无法查到对应“*变量”，状态：" + fsm_id + "，赋值响应：" + action_data.totalString + "，请检查！";
                    return false;
                  }
                }
                else {
                  error_info.isRight = false;
                  error_info.message = "模板对象实例化失败：赋值响应格式错误，当前赋值响应等号右侧格式“*模板变量.*变量”，当前“*模板变量”无法在系统中查找到，状态：" + fsm_id + "，赋值响应：" + action_data.totalString + "，请检查！";
                  return false;
                }
              }
            }
            // 对象名.*变量
            else {
              let objects: VE_Objects = VE_Manager.objects(project_name);
              if (objects.isCreated(valArray[0])) {
                let aObject: VeryEngineObject = objects.getVeryObject(valArray[0]);
                varID = varID.substring(1);
                let rightVar: Nullable<IVeryVar> = null;
                let rightTemplate: Nullable<VE_Template> = null;
                if (aObject.isCreatedExpression(varID)) {
                  rightVar = new VeryExpression(aObject.getExpression(varID));
                }
                else if (aObject.isCreatedFsm(varID)) {
                  rightVar = aObject.getFsm(varID).fsmVar;
                }
                else if (aObject.isCreatedVariable(varID)) {
                  rightVar = aObject.getVariable(varID);
                }
                else if (aObject.isCreatedTemplate(varID)) {
                  rightTemplate = aObject.getTemplate(varID);
                }
                else {
                  error_info.isRight = false;
                  error_info.message = "模板对象实例化失败：赋值响应格式错误，当前赋值响应等号右侧格式“对象名.*变量”，当前“对象名”中无法查找到该变量，状态：" + fsm_id + "，赋值响应：" + action_data.totalString + "，请检查！";
                  return false;
                }
                // 赋值合理性判断
                if (rightVar !== null) {
                  if (assignment.leftType === AssignType.Template) {
                    error_info.isRight = false;
                    error_info.message = "模板对象实例化失败：赋值响应格式错误，当前赋值响应等号左侧为“模板变量”类型，右侧为“普通变量”类型，无法赋值，状态：" + fsm_id + "，赋值响应：" + action_data.totalString + "，请检查！";
                    return false;
                  }
                  else if (assignment.leftType === AssignType.Variable) {
                    if (VE_AssignmentTypeJudge.allow(assignment.leftVariable!, rightVar)) {
                      assignment.setRightVariable(rightVar);
                    }
                    else {
                      error_info.isRight = false;
                      error_info.message = "模板对象实例化失败：赋值响应格式错误，当前赋值响应等号右侧格式“对象名.*变量”，当前赋值响应等号左侧和右侧类型不匹配，无法赋值，状态：" + fsm_id + "，赋值响应：" + action_data.totalString + "，请检查！";
                      return false;
                    }
                  }
                  else {
                    // 模板变量，不确定类型
                    assignment.setRightVariable(rightVar);
                  }
                }
                else if (rightTemplate != null) {
                  if (assignment.leftType === AssignType.Template) {
                    assignment.setRightTemplate(rightTemplate);
                  }
                  else {
                    error_info.isRight = false;
                    error_info.message = "模板对象实例化失败：赋值响应格式错误，当前赋值响应等号左侧为“模板变量”，右侧为“普通变量”，无法赋值，状态：" + fsm_id + "，赋值响应：" + action_data.totalString + "，请检查！";
                    return false;
                  }
                }
                else {
                  error_info.isRight = false;
                  error_info.message = "模板对象实例化失败：赋值响应格式错误，当前赋值响应等号右侧格式“对象名.*变量”，当前赋值响应等号右侧数据无法识别，状态：" + fsm_id + "，赋值响应：" + action_data.totalString + "，请检查！";
                  return false;
                }
              }
              else {
                error_info.isRight = false;
                error_info.message = "模板对象实例化失败：赋值响应格式错误，当前赋值响应等号右侧格式“对象名.*变量”，当前“对象名”无法在系统中查找到，状态：" + fsm_id + "，赋值响应：" + action_data.totalString + "，请检查！";
                return false;
              }
            }
          }
          else if (valArray.length === 3)  // 对象名.*模板变量.*变量
          {
            // 对象名.*模板变量.*变量，当前未实例化，只做前期语法检测，然后记录参数到状态，状态使用时，动态读取
            if (valArray[0].startsWith(StateConst.STATE_SEPARATOR) || !valArray[1].startsWith(StateConst.STATE_SEPARATOR) || !valArray[2].startsWith(StateConst.STATE_SEPARATOR)) {
              error_info.isRight = false;
              error_info.message = "模板对象实例化失败：赋值响应格式错误，赋值响应等号右侧变量格式错误，应为“（1）*变量；（2）对象名.*变量；（3）*模板变量.*变量；（4）对象名.*模板变量.*变量”几种形式，当前不符合，无法解析，状态：" + fsm_id + "，赋值响应：" + action_data.totalString + "，请检查！";
              return false;
            }
            else {
              let templateVarID: string = valArray[1].substring(1);
              varID = valArray[2].substring(1);
              let objects: VE_Objects = VE_Manager.objects(project_name);
              if (objects.isCreated(valArray[0])) {
                let tObject: VeryEngineObject = objects.getVeryObject(valArray[0]);
                if (tObject.isCreatedTemplate(templateVarID)) {
                  let template: VE_Template = tObject.getTemplate(templateVarID);
                  // 无法判断是否为公式，需在运行条件下判断
                  if (template.dataSource.isCreatedFsm(varID) || template.varData.isCreatedVariable(varID)) {
                    // 不确定格式是否合理，运行时判断
                    assignment.setRightTemplateVariable(template, varID);
                  }
                  else {
                    error_info.isRight = false;
                    error_info.message = "模板对象实例化失败：赋值响应格式错误，赋值响应等号右侧变量格式“对象名.*模板变量.*变量”，当前“对象名.*模板变量”可以查找到，但是无法查到对应“*变量”，状态：" + fsm_id + "，赋值响应：" + action_data.totalString + "，请检查！";
                    return false;
                  }
                }
                else {
                  error_info.isRight = false;
                  error_info.message = "模板对象实例化失败：赋值响应格式错误，赋值响应等号右侧变量格式“对象名.*模板变量.*变量”，当前“对象名”的对象中无法查找到该“*模板变量”，状态：" + fsm_id + "，赋值响应：" + action_data.totalString + "，请检查！";
                  return false;
                }
              }
              else {
                error_info.isRight = false;
                error_info.message = "模板对象实例化失败：赋值响应格式错误，赋值响应等号右侧变量格式“对象名.*模板变量.*变量”，当前“对象名”无法在系统中查找到，状态：" + fsm_id + "，赋值响应：" + action_data.totalString + "，请检查！";
                return false;
              }
            }
          }
          else {
            error_info.isRight = false;
            error_info.message = "模板对象实例化失败：赋值响应格式错误，赋值响应等号右侧变量格式错误，应为“（1）*变量；（2）对象名.*变量；（3）*模板变量.*变量；（4）对象名.*模板变量.*变量”几种形式，无法解析，状态：" + fsm_id + "，赋值响应：" + action_data.totalString + "，请检查！";
            return false;
          }
        }
        else // *变量
        {
          varID = varID.substring(1);
          let rightVar: Nullable<IVeryVar> = null;
          let rightTemplate: Nullable<VE_Template> = null;
          if (very_object.isCreatedExpression(varID)) {
            rightVar = new VeryExpression(very_object.getExpression(varID));
          }
          else if (very_object.isCreatedFsm(varID)) {
            rightVar = very_object.getFsm(varID).fsmVar;
          }
          else if (very_object.isCreatedVariable(varID)) {
            rightVar = very_object.getVariable(varID);
          }
          else if (very_object.isCreatedTemplate(varID)) {
            rightTemplate = very_object.getTemplate(varID);
          }
          else {
            // 全局变量
            if (global_vars.isCreatedExpression(varID)) {
              rightVar = new VeryExpression(global_vars.getExpression(varID));
            }
            else if (global_vars.isCreatedVariable(varID)) {
              rightVar = global_vars.getVariable(varID);
            }
            else if (global_vars.isCreatedTemplate(varID)) {
              rightTemplate = global_vars.getTemplate(varID);
            }
            else {
              //场景变量
              if (VerySceneVariables.Variables.isCreatedExpression(varID)) {
                rightVar = new VeryExpression(VerySceneVariables.Variables.getExpression(varID));
              }
              else if (VerySceneVariables.Variables.isCreatedVariable(varID)) {
                rightVar = VerySceneVariables.Variables.getVariable(varID);
              }
              else {
                error_info.isRight = false;
                error_info.message = "模板对象实例化失败：赋值响应格式错误，当前赋值响应等号右侧格式“*变量”，无法在当前系统中查找到该变量，状态：" + fsm_id + "，赋值响应：" + action_data.totalString + "，请检查！";
                return false;
              }
            }
          }
          // 赋值合理性判断
          if (rightVar != null) {
            if (assignment.leftType === AssignType.Template) {
              error_info.isRight = false;
              error_info.message = "模板对象实例化失败：赋值响应格式错误，当前赋值响应等号右侧格式“*变量”，等号左侧类型为“模板变量”，右侧为“普通变量”类型，无法赋值，状态：" + fsm_id + "，赋值响应：" + action_data.totalString + "，请检查！";
              return false;
            }
            else if (assignment.leftType === AssignType.Variable) {
              if (VE_AssignmentTypeJudge.allow(assignment.leftVariable!, rightVar)) {
                assignment.setRightVariable(rightVar);
              }
              else {
                error_info.isRight = false;
                error_info.message = "模板对象实例化失败：赋值响应格式错误，当前赋值响应等号右侧格式“*变量”，当前赋值响应等号左侧和右侧类型不匹配，无法赋值，状态：" + fsm_id + "，赋值响应：" + action_data.totalString + "，请检查！";
                return false;
              }
            }
            else {
              // 模板变量，不确定类型
              assignment.setRightVariable(rightVar);
            }
          }
          else if (rightTemplate != null) {
            if (assignment.leftType === AssignType.Template) {
              assignment.setRightTemplate(rightTemplate);
            }
            else {
              error_info.isRight = false;
              error_info.message = "模板对象实例化失败：赋值响应格式错误，当前赋值响应等号右侧格式“*变量”，等号左侧类型为“模板变量”，右侧为“普通变量”类型，无法赋值，状态：" + fsm_id + "，赋值响应：" + action_data.totalString + "，请检查！";
              return false;
            }
          }
          else {
            error_info.isRight = false;
            error_info.message = "模板对象实例化失败：赋值响应格式错误，当前赋值响应等号右侧格式“*变量”，但是数据无法识别，状态：" + fsm_id + "，赋值响应：" + action_data.totalString + "，请检查！";
            return false;
          }
        }
      }
      else  // 常量
      {
        if (assignment.leftType === AssignType.Template) {
          if (varID.trim().toLowerCase() === "null") {
            assignment.setRightNull();
          }
          else {
            error_info.isRight = false;
            error_info.message = "模板对象实例化失败：赋值响应格式错误，当前赋值响应等号左侧为模板变量，右侧赋值为常量时只能填“null”，表示销毁模板变量，当前格式错误，状态：" + fsm_id + "，赋值响应：" + action_data.totalString + "，请检查！";
            return false;
          }
        }
        else if (assignment.leftType === AssignType.TemplateVariable) {
          assignment.setRightConst(varID);
        }
        else {
          if (assignment.leftVariable !== null) {
            let errorInfo: ErrorInfo = new ErrorInfo();
            let newValue: any = assignment.leftVariable.initValue(varID, errorInfo);
            if (!errorInfo.isRight || newValue === null) {
              error_info.isRight = false;
              error_info.message = "模板对象实例化失败：赋值响应格式错误，当前赋值响应等号左侧变量类型与右侧常量值不匹配，状态：" + fsm_id + "，赋值响应：" + action_data.totalString + "，请检查！";
              return false;
            }
            else {
              assignment.setRightConstValue(newValue);
            }
          }
          else {
            error_info.isRight = false;
            error_info.message = "模板对象实例化失败：赋值响应格式错误，当前赋值响应等号左侧变量获取为空，状态：" + fsm_id + "，赋值响应：" + action_data.totalString + "，请检查！";
            return false;
          }
        }
      }
    }

    let stateAction: VE_StateAction = new VE_StateAction();
    stateAction.setAssignment(assignment);
    state.addAction(stateAction);
    return true;
  }








}