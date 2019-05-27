
import { VE_ActionBehaviour } from "../action/actionBehaviour";
import { StateActionType } from "../enum";
import { VE_Assignment } from "../action";

export class VE_StateAction {

  public get type(): StateActionType {
    return this._type;
  }
  private _type: StateActionType = StateActionType.Action;

  public get action(): Nullable<VE_ActionBehaviour> {
    return this._action;
  }
  private _action: Nullable<VE_ActionBehaviour> = null;

  public get enabled(): boolean {
    return this._enabled;
  }
  private _enabled: boolean = false;

  public get everyFrame(): boolean {
    return this._everyFrame;
  }
  private _everyFrame: boolean = false;

  public get assignment(): Nullable<VE_Assignment> {
    return this._assignment;
  }
  private _assignment: Nullable<VE_Assignment> = null;

  constructor() {

  }

  public setAction(action: VE_ActionBehaviour, enabled: boolean = false, every_frame: boolean = false, sequence: boolean = false): void {
    this._action = action;
    this._enabled = enabled;
    this._everyFrame = every_frame;
    this._action.isSequence = sequence;
    this._type = StateActionType.Action; 
  }

  public setAssignment(assignment: VE_Assignment): void {
    this._assignment = assignment;
    this._type = StateActionType.Assignment; 
  }


}