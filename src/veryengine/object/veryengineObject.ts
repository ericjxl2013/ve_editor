import { IVeryVar } from "../variables";
import { IExpression } from "../expression";
import { VE_ActionBehaviour } from "../action";
import { VE_TriggerBehaviour } from "../trigger";
import { VE_Fsm } from "../state";
import { VE_Template } from "../template";
import { VE_DataSource, VE_VariableData } from "../dataSource";
import { GameObject } from "../babylon";

export class VeryEngineObject {

  public get projectName(): string {
    return this._projectName;
  }
  private _projectName: string = '';

  public get objectID(): string {
    return this._objectID;
  }
  private _objectID: string = '';

  public gameObject: GameObject = new GameObject('');

  private _variables: { [key: string]: IVeryVar } = {};
  private _expressions: { [key: string]: IExpression } = {};
  private _actions: { [key: string]: VE_ActionBehaviour } = {};
  private _triggers: { [key: string]: VE_TriggerBehaviour } = {};
  private _fsms: { [key: string]: VE_Fsm } = {};
  private _templates: { [key: string]: VE_Template } = {};

  public dataSource: VE_DataSource;

  public varData: VE_VariableData;



  constructor(project_name: string, object_id: string, game_object: GameObject) {
    this._projectName = projectName;
    this._objectID = object_id;
    this.gameObject = game_object;
    this.dataSource = new VE_DataSource(project_name, object_id, false);
    this.varData = new VE_VariableData(project_name);
  }

  public isCreatedFsm(fsm_id: string): boolean {
    if (this._fsms[fsm_id]) {
      return true;
    } else {
      return false;
    }
  }

  public addFsm(fsm_id: string, fsm: VE_Fsm): void {
    this._fsms[fsm_id] = fsm;
  }

  public getFsm(fsm_id: string): VE_Fsm {
    return this._fsms[fsm_id];
  }

  public isCreatedTrigger(trigger_id: string): boolean {
    if (this._triggers[trigger_id]) {
      return true;
    } else {
      return false;
    }
  }

  public addTrigger(trigger_id: string, trigger: VE_TriggerBehaviour): void {
    this._triggers[trigger_id] = trigger;
  }

  public getTrigger(trigger_id: string): VE_TriggerBehaviour {
    return this._triggers[trigger_id];
  }

  public isCreatedAction(action_id: string): boolean {
    if (this._actions[action_id]) {
      return true;
    } else {
      return false;
    }
  }

  public addAction(action_id: string, action: VE_ActionBehaviour): void {
    this._actions[action_id] = action;
  }

  public getAction(action_id: string): VE_ActionBehaviour {
    return this._actions[action_id];
  }

  public isCreatedVariable(var_id: string): boolean {
    if (this._variables[var_id]) {
      return true;
    } else {
      return false;
    }
  }

  public addVariable(var_id: string, variable: IVeryVar): void {
    this._variables[var_id] = variable;
  }

  public getVariable(var_id: string): IVeryVar {
    return this._variables[var_id];
  }

  public isCreatedExpression(exp_id: string): boolean {
    if (this._expressions[exp_id]) {
      return true;
    } else {
      return false;
    }
  }

  public addExpression(exp_id: string, expression: IExpression): void {
    this._expressions[exp_id] = expression;
  }

  public getExpression(exp_id: string): IExpression {
    return this._expressions[exp_id];
  }

  public isCreatedTemplate(template_id: string): boolean {
    if (this._templates[template_id]) {
      return true;
    } else {
      return false;
    }
  }

  public addTemplate(template_id: string, template: VE_Template): void {
    this._templates[template_id] = template;
  }

  public getTemplate(template_id: string): VE_Template {
    return this._templates[template_id];
  }

  public isCreatedVar(var_id: string): boolean {
    if (this._variables[var_id] || this._expressions[var_id] || this._templates[var_id]) {
      return true;
    } else {
      return false;
    }
  }

  // getState(fsm_id: string, index: number): VE_State {

  // }

  unload(): void { }

  // setUnloadCallback(callback): void {}


  public update(): void {
    // trigger update
    Object.keys(this._triggers).forEach( key => {
      this._triggers[key].update();
    })
    // action update
    Object.keys(this._actions).forEach( key => {
      this._actions[key].update();
    })
    // TODO: template
    
  }


  public clear(): void {

    if (this.dataSource) {
      this.dataSource.clear();
    }
    if (this.varData) {
      this.varData.clear();
    }
    this._variables = {};
    this._expressions = {};

    if (this._templates) {
      Object.keys(this._templates).forEach(key => {
        this._templates[key].clear();
      })
      this._templates = {};
    }

    this._fsms = {};

    if (this._actions) {
      Object.keys(this._actions).forEach(key => {
        this._actions[key].destroy();
      })
      this._actions = {};
    }

    if (this._triggers) {
      Object.keys(this._triggers).forEach(key => {
        this._triggers[key].destroy();
      })
      this._triggers = {};
    }
  }


}