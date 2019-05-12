import { VE_Variables } from "../variables";

export class VerySceneVariables {

  public static get Variables(): VE_Variables {
    if(VerySceneVariables._variables === null) {
      VerySceneVariables._variables = new VE_Variables('__scene_varibale__');
    }
    return VerySceneVariables._variables;
  }
  private static _variables: Nullable<VE_Variables> = null;

  public static get HasLoaded(): boolean {
    return this._hasLoaded;
  }
  private static _hasLoaded: boolean = false;

  public static initIfNeeded(): void {
    if(!this._hasLoaded) {
      console.log('TODO: 场景变量下载');
    }
  }
}