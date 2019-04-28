export interface IExpression {
  expType: string;
  evaluate(): any;
  clone(): IExpression;
}


export class TrueExpression implements IExpression {
  public get expType(): string {
    return 'bool';
  }

  public get value(): boolean {
    return true;
  }

  constructor() {
  }

  evaluate(): any {
    return true;
  }

  clone(): IExpression {
    let exp: TrueExpression  = new TrueExpression();
    return exp;
  }
}

export class constantExpression implements IExpression {

  get expType(): string {
    return '';
  }
  
  evaluate() {
    throw new Error("Method not implemented.");
  }

  clone(): IExpression {
    throw new Error("Method not implemented.");
  }




}