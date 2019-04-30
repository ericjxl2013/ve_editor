import { IExpression } from "./expressions";
import { IFunction } from "./functions";

export class FunctionExpression implements IExpression {

  public get expType(): string {
    return this._expType;
  }
  private _expType = '';

  public get className(): string {
    return 'FunctionExpression';
  }

  private _function!: IFunction;
  private _paras: IExpression[] = [];

  public setFunction(func: IFunction): void {
    this._function = func;
  }

  public addPara(exp: IExpression): void {
    this._paras.push(exp);
  }

  public paraCount(): number {
    return this._paras.length;
  }

  public evaluate(): any {
    let r: any = null;
    try {
      r = this._function.evaluate(this._paras);
    } catch (e) {
      console.log('自定义函数编译错误，错误信息：' + e);
      return null;
    }
    return r;
  }

  public clone(): IExpression {
    let expClone: FunctionExpression = new FunctionExpression();
    expClone._function = this._function;
    for (let i: number = 0; i < this._paras.length; i++) {
      expClone._paras.push(this._paras[i].clone());
    }
    return expClone;
  }

  public toString(): string {
    let printStr: string = this._function.className + '( ';
    for(let i: number = 0; i < this._paras.length; i++) {
      if(i > 0) {
        printStr += ', ' + this._paras[i].className;
      } else {
        printStr += this._paras[i].className;
      }
    }
    return printStr + ' )';
  }

}