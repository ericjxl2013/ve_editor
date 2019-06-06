import { ActionType, SequenceActionState } from "../enum";
import { GameObject } from "../babylon";
import { VeryEngineObject } from "../object";
import { VE_SequenceActions } from "../state";

export abstract class VE_ActionBehaviour {

  public abstract get ID(): string;

  public abstract get className(): string;

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
  };
  private _projectName: string = '';

  protected gameObject: Nullable<GameObject> = null;
  protected veryObject: Nullable<VeryEngineObject> = null;

  public get objectID(): string {
    return this._objectID;
  };
  private _objectID: string = '';

  public get actionID(): string {
    return this._actionID;
  }
  private _actionID: string = '';

  public get type(): ActionType {
    return ActionType.Normal;
  }

  private _erveryFrame: boolean = false;
  public get everyFrame(): boolean {
    return this._erveryFrame;
  }


  public isSequence: boolean = false;

  public get SequenceState(): SequenceActionState {
    return this._sequenceState;
  }
  public set SequenceState(val: SequenceActionState) {
    this._sequenceState = val;
  }
  private _sequenceState: SequenceActionState = SequenceActionState.Initial;

  private _sequenceAction: Nullable<VE_SequenceActions> = null;

  public set(scene: BABYLON.Scene): void {
    this.scene = scene;
  }

  public setEveryFrame(is_every_frame: boolean): void {
    this._erveryFrame = is_every_frame;
  }

  public setActionID(project_name: string, object_id: string, action_id: string): void {
    this._projectName = project_name;
    this._objectID = object_id;
    this._actionID = action_id;
  }

  public setVeryObject(very_object: VeryEngineObject): void {
    this.veryObject = very_object;
    this.gameObject = very_object.gameObject;
  }

  public abstract paraParser(para_array: string[]): boolean;

  public action(action_val: boolean, every_frame: boolean): void {
    this._enabled = action_val;
    this._erveryFrame = every_frame;
    if (this._enabled) {
      this.active()
      if (!this._erveryFrame) {
        this.onUpdate();
      }
    }
  }

  public sequenceAction(sequence: VE_SequenceActions, action_val: boolean, every_frame: boolean): void {
    this._sequenceAction = sequence;
    this._sequenceState = SequenceActionState.Running;
    this.action(action_val, every_frame);
  }

  public abstract active(): void;


  public update(): void {
    if (this._enabled && this._erveryFrame) {
      this.onUpdate();
    }
  }

  public onUpdate(): void {

  }

  public pause(): void {
    this._sequenceState = SequenceActionState.Pause;
  }

  public resume(): void {
    this._sequenceState = SequenceActionState.Running;
  }

  public stop(): void {
    this._sequenceState = SequenceActionState.Initial;
  }

  public finish(): void {
    this._sequenceState = SequenceActionState.Initial;
    if(this._sequenceAction !== null) {
      this._sequenceAction.finishAction(this);
      this._sequenceAction = null;
    }
    this.enabled = false;
  }

  // 如果创建过程中有add callback，需要destroy时删除
  public abstract destroy(): void;


}