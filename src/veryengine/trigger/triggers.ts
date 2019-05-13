import { VE_TriggerBehaviour } from "./triggerBehaviour";
import { ShowError } from "../html";
import { VeryEngineObject, VE_Objects } from "../object";
import { StateConst } from "../state";
import { VE_Manager } from "../manager";
import { GameGlobal } from "../global";

export class VE_Triggers {

  private static _triggerDics: { [key: string]: VE_TriggerBehaviour } = {};

  public static addTrigger(trigger: VE_TriggerBehaviour): void {
    // 平台只加载一次，避免重复加载
    if (!GameGlobal.PlatformLoaded) {
      let ids: string[] = trigger.ID.split('|');
      for (let i: number = 0; i < ids.length; i++) {
        let id: string = ids[i].trim().toLowerCase();
        if (this._triggerDics[id]) {
          ShowError.showError(`触发初始化错误，触发ID重复，当前触发ID：${id}，请为当前触发重新分配触发ID！`);
        } else {
          this._triggerDics[id] = trigger;
        }
      }
    }
  }

  public static hasTrigger(trigger_id: string): boolean {
    trigger_id = trigger_id.toLowerCase();
    if (this._triggerDics[trigger_id]) {
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

  public static findTrigger(very_object: VeryEngineObject, trigger_id: string): Nullable<VE_TriggerBehaviour> {
    if (very_object.isCreatedTrigger(trigger_id)) {
      return very_object.getTrigger(trigger_id);
    } else {
      let triggerArray: string[] = trigger_id.split(StateConst.STATE_SEPARATOR);
      if (triggerArray.length === 2) {
        let objects: VE_Objects = VE_Manager.objects(very_object.projectName);
        let objectID: string = triggerArray[0].trim();
        let triggerID: string = triggerArray[1].trim();
        if (objects.isCreated(objectID)) {
          let otherObject: VeryEngineObject = objects.getVeryObject(objectID);
          if (otherObject.isCreatedTrigger(triggerID)) {
            return otherObject.getTrigger(triggerID);
          } else {
            return null;
          }
        } else {
          return null;
        }
      } else {
        return null;
      }
    }
  }

  public static dispose(): void {
    VE_Triggers._triggerDics = {};
  }

}