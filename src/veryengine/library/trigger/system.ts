import { VE_TriggerBehaviour, VE_Triggers } from "../../trigger";

export class Trigger_Start extends VE_TriggerBehaviour {

  public get ID(): string {
    return 'Start|开始';
  };

  public get className(): string {
    return 'Trigger_Start';
  };

  private _observer: Nullable<BABYLON.Observer<BABYLON.Scene>> = null;


  public paraParser(para_array: string[]): boolean {
    this._observer = this.scene.onBeforeRenderObservable.add(() => {
      this.sendEvent();
      this.destroy();
    });
    return true;
  }


  public destroy(): void {
    if (this._observer) {
      this.scene.onBeforeRenderObservable.remove(this._observer);
    }
  }


}

export class Trigger_Continuous extends VE_TriggerBehaviour {

  public get ID(): string {
    return 'Continuous|连续';
  };

  public get className(): string {
    return 'Trigger_Continuous';
  };

  private _observer: Nullable<BABYLON.Observer<BABYLON.Scene>> = null;


  public paraParser(para_array: string[]): boolean {
    this._observer = this.scene.onBeforeRenderObservable.add(() => {
      this.sendEvent();
    });
    return true;
  }


  public destroy(): void {
    if (this._observer) {
      this.scene.onBeforeRenderObservable.remove(this._observer);
    }
  }


}


VE_Triggers.addTrigger(Trigger_Start);
VE_Triggers.addTrigger(Trigger_Continuous);