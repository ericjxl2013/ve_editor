
// import { VeryEngine } from "../veryEngine";

export class GameObject {

  public get gameObject(): GameObject {
    return this;
  }

  public get transform(): Transform {
    return this._transform;
  }
  private _transform: Transform = new Transform();


  private mesh: BABYLON.Nullable<BABYLON.Mesh> = null;

  constructor() {
    // VeryEngine.Scene.getMeshByName()
  }


}


export class Transform {

  public localPosition: BABYLON.Vector3 = BABYLON.Vector3.Zero();
  public position: BABYLON.Vector3 = BABYLON.Vector3.Zero();

  public localEulerAngles: BABYLON.Vector3 = BABYLON.Vector3.Zero();
  public eulerAngles: BABYLON.Vector3 = BABYLON.Vector3.Zero();

  public get childCount(): number {
    return 0;
  }

  public forward: BABYLON.Vector3 = BABYLON.Vector3.Forward();


  public get hierarchyCount(): number {
    return 0;
  }

  public localScale: BABYLON.Vector3 = new BABYLON.Vector3(1, 1, 1);



  constructor() {

  }

}