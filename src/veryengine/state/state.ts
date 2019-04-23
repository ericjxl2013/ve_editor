import { VE_Fsm } from "./fsm";
import { VE_StateAction } from "./stateAction";
import { VE_AssociatedState } from "./associatedState";

export class VE_State {

  public get Fsm(): VE_Fsm {
    return this._fsm;
  }
  private _fsm: VE_Fsm;

  public get Value(): string {
    return this._value;
  }
  private _value: string = '空状态';

  private _stateActions: VE_StateAction[] = [];
  private _assocaitedStates: VE_AssociatedState[] = [];

  public get IsSequence(): boolean {
    return this._isSequence;
  }
  private _isSequence: boolean = false;


  constructor(fsm: VE_Fsm, state_value: string = '空状态') {
    this._fsm = fsm;
    this._value = state_value;
  }

  setValue(state_value: string): void {
    this._value = state_value;
  }

  addAction(state_action: VE_StateAction) : void {
    this._stateActions.push(state_action);
    BABYLON.Mesh.bind
  }
  





}