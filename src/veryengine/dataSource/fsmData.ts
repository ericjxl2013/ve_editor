import { VE_DataSource, VE_StateData } from "./index";

export class VE_FsmData {
  public get dataSource(): VE_DataSource {
    return this._dataSource;
  }
  private _dataSource: VE_DataSource;

  public get fsmID(): string {
    return this._fsmID;
  }
  private _fsmID: string;

  public get initialValStr(): string {
    return this._initialValStr;
  }
  private _initialValStr: string = 'defalut';

  private _states: VE_StateData[] = [];

  public get count(): number {
    return this._states.length;
  }

  constructor(fsm_id: string, data_source: VE_DataSource) {
    this._dataSource = data_source;
    this._fsmID = fsm_id;
  }

  initFsm(initial_var: string): void {
    this._initialValStr = initial_var;
  }

  addState(state_data: VE_StateData): void {
    this._states.push(state_data);
  }

  getState(index: number): VE_StateData {
    return this._states[index];
  }
}