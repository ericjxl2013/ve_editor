import { VE_Fsm } from "./fsm";
import { VE_StateAction } from "./stateAction";
import { VE_AssociatedState } from "./associatedState";
import { AssignmentType, StateActionType } from "../enum";
import { VE_Template } from "../template";
import { IVeryVar } from "../variables";
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
  private _value: any = '';

  private _assignmentType: AssignmentType = AssignmentType.Const;

  public get isTemplateVar(): boolean {
    return this._isTemplateVar
  }
  private _isTemplateVar: boolean = false;

  private _template: Nullable<VE_Template> = null;
  private _varID: string = '';
  private _templateVar: Nullable<IVeryVar> = null;
  private _assignmentStr: string = '';

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

  public sequenceActions: Nullable<VE_SequenceActions> = null;

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

  public setTemplateInfo(template: VE_Template, var_id: string, assign_str: string): void {
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
    if (state_action.type === StateActionType.Action && state_action.action!.isSequence) {
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
    if (this._fsm.receiveEvent(trigger_id)) {

    }
  }
}
