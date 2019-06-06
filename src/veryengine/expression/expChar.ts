import { IPosition } from "./positions";

export class ExpChar implements IPosition {

  private _value: string = '';
  private _line: number = 0;
  private _pos: number = 0;


  constructor(value: string, line: number, pos: number) {
    this._value = value;
    this._line = line;
    this._pos = pos;
  }

  public getValue(): string {
    return this._value;
  }

  public getLine(): number {
    return this._line;
  }

  public getPos(): number {

    return this._pos;
  }

  public isDigit(): boolean {
    return (/\d/).test(this._value);
  }

  public isLetterOrCharactor(): boolean {
    if((/[！；：，。《》？、“”‘’（）【】￥]/).test(this._value)) {
      return false;
    }
    var result: boolean = (/[a-zA-Z]/).test(this._value);
    // 汉字等符号识别
    if (!result) {
      result = escape(this._value).indexOf('%u') > -1;
    }
    return result;
  }

  public isWhiteSpace(): boolean {
    return this._value === ' ';
  }

  public isNewLine(): boolean {
    return this._value === '\n';
  }

  public isEndOfInput(): boolean {
    return this._value === '\0';
  }

  public is(...val: string[]): boolean {
    for (let i: number = 0; i < val.length; i++) {
      if (val[i] === this._value && val[i] !== '\0') {
        return true;
      }
    }
    return false;
  }

  public toString(): string {
    return this._value;
  }

}

