import { ShowError } from "../html/showError";
import { IVeryVar } from "./IVeryVar";
import { VeryBool } from "./veryBool";

export class VeryVarManager {
  
  public static VeryVarTypes: { [key: string]: IVeryVar } = {};

  public static HasVarType(var_type: string): boolean {
    if(this.VeryVarTypes[var_type]) {
      return true;
    } else {
      return false;
    }
  }

  public static AddVarType(var_type: string, var_proto: IVeryVar): void {
    // 由于直接访问，所以在这里直接报错
    if(this.VeryVarTypes[var_type]) {
      ShowError.showError('VeryVar变量初始化错误，变量类型重复，当前变量名：' +  var_type + '，当前变量类型：' + var_proto);
    } else {
      // console.log(var_proto.VarType);
      this.VeryVarTypes[var_type] = var_proto;
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
  public static CreateVar(var_type: string): IVeryVar {
    return Object.create(this.GetVarType(var_type));
  }

  public static GetVarType(var_type: string): any {
      if (this.VeryVarTypes && this.VeryVarTypes[var_type]) {
          return this.VeryVarTypes[var_type];
      }
      return null;
  }



}