import { VE_TriggerBehaviour } from '../../index';
import { VE_Triggers } from '../../trigger';
import { ParaParserUtility, VE_KeyboardMap } from '../../utility';
import { ParaType, Severity } from '../../enum';
import { VE_ErrorManager, VE_Error } from '../../global';

// 鼠标按下一次
export class Trigger_MouseDown extends VE_TriggerBehaviour {

  public get ID(): string {
    return 'Mouse_Down|鼠标按下';
  }

  public get className(): string {
    return 'Trigger_MouseDown';
  }

  private _mouseButtonIndex: number = 0;
  private _downFlag: boolean = false;

  private _observer: Nullable<BABYLON.Observer<BABYLON.PointerInfo>> = null;

  public paraParser(para_array: string[]): boolean {
    if (!ParaParserUtility.ParaNumbers(this.ID, ParaType.Trigger, para_array.length, 1)) {
      return false;
    } else {
      // 第1个参数：鼠标按键
      if (para_array[0] === "0" || para_array[0].toLowerCase() === "left" || para_array[0] === "左") {
        this._mouseButtonIndex = 0;
      }
      else if (para_array[0] === "1" || para_array[0].toLowerCase() === "right" || para_array[0] === "右") {
        this._mouseButtonIndex = 2;
      }
      else if (para_array[0] === "2" || para_array[0].toLowerCase() === "middle" || para_array[0] === "中") {
        this._mouseButtonIndex = 1;
      }
      else {
        VE_ErrorManager.Add(new VE_Error('', this.ID + " 触发 传入参数格式错误：" + para_array[0] + "，填写0、1、2或者left、right、middle或者左、右、中，请检查！", '', Severity.Error));
        return false;
      }

      this._observer = this._scene.onPointerObservable.add(pointInfo => {
        if (pointInfo.type === BABYLON.PointerEventTypes.POINTERDOWN) {
          if (!this._downFlag && pointInfo.event.button === this._mouseButtonIndex) {
            this._downFlag = true;
            this.sendEvent();
          }
        } else if (pointInfo.type === BABYLON.PointerEventTypes.POINTERUP) {
          if (this._downFlag && pointInfo.event.button === this._mouseButtonIndex) {
            this._downFlag = false;
          }
        }
      });

      return true;
    }

  }

  public destroy(): void {
    if (this._observer) {
      this._scene.onPointerObservable.remove(this._observer);
    }
    this._observer = null;
  }

}

// 鼠标抬起一次
export class Trigger_MouseUp extends VE_TriggerBehaviour {

  public get ID(): string {
    return 'Mouse_Up|鼠标抬起';
  }

  public get className(): string {
    return 'Trigger_MouseUp';
  }

  private _mouseButtonIndex: number = 0;
  private _downFlag: boolean = false;

  private _observer: Nullable<BABYLON.Observer<BABYLON.PointerInfo>> = null;

  public paraParser(para_array: string[]): boolean {
    if (!ParaParserUtility.ParaNumbers(this.ID, ParaType.Trigger, para_array.length, 1)) {
      return false;
    } else {
      // 第1个参数：鼠标按键
      if (para_array[0] === "0" || para_array[0].toLowerCase() === "left" || para_array[0] === "左") {
        this._mouseButtonIndex = 0;
      }
      else if (para_array[0] === "1" || para_array[0].toLowerCase() === "right" || para_array[0] === "右") {
        this._mouseButtonIndex = 2;
      }
      else if (para_array[0] === "2" || para_array[0].toLowerCase() === "middle" || para_array[0] === "中") {
        this._mouseButtonIndex = 1;
      }
      else {
        VE_ErrorManager.Add(new VE_Error('', this.ID + " 触发 传入参数格式错误：" + para_array[0] + "，填写0、1、2或者left、right、middle或者左、右、中，请检查！", '', Severity.Error));
        return false;
      }

      this._observer = this._scene.onPointerObservable.add(pointInfo => {
        if (pointInfo.type === BABYLON.PointerEventTypes.POINTERDOWN) {
          if (!this._downFlag && pointInfo.event.button === this._mouseButtonIndex) {
            this._downFlag = true;
          }
        } else if (pointInfo.type === BABYLON.PointerEventTypes.POINTERUP) {
          if (this._downFlag && pointInfo.event.button === this._mouseButtonIndex) {
            this._downFlag = false;
            this.sendEvent();
          }
        }
      });

      return true;
    }

  }

  public destroy(): void {
    if (this._observer) {
      this._scene.onPointerObservable.remove(this._observer);
    }
    this._observer = null;
  }

}

// 鼠标持续
export class Trigger_MouseButton extends VE_TriggerBehaviour {

  public get ID(): string {
    return 'Mouse_Button|鼠标持续';
  }

  public get className(): string {
    return 'Trigger_MouseButton';
  }

