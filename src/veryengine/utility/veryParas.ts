import { VeryGameObject, VeryBool, VeryNumber, VeryString, VeryVector3 } from "../variables";

export class VeryParas {

  public gameObject: VeryGameObject = new VeryGameObject();

  public bool: VeryBool = new VeryBool();

  public number: VeryNumber = new VeryNumber();

  public string: VeryString = new VeryString();

  public vector3: VeryVector3 = new VeryVector3();

  public vecNumbers: VeryNumber[] = [new VeryNumber(), new VeryNumber(), new VeryNumber()];

  public isVec: boolean = true;

  constructor() {

  }


  public clear(): void {

  }



}
