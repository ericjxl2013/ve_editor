import { IVeryVar } from "./IVeryVar";
import { ErrorInfo } from "../utility/errorInfo";
import { VeryVarManager } from "./veryVarManager";

export class VeryBool implements IVeryVar {

  VarType: string = 'Bool';

  public get Value(): boolean {
    return this._value;
  }
  public set Value(val: boolean) {
    this._value = val;
  }
  private _value: boolean = false;

  constructor() {
    this._value = false;
  }

  setValue(val: any): void {
    this._value = val;
  }

  getValue(): any {
    return this._value;
  }

  initValue(value_str: string, error_info: ErrorInfo): any {
    if(value_str.toLowerCase() === 'false') {
      return false;
    } else if(value_str.toLowerCase() === 'true'){
      return true;
    } 
    else if(value_str === '' || value_str.toLowerCase() === 'null' || value_str.toLowerCase() === 'none') {
      return false;
    } else {
      error_info.isRight = false;
      error_info.message = 'Type: ' + this.VarType + '，值：' + value_str + '，该变量值和类型不匹配，转化错误，请检查！'
      return undefined;
    }
  }

}

export class VeryInt implements IVeryVar {

  VarType: string = 'Int';

  public get Value(): number {
    return Math.round(this._value);
  }
  public set Value(val: number) {
    this._value = Math.round(val);
  }
  private _value: number = 0;

  constructor() {
    this._value = 0;
  }

  getValue(): any {
    return this.Value;
  }

  setValue(val: any): void {
    this.Value = val;
  }

  initValue(value_str: string, error_info: ErrorInfo):any {
    // 先转化为float，直接使用parseInt没有四舍五入的效果
    let newFloat = parseFloat(value_str);
    if(!isNaN(newFloat)) {
      // 可对float进行四舍五入
      return Math.round(newFloat);
    } else {
      error_info.isRight = false;
      error_info.message = 'Type: ' + this.VarType + '，值：' + value_str + '，该变量值和类型不匹配，转化错误，请检查！'
      return undefined;
    }
  }

}

export class VeryFloat implements IVeryVar {

  VarType: string = 'Float';

  public get Value(): number {
    return this._value;
  }
  public set Value(val: number) {
    this._value = val;
  }
  private _value: number = 0;

  constructor() {
    this._value = 0;
  }

  setValue(val: number) {
    this._value = val;
  }

  // 之后可能会有公式的情况
  getValue(): any {
    return this._value;
  }

  initValue(value_str: string, error_info: ErrorInfo): any {
    let newVal = parseFloat(value_str);
    if(!isNaN(newVal)) {
      return newVal;
    } else {
      error_info.isRight = false;
      error_info.message = 'Type: ' + this.VarType + '，值：' + value_str + '，该变量值和类型不匹配，转化错误，请检查！'
      return undefined;
    }
  }
}

export class VeryNumber implements IVeryVar {

  VarType: string = 'Number';

  public get Value(): number {
    return this._value;
  }
  public set Value(val: number) {
    this._value = val;
  }
  private _value: number = 0;

  constructor() {
    this._value = 0;
  }

  setValue(val: number) {
    this._value = val;
  }

  // 之后可能会有公式的情况
  getValue(): any {
    return this._value;
  }

  initValue(value_str: string, error_info: ErrorInfo): any {
    let newVal = parseFloat(value_str);
    if(!isNaN(newVal)) {
      return newVal;
    } else {
      error_info.isRight = false;
      error_info.message = 'Type: ' + this.VarType + '，值：' + value_str + '，该变量值和类型不匹配，转化错误，请检查！'
      return undefined;
    }
  }
}

export class VeryString implements IVeryVar {

  VarType: string = 'String';

  public get Value(): string {
    return this._value;
  }
  public set Value(val: string) {
    this._value = val;
  }
  private _value: string = '';

  constructor() {
    this._value = '';
  }

  getValue(): any {
    return this._value;
  }

  setValue(val: any): void {
    this._value = val;
  }

  initValue(value_str: string, error_info: ErrorInfo): any {
    if (value_str.startsWith('\'') || value_str.startsWith('"') || value_str.startsWith('“') || value_str.startsWith('‘')) {
      this._value = value_str.substr(1, value_str.length - 2);
    } else {
      this._value = value_str;
    } 
    error_info.isRight = true;
  }
}

export class VeryVector3 implements IVeryVar {

  VarType: string = 'Vector3';

  public get Value(): BABYLON.Vector3 {
    //let a: BABYLON.Vector3 = new BABYLON.Vector3 (1,1,1);
    return this._value;
  }
  public set Value(val:BABYLON.Vector3) {
    this._value = val;
  }
  private _value: BABYLON.Vector3 = BABYLON.Vector3.Zero();


  constructor() {
    this._value = BABYLON.Vector3.Zero();
  }

  getValue(): any {
    return this._value;
  }

  setValue(val: any) {
    this._value = val;
  }

  initValue(value_str: string, error_info: ErrorInfo): any {
    if(value_str === 'none' || value_str === 'null') {
      
    } else {
      error_info.isRight = false;
      error_info.message = 'Type: ' + this.VarType + '，值：' + value_str + '，该变量值和类型不匹配，转化错误，请检查！'
    }
  }
}

VeryVarManager.AddVarType('bool', new VeryBool());
VeryVarManager.AddVarType('开关', new VeryBool());

VeryVarManager.AddVarType('int', new VeryInt());
VeryVarManager.AddVarType('float', new VeryFloat());

VeryVarManager.AddVarType('number', new VeryNumber());
VeryVarManager.AddVarType('数字', new VeryNumber());

VeryVarManager.AddVarType('string', new VeryString());
VeryVarManager.AddVarType('字符串', new VeryString());
VeryVarManager.AddVarType('vector3', new VeryVector3());
VeryVarManager.AddVarType('响应', new VeryVector3());