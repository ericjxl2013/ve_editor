import { VE_Templates, VE_Template } from "../template";
import { VE_Manager } from "../manager";
import { VE_Objects, VeryEngineObject } from "../object";
import { VE_Variables, VeryVarManager, IVeryVar, VeryExpression } from "../variables";
import { ErrorInfo, VE_StringFormat } from "../utility";
import { VE_ErrorManager, VE_Error } from "../global";
import { VE_Expressions, IExpression } from "../expression";
import { VE_FsmData, VE_StateData, VE_StateTriggerData, VE_StateActionData } from "../dataSource";
import { VE_Fsm, VE_State, VE_StateAction, VE_AssociatedState, StateConst } from "../state";
import { VE_Triggers, VE_TriggerBehaviour } from "../trigger";
import { VE_Actions, VE_ActionBehaviour, VE_Assignment } from "../action";
import { StateActionType, AssignType } from "../enum";
import { VE_TypeConvert } from "../utility/typeConvert";
import { VE_AssignmentTypeJudge } from "../action/assignmentTypeJudge";
import { VerySceneVariables } from "../scene";

export class CreateInstance {





  public static createProject(project_name: string): boolean {
    let templates: VE_Templates = VE_Manager.templates(project_name);
    let objects: VE_Objects = VE_Manager.objects(project_name);
    let globalVars: VE_Variables = VE_Manager.variables(project_name);

    // 1. 全局变量——创建
    // (1).先初始化普通变量和模板
    for (let i: number = 0; i < globalVars.varData.count; i++) {
      let varID: string = globalVars.varData.getVariableID(i);
      let varPara: string[] = globalVars.varData.getVariableParas(varID);
      // 判断，1.普通变量；2.公式；3.模板变量；
      // 1.公式，等普通变量初始化完毕再处理
      if (varPara[0] === "公式" || varPara[0].toLowerCase() === "expression") {
        continue;
      }
      // 2.普通IVeryVar变量
      else if (VeryVarManager.hasVarType(varPara[0])) {
        let errorInfo: ErrorInfo = new ErrorInfo();
        let newVar: Nullable<IVeryVar> = VeryVarManager.createVariable(varID, varPara[0], varPara[1], errorInfo);
        // TODO: List或者Dictionary处理
        if (!errorInfo.isRight || newVar === null) {
          VE_ErrorManager.Add(VE_Error.error(globalVars.varData.getPos(varID), "项目：" + project_name + "，全局变量：" + varID + "，" + varPara[0] + "，" + varPara[1] + "，全局变量创建失败，失败原因：" + errorInfo.message + "，请检查！", ''));
          return false;
        } else {
          globalVars.addVariable(varID, newVar);
        }
      }
      // 3.模板变量
      else if (templates.isCreatedTemplate(varPara[0])) {
        globalVars.addTemplate(varID, templates.getTemplate(varPara[0]).clone('__global__', varID));
      }
      // 未知错误
      else {
        VE_ErrorManager.Add(VE_Error.error(globalVars.varData.getPos(varID), "项目：" + project_name + "，全局变量：" + varID + "，" + varPara[0] + "，" + varPara[1] + "，全局变量创建失败，当前变量不存在，请检查！", ''));
        return false;
      }
    }

    // (2).再初始化公式
    for (let i: number = 0; i < globalVars.varData.count; i++) {
      let varID: string = globalVars.varData.getVariableID(i);
      let varPara: string[] = globalVars.varData.getVariableParas(varID);
      // 判断，公式；
      // 1.公式
      if (varPara[0] === "公式" || varPara[0].toLowerCase() === "expression") {
        // 公式之间以从前到后的解析顺序变异，若前面的公式引用了后面的公式，会直接报错
        let errorInfo: ErrorInfo = new ErrorInfo();
        let globalExp: IExpression = VE_Expressions.createGlobalExpression(varID, varPara[1], project_name, errorInfo);
        if (!errorInfo.isRight || !globalExp) {
          VE_ErrorManager.Add(VE_Error.error(globalVars.varData.getPos(varID), "项目：" + project_name + "，全局变量：" + varID + "," + varPara[0] + "," + varPara[1] + "，全局变量创建失败，公式创建错误：\n" + errorInfo.message, ""));
          return false;
        }
        globalVars.addExpression(varID, globalExp);
      }
      else {
        continue;
      }
    }

    // 2. 局部变量----创建
    // （1）.先初始化普通变量和模板
    for (let i: number = 0; i < objects.count; i++) {
      let objectID: string = objects.getObjectID(i);
      let veryObject: VeryEngineObject = objects.getVeryObject(objectID);
      for (let k: number = 0; k < veryObject.varData.count; k++) {
        // (1). 局部变量
        let varID: string = veryObject.varData.getVariableID(k);
        let varPara: string[] = veryObject.varData.getVariableParas(varID);
        // 判断，1.普通变量；2.公式；3.模板变量；
        // 1.公式
        if (varPara[0] === "公式" || varPara[0].toLowerCase().trim() === "expression") {
          continue;
        }
        // 2.普通IVeryVar变量
        else if (VeryVarManager.hasVarType(varPara[0])) {
          let errorInfo: ErrorInfo = new ErrorInfo();
          let newVar: Nullable<IVeryVar> = VeryVarManager.createVariable(varID, varPara[0], varPara[1], errorInfo);
          // TODO: List或者Dictionary处理
          if (newVar === null || !errorInfo.isRight) {
            VE_ErrorManager.Add(VE_Error.error(veryObject.varData.getPos(varID), "项目：" + project_name + "，全局变量：" + varID + "，" + varPara[0] + "，" + varPara[1] + "，全局变量创建失败，失败原因：" + errorInfo.message + "，请检查！", ''));
            return false;
          } else {
            globalVars.addVariable(varID, newVar);
          }
        }
        // 3.模板变量
        else if (templates.isCreatedTemplate(varPara[0])) {
          veryObject.addTemplate(varID, templates.getTemplate(varPara[0]).clone(objectID, varID));
        }
        // 未知错误
        else {
          VE_ErrorManager.Add(VE_Error.error(veryObject.varData.getPos(varID), "项目：" + project_name + "，对象：" + objectID + "，局部变量：" + varID + "," + varPara[0] + "," + varPara[1] + "，局部变量创建失败，当前变量不存在，请检查！", ""));
          return false;
        }
      }
    }
    // 3. 状态机 —— 状态机创建
    for (let i: number = 0; i < objects.count; i++) {
      let objectID: string = objects.getObjectID(i);
      let veryObject: VeryEngineObject = objects.getVeryObject(objectID);
      for (let k: number = 0; k < veryObject.dataSource.fsmCount; k++) {
        let fsmID: string = veryObject.dataSource.getFsmID(k);
        let fsmData: VE_FsmData = veryObject.dataSource.getFsmData(fsmID);
        // 创建状态变量
        let errorInfo: ErrorInfo = new ErrorInfo();
        let newVar: Nullable<IVeryVar> = VeryVarManager.createVariable(fsmID, fsmData.fsmType, fsmData.initialValStr, errorInfo);
        // TODO: List或者Dictionary处理
        if (newVar === null || !errorInfo.isRight) {
          VE_ErrorManager.Add(VE_Error.error(veryObject.dataSource.getFsmPos(fsmID), "项目：" + project_name + "，对象：" + objectID + "，状态：" + fsmID + "，状态变量初始值创建错误，错误原因：" + errorInfo.message + "，请检查！", ''));
          return false;
        }
        // 状态机
        let fsm: VE_Fsm = new VE_Fsm(project_name, objectID, fsmID, newVar, veryObject);
        veryObject.addFsm(fsmID, fsm);
      }
    }
    // 公式放在状态机创建之后，因为可以引用状态变量
    // 4. 对象局部变量再初始化公式
    for (let i: number = 0; i < objects.count; i++) {
      let objectID: string = objects.getObjectID(i);
      let veryObject: VeryEngineObject = objects.getVeryObject(objectID);
      for (let k: number = 0; k < veryObject.varData.count; k++) {
        // (1). 局部变量
        let varID: string = veryObject.varData.getVariableID(k);
        let varPara: string[] = veryObject.varData.getVariableParas(varID);
        // 判断，1.普通变量；2.公式；3.模板变量；
        // 1.公式
        if (varPara[0] === "公式" || varPara[0].toLowerCase().trim() === "expression") {
          // 公式之间以从前到后的解析顺序变异，若前面的公式引用了后面的公式，会直接报错
          let errorInfo: ErrorInfo = new ErrorInfo();
          let newVar: IExpression = VE_Expressions.createLocalExpression(varID, varPara[1], project_name, objectID, errorInfo);
          if (!errorInfo.isRight || !newVar) {
            VE_ErrorManager.Add(VE_Error.error(veryObject.varData.getPos(varID), "项目：" + project_name + "，对象：" + objectID + "，局部变量：" + varID + "," + varPara[0] + "," + varPara[1] + "，局部变量创建失败，公式创建错误：\n" + errorInfo.message, ''));
            return false;
          }
          veryObject.addExpression(varID, newVar);
        }
        else {
          continue;
        }
      }
    }

    // TODO: UI

    // 6. 触发——触发创建
    for (let i: number = 0; i < objects.count; i++) {
      let objectID: string = objects.getObjectID(i);
      let veryObject: VeryEngineObject = objects.getVeryObject(objectID);
      for (let k: number = 0; k < veryObject.dataSource.triggerCount; k++) {
        let triggerID: string = veryObject.dataSource.getTriggerID(k);
        //Debug.Log("触发ID：" + triggerID);
        let triggerPara: string[] = veryObject.dataSource.getTriggerPara(triggerID);

        if (!VE_Triggers.hasTrigger(triggerPara[0])) {
          VE_ErrorManager.Add(VE_Error.error(veryObject.dataSource.getTriggerPos(triggerID), "项目：" + project_name + "，对象：" + objectID + "，触发：" + triggerID + "，触发类型：" + triggerPara[0] + "，当前系统中不存在该触发类型，请检查！", ""));
          return false;
        } else {
          // 初始化Trigger
          let errorInfo: ErrorInfo = new ErrorInfo();
          let trigger: Nullable<VE_TriggerBehaviour> = VE_Triggers.createTrigger(veryObject, triggerID, triggerPara[0], triggerPara.slice(1), errorInfo);

          if (!errorInfo.isRight || !trigger) {
            VE_ErrorManager.Add(VE_Error.error(veryObject.dataSource.getTriggerPos(triggerID), "项目：" + project_name + "，对象：" + objectID + "，触发：" + triggerID + "，触发创建错误，原因：" + errorInfo.message + "，请检查！", ""));
            return false;
          }

          veryObject.addTrigger(triggerID, trigger!);
        }
      }
    }

    // 5. 响应——响应创建
    for (let i: number = 0; i < objects.count; i++) {
      let objectID: string = objects.getObjectID(i);
      let veryObject: VeryEngineObject = objects.getVeryObject(objectID);
      for (let k: number = 0; k < veryObject.dataSource.actionCount; k++) {
        let actionID: string = veryObject.dataSource.getActionID(k);
        let actionPara: string[] = veryObject.dataSource.getActionPara(actionID);
        // console.log(actionID);
        // console.log(actionPara);
        if (!VE_Actions.hasAction(actionPara[0])) {
          VE_ErrorManager.Add(VE_Error.error(veryObject.dataSource.getActionPos(actionID), "项目：" + project_name + "，对象：" + objectID + "，响应：" + actionID + "，响应类型：" + actionPara[0] + "，当前系统中不存在该响应类型，请检查！", ""));
          return false;
        } else {
          // 初始化Action
          let errorInfo: ErrorInfo = new ErrorInfo();
          let action: Nullable<VE_ActionBehaviour> = VE_Actions.createAction(veryObject, actionID, actionPara[0], actionPara.slice(1), veryObject.dataSource.getActionInitVal(actionID), errorInfo);

          if (!errorInfo.isRight || !action) {
            VE_ErrorManager.Add(VE_Error.error(veryObject.dataSource.getActionPos(actionID), "项目：" + project_name + "，对象：" + objectID + "，响应：" + actionID + "，响应创建错误，原因：" + errorInfo.message + "，请检查！", ""));
            return false;
          }

          veryObject.addAction(actionID, action!);
        }
      }
    }

    // 7. 状态机 —— 状态机信息关联：触发关联 + 响应关联 + 状态赋值
    for (let i: number = 0; i < objects.count; i++) {
      let objectID: string = objects.getObjectID(i);
      let veryObject: VeryEngineObject = objects.getVeryObject(objectID);
      for (let k: number = 0; k < veryObject.dataSource.fsmCount; k++) {
        let fsmID: string = veryObject.dataSource.getFsmID(k);
        let fsmData: VE_FsmData = veryObject.dataSource.getFsmData(fsmID);
        // 状态机
        let fsm: VE_Fsm = veryObject.getFsm(fsmID);
        // 状态信息关联：触发激活条件，触发，逻辑表达式，状态值计算公式，响应，关联状态
        for (let p: number = 0; p < fsmData.count; p++) {
          let stateData: VE_StateData = fsmData.getStateData(p);
          let state: VE_State = new VE_State(fsm, fsm.count + 1);
          // 状态值
          if (stateData.isInitialValue) {
            state.setInitialValue(fsm.fsmVar.getValue());
          }
          else {
            // TODO: 状态赋值处理
            if (!this.stateAssignment(project_name, objectID, fsmID, globalVars, objects, veryObject, fsm, stateData, state)) {
              return false;
            }
          }

          // 响应是否顺序运行
          if (stateData.isSequence) {
            state.setSequence();
          }

          // 关联状态条件
          if (stateData.logicalExp !== '') {
            let errorInfo: ErrorInfo = new ErrorInfo();
            let logicalExp: IExpression = VE_Expressions.createFsmExpression('', stateData.logicalExp, project_name, objectID, fsmID, errorInfo);
            if (!errorInfo.isRight || !logicalExp) {
              VE_ErrorManager.Add(VE_Error.error("（" + stateData.rowIndex.toString() + "，E）", "项目：" + project_name + "，对象：" + objectID + "，状态：" + fsmID + "，状态逻辑表达式：" + stateData.logicalExp + "，逻辑表达式创建失败，公式创建错误：\n" + errorInfo.message, ""));
              return false;
            }
            state.logicalAssociated = logicalExp;
          }

          // 触发信息关联
          for (let s: number = 0; s < stateData.triggerCount; s++) {
            let triggerData: VE_StateTriggerData = stateData.getTrigger(s);
            let triggerPos: string = stateData.getTriggerPos(s);
            // 可能为当前对象，也可能是其他对象上的触发
            let trigger: Nullable<VE_TriggerBehaviour> = VE_Triggers.findTrigger(veryObject, triggerData.triggerID);
            if (trigger === null) {
              VE_ErrorManager.Add(VE_Error.error(triggerPos, "项目：" + project_name + "，对象：" + objectID + "，状态：" + fsmID + "，触发：" + triggerData.triggerID + "，当前触发无法在系统中查找到，请检查！", ""));
              return false;
            }
            // 逻辑条件
            let logicalExp: Nullable<IExpression> = null;
            // Debug.LogWarning("逻辑表达式：" + triggerData.LogicalExp);
            if (triggerData.logicalExp !== '') {
              // 状态逻辑表达式
              let errorInfo: ErrorInfo = new ErrorInfo();
              logicalExp = VE_Expressions.createFsmExpression('', triggerData.logicalExp, project_name, objectID, fsmID, errorInfo);
              // Debug.LogWarning(logicalExp);
              if (!errorInfo.isRight || logicalExp === null) {
                VE_ErrorManager.Add(VE_Error.error(triggerPos, "项目：" + project_name + "，对象：" + objectID + "，状态：" + fsmID + "，状态逻辑表达式：" + triggerData.logicalExp + "，逻辑表达式创建失败，公式创建错误：\n" + errorInfo.message, ""));
                return false;
              }
            }
            // console.log(state);
            // console.log(trigger);
            trigger.addTriggerTarget(logicalExp!, state);
            // 触发启动条件
            if (triggerData.logicalSwitch !== '') {
              // 触发启动条件
              let errorInfo: ErrorInfo = new ErrorInfo();
              let logicalSwitch: IExpression = VE_Expressions.createFsmExpression('', triggerData.logicalSwitch, project_name, objectID, fsmID, errorInfo);
              if (!errorInfo.isRight || logicalSwitch === null) {
                VE_ErrorManager.Add(VE_Error.error(triggerPos, "项目：" + project_name + "，对象：" + objectID + "，状态：" + fsmID + "，触发启动条件：" + triggerData.logicalSwitch + "，触发启动条件创建失败，公式创建错误：\n" + errorInfo.message, ""));
                return false;
              }
              trigger.addLogicalSwitch(logicalSwitch);
            }
          }

          // 响应信息关联
          for (let s: number = 0; s < stateData.actionCount; s++) {
            let actionData: VE_StateActionData = stateData.getAction(s);
            let actionPos: string = stateData.getActionPos(s);
            // 正常响应
            if (actionData.type === StateActionType.Action) {
              // 可能为当前对象，也可能是其他对象上的响应
              let action: Nullable<VE_ActionBehaviour> = VE_Actions.findAction(veryObject, actionData.actionID);
              if (action === null) {
                VE_ErrorManager.Add(VE_Error.error(actionPos, "项目：" + project_name + "，对象：" + objectID + "，状态：" + fsmID + "，响应：" + actionData.actionID + "，当前响应无法在系统中查找到，请检查！", ""));
                return false;
              }
              // 响应参数，目前默认只支持常量（两个bool值理论上可以为常量或者变量和公式值引用）
              // 启动标志
              let errorInfo: ErrorInfo = new ErrorInfo();
              let enabledFlag: boolean = VE_TypeConvert.boolConvert(actionData.enabled, errorInfo);
              if (!errorInfo.isRight) {
                VE_ErrorManager.Add(VE_Error.error(actionPos, "项目：" + project_name + "，对象：" + objectID + "，状态：" + fsmID + "，响应：" + actionData.actionID + "，响应启动参数目前只允许填写bool常量true或者false，不允许填写变量，请检查！", ""));
                return false;
              }

              // 每帧运行
              let everyFrameFlag = VE_TypeConvert.boolConvert(actionData.everyFrame, errorInfo);
              if (!errorInfo.isRight) {
                VE_ErrorManager.Add(VE_Error.error(actionPos, "项目：" + project_name + "，对象：" + objectID + "，状态：" + fsmID + "，响应：" + actionData.actionID + "，响应每帧运行参数目前只允许填写bool常量true或者false，不允许填写变量，请检查！", ""));
                return false;
              }
              // 顺序运行
              let isSequence = VE_TypeConvert.boolConvert(actionData.isSequence, errorInfo);
              if (!errorInfo.isRight) {
                VE_ErrorManager.Add(VE_Error.error(actionPos, "项目：" + project_name + "，对象：" + objectID + "，状态：" + fsmID + "，响应：" + actionData.actionID + "，响应动画顺序运行参数目前只允许填写bool常量true或者false，不允许填写变量，请检查！", ""));
                return false;
              }
              let stateAction: VE_StateAction = new VE_StateAction();
              // console.log(`isSequence: ${isSequence}`);
              stateAction.setAction(action, enabledFlag, everyFrameFlag, isSequence);
              state.addAction(stateAction);
            }
            //赋值
            else {
              // TODO
              if (!this.assignmentAction(project_name, objectID, fsmID, globalVars, objects, veryObject, actionData, state)) {
                return false;
              }
            }
          }

          // 关联状态
          if (fsm.isCreatedState(stateData.stateIndex)) {
            VE_ErrorManager.Add(VE_Error.error("（" + stateData.rowIndex.toString() + "，I）", "项目：" + project_name + "，对象：" + objectID + "，状态：" + fsmID + "，状态赋值：" + stateData.ValStr + "，当前关联ID已创建，请勿重复创建！", ""));
            return false;
          }
          else {
            fsm.addState(state, stateData.stateIndex);
          }
        }
      }
    }

    // 8. 状态机 —— 状态机信息关联：关联状态信息关联
    for (let i: number = 0; i < objects.count; i++) {
      let objectID: string = objects.getObjectID(i);
      let veryObject: VeryEngineObject = objects.getVeryObject(objectID);
      for (let k: number = 0; k < veryObject.dataSource.fsmCount; k++) {
        let fsmID: string = veryObject.dataSource.getFsmID(k);
        let fsmData: VE_FsmData = veryObject.dataSource.getFsmData(fsmID);
        // 状态机
        let fsm: VE_Fsm = veryObject.getFsm(fsmID);
        // 状态信息关联：触发激活条件，触发，逻辑表达式，状态值计算公式，响应，关联状态
        for (let p: number = 0; p < fsmData.count; p++) {
          let stateData: VE_StateData = fsmData.getStateData(p);
          let state: Nullable<VE_State> = fsm.getStateInSequence(p);
          // 关联状态信息关联
          for (let s: number = 0; s < stateData.associatedStateCount; s++) {
            let associatedStateInfo: string = stateData.getAssociatedState(s);
            let associatedPos: string = stateData.getAssociatedStatePos(s);
            let associatedState: VE_AssociatedState = new VE_AssociatedState(state!);
            let multipleAssociatedState: string[] = associatedStateInfo.split(/,|，/);
            for (let www: number = 0; www < multipleAssociatedState.length; www++) {
              associatedStateInfo = multipleAssociatedState[www].trim();
              let stateIndex: number = StateConst.STATE_INDEX;
              let strArray: string[] = associatedStateInfo.split('=');
              if (strArray.length === 1) {
                stateIndex = StateConst.STATE_INDEX;
              }
              else if (strArray.length === 2) {
                let errorInfo: ErrorInfo = new ErrorInfo();
                stateIndex = VE_TypeConvert.intConvert(strArray[1].trim(), errorInfo);
                if (!errorInfo.isRight) {
                  VE_ErrorManager.Add(VE_Error.error(associatedPos, "项目：" + project_name + "，对象：" + objectID + "，状态：" + fsmID + "，关联状态：" + associatedStateInfo + "，当前关联状态格式错误，应为“状态名=子状态ID（整数）”的形式，请检查！", ""));
                  return false;
                }
              }
              else {
                VE_ErrorManager.Add(VE_Error.error(associatedPos, "项目：" + project_name + "，对象：" + objectID + "，状态：" + fsmID + "，关联状态：" + associatedStateInfo + "，当前关联状态格式错误，应为“状态名=子状态ID（整数）”的形式，请检查！", ""));
                return false;
              }
              // 1. 状态名
              // 2. 对象名.状态名
              // 3. *模板变量.状态名
              // 4. 对象名.*局部模板变量.状态名

              let aFsmID: string = strArray[0].trim();
              if (aFsmID.indexOf(StateConst.STATE_SEPARATOR) > -1) {
                let stateArray: string[] = aFsmID.split(StateConst.STATE_SEPARATOR);
                for (let q: number = 0; q < stateArray.length; q++) {
                  stateArray[q] = stateArray[q].trim();
                }
                // 对象名.*局部模板变量.状态名
                if (stateArray.length === 3) {
                  if (objects.isCreated(stateArray[0])) {
                    let aObject: VeryEngineObject = objects.getVeryObject(stateArray[0]);
                    if (stateArray[1].startsWith(StateConst.VARIABLE_SYMBOL)) {
                      let varID: string = stateArray[1].substring(1);
                      if (aObject.isCreatedTemplate(varID)) {
                        let template: VE_Template = aObject.getTemplate(varID);
                        if (template.dataSource.isCreatedFsm(stateArray[2])) {
                          associatedState.addTemplate(template, stateArray[2], stateIndex, associatedPos);
                          // VE_AssociatedState associatedState = new VE_AssociatedState(state, template, stateArray[2], stateIndex);
                          // state.AddAssociatedState(associatedState);
                        }
                        else {
                          VE_ErrorManager.Add(VE_Error.error(associatedPos, "项目：" + project_name + "，对象：" + objectID + "，状态：" + fsmID + "，关联状态：" + associatedStateInfo + "，当前关联状态填写格式为“对象名.*模板变量.状态名”，在当前对象的该模板变量中无法查找到对应状态名，请检查！", ""));
                          return false;
                        }
                      }
                      else {
                        VE_ErrorManager.Add(VE_Error.error(associatedPos, "项目：" + project_name + "，对象：" + objectID + "，状态：" + fsmID + "，关联状态：" + associatedStateInfo + "，当前关联状态填写格式为“对象名.*模板变量.状态名”，在当前对象中无法查找到该模板变量，请检查！", ""));
                        return false;
                      }
                    }
                    else {
                      VE_ErrorManager.Add(VE_Error.error(associatedPos, "项目：" + project_name + "，对象：" + objectID + "，状态：" + fsmID + "，关联状态：" + associatedStateInfo + "，当前关联状态填写格式为“对象名.*模板变量.状态名”，模板变量填写格式不正确，请检查！", ""));
                      return false;
                    }
                  }
                  else {
                    VE_ErrorManager.Add(VE_Error.error(associatedPos, "项目：" + project_name + "，对象：" + objectID + "，状态：" + fsmID + "，关联状态：" + associatedStateInfo + "，当前关联状态填写格式为“对象名.*模板变量.状态名”，无法查找到该对象，请检查！", ""));
                    return false;
                  }
                }
                else if (stateArray.length === 2) {
                  let aObjectID: string = stateArray[0].trim();
                  aFsmID = stateArray[1].trim();
                  // *模板变量.状态名
                  if (aObjectID.startsWith(StateConst.VARIABLE_SYMBOL)) {
                    aObjectID = aObjectID.substring(1);
                    if (veryObject.isCreatedTemplate(aObjectID)) {
                      let template: VE_Template = veryObject.getTemplate(aObjectID);
                      if (template.dataSource.isCreatedFsm(stateArray[1])) {
                        associatedState.addTemplate(template, stateArray[1], stateIndex, associatedPos);
                        // VE_AssociatedState associatedState = new VE_AssociatedState(state, template, stateArray[1], stateIndex);
                        // state.AddAssociatedState(associatedState);
                      }
                      else {
                        VE_ErrorManager.Add(VE_Error.error(associatedPos, "项目：" + project_name + "，对象：" + objectID + "，状态：" + fsmID + "，关联状态：" + associatedStateInfo + "，当前关联状态填写格式为“*模板变量.状态名”，在当前模板变量中无法查找到对应状态名，请检查！", ""));
                        return false;
                      }
                    }
                    else {
                      if (globalVars.isCreatedTemplate(aObjectID)) {
                        let template: VE_Template = globalVars.getTemplate(aObjectID);
                        if (template.dataSource.isCreatedFsm(stateArray[1])) {
                          associatedState.addTemplate(template, stateArray[1], stateIndex, associatedPos);
                          // VE_AssociatedState associatedState = new VE_AssociatedState(state, template, stateArray[1], stateIndex);
                          // state.AddAssociatedState(associatedState);
                        }
                        else {
                          VE_ErrorManager.Add(VE_Error.error(associatedPos, "项目：" + project_name + "，对象：" + objectID + "，状态：" + fsmID + "，关联状态：" + associatedStateInfo + "，当前关联状态填写格式为“*模板变量.状态名”，在当前模板变量中无法查找到对应状态名，请检查！", ""));
                          return false;
                        }
                      }
                      else {
                        VE_ErrorManager.Add(VE_Error.error(associatedPos, "项目：" + project_name + "，对象：" + objectID + "，状态：" + fsmID + "，关联状态：" + associatedStateInfo + "，当前关联状态填写格式为“*模板变量.状态名”，在当前系统中无法查找到该模板变量，请检查！", ""));
                        return false;
                      }
                    }
                  }
                  // 对象名.状态名
                  else {
                    let aObject: VeryEngineObject = objects.getVeryObject(aObjectID);
                    if (aObject === null) {
                      VE_ErrorManager.Add(VE_Error.error(associatedPos, "项目：" + project_name + "，对象：" + objectID + "，状态：" + fsmID + "，关联状态：" + associatedStateInfo + "，当前关联状态填写格式为“对象名.状态名”，当前系统中无法查找到该对象名，请检查！", ""));
                      return false;
                    }
                    let aFsm: VE_Fsm = aObject.getFsm(aFsmID);
                    if (aFsm === null) {
                      VE_ErrorManager.Add(VE_Error.error(associatedPos, "项目：" + project_name + "，对象：" + objectID + "，状态：" + fsmID + "，关联状态：" + associatedStateInfo + "，当前关联状态填写格式为“对象名.状态名”，当前对象名所对应的对象中无法查找到该状态名，请检查！", ""));
                      return false;
                    }
                    let toState: Nullable<VE_State> = aFsm.getState(stateIndex);
                    if (toState === null) {
                      VE_ErrorManager.Add(VE_Error.error(associatedPos, "项目：" + project_name + "，对象：" + objectID + "，状态：" + fsmID + "，关联状态：" + associatedStateInfo + "，当前关联状态填写格式为“对象名.状态名”，当前关联状态序号超出对应状态序号范围，请检查！", ""));
                      return false;
                    }
                    associatedState.add(toState, stateIndex, associatedPos);
                    // VE_AssociatedState associatedState = new VE_AssociatedState(state, toState);
                    // state.AddAssociatedState(associatedState);
                  }
                }
                else {
                  VE_ErrorManager.Add(VE_Error.error(associatedPos, "项目：" + project_name + "，对象：" + objectID + "，状态：" + fsmID + "，关联状态：" + associatedStateInfo + "，状态名填写错误，无法查找到对应状态，请检查！", ""));
                  return false;
                }
              }
              //状态名
              else {
                let aFsm: VE_Fsm = veryObject.getFsm(aFsmID);
                if (aFsm === null) {
                  VE_ErrorManager.Add(VE_Error.error(associatedPos, "项目：" + project_name + "，对象：" + objectID + "，状态：" + fsmID + "，关联状态：" + associatedStateInfo + "，状态名填写错误，可以查找到对象，但是对象上无法查找到该状态，请检查！", ""));
                  return false;
                }
                let toState: Nullable<VE_State> = aFsm.getState(stateIndex);
                if (toState === null) {
                  VE_ErrorManager.Add(VE_Error.error(associatedPos, "项目：" + project_name + "，对象：" + objectID + "，状态：" + fsmID + "，关联状态：" + associatedStateInfo + "，状态名填写错误，可以查找到对象和状态，但是状态序号超出范围，请检查！", ""));
                  return false;
                }

                associatedState.add(toState, stateIndex, associatedPos);
                //VE_AssociatedState associatedState = new VE_AssociatedState(state, toState);
                //state.AddAssociatedState(associatedState);
              }
            }
            state!.addAssociatedState(associatedState);

          }

        }
      }
    }

    return true;
  }


