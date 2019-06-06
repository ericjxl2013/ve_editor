export interface IPosition {
  getValue(): string;
  getLine(): number;
  getPos(): number;
}


export class NameLocation implements IPosition {

  private _value: string = '';
  private _line: number = 0;
  private _pos: number = 0;


  constructor(value: string) {
    this._value = value;
    this._line = 1;
    this._pos = 1;
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
}

export enum SeverityExp{
  Warning,
  Error
}

export class ParseError{

  private _pos: IPosition;
  private _message: string;
  private _severity: SeverityExp;

  constructor(pos: IPosition, msg: string, severity: SeverityExp) {
    this._pos = pos;
    this._message = msg;
    this._severity = severity;
  }

  public static Warning(pos: IPosition, msg: string): ParseError {
    let message: string = msg;
    if(pos.getLine() > 0) {
      message = `公式解析警告 >>> 错误字符序号：${pos.getPos()}，警告信息：${msg}`;
    }
    return new ParseError(pos, message, SeverityExp.Warning);
  }

  public static Error(pos: IPosition, msg: string): ParseError {
    let message: string = msg;
    if(pos.getLine() > 0) {
      message = `公式解析错误 >>> 错误字符序号：${pos.getPos()}，警告信息：${msg}`;
    }
    return new ParseError(pos, message, SeverityExp.Error);
  }

  public getPosition(): IPosition {
    return this._pos;
  }

  public getMessage(): string {
    return this._message;
  }

  public getSeverity(): SeverityExp {
    return this._severity;
  }

  public toString(): string {
    return `类型：${this._severity.toString()}，信息：${this._message}`;
  }

}