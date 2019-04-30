import { Scope } from "./scope";
import { IExpression } from "./expressions";
import { ParseError, NameLocation } from "./positions";
import { VE_ExpressionParsing } from "./expressionParsing";
import { VariableScope } from "../enum";
import { Variable } from "./variable";

export class ExpManager {

  private static _scope: Scope;
  private static _expVariable: { [key: string]: IExpression } = {};

  public static errors: ParseError[] = [];

  private static _projectName = '';
  private static _objectID = '';

  public static init() {
    this._scope = Scope.Create();
  }

  public static isCreated(name_id: string): boolean {
    if(this._scope.isCreated(name_id)){
      return true;
    }
    if(this._expVariable[name_id]) {
      return true;
    }
    return false;
  }

  public static isCreatedVariable(name_id: string): boolean {
    if(this._scope.isCreated(name_id)){
      return true;
    } else {
      return false;
    }
  }

  public static isCreatedExpression(name_id: string): boolean {
    if(this._expVariable[name_id]) {
      return true;
    } else {
      return false;
    }
  }

  public static createVariable(name_id: string, type: string, value: any): boolean {
    this.errors = [];
    if(this.isCreated(name_id)) {
      this.errors.push(ParseError.Error(new NameLocation(name_id), `变量：${name_id}，类型：${type}，该变量已创建，请勿重复创建！`));
      return false;
    }
    this._scope.setVariable(name_id, type, value);
    return true;
  }

  public static createExpression(name_id: string, exp_str: string): boolean {
    this.errors = [];
    if(this.isCreated(name_id)) {
      this.errors.push(ParseError.Error(new NameLocation(name_id), `表达式名：${name_id}，表达式：${exp_str}，该表达式已定义，请勿重复定义！`));
      return false;
    }
    let exp: IExpression = VE_ExpressionParsing.parsing(name_id, exp_str, this._scope, this._projectName, '', '', VariableScope.Scene);
    if(VE_ExpressionParsing.errors.length > 0) {
      for(let i: number = 0; i < VE_ExpressionParsing.errors.length; i++) {
        this.errors.push(VE_ExpressionParsing.errors[i]);
      }
      return false;
    }
    this._expVariable[name_id] = exp;
    return true;
  }

  public static getValue(name_id: string): any {
    if(this.isCreated(name_id)) {
      if(this.isCreatedVariable(name_id)) {
        return this._scope.find(name_id)!.getValue();
      } else {
        return this._expVariable[name_id].evaluate();
      }
    } else {
      return null;
    }
  }

  public static getExpression(name_id: string): IExpression | null {
    if(this._expVariable[name_id]) {
      return this._expVariable[name_id];
    } else {
      return null;
    }
  }

  public static getVariable(name_id: string): Variable | null {
    if(this.isCreatedVariable(name_id)) {
      return this._scope.find(name_id);
    } else {
      return null;
    }
  }


}

ExpManager.init();


ExpManager.createVariable('x', 'number', 1);
ExpManager.createVariable('y', 'number', 2);
console.log(ExpManager.getValue('y'));

ExpManager.createExpression('add', 'x + y');
console.log(ExpManager.getExpression('add'));

ExpManager.createExpression('multiply', 'x * y');
ExpManager.createExpression('substract', 'x - y');

console.log(ExpManager.getExpression('add')!.evaluate());

console.log(ExpManager.getExpression('multiply')!.evaluate());
console.log(ExpManager.getExpression('substract')!.evaluate());



