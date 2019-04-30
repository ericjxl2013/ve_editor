export class Variable {

  public get expType(): string {
    return this._expType;
  }
  private _expType: string = 'string';

  private _value: any = null;

  private _name: string = '';

  private _constant: boolean = false;

  constructor(name: string, type: string, value: any) {
    this._name = name;
    this._expType = type;
    this._value = value;
  }

  public setType(type: string): void {
    if(!this._constant) {
      this._expType = type;
    }
  }

  public setValue(value: any): void {
    if(!this._constant) {
      this._value = value;
    }
  }

  public makeConstant(value: any): void {
    this.setValue(value);
    this._constant = true;
  }

  public getValue(): any {
    return this._value;
  }

  public getName(): string {
    return this._name;
  }

  public isConstant(): boolean {
    return this._constant;
  }

  public toString(): string {
    return `Type: ${this._expType} --- ${this._name}: ${this._value.toString()}`;
  }

}