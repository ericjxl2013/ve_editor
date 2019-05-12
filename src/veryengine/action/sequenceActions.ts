import { SequenceActionState } from "../enum";

export class VE_SequenceActions {

  public get sequenceState(): SequenceActionState {
    return this._sequenceState;
  }
  private _sequenceState: SequenceActionState = SequenceActionState.Initial;


  
}