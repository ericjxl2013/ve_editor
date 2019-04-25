import { VE_State } from "../state/state";
import { StateConst } from "../state/stateConst";
import { ExpressTree } from "../expression";

export abstract class VE_TriggerBehaviour {

  abstract get ID(): string;

  ProjectName: string = '';

  public get isEnabled(): boolean {
    if (this._logicalSwitch) {
      for (let i: number = 0; i < this._logicalSwitch.length; i++) {
        if (!this._logicalSwitch[i].evaluate()) {
          return false;
        }
      }
    }
    return true;
  }

  // Logical
  private _logicalSwitch: ExpressTree[] = [];
  private _logicalExp: ExpressTree[] = [];
  // State
  private _triggerTargets: VE_State[] = [];

  // protected GameObject ObjectInstance = null;
  // protected VeryEngineObject VeryObject = null;

  public get objectID(): string {
    return this._objectID;
  }
  private _objectID: string = '';

  public get triggerID(): string {
    return this._triggerID;
  }
  private _triggerID: string = '';

  private _id: string = '';

  public setTriggerID(trigger_id: string, object_id: string): void {
    this._triggerID = trigger_id;
    this._objectID = object_id;
    this._id = object_id + StateConst.STATE_SEPARATOR + trigger_id;
  }

  public addLogicalSwitch(exp: ExpressTree): void {
    this._logicalSwitch.push(exp);
  }

  public addTriggerTarget(exp: ExpressTree, state: VE_State): void {
    this._logicalExp.push(exp);
    this._triggerTargets.push(state);
  }

  public sendEvent(): void {
    this.eventProcess();
  }

  // 关联具体响应
  private eventProcess(): void {
    if (this._triggerTargets) {
      for (let i: number = 0; i < this._triggerTargets.length; i++) {
        if (this._logicalExp[i].evaluate()) {
          this._triggerTargets[i].action(this._id);
        }
      }
    }
  }


  public paraParser(para_array: string[]): boolean {
    return true;
  }

  public abstract destroy(): void;


}