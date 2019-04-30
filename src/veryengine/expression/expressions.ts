/////<reference path="dictionary.ts" />
import { Dictionary } from "../utility/dictionary";

export interface IExpression {
  expType: string;
  className: string;
  evaluate(): any;
  clone(): IExpression;
}

export class TrueExpression implements IExpression {
  public get expType(): string {
    return 'bool';
  }

  public get className(): string {
    return 'TrueExpression';
  }

  public get value(): boolean {
    return true;
  }

  constructor() {
  }

  public evaluate(): any {
    return true;
  }

  public clone(): IExpression {
    let exp: TrueExpression = new TrueExpression();
    return exp;
  }
}

export class ConstantExpression implements IExpression {

  public get expType(): string {
    return this._expType;
  }
  private _expType: string = 'string';

  public get className(): string {
    return 'ConstantExpression';
  }

  private _value: any;

  constructor(value: any, type: string) {
    this._value = value;
    this._expType = type;
  }

  public evaluate(): any {
    return this._value;
  }

  public clone(): IExpression {
    let expClone: ConstantExpression = new ConstantExpression(this._value, this._expType);
    return expClone;
  }

  public static Empty(): ConstantExpression {
    return new ConstantExpression(null, 'string');
  }

  public isEmpty(): boolean {
    if (this._expType === 'string' && this._value === null) {
      return true;
    } else {
      return false;
    }
  }

  public toString(): string {
    if (this._value !== null) {
      return this._value.toString();
    } else {
      return 'null';
    }
  }

}

export enum BinaryOperator {
  Add, Subtract, Multiply, Divide, Modulo, Power, LT, LT_EQ, EQ, GT_EQ, GT, NEQ, And, Or, Not
}

export class BinaryExpression implements IExpression {

  public get expType(): string {
    return this._expType;
  }
  private _expType = '';

  public get className(): string {
    return 'BinaryExpression';
  }

  private _op: BinaryOperator = BinaryOperator.EQ;

  private _left: IExpression;
  private _right: IExpression;
  private _isSealed: boolean = false;

  private static _opDic: { [key: string]: BinaryOperator } = {};

  private static _priority: Dictionary<BinaryOperator, number> = new Dictionary<BinaryOperator, number>();

  // private static _priorityKey: BinaryOperator[] = [BinaryOperator.Not, BinaryOperator.Power, BinaryOperator.Multiply, BinaryOperator.Divide, BinaryOperator.Modulo, BinaryOperator.Add, BinaryOperator.Subtract, BinaryOperator.LT, BinaryOperator.LT_EQ, BinaryOperator.EQ, BinaryOperator.GT_EQ, BinaryOperator.GT, BinaryOperator.NEQ, BinaryOperator.And, BinaryOperator.Or];

  // private static _priorityValue: number[] = [2, 3, 4, 4, 4, 5, 5, 6, 6, 6, 6, 6, 6, 7, 7];

  public static init(): void {
    this._opDic["+"] = BinaryOperator.Add;
    this._opDic["-"] = BinaryOperator.Subtract;
    this._opDic["*"] = BinaryOperator.Multiply;
    this._opDic["/"] = BinaryOperator.Divide;
    this._opDic["%"] = BinaryOperator.Modulo;
    this._opDic["**"] = BinaryOperator.Power;
    this._opDic["^"] = BinaryOperator.Power;
    this._opDic["<"] = BinaryOperator.LT;
    this._opDic["<="] = BinaryOperator.LT_EQ;
    this._opDic["=="] = BinaryOperator.EQ;
    this._opDic[">="] = BinaryOperator.GT_EQ;
    this._opDic[">"] = BinaryOperator.GT;
    this._opDic["!="] = BinaryOperator.NEQ;
    this._opDic["&&"] = BinaryOperator.And;
    this._opDic["||"] = BinaryOperator.Or;
    this._opDic["!"] = BinaryOperator.Not;
    this._opDic["！"] = BinaryOperator.Not;

    this._priority.Add(BinaryOperator.Not, 2);
    this._priority.Add(BinaryOperator.Power, 3);
    this._priority.Add(BinaryOperator.Multiply, 4); this._priority.Add(BinaryOperator.Divide, 4); this._priority.Add(BinaryOperator.Modulo, 4);
    this._priority.Add(BinaryOperator.Add, 5); this._priority.Add(BinaryOperator.Subtract, 5);
    this._priority.Add(BinaryOperator.LT, 6); this._priority.Add(BinaryOperator.LT_EQ, 6); this._priority.Add(BinaryOperator.EQ, 6); this._priority.Add(BinaryOperator.GT_EQ, 6); this._priority.Add(BinaryOperator.GT, 6); this._priority.Add(BinaryOperator.NEQ, 6);
    this._priority.Add(BinaryOperator.And, 7); this._priority.Add(BinaryOperator.Or, 7);
  }

