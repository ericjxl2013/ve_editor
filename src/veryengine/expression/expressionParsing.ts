import { Scope } from "./scope";
import { Tokenizer } from "./tokenizer";
import { ParseError, IPosition } from "./positions";
import { IExpression, BinaryOperator, BinaryExpression, ConstantExpression } from "./expressions";
import { ExpressionType } from "./expressionEnum";
import { FunctionExpression } from "./functionExpression";
import { Token } from "./token";
import { IFunction, CustomFunctions } from "./functions";
import { Variable } from "./variable";
import { VariableExpression } from "./variableExpression";
import { VariableScope } from "../enum";



export class VE_ExpressionParsing {

  private static _bracketPair: { [key: string]: string } = {};

  private static _scope: Scope;
  private static _tokenizer: Tokenizer;

  public static errors: ParseError[] = [];

  private static _projectName: string = '';
  private static _objectID: string = '';
  private static _fsmID = '';

  private static _varScope: VariableScope = VariableScope.Local;


  public static init(): void {
    this._bracketPair['('] = ')';
    this._bracketPair['['] = ']';
    this._bracketPair['{'] = '}';
    this._bracketPair['（'] = '）';
    this._bracketPair['【'] = '】';
  }

  public static parsing(name_id: string, input_exp: string, scope: Scope, project_name: string, object_id: string, fsm_id: string, var_scope: VariableScope): IExpression {
    this._scope = scope;
    this._projectName = project_name;
    this._objectID = object_id;
    this._fsmID = fsm_id;
    this._varScope = var_scope;
    this._tokenizer = new Tokenizer(input_exp);
    // while(!this._tokenizer.current().isEnd()) {
    //   console.log(this._tokenizer.consume());
    // }
    this.errors = [];
    return this.parse();
  }

  private static parse(): IExpression {
    let resultExp: IExpression = this.buildExpression();
    if (!this._tokenizer.current().isEnd()) {
      this._tokenizer.addError(this._tokenizer.current(), `未定义字符：${this._tokenizer.current().getSource()}！`);
      this._tokenizer.consume();
    }
    this.errors = this._tokenizer.getProblemCollector();
    return resultExp;
  }


  private static buildExpression(): IExpression {
    let left: IExpression = this.relationalExp();
    if (this._tokenizer.current().isOperator('&&')) {
      this._tokenizer.consume();
      let right: IExpression = this.buildExpression();
      return this.reOrder(left, right, BinaryOperator.Add);
    }
    if (this._tokenizer.current().isOperator('||')) {
      this._tokenizer.consume();
      let right: IExpression = this.buildExpression();
      return this.reOrder(left, right, BinaryOperator.Or);
    }
    return left;
  }


  private static relationalExp(): IExpression {
    let left: IExpression = this.algebraExp();
    if (this._tokenizer.current().isOperator('<')) {
      this._tokenizer.consume();
      let right: IExpression = this.relationalExp();
      return this.reOrder(left, right, BinaryOperator.LT);
    }
    if (this._tokenizer.current().isOperator('<=')) {
      this._tokenizer.consume();
      let right: IExpression = this.relationalExp();
      return this.reOrder(left, right, BinaryOperator.LT_EQ);
    }
    if (this._tokenizer.current().isOperator('==')) {
      this._tokenizer.consume();
      let right: IExpression = this.relationalExp();
      return this.reOrder(left, right, BinaryOperator.EQ);
    }
    if (this._tokenizer.current().isOperator('>=')) {
      this._tokenizer.consume();
      let right: IExpression = this.relationalExp();
      return this.reOrder(left, right, BinaryOperator.GT_EQ);
    }
    if (this._tokenizer.current().isOperator('>')) {
      this._tokenizer.consume();
      let right: IExpression = this.relationalExp();
      return this.reOrder(left, right, BinaryOperator.GT);
    }
    if (this._tokenizer.current().isOperator('!=')) {
      this._tokenizer.consume();
      let right: IExpression = this.relationalExp();
      return this.reOrder(left, right, BinaryOperator.NEQ);
    }
    return left;
  }

  private static algebraExp(): IExpression {
    let left: IExpression = this.productExp();
    if (this._tokenizer.current().isOperator('+')) {
      this._tokenizer.consume();
      let right: IExpression = this.algebraExp();
      return this.reOrder(left, right, BinaryOperator.Add);
    }
    if (this._tokenizer.current().isOperator('-')) {
      this._tokenizer.consume();
      let right: IExpression = this.algebraExp();
      return this.reOrder(left, right, BinaryOperator.Subtract);
    }
    return left;
  }

