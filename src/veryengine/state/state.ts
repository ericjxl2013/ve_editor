import { VE_Fsm } from "./fsm";
import { VE_StateAction } from "./stateAction";
import { VE_AssociatedState } from "./associatedState";
import {
  AssignmentType,
  StateActionType,
  ActionType,
  SequenceActionState
} from "../enum";
import { VE_Template } from "../template";
import { IVeryVar, VeryExpression } from "../variables";
import { IExpression } from "../expression";
import { VE_SequenceActions, VE_Assignment } from "../action";

export class VE_State {
  public get Fsm(): VE_Fsm {
    return this._fsm;
  }
  private _fsm: VE_Fsm;

  public get isInitialValue(): boolean {
    return this._isInitialValue;
  }
  private _isInitialValue: boolean = false;

  public get Value(): any {
    return this._value;
  }
  private _value: any = "";

  private _assignmentType: AssignmentType = AssignmentType.Const;

  public get isTemplateVar(): boolean {
    return this._isTemplateVar;
  }
  private _isTemplateVar: boolean = false;

  private _template: Nullable<VE_Template> = null;
  private _varID: string = "";
  private _templateVar: Nullable<IVeryVar> = null;
  private _assignmentStr: string = "";

  public get logicalExpression(): Nullable<IExpression> {
    return this._logicalExpression;
  }
  private _logicalExpression: Nullable<IExpression> = null;

  public get index(): number {
    return this._index;
  }
  private _index: number = 0;

  public get stateVariable(): Nullable<IVeryVar> {
    return this._stateVariable;
  }
  private _stateVariable: Nullable<IVeryVar> = null;

  public logicalAssociated: Nullable<IExpression> = null;

  private _stateActions: VE_StateAction[] = [];
  private _assocaitedStates: VE_AssociatedState[] = [];

  public get IsSequence(): boolean {
    return this._isSequence;
  }
  private _isSequence: boolean = false;

  public _sequenceActions: Nullable<VE_SequenceActions> = null;

  // 假设当前为序列运行，需要做一些判断
  // 1.判断当前是否正在运行，若正在运行，则失败

  constructor(fsm: VE_Fsm, index: number) {
    this._fsm = fsm;
    this._index = index;
  }

  public setInitialValue(value: any): void {
    this._value = value;
    this._assignmentType = AssignmentType.Const;
  }

  public setSequence(): void {
    this._isSequence = true;
  }

  public setLogicalExpression(logical_exp: IExpression): void {
    this._logicalExpression = logical_exp;
  }

  public setTemplateInfo(
    template: VE_Template,
    var_id: string,
    assign_str: string
  ): void {
    this._isTemplateVar = true;
    this._template = template;
    this._varID = var_id;
    this._assignmentStr = assign_str;
  }

  public setConstValue(value: any): void {
    this._value = value;
    this._assignmentType = AssignmentType.Const;
  }

  public setStateVariable(very_var: IVeryVar): void {
    this._stateVariable = very_var;
    this._assignmentType = AssignmentType.Variable;
  }

  public addAction(state_action: VE_StateAction): void {
    this._stateActions.push(state_action);
    if (
      state_action.type === StateActionType.Action &&
      state_action.action!.isSequence
    ) {
      this._isSequence = true;
    }
  }

  public addAssignment(assignment: VE_Assignment): void {
    let stateAction: VE_StateAction = new VE_StateAction();
    stateAction.setAssignment(assignment);
    this._stateActions.push(stateAction);
  }

  public addAssociatedState(associated_state: VE_AssociatedState): void {
    this._assocaitedStates.push(associated_state);
  }

