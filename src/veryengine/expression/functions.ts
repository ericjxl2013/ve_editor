import { IExpression } from "./expressions";
import { ShowError } from "../html";

export interface IFunction {
  expType: string;
  className: string;
  parameterNumber(): number;
  evaluate(args: Array<IExpression>): any;
}

export class Pow implements IFunction {

  public get expType(): string {
    return 'number';
  }

  public get className(): string {
    return 'pow';
  }

  public parameterNumber(): number {
    return 2;
  }

  public evaluate(args: IExpression[]): any {
    let value: number = Math.pow(args[0].evaluate(), args[1].evaluate());
    if (value === NaN) {
      ShowError.showError(`表达式编译错误：Pow函数参数错误，参数1类型：${args[0].expType}，参数1值：${args[0].evaluate()}，参数2类型：${args[1].expType}，参数2值：${args[1].evaluate()}，请检查！`);
      return undefined;
    } else {
      return value;
    }
  }
}

export class Ln implements IFunction {

  public get expType(): string {
    return 'number';
  }

  public get className(): string {
    return 'ln';
  }

  public parameterNumber(): number {
    return 1;
  }

  public evaluate(args: IExpression[]): any {
    let value: number = Math.log(args[0].evaluate());
    if (value === NaN || value === Infinity) {
      ShowError.showError(`表达式编译错误：Ln函数参数错误，参数类型：${args[0].expType}，参数值：${args[0].evaluate()}，请检查！`);
      return undefined;
    } else {
      return value;
    }
  }
}

export class Lg implements IFunction {

  public get expType(): string {
    return 'number';
  }

  public get className(): string {
    return 'lg';
  }

  public parameterNumber(): number {
    return 1;
  }

  public evaluate(args: IExpression[]): any {
    let value: number = Math.log10(args[0].evaluate());
    if (value === NaN || value === Infinity) {
      ShowError.showError(`表达式编译错误：Lg函数参数错误，参数类型：${args[0].expType}，参数值：${args[0].evaluate()}，请检查！`);
      return undefined;
    } else {
      return value;
    }
  }
}

export class Sqrt implements IFunction {

  public get expType(): string {
    return 'number';
  }

  public get className(): string {
    return 'sqrt';
  }

  public parameterNumber(): number {
    return 1;
  }

  public evaluate(args: IExpression[]): any {
    let value: number = Math.sqrt(args[0].evaluate());
    if (value === NaN) {
      ShowError.showError(`表达式编译错误：Sqrt函数参数错误，参数类型：${args[0].expType}，参数值：${args[0].evaluate()}，请检查！`);
      return undefined;
    } else {
      return value;
    }
  }
}

export class Abs implements IFunction {

  public get expType(): string {
    return 'number';
  }

  public get className(): string {
    return 'abs';
  }

  public parameterNumber(): number {
    return 1;
  }

  public evaluate(args: IExpression[]): any {
    let value: number = Math.abs(args[0].evaluate());
    if (value === NaN) {
      ShowError.showError(`表达式编译错误：Abs函数参数错误，参数类型：${args[0].expType}，参数值：${args[0].evaluate()}，请检查！`);
      return undefined;
    } else {
      return value;
    }
  }
}

export class Random implements IFunction {

  public get expType(): string {
    return 'number';
  }

  public get className(): string {
    return 'random';
  }

  public parameterNumber(): number {
    return 2;
  }

  public evaluate(args: IExpression[]): any {
    let distance: number = args[1].evaluate() - args[0].evaluate();
    let value: number = Math.random() * distance;
    if (value === NaN) {
      ShowError.showError(`表达式编译错误：Random函数参数错误，参数1类型：${args[0].expType}，参数1值：${args[0].evaluate()}，参数2类型：${args[1].expType}，参数2值：${args[1].evaluate()}，请检查！`);
      return undefined;
    } else {
      return value;
    }
  }
}

export class Round implements IFunction {

  public get expType(): string {
    return 'number';
  }

  public get className(): string {
    return 'round';
  }

  public parameterNumber(): number {
    return 1;
  }

  public evaluate(args: IExpression[]): any {
    let value: number = Math.round(args[0].evaluate());
    if (value === NaN) {
      ShowError.showError(`表达式编译错误：Round函数参数错误，参数类型：${args[0].expType}，参数值：${args[0].evaluate()}，请检查！`);
      return undefined;
    } else {
      return value;
    }
  }
}

export class Sin implements IFunction {

  public get expType(): string {
    return 'number';
  }

  public get className(): string {
    return 'sin';
  }

  public parameterNumber(): number {
    return 1;
  }