  constructor(left_exp: IExpression, right_exp: IExpression, op: BinaryOperator) {
    this._left = left_exp;
    this._right = right_exp;
    this._op = op;
    console.log(this._left);
    console.log(this._right);
    this._expType = this.resultAutoType(left_exp, right_exp, op);
    if (this._expType === 'null') {
      console.log("公式两边类型不匹配，左侧类型：" + left_exp.expType + "，右侧类型：" + right_exp.expType + "，计算类型：" + op.toString());
    }
  }

  private resultAutoType(left: IExpression, right: IExpression, op: BinaryOperator): string {
    if (op === BinaryOperator.Add) {
      if (left.expType === 'string' || right.expType === 'string') {
        return 'string';
      }
      else if (left.expType === 'bool' || right.expType === 'bool') {
        return 'null';
      }
      else if (left.expType === 'number' || right.expType === 'number') {
        return 'number';
      }
      else if (left.expType === 'vector3' || right.expType === 'vector3') {
        return 'vector3';
      }
      else if (left.expType === 'vector2' || right.expType === 'vector2') {
        return 'vector2';
      }
      else {
        return 'null';
      }
    } else if (op === BinaryOperator.Divide || op === BinaryOperator.Multiply || op === BinaryOperator.Modulo || op === BinaryOperator.Power || op === BinaryOperator.Subtract) {
      if (left.expType === 'string' || right.expType === 'string' || left.expType === 'bool' || left.expType === 'bool') {
        return 'null';
      }
      else if (left.expType === 'vector3' && right.expType === 'vector3' && op === BinaryOperator.Subtract) {
        return 'vector3';
      }
      else if (left.expType === 'vector2' && right.expType === 'vector2' && op === BinaryOperator.Subtract) {
        return 'vector2';
      }
      else if ((left.expType === 'number' && right.expType === 'vector3' && op === BinaryOperator.Multiply) || (left.expType === 'vector3' && right.expType === 'number' && op == BinaryOperator.Multiply)) {
        return 'vector3';
      }
      else if ((left.expType === 'number' && right.expType === 'vector2' && op === BinaryOperator.Multiply) || (left.expType === 'vector2' && right.expType === 'number' && op == BinaryOperator.Multiply)) {
        return 'vector2';
      }
      else if (left.expType === 'vector3' && right.expType === 'number' && op === BinaryOperator.Divide) {
        return 'vector3';
      }
      else if (left.expType === 'vector2' && right.expType === 'number' && op === BinaryOperator.Divide) {
        return 'vector2';
      }
      else if (left.expType === 'number' || right.expType === 'number') {
        return 'number';
      }
      else {
        return 'null';
      }
    } else if (op === BinaryOperator.LT || op === BinaryOperator.LT_EQ || op === BinaryOperator.GT_EQ || op === BinaryOperator.GT) {
      if (left.expType === 'string' || right.expType === 'string' || left.expType === 'bool' || right.expType === 'bool') {
        return 'null';
      } else {
        return 'bool';
      }
    } else if (op === BinaryOperator.NEQ || op === BinaryOperator.EQ) {
      if (right.expType !== left.expType) {
        return 'null';
      } else {
        return 'bool';
      }
    } else if (op === BinaryOperator.Not) {
      if (right.expType !== 'bool') {
        return 'null';
      } else {
        return 'bool';
      }
    } else {
      return 'string';
    }
  }

  public setLeftExp(left_exp: IExpression): void {
    this._left = left_exp;
  }

  public setRightExp(right_exp: IExpression): void {
    this._right = right_exp;
  }

  public getOp(): BinaryOperator {
    return this._op;
  }

  public getLeftExp(): IExpression {
    return this._left;
  }

  public getRightExp(): IExpression {
    return this._right;
  }

  public isSealed(): boolean {
    return this._isSealed;
  }

  public setSeal(): void {
    this._isSealed = true;
  }

  public toString(): string {
    return "( " + this._left.toString() + " " + this._op.toString() + " " + this._right.toString() + " )";
  }

  public clone(): IExpression {
    let expClone: BinaryExpression = new BinaryExpression(this._left.clone(), this._right.clone(), this._op);
    return expClone;
  }

