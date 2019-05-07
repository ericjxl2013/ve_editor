import { VE_VariableData } from "../dataSource";
import { IVeryVar } from "./IVeryVar";
import { VE_Template } from "../template";
import { IExpression } from "../expression";

export class VE_Variables {

  public get projectName(): string {
    return this._projectName;
  }
  private _projectName: string = '';

  public varData: VE_VariableData;

  private _veryVars: { [key: string]: IVeryVar } = {};
  private _tempalteVars: { [key: string]: VE_Template } = {};
  private _expressions: { [key: string]: IExpression } = {};

  constructor(project_name: string) {
    this._projectName = project_name;
    this.varData = new VE_VariableData(project_name);
  }

  public isCreated(id: string): boolean {
    if(this._veryVars[id] || this._tempalteVars[id] || this._expressions[id]) {
      return true;
    } else {
      return false;
    }
  }

  public isCreatedVariable(id: string): boolean {
    if(this._veryVars[id]) {
      return true;
    } else {
      return false;
    }
  }

  public addVariable(id: string, very_var: IVeryVar): void {
    this._veryVars[id] = very_var;
  }

  public getVariable(id: string): IVeryVar {
    return this._veryVars[id];
  }

  public isCreatedTemplate(id: string): boolean {
    if(this._tempalteVars[id]) {
      return true;
    } else {
      return false;
    }
  }

  public addTemplate(id: string, template: VE_Template): void {
    this._tempalteVars[id] = template;
  }

  public getTemplate(id: string): VE_Template {
    return this._tempalteVars[id];
  }

  public isCreatedExpression(id: string): boolean {
    if(this._expressions[id]) {
      return true;
    } else {
      return false;
    }
  }

  public addExpression(id: string, exp: IExpression): void {
    this._expressions[id] = exp;
  }

  public getExpression(id: string): IExpression {
    return this._expressions[id];
  }


  public clear(): void {
    if(this.varData) {
      this.varData.clear();
    }
    this._veryVars = {};
    this._expressions = {};
    this._tempalteVars = {};
  }



}