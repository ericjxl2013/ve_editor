import { Scope } from "./scope";
import { ErrorInfo } from "../utility";
import { IExpression, VeryVarExpression, VeryTemplateExpression } from "./expressions";
import { VE_ExpressionParsing } from "./expressionParsing";
import { VariableScope } from "../enum";
import { ParseError } from "./positions";
import { VerySceneVariables } from "../scene";
import { IVeryVar, VE_Variables } from "../variables";
import { VE_Manager } from "../manager";
import { StateConst } from "../state";
import { VE_Objects, VeryEngineObject } from "../object";
import { Variable } from "./variable";
import { VE_Template } from "../template";


export class VE_Expressions {

  public static _scope: Scope = Scope.Create();

  // 1、场景变量创建公式 - 只能引用场景变量；
  // 2、项目全局变量创建公式 - 场景变量 + 项目全局变量；
  // 3、对象局部变量创建公式 - 场景变量 + 项目全局变量 + 对象局部变量 + 对象状态值；
  // 4、模板对象局部变量创建公式 - 场景变量 + 项目全局变量 + 模板对象局部变量 + 模板对象状态值；
  // 5、触发激活条件 - 场景变量 + 项目全局变量 + 对象局部变量 + 对象状态值，且为bool类型；
  // 6、状态逻辑表达式 - 同上；


  // TODO：公式中有一类特殊情况，由模板直接判断当前模板变量是否 == 某个GameObject或者物体
  // 创建场景变量
  public static createSceneExpression(name_id: string, expression_str: string, error_info: ErrorInfo): IExpression {
    let sceneExp: IExpression = VE_ExpressionParsing.parsing(name_id, expression_str, VE_Expressions._scope, '', '', '', VariableScope.Scene);
    if (VE_ExpressionParsing.errors.length > 0) {
      error_info.isRight = false;
      error_info.message = VE_Expressions.errorMessage(VE_ExpressionParsing.errors);
    }
    return sceneExp;
  }

  // 创建全局变量
  public static createGlobalExpression(name_id: string, expression_str: string, project_name: string, error_info: ErrorInfo): IExpression {
    let globalExp: IExpression = VE_ExpressionParsing.parsing(name_id, expression_str, VE_Expressions._scope, project_name, '', '', VariableScope.Global);
    if (VE_ExpressionParsing.errors.length > 0) {
      error_info.isRight = false;
      error_info.message = VE_Expressions.errorMessage(VE_ExpressionParsing.errors);
    }
    return globalExp;
  }

  // 创建局部变量
  public static createLocalExpression(name_id: string, expression_str: string, project_name: string, object_id: string, error_info: ErrorInfo): IExpression {
    let localExp: IExpression = VE_ExpressionParsing.parsing(name_id, expression_str, VE_Expressions._scope, project_name, object_id, '', VariableScope.Local);
    if (VE_ExpressionParsing.errors.length > 0) {
      error_info.isRight = false;
      error_info.message = VE_Expressions.errorMessage(VE_ExpressionParsing.errors);
    }
    return localExp;
  }

  // 创建状态变量
  public static createFsmExpression(name_id: string, expression_str: string, project_name: string, object_id: string, fsm_id: string, error_info: ErrorInfo): IExpression {
    let fsmExp: IExpression = VE_ExpressionParsing.parsing(name_id, expression_str, VE_Expressions._scope, project_name, object_id, fsm_id, VariableScope.Fsm);
    if (VE_ExpressionParsing.errors.length > 0) {
      error_info.isRight = false;
      error_info.message = VE_Expressions.errorMessage(VE_ExpressionParsing.errors);
    }
    return fsmExp;
  }


