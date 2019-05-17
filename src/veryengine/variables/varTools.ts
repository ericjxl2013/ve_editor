import { StateConst } from "../state";
import { IVeryVar } from "./IVeryVar";
import { ErrorInfo } from "../utility";
import { VerySceneVariables } from "../scene";
import { VE_Variables } from "./variables";
import { VE_Objects, VeryEngineObject } from "../object";
import { VE_Manager } from "../manager";
import { VE_Template } from "../template";
import { VeryExpression } from "./veryExpression";

export class VarTools {

  /**
   * 系统中是否含有该ID对象的变量；
   * @param var_id 变量ID；
   */
  public static IsVarID(var_id: string): boolean {
    return var_id.indexOf(StateConst.VARIABLE_SYMBOL) > -1;
  }

  /**
   * 触发和响应可以接收普通变量，不能接收状态变量和公式变量，也不能接收模板变量；
   * 1. *变量 - 对象局部变量 -> 项目全局变量 -> 场景变量；
   * 2. 对象名.*变量 - 对象局部变量；
   * @param project_name 项目名；
   * @param object_id 对象名；
   * @param var_id 变量ID；
   * @param error_info 错误信息；
   */
  public static GetVeryVar(project_name: string, object_id: string, var_id: string, error_info: ErrorInfo): Nullable<IVeryVar> {
    if (var_id.indexOf(StateConst.STATE_SEPARATOR) > -1) {
      let varArray: string[] = var_id.split(StateConst.STATE_SEPARATOR);
      if (varArray.length !== 2) {
        error_info.isRight = false;
        error_info.message = "当前变量格式应为“对象名.*变量”，当前变量ID为：" + var_id + "，不符合，请检查！";
        return null;
      }
      else {
        for (let i: number = 0; i < varArray.length; i++) {
          varArray[i] = varArray[i].trim();
        }
        // 对象名.*变量
        if (varArray[1].startsWith(StateConst.VARIABLE_SYMBOL)) {
          let objects: VE_Objects = VE_Manager.objects(project_name);
          if (objects.isCreated(varArray[0])) {
            let veryObject: VeryEngineObject = objects.getVeryObject(varArray[0]);
            let varID: string = varArray[1].substring(1);
            if (veryObject.isCreatedVariable(varID)) {
              return veryObject.getVariable(varID);
            }
            else if (veryObject.isCreatedFsm(varID)) {
              error_info.isRight = false;
              error_info.message = "当前触发和响应不能引用状态变量，当前变量ID为：" + var_id + "，请检查！";
              return null;
            }
            else if (veryObject.isCreatedExpression(varID)) {
              error_info.isRight = false;
              error_info.message = "当前触发和响应不能引用公式变量，当前变量ID为：" + var_id + "，请检查！";
              return null;
            }
            else if (veryObject.isCreatedTemplate(varID)) {
              error_info.isRight = false;
              error_info.message = "当前触发和响应不能引用模板变量，当前变量ID为：" + var_id + "，请检查！";
              return null;
            }
            else {
              error_info.isRight = false;
              error_info.message = "当前变量格式应为“对象名.*变量”，当前变量ID为：" + var_id + "，在当前对象中无法查找到该变量，请检查！";
              return null;
            }
          }
          else {
            error_info.isRight = false;
            error_info.message = "当前变量格式应为“对象名.*变量”，当前变量ID为：" + var_id + "，在当前系统中，无法查找到该对象名，请检查！";
            return null;
          }
        }
        else {
          error_info.isRight = false;
          error_info.message = "当前变量格式应为“对象名.*变量”，当前变量ID为：" + var_id + "，不符合，请检查！";
          return null;
        }
      }
    }
    else {
      // *变量
      if (var_id.startsWith(StateConst.VARIABLE_SYMBOL)) {
        var_id = var_id.substring(1);
        let objects: VE_Objects = VE_Manager.objects(project_name);
        if (objects.isCreated(object_id)) {
          let veryObject: VeryEngineObject = objects.getVeryObject(object_id);
          if (veryObject.isCreatedVariable(var_id)) {
            return veryObject.getVariable(var_id);
          }
          else if (veryObject.isCreatedFsm(var_id)) {
            error_info.isRight = false;
            error_info.message = "当前触发和响应不能引用状态变量，当前变量ID为：" + var_id + "，请检查！";
            return null;
          }
          else if (veryObject.isCreatedExpression(var_id)) {
            error_info.isRight = false;
            error_info.message = "当前触发和响应不能引用公式变量，当前变量ID为：" + var_id + "，请检查！";
            return null;
          }
          else if (veryObject.isCreatedTemplate(var_id)) {
            error_info.isRight = false;
            error_info.message = "触发和响应不能引用模板变量，当前变量ID为：" + var_id + "，请检查！";
            return null;
          }
          else {
            return VarTools.GetGlobalVar(VE_Manager.variables(project_name), var_id, error_info);
          }
        }
        else {
          return VarTools.GetGlobalVar(VE_Manager.variables(project_name), var_id, error_info);
        }
      }
      else {
        error_info.isRight = false;
        error_info.message = "变量格式错误，应为“*变量”的格式，当前变量ID为：" + var_id + "，请检查！";
        return null;
      }
    }
  }

