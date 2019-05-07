import { VE_Template } from "./template";
import { ErrorInfo } from "../utility";

export class VE_Templates {

  public get projectName(): string {
    return this._projectName;
  }
  private _projectName: string = '';

  private _templateDic: { [key: string]: VE_Template } = {};

  private _instanceDic: { [key: string]: { [key: string]: VE_Template } } = {};


  constructor(project_name: string) {
    this._projectName = project_name;
  }

  public isCreatedTemplate(template_id: string): boolean {
    if(this._templateDic[template_id]) {
      return true;
    } else {
      return false;
    }
  }

  public addTemplate(template_id: string, template: VE_Template): void {
    this._templateDic[template_id] = template;
  }

  public getTemplate(template_id: string): VE_Template {
    return this._templateDic[template_id];
  }

  public isCreatedInstance(object_id: string, var_id: string): boolean {
    if(this._instanceDic[object_id] && this._instanceDic[object_id][var_id]) {
      return true;
    } else {
      return false;
    }
  }

  public getInstance(object_id: string, var_id: string): VE_Template {
    return this._instanceDic[object_id][var_id];
  }

  // public getState(var_id: string, state_id: string, index: number): VE_State {
    
  // } 

  public clear(): void {
    if(this._templateDic) {
      Object.keys(this._templateDic).forEach(key => {
        this._templateDic[key].clear();
      })
      this._templateDic = {};
    }
  }

  // TODO
  public createInstance (object_id: string, var_id: string, template: VE_Template, object_name: string, error_info: ErrorInfo, destory_on_create_new: boolean): VE_Template
  {

    return new VE_Template(this._projectName, var_id);
  }

}