  private static stateAssignment(project_name: string, object_id: string, fsm_id: string, global_vars: VE_Variables, objects: VE_Objects, very_object: VeryEngineObject, fsm: VE_Fsm, state_data: VE_StateData, state: VE_State): boolean {
    // 状态值只能为常量或者变量和公式引用，不能创建新公式
    // 允许引用模板变量，数据结构上需要支持
    let assignStr: string = state_data.ValStr;
    // *变量
    // 对象名.*变量
    // *模板变量.*变量
    // 对象名.*模板变量.*变量
    if (assignStr.indexOf(StateConst.VARIABLE_SYMBOL) > -1)  // 变量或者公式
    {
      if (assignStr.indexOf(StateConst.STATE_SEPARATOR) > -1) {
        let valArray: string[] = assignStr.split(StateConst.STATE_SEPARATOR);
        for (let q: number = 0; q < valArray.length; q++) {
          valArray[q] = valArray[q].trim();
        }
        if (valArray.length === 2) {
          if (!valArray[1].startsWith(StateConst.VARIABLE_SYMBOL)) {
            VE_ErrorManager.Add(VE_Error.error("（" + state_data.rowIndex + "，F）", "项目：" + project_name + "，对象：" + object_id + "，状态：" + fsm_id + "，状态赋值：" + state_data.ValStr + "，状态赋值变量格式错误，应为“（1）*变量；（2）对象名.*变量；（3）*模板变量.*变量；（4）对象名.*模板变量.*变量”几种形式，当前不符合，无法解析，请检查！", ""));
            return false;
          }
          else {
            // *模板变量.*变量，当前未实例化，只做前期语法检测，然后记录参数到状态，状态使用时，动态读取
            if (valArray[0].startsWith(StateConst.VARIABLE_SYMBOL)) {
              let templateVarID: string = valArray[0].substring(1);
              let varID: string = valArray[1].substring(1);
              if (very_object.isCreatedTemplate(templateVarID)) {
                let template: VE_Template = very_object.getTemplate(templateVarID);
                if (template.varData.isCreatedVariable(varID) || template.dataSource.isCreatedFsm(varID)) {
                  state.setTemplateInfo(template, varID, assignStr);
                }
                else {
                  VE_ErrorManager.Add(VE_Error.error("（" + state_data.rowIndex + "，F）", "项目：" + project_name + "，对象：" + object_id + "，状态：" + fsm_id + "，状态赋值：" + state_data.ValStr + "，当前赋值格式“*模板变量.*变量”，当前“*模板变量”可以查找到，但是无法查到对应“*变量”，请检查！", ""));
                  return false;
                }
              }
              else {
                if (global_vars.isCreatedTemplate(templateVarID)) {
                  let template: VE_Template = global_vars.getTemplate(templateVarID);
                  if (template.varData.isCreatedVariable(varID) || template.dataSource.isCreatedFsm(varID)) {
                    state.setTemplateInfo(template, varID, assignStr);
                  }
                  else {
                    VE_ErrorManager.Add(VE_Error.error("（" + state_data.rowIndex + "，F）", "项目：" + project_name + "，对象：" + object_id + "，状态：" + fsm_id + "，状态赋值：" + state_data.ValStr + "，当前赋值格式“*模板变量.*变量”，当前“*模板变量”可以查找到，但是无法查到对应“*变量”，请检查！", ""));
                    return false;
                  }
                }
                else {
                  VE_ErrorManager.Add(VE_Error.error("（" + state_data.rowIndex + "，F）", "项目：" + project_name + "，对象：" + object_id + "，状态：" + fsm_id + "，状态赋值：" + state_data.ValStr + "，当前赋值格式“*模板变量.*变量”，当前“*模板变量”无法在系统中查找到，请检查！", ""));
                  return false;
                }
              }
            }
            // 对象名.*变量
            else {
              if (valArray[0] === object_id && valArray[1].substring(1) === fsm_id) {
                VE_ErrorManager.Add(VE_Error.error("", "项目：" + project_name + "，对象：" + object_id + "，状态：" + fsm_id + "，状态赋值：" + state_data.ValStr + "，当前赋值格式“对象名.*变量”，状态变量赋值不能自己赋值给自己，请检查！", ""));
                return false;
              }
              let errorInfo: ErrorInfo = new ErrorInfo();

              let veryVar: Nullable<IVeryVar> = VeryVarManager.getVariable(valArray[1].substring(1), project_name, valArray[0], errorInfo);
              if (!errorInfo.isRight || veryVar === null) {
                VE_ErrorManager.Add(VE_Error.error("（" + state_data.rowIndex + "，F）", "项目：" + project_name + "，对象：" + object_id + "，状态：" + fsm_id + "，状态赋值：" + state_data.ValStr + "，当前赋值格式“对象名.*变量”，*变量：" + valArray[1] + "无法在系统中查找到，错误信息：" + errorInfo, ""));
                return false;
              }
              else {
                // 检测是否可以赋值
                if (VE_AssignmentTypeJudge.allow(fsm.fsmVar, veryVar)) {
                  state.setStateVariable(veryVar);
                }
                else {
                  VE_ErrorManager.Add(VE_Error.error("（" + state_data.rowIndex + "，F）", "项目：" + project_name + "，对象：" + object_id + "，状态：" + fsm_id + "，状态赋值：" + state_data.ValStr + "，当前赋值格式“对象名.*变量”，变量类型与状态类型不匹配，不能赋值，请检查！", ""));
                  return false;
                }
              }
            }
          }
        }
        else if (valArray.length === 3) {
          // 对象名.*模板变量.*变量，当前未实例化，只做前期语法检测，然后记录参数到状态，状态使用时，动态读取
          if (valArray[0].startsWith(StateConst.STATE_SEPARATOR) || !valArray[1].startsWith(StateConst.STATE_SEPARATOR) || !valArray[2].startsWith(StateConst.STATE_SEPARATOR)) {
            VE_ErrorManager.Add(VE_Error.error("（" + state_data.rowIndex + "，F）", "项目：" + project_name + "，对象：" + object_id + "，状态：" + fsm_id + "，状态赋值：" + state_data.ValStr + "，状态赋值变量格式错误，应为“（1）*变量；（2）对象名.*变量；（3）*模板变量.*变量；（4）对象名.*模板变量.*变量”几种形式，当前不符合，无法解析，请检查！", ""));
            return false;
          }
          else {
            let templateVarID: string = valArray[1].substring(1);
            let varID: string = valArray[2].substring(1);
            if (objects.isCreated(valArray[0])) {
              let tObject: VeryEngineObject = objects.getVeryObject(valArray[0]);
              if (tObject.isCreatedTemplate(templateVarID)) {
                let template: VE_Template = tObject.getTemplate(templateVarID);
                if (template.varData.isCreatedVariable(varID) || template.dataSource.isCreatedFsm(varID)) {
                  state.setTemplateInfo(template, varID, assignStr);
                }
                else {
                  VE_ErrorManager.Add(VE_Error.error("（" + state_data.rowIndex + "，F）", "项目：" + project_name + "，对象：" + object_id + "，状态：" + fsm_id + "，状态赋值：" + state_data.ValStr + "，当前赋值格式“对象名.*模板变量.*变量”，当前“对象名.*模板变量”可以查找到，但是无法查到对应“*变量”，请检查！", ""));
                  return false;
                }
              }
              else {
                VE_ErrorManager.Add(VE_Error.error("（" + state_data.rowIndex + "，F）", "项目：" + project_name + "，对象：" + object_id + "，状态：" + fsm_id + "，状态赋值：" + state_data.ValStr + "，当前赋值格式“对象名.*模板变量.*变量”，当前“对象名”的对象中无法查找到该“*模板变量”，请检查！", ""));
                return false;
              }
            }
            else {
              VE_ErrorManager.Add(VE_Error.error("（" + state_data.rowIndex + "，F）", "项目：" + project_name + "，对象：" + object_id + "，状态：" + fsm_id + "，状态赋值：" + state_data.ValStr + "，当前赋值格式“对象名.*模板变量.*变量”，当前“对象名”无法在系统中查找到，请检查！", ""));
              return false;
            }
          }
        }
        else {
          VE_ErrorManager.Add(VE_Error.error("（" + state_data.rowIndex + "，F）", "项目：" + project_name + "，对象：" + object_id + "，状态：" + fsm_id + "，状态赋值：" + state_data.ValStr + "，状态赋值变量格式错误，应为“（1）*变量；（2）对象名.*变量；（3）*模板变量.*变量；（4）对象名.*模板变量.*变量”几种形式，当前不符合，无法解析，请检查！", ""));
          return false;
        }
      }
      else {
        // *变量
        let varID: string = assignStr.substring(1);
        if (varID == fsm_id) {
          VE_ErrorManager.Add(VE_Error.error("（" + state_data.rowIndex + "，F）", "项目：" + project_name + "，对象：" + object_id + "，状态：" + fsm_id + "，状态赋值：" + state_data.ValStr + "，当前赋值格式“*变量”，状态变量赋值不能自己赋值给自己，请检查！", ""));
          return false;
        }
        let errorInfo: ErrorInfo = new ErrorInfo();
        let stateVar: Nullable<IVeryVar> = VeryVarManager.getVariable(varID, project_name, object_id, errorInfo);
        if (stateVar === null) {
          VE_ErrorManager.Add(VE_Error.error("（" + state_data.rowIndex + "，F）", "项目：" + project_name + "，对象：" + object_id + "，状态：" + fsm_id + "，状态赋值：" + state_data.ValStr + "，状态赋值变量无法在当前系统中查找到，错误信息：" + errorInfo, ""));
          return false;
        }
        else {
          //检测是否可以赋值
          if (VE_AssignmentTypeJudge.allow(fsm.fsmVar, stateVar)) {
            state.setStateVariable(stateVar);
          }
          else {
            VE_ErrorManager.Add(VE_Error.error("（" + state_data.rowIndex + "，F）", "项目：" + project_name + "，对象：" + object_id + "，状态：" + fsm_id + "，状态赋值：" + state_data.ValStr + "，当前赋值格式“*变量”，变量类型与状态类型不匹配，不能赋值，请检查！", ""));
            return false;
          }
        }
      }
    }
    //常量
    else {
      let errorInfo: ErrorInfo = new ErrorInfo();
      let val: any = fsm.fsmVar.initValue(assignStr, errorInfo);
      if (!errorInfo.isRight) {
        VE_ErrorManager.Add(VE_Error.error("（" + state_data.rowIndex + "，F）", "项目：" + project_name + "，对象：" + object_id + "，状态：" + fsm_id + "，状态赋值：" + state_data.ValStr + "，状态赋值常量转化错误，请检查！", ""));
        return false;
      }
      state.setConstValue(val);
    }
    return true;
  }


