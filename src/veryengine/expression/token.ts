import { IPosition } from "./positions";
import { ExpressionType } from "./expressionEnum";
import { ExpChar } from "./expChar";

export class Token implements IPosition {

  public type: ExpressionType = ExpressionType.STRING;

  private _source: string = '';
  private _contents: string = '';
  private _trigger: string = '';

  private _line: number = 0;
  private _pos: number = 0;

  constructor() {

  }

  public static Create(type: ExpressionType, pos: IPosition): Token {
    let result: Token = new Token();
    result.type = type;
    result._line = pos.getLine();
    result._pos = pos.getPos();
    return result;
  }

  public static CreateAndFill(type: ExpressionType, ch: ExpChar): Token {
    let result: Token = new Token();
    result.type = type;
    result._line = ch.getLine();
    result._pos = ch.getPos();
    result._contents = ch.getValue();
    result._trigger = ch.getValue();
    result._source = ch.toString();
    return result;
  }

  public addToTrigger(ch: ExpChar): Token {
    this._trigger += ch.getValue();
    this._source += ch.getValue();
    return this;
  }

  public addToSource(ch: ExpChar): Token {
    this._source += ch.getValue();
    return this;
  }

  public addToContentChar(ch: ExpChar): Token {
    this.addToContent(ch.getValue());
    return this;
  }

  public addToContent(ch: string): Token {
    this._contents += ch;
    this._source += ch;
    return this;
  }

  public getTrigger(): string {
    return this._trigger;
  }

  public getTokenType(): ExpressionType {
    return this.type;
  }

  public getContents(): string {
    return this._contents;
  }

  public getSource(): string {
    return this._source;
  }

  public getValue(): string {
    return this._source;
  }

  public getLine(): number {
    return this._line;
  }

  public getPos(): number {
    return this._pos;
  }

  public setTokenType(new_type: ExpressionType): void {
    this.type = new_type;
  }

  public setTrigger(trigger: string): void {
    this._trigger = trigger;
  }

  public setContent(content: string): void {
    this._contents = content;
  }

  public setSource(source: string): void {
    this._source = source;
  }

  public isEnd(): boolean {
    return this.type === ExpressionType.EOI;
  }

  public is(type: ExpressionType): boolean {
    return this.type === type;
  }

  public matches(type: ExpressionType, trigger: string): boolean {
    if (!this.is(type)) {
      return false;
    }
    if (trigger === '') {
      return false;
    }
    return this.getTrigger() === trigger;
  }

  public isOperator(...symbols: string[]): boolean {
    if (symbols.length === 0) {
      return this.is(ExpressionType.OPERATOR);
    }
    for (let i: number = 0; i < symbols.length; i++) {
      if (this.matches(ExpressionType.OPERATOR, symbols[i])) {
        return true;
      }
    }
    return false;
  }

  public isStartBracket(): boolean {
    if (this.is(ExpressionType.OPERATOR)) {
      if (this._trigger === '(' || this._trigger === '（') {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  public isEndBracket(): boolean {
    if (this.is(ExpressionType.OPERATOR)) {
      if (this._trigger === ')' || this._trigger === '）') {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  public isStartSquareBracket(): boolean {
    if (this.is(ExpressionType.OPERATOR)) {
      if (this._trigger === '[' || this._trigger === '【') {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  public isEndSquareBracket(): boolean {
    if (this.is(ExpressionType.OPERATOR)) {
      if (this._trigger === ']' || this._trigger === '】') {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  public isStartBrace(): boolean {
    if (this.is(ExpressionType.OPERATOR)) {
      if (this._trigger === '{') {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  public isEndBrace(): boolean {
    if (this.is(ExpressionType.OPERATOR)) {
      if (this._trigger === '}') {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  public isKeyword(...keywords: string[]): boolean {
    if (keywords.length === 0) {
      return this.is(ExpressionType.KEYWORD);
    }
    for (let i: number = 0; i < keywords.length; i++) {
      if (this.matches(ExpressionType.KEYWORD, keywords[i])) {
        return true;
      }
    }
    return false;
  }

  public isIdentifier(...values: string[]): boolean {
    if (values.length === 0) {
      return this.is(ExpressionType.ID);
    }
    for (let i: number = 0; i < values.length; i++) {
      if (this.matches(ExpressionType.ID, values[i])) {
        return true;
      }
    }
    return false;
  }

  public isSpecialIdentifier(...triggers: string[]): boolean {
    if (triggers.length === 0) {
      return this.is(ExpressionType.SPECIAL_ID);
    }
    for (let i: number = 0; i < triggers.length; i++) {
      if (this.matches(ExpressionType.SPECIAL_ID, triggers[i])) {
        return true;
      }
    }
    return false;
  }

  public isSpecialIdentifierWithContent(trigger: string, ...contents: string[]): boolean {
    if (!this.matches(ExpressionType.SPECIAL_ID, trigger)) {
      return false;
    }
    if (contents.length === 0) {
      return true;
    }
    for (let i: number = 0; i < contents.length; i++) {
      if (this.getContents() === contents[i]) {
        return true;
      }
    }
    return false;
  }

  public isNumber(): boolean {
    return this.is(ExpressionType.NUMBER);
  }

  public isBool(): boolean {
    return this.is(ExpressionType.BOOL);
  }

  public isString(): boolean {
    return this.is(ExpressionType.STRING);
  }

  public isConstant(): boolean {
    return this.isNumber() || this.isBool() || this.isString();
  }

  public toString(): string {
    return this.getTokenType().toString() + ': ' + this.getContents() + ' (' + this._line + ': ' + this._pos + '), Trigger: ' + this.getTrigger();
  }




}