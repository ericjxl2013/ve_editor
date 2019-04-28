import { VE_ActionBehaviour } from "./actionBehaviour";
import { ShowError } from "../html";

export class VE_Actions {

  private static _actionDics: { [key: string]: VE_ActionBehaviour} = {};

  public static addAction(action: VE_ActionBehaviour): void {
    let ids: string[] = action.ID.split('|');
    for(let i: number = 0; i < ids.length; i++) {
      let id: string = ids[i].trim().toLowerCase();
      if(this._actionDics[id]) {
        ShowError.showError(`响应初始化错误，响应ID重复，当前响应ID：${id}，请问当前响应重新分配响应ID！`);
      } else {
        this._actionDics[id] = action;
      }
    }
  }

  public static hasAction(action_id: string): boolean {
    action_id = action_id.toLowerCase();
    if(this._actionDics[action_id]) {
      return true;
    } else {
      return false;
    }
  }

  public static createAction(action_id: string): VE_ActionBehaviour {
    action_id = action_id.toLowerCase();
    return Object.create(this._actionDics[action_id]);
  }
  
  public static remove(action_id: string): void {
    action_id = action_id.toLowerCase();
    delete this._actionDics[action_id];
  }


}