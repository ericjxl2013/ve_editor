import { IVeryVar } from "./IVeryVar";
import { IExpression, ConstantExpression } from "../expression";
import { ErrorInfo } from "../utility";

export class VeryExpression implements IVeryVar {
  public get varType(): string {
    return this._value.expType;
  }

  public get className(): string {
    return "VeryExpression";
  }

  public get value(): IExpression {
    return this._value;
  }
  public set value(val: IExpression) {
    this._value = val;
  }
  private _value: IExpression = ConstantExpression.Empty();

  public get isNull(): boolean {
    return this._value === null;
  }

  constructor(val: IExpression) {
    this._value = val;
  }

  public setValue(val: any) {
    this._value = val;
  }

  // 之后可能会有公式的情况
  public getValue(): any {
    return this._value;
  }

  public initValue(value_str: string, error_info: ErrorInfo): any {
    let newVal = parseFloat(value_str);
    if (!isNaN(newVal)) {
      return newVal;
    } else {
      error_info.isRight = false;
      error_info.message =
        "类型: " +
        this.varType +
        "，值：" +
        value_str +
        "，该变量值和类型不匹配，转化错误，请检查！";
      return null;
    }
  }

  public clone(): IVeryVar {
    return new VeryExpression(this._value);
  }
}