import { VE_State } from "../state";
import { AssignType } from "../enum";

export class VE_Assignment {

  public get state(): VE_State {
    return this._state;
  }
  private _state: VE_State;

  private _totalStr: string = '';

  public get leftType(): AssignType {
    return this._leftType;
  }
  private _leftType: AssignType = AssignType.Variable;

  public get rightType(): AssignType {
    return this._rightType;
  }
  private _rightType: AssignType = AssignType.Variable;

  
  constructor(state: VE_State, total_string: string) {
    this._state = state;
    this._totalStr = total_string;
  }

  
}