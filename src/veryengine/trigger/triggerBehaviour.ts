import { VE_State } from "../state/state";
import { StateConst } from "../state/stateConst";
import { IExpression } from "../expression";

export abstract class VE_TriggerBehaviour {

  abstract get ID(): string;

  protected scene!: BABYLON.Scene;

  public get enabled(): boolean {
    return this._enabled;
  }
  public set enabled(val: boolean) {
    this._enabled = val;
  }
  private _enabled: boolean = true;

  public get projectName(): string {
    return this._projectName;
  }
  private _projectName: string = '';

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
  private _logicalSwitch: IExpression[] = [];
  private _logicalExp: IExpression[] = [];
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


  public set(scene: BABYLON.Scene): void {
    this.scene = scene;
  }

  public setTriggerID(trigger_id: string, object_id: string): void {
    this._triggerID = trigger_id;
    this._objectID = object_id;
    this._id = object_id + StateConst.STATE_SEPARATOR + trigger_id;
  }

  public addLogicalSwitch(exp: IExpression): void {
    this._logicalSwitch.push(exp);
  }

  public addTriggerTarget(exp: IExpression, state: VE_State): void {
    this._logicalExp.push(exp);
    this._triggerTargets.push(state);
  }

  public sendEvent(): void {
    if(this.isEnabled) {
      this.eventProcess();
    }
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

  public update(): void {
    if(this.isEnabled) {
      this.onUpdate();
    }
  }

  public onUpdate(): void {

  }

  public abstract destroy(): void;


}