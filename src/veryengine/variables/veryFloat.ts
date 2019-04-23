import { IVeryVar } from "./IVeryVar";
import { ErrorInfo } from "../utility/errorInfo";

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