import { ForwardQuery } from "./forwardQuery";
import { Token } from "./token";
import { TokenReader } from "./tokenReader";
import { ExpressionType } from "./expressionEnum";
import { ParseError, IPosition } from "./positions";
import { ExpChar } from "./expChar";

export class Tokenizer extends ForwardQuery<Token> {

  private _inputExp: TokenReader;

  private _decimalSeparator: string = '.';
  private _lineComment: string = '//';
  private _blockCommentStart: string = '/*';
  private _blockCommentEnd: string = '*/';
  private _brackets: string[] = ['(', ')', '（', '）', '[', ']', '{', '}', '【', '】'];
  private _treatSinglePipeAsBracket: boolean = true;
  private _specialIdStarters: string[] = [];
  private _specialIdTerminators: string[] = [];
  private _keywords: { [key: string]: string } = {};
  private _keywordsCaseSensitive: boolean = false;
  private _stringDelimiters: { [key: string]: string } = {};
  private _boolConstant: string[] = [];

  constructor(input_exp: string) {
    super();
    this._inputExp = new TokenReader(input_exp);
    this._stringDelimiters = {};
    this._stringDelimiters['\"'] = '\\';
    this._stringDelimiters['\''] = '\0';
    this._boolConstant = [];
    this._boolConstant.push('false');
    this._boolConstant.push('true');
    this._keywords = {};
    this._keywords['this'] = 'this';
    this._keywords['null'] = 'null';
    this._keywords['none'] = 'none';
    this._keywords['undefined'] = 'undefined';
  }

  public endOfInput(): Token {
    return Token.CreateAndFill(ExpressionType.EOI, this._inputExp.current());
  }

  public fetch(): Token | undefined {
    // 获取并且消除空格
    while (this._inputExp.current().isWhiteSpace()) {
      this._inputExp.consume();
    }

    // 为行尾则返回空
    if (this._inputExp.current().isEndOfInput()) {
      return undefined;
    }

    // 行注释处理
    if (this.isAtStartOfLineComment(true)) {
      this.skipToEndOfLine();
      return this.fetch();
    }

    // 注释块处理
    if (this.isAtStartOfBlockComment(true)) {
      this.skipBlockComment();
      return this.fetch();
    }

    // 是否以数字起始，获取常量
    if (this.isAtStartOfNumber()) {
      return this.fetchNumber();
    }

    // 是否为字母开头，获取变量和函数
    if (this.isAtStartOfIdentifier()) {
      return this.fetchId();
    }

    // 字符串常量识别
    if (this._stringDelimiters[this._inputExp.current().getValue()]) {
      return this.fetchString();
    }

    //括号处理
    if (this.isAtBracket(false)) {
      return Token.CreateAndFill(ExpressionType.OPERATOR, this._inputExp.consume());
    }

    // 检测是否在特殊字符的开头，一些特殊的ID起始标志位，像“$Test”中的“$”
    if (this.isAtStartOfSpecialId()) {
      return this.fetchSpecialId();
    }

    // 运算符处理
    if (this.isOperator(this._inputExp.current())) {
      return this.fetchOperator();
    }

    //当前输入有问题，一般不应该运行到这一步
    this.problemCollector.push(ParseError.Error(this._inputExp.current(), "无效的输入字符: " + this._inputExp.current().getValue()));

    this._inputExp.consume();
    return this.fetch();
  }

  private fetchNumber(): Token {
    let result: Token = Token.Create(ExpressionType.NUMBER, this._inputExp.current());
    result.addToContentChar(this._inputExp.consume());
    let hasDecimal: boolean = false;
    while (this._inputExp.current().isDigit() || this._inputExp.current().is(this._decimalSeparator)) {
      if (this._inputExp.current().is(this._decimalSeparator)) {
        if (hasDecimal) {
          this.problemCollector.push(ParseError.Error(this._inputExp.current(), "公式中有多个小数点！"));
        }
        hasDecimal = true;
        result.addToContentChar(this._inputExp.consume());
      } else {
        result.addToContentChar(this._inputExp.consume());
      }
    }

    return result;
  }