  private _mouseButtonIndex: number = 0;
  private _mouseUpdate: { [key: number]: boolean } = {};
  private _observer: Nullable<BABYLON.Observer<BABYLON.PointerInfo>> = null;

  public paraParser(para_array: string[]): boolean {
    if (!ParaParserUtility.ParaNumbers(this.ID, ParaType.Trigger, para_array.length, 1)) {
      return false;
    } else {
      // 第1个参数：鼠标按键
      if (para_array[0] === "0" || para_array[0].toLowerCase() === "left" || para_array[0] === "左") {
        this._mouseButtonIndex = 0;
      }
      else if (para_array[0] === "1" || para_array[0].toLowerCase() === "right" || para_array[0] === "右") {
        this._mouseButtonIndex = 2;
      }
      else if (para_array[0] === "2" || para_array[0].toLowerCase() === "middle" || para_array[0] === "中") {
        this._mouseButtonIndex = 1;
      }
      else {
        VE_ErrorManager.Add(new VE_Error('', this.ID + " 触发 传入参数格式错误：" + para_array[0] + "，填写0、1、2或者left、right、middle或者左、右、中，请检查！", '', Severity.Error));
        return false;
      }

      this._observer = this._scene.onPointerObservable.add(pointInfo => {
        if (pointInfo.type === BABYLON.PointerEventTypes.POINTERDOWN) {
          this._mouseUpdate[pointInfo.event.button] = true;
        } else if (pointInfo.type === BABYLON.PointerEventTypes.POINTERUP) {
          this._mouseUpdate[pointInfo.event.button] = false;
        }
      });

      return true;
    }

  }

  public onUpdate(): void {
    if (this._mouseUpdate[this._mouseButtonIndex]) {
      this.sendEvent();
    }
  }

  public destroy(): void {
    if (this._observer) {
      this._scene.onPointerObservable.remove(this._observer);
    }
    this._observer = null;
  }

}

// 按下持续触发
export class Trigger_Keyboard extends VE_TriggerBehaviour {

  public get ID(): string {
    return '键盘持续|Key_Button';
  }

  public get className(): string {
    return 'Trigger_Keyboard';
  }

  private _keyboard: string = '';
  private _keyUpdate: { [key: string]: boolean } = {};
  private _observer: Nullable<BABYLON.Observer<BABYLON.KeyboardInfo>> = null;

