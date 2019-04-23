import { IVeryVar } from "./IVeryVar";
// import { Vector3 } from "babylonjs";
import { ErrorInfo } from "../utility/errorInfo";

export class VeryVector3 implements IVeryVar {

  VarType: string = 'Vector3';

  public get Value(): BABYLON.Vector3 {
    //let a: BABYLON.Vector3 = new BABYLON.Vector3 (1,1,1);
    return this._value;
  }
  public set Value(val:BABYLON.Vector3) {
    this._value = val;
  }
  private _value: BABYLON.Vector3 = BABYLON.Vector3.Zero();


  constructor() {

  }

  getValue(): any {
    return this._value;
  }

  setValue(val: any) {
    this._value = val;
  }

  initValue(value_str: string, error_info: ErrorInfo): any {
    if(value_str === 'none' || value_str === 'null') {
      
    } else {
      error_info.isRight = false;
      error_info.message = 'Type: ' + this.VarType + '，值：' + value_str + '，该变量值和类型不匹配，转化错误，请检查！'
    }
  }

}