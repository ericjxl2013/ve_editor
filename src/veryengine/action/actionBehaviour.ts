import { ActionType } from "../enum/actionType";

export abstract class VE_ActionBehaviour {

  abstract get ID(): string;

  ProjectName: string = '';

  // protected GameObject ObjectInstance = null;
  // protected VeryEngineObject VeryObject = null;

  ObjectID: string = '';
  ActionID: string = '';

  get Type(): ActionType {
    return ActionType.Normal;
  }

  private _erveryFrame: boolean = false;
  get EveryFrame(): boolean {
    return this._erveryFrame;
  }

  /*
  public bool IsSequence = false;

  public SequenceActionState SequenceState
  {
    get { return this._sequenceState; }
    set { this._sequenceState = value; }
  }
  private SequenceActionState _sequenceState = SequenceActionState.Initial;

  private VE_SequenceActions _sequenceAction = null;
  */

  SetEveryFrame(is_every_frame: boolean): void {
    this._erveryFrame = is_every_frame;
  }

  SetActionID(object_id: string, action_id: string): void {
    this.ObjectID = object_id;
    this.ActionID = action_id;
  }

  // SetVeryObject(): void {}

  ParaParser(para_array: string[]): boolean {
    if (para_array) { }
    return true;
  }

  // Action(): void {}

  abstract Active(): void;


  Update(): void {

  }

  OnUpdate(): void {

  }

  


}