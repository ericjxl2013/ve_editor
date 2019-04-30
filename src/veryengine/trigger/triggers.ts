import { VE_TriggerBehaviour } from "./triggerBehaviour";
import { ShowError } from "../html";

export class VE_Triggers {

  private static _triggerDics: { [key: string]: VE_TriggerBehaviour} = {};

  public static addTrigger(trigger: VE_TriggerBehaviour): void {
    let ids: string[] = trigger.ID.split('|');
    for(let i: number = 0; i < ids.length; i++) {
      let id: string = ids[i].trim().toLowerCase();
      if(this._triggerDics[id]) {
        ShowError.showError(`触发初始化错误，触发ID重复，当前触发ID：${id}，请为当前触发重新分配触发ID！`);
      } else {
        this._triggerDics[id] = trigger;
      }
    }
  }

  public static hasTrigger(trigger_id: string): boolean {
    trigger_id = trigger_id.toLowerCase();
    if(this._triggerDics[trigger_id]) {
      return true;
    } else {
      return false;
    }
  }

  public static createTrigger(trigger_id: string): VE_TriggerBehaviour {
    trigger_id = trigger_id.toLowerCase();
    // console.log(this._triggerDics[trigger_id]);
    return Object.create(this._triggerDics[trigger_id]);
  }
  
  public static remove(trigger_id: string): void {
    trigger_id = trigger_id.toLowerCase();
    delete this._triggerDics[trigger_id];
  }

}