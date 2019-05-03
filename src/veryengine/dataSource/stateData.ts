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

  public get stateIndex(): number {
    return this._stateIndex;
  }
  private _stateIndex: number = StateConst.STATE_INDEX;

  public logicalExp: string = '';

  private _triggers: VE_StateTriggerData[] = [];
  private _actions: VE_StateActionData[] = [];
  private _associatedStates: string[] = [];

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

  constructor(fsm_data: VE_FsmData, val_str: string, is_initial_value: boolean, state_index: number = StateConst.STATE_INDEX) {
    this._fsmData = fsm_data;
    this._valStr = val_str;
    this._isInitialValue = is_initial_value;
    this._stateIndex = state_index;
  }

  public hasTrigger(index: number): boolean {
    if(index >= 0 && index < this._triggers.length) {
      return true;
    } else {
      return false;
    }
  }

  public addTrigger(trigger_data: VE_StateTriggerData): void {
    this._triggers.push(trigger_data);
  }

  public getTrigger(index: number): VE_StateTriggerData {
    return this._triggers[index];
  }

  public hasAction(index: number): boolean {
    if(index >= 0 && index < this._actions.length) {
      return true;
    } else {
      return false;
    }
  }

  public addAction(action_data: VE_StateActionData): void {
    this._actions.push(action_data);
  }

  public getAction(index: number): VE_StateActionData {
    return this._actions[index];
  }

  public hasAssociatedState(index: number): boolean {
    if(index >= 0 && index < this._associatedStates.length) {
      return true;
    } else {
      return false;
    }
  }

  public addAssociatedState(associated_state_data: string): void {
    this._associatedStates.push(associated_state_data);
  }

  public getAssociatedState(index: number): string {
    return this._associatedStates[index];
  }

  public setSequence(): void {
    this._isSequence = true;
  }

}