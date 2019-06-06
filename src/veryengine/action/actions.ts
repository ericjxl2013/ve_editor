import { VE_ActionBehaviour } from "./actionBehaviour";
import { VeryEngineObject, VE_Objects } from "../object";
import { StateConst } from "../state";
import { VE_Manager } from "../manager";
import { GameGlobal, VE_ErrorManager, VE_Error } from "../global";
import { ErrorInfo, VE_TypeConvert } from "../utility";
import { BabylonEngine } from "../babylon";
import { Severity } from "../enum";

export class VE_Actions {

  // private static _actionDics: { [key: string]: VE_ActionBehaviour } = {};

  private static _actionFunctionDics: { [key: string]: Function } = {};

  // public static addAction(action: VE_ActionBehaviour): void {
  //   // 平台只加载一次，避免重复加载
  //   if (!GameGlobal.PlatformLoaded) {
  //     let ids: string[] = action.ID.split('|');
  //     for (let i: number = 0; i < ids.length; i++) {
  //       let id: string = ids[i].trim().toLowerCase();
  //       if (this._actionDics[id]) {
  //         ShowError.showError(`响应初始化错误，响应ID重复，当前响应ID：${id}，请为当前响应重新分配响应ID！`);
  //       } else {
  //         this._actionDics[id] = action;
  //       }
  //     }
  //   }
  // }

  public static addAction(action_class: Function): void {
    // 平台只加载一次，避免重复加载
    if (!GameGlobal.PlatformLoaded) {
      let tempAction: any = new action_class.prototype.constructor();
      // console.log(`响应ID：  ${tempAction.ID}， 响应名： ${tempAction.className} `);
      let ids: string[] = tempAction.ID.split('|');
      for (let i: number = 0; i < ids.length; i++) {
        let id: string = ids[i].trim().toLowerCase();
        if (this._actionFunctionDics[id]) {
          VE_ErrorManager.Add(new VE_Error('', `响应初始化错误，响应ID重复，当前响应ID：${id}，重复响应：${tempAction.className}，请为当前响应重新分配响应ID！`, '', Severity.Error));
        } else {
          this._actionFunctionDics[id] = action_class;
        }
      }
    }
  }

  public static hasAction(action_id: string): boolean {
    action_id = action_id.toLowerCase();
    if (this._actionFunctionDics[action_id]) {
      return true;
    } else {
      return false;
    }
  }

  public static createAction(very_object: VeryEngineObject, action_id: string, action_type: string, action_para: string[], init_val: string[], error_info: ErrorInfo): Nullable<VE_ActionBehaviour> {
    action_type = action_type.toLowerCase();
    if (!this._actionFunctionDics[action_type]) {
      error_info.isRight = false;
      error_info.message = `响应创建错误：当前响应类型在平台中不存在，请检查！响应类型：` + action_type;
      return null;
    }
    // console.log(this._actionFunctionDics[action_type]);
    let variable: any;
    try {
      // variable = Object.create(this._actionDics[action_type]);
      // new方式创建响应，Object.create方式创建因为prototype的关系，引用变量是唯一的，所有创建的响应共享，不合适
      variable = new this._actionFunctionDics[action_type].prototype.constructor();
      if (!variable) {
        error_info.isRight = false;
        error_info.message = '响应创建错误：当前响应创建失败，请检查！响应类型：' + action_type;
        return null;
      }

      let action: VE_ActionBehaviour = <VE_ActionBehaviour>variable;
      action.set(BabylonEngine.Scene);
      action.setVeryObject(very_object);
      action.setActionID(very_object.projectName, very_object.objectID, action_id);
      if (!action.paraParser(action_para)) {
        error_info.isRight = false;
        error_info.message = "该响应创建失败，响应参数格式错误！";
        return null;
      }
      // TODO:响应初始化
      error_info.clear();
      let everyFrameFlag = VE_TypeConvert.boolConvert(init_val[1], error_info);
      if(!error_info.isRight) {
        error_info.isRight = false;
        error_info.message = "该响应创建失败，响应每帧运行参数目前只允许填写bool常量true或者false，不允许填写变量！";
        return null;
      }
      action.setEveryFrame(everyFrameFlag);
      action.enabled = false;
      return action;
    } catch (error) {
      console.error(`响应创建错误：${error.message}`);
      error_info.isRight = false;
      error_info.message = '响应创建错误：当前响应类型创建失败，请检查！响应类型：' + action_type + '，错误原因：' + error.message;
      return null;
    }
  }

  public static remove(action_type: string): void {
    action_type = action_type.toLowerCase();
    delete this._actionFunctionDics[action_type];
  }

  public static findAction(very_object: VeryEngineObject, action_id: string): Nullable<VE_ActionBehaviour> {
    if (very_object.isCreatedAction(action_id)) {
      return very_object.getAction(action_id);
    }
    else {
      let actionArray: string[] = action_id.split(StateConst.STATE_SEPARATOR);
      if (actionArray.length === 2) {
        let objects: VE_Objects = VE_Manager.objects(very_object.projectName);
        let objectID: string = actionArray[0].trim();
        let actionID: string = actionArray[1].trim();
        if (objects.isCreated(objectID)) {
          let otherObject: VeryEngineObject = objects.getVeryObject(objectID);
          if (otherObject.isCreatedAction(actionID)) {
            return otherObject.getAction(actionID);
          }
          else {
            return null;
          }
        }
        else {
          return null;
        }
      }
      else {
        return null;
      }
    }
  }


  public static dispose(): void {
    VE_Actions._actionFunctionDics = {};
  }
}