  private static productExp(): IExpression {
    let left: IExpression = this.exponentExp();
    if (this._tokenizer.current().isOperator('*')) {
      this._tokenizer.consume();
      let right: IExpression = this.productExp();
      return this.reOrder(left, right, BinaryOperator.Multiply);
    }
    if (this._tokenizer.current().isOperator('/')) {
      this._tokenizer.consume();
      let right: IExpression = this.productExp();
      return this.reOrder(left, right, BinaryOperator.Divide);
    }
    if (this._tokenizer.current().isOperator('%')) {
      this._tokenizer.consume();
      let right: IExpression = this.productExp();
      return this.reOrder(left, right, BinaryOperator.Modulo);
    }
    return left;
  }

  private static exponentExp(): IExpression {
    let left: IExpression = this.atomExp();
    if (this._tokenizer.current().isOperator('!') || this._tokenizer.current().isOperator('！')) {
      left = new BinaryExpression(left, left, BinaryOperator.Not);
    }
    return left;
  }

  private static atomExp(): IExpression {
    // 处理起始为“-”
    if (this._tokenizer.current().isOperator('-')) {
      this._tokenizer.consume();
      let result: BinaryExpression = new BinaryExpression(new ConstantExpression(0, 'number'), this.atomExp(), BinaryOperator.Subtract);
      result.setSeal();
      return result;
    }
    // 取非运算
    if (this._tokenizer.current().isOperator('!') && (this._tokenizer.next().isIdentifier() || this._tokenizer.next().isKeyword() || this._tokenizer.next().isStartBracket())) {
      this._tokenizer.consume();
      let newValue: IExpression = this.atomExp();
      if (newValue.expType === 'bool') {
        let notExp: BinaryExpression = new BinaryExpression(newValue, newValue, BinaryOperator.Not);
        return notExp;
      } else {
        this._tokenizer.addError(this._tokenizer.current(), '取非运算(!)后应跟着bool值类型！');
        return ConstantExpression.Empty();
      }
    }
    // 忽略最前面的“+”
    if (this._tokenizer.current().isOperator('+') && this._tokenizer.next().isStartBracket()) {
      this._tokenizer.consume();
    }
    // 忽略最前面的“+”
    if (this._tokenizer.current().isOperator('+') && this._tokenizer.next().isConstant()) {
      this._tokenizer.consume();
    }
    // 忽略最前面的“+”
    if (this._tokenizer.current().isOperator('+') && this._tokenizer.next().isIdentifier()) {
      this._tokenizer.consume();
    }
    // TODO：VeryVar解析，此处解析“*变量名”类型

    // 括号开始
    if (this._tokenizer.current().isStartBracket()) {
      let endBracket: string = this._bracketPair[this._tokenizer.consume().getTrigger()];
      let result: IExpression = this.buildExpression();
      if (result.className === 'BinaryExpression') {
        (<BinaryExpression>result).setSeal();
      }
      this.expectTrigger(ExpressionType.OPERATOR, endBracket); // 括号结束处理
      return result;
    }
    // 一些常量
    if (this._tokenizer.current().isConstant()) {
      let value: any;
      let typeStr: string = 'string';
      if (this._tokenizer.current().isBool()) {
        value = this._tokenizer.current().getContents().toLowerCase() === 'true' ? true : false;
        typeStr = 'bool';
      } else if (this._tokenizer.current().isNumber()) {
        value = parseFloat(this._tokenizer.current().getContents());
        typeStr = 'number';
        // console.log('常量：' + value);
      } else {
        value = this._tokenizer.current().getContents();
        typeStr = 'string';
      }
      this._tokenizer.consume();
      let constantExp: IExpression = new ConstantExpression(value, typeStr);
      return constantExp;
    }
    // 变量或函数处理
    if (this._tokenizer.current().isIdentifier()) {
      if (this._tokenizer.next().isStartBracket()) { // 自定义函数
        // 应该用递归的方式把函数算出来，当一个值处理，在这里做一全套的
        let endStart: string = this._bracketPair[this._tokenizer.next().getTrigger()];
        return this.functionCall(endStart);
      } else { // 变量
        // VryVar变量
        let varValue: Variable | null;
        let loc: IPosition = this._tokenizer.current();
        let variableID: string = this._tokenizer.consume().getContents();
        if (variableID.endsWith('.') && this._tokenizer.current().isOperator('*') && this._tokenizer.next().isIdentifier()) { // 对象.*变量
          // TODO：解析VeryVar变量，此处解析“对象.*变量名”类型
          console.log('TODO：解析VeryVar变量');
          return ConstantExpression.Empty();
        } else {
          // 一般变量
          varValue = this._scope.find(variableID);
          // console.log(variableID + '  ---  ' + varValue);
          if (varValue === null) {
            this._tokenizer.addError(loc, `变量名：${variableID}，该变量在变量作用域中未定义，也未定义该表达式，无法识别！另外，赋值响应右侧如果是公式，不允许引用模板变量！`);
            return ConstantExpression.Empty();
          } else {
            return new VariableExpression(varValue);
          }
        }
      }
    }
    // 关键字处理
    if (this._tokenizer.current().isKeyword()) {
      // this关键字处理，专用于处理状态当前状态变量
      // TODO: 与平台结合
      return ConstantExpression.Empty();
    }

    // 暂时没有
    if (this._tokenizer.current().isSpecialIdentifier()) {
      this._tokenizer.addError(this._tokenizer.current(), `特殊ID：${this._tokenizer.current().getSource()}，暂时未定义，请勿使用！`);
      this._tokenizer.consume();
      return ConstantExpression.Empty();
    }

    // 未知情况
    this._tokenizer.addError(this._tokenizer.current(), `检测到无效字符：${this._tokenizer.current().getSource()}，请检查！`);
    this._tokenizer.consume();

    return ConstantExpression.Empty();
  }

