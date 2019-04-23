import { IVeryVar } from "./IVeryVar";
import { ErrorInfo } from "../utility/errorInfo";

export class VeryString implements IVeryVar {

  VarType: string = 'String';

  public get Value(): string {
    return this._value;
  }
  public set Value(val: string) {
    this._value = val;
  }
  private _value: string = '';

  constructor(val: string) {
    this._value = val;
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