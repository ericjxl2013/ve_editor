
// import { VeryEngine } from "../veryEngine";

export class GameObject {

  public get gameObject(): GameObject {
    return this;
  }

  // transform: sf
  mesh: BABYLON.Nullable<BABYLON.Mesh> = null;

  constructor() {
    // VeryEngine.Scene.getMeshByName()
  }


}


export class Transform {

  public get localPosition(): BABYLON.Vector3 {
    return BABYLON.Vector3.Zero();
  }
  eulerAngles: BABYLON.Vector3 = BABYLON.Vector3.Zero();

  constructor() {

  }

}