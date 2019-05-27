import { VE_TriggerBehaviour } from "./triggerBehaviour";
import { VeryEngineObject, VE_Objects } from "../object";
import { StateConst } from "../state";
import { VE_Manager } from "../manager";
import { GameGlobal, VE_ErrorManager, VE_Error } from "../global";
import { ErrorInfo } from "../utility";
import { BabylonEngine } from "../babylon";
import { Severity } from "../enum";

export class VE_Triggers {

  // private static _triggerDics: { [key: string]: VE_TriggerBehaviour } = {};

  private static _triggerFunctionDics: { [key: string]: Function } = {};

  // public static addTrigger(trigger: VE_TriggerBehaviour): void {
  //   // 平台只加载一次，避免重复加载
  //   if (!GameGlobal.PlatformLoaded) {
  //     let ids: string[] = trigger.ID.split('|');
  //     for (let i: number = 0; i < ids.length; i++) {
  //       let id: string = ids[i].trim().toLowerCase();
  //       if (this._triggerDics[id]) {
  //         ShowError.showError(`触发初始化错误，触发ID重复，当前触发ID：${id}，请为当前触发重新分配触发ID！`);
  //       } else {
  //         this._triggerDics[id] = trigger;
  //       }
  //     }
  //   }
  // }

  public static addTrigger(trigger_class: Function): void {
    // 平台只加载一次，避免重复加载
    if (!GameGlobal.PlatformLoaded) {
      let tempTrigger: any = new trigger_class.prototype.constructor();
      // console.log(`触发ID：  ${tempTrigger.ID}， 触发名： ${tempTrigger.className} `);
      let ids: string[] = tempTrigger.ID.split('|');
      for (let i: number = 0; i < ids.length; i++) {
        let id: string = ids[i].trim().toLowerCase();
        if (this._triggerFunctionDics[id]) {
          VE_ErrorManager.Add(new VE_Error('', `触发初始化错误，触发ID重复，当前触发ID：${id}，重复触发：${tempTrigger.className}，请为当前触发重新分配触发ID！`, '', Severity.Error));
        } else {
          this._triggerFunctionDics[id] = trigger_class;
        }
      }
    }
  }

  public static hasTrigger(trigger_type: string): boolean {
    trigger_type = trigger_type.toLowerCase();
    if (this._triggerFunctionDics[trigger_type]) {
      return true;
    } else {
      return false;
    }
  }

  public static createTrigger(very_object: VeryEngineObject, trigger_id: string, trigger_type: string, trigger_para: string[], error_info: ErrorInfo): Nullable<VE_TriggerBehaviour> {
    trigger_type = trigger_type.toLowerCase();
    // console.log(this._triggerFunctionDics[trigger_type]);
    if (!this._triggerFunctionDics[trigger_type]) {
      error_info.isRight = false;
      error_info.message = `触发创建错误：当前触发类型在平台中不存在，请检查！触发类型：` + trigger_type;
      return null;
    }
    let variable: any;
    try {
      // new方式创建触发，Object.create方式创建因为prototype的关系，引用变量是唯一的，所有创建的触发共享，不合适
      variable = new this._triggerFunctionDics[trigger_type].prototype.constructor();

      if (!variable) {
        error_info.isRight = false;
        error_info.message = `触发创建错误：当前触发创建失败，请检查！触发类型：` + trigger_type;
        return null;
      }

      let trigger: VE_TriggerBehaviour = <VE_TriggerBehaviour>variable;
      trigger.set(BabylonEngine.Scene);
      trigger.setVeryObject(very_object);
      trigger.setTriggerID(very_object.projectName, trigger_id, very_object.objectID);
      if (!trigger.paraParser(trigger_para)) {
        error_info.isRight = false;
        error_info.message = "该触发创建失败，触发参数格式错误！";
        return null;
      }
      return trigger;
    } catch (error) {
      console.log(`触发创建错误：${error.message}`);
      error_info.isRight = false;
      error_info.message = '触发创建错误：当前触发类型创建失败，请检查！触发类型：' + trigger_type + '，错误原因：' + error.message;
      return null;
    }
  }

  public static remove(trigger_type: string): void {
    trigger_type = trigger_type.toLowerCase();
    delete this._triggerFunctionDics[trigger_type];
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
    VE_Triggers._triggerFunctionDics = {};
  }

}