  private fetchId(): Token {
    let result: Token = Token.Create(ExpressionType.ID, this._inputExp.current());
    result.addToContentChar(this._inputExp.consume());
    while (this.isIdentifierChar(this._inputExp.current())) {
      result.addToContentChar(this._inputExp.consume());
    }
    //UnityEngine.Debug.LogWarning(result.GetContents());
    if (!this._inputExp.current().isEndOfInput() && this._specialIdTerminators.indexOf(this._inputExp.current().getValue()) > -1) {
      let specialId: Token = Token.Create(ExpressionType.SPECIAL_ID, result);
      specialId.setTrigger(this._inputExp.current().getValue());
      specialId.setContent(result.getContents());
      specialId.setSource(result.getContents());
      specialId.addToSource(this._inputExp.current());
      this._inputExp.consume();
      return this.handleKeywords(specialId);
    }
    return this.handleKeywords(result);
  }

  private fetchString(): Token {
    //读进来的分词标志
    let separator: string = this._inputExp.current().getValue();
    //字典中对应的分词标志
    //char escapeChar = _stringDelimiters[_inputExp.current().GetValue()];
    let result: Token = Token.Create(ExpressionType.STRING, this._inputExp.current());
    result.addToTrigger(this._inputExp.consume());
    while (!this._inputExp.current().isNewLine() && !this._inputExp.current().is(separator) && !this._inputExp.current().isEndOfInput()) {
      result.addToContentChar(this._inputExp.consume());
    }
    if (this._inputExp.current().is(separator)) {
      result.addToSource(this._inputExp.consume());
    }
    else {
      this.problemCollector.push(ParseError.Error(this._inputExp.current(), "常量字符串没有结束分隔符！"));
    }
    return result;
  }

  private isAtStartOfLineComment(consume: boolean): boolean {
    if (this._lineComment !== '') {
      return this.canConsumeThisString(this._lineComment, consume);
    } else {
      return false;
    }
  }

  private canConsumeThisString(check_string: string, consume: boolean): boolean {
    for (let i: number = 0; i < check_string.length; i++) {
      //利用next向后对比，看是否为行注释符“//”
      if (!(this._inputExp.nextOffset(i).is(check_string[i]))) {
        return false;
      }
    }
    if (consume) {
      this._inputExp.consumeNext(check_string.length);
    }
    return true;
  }

  private skipToEndOfLine(): void {
    while (!this._inputExp.current().isEndOfInput() && !this._inputExp.current().isNewLine()) {
      this._inputExp.consume();
    }
  }

  private isAtStartOfBlockComment(consume: boolean): boolean {
    return this.canConsumeThisString(this._blockCommentStart, consume);
  }

  private skipBlockComment(): void {
    while (!this._inputExp.current().isEndOfInput()) {
      if (this.isAtEndOfBlockComment()) {
        return;
      }
      this._inputExp.consume();
    }
    this.problemCollector.push(ParseError.Error(this._inputExp.current(), '块注释没有结束符！'));
  }

  private isAtEndOfBlockComment(): boolean {
    return this.canConsumeThisString(this._blockCommentEnd, true);
  }

  private isAtStartOfNumber(): boolean {
    if (this._inputExp.current().isDigit()) {
      return true;
    } else if (this._inputExp.current().is('.') && this._inputExp.next().isDigit()) {
      return true;
    } else {
      return false;
    }
  }

  private isAtStartOfIdentifier(): boolean {
    return this._inputExp.current().isLetterOrCharactor() || this._inputExp.current().is('_') || this._inputExp.current().is('#');
  }

  private isIdentifierChar(current: ExpChar): boolean {
    return current.isDigit() || current.isLetterOrCharactor() || current.is('_') || current.is('.') || current.is('#') || current.is(':') || current.is('：');
  }