  public evaluate(args: IExpression[]): any {
    let value: number = Math.sin(args[0].evaluate());
    if (value === NaN) {
      ShowError.showError(`表达式编译错误：Sin函数参数错误，参数类型：${args[0].expType}，参数值：${args[0].evaluate()}，请检查！`);
      return undefined;
    } else {
      return value;
    }
  }
}

export class ASin implements IFunction {

  public get expType(): string {
    return 'number';
  }

  public get className(): string {
    return 'asin';
  }

  public parameterNumber(): number {
    return 1;
  }

  public evaluate(args: IExpression[]): any {
    let value: number = Math.asin(args[0].evaluate());
    if (value === NaN) {
      ShowError.showError(`表达式编译错误：ASin函数参数错误，参数类型：${args[0].expType}，参数值：${args[0].evaluate()}，请检查！`);
      return undefined;
    } else {
      return value;
    }
  }
}

export class Cos implements IFunction {

  public get expType(): string {
    return 'number';
  }

  public get className(): string {
    return 'cos';
  }

  public parameterNumber(): number {
    return 1;
  }

  public evaluate(args: IExpression[]): any {
    let value: number = Math.cos(args[0].evaluate());
    if (value === NaN) {
      ShowError.showError(`表达式编译错误：Cos函数参数错误，参数类型：${args[0].expType}，参数值：${args[0].evaluate()}，请检查！`);
      return undefined;
    } else {
      return value;
    }
  }
}

export class ACos implements IFunction {

  public get expType(): string {
    return 'number';
  }

  public get className(): string {
    return 'acos';
  }

  public parameterNumber(): number {
    return 1;
  }

  public evaluate(args: IExpression[]): any {
    let value: number = Math.acos(args[0].evaluate());
    if (value === NaN) {
      ShowError.showError(`表达式编译错误：ACos函数参数错误，参数类型：${args[0].expType}，参数值：${args[0].evaluate()}，请检查！`);
      return undefined;
    } else {
      return value;
    }
  }
}

export class Tan implements IFunction {

  public get expType(): string {
    return 'number';
  }

  public get className(): string {
    return 'tan';
  }

  public parameterNumber(): number {
    return 1;
  }

  public evaluate(args: IExpression[]): any {
    let value: number = Math.tan(args[0].evaluate());
    if (value === NaN) {
      ShowError.showError(`表达式编译错误：Tan函数参数错误，参数类型：${args[0].expType}，参数值：${args[0].evaluate()}，请检查！`);
      return undefined;
    } else {
      return value;
    }
  }
}

export class ATan implements IFunction {

  public get expType(): string {
    return 'number';
  }

  public get className(): string {
    return 'atan';
  }

  public parameterNumber(): number {
    return 1;
  }

  public evaluate(args: IExpression[]): any {
    let value: number = Math.atan(args[0].evaluate());
    if (value === NaN) {
      ShowError.showError(`表达式编译错误：ATan函数参数错误，参数类型：${args[0].expType}，参数值：${args[0].evaluate()}，请检查！`);
      return undefined;
    } else {
      return value;
    }
  }
}


export class CustomFunctions {
  private static _functions: {[key:string]: IFunction} = {};

  public static hasFunction(func_name: string): boolean {
    func_name = func_name.toLowerCase();
    if(this._functions[func_name]) {
      return true;
    } else {
      return false;
    }
  }

  public static addFunction(func: IFunction): void {
    let funcName: string = func.className.toLowerCase();
    if(this._functions[funcName]) {
      ShowError.showError(`自定义函数初始化错误，函数ID重复，当前函数ID：${funcName}，请为当前自定义函数重新分配ID！`);
    } else {
      this._functions[funcName] = func;
    }
  }

  public static createFunction(func_name: string): IFunction {
    func_name = func_name.toLowerCase();
    return Object.create(this._functions[func_name]);
  }

  public static remove(func_name: string): void {
    func_name = func_name.toLowerCase();
    delete this._functions[func_name];
  }
}


CustomFunctions.addFunction(new Pow());
CustomFunctions.addFunction(new Ln());
CustomFunctions.addFunction(new Lg());
CustomFunctions.addFunction(new Sqrt());
CustomFunctions.addFunction(new Abs());
CustomFunctions.addFunction(new Random());
CustomFunctions.addFunction(new Round());
CustomFunctions.addFunction(new Sin());
CustomFunctions.addFunction(new ASin());
CustomFunctions.addFunction(new Cos());
CustomFunctions.addFunction(new ACos());
CustomFunctions.addFunction(new Tan());
CustomFunctions.addFunction(new ATan());

