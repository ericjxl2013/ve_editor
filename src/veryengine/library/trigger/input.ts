import { VE_TriggerBehaviour } from '../../index';
import { VE_Triggers } from '../../trigger';

export class Trigger_MouseDown extends VE_TriggerBehaviour {
  

  public get ID(): string {
    return '鼠标按下|Mouse_Down';
  }


  constructor() {
    super();
  }


  public paraParser(para_array: string[]): boolean {

    let a: BABYLON.Nullable<BABYLON.Observer<BABYLON.PointerInfo>> = this.scene.onPointerObservable.add(  (pointInfo) => {

    })

    this.scene.onPointerObservable.remove(a);

    return true;
  }

  public onUpdate(): void {
    
  }


  public destroy(): void {
    
  }
  

}



VE_Triggers.addTrigger(new Trigger_MouseDown());