  private static assignmentAction(project_name: string, object_id: string, fsm_id: string, global_vars: VE_Variables, objects: VE_Objects, very_object: VeryEngineObject, action_data: VE_StateActionData, state: VE_State): boolean {
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
                  VE_ErrorManager.Add(VE_Error.error("", "项目：" + project_name + "，对象：" + object_id + "，状态：" + fsm_id + "，赋值响应：" + action_data.totalString + "，当前赋值响应等号左侧格式“*模板变量.*变量”，该变量不能为“公式”，请检查！", ""));
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
                VE_ErrorManager.Add(VE_Error.error("", "项目：" + project_name + "，对象：" + object_id + "，状态：" + fsm_id + "，赋值响应：" + action_data.totalString + "，当前赋值响应等号左侧格式“*模板变量.*变量”，当前“*模板变量”可以查找到，但是无法查到对应“*变量”，请检查！", ""));
                return false;
              }
            }
            else {
              if (global_vars.isCreatedTemplate(templateVarID)) {
                let template: VE_Template = global_vars.getTemplate(templateVarID);
                if (template.varData.isCreatedVariable(varID)) {
                  let varPara: string[] = template.varData.getVariableParas(varID);
                  if (varPara[1].toLowerCase() === "expression" || varPara[1].toLowerCase() === "公式") {
                    VE_ErrorManager.Add(VE_Error.error("", "项目：" + project_name + "，对象：" + object_id + "，状态：" + fsm_id + "，赋值响应：" + action_data.totalString + "，当前赋值响应等号左侧格式“*模板变量.*变量”，该变量不能为“公式”，请检查！", ""));
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
                  VE_ErrorManager.Add(VE_Error.error("", "项目：" + project_name + "，对象：" + object_id + "，状态：" + fsm_id + "，赋值响应：" + action_data.totalString + "，当前赋值响应等号左侧格式“*模板变量.*变量”，当前“*模板变量”可以查找到，但是无法查到对应“*变量”，请检查！", ""));
                  return false;
                }
              }
              else {
                VE_ErrorManager.Add(VE_Error.error("", "项目：" + project_name + "，对象：" + object_id + "，状态：" + fsm_id + "，赋值响应：" + action_data.totalString + "，当前赋值响应等号左侧格式“*模板变量.*变量”，当前“*模板变量”无法在系统中查找到，请检查！", ""));
                return false;
              }
            }
          }
          //对象名.*变量
          else {
            if (objects.isCreated(valArray[0])) {
              let aObject: VeryEngineObject = objects.getVeryObject(valArray[0]);
              varID = varID.substring(1);
              if (aObject.isCreatedExpression(varID)) {
                VE_ErrorManager.Add(VE_Error.error("", "项目：" + project_name + "，对象：" + object_id + "，状态：" + fsm_id + "，赋值响应：" + action_data.totalString + "，当前赋值响应等号左侧格式“对象名.*变量”，该变量不能为“公式”，请检查！", ""));
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
                VE_ErrorManager.Add(VE_Error.error("", "项目：" + project_name + "，对象：" + object_id + "，状态：" + fsm_id + "，赋值响应：" + action_data.totalString + "，当前赋值响应等号左侧格式“对象名.*变量”，无法在当前对象名中查找到该变量，请检查！", ""));
                return false;
              }
            }
            else {
              VE_ErrorManager.Add(VE_Error.error("", "项目：" + project_name + "，对象：" + object_id + "，状态：" + fsm_id + "，赋值响应：" + action_data.totalString + "，赋值响应等号左侧变量格式“对象名.*变量”，当前“对象名”无法在系统中查找到，请检查！", ""));
              return false;
            }
          }
        }
        else if (valArray.length === 3)  // 对象名.*模板变量.*变量
        {
          // 对象名.*模板变量.*变量，当前未实例化，只做前期语法检测，然后记录参数到状态，状态使用时，动态读取
          if (valArray[0].startsWith(StateConst.STATE_SEPARATOR) || !valArray[1].startsWith(StateConst.STATE_SEPARATOR) || !valArray[2].startsWith(StateConst.STATE_SEPARATOR)) {
            VE_ErrorManager.Add(VE_Error.error("", "项目：" + project_name + "，对象：" + object_id + "，状态：" + fsm_id + "，赋值响应：" + action_data.totalString + "，赋值响应等号左侧变量格式错误，应为“（1）*变量；（2）对象名.*变量；（3）*模板变量.*变量；（4）对象名.*模板变量.*变量”几种形式，当前不符合，无法解析，请检查！", ""));
            return false;
          }
          else {
            let templateVarID: string = valArray[1].substring(1);
            varID = valArray[2].substring(1);
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
                    VE_ErrorManager.Add(VE_Error.error("", "项目：" + project_name + "，对象：" + object_id + "，状态：" + fsm_id + "，赋值响应：" + action_data.totalString + "，赋值响应等号左侧变量格式“对象名.*模板变量.*变量”，当前“对象名.*模板变量.*变量”为公式变量，公式变量不可直接赋值，请检查！", ""));
                    return false;
                  }
                  else {
                    assignment.setLeftTemplateVar(template, varID);
                  }
                }
                else {
                  VE_ErrorManager.Add(VE_Error.error("", "项目：" + project_name + "，对象：" + object_id + "，状态：" + fsm_id + "，赋值响应：" + action_data.totalString + "，赋值响应等号左侧变量格式“对象名.*模板变量.*变量”，当前“对象名.*模板变量”可以查找到，但是无法查到对应“*变量”，请检查！", ""));
                  return false;
                }
              }
              else {
                VE_ErrorManager.Add(VE_Error.error("", "项目：" + project_name + "，对象：" + object_id + "，状态：" + fsm_id + "，赋值响应：" + action_data.totalString + "，赋值响应等号左侧变量格式“对象名.*模板变量.*变量”，当前“对象名”的对象中无法查找到该“*模板变量”，请检查！", ""));
                return false;
              }
            }
            else {
              VE_ErrorManager.Add(VE_Error.error("", "项目：" + project_name + "，对象：" + object_id + "，状态：" + fsm_id + "，赋值响应：" + action_data.totalString + "，赋值响应等号左侧变量格式“对象名.*模板变量.*变量”，当前“对象名”无法在系统中查找到，请检查！", ""));
              return false;
            }
          }
        }
        else {
          VE_ErrorManager.Add(VE_Error.error("", "项目：" + project_name + "，对象：" + object_id + "，状态：" + fsm_id + "，赋值响应：" + action_data.totalString + "，赋值响应等号左侧变量格式错误，应为“（1）*变量；（2）对象名.*变量；（3）*模板变量.*变量；（4）对象名.*模板变量.*变量”几种形式，当前不符合，无法解析，请检查！", ""));
          return false;
        }
      }
      else // *变量
      {
        varID = varID.substring(1);
        if (very_object.isCreatedExpression(varID)) {
          VE_ErrorManager.Add(VE_Error.error("", "项目：" + project_name + "，对象：" + object_id + "，状态：" + fsm_id + "，赋值响应：" + action_data.totalString + "，当前赋值响应等号左侧格式“*变量”，该变量不能为“公式”，请检查！", ""));
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
            VE_ErrorManager.Add(VE_Error.error("", "项目：" + project_name + "，对象：" + object_id + "，状态：" + fsm_id + "，赋值响应：" + action_data.totalString + "，当前赋值响应等号左侧格式“*变量”，该变量不能为“公式”，请检查！", ""));
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
            VE_ErrorManager.Add(VE_Error.error("", "项目：" + project_name + "，对象：" + object_id + "，状态：" + fsm_id + "，赋值响应：" + action_data.totalString + "，当前赋值响应等号左侧格式“*变量”，无法在当前系统中查找到该变量，请检查！", ""));
            return false;
          }
        }
      }
    }
    else {
      VE_ErrorManager.Add(VE_Error.error("", "项目：" + project_name + "，对象：" + object_id + "，状态：" + fsm_id + "，赋值响应：" + action_data.totalString + "，赋值响应等号左边必须为变量，请检查！", ""));
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
      if (!errorInfo.isRight || !localExp) {
        // errorInfo = "模板对象实例化失败：局部变量创建失败，公式创建错误：\n" + errorInfo + "，请检查！" + errorPos;
        // return null;
        VE_ErrorManager.Add(VE_Error.error("", "项目：" + project_name + "，对象：" + object_id + "，状态：" + fsm_id + "，赋值响应：" + action_data.totalString + "，当前赋值响应等号右侧格式“公式”，公式解析错误，请检查！错误信息：" + errorInfo, ""));
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
                  VE_ErrorManager.Add(VE_Error.error("", "项目：" + project_name + "，对象：" + object_id + "，状态：" + fsm_id + "，赋值响应：" + action_data.totalString + "，当前赋值响应等号右侧格式“*模板变量.*变量”，当前“*模板变量”可以查找到，但是无法查到对应“*变量”，请检查！", ""));
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
                    VE_ErrorManager.Add(VE_Error.error("", "项目：" + project_name + "，对象：" + object_id + "，状态：" + fsm_id + "，赋值响应：" + action_data.totalString + "，当前赋值响应等号右侧格式“*模板变量.*变量”，当前“*模板变量”可以查找到，但是无法查到对应“*变量”，请检查！", ""));
                    return false;
                  }
                }
                else {
                  VE_ErrorManager.Add(VE_Error.error("", "项目：" + project_name + "，对象：" + object_id + "，状态：" + fsm_id + "，赋值响应：" + action_data.totalString + "，当前赋值响应等号右侧格式“*模板变量.*变量”，当前“*模板变量”无法在系统中查找到，请检查！", ""));
                  return false;
                }
              }
            }
            // 对象名.*变量
            else {
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
                  VE_ErrorManager.Add(VE_Error.error("", "项目：" + project_name + "，对象：" + object_id + "，状态：" + fsm_id + "，赋值响应：" + action_data.totalString + "，当前赋值响应等号右侧格式“对象名.*变量”，无法在当前系统中查找到该变量，请检查！", ""));
                  return false;
                }
                // 赋值合理性判断
                if (rightVar !== null) {
                  if (assignment.leftType === AssignType.Template) {
                    VE_ErrorManager.Add(VE_Error.error("", "项目：" + project_name + "，对象：" + object_id + "，状态：" + fsm_id + "，赋值响应：" + action_data.totalString + "，当前赋值响应等号左侧为“模板变量”类型，右侧为“普通变量”类型，无法赋值，请检查！", ""));
                    return false;
                  }
                  else if (assignment.leftType === AssignType.Variable) {
                    if (VE_AssignmentTypeJudge.allow(assignment.leftVariable!, rightVar)) {
                      assignment.setRightVariable(rightVar);
                    }
                    else {
                      VE_ErrorManager.Add(VE_Error.error("", "项目：" + project_name + "，对象：" + object_id + "，状态：" + fsm_id + "，赋值响应：" + action_data.totalString + "，当前赋值响应等号左侧和右侧类型不匹配，无法赋值，请检查！", ""));
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
                    VE_ErrorManager.Add(VE_Error.error("", "项目：" + project_name + "，对象：" + object_id + "，状态：" + fsm_id + "，赋值响应：" + action_data.totalString + "，当前赋值响应等号左侧为“模板变量”，右侧为“普通变量”，无法赋值，请检查！", ""));
                    return false;
                  }
                }
                else {
                  VE_ErrorManager.Add(VE_Error.error("", "项目：" + project_name + "，对象：" + object_id + "，状态：" + fsm_id + "，赋值响应：" + action_data.totalString + "，当前赋值响应等号右侧数据无法识别，请检查！", ""));
                  return false;
                }
              }
              else {
                VE_ErrorManager.Add(VE_Error.error("", "项目：" + project_name + "，对象：" + object_id + "，状态：" + fsm_id + "，赋值响应：" + action_data.totalString + "，赋值响应等号右侧变量格式“对象名.*变量”，当前“对象名”无法在系统中查找到，请检查！", ""));
                return false;
              }
            }
          }
          else if (valArray.length === 3)  // 对象名.*模板变量.*变量
          {
            // 对象名.*模板变量.*变量，当前未实例化，只做前期语法检测，然后记录参数到状态，状态使用时，动态读取
            if (valArray[0].startsWith(StateConst.STATE_SEPARATOR) || !valArray[1].startsWith(StateConst.STATE_SEPARATOR) || !valArray[2].startsWith(StateConst.STATE_SEPARATOR)) {
              VE_ErrorManager.Add(VE_Error.error("", "项目：" + project_name + "，对象：" + object_id + "，状态：" + fsm_id + "，赋值响应：" + action_data.totalString + "，赋值响应等号右侧变量格式错误，应为“（1）*变量；（2）对象名.*变量；（3）*模板变量.*变量；（4）对象名.*模板变量.*变量”几种形式，当前不符合，无法解析，请检查！", ""));
              return false;
            }
            else {
              let templateVarID: string = valArray[1].substring(1);
              varID = valArray[2].substring(1);
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
                    VE_ErrorManager.Add(VE_Error.error("", "项目：" + project_name + "，对象：" + object_id + "，状态：" + fsm_id + "，赋值响应：" + action_data.totalString + "，赋值响应等号右侧变量格式“对象名.*模板变量.*变量”，当前“对象名.*模板变量”可以查找到，但是无法查到对应“*变量”，请检查！", ""));
                    return false;
                  }
                }
                else {
                  VE_ErrorManager.Add(VE_Error.error("", "项目：" + project_name + "，对象：" + object_id + "，状态：" + fsm_id + "，赋值响应：" + action_data.totalString + "，赋值响应等号右侧变量格式“对象名.*模板变量.*变量”，当前“对象名”的对象中无法查找到该“*模板变量”，请检查！", ""));
                  return false;
                }
              }
              else {
                VE_ErrorManager.Add(VE_Error.error("", "项目：" + project_name + "，对象：" + object_id + "，状态：" + fsm_id + "，赋值响应：" + action_data.totalString + "，赋值响应等号右侧变量格式“对象名.*模板变量.*变量”，当前“对象名”无法在系统中查找到，请检查！", ""));
                return false;
              }
            }
          }
          else {
            VE_ErrorManager.Add(VE_Error.error("", "项目：" + project_name + "，对象：" + object_id + "，状态：" + fsm_id + "，赋值响应：" + action_data.totalString + "，赋值响应等号右侧变量格式错误，应为“（1）*变量；（2）对象名.*变量；（3）*模板变量.*变量；（4）对象名.*模板变量.*变量”几种形式，当前不符合，无法解析，请检查！", ""));
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
                VE_ErrorManager.Add(VE_Error.error("", "项目：" + project_name + "，对象：" + object_id + "，状态：" + fsm_id + "，赋值响应：" + action_data.totalString + "，当前赋值响应等号右侧格式“*变量”，无法在当前系统中查找到该变量，请检查！", ""));
                return false;
              }
            }
          }
          // 赋值合理性判断
          if (rightVar != null) {
            if (assignment.leftType === AssignType.Template) {
              VE_ErrorManager.Add(VE_Error.error("", "项目：" + project_name + "，对象：" + object_id + "，状态：" + fsm_id + "，赋值响应：" + action_data.totalString + "，当前赋值响应等号左侧为“模板变量”类型，右侧为“普通变量”类型，无法赋值，请检查！", ""));
              return false;
            }
            else if (assignment.leftType === AssignType.Variable) {
              if (VE_AssignmentTypeJudge.allow(assignment.leftVariable!, rightVar)) {
                assignment.setRightVariable(rightVar);
              }
              else {
                VE_ErrorManager.Add(VE_Error.error("", "项目：" + project_name + "，对象：" + object_id + "，状态：" + fsm_id + "，赋值响应：" + action_data.totalString + "，当前赋值响应等号左侧和右侧类型不匹配，无法赋值，请检查！", ""));
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
              VE_ErrorManager.Add(VE_Error.error("", "项目：" + project_name + "，对象：" + object_id + "，状态：" + fsm_id + "，赋值响应：" + action_data.totalString + "，当前赋值响应等号左侧为“模板变量”，右侧为“普通变量”，无法赋值，请检查！", ""));
              return false;
            }
          }
          else {
            VE_ErrorManager.Add(VE_Error.error("", "项目：" + project_name + "，对象：" + object_id + "，状态：" + fsm_id + "，赋值响应：" + action_data.totalString + "，当前赋值响应等号右侧数据无法识别，请检查！", ""));
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
            VE_ErrorManager.Add(VE_Error.error("", "项目：" + project_name + "，对象：" + object_id + "，状态：" + fsm_id + "，赋值响应：" + action_data.totalString + "，当前赋值响应等号左侧为模板变量，右侧赋值为常量时只能填“null”，表示销毁模板变量，当前格式错误，请检查！", ""));
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
            if (!errorInfo.isRight || !newValue) {
              VE_ErrorManager.Add(VE_Error.error("", "项目：" + project_name + "，对象：" + object_id + "，状态：" + fsm_id + "，赋值响应：" + action_data.totalString + "，当前赋值响应等号左侧变量类型与右侧常量值不匹配，错误信息：" + errorInfo + "，请检查！", ""));
              return false;
            }
            else {
              assignment.setRightConstValue(newValue);
            }
          }
          else {
            VE_ErrorManager.Add(VE_Error.error("", "项目：" + project_name + "，对象：" + object_id + "，状态：" + fsm_id + "，赋值响应：" + action_data.totalString + "，当前赋值响应等号左侧变量获取为空，请检查！", ""));
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






  public static createInstance(project_name: string, object_id: string, var_id: string, template: VE_Template, object_name: string, error_info: ErrorInfo, destroy_on_create_new: boolean): VE_Template {


    return template;
  }


}