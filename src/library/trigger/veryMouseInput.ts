import { VE_TriggerBehaviour } from "src/veryengine";

export class ActionMouseDown extends VE_TriggerBehaviour {
  

  public get ID(): string {
    return '鼠标按下|Mouse_Down';
  }

  constructor() {
    super();
  }


  public paraParser(para_array: string[]): boolean {

    return true;
  }


  public destroy(): void {
    
  }
}