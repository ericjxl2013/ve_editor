import { IVeryVar } from "./IVeryVar";
import { ErrorInfo } from "../utility/errorInfo";

export class veryInt implements IVeryVar {

  VarType: string = 'Int';

  public get Value(): number {
    return Math.round(this._value);
  }
  public set Value(val: number) {
    this._value = Math.round(val);
  }
  private _value: number = 0;

  constructor() {

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