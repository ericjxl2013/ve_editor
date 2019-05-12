import { VE_FsmData } from "./fsmData";

export class VE_DataSource {

  public get projectName(): string {
    return this._projectName;
  }
  private _projectName: string = '';

  public get objectID(): string {
    return this._objectID;
  }
  private _objectID: string = '';

  public get templateID(): string {
    return this._templateID;
  }
  private _templateID: string = '';

  public get isTemplate(): boolean {
    return this._isTemplate;
  }
  private _isTemplate: boolean = false;

  public get id(): string {
    if (this._isTemplate) {
      return this._templateID;
    } else {
      return this._objectID;
    }
  }

  private _fsmIDs: string[] = [];
  private _fsmDic: { [key: string]: VE_FsmData } = {};
  private _fsmPosDic: { [key: string]: string } = {};

  private _triggerIDs: string[] = [];
  private _triggerDic: { [key: string]: string[] } = {};
  private _triggerPosDic: { [key: string]: string } = {};

  private _actionIDs: string[] = [];
  private _actionDic: { [key: string]: string[] } = {};
  private _actionInitValue: { [key: string]: string[] } = {};
  private _actionPosDic: { [key: string]: string } = {};

  public get triggerCount(): number {
    return this._triggerIDs.length;
  }

  public get actionCount(): number {
    return this._actionIDs.length;
  }

  public get fsmCount(): number {
    return this._fsmIDs.length;
  }


  constructor(project_name: string, name_id: string, is_template: boolean) {
    this._projectName = project_name;
    this._isTemplate = is_template;
    if(is_template) {
      this._templateID = name_id;
    } else {
      this._objectID = name_id;
    }
  }

  public isCreatedFsm(fsm_id: string): boolean {
    if(this._fsmDic[fsm_id]) {
      return true;
    } else {
      return false;
    }
  }

  public createFsm(fsm_id: string, pos: string): void {
    this._fsmIDs.push(fsm_id);
    this._fsmDic[fsm_id] = new VE_FsmData(fsm_id, this);
    this._fsmPosDic[fsm_id] = pos;
  }

  public getFsmData(fsm_id: string): VE_FsmData {
    return this._fsmDic[fsm_id];
  }

  public getFsmPos(fsm_id: string): string {
    return this._fsmPosDic[fsm_id];
  }

  public hasFsmIndex(index: number): boolean {
    if(index >= 0 && index < this._fsmIDs.length) {
      return true;
    } else {
      return false;
    }
  }

  public getFsmID(index: number): string {
    return this._fsmIDs[index];
  }

  public isCreatedTrigger(trigger_id: string): boolean {
    if(this._triggerDic[trigger_id]) {
      return true;
    } else {
      return false;
    }
  }

  public addTrigger(trigger_id: string, trigger_data: string[], pos: string): void {
    this._triggerIDs.push(trigger_id);
    this._triggerDic[trigger_id] = trigger_data;
    this._triggerPosDic[trigger_id] = pos;
  }

  public getTrigger(trigger_id: string): string[] {
    return this._triggerDic[trigger_id];
  }

  public getTriggerPos(trigger_id: string): string {
    return this._triggerPosDic[trigger_id];
  }

  public hasTriggerIndex(index: number): boolean {
    if(index >=0 && index < this._triggerIDs.length) {
      return true;
    } else {
      return false;
    }
  }

  public getTriggerID(index: number): string {
    return this._triggerIDs[index];
  }

  public getTriggerPara(trigger_id: string): string[] {
    return this._triggerDic[trigger_id];
  }

  public isCreatedAction(action_id: string): boolean {
    if(this._actionDic[action_id]) {
      return true;
    } else {
      return false;
    }
  }

  public addAction(action_id: string, action_data: string[], action_init_val: string[], pos: string): void {
    this._actionIDs.push(action_id);
    this._actionDic[action_id] = action_data;
    this._actionInitValue[action_id] = action_init_val;
    this._actionPosDic[action_id] = pos;
  }

  public getActionPara(action_id: string): string[] {
    return this._actionDic[action_id];
  }

  public getActionPos(action_id: string): string {
    return this._actionPosDic[action_id];
  }

  public getActionInitVal(action_id: string): string[] {
    return this._actionInitValue[action_id];
  }

  public hasActionIndex(index: number): boolean {
    if(index >= 0 && index < this._actionIDs.length) {
      return true;
    } else {
      return false;
    }
  }

  public getActionID(index: number): string {
    return this._actionIDs[index];
  }

  public clear(): void {
    this._fsmIDs = [];
    this._fsmDic = {};
    this._triggerIDs = [];
    this._triggerDic = {};
    this._actionIDs = [];
    this._actionDic = {};
    this._actionInitValue = {};
  }



}