  /**
   * 获取全局变量，只获取普通变量，不包含公式变量；
   * @param global_vars 全局变量存储结构；
   * @param var_id 变量ID；
   * @param error_info 错误信息；
   */
  public static GetGlobalVar(global_vars: VE_Variables, var_id: string, error_info: ErrorInfo): Nullable<IVeryVar> {
    if (global_vars.isCreatedVariable(var_id)) {
      return global_vars.getVariable(var_id);
    }
    else if (global_vars.isCreatedExpression(var_id)) {
      error_info.isRight = false;
      error_info.message = "当前触发和响应不能引用公式变量，当前变量ID为：" + var_id + "，请检查！";
      return null;
    }
    else if (global_vars.isCreatedTemplate(var_id)) {
      error_info.isRight = false;
      error_info.message = "当前触发和响应不能引用模板变量，当前变量ID为：" + var_id + "，请检查！";
      return null;
    }
    else {
      return VarTools.GetSceneVar(var_id, error_info);
    }
  }

  /**
   * 获取场景变量，只获取普通变量，不包含公式变量；
   * @param var_id 变量ID；
   * @param error_info 错误信息；
   */
  public static GetSceneVar(var_id: string, error_info: ErrorInfo): Nullable<IVeryVar> {
    if (VerySceneVariables.Variables.isCreatedVariable(var_id)) {
      return VerySceneVariables.Variables.getVariable(var_id);
    }
    else if (VerySceneVariables.Variables.isCreatedExpression(var_id)) {
      error_info.isRight = false;
      error_info.message = "当前触发和响应不能引用公式变量，当前变量ID为：" + var_id + "，请检查！";
      return null;
    }
    else {
      error_info.isRight = false;
      error_info.message = "无法在系统中查找到该变量，当前变量ID为：" + var_id + "，请检查！";
      return null;
    }
  }

  /**
   * 触发和响应获取模板变量；
   * 1. *变量 - 对象局部变量 -> 项目全局变量；
   * 2. 对象名.*变量 - 对象局部模板变量；
   * @param project_name 项目名；
   * @param object_id 对象名；
   * @param var_id 变量ID；
   * @param error_info 错误信息；
   */
  public static GetTemplate(project_name: string, object_id: string, var_id: string, error_info: ErrorInfo): Nullable<VE_Template> {
    if (var_id.indexOf(StateConst.STATE_SEPARATOR) > -1) {
      let varArray: string[] = var_id.split(StateConst.STATE_SEPARATOR);
      if (varArray.length !== 2) {
        error_info.isRight = false;
        error_info.message = "当前变量格式应为“对象名.*变量”，当前变量ID为：" + var_id + "，不符合，请检查！";
        return null;
      }
      else {
        for (let i: number = 0; i < varArray.length; i++) {
          varArray[i] = varArray[i].trim();
        }
        // 对象名.*变量
        if (varArray[1].startsWith(StateConst.VARIABLE_SYMBOL)) {
          let objects: VE_Objects = VE_Manager.objects(project_name);
          if (objects.isCreated(varArray[0])) {
            let veryObject: VeryEngineObject = objects.getVeryObject(varArray[0]);
            let varID: string = varArray[1].substring(1);
            if (veryObject.isCreatedTemplate(varID)) {
              return veryObject.getTemplate(varID);
            }
            else {
              error_info.isRight = false;
              error_info.message = "当前变量格式应为“对象名.*变量”，当前变量ID为：" + var_id + "，在当前对象中无法查找到该模板变量，请检查！";
              return null;
            }
          }
          else {
            error_info.isRight = false;
            error_info.message = "当前变量格式应为“对象名.*变量”，当前变量ID为：" + var_id + "，在当前系统中，无法查找到该对象名，请检查！";
            return null;
          }
        }
        else {
          error_info.isRight = false;
          error_info.message = "当前变量格式应为“对象名.*变量”，当前变量ID为：" + var_id + "，不符合，请检查！";
          return null;
        }
      }
    }
    else {
      // *变量
      if (var_id.startsWith(StateConst.VARIABLE_SYMBOL)) {
        var_id = var_id.substring(1);
        let objects: VE_Objects = VE_Manager.objects(project_name);
        if (objects.isCreated(object_id)) {
          let veryObject: VeryEngineObject = objects.getVeryObject(object_id);
          if (veryObject.isCreatedTemplate(var_id)) {
            return veryObject.getTemplate(var_id);
          }
        }
        let globalVars: VE_Variables = VE_Manager.variables(project_name);
        if (globalVars.isCreatedTemplate(var_id)) {
          return globalVars.getTemplate(var_id);
        }
        else {
          error_info.isRight = false;
          error_info.message = "当前变量格式应为“*变量”，当前变量ID为：" + var_id + "，在当前项目中无法查找到该模板变量，请检查！";
          return null;
        }
      }
      else {
        error_info.isRight = false;
        error_info.message = "当前变量格式应为“*变量”，当前变量ID为：" + var_id + "，不符合，请检查！";
        return null;
      }
    }
  }


