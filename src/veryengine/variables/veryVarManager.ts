import { ShowError } from "../html/showError";
import { IVeryVar } from "./IVeryVar";
import { ErrorInfo } from "../utility";
import { VE_Variables } from "./variables";
import { VE_Manager } from "../manager";
import { VE_Objects, VeryEngineObject } from "../object";
import { VE_Template } from "../template";
import { GameGlobal } from "../global";
import { VeryExpression } from "./veryExpression";

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
    // 平台只加载一次，避免重复加载
    if (!GameGlobal.PlatformLoaded) {
      var_type = var_type.toLowerCase().trim();
      // 由于直接访问，所以在这里直接报错
      if (this._veryVarTypes[var_type]) {
        ShowError.showError('VeryVar变量初始化错误，变量类型重复，当前变量名：' + var_type + '，当前变量类型：' + var_prototype.className);
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
      if (!variable) {
        error_info.isRight = false;
        error_info.message = '变量创建错误：当前类型在平台中不存在，请检查！类型名：' + var_type;
        return null;
      }
      let result: any = (<IVeryVar>variable).initValue(value, error_info);
      if (error_info.isRight) {
        (<IVeryVar>variable).setValue(result);
        return <IVeryVar>variable;
      } else {
        return null;
      }
    } catch (error) {
      console.log(error.message);
      error_info.isRight = false;
      error_info.message = '变量创建错误：当前类型在平台中不存在，请检查！类型名：' + var_type + '，错误原因：' + error.message;
      return null;
    }
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

  // *变量
  // 对象名.*变量
  public static getVariable(var_id: string, project_name: string, object_id: string, error_info: ErrorInfo): Nullable<IVeryVar> {
    if (project_name === '') {
      return this.getSceneVariable(var_id, error_info);
    } else if (object_id === '') {
      return this.getGlobalVariable(var_id, project_name, error_info);
    } else {
      let objects: VE_Objects = VE_Manager.objects(project_name);
      if (objects) {
        let veryObject: VeryEngineObject = objects.getVeryObject(object_id);
        if (veryObject) {
          if (veryObject.isCreatedVariable(var_id)) {
            return veryObject.getVariable(var_id);
          } else if (veryObject.isCreatedExpression(var_id)) {
            return new VeryExpression(veryObject.getExpression(var_id));
          } else if (veryObject.isCreatedFsm(var_id)) {
            return veryObject.getFsm(var_id).fsmVar;
          } else {
            return this.getGlobalVariable(var_id, project_name, error_info);
          }
        } else {
          return this.getGlobalVariable(var_id, project_name, error_info);
        }
      } else {
        return this.getGlobalVariable(var_id, project_name, error_info);
      }
    }
  }

  // *模板变量.*变量
  // 对象名.*模板变量.*变量
  public static getTemplateVariable(template_var_id: string, var_id: string, project_name: string, object_id: string, error_info: ErrorInfo): Nullable<IVeryVar> {
    if (project_name === '') {
      // 场景变量暂不允许模板变量的存在
      error_info.isRight = false;
      error_info.message = "无法在当前项目中查找到当前模板变量：" + template_var_id + "；\n";
      return null;
    }
    else {
      if (object_id !== '')  //对象局部变量
      {
        let objects: VE_Objects = VE_Manager.objects(project_name);
        if (!objects) {
          error_info.isRight = false;
          error_info.message += "无法在当前项目中查找到当前对象：" + object_id + "；\n";
          return null;
        }
        else {
          if (objects.isCreated(object_id)) {
            let veryObject: VeryEngineObject = objects.getVeryObject(object_id);
            if (veryObject.isCreatedTemplate(template_var_id)) {
              let template: VE_Template = veryObject.getTemplate(template_var_id);
              if (template.templateInstance === null) {
                error_info.isRight = false;
                error_info.message += "当前模板变量未实例化，请先实例化该模板对象，模板变量名：" + template_var_id + "；\n";
                return null;
              }
              else {
                if (template.templateInstance.isCreatedVariable(var_id)) {
                  return template.templateInstance.getVariable(var_id);
                }
                else if (template.templateInstance.isCreatedExpression(var_id)) {
                  return new VeryExpression(template.templateInstance.getExpression(var_id));
                }
                else if (template.templateInstance.isCreatedFsm(var_id)) {
                  return template.templateInstance.getFsm(var_id).fsmVar;
                }
                else {
                  error_info.isRight = false;
                  error_info.message += "当前模板变量中无法查找到该变量，模板变量名：" + template_var_id + "，变量名：" + var_id + "；\n";
                  return null;
                }
              }
            }
            else {
              error_info.isRight = false;
              error_info.message += "无法在当前项目中查找到当前模板变量：" + template_var_id + "；\n";
              return null;
            }
          }
          else {
            error_info.isRight = false;
            error_info.message += "无法在当前项目中查找到当前对象：" + object_id + "；\n";
            return null;
          }
        }
      }
      // 全局变量
      else {
        let variables: VE_Variables = VE_Manager.variables(project_name);
        if (!variables) {
          error_info.isRight = false;
          error_info.message += "无法在当前项目中查找到当前模板变量：" + template_var_id + "；\n";
          return null;
        }
        else {
          if (variables.isCreatedTemplate(template_var_id)) {
            let template: VE_Template = variables.getTemplate(template_var_id);
            if (template.templateInstance === null) {
              error_info.isRight = false;
              error_info.message += "当前模板变量未实例化，请先实例化该模板对象，模板变量名：" + template_var_id + "；\n";
              return null;
            }
            else {
              if (template.templateInstance.isCreatedVariable(var_id)) {
                return template.templateInstance.getVariable(var_id);
              }
              else if (template.templateInstance.isCreatedExpression(var_id)) {
                return new VeryExpression(template.templateInstance.getExpression(var_id));
              }
              else if (template.templateInstance.isCreatedFsm(var_id)) {
                return template.templateInstance.getFsm(var_id).fsmVar;
              }
              else {
                error_info.isRight = false;
                error_info.message += "当前模板变量中无法查找到该变量，模板变量名：" + template_var_id + "，变量名：" + var_id + "；\n";
                return null;
              }
            }
          }
          else {
            error_info.isRight = false;
            error_info.message += "无法在当前项目中查找到当前模板变量：" + template_var_id + "；\n";
            return null;
          }
        }
      }
    }
  }

  public static getGlobalVariable(var_id: string, project_name: string, error_info: ErrorInfo): Nullable<IVeryVar> {
    if (project_name === '') {
      return this.getSceneVariable(var_id, error_info);
    } else {
      let variables: VE_Variables = VE_Manager.variables(project_name);
      if (variables) {
        if (variables.isCreatedVariable(var_id)) {
          return variables.getVariable(var_id);
        } else if (variables.isCreatedExpression(var_id)) {
          return new VeryExpression(variables.getExpression(var_id));
        } else {
          return this.getSceneVariable(var_id, error_info);
        }
      } else {
        return this.getSceneVariable(var_id, error_info);
      }
    }
  }


  public static getSceneVariable(var_id: string, error_info: ErrorInfo): Nullable<IVeryVar> {
    error_info.isRight = false;
    error_info.message = '暂时不支持场景变量！'
    return null;
  }

  public static dispose(): void {
    VeryVarManager._veryVarTypes = {};
  }
}
