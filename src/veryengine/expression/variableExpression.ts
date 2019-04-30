import { IExpression } from "./expressions";
import { Variable } from "./variable";

export class VariableExpression implements IExpression {

  public get expType(): string {
    return this._value.expType;
  }  

  public get className(): string {
    return 'VariableExpression';
  }

  private _value: Variable;
  
  constructor(value: Variable) {
    this._value = value;
  }
  
  public evaluate(): any {
    return this._value.getValue();
  }

  public toString(): string {
    return this._value.getName();
  }

  public clone(): IExpression {
    let expClone: VariableExpression = new VariableExpression(this._value);
    return expClone;
  }







  

}