import { VE_Projects } from "./projects";
import { VE_Objects } from "../object";
import { VE_Templates } from "../template";
import { VE_Variables } from "../variables";
import { VE_VariableData } from "../dataSource";
import { StateConst } from "../state";

export class VE_Manager {

  public static get projects(): VE_Projects {
    if (this._projects === null) {
      this._projects = new VE_Projects();
    }
    return this._projects;
  }
  private static _projects: VE_Projects | null = null;

  constructor() {

  }

  public static createProject(project_name: string): void {
    VE_Manager.projects.addProject(project_name);
    if (!VE_Manager.projects.isCreatedObjects(project_name)) {
      VE_Manager.projects.addObjects(project_name, new VE_Objects(project_name));
    }
    if (!VE_Manager.projects.isCreatedTemplates(project_name)) {
      VE_Manager.projects.addTemplates(project_name, new VE_Templates(project_name));
    }
    if (!VE_Manager.projects.isCreatedVariables(project_name)) {
      VE_Manager.projects.addVariables(project_name, new VE_Variables(project_name));
    }
  }

  public static globalVarData(project_name: string): VE_VariableData {
    if (!VE_Manager.projects.isCreatedGlobals(project_name)) {
      VE_Manager.projects.addVariables(project_name, new VE_Variables(project_name));
    }
    return VE_Manager.projects.getGlobalVars(project_name);
  }

  public static templates(project_name: string): VE_Templates {
    if (!VE_Manager.projects.isCreatedTemplates(project_name)) {
      VE_Manager.projects.addTemplates(project_name, new VE_Templates(project_name));
    }
    return VE_Manager.projects.getTemplates(project_name);
  }

  public static variables(project_name: string): VE_Variables {
    if (!VE_Manager.projects.isCreatedVariables(project_name)) {
      VE_Manager.projects.addVariables(project_name, new VE_Variables(project_name));
    }
    return VE_Manager.projects.getVariables(project_name);
  }

  public static objects(project_name: string): VE_Objects {
    if (!VE_Manager.projects.isCreatedObjects(project_name)) {
      VE_Manager.projects.addObjects(project_name, new VE_Objects(project_name));
    }
    return VE_Manager.projects.getObjects(project_name);
  }

  public static clear(): void {
    VE_Manager.projects.clear()
    this._projects = null;
  }

  public static clearProject(project_name: string): void {
    VE_Manager.projects.clearProject(project_name);
  }

  public static dispose(): void {
    if (VE_Manager.projects) {
      VE_Manager.clear();
      StateConst.LogCount = 0;
      StateConst.AssignmentFormulaCount = 0;
      StateConst.TriggerCount = 0;
      StateConst.ActionCount = 0;
      StateConst.StateCount = 0;
    }
  }

}