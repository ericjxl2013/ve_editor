
import { VE_ActionBehaviour } from "../action/actionBehaviour";
import { StateActionType } from "../enum";
import { VE_Assignment } from "../action";
import { IVeryVar, VeryBool } from "../variables";

export class VE_StateAction {

  public get type(): StateActionType {
    return this._type;
  }
  private _type: StateActionType = StateActionType.Action;

  public get action(): Nullable<VE_ActionBehaviour> {
    return this._action;
  }
  private _action: Nullable<VE_ActionBehaviour> = null;

  public get enabled(): IVeryVar {
    return this._enabled;
  }
  private _enabled: IVeryVar;

  public get everyFrame(): IVeryVar {
    return this._everyFrame;
  }
  private _everyFrame: IVeryVar;

  public get assignment(): Nullable<VE_Assignment> {
    return this._assignment;
  }
  private _assignment: Nullable<VE_Assignment> = null;

  constructor() {
    this._enabled = new VeryBool();
    this._everyFrame = new VeryBool();
  }

  public setAction(action: VE_ActionBehaviour, enabled: IVeryVar = new VeryBool(), every_frame: IVeryVar = new VeryBool(), sequence: boolean = false): void {
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