  // 公式中不允许引用模板变量
  public static getParseExpression(project_name: string, object_id: string, var_id: string, var_scope: VariableScope): Nullable<IExpression> {
    // TODO: 暂时先不考虑模板
    // 对象.*变量
    if (var_id.indexOf(StateConst.STATE_SEPARATOR) > -1) {
      let varArray: string[] = var_id.split(StateConst.STATE_SEPARATOR);
      if (varArray.length !== 2) {
        return null;
      } else {
        object_id = varArray[0].trim();
        var_id = varArray[1].trim().substring(1);
        if (var_scope === VariableScope.Local || var_scope === VariableScope.Fsm) {
          // 场景变量 + 项目全局变量 + 对象局部变量 + 对象状态值
          // 1. 查找对象局部变量
          // 2. 查找对象状态值
          // 3. 查找项目全局变量
          // 4. 查找场景变量
          let objects: VE_Objects = VE_Manager.objects(project_name);
          if (!objects) {
            return null;
          } else {
            let veryObject: VeryEngineObject = objects.getVeryObject(object_id);
            if (!veryObject) {
              return null;
            } else {
              // 局部变量，一般变量
              if (veryObject.isCreatedVariable(var_id)) {
                let v: IVeryVar = veryObject.getVariable(var_id);
                return new VeryVarExpression(v);
              }
              // 局部变量，公式
              else if (veryObject.isCreatedExpression(var_id)) {
                return veryObject.getExpression(var_id);
              }
              // 局部状态变量
              else if (veryObject.isCreatedFsm(var_id)) {
                let v: IVeryVar = veryObject.getFsm(var_id).fsmVar;
                return new VeryVarExpression(v);
              }
              else {
                // 全局变量
                return null;
              }
            }
          }
        } else {
          return null;
        }
      }
    }
    // *变量
    else {
      if (var_id.startsWith(StateConst.VARIABLE_SYMBOL)) {
        var_id = var_id.substring(1);
        if (var_scope === VariableScope.Local || var_scope === VariableScope.Fsm) {
          // 场景变量 + 项目全局变量 + 对象局部变量 + 对象状态值
          // 1. 查找对象局部变量
          // 2. 查找对象状态值
          // 3. 查找项目全局变量
          // 4. 查找场景变量
          let objects: VE_Objects = VE_Manager.objects(project_name);
          if (!objects) {
            return null;
          } else {
            let veryObject: VeryEngineObject = objects.getVeryObject(object_id);
            if (!veryObject) {
              return null;
            } else {
              //局部变量，一般变量
              if (veryObject.isCreatedVariable(var_id)) {
                let v: IVeryVar = veryObject.getVariable(var_id);
                return new VeryVarExpression(v);
              }
              //局部变量，公式
              else if (veryObject.isCreatedExpression(var_id)) {
                return veryObject.getExpression(var_id);
              }
              //局部状态变量
              else if (veryObject.isCreatedFsm(var_id)) {
                let v: IVeryVar = veryObject.getFsm(var_id).fsmVar;
                return new VeryVarExpression(v);
              }
              else {
                //全局变量
                return this.getParseGlobal(project_name, var_id);
              }
            }
          }
        } else if (var_scope === VariableScope.Global) {
          // 全局变量
          return this.getParseGlobal(project_name, var_id);
        } else {
          // 场景变量
          return this.getParseScene(var_id);
        }
      } else {
        return null;
      }
    }
  }

  private static getParseGlobal(project_name: string, var_id: string): Nullable<IExpression> {
    // 全局变量
    let variables: VE_Variables = VE_Manager.variables(project_name);
    if (!variables) {
      return null;
    } else {
      if (variables.isCreatedVariable(var_id)) {
        let v: IVeryVar = variables.getVariable(var_id);
        return new VeryVarExpression(v);
      } else if (variables.isCreatedExpression(var_id)) {
        return variables.getExpression(var_id);
      } else {
        // 场景变量
        return this.getParseScene(var_id);
      }
    }
  }

