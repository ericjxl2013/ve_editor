
// import { VeryEngine } from "../veryEngine";

export class GameObject {

  public get gameObject(): GameObject {
    return this;
  }

  public get transform(): Transform {
    return this._transform;
  }
  private _transform: Transform = new Transform();

  public name: string;

  private mesh: BABYLON.Nullable<BABYLON.Mesh> = null;

  constructor(name: string) {
    this.name = name;
    // VeryEngine.Scene.getMeshByName()
  }

  // TODO
  public static find(name: string): Nullable<GameObject> {
    return new GameObject(name);
  }

}


export class Transform {


  private _transformNode: BABYLON.Nullable<BABYLON.TransformNode> = null;
  private _mesh: BABYLON.Nullable<BABYLON.Mesh> = null;

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