  public static GetVeryVarWithExpression(project_name: string, object_id: string, var_id: string, error_info: ErrorInfo): Nullable<IVeryVar> {
    if (var_id.indexOf(StateConst.STATE_SEPARATOR) > -1) {
      let varArray: string[] = var_id.split(StateConst.STATE_SEPARATOR);
      if (varArray.length !== 2) {
        error_info.isRight = false;
        error_info.message = "当前变量格式应为“对象名.*变量”，当前变量ID为：" + var_id + "，不符合，请检查！";
        return null;
      }
      else {
        for (let i: number = 0; i < varArray.length; i++) {
          varArray[i] = varArray[i].trim();
        }
        // 对象名.*变量
        if (varArray[1].startsWith(StateConst.VARIABLE_SYMBOL)) {
          let objects: VE_Objects = VE_Manager.objects(project_name);
          if (objects.isCreated(varArray[0])) {
            let veryObject: VeryEngineObject = objects.getVeryObject(varArray[0]);
            let varID: string = varArray[1].substring(1);
            if (veryObject.isCreatedVariable(varID)) {
              return veryObject.getVariable(varID);
            }
            else if (veryObject.isCreatedFsm(varID)) {
              return veryObject.getFsm(varID).fsmVar;
            }
            else if (veryObject.isCreatedExpression(varID)) {
              return new VeryExpression(veryObject.getExpression(varID));
            }
            else if (veryObject.isCreatedTemplate(varID)) {
              error_info.isRight = false;
              error_info.message = "当前触发和响应不能引用模板变量，当前变量ID为：" + var_id + "，请检查！";
              return null;
            }
            else {
              error_info.isRight = false;
              error_info.message = "当前变量格式应为“对象名.*变量”，当前变量ID为：" + var_id + "，在当前对象中无法查找到该变量，请检查！";
              return null;
            }
          }
          else {
            error_info.isRight = false;
            error_info.message = "当前变量格式应为“对象名.*变量”，当前变量ID为：" + var_id + "，在当前系统中，无法查找到该对象名，请检查！";
            return null;
          }
        }
        else {
          error_info.isRight = false;
          error_info.message = "当前变量格式应为“对象名.*变量”，当前变量ID为：" + var_id + "，不符合，请检查！";
          return null;
        }
      }
    }
    else {
      // *变量
      if (var_id.startsWith(StateConst.VARIABLE_SYMBOL)) {
        var_id = var_id.substring(1);
        let objects: VE_Objects = VE_Manager.objects(project_name);
        if (objects.isCreated(object_id)) {
          let veryObject: VeryEngineObject = objects.getVeryObject(object_id);
          if (veryObject.isCreatedVariable(var_id)) {
            return veryObject.getVariable(var_id);
          }
          else if (veryObject.isCreatedFsm(var_id)) {
            return veryObject.getFsm(var_id).fsmVar;
          }
          else if (veryObject.isCreatedExpression(var_id)) {
            return new VeryExpression(veryObject.getExpression(var_id));
          }
          else if (veryObject.isCreatedTemplate(var_id)) {
            error_info.isRight = false;
            error_info.message = "当前触发和响应不能引用模板变量，当前变量ID为：" + var_id + "，请检查！";
            return null;
          }
          else {
            return VarTools.GetGlobalVarWithExpression(VE_Manager.variables(project_name), var_id, error_info);
          }
        }
        else {
          return VarTools.GetGlobalVarWithExpression(VE_Manager.variables(project_name), var_id, error_info);
        }
      }
      else {
        error_info.isRight = false;
        error_info.message = "变量格式错误，应为“*变量”的格式，当前变量ID为：" + var_id + "，请检查！";
        return null;
      }
    }
  }


  public static GetGlobalVarWithExpression(global_vars: VE_Variables, var_id: string, error_info: ErrorInfo): Nullable<IVeryVar> {
    if (global_vars.isCreatedVariable(var_id)) {
      return global_vars.getVariable(var_id);
    }
    else if (global_vars.isCreatedExpression(var_id)) {
      return new VeryExpression(global_vars.getExpression(var_id));
    }
    else if (global_vars.isCreatedTemplate(var_id)) {
      error_info.isRight = false;
      error_info.message = "当前触发和响应不能引用模板变量，当前变量ID为：" + var_id + "，请检查！";
      return null;
    }
    else {
      return VarTools.GetSceneVarWithExpression(var_id, error_info);
    }
  }

  public static GetSceneVarWithExpression(var_id: string, error_info: ErrorInfo): Nullable<IVeryVar> {
    if (VerySceneVariables.Variables.isCreatedVariable(var_id)) {
      return VerySceneVariables.Variables.getVariable(var_id);
    }
    else if (VerySceneVariables.Variables.isCreatedExpression(var_id)) {
      return new VeryExpression(VerySceneVariables.Variables.getExpression(var_id));
    }
    else {
      error_info.isRight = false;
      error_info.message = "无法在系统中查找到该变量，当前变量ID为：" + var_id + "，请检查！";
      return null;
    }
  }

}