import { VE_TriggerBehaviour } from "../trigger";

export class TriggerGlobal {

  private static KEYMAP: {[key: string]: string} = {};
  private static _keyUpdate: {[key: string]: boolean} = {};

  private static _keysDic: { [key: string]: string } = {};

  private static _triggerList: VE_TriggerBehaviour[] = [];

  private static _scenes: BABYLON.Scene[] = [];
  private static _initialized: boolean = false;

  public static Init(): void {
    

  }

  public static AddKeyboard(key: string, trigger: VE_TriggerBehaviour): void {
    // 添加场景，TODO：目前多场景问题还没有处理
    // 说明：因键盘参数区分大小写，因此，默认所有参数均转化为小写
    if(this._scenes.indexOf(trigger.scene) === -1) {
      this._scenes.push(trigger.scene);
      trigger.scene.onKeyboardObservable.add( kbInfo => {
        if(kbInfo.type === BABYLON.KeyboardEventTypes.KEYDOWN) {
          this._keyUpdate[kbInfo.event.key.toLowerCase()] = true;
        } else {
          this._keyUpdate[kbInfo.event.key.toLowerCase()] = false;
        }
      });
    }
    this._triggerList.push(trigger);
    // this._keysDic

  }


  public static RemoveKeyboard(trigger_id: string): void {

  }

  // 键盘

  public static KeyboardUpdate(): void {

    

    for(let i = 0; i < this._triggerList.length; i++) {
      if(this._triggerList[i].enabled) {
        if(this._keyUpdate[this._keysDic[this._triggerList[i].unionID]]) {

        }
      }
    }
  }


  public static clear(): void {

  }

  public static clearProject(project_name: string): void {
    this._scenes[0].onKeyboardObservable.clear();
  }

}