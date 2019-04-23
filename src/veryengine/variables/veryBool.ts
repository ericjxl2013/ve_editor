import { IVeryVar } from "./IVeryVar";
import { ErrorInfo } from "../utility/errorInfo";

export class VeryBool implements IVeryVar {

  VarType: string = 'Bool';

  public get Value(): boolean {
    return this._value;
  }
  public set Value(val: boolean) {
    this._value = val;
  }
  private _value: boolean = false;

  constructor(val: boolean) {
    this._value = val;
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