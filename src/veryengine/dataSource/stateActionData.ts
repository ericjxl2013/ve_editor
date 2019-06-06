import { StateActionType } from "../enum";

export class VE_StateActionData {

  public actionID: string;
  // （1）启动/停止，一次/持续，依次/同时；（2）true/false；（3）一般变量/公式，bool值类型；
  public enabled: string;
  public everyFrame: string;
  public isSequence: string;
  public type: StateActionType;
  public totalString: string = '';
  public varID: string = '';
  public varValue: string = '';

  constructor(action_id: string, enabled: string = 'false', every_frame: string = 'false', sequence: string = 'false', type: StateActionType = StateActionType.Action) {
    this.actionID = action_id;
    this.enabled = enabled;
    this.everyFrame = every_frame;
    this.isSequence = sequence;
    this.type = type;
  }

  public setNormalAction(action_id: string, enabled: string = 'false', every_frame: string = 'false', sequence: string = 'false'): void {
    this.actionID = action_id;
    this.enabled = enabled;
    this.everyFrame = every_frame;
    this.isSequence = sequence;
    this.type = StateActionType.Action;
  }

  public setAssignmentAction(total_string: string, var_id: string, var_value: string): void {
    this.totalString = total_string;
    this.varID = var_id;
    this.varValue = var_value;
    this.type = StateActionType.Assignment;
  }

}