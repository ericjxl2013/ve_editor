import { StateActionType } from "../enum/stateActionType";
import { VE_ActionBehaviour } from "../action/actionBehaviour";

export class VE_StateAction {

  public get Type(): StateActionType {
    return this._type;
  }
  private _type: StateActionType = StateActionType.Action;

  public get Action(): VE_ActionBehaviour {
    return this._action;
  }
  private _action: VE_ActionBehaviour;

  constructor(action: VE_ActionBehaviour, enabled: boolean, every_frame: boolean = false, is_sequence: boolean = false) {
    this._action = action;
  }




}