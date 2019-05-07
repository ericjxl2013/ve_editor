import { VE_Objects } from "../object";
import { VE_VariableData } from "../dataSource";
import { VE_Templates } from "../template";
import { VE_Variables } from "../variables";


export class VE_Projects {

  private _objects: { [key: string]: VE_Objects } = {};
  private _variables: { [key: string]: VE_Variables } = {};
  private _templates: { [key: string]: VE_Templates } = {};

  public projects: string[] = [];

  constructor() {

  }

  public isCreatedObjects(project_name: string): boolean {
    if(this._objects[project_name]) {
      return true;
    } else {
      return false;
    }
  }

  public addObjects(project_name: string, objects: VE_Objects): void {
    this._objects[project_name] = objects;
  }

  public getObjects(project_name: string): VE_Objects {
    return this._objects[project_name];
  }

  public isCreatedVariables(project_name: string): boolean {
    if(this._variables[project_name]) {
      return true;
    } else {
      return false;
    }
  }

  public addVariables(project_name: string, variables: VE_Variables): void {
    this._variables[project_name] = variables;
  }

  public getVariables(project_name: string): VE_Variables {
    return this._variables[project_name];
  }

  public isCreatedTemplates(project_name: string): boolean {
    if(this._templates[project_name]) {
      return true;
    } else {
      return false;
    }
  }

  public addTemplates(project_name: string, templates: VE_Templates): void {
    this._templates[project_name] = templates;
  }

  public getTemplates(project_name: string): VE_Templates {
    return this._templates[project_name];
  }

  public isCreatedGlobals(project_name: string): boolean {
    if(this._variables[project_name]) {
      return true;
    } else {
      return false;
    }
  }

  public getGlobalVars(project_name: string): VE_VariableData {
    return this._variables[project_name].varData;
  }

  public clear(): void {
    // TODO
    this._objects = {};
    this._templates = {};
    this._variables = {};
  }

  public clearPorject(project_name: string): void {
    delete this._objects[project_name];
    delete this._templates[project_name];
    delete this._variables[project_name];
  }

  public sleep(): void {
    
  }


}