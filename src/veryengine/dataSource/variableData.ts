export class VE_Variable {

  public get projectName(): string {
    return this._projectName;
  }
  private _projectName: string = '';

  private _variableIDs: string[] = [];
  private _varDics: {[key: string]: string[]} = {};

  public get count(): number {
    return this._variableIDs.length;
  }

  constructor(project_name: string) {
    this._projectName = project_name;
  }

  public hasVariable(var_id: string): boolean {
    if(this._varDics[var_id]) {
      return true;
    } else {
      return false;
    }
  }

  public addVariable(var_id: string, var_paras: string[]): void {
    this._varDics[var_id] = var_paras;
    this._variableIDs.push(var_id);
  }

  public getVariableID(index: number): string {
    if(index >= 0 && index < this._variableIDs.length) {
      return this._variableIDs[index];
    } else {
      return '';
    }
  }

  public getVariableParas(var_id: string): string[] {
    return this._varDics[var_id];
  }

  public clear(): void {
    this._variableIDs = [];
    this._varDics = {};
  }
}