import { Dictionary } from "../utility/dictionary";
import { VE_State } from "./state";
import { Time } from "../global";
import { StateConst } from "./stateConst";
import { IVeryVar, VeryString } from "../variables";
import { VeryEngineObject } from "../object";

export class VE_Fsm {

  public get projectName(): string {
    return this._projectName;
  }
  private _projectName: string = '';

  public get ID(): string {
    return this._id;
  }
  private _id: string = '';

  public get objectID(): string {
    return this._objectID;
  }
  private _objectID: string = '';

  public get fsmID(): string {
    return this._fsmID;
  }
  private _fsmID: string = '';

  public get fsmVar(): IVeryVar {
    return this._fsmVar;
  }
  private _fsmVar: IVeryVar;

  public get VeryObject(): VeryEngineObject {
    return this._veryObject;
  }
  private _veryObject: VeryEngineObject;

  private _stateDics: Dictionary<number, VE_State> = new Dictionary<number, VE_State>();
  private _states: VE_State[] = [];

  public get count(): number {
    return this._states.length;
  }

  private _frameCount: number = -1;
  private _triggerIDs: string[] = [];

  constructor(project_name: string, object_id: string, fsm_id: string, fsm_variable: IVeryVar, very_object: VeryEngineObject) {
    this._projectName = project_name;
    this._objectID = object_id;
    this._fsmID = fsm_id;
    this._fsmVar = fsm_variable;
    this._veryObject = very_object;
  }

  public isCreatedState(state_index: number): boolean {
    return this._stateDics.ContainsKey(state_index);
  }

  public addState(state: VE_State, state_index: number): void {
    if (!this._stateDics.ContainsKey(state_index)) {
      this._stateDics.Add(state_index, state);
      this._states.push(state);
    }
  }

  public getState(state_index: number): Nullable<VE_State> {
    return this._stateDics.GetValue(state_index);
  }

  public removeState(state_index: number): boolean {
    if (this.isCreatedState(state_index)) {
      this._stateDics.Remove(state_index);
      return true;
    } else {
      return false;
    }
  }

  public receiveEvent(trigger_id: string): boolean {
    if (Time.frameCount != this._frameCount) {
      this._frameCount = Time.frameCount;
      this._triggerIDs = [];
      this._triggerIDs.push(trigger_id);
      return true;
    } else {
      if (trigger_id.startsWith(StateConst.ASSOCIATED_STATE_PREFIX)) {
        // console.log(`ID: ${trigger_id} Return True`);
        return true;
      } else {
        if (this._triggerIDs.indexOf(trigger_id) !== -1) {
          return false;
        } else {
          this._triggerIDs.push(trigger_id);
          return true;
        }
      }
    }
  }

}