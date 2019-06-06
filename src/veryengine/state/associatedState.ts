import { VE_State } from "./state";
import { AssociatedFsmType } from "../enum";
import { VE_Template } from "../template";
import { StateConst } from "./stateConst";
import { VE_Fsm } from "./fsm";

export class VE_AssociatedState {

  private _types: AssociatedFsmType[] = [];
  private _indexs: number[] = [];

  private _posArray: string[] = [];

  private _stateValues: { [key: number]: string } = {};
  private _states: { [key: number]: VE_State } = {};
  private _templates: { [key: number]: VE_Template } = {};
  private _templateFsmIDs: { [key: number]: string } = {};

  public get FromState(): VE_State {
    return this._fromState;
  }
  private _fromState: VE_State;

  constructor(from_state: VE_State) {
    this._fromState = from_state;
  }

  public add(state: VE_State, state_value: string, pos: string): void {
    this._types.push(AssociatedFsmType.Object);
    let key: number = this._types.length;
    this._indexs.push(key);
    this._stateValues[key] = state_value;
    this._states[key] = state;
    this._posArray.push(pos);
  }

  public addTemplate(template: VE_Template, fsm_id: string, state_value: string, pos: string): void {
    this._types.push(AssociatedFsmType.Template);
    let key: number = this._types.length;
    this._indexs.push(key);
    this._stateValues[key] = state_value;
    this._templates[key] = template;
    this._templateFsmIDs[key] = fsm_id;
    this._posArray.push(pos);
  }

  public connect(): void {
    for (let i: number = 0; i < this._types.length; i++) {
      let currentType: AssociatedFsmType = this._types[i];
      let Key: number = this._indexs[i];

      // 具体对象，直接关联到对应状态
      if (currentType === AssociatedFsmType.Object) {
        let toState: VE_State = this._states[Key];
        if (toState.logicalAssociated === null || toState.logicalAssociated.evaluate() === true) {
          toState.action(StateConst.ASSOCIATED_STATE_PREFIX + this._fromState.Fsm.ID);
          // 一个成功即返回
          return;
        }
      }
      // 模板对象，根据模板变量名和状态名，获取对应State
      else {
        let template: VE_Template = this._templates[Key];
        let fsmID: string = this._templateFsmIDs[Key];
        let stateValue: string = this._stateValues[Key];

        if (template.templateInstance !== null) {
          if (template.templateInstance.isCreatedFsm(fsmID)) {
            let fsm: VE_Fsm = template.templateInstance.getFsm(fsmID);
            let toState: Nullable<VE_State> = fsm.getState(stateValue);
            if (toState !== null) {
              toState.action(StateConst.ASSOCIATED_STATE_PREFIX + this._fromState.Fsm.ID);
              //一个成功即返回
              return;
            }
            else {
              console.error('错误信息 >>> 位置：' + this._posArray[i] + '，信息：' + "项目名：" + this._fromState.Fsm.projectName + "，对象名：" + this._fromState.Fsm.objectID + "，关联起始状态：" + this._fromState.Fsm.fsmID + "，关联模板变量：" + template.templateVarID + "，目标状态名：" + fsmID + "，状态值：" + stateValue + "，关联状态错误：在目标模板变量的目标状态中，无法查找到该状态，请检查！");
              return;
            }
          }
          else {
            console.error('错误信息 >>> 位置：' + this._posArray[i] + '，信息：' + "项目名：" + this._fromState.Fsm.projectName + "，对象名：" + this._fromState.Fsm.objectID + "，关联起始状态：" + this._fromState.Fsm.fsmID + "，关联模板变量：" + template.templateVarID + "，目标状态名：" + fsmID + "，关联状态错误：在目标模板变量中无法查找到该目标状态名，请检查！");
            return;
          }
        }
        else {
          console.error('错误信息 >>> 位置：' + this._posArray[i] + '，信息：' + "项目名：" + this._fromState.Fsm.projectName + "，对象名：" + this._fromState.Fsm.objectID + "，关联起始状态：" + this._fromState.Fsm.fsmID + "，关联模板变量：" + template.templateVarID + "，关联状态错误：当前模板变量未实例化创建，请检查！");
          return;
        }
      }

    }
  }


}