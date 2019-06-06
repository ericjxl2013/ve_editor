import { VE_FsmData } from "./index";
import { StateConst } from "../state";
import { VE_StateTriggerData } from "./stateTriggerData";
import { VE_StateActionData } from "./stateActionData";

export class VE_StateData {

  public get fsmData(): VE_FsmData {
    return this._fsmData;
  }
  private _fsmData: VE_FsmData;

  public get ValStr(): string {
    return this._valStr;
  }
  private _valStr: string;

  public get isInitialValue(): boolean {
    return this._isInitialValue;
  }
  private _isInitialValue: boolean;

  public logicalExp: string = '';

  public rowIndex: number = -1;

  private _triggers: VE_StateTriggerData[] = [];
  private _triggersPos: string[] = [];
  private _actions: VE_StateActionData[] = [];
  private _actionsPos: string[] = [];
  private _associatedStates: string[] = [];
  private _associatedStatesPos: string[] = [];

  public get isSequence(): boolean {
    return this._isSequence;
  }
  private _isSequence: boolean = false;

  public get triggerCount(): number {
    return this._triggers.length;
  }

  public get actionCount(): number {
    return this._actions.length;
  }

  public get associatedStateCount(): number {
    return this._associatedStates.length;
  }

  constructor(fsm_data: VE_FsmData, val_str: string, is_initial_value: boolean) {
    this._fsmData = fsm_data;
    this._valStr = val_str;
    this._isInitialValue = is_initial_value;
  }

  public hasTrigger(index: number): boolean {
    if(index >= 0 && index < this._triggers.length) {
      return true;
    } else {
      return false;
    }
  }

  public addTrigger(trigger_data: VE_StateTriggerData, pos: string): void {
    this._triggers.push(trigger_data);
    this._triggersPos.push(pos);
  }

  public getTrigger(index: number): VE_StateTriggerData {
    return this._triggers[index];
  }

  public getTriggerPos(index: number): string {
    return this._triggersPos[index];
  }

  public hasAction(index: number): boolean {
    if(index >= 0 && index < this._actions.length) {
      return true;
    } else {
      return false;
    }
  }

  public addAction(action_data: VE_StateActionData, pos: string): void {
    this._actions.push(action_data);
    this._actionsPos.push(pos);
  }

  public getAction(index: number): VE_StateActionData {
    return this._actions[index];
  }

  public getActionPos(index: number): string {
    return this._actionsPos[index];
  }

  public hasAssociatedState(index: number): boolean {
    if(index >= 0 && index < this._associatedStates.length) {
      return true;
    } else {
      return false;
    }
  }

  public addAssociatedState(associated_state_data: string, pos: string): void {
    this._associatedStates.push(associated_state_data);
    this._associatedStatesPos.push(pos);
  }

  public getAssociatedState(index: number): string {
    return this._associatedStates[index];
  }

  public getAssociatedStatePos(index: number): string {
    return this._associatedStatesPos[index];
  }

  public setSequence(): void {
    this._isSequence = true;
  }

}