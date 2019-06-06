import { SequenceActionState, StateActionType, ActionType } from "../enum";
import { VE_StateAction } from "./stateAction";
import { VE_AssociatedState } from "./associatedState";
import { VE_ActionBehaviour } from "../action";
import { BabylonEngine } from "../babylon";

export class VE_SequenceActions {

  public get sequenceState(): SequenceActionState {
    return this._sequenceState;
  }
  private _sequenceState: SequenceActionState = SequenceActionState.Initial;

  private _activeActionIndex: number = -1;

  public get StateActions(): VE_StateAction[] {
    return this._stateActions;
  }
  private _stateActions: VE_StateAction[] = [];

  public get ActiveActions(): VE_StateAction[] {
    return this._activeActions;
  }
  private _activeActions: VE_StateAction[] = [];

  public get AssociatedStates(): VE_AssociatedState[] {
    return this._associatedStates;
  }
  private _associatedStates: VE_AssociatedState[] = [];

  private _observer: Nullable<BABYLON.Observer<BABYLON.Scene>> = null;


  public sequenceAction(actions: VE_StateAction[], associated_states: VE_AssociatedState[]) {
    //this._actionDic.Clear();
    this._activeActions = [];
    this._stateActions = [];
    this._associatedStates = [];
    this._sequenceState = SequenceActionState.Running;
    for (let i: number = 0; i < actions.length; i++) {
      if (actions[i].type === StateActionType.Action && actions[i].action!.type === ActionType.Animation) {
        actions[i].action!.SequenceState = SequenceActionState.Prepared;
      }
      this._stateActions.push(actions[i]);
    }
    for (let i: number = 0; i < associated_states.length; i++) {
      this._associatedStates.push(associated_states[i]);
    }
    if (this.activate(0)) {
      this.checkActionsFinished();
    }

    this._observer = BabylonEngine.Scene.onBeforeRenderObservable.add(() => {
      this.update();
    });
  }

  private activate(start_index: number): boolean {
    for (let i: number = start_index; i < this.StateActions.length; i++) {
      this._activeActionIndex = i;
      if (this.StateActions[i].type === StateActionType.Assignment) {
        this.StateActions[i].assignment!.assign();
      }
      else {
        let action: VE_ActionBehaviour = this.StateActions[i].action!;
        if (action.type === ActionType.Normal || !action.isSequence) {
          action.action(this.StateActions[i].enabled.getValue(), this.StateActions[i].everyFrame.getValue());
        }
        else {
          this.ActiveActions.push(this.StateActions[i]);
          action.sequenceAction(this, this.StateActions[i].enabled.getValue(), this.StateActions[i].everyFrame.getValue());
          return false;
        }
      }
    }
    return true;
  }


  public pause(): void {
    if (this.ActiveActions.length > 0) {
      this._sequenceState = SequenceActionState.Pause;
      this.ActiveActions[0].action!.pause();
    }
  }

  public resume(): void {
    if (this.ActiveActions.length > 0) {
      this._sequenceState = SequenceActionState.Running;
      this.ActiveActions[0].action!.resume();
    }
  }


  public stop(): void {
    if (this.ActiveActions.length > 0) {
      this._sequenceState = SequenceActionState.Initial;
      this.ActiveActions[0].action!.stop();
      this.actionRecover();
      // 销毁
      this.destroy();
    }
  }

  private checkActionsFinished(): void {
    if (this.ActiveActions.length == 0 && (++this._activeActionIndex >= this.StateActions.length || this.activate(this._activeActionIndex))) {
      this._sequenceState = SequenceActionState.Initial;
      this.actionRecover();
      // Debug.Log(this.AssociatedStates.Count);
      // 结束，关联状态
      if (this.AssociatedStates.length > 0) {
        for (let i: number = 0; i < this.AssociatedStates.length; i++) {
          this.AssociatedStates[i].connect();
        }
        // 销毁
        this.destroy();
      }
    }
  }

  private actionRecover(): void {
    for (let i: number = 0; i < this.StateActions.length; i++) {
      if (this.StateActions[i].type === StateActionType.Action && this.StateActions[i].action!.type === ActionType.Animation) {
        this.StateActions[i].action!.SequenceState = SequenceActionState.Initial;
      }
    }
  }


  public finishAction(action: VE_ActionBehaviour): void {
    if (this.ActiveActions.length > 0) {
      for (let i: number = 0; i < this.ActiveActions.length; i++) {
        if (this.ActiveActions[i].type === StateActionType.Action && this.ActiveActions[i].action === action) {
          this._activeActions.splice(i, 1);
          return;
        }
      }
    }
  }


  private update(): void {
    if (this._sequenceState === SequenceActionState.Running) {
      // this.StateTime += Time.deltaTime;
      this.checkActionsFinished();
    }
  }

  public destroy(): void {
    if (this._observer) {
      BabylonEngine.Scene.onBeforeRenderObservable.remove(this._observer);
    }
    this._observer = null;
  }

}