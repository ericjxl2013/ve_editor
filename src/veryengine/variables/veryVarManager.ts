import { ShowError } from "../html/showError";
import { IVeryVar } from "./IVeryVar";
import { ErrorInfo } from "../utility";

export class VeryVarManager {

  private static _veryVarTypes: { [key: string]: IVeryVar } = {};

  public static hasVarType(var_type: string): boolean {
    var_type = var_type.toLowerCase();
    if (this._veryVarTypes[var_type]) {
      return true;
    } else {
      return false;
    }
  }

  public static addVarType(var_type: string, var_prototype: IVeryVar): void {
    var_type = var_type.toLowerCase().trim();
    // 由于直接访问，所以在这里直接报错
    if (this._veryVarTypes[var_type]) {
      ShowError.showError('VeryVar变量初始化错误，变量类型重复，当前变量名：' + var_type + '，当前变量类型：' + var_prototype);
    } else {
      // console.log(var_proto.VarType);
      this._veryVarTypes[var_type] = var_prototype;
      // let a = Object.create(this.GetVarType(var_type));
      // console.log(a.Value);
      // a.Value = true;
      // console.log(a.Value);
      // a.Value = 1234;
      // console.log(a.getValue());
      // console.log(this.GetVarType(var_type).__proto__);
    }
  }

  // TODO
  public static createVar(var_type: string): IVeryVar {
    var_type = var_type.toLowerCase();
    return Object.create(this.getVarType(var_type));
  }

  public static createVariable(var_id: string, var_type: string, value: string, error_info: ErrorInfo): Nullable<IVeryVar> {
    var_type = var_type.toLowerCase();
    let variable: any;
    try {
      variable = Object.create(this.getVarType(var_type));
    } catch (error) {
      console.log(error.message);
      error_info.isRight = false;
      error_info.message = '变量创建错误：当前类型在平台中不存在，请检查！类型名：' + var_type + '，错误原因：' + error.message;
      return null;
    }
    if (variable === null) {
      error_info.isRight = false;
      error_info.message = '变量创建错误：当前类型在平台中不存在，请检查！类型名：' + var_type;
      return null;
    }
    return variable;
  }

  public static getVarType(var_type: string): any {
    var_type = var_type.toLowerCase();
    if (this._veryVarTypes && this._veryVarTypes[var_type]) {
      return this._veryVarTypes[var_type];
    }
    return null;
  }


  public static remove(var_type: string): void {
    var_type = var_type.toLowerCase();
    delete this._veryVarTypes[var_type];
  }



}