  // 获取场景变量
  private static getParseScene(var_id: string): Nullable<IExpression> {
    // 场景变量
    if (VerySceneVariables.Variables.isCreated(var_id)) {
      let v: IVeryVar = VerySceneVariables.Variables.getVariable(var_id);
      return new VeryVarExpression(v);
    } else if (VerySceneVariables.Variables.isCreatedExpression(var_id)) {
      return VerySceneVariables.Variables.getExpression(var_id);
    } else {
      return null;
    }
  }

  private static errorMessage(errors: ParseError[]): string {
    let errorStr: string = '';
    for (let i: number = 0; i < errors.length; i++) {
      errorStr += `\n(${(i+1)}) ${errors[i].getMessage()} ;`;
    }
    errorStr += '\n';
    return errorStr;
  }


  public static getTemplateExpression(project_name: string, object_id: string, var_id: string, var_scope: VariableScope): Nullable<VeryTemplateExpression> {
    // 对象.*变量
    if (var_id.indexOf(StateConst.STATE_SEPARATOR) > -1) {
      let varArray: string[] = var_id.split(StateConst.STATE_SEPARATOR);
      if (varArray.length !== 2) {
        //error_info = "当前变量格式应为“对象名.*变量”，当前变量ID为：" + var_id + "，不符合，请检查！";
        return null;
      }
      else {
        object_id = varArray[0].trim();
        var_id = varArray[1].trim().substring(1);
        if (var_scope === VariableScope.Local || var_scope === VariableScope.Fsm) {
          let objects: VE_Objects = VE_Manager.objects(project_name);
          if (!objects) {
            return null;
          }
          else {
            let veryObject: VeryEngineObject = objects.getVeryObject(object_id);
            if (!veryObject) {
              return null;
            }
            else {
              // 局部变量，一般变量
              if (veryObject.isCreatedTemplate(var_id)) {
                let template: VE_Template = veryObject.getTemplate(var_id);
                let r = new VeryTemplateExpression();
                r.setTemplate(template);
                return r;
              }
              else {
                // 全局变量
                return null;
              }
            }
          }
        }
        else {
          return null;
        }
      }
    }
    else {
      // *变量
      if (var_id.startsWith(StateConst.VARIABLE_SYMBOL)) {
        var_id = var_id.substring(1);
        if (var_scope === VariableScope.Local || var_scope === VariableScope.Fsm) {
          let objects: VE_Objects = VE_Manager.objects(project_name);
          if (!objects) {
            return null;
          }
          else {
            let veryObject: VeryEngineObject = objects.getVeryObject(object_id);
            if (!veryObject) {
              return null;
            }
            else {
              // 局部变量，一般变量
              if (veryObject.isCreatedTemplate(var_id)) {
                let template: VE_Template = veryObject.getTemplate(var_id);
                let r: VeryTemplateExpression = new VeryTemplateExpression();
                r.setTemplate(template);
                return r;
              }
              else {
                // 全局变量
                let variables: VE_Variables = VE_Manager.variables(project_name);
                if (!variables) {
                  return null;
                }
                else {
                  if (variables.isCreatedTemplate(var_id)) {
                    let template: VE_Template = variables.getTemplate(var_id);
                    let r: VeryTemplateExpression = new VeryTemplateExpression();
                    r.setTemplate(template);
                    return r;
                  }
                  else {
                    // 场景变量
                    return null;
                  }
                }
              }
            }
          }
        }
        else if (var_scope === VariableScope.Global) {
          // 全局变量
          let variables: VE_Variables = VE_Manager.variables(project_name);
          if (!variables) {
            return null;
          }
          else {
            if (variables.isCreatedTemplate(var_id)) {
              let template: VE_Template = variables.getTemplate(var_id);
              let r: VeryTemplateExpression = new VeryTemplateExpression();
              r.setTemplate(template);
              return r;
            }
            else {
              //场景变量
              return null;
            }
          }
        }
        else {
          return null;
        }
      }
      else {
        return null;
      }
    }
  }

}


