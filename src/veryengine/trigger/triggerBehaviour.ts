import { VE_State } from "../state/state";
import { StateConst } from "../state/stateConst";
import { IExpression } from "../expression";
import { VeryEngineObject } from "../object";

export abstract class VE_TriggerBehaviour {

  public abstract get ID(): string;

  public abstract get className(): string;

  public get scene(): BABYLON.Scene {
    return this._scene;
  }
  public _scene!: BABYLON.Scene;

  public get enabled(): boolean {
    return this._enabled && this.isEnabled;
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
        if (this._logicalSwitch[i] && !this._logicalSwitch[i].evaluate()) {
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
  protected VeryObject: Nullable<VeryEngineObject> = null;

  public get objectID(): string {
    return this._objectID;
  }
  private _objectID: string = 'object-axxx';

  public get triggerID(): string {
    return this._triggerID;
  }
  private _triggerID: string = '';

  public get unionID(): string {
    return this._id;
  }
  private _id: string = '';

  public test(): void {
    console.log(this._objectID);
  }


  public set(scene: BABYLON.Scene): void {
    this._scene = scene;
  }

  public setTriggerID(project_name: string, trigger_id: string, object_id: string): void {
    this._projectName = project_name;
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

  public setVeryObject(very_object: VeryEngineObject): void {
    this.VeryObject = very_object;
  }

  public sendEvent(): void {
    this.eventProcess();
  }

  // 关联具体响应
  private eventProcess(): void {
    if (this._triggerTargets) {
      // console.log(`ID: ${this.triggerID} --- Count: ${this._triggerTargets.length}`);
      for (let i: number = 0; i < this._triggerTargets.length; i++) {
        if (!this._logicalExp[i] || this._logicalExp[i].evaluate()) {
          this._triggerTargets[i].action(this._id);
        }
      }
    }
  }


  public abstract paraParser(para_array: string[]): boolean;

  public update(): void {
    if (this.isEnabled) {
      this.onUpdate();
    }
  }

  public onUpdate(): void {

  }

  public abstract destroy(): void;


}