  // TODO
  public action(trigger_id: string): void {
    // 先访问Parent，确定是否可激活响应
    if (this._fsm.receiveEvent(trigger_id)) {
      if (this._isTemplateVar) {
        // TODO:当模板被删除时，会不会依然不为null
        if (this._templateVar === null) {
          this.getTemplateVar();
        } else {
          if (this._templateVar.className === "VeryExpression") {
            // TODO
            if ((<VeryExpression>this._templateVar).isNull) {
              this.getTemplateVar();
            } else {
              this.Fsm.setValue(this._templateVar.getValue());
            }
          } else {
            this.Fsm.setValue(this._templateVar.getValue());
          }
        }
      } else {
        // 设置当前状态值
        if (this._assignmentType == AssignmentType.Const) {
          // 常量
          this.Fsm.setValue(this.Value);
        } else if (this._assignmentType == AssignmentType.Variable) {
          // 变量
          this.Fsm.setValue(this._stateVariable!.getValue());
        } // 公式
        else {
          // 不需要
          // this.Fsm.setValue(this._stateExpression.evaluate());
        }
      }

      // 响应是否允许运行检测
      for (let i: number = 0; i < this._stateActions.length; i++) {
        //只有时间相关响应需要检测
        if (
          this._stateActions[i].type === StateActionType.Action &&
          this._stateActions[i]!.action!.Type === ActionType.Animation
        ) {
          if (
            this._stateActions[i]!.action!.SequenceState ===
              SequenceActionState.Prepared ||
            this._stateActions[i]!.action!.SequenceState ===
              SequenceActionState.Running
          ) {
            console.log(
              "（项目：" +
                this._fsm.projectName +
                "，对象：" +
                this._fsm.objectID +
                "，状态：" +
                this._fsm.fsmID +
                "，ID：" +
                this._index +
                "），当前状态中的响应：" +
                this._stateActions[i]!.action!.actionID +
                "，该响应处于“动画”运行状态，运行结束前不允许再次启动！"
            );
            return;
          } else if (
            this._stateActions[i]!.action!.SequenceState ===
            SequenceActionState.Pause
          ) {
            console.log(
              "（项目：" +
                this._fsm.projectName +
                "，对象：" +
                this._fsm.objectID +
                "，状态：" +
                this._fsm.fsmID +
                "，ID：" +
                this._index +
                "），当前状态中的响应：" +
                this._stateActions[i]!.action!.actionID +
                "，该响应处于“动画”运行状态（暂停中），运行结束前不允许再次启动！"
            );
            return;
          }
        }
      }

      //状态响应顺序运行, TODO: 动画响应表格逻辑被修改，以下逻辑有冗余
      if (this._isSequence) {
        // TODO: 这里
        // this._sequenceActions = this._fsm.VeryObject.gameObject.AddComponent<
        //   VE_SequenceActions
        // >();
        // this._sequenceActions!.sequenceAction(
        //   this._stateActions,
        //   this._associatedStates
        // );
      } else {
        // 运行响应
        for (let i: number = 0; i < this._stateActions.length; i++) {
          let stateAction: VE_StateAction = this._stateActions[i];
          // 一般响应
          if (stateAction.type === StateActionType.Action) {
            // TODO: 目前为常量，理论上可以为变量
            stateAction!.action!.action(
              stateAction.enabled,
              stateAction.everyFrame
            );
          }
          // 赋值响应
          else {
            stateAction!.assignment!.assign();
          }
        }
        // 关联状态
        if (this._assocaitedStates.length > 0) {
          // 对方可能是模板对象
          // 测试对象
          for (let i: number = 0; i < this._assocaitedStates.length; i++) {
            this._assocaitedStates[i].connect();
          }
        }
      }
    }
  }

  private getTemplateVar(): void {
    if (this._template!.templateInstance === null) {
      console.log(
        "项目：" +
          this._fsm.projectName +
          "，对象：" +
          this._fsm.objectID +
          "，状态：" +
          this._fsm.fsmID +
          "，状态赋值：" +
          this._assignmentStr +
          "，当前赋值模板对象未实例化，赋值前，请先启动对应响应实例化该模板对象！"
      );
      this._templateVar = null;
      return;
    } else {
      if (this._template!.templateInstance.isCreatedVariable(this._varID)) {
        this._templateVar = this._template!.templateInstance.getVariable(
          this._varID
        );
      } else if (
        this._template!.templateInstance.isCreatedExpression(this._varID)
      ) {
        this._templateVar = new VeryExpression(
          this._template!.templateInstance.getExpression(this._varID)
        );
      } else if (this._template!.templateInstance.isCreatedFsm(this._varID)) {
        this._templateVar = this._template!.templateInstance.getFsm(
          this._varID
        ).fsmVar;
      } else {
        console.log(
          "项目：" +
            this._fsm.projectName +
            "，对象：" +
            this._fsm.objectID +
            "，状态：" +
            this._fsm.fsmID +
            "，状态赋值：" +
            this._assignmentStr +
            "，在模板变量对象中无法查找到该变量：" +
            this._varID +
            "，请检查！"
        );
        this._templateVar = null;
        return;
      }
      this._fsm.setValue(this._templateVar.getValue());
    }
  }
}
