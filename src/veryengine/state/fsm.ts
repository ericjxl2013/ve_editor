import { VE_State } from "./state";
import { BabylonEngine } from "../babylon";
import { StateConst } from "./stateConst";
import { IVeryVar } from "../variables";
import { VeryEngineObject } from "../object";

export class VE_Fsm {
  public get projectName(): string {
    return this._projectName;
  }
  private _projectName: string = "";

  public get ID(): string {
    return this._id;
  }
  private _id: string = "";

  public get objectID(): string {
    return this._objectID;
  }
  private _objectID: string = "";

  public get fsmID(): string {
    return this._fsmID;
  }
  private _fsmID: string = "";

  public get fsmVar(): IVeryVar {
    return this._fsmVar;
  }
  private _fsmVar: IVeryVar;

  public get VeryObject(): VeryEngineObject {
    return this._veryObject;
  }
  private _veryObject: VeryEngineObject;

  private _stateDics: { [key: number]: VE_State } = {};
  private _states: VE_State[] = [];

  public get count(): number {
    return this._states.length;
  }

  private _frameCount: number = -1;
  private _triggerIDs: string[] = [];

  constructor(
    project_name: string,
    object_id: string,
    fsm_id: string,
    fsm_variable: IVeryVar,
    very_object: VeryEngineObject
  ) {
    this._projectName = project_name;
    this._objectID = object_id;
    this._fsmID = fsm_id;
    this._fsmVar = fsm_variable;
    this._veryObject = very_object;
  }

  public isCreatedState(state_index: number): boolean {
    if (this._stateDics[state_index]) {
      return true;
    } else {
      return false;
    }
  }

  public addState(state: VE_State, state_index: number): void {
    this._states.push(state);
    if (state_index !== StateConst.STATE_INDEX && !this._stateDics[state_index]) {
      this._stateDics[state_index] = state;
    }
  }

  public getState(state_index: number): Nullable<VE_State> {
    if (state_index === StateConst.STATE_INDEX) {
      return this._states[0];
    } else {
      if (this._stateDics[state_index]) {
        return this._stateDics[state_index];
      } else {
        return null;
      }
    }
  }

  public getStateInSequence(index: number): Nullable<VE_State> {
    if (index >= 0 && index < this._states.length) {
      return this._states[index];
    } else {
      return null;
    }
  }

  public removeState(state_index: number): void {
    delete this._stateDics[state_index];
  }

  public receiveEvent(trigger_id: string): boolean {

    if (BabylonEngine.Scene.getFrameId() != this._frameCount) {
      this._frameCount = BabylonEngine.Scene.getFrameId();
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

  public setValue(value: any): void {
    this._fsmVar.setValue(value);
  }
}