  public evaluate(): any {
    if (this._expType === 'null') {
      return null;
    }
    if (this._left.className === 'FunctionExpression') {
      this._left.evaluate();
    }
    if (this._right.className === 'FunctionExpression') {
      this._right.evaluate();
    }
    this._expType = this.resultAutoType(this._left, this._right, this._op);
    let leftValue: any = this._left.evaluate();
    let rightValue: any = this._right.evaluate();
    if (leftValue === null || rightValue === null) {
      return null;
    }
    if (this._op === BinaryOperator.Add) {
      if (this._expType === 'string') {
        return leftValue.toString() + rightValue.toString();
      } else if (this._expType === 'number') {
        return leftValue + rightValue;
      } else if (this._expType === 'vector3') {
        return (<BABYLON.Vector3>leftValue).add((<BABYLON.Vector3>rightValue));
      } else if (this._expType === 'vector2') {
        return (<BABYLON.Vector2>leftValue).add((<BABYLON.Vector2>rightValue));
      } else {
        return null;
      }
    } else if (this._op === BinaryOperator.Subtract) {
      if (this._expType === 'number') {
        return leftValue - rightValue;
      } else if (this._expType === 'vector3') {
        return (<BABYLON.Vector3>leftValue).subtract((<BABYLON.Vector3>rightValue));
      } else if (this._expType === 'vector2') {
        return (<BABYLON.Vector2>leftValue).subtract((<BABYLON.Vector2>rightValue));
      } else {
        return null;
      }
    } else if (this._op === BinaryOperator.Multiply) {
      if (this._expType === 'number') {
        return leftValue * rightValue;
      } else if (this._expType === 'vector3') {
        if (typeof (leftValue) === 'number') {
          return (<BABYLON.Vector3>rightValue).multiplyByFloats(leftValue, leftValue, leftValue);
        } else if (typeof (rightValue) === 'number') {
          return (<BABYLON.Vector3>leftValue).multiplyByFloats(rightValue, rightValue, rightValue);
        } else {
          return null;
        }
      } else if (this._expType === 'vector2') {
        if (typeof (leftValue) === 'number') {
          return (<BABYLON.Vector2>rightValue).multiplyByFloats(leftValue, leftValue);
        } else if (typeof (rightValue) === 'number') {
          return (<BABYLON.Vector2>leftValue).multiplyByFloats(rightValue, rightValue);
        } else {
          return null;
        }
      }
    } else if (this._op === BinaryOperator.Divide) {
      if (this._expType === 'number') {
        return leftValue / rightValue;
      } else if (this._expType === 'vector3') {
        if (typeof (rightValue) === 'number') {
          return new BABYLON.Vector3((<BABYLON.Vector3>leftValue).x / rightValue, (<BABYLON.Vector3>leftValue).y / rightValue, (<BABYLON.Vector3>leftValue).z / rightValue);
        } else {
          return null;
        }
      } else if (this._expType === 'vector2') {
        if (typeof (rightValue) === 'number') {
          return new BABYLON.Vector2((<BABYLON.Vector2>leftValue).x / rightValue, (<BABYLON.Vector2>leftValue).y / rightValue);
        } else {
          return null;
        }
      }
    } else if (this._op === BinaryOperator.Modulo) {
      if (typeof (leftValue) === 'number' && typeof (rightValue) === 'number') {
        return leftValue % rightValue;
      } else {
        return null;
      }
    } else if (this._op === BinaryOperator.Power) {
      if (typeof (leftValue) === 'number' && typeof (rightValue) === 'number') {
        return Math.pow(leftValue, rightValue);
      } else {
        return null;
      }
    } else if (this._op === BinaryOperator.And) {
      let l: boolean = this.getBoolean(leftValue);
      let r: boolean = this.getBoolean(rightValue);
      return l && r;
    } else if (this._op === BinaryOperator.Or) {
      let l: boolean = this.getBoolean(leftValue);
      let r: boolean = this.getBoolean(rightValue);
      return l || r;
    } else if (this._op === BinaryOperator.LT) {
      return leftValue < rightValue;
    } else if (this._op === BinaryOperator.LT_EQ) {
      return leftValue <= rightValue;
    } else if (this._op === BinaryOperator.GT_EQ) {
      return leftValue >= rightValue;
    } else if (this._op === BinaryOperator.GT) {
      return leftValue > rightValue;
    } else if (this._op === BinaryOperator.EQ) {
      return leftValue === rightValue;
    } else if (this._op === BinaryOperator.NEQ) {
      return leftValue !== rightValue;
    } else if (this._op === BinaryOperator.Not) {
      return !this.getBoolean(rightValue);
    } else {
      return !this.getBoolean(leftValue);
    }
  }

  private getBoolean(value: any): boolean {
    if (typeof (value) === 'number') {
      if (value === 0) {
        return false;
      } else {
        return true;
      }
    } else if (typeof (value) === 'string') {
      if (value === '') {
        return false;
      } else {
        return true;
      }
    } else if (typeof (value) === 'boolean') {
      return value;
    } else {
      return false;
    }
  }

  public getPriority(): number {
    // let p: number = BinaryExpression._priorityKey.indexOf(this._op);
    // if(p > -1) {
    //   return BinaryExpression._priorityValue[p];
    // } else {
    //   return 100;
    // }
    let p: number | null = BinaryExpression._priority.GetValue(this._op);
    if(p === null) {
      return 100;
    } else {
      return p;
    }
  }

  public getPriorityOp(op: BinaryOperator): number {
    // let p: number = BinaryExpression._priorityKey.indexOf(op);
    // if(p > -1) {
    //   return BinaryExpression._priorityValue[p];
    // } else {
    //   return 100;
    // }
    let p: number | null = BinaryExpression._priority.GetValue(op);
    if(p === null) {
      return 100;
    } else {
      return p;
    }
  }
}


BinaryExpression.init();