  public paraParser(para_array: string[]): boolean {

    if (!ParaParserUtility.ParaNumbers(this.ID, ParaType.Trigger, para_array.length, 1)) {
      return false;
    } else {
      // 第1个参数：键盘按键
      this._keyboard = VE_KeyboardMap.GetKey(para_array[0]).toLowerCase();
      if (this._keyboard === 'null') {
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
    if (this._keyUpdate[this._keyboard]) {
      // console.log(this.triggerID);
      this.sendEvent();
    }
  }

  public destroy(): void {
    if (this._observer) {
      this._scene.onKeyboardObservable.remove(this._observer);
    }
    this._observer = null;
  }


}

// 按下只触发一次
export class Trigger_KeyDown extends VE_TriggerBehaviour {

  public get ID(): string {
    return '键盘按下|Key_Down';
  }

  public get className(): string {
    return 'Trigger_KeyDown';
  }

  private _keyboard: string = '';
  private _downFlag: boolean = false;

  private _observer: Nullable<BABYLON.Observer<BABYLON.KeyboardInfo>> = null;

  public paraParser(para_array: string[]): boolean {

    if (!ParaParserUtility.ParaNumbers(this.ID, ParaType.Trigger, para_array.length, 1)) {
      return false;
    } else {
      // 第1个参数：键盘按键
      this._keyboard = VE_KeyboardMap.GetKey(para_array[0]).toLowerCase();
      if (this._keyboard === 'null') {
        VE_ErrorManager.Add(new VE_Error('', this.ID + " 触发 传入参数格式错误：" + para_array[0] + "，无法查找到该按钮，请查阅键盘字符串对应表！", '', Severity.Error));
        return false;
      }

      this._observer = this.scene.onKeyboardObservable.add(kbInfo => {
        if (kbInfo.type === BABYLON.KeyboardEventTypes.KEYDOWN) {
          if (!this._downFlag && kbInfo.event.key.toLowerCase() === this._keyboard) {
            this._downFlag = true;
            this.sendEvent();
          }
        } else {
          if (this._downFlag && kbInfo.event.key.toLowerCase() === this._keyboard) {
            this._downFlag = false;
          }
        }
      });

      return true;
    }
  }

  public destroy(): void {
    if (this._observer) {
      this._scene.onKeyboardObservable.remove(this._observer);
    }
    this._observer = null;
  }


}

// 抬起只触发一次
export class Trigger_KeyUp extends VE_TriggerBehaviour {

  public get ID(): string {
    return '键盘抬起|Key_Up';
  }

  public get className(): string {
    return 'Trigger_KeyUp';
  }

  private _keyboard: string = '';
  private _downFlag: boolean = false;

  private _observer: Nullable<BABYLON.Observer<BABYLON.KeyboardInfo>> = null;

  public paraParser(para_array: string[]): boolean {

    if (!ParaParserUtility.ParaNumbers(this.ID, ParaType.Trigger, para_array.length, 1)) {
      return false;
    } else {
      // 第1个参数：键盘按键
      this._keyboard = VE_KeyboardMap.GetKey(para_array[0]).toLowerCase();
      if (this._keyboard === 'null') {
        VE_ErrorManager.Add(new VE_Error('', this.ID + " 触发 传入参数格式错误：" + para_array[0] + "，无法查找到该按钮，请查阅键盘字符串对应表！", '', Severity.Error));
        return false;
      }

      this._observer = this.scene.onKeyboardObservable.add(kbInfo => {
        if (kbInfo.type === BABYLON.KeyboardEventTypes.KEYDOWN) {
          if (!this._downFlag && kbInfo.event.key.toLowerCase() === this._keyboard) {
            this._downFlag = true;
          }
        } else {
          if (this._downFlag && kbInfo.event.key.toLowerCase() === this._keyboard) {
            this._downFlag = false;
            this.sendEvent();
          }
        }
      });

      return true;
    }
  }

  public destroy(): void {
    if (this._observer) {
      this._scene.onKeyboardObservable.remove(this._observer);
    }
    this._observer = null;
  }


}

// 组合按下触发一次
export class Trigger_KeyboardCombine extends VE_TriggerBehaviour {

  public get ID(): string {
    return 'Key_Combination|键盘组合';
  }

  public get className(): string {
    return 'Trigger_KeyboardCombine';
  }

  private _keyboards: string[] = [];
  private _lastKey: string = '';
  private _downFlag: boolean = false;
  private _trigger: boolean = false;

  private _keyUpdate: { [key: string]: boolean } = {};
  private _observer: Nullable<BABYLON.Observer<BABYLON.KeyboardInfo>> = null;

  public paraParser(para_array: string[]): boolean {

    if (para_array.length < 2) {
      VE_ErrorManager.Add(new VE_Error('', this.ID + " 触发 传入参数至少为2个，请检查传入参数！", '', Severity.Error));
      return false;
    } else {
      // n个参数：键盘按键
      for (let i: number = 0; i < para_array.length; i++) {
        let key: string = VE_KeyboardMap.GetKey(para_array[i]).toLowerCase();
        if (key === 'null') {
          VE_ErrorManager.Add(new VE_Error('', this.ID + " 触发 传入参数格式错误：" + para_array[i] + "，无法查找到该按钮，请查阅键盘字符串对应表！", '', Severity.Error));
          return false;
        }
        this._keyboards.push(key);
      }
      this._lastKey = this._keyboards[this._keyboards.length - 1];

      this._observer = this.scene.onKeyboardObservable.add(kbInfo => {
        if (kbInfo.type === BABYLON.KeyboardEventTypes.KEYDOWN) {
          if (!this._downFlag && this._lastKey === kbInfo.event.key.toLowerCase()) {
            this._downFlag = true;
            this._trigger = true;
          }
          this._keyUpdate[kbInfo.event.key.toLowerCase()] = true;
        } else {
          if (this._downFlag && this._lastKey === kbInfo.event.key.toLowerCase()) {
            this._downFlag = false;
            this._trigger = false;
          }
          this._keyUpdate[kbInfo.event.key.toLowerCase()] = false;
        }
      });

      return true;
    }
  }

  public onUpdate(): void {
    if (this._keyboards && this._keyboards.length > 0) {
      let all: boolean = true;
      for (let i: number = 0; i < this._keyboards.length; i++) {
        if (i === this._keyboards.length - 1) {
          if (all && this._downFlag && this._trigger) {
            this._trigger = false;
            this.sendEvent();
          }
        } else {
          if (!this._keyUpdate[this._keyboards[i]]) {
            all = false;
          }
        }
      }
    }
    // if (this._keyUpdate[this._keyboard]) {
    //   // console.log(this.triggerID);
    //   this.sendEvent();
    // }
  }

  public destroy(): void {
    if (this._observer) {
      this._scene.onKeyboardObservable.remove(this._observer);
    }
    this._observer = null;
  }


}


// Mouse Input
VE_Triggers.addTrigger(Trigger_MouseDown);
VE_Triggers.addTrigger(Trigger_MouseUp);
VE_Triggers.addTrigger(Trigger_MouseButton);

// Keyboard Input
VE_Triggers.addTrigger(Trigger_Keyboard);
VE_Triggers.addTrigger(Trigger_KeyDown);
VE_Triggers.addTrigger(Trigger_KeyUp);
VE_Triggers.addTrigger(Trigger_KeyboardCombine);