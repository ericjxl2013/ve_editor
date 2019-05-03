import { VE_ActionBehaviour } from '../../index';

export class Action_Translate extends VE_ActionBehaviour {

  public get ID(): string {
    return '直线运动|Translate';
  }  

  private _refType: BABYLON.Space = BABYLON.Space.LOCAL;

  
  public active(): void {
    
  }


  public onUpdate(): void {
    
  }



  public destroy(): void {
    // 
  }


}

