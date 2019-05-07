import { VE_Templates, VE_Template } from "../template";
import { VE_Manager } from "../manager";
import { VE_Objects } from "../object";
import { VE_Variables, VeryVarManager, IVeryVar } from "../variables";
import { ErrorInfo } from "../utility";
import { VE_ErrorManager, VE_Error } from "../global";

export class CreateInstance {





  public static createProject(project_name: string): boolean {
    let templates: VE_Templates = VE_Manager.templates(project_name);
    let objects: VE_Objects = VE_Manager.objects(project_name);
    let globalVars: VE_Variables = VE_Manager.variables(project_name);

    // 1. 全局变量——创建
    // (1).先初始化普通变量和模板
    for (let i: number = 0; i < globalVars.varData.count; i++) {
      let varID: string = globalVars.varData.getVariableID(i);
      let varPara: string[] = globalVars.varData.getVariableParas(varID);
      // 判断，1.普通变量；2.公式；3.模板变量；
      // 1.公式，等普通变量初始化完毕再处理
      if (varPara[0] === "公式" || varPara[0].toLowerCase() === "expression") {
        continue;
      }
      // 2.普通IVeryVar变量
      else if (VeryVarManager.hasVarType(varPara[0])) {
        let errorInfo: ErrorInfo = new ErrorInfo();
        let newVar: Nullable<IVeryVar> = VeryVarManager.createVariable(varID, varPara[0], varPara[1], errorInfo);
        // TODO: List或者Dictionary处理
        if (newVar === null) {
          VE_ErrorManager.add(VE_Error.error(globalVars.varData.getPos(varID), "项目：" + project_name + "，全局变量：" + varID + "，" + varPara[0] + "，" + varPara[1] + "，全局变量创建失败，失败原因：" + errorInfo.message + "，请检查！", ''));
          return false;
        } else {
          globalVars.addVariable(varID, newVar);
        }
      }
      // 3.模板变量
      else if (templates.isCreatedTemplate(varPara[0])) {
        globalVars.addTemplate(varID, templates.getTemplate(varPara[0]).clone('__global__', varID));
      }
      // 未知错误
      else {
        VE_ErrorManager.add(VE_Error.error(globalVars.varData.getPos(varID), "项目：" + project_name + "，全局变量：" + varID + "，" + varPara[0] + "，" + varPara[1] + "，全局变量创建失败，当前变量不存在，请检查！", ''));
        return false;
      }
    }

    // (2).再初始化公式
    for (let i: number = 0; i < globalVars.varData.count; i++) {
      let varID: string = globalVars.varData.getVariableID(i);
      let varPara: string[] = globalVars.varData.getVariableParas(varID);
      // 判断，公式；
      // 1.公式
      if (varPara[0] === "公式" || varPara[0].toLowerCase() === "expression") {
        // 公式之间以从前到后的解析顺序变异，若前面的公式引用了后面的公式，会直接报错
        let errorInfo: ErrorInfo = new ErrorInfo();

        // ExpressionTree globalExp = VE_Expressions.CreateGlobalExpression(varID, varPara[1], project_name, ref errorInfo);
        // if (globalExp == null) {
        //   VE_ErrorManager.Add(VE_Error.Error("", "项目：" + project_name + "，全局变量：" + varID + "," + varPara[0] + "," + varPara[1] + "，全局变量创建失败，公式创建错误：\n" + errorInfo, ""));
        //   return false;
        // }
        // globalVars.AddExpression(varID, globalExp);
      }
      else {
        continue;
      }
    }

    return true;
  }


  public static createInstance(project_name: string, object_id: string, var_id: string, template: VE_Template, object_name: string, error_info: ErrorInfo, destroy_on_create_new: boolean): VE_Template {


    return template;
  }


}