  private isAtBracket(in_symbol: boolean): boolean {
    let r: boolean = true;
    for (let i: number = 0; i < this._brackets.length; i++) {
      if (!this._inputExp.current().is(this._brackets[i])) {
        r = false;
      }
    }
    if (r) {
      return true;
    }
    if (!in_symbol && this._treatSinglePipeAsBracket && this._inputExp.current().is('|') && this._inputExp.next().is('|')) {
      return true;
    }
    return false;
  }

  private isAtStartOfSpecialId(): boolean {
    return this._specialIdStarters.indexOf(this._inputExp.current().getValue()) > -1;
  }

  private fetchSpecialId(): Token {
    let result: Token = Token.Create(ExpressionType.SPECIAL_ID, this._inputExp.current());
    result.addToTrigger(this._inputExp.consume());
    while (this.isIdentifierChar(this._inputExp.current())) {
      result.addToContentChar(this._inputExp.consume());
    }
    return this.handleKeywords(result);
  }

  private handleKeywords(id_token: Token): Token {
    let keyword: string = "";
    if (this._keywordsCaseSensitive) {
      if (this._keywords[id_token.getContents()]) {
        keyword = this._keywords[id_token.getContents()];
      }
    } else {
      if (this._keywords[id_token.getContents().toLowerCase()]) {
        keyword = this._keywords[id_token.getContents().toLowerCase()];
      }
    }
    if (keyword != "") { //关键字处理
      let keywordToken: Token = Token.Create(ExpressionType.KEYWORD, id_token);
      keywordToken.setTrigger(keyword);
      keywordToken.setContent(id_token.getContents());
      keywordToken.setSource(id_token.getSource());
      return keywordToken;
    } else if (!id_token.is(ExpressionType.SPECIAL_ID)) { //bool类型处理
      keyword = id_token.getContents().toLowerCase();
      if (this._boolConstant.indexOf(keyword) > -1) {
        id_token.setTokenType(ExpressionType.BOOL);
      }
    }
    return id_token;
  }

  private isOperator(ch: ExpChar): boolean {
    if (ch.isEndOfInput() || ch.isDigit() || ch.isLetterOrCharactor() || ch.isWhiteSpace()) {
      return false;
    }

    // let c: string = ch.getValue();
    // if (char.IsControl(c)) {
    // 	return false;
    // }

    if (this.isAtBracket(true) || this.isAtStartOfBlockComment(false) || this.isAtStartOfLineComment(false) || this.isAtStartOfNumber() || this.isAtStartOfIdentifier() || this._stringDelimiters[ch.getValue()]) {
      return false;
    }
    return true;
  }

  private fetchOperator(): Token {
    let result: Token = Token.Create(ExpressionType.OPERATOR, this._inputExp.current());
    result.addToTrigger(this._inputExp.consume());
    if (result.isOperator("*") && this._inputExp.current().is('*')) {
      result.addToTrigger(this._inputExp.consume());
    }
    else if (result.isOperator("&") && this._inputExp.current().is('&')) {
      result.addToTrigger(this._inputExp.consume());
    }
    else if (result.isOperator("|") && this._inputExp.current().is('|')) {
      result.addToTrigger(this._inputExp.consume());
    }
    else if (result.isOperator("<") && this._inputExp.current().is('=')) {
      result.addToTrigger(this._inputExp.consume());
    }
    else if (result.isOperator(">") && this._inputExp.current().is('=')) {
      result.addToTrigger(this._inputExp.consume());
    }
    else if ((result.isOperator("!") || result.isOperator("！")) && this._inputExp.current().is('=')) {
      result.addToTrigger(this._inputExp.consume());
    }
    else if (result.isOperator("=") && this._inputExp.current().is('=')) {
      result.addToTrigger(this._inputExp.consume());
    }
    return result;
  }

  public addError(pos: IPosition, msg: string): void {
    this.getProblemCollector().push(ParseError.Error(pos, msg));
  }

  public addWarning(pos: IPosition, msg: string): void {
    this.getProblemCollector().push(ParseError.Warning(pos, msg));
  }



}