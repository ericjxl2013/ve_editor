import { VeryEngineObject } from "../object";
import { VE_DataSource, VE_VariableData } from "../dataSource";

export class VE_Template {

  public get projectName(): string {
    return this._projectName;
  }
  private _projectName: string = '';

  public get templateID(): string {
    return this._templateID;
  }
  private _templateID: string = '';

  public get templateVarID(): string {
    return this._templateVarID;
  }
  private _templateVarID: string = '';

  public get objectID(): string {
    return this._objectID;
  }
  private _objectID: string = '';

  public templateInstance: VeryEngineObject | null = null;

  public dataSource: VE_DataSource;

  public varData: VE_VariableData;

  public instanceCount(): number {
    return this._instanceCount;
  }
  private _instanceCount: number = 0;


  constructor(project_name: string, template_id: string) {
    this._projectName = project_name;
    this._templateID = template_id;
    this.dataSource = new VE_DataSource(project_name, template_id, true);
    this.varData = new VE_VariableData(project_name);
  }

  public setInstance(instance_obj: VeryEngineObject): void {
    this.templateInstance = instance_obj;
  }

  public isCreatedVariable(var_id: string): boolean {
    return this.varData.isCreatedVariable(var_id);
  }

  public addVariable(var_id: string, var_paras: string[], pos: string): void {
    this.varData.addVariable(var_id, var_paras, pos);
  }

  public clone(object_id: string, template_var_id: string): VE_Template {
    let cloneTemplate: VE_Template = new VE_Template(this._projectName, this._templateID);
    cloneTemplate._objectID = object_id;
    cloneTemplate._templateVarID = template_var_id;
    cloneTemplate.dataSource = this.dataSource;
    cloneTemplate.varData = this.varData;
    cloneTemplate._instanceCount = this._instanceCount;
    return cloneTemplate;
  }

  public clear(): void {
    if(this.dataSource) {
      this.dataSource.clear();
    }
    if(this.varData) {
      this.varData.clear();
    }
    if(this.templateInstance) {
      this.templateInstance.clear();
    }
  }

}