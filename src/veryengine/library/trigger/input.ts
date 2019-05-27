import { VE_TriggerBehaviour } from '../../index';
import { VE_Triggers } from '../../trigger';
import { ParaParserUtility, VE_KeyboardMap } from '../../utility';
import { ParaType, Severity } from '../../enum';
import { VE_ErrorManager, VE_Error } from '../../global';

export class Trigger_MouseDown extends VE_TriggerBehaviour {


  public get ID(): string {
    return '鼠标持续|Mouse_Button';
  }

  public get className(): string {
    return 'Trigger_MouseDown';
  }

  public paraParser(para_array: string[]): boolean {
    if (!ParaParserUtility.ParaNumbers(this.ID, ParaType.Trigger, para_array.length, 1)) {
      return false;
    } else {

      return true;
    }
    let a: BABYLON.Nullable<BABYLON.Observer<BABYLON.PointerInfo>> = this._scene.onPointerObservable.add((pointInfo) => {

    })

    this._scene.onPointerObservable.remove(a);

    return true;
  }

  public onUpdate(): void {

  }


  public destroy(): void {

  }


}

export class Trigger_Keyboard extends VE_TriggerBehaviour {

  public get ID(): string {
    return '键盘持续|Key_Button';
  }

  public get className(): string {
    return 'Trigger_Keyboard';
  }

  public keyboard: string = '';
  private _keyUpdate: { [key: string]: boolean } = {};
  private _observer: Nullable<BABYLON.Observer<BABYLON.KeyboardInfo>> = null;

  public paraParser(para_array: string[]): boolean {

    if (!ParaParserUtility.ParaNumbers(this.ID, ParaType.Trigger, para_array.length, 1)) {
      return false;
    } else {
      // 第1个参数：键盘按键
      this.keyboard = VE_KeyboardMap.GetKey(para_array[0]).toLowerCase();
      if (this.keyboard === 'null') {
        VE_ErrorManager.Add(new VE_Error('', this.ID + " 触发 传入参数格式错误：" + para_array[0] + "，无法查找到该按钮，请查阅键盘字符串对应表！", '', Severity.Error));
        return false;
      }

      this._observer = this.scene.onKeyboardObservable.add(kbInfo => {
        if (kbInfo.type === BABYLON.KeyboardEventTypes.KEYDOWN) {
          this._keyUpdate[kbInfo.event.key.toLowerCase()] = true;
        } else {
          this._keyUpdate[kbInfo.event.key.toLowerCase()] = false;
        }
      });

      return true;
    }
  }

  public onUpdate(): void {
    if(this._keyUpdate[this.keyboard]) {
      // console.log(this.triggerID);
      this.sendEvent();
    }
  }

  public destroy(): void {
    if (this._observer) {
      this._scene.onKeyboardObservable.remove(this._observer);
    }
  }


}



// Mouse Input
// VE_Triggers.addTrigger(Trigger_MouseDown);

// Keyboard Input
VE_Triggers.addTrigger(Trigger_Keyboard);