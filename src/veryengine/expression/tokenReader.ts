import { ForwardQuery } from "./forwardQuery";
import { ExpChar } from "./expChar";

export class TokenReader extends ForwardQuery<ExpChar> {

  private _inputExp: string = '';
  private _line: number = 1;
  private _pos: number = 0;
  private _count: number = 0;
  private _operator: number = 0;

  constructor(input_exp: string) {
    super();
    if (input_exp === '') {

    }
    this._inputExp = input_exp;
    this._count = input_exp.length;
    this._operator = 0;
  }

  protected endOfInput(): ExpChar {
    return new ExpChar('\0', this._line, this._pos);
  }


  protected fetch(): ExpChar | undefined {
    if (this._operator <= this._count - 1) {
      let readChar: string = this._inputExp[this._operator];
      this._operator++;
      if (readChar === '\n') {
        this._line++;
        this._pos = 0;
      }
      this._pos++;
      return new ExpChar(readChar, this._line, this._pos);
    } else {
      return undefined;
    }
  }

  public toString(): string {
    if (this.itemBuffer.length === 0) {
      return this._line + ':' + this._pos + ': Buffer empty';
    }
    if (this.itemBuffer.length < 2) {
      return this._line + ':' + this._pos + ': ' + this.current().toString();
    }
    return this._line + ':' + this._pos + ': ' + this.current().toString() + ', ' + this.next().toString();
  }

}