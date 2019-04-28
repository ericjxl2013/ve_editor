import { ActionType, SequenceActionState } from "../enum";

export abstract class VE_ActionBehaviour {

  public abstract get ID(): string;

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

  // protected GameObject ObjectInstance = null;
  // protected veryObject: VeryObject = null;

  public get objectID(): string {
    return this._objectID;
  };
  private _objectID: string = '';

  public get actionID(): string {
    return this._actionID;
  }
  private _actionID: string = '';

  public get Type(): ActionType {
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

  // private VE_SequenceActions _sequenceAction = null;


  public setEveryFrame(is_every_frame: boolean): void {
    this._erveryFrame = is_every_frame;
  }

  public setActionID(object_id: string, action_id: string): void {
    this._objectID = object_id;
    this._actionID = action_id;
  }

  // SetVeryObject(): void {}

  public paraParser(para_array: string[]): boolean {
    if (para_array) { }
    return true;
  }

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

  public abstract active(): void;


  public update(): void {
    if(this._enabled && this._erveryFrame) {
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

    this.enabled = false;
  }

  // 如果创建过程中有add callback，需要destroy时删除
  public abstract destroy(): void;


}