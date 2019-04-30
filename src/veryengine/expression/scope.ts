import { Variable } from "./variable";

export class Scope {

  private _parent: Scope | undefined = undefined;

  private _context: { [key: string]: Variable } = {};

  private static _root: Scope;

  constructor() {

  }

  public static Create(): Scope {
    let result: Scope = new Scope();
    result._parent = Scope.GetRootScope();
    return result;
  }

  public static GetRootScope(): Scope {
    if (Scope._root === undefined) {
      Scope._root = new Scope();
      Scope._root.setVariable("PI", 'number', Math.PI).makeConstant(Math.PI);
      Scope._root.setVariable("EULER", 'number', Math.E).makeConstant(Math.E);
    }
    return Scope._root;
  }

  public static CreateWithParent(parent: Scope): Scope {
    let result: Scope = Scope.Create();
    result._parent = parent;
    return result;
  }

  public find(name: string): Variable | null {
    if (this._context[name]) {
      return this._context[name];
    }
    if (this._parent !== undefined) {
      return this._parent.find(name);
    }
    return null;
  }

  public setVariable(name: string, type: string, value: any): Variable {
    let result: Variable | null = this.find(name);
    if (result !== null) {
      result.setType(type);
      result.setValue(value);
      return result;
    }
    return this.createVariable(name, type, value);
  }

  public createVariable(name: string, type: string, value: any): Variable {
    if (this._context[name]) {
      this._context[name].setType(type);
      this._context[name].setValue(value);
      return this._context[name];
    }
    let result: Variable = new Variable(name, type, value);
    this._context[name] = result;
    return result;
  }


  public setValue(name: string, value: any): void {
    if (this._context[name]) {
      this._context[name].setValue(value);
    }
  }

  public isCreated(name: string): boolean {
    if (this._context[name]) {
      return true;
    }
    if (this._parent !== undefined) {
      if (this._parent.find(name) !== null) {
        return true;
      }
    }
    return false;
  }

  public clear(): void {
    this._context = {};
  }

}