import { VE_State } from "./state";
import { AssociatedFsmType } from "../enum";
import { VE_Template } from "../template";

export class VE_AssociatedState {

  private _types: AssociatedFsmType[] = [];
  private _indexs: number[] = [];

  private _numberIndex: { [key: number]: number } = {};
  private _states: { [key: number]: VE_State } = {};
  private _templates: { [key: number]: VE_Template } = {};
  private _templateIDs: { [key: number]: string } = {};

  public get FromState(): VE_State {
    return this._fromState;
  }
  private _fromState: VE_State;

  constructor(from_state: VE_State) {
    this._fromState = from_state;
  }
  
  public add(state: VE_State, index: number): void {
    this._types.push(AssociatedFsmType.Object);
    let key: number = this._types.length;
    this._indexs.push(key);
    this._numberIndex[key] = index;
    this._states[key] = state;
  }

  public addTemplate(template: VE_Template, fsm_id: string, index: number): void {
    this._types.push(AssociatedFsmType.Object);
    let key: number = this._types.length;
    this._indexs.push(key);
    this._numberIndex[key] = index;
    this._templates[key] = template;
    this._templateIDs[key] = fsm_id;
  }

  public connect(): void {

  }


}