  private static reOrder(left: IExpression, right: IExpression, op: BinaryOperator): IExpression {
    if (right.className === 'BinaryExpression') {
      let rightOp: BinaryExpression = <BinaryExpression>right;
      if (!rightOp.isSealed() && rightOp.getPriority() === rightOp.getPriorityOp(op)) {
        this.replaceLeft(rightOp, left, op);
        return right;
      }
    }
    return new BinaryExpression(left, right, op);
  }

  private static replaceLeft(target: BinaryExpression, newLeft: IExpression, op: BinaryOperator): void {
    if (target.getLeftExp().className === 'BinaryExpression') {
      let leftOp: BinaryExpression = <BinaryExpression>target.getLeftExp();
      if (!leftOp.isSealed() && leftOp.getPriority() === leftOp.getPriorityOp(op)) {
        this.replaceLeft(leftOp, newLeft, op);
        return;
      }
    }
    target.setLeftExp(new BinaryExpression(newLeft, target.getLeftExp(), op));
  }

  private static functionCall(end_bracket: string): IExpression {
    let call: FunctionExpression = new FunctionExpression();
    let funcToken: Token = this._tokenizer.consume();
    if (!CustomFunctions.hasFunction(funcToken.getContents())) {
      this._tokenizer.addError(funcToken, `未定义函数：${funcToken.getContents()}！`);
      return ConstantExpression.Empty();
    }
    let fun: IFunction = CustomFunctions.createFunction(funcToken.getContents());
    call.setFunction(fun);
    this._tokenizer.consume(); // 消除（
    while (!this._tokenizer.current().isOperator(end_bracket) && !this._tokenizer.current().isEnd()) {
      if (call.paraCount() !== 0) {
        this.expectTrigger(ExpressionType.OPERATOR, ',');
      }
      call.addPara(this.buildExpression());
    }
    this.expectTrigger(ExpressionType.OPERATOR, end_bracket);
    call.evaluate();
    if (call.paraCount() > fun.parameterNumber() && fun.parameterNumber() >= 0) {
      this._tokenizer.addError(funcToken, `函数参数不一致，当前函数：${funcToken.getContents()}，规定参数个数Max：${fun.parameterNumber()}，当前参数个数：${call.paraCount()}，请检查！`);
      return ConstantExpression.Empty();
    }
    return call;
  }

  private static expectTrigger(type: ExpressionType, trigger: string): void {
    if (this._tokenizer.current().matches(type, trigger)) {
      this._tokenizer.consume();
    } else {
      this._tokenizer.addError(this._tokenizer.current(), `期望获得：${trigger}，当前值为：${this._tokenizer.current().getTrigger()}，请检查！`);
    }
  }

  public static getProjectCollector(): ParseError[] {
    return this._tokenizer.getProblemCollector();
  }

}




VE_ExpressionParsing.init();