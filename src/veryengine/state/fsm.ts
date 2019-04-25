import { Dictionary } from "../utility/dictionary";
import { VE_State } from "./state";

export class VE_Fsm {

  public get ID(): string {
    return this._id;
  }
  private _id: string = '';

  public get ObjectID(): string {
    return this._objectID;
  }
  private _objectID: string = '';

  public get FsmID(): string {
    return this._fsmID;
  }
  private _fsmID: string = '';

  private _stateDics: Dictionary<string, VE_State> = new Dictionary<string, VE_State>();
  private _states: VE_State[] = [];
 
  constructor() {
    // this._stateDics.TryGetValue(1);
  }

  hasState(state_value: string): boolean {
    return this._stateDics.ContainsKey(state_value);
  }

  addState(state_value: string, state: VE_State): void {
    if (!this._stateDics.ContainsKey(state_value)) {
      this._stateDics.Add(state_value, state);
      this._states.push(state);
    }
  }

  getState(state_value: string): VE_State | null {
    return this._stateDics.GetValue(state_value);
  }
 
  removeState(state_value: string): boolean {
    if (this.hasState(state_value)) {
      this._stateDics.Remove(state_value);
      return true;
    } else {
      return false;
    }
  }

  // receiveEvent(trigger_id: string): boolean {

  // }

}