import { ParaType, Severity } from "../enum";
import { VE_ErrorManager, VE_Error } from "../global";
import { VeryGameObject, VeryVarManager, VarTools, IVeryVar, VeryString, VeryExpression, VeryNumber, VeryBool, VeryVector3 } from "../variables";
import { ErrorInfo } from "./errorInfo";
import { VE_Template } from "../template";
import { VE_Manager } from "../manager";
import { GameObject } from "../babylon";
import { VeryEngineObject } from "../object";
import { VE_TypeConvert } from "./typeConvert";
import { VeryParas } from "./veryParas";

export class ParaParserUtility {

  /**
   * 参数个数判断；
   * @param id 响应或触发类型；
   * @param para_type 响应或者触发；
   * @param current_number 当前参数个数；
   * @param required_number 期望参数个数；
   */
  public static ParaNumbers(id: string, para_type: ParaType, current_number: number, ...required_number: number[]): boolean {
    for (let i: number = 0; i < required_number.length; i++) {
      if (required_number[i] === current_number) {
        return true;
      }
    }
    let requiredStr: string = "";
    for (let i: number = 0; i < required_number.length; i++) {
      if (i === 0) {
        requiredStr += (required_number[i] + 1).toString() + "个";
      }
      else {
        requiredStr += "或者" + (required_number[i] + 1).toString() + "个";
      }
    }
    if (para_type === ParaType.Action) {

      VE_ErrorManager.Add(new VE_Error('', id + " 响应 需要" + requiredStr + "传入参数，当前参数个数为" + (current_number + 1) + "个，请检查！", '', Severity.Error));
    }
    else {
      VE_ErrorManager.Add(new VE_Error('', id + " 触发 需要" + requiredStr + "传入参数，当前参数个数为" + (current_number + 1) + "个，请检查！", '', Severity.Error));
    }
    return false;
  }

  /**
   * 解析VeryGameObject变量；
   * @param project_name 项目名；
   * @param object_id 对象名；
   * @param id 变量ID；
   * @param para_type 响应或者触发；
   * @param very_var 待解析变量；
   * @param var_str 原始字符串；
   * @param log 是否打印错误信息；
   * 返回是否解析正确；
   */
  public static GameObjectPara(project_name: string, object_id: string, id: string, para_type: ParaType, paras: VeryParas, var_str: string, log: boolean = true): boolean {
    if (VarTools.IsVarID(var_str)) {
      let errorInfo: ErrorInfo = new ErrorInfo();
      let veryVar: Nullable<IVeryVar> = VarTools.GetVeryVar(project_name, object_id, var_str, errorInfo);
      if (veryVar === null) {
        // 查找Template
        errorInfo.clear();
        let template: Nullable<VE_Template> = VarTools.GetTemplate(project_name, object_id, var_str, errorInfo);
        if (template === null) {
          if (log) {
            VE_ErrorManager.Add(new VE_Error('', `${id}  ${para_type === ParaType.Action ? '响应' : '触发'} 传入参数错误，当前系统中无法查找到该变量：${var_str}，请检查！`, '', Severity.Error));
          }
          return false;
        }
        else {
          if (template.templateInstance === null) {
            if (log) {
              VE_ErrorManager.Add(new VE_Error('', `${id}  ${para_type === ParaType.Action ? '响应' : '触发'} 传入参数错误，传入参数为模板变量：${var_str}，当前模板变量未实例化，无法获取GameObject，请检查！`, '', Severity.Error));
            }
            return false;
          }
          else {
            paras.gameObject.value = template.templateInstance.gameObject;
            return true;
          }
        }
      }
      else if (veryVar.className === 'VeryGameObject') {
        paras.gameObject = <VeryGameObject>veryVar;
        return true;
      }
      else if (veryVar.className === 'VeryString') {
        let vString: VeryString = <VeryString>veryVar;
        paras.gameObject.value = GameObject.Find(vString.value);
        if (paras.gameObject.value === null) {
          if (log) {
            VE_ErrorManager.Add(new VE_Error('', `${id}  ${para_type === ParaType.Action ? '响应' : '触发'} 传入参数错误，物体：${vString.value}，无法在场景中查找到，请检查！`, '', Severity.Error));
          }
          return false;
        }
        return true;
      }
      else {
        if (log) {
          VE_ErrorManager.Add(new VE_Error('', `${id}  ${para_type === ParaType.Action ? '响应' : '触发'} 传入参数错误，变量：${var_str}，应为GameObject变量，请检查！`, '', Severity.Error));
        }
        return false;
      }
    }
    else {
      if (var_str.toLowerCase().trim() === "this") {
        let veryObject: VeryEngineObject = VE_Manager.objects(project_name).getVeryObject(object_id);
        if (veryObject === null) {
          if (log) {
            VE_ErrorManager.Add(new VE_Error('', `${id}  ${para_type === ParaType.Action ? '响应' : '触发'} 传入参数错误，当前响应所在对象 ：${object_id}，无法在场景中查找到，请检查！`, '', Severity.Error));
          }
          return false;
        }
        else {
          paras.gameObject.value = veryObject.gameObject;
        }
      }
      else if (var_str.toLowerCase().trim() === "null" || var_str.toLowerCase().trim() === "none" || var_str.toLowerCase().trim() === "") {
        paras.gameObject.value = null;
      }
      else if (var_str.startsWith("/")) {
        let veryObject: VeryEngineObject = VE_Manager.objects(project_name).getVeryObject(object_id);
        if (!veryObject) {
          if (log) {
            VE_ErrorManager.Add(new VE_Error('', `${id}  ${para_type === ParaType.Action ? '响应' : '触发'} 传入参数错误，当前响应所在对象 ：${object_id}，无法在场景中查找到，请检查！`, '', Severity.Error));
          }
          return false;
        }
        else {
          let parentObj: GameObject = veryObject.gameObject;
          let childName: string = var_str.substring(1).trim();
          // TODO: 查询子物体
          // very_var.value = GameObject.FindChild(parentObj, childName);
          if (paras.gameObject.value === null) {
            if (log) {
              VE_ErrorManager.Add(new VE_Error('', `${id}  ${para_type === ParaType.Action ? '响应' : '触发'} 传入参数错误，对象名：${object_id}，物体：${var_str}，该子物体无法在当前对象中查找到，请检查！`, '', Severity.Error));
            }
            return false;
          }
          return true;
        }
      }
      else {
        paras.gameObject.value = GameObject.Find(var_str);
        if (paras.gameObject.value === null) {
          if (log) {
            VE_ErrorManager.Add(new VE_Error('', `${id}  ${para_type === ParaType.Action ? '响应' : '触发'} 传入参数错误，物体 ：${object_id}，无法在场景中查找到，请检查！`, '', Severity.Error));
          }
          return false;
        }
      }
      return true;
    }
  }

  public static GameObjectParaOnlyVar(project_name: string, object_id: string, id: string, para_type: ParaType, paras: VeryParas, var_str: string, log: boolean = true): boolean {
    if (VarTools.IsVarID(var_str)) {
      let errorInfo: ErrorInfo = new ErrorInfo();
      let veryVar: Nullable<IVeryVar> = VarTools.GetVeryVar(project_name, object_id, var_str, errorInfo);
      if (veryVar === null) {
        if (log) {
          VE_ErrorManager.Add(new VE_Error('', `${id}  ${para_type === ParaType.Action ? '响应' : '触发'} 传入参数错误，变量：${var_str}，只能为GameObject变量，不能为常量，也不能是模板变量，请检查！`, '', Severity.Error));
        }
        return false;
      }
      else if (veryVar.className === 'VeryGameObject') {
        paras.gameObject = <VeryGameObject>veryVar;
        return true;
      }
      else {
        if (log) {
          VE_ErrorManager.Add(new VE_Error('', `${id}  ${para_type === ParaType.Action ? '响应' : '触发'} 传入参数错误，变量：${var_str}，应为GameObject变量，请检查！`, '', Severity.Error));
        }
        return false;
      }
    }
    else {
      if (log) {
        VE_ErrorManager.Add(new VE_Error('', `${id}  ${para_type === ParaType.Action ? '响应' : '触发'} 传入参数错误，变量：${var_str}，应为GameObject变量，不能为常量，请检查！`, '', Severity.Error));
      }
      return false;
    }
  }

  public static StringPara(project_name: string, object_id: string, id: string, para_type: ParaType, paras: VeryParas, var_str: string, log: boolean = true): boolean {
    if (VarTools.IsVarID(var_str)) {
      return ParaParserUtility.StringParaOnlyVar(project_name, object_id, id, para_type, paras, var_str, log);
    }
    else {
      paras.string.value = var_str;
      return true;
    }
  }

  public static StringParaWithExpression(project_name: string, object_id: string, id: string, para_type: ParaType, paras: VeryParas, var_str: string, log: boolean = true): boolean {
    if (VarTools.IsVarID(var_str)) {
      let errorInfo: ErrorInfo = new ErrorInfo();
      let veryVar: Nullable<IVeryVar> = VarTools.GetVeryVarWithExpression(project_name, object_id, var_str, errorInfo);
      if (veryVar === null) {
        if (log) {
          VE_ErrorManager.Add(new VE_Error('', `${id}  ${para_type === ParaType.Action ? '响应' : '触发'} 传入参数错误，变量：${var_str}，${errorInfo.message}`, '', Severity.Error));
        }
        return false;
      }
      else if (veryVar.className === 'VeryString') {
        paras.string = <VeryString>veryVar;
        return true;
      }
      else if (veryVar.className === 'VeryExpression') {
        if (veryVar.varType === 'string') {
          paras.string.setExpression(<VeryExpression>veryVar);
          return true;
        }
        else {
          if (log) {
            VE_ErrorManager.Add(new VE_Error('', `${id}  ${para_type === ParaType.Action ? '响应' : '触发'} 传入参数错误，变量：${var_str}，该公式变量计算结果不为String，请检查！`, '', Severity.Error));
          }
          return false;
        }
      }
      else {
        if (log) {
          VE_ErrorManager.Add(new VE_Error('', `${id}  ${para_type === ParaType.Action ? '响应' : '触发'} 传入参数错误，变量：${var_str}，应为String变量，请检查！`, '', Severity.Error));
        }
      }
      return false;
    }
    else {
      paras.string.value = var_str;
      return true;
    }
  }


  public static StringParaOnlyVar(project_name: string, object_id: string, id: string, para_type: ParaType, paras: VeryParas, var_str: string, log: boolean = true): boolean {
    if (VarTools.IsVarID(var_str)) {
      let errorInfo: ErrorInfo = new ErrorInfo();
      let veryVar: Nullable<IVeryVar> = VarTools.GetVeryVar(project_name, object_id, var_str, errorInfo);
      if (veryVar === null) {
        if (log) {
          VE_ErrorManager.Add(new VE_Error('', `${id}  ${para_type === ParaType.Action ? '响应' : '触发'} 传入参数错误，变量：${var_str}，${errorInfo.message}`, '', Severity.Error));
        }
        return false;
      }
      else if (veryVar.className === 'VeryString') {
        paras.string = <VeryString>veryVar;
        return true;
      }
      else {
        if (log) {
          VE_ErrorManager.Add(new VE_Error('', `${id}  ${para_type === ParaType.Action ? '响应' : '触发'} 传入参数错误，变量：${var_str}，应为String变量，请检查！`, '', Severity.Error));
        }
        return false;
      }
    }
    else {
      if (log) {
        VE_ErrorManager.Add(new VE_Error('', `${id}  ${para_type === ParaType.Action ? '响应' : '触发'} 传入参数错误，变量：${var_str}，应为String变量，不能为常量，请检查！`, '', Severity.Error));
      }
      return false;
    }
  }


  public static NumberPara(project_name: string, object_id: string, id: string, para_type: ParaType, paras: VeryParas, var_str: string, log: boolean = true): boolean {
    if (VarTools.IsVarID(var_str)) {
      return ParaParserUtility.NumberParaOnlyVar(project_name, object_id, id, para_type, paras, var_str, log);
    }
    else {
      paras.number.value = parseFloat(var_str);
      if (isNaN(paras.number.value)) {
        VE_ErrorManager.Add(new VE_Error('', `${id}  ${para_type === ParaType.Action ? '响应' : '触发'} 传入参数错误，变量：${var_str}，应为number数字常量，请检查！`, '', Severity.Error));
        return false;
      }
    }
    return true;
  }

  public static NumberParaWithExpression(project_name: string, object_id: string, id: string, para_type: ParaType, paras: VeryParas, var_str: string, log: boolean = true): boolean {
    if (VarTools.IsVarID(var_str)) {
      let errorInfo: ErrorInfo = new ErrorInfo();
      let veryVar: Nullable<IVeryVar> = VarTools.GetVeryVarWithExpression(project_name, object_id, var_str, errorInfo);
      if (veryVar === null) {
        if (log) {
          VE_ErrorManager.Add(new VE_Error('', `${id}  ${para_type === ParaType.Action ? '响应' : '触发'} 传入参数错误，变量：${var_str}，${errorInfo.message}`, '', Severity.Error));
        }
        return false;
      }
      else if (veryVar.className === 'VeryNumber') {
        paras.number = <VeryNumber>veryVar;
        return true;
      }
      else if (veryVar.className === 'VeryExpression') {
        if (veryVar.varType === 'number') {
          paras.number.setExpression(<VeryExpression>veryVar);
          return true;
        }
        else {
          if (log) {
            VE_ErrorManager.Add(new VE_Error('', `${id}  ${para_type === ParaType.Action ? '响应' : '触发'} 传入参数错误，变量：${var_str}，该公式变量计算结果不为number数字，请检查！`, '', Severity.Error));
          }
          return false;
        }
      }
      else {
        if (log) {
          VE_ErrorManager.Add(new VE_Error('', `${id}  ${para_type === ParaType.Action ? '响应' : '触发'} 传入参数错误，变量：${var_str}，应为number数字变量，请检查，请检查！`, '', Severity.Error));
        }
        return false;
      }
    }
    else {
      paras.number.value = parseFloat(var_str);
      if (isNaN(paras.number.value)) {
        VE_ErrorManager.Add(new VE_Error('', `${id}  ${para_type === ParaType.Action ? '响应' : '触发'} 传入参数错误，变量：${var_str}，应为number数字常量，请检查！`, '', Severity.Error));
        return false;
      }
      return true;
    }
  }

  public static NumberParaOnlyVar(project_name: string, object_id: string, id: string, para_type: ParaType, paras: VeryParas, var_str: string, log: boolean = true): boolean {
    if (VarTools.IsVarID(var_str)) {
      let errorInfo: ErrorInfo = new ErrorInfo();
      let veryVar: Nullable<IVeryVar> = VarTools.GetVeryVar(project_name, object_id, var_str, errorInfo);
      if (veryVar === null) {
        VE_ErrorManager.Add(new VE_Error('', `${id}  ${para_type === ParaType.Action ? '响应' : '触发'} 传入参数错误，变量：${var_str}，${errorInfo.message}`, '', Severity.Error));
        return false;
      }
      else if (veryVar.className === 'VeryNumber') {
        paras.number = <VeryNumber>veryVar;
        return true;
      }
      else {
        if (log) {
          VE_ErrorManager.Add(new VE_Error('', `${id}  ${para_type === ParaType.Action ? '响应' : '触发'} 传入参数错误，变量：${var_str}，应为number数字变量，请检查！`, '', Severity.Error));
        }
        return false;
      }
    }
    else {
      if (log) {
        VE_ErrorManager.Add(new VE_Error('', `${id}  ${para_type === ParaType.Action ? '响应' : '触发'} 传入参数错误，变量：${var_str}，应为number数字变量，不能为常量，请检查！`, '', Severity.Error));
      }
      return false;
    }
  }


  public static BoolPara(project_name: string, object_id: string, id: string, para_type: ParaType, paras: VeryParas, var_str: string, log: boolean = true): boolean {
    if (VarTools.IsVarID(var_str)) {
      return ParaParserUtility.BoolParaOnlyVar(project_name, object_id, id, para_type, paras, var_str, log);
    }
    else {
      let errorInfo: ErrorInfo = new ErrorInfo();
      paras.bool.value = VE_TypeConvert.boolConvert(var_str, errorInfo);
      if (errorInfo.isRight === false) {
        VE_ErrorManager.Add(new VE_Error('', `${id}  ${para_type === ParaType.Action ? '响应' : '触发'} 传入参数错误，变量：${var_str}，应为bool常量，请检查！`, '', Severity.Error));
        return false;
      }
      return true;
    }
  }


  public static BoolParaWithExpression(project_name: string, object_id: string, id: string, para_type: ParaType, paras: VeryParas, var_str: string, log: boolean = true) {
    if (VarTools.IsVarID(var_str)) {
      let errorInfo: ErrorInfo = new ErrorInfo();
      let veryVar: Nullable<IVeryVar> = VarTools.GetVeryVar(project_name, object_id, var_str, errorInfo);
      if (veryVar === null) {
        if (log) {
          VE_ErrorManager.Add(new VE_Error('', `${id}  ${para_type === ParaType.Action ? '响应' : '触发'} 传入参数错误，变量：${var_str}，${errorInfo.message}`, '', Severity.Error));
        }
        return false;
      }
      else if (veryVar.className === 'VeryBool') {
        paras.bool = <VeryBool>veryVar;
        return true;
      }
      else if (veryVar.className === 'VeryExpression') {
        if (veryVar.varType === 'bool') {
          paras.bool.setExpression(<VeryExpression>veryVar);
          return true;
        }
        else {
          if (log) {
            VE_ErrorManager.Add(new VE_Error('', `${id}  ${para_type === ParaType.Action ? '响应' : '触发'} 传入参数错误，变量：${var_str}，该公式变量计算结果不为bool，请检查！`, '', Severity.Error));
          }
          return false;
        }
      }
      else {
        if (log) {
          VE_ErrorManager.Add(new VE_Error('', `${id}  ${para_type === ParaType.Action ? '响应' : '触发'} 传入参数错误，变量：${var_str}，应为bool变量，请检查！`, '', Severity.Error));
        }
        return false;
      }
    }
    else {
      let errorInfo: ErrorInfo = new ErrorInfo();
      paras.bool.value = VE_TypeConvert.boolConvert(var_str, errorInfo);
      if (errorInfo.isRight === false) {
        VE_ErrorManager.Add(new VE_Error('', `${id}  ${para_type === ParaType.Action ? '响应' : '触发'} 传入参数错误，变量：${var_str}，应为bool常量，请检查！`, '', Severity.Error));
        return false;
      }
      return true;
    }
  }

  public static BoolParaOnlyVar(project_name: string, object_id: string, id: string, para_type: ParaType, paras: VeryParas, var_str: string, log: boolean = true): boolean {
    if (VarTools.IsVarID(var_str)) {
      let errorInfo: ErrorInfo = new ErrorInfo();
      let veryVar: Nullable<IVeryVar> = VarTools.GetVeryVar(project_name, object_id, var_str, errorInfo);
      if (veryVar === null) {
        if (log) {
          VE_ErrorManager.Add(new VE_Error('', `${id}  ${para_type === ParaType.Action ? '响应' : '触发'} 传入参数错误，变量：${var_str}，${errorInfo.message}`, '', Severity.Error));
        }
        return false;
      }
      else if (veryVar.className === 'VeryBool') {
        paras.bool = <VeryBool>veryVar;
        return true;
      }
      else {
        if (log) {
          VE_ErrorManager.Add(new VE_Error('', `${id}  ${para_type === ParaType.Action ? '响应' : '触发'} 传入参数错误，变量：${var_str}，应为bool常量，请检查！`, '', Severity.Error));
        }
        return false;
      }
    }
    else {
      if (log) {
        VE_ErrorManager.Add(new VE_Error('', `${id}  ${para_type === ParaType.Action ? '响应' : '触发'} 传入参数错误，变量：${var_str}，应为bool变量，不能为常量，请检查！`, '', Severity.Error));
      }
      return false;
    }
  }


  public static Vector3Para(project_name: string, object_id: string, id: string, para_type: ParaType, paras: VeryParas, var_str: string, log: boolean = true): boolean {
    if (VarTools.IsVarID(var_str)) {
      let errorInfo: ErrorInfo = new ErrorInfo();
      let veryVar: Nullable<IVeryVar> = VarTools.GetVeryVar(project_name, object_id, var_str, errorInfo);
      if (veryVar === null) {
        if (log) {
          VE_ErrorManager.Add(new VE_Error('', `${id}  ${para_type === ParaType.Action ? '响应' : '触发'} 传入参数错误，变量：${var_str}，${errorInfo.message}`, '', Severity.Error));
        }
        return false;
      }
      else if (veryVar.className === 'VeryVector3') {
        paras.vector3 = <VeryVector3>veryVar;
        return true;
      }
      else {
        if (log) {
          VE_ErrorManager.Add(new VE_Error('', `${id}  ${para_type === ParaType.Action ? '响应' : '触发'} 传入参数错误，变量：${var_str}，应为Vector3向量变量，请检查！`, '', Severity.Error));
        }
        return false;
      }
    }
    else {
      if (log) {
        VE_ErrorManager.Add(new VE_Error('', `${id}  ${para_type === ParaType.Action ? '响应' : '触发'} 传入参数错误，变量：${var_str}，应为Vector3向量变量，当前为常量字符串，请检查！`, '', Severity.Error));
      }
      return false;
    }
  }

  public static Vector3OrNumberPara(project_name: string, object_id: string, id: string, para_type: ParaType, paras: VeryParas, var_str: string, log: boolean = true): boolean {
    if (var_str.indexOf(",") > -1 || var_str.indexOf("，") > -1) {
      paras.isVec = false;
      let floatsArray: string[] = var_str.split(/,|，/);
      if (floatsArray.length === 3) {
        if (!this.privateNumberPara(project_name, object_id, id, para_type, paras, floatsArray[0].trim(), 0, log)) {
          return false;
        }
        if (!this.privateNumberPara(project_name, object_id, id, para_type, paras, floatsArray[1].trim(), 1, log)) {
          return false;
        }
        if (!this.privateNumberPara(project_name, object_id, id, para_type, paras, floatsArray[2].trim(), 2, log)) {
          return false;
        }
        return true;
      }
      else {
        if (log) {
          VE_ErrorManager.Add(new VE_Error('', `${id}  ${para_type === ParaType.Action ? '响应' : '触发'} 传入参数错误，变量：${var_str}，应为“（数字1, 数字2, 数字3）”格式的数字number变量，当前参数个数不符合，请检查！`, '', Severity.Error));
        }
        return false;
      }
    }
    else {
      paras.isVec = true;
      return this.Vector3Para(project_name, object_id, id, para_type, paras, var_str, log);
    }
  }


  public static Vector3ParaWithExpression(project_name: string, object_id: string, id: string, para_type: ParaType, paras: VeryParas, var_str: string, log: boolean = true): boolean {
    if (VarTools.IsVarID(var_str)) {
      let errorInfo: ErrorInfo = new ErrorInfo();
      let veryVar: Nullable<IVeryVar> = VarTools.GetVeryVarWithExpression(project_name, object_id, var_str, errorInfo);
      if (veryVar === null) {
        if (log) {
          VE_ErrorManager.Add(new VE_Error('', `${id}  ${para_type === ParaType.Action ? '响应' : '触发'} 传入参数错误，变量：${var_str}，${errorInfo.message}`, '', Severity.Error));
        }
        return false;
      }
      else if (veryVar.className === 'VeryVector3') {
        paras.vector3 = <VeryVector3>veryVar;
        return true;
      }
      else if (veryVar.className === 'VeryExpression') {
        if (veryVar.varType === 'Vector3') {
          paras.vector3.setExpression(<VeryExpression>veryVar);
          return true;
        }
        else {
          if (log) {
            VE_ErrorManager.Add(new VE_Error('', `${id}  ${para_type === ParaType.Action ? '响应' : '触发'} 传入参数错误，变量：${var_str}，该公式变量计算结果不为Vector3，请检查！`, '', Severity.Error));
          }
          return false;
        }
      }
      else {
        if (log) {
          VE_ErrorManager.Add(new VE_Error('', `${id}  ${para_type === ParaType.Action ? '响应' : '触发'} 传入参数错误，变量：${var_str}，应为Vector3变量，请检查！`, '', Severity.Error));
        }
        return false;
      }
    }
    else {
      if (log) {
        VE_ErrorManager.Add(new VE_Error('', `${id}  ${para_type === ParaType.Action ? '响应' : '触发'} 传入参数错误，变量：${var_str}，应为Vector3变量，当前为常量字符串，请检查！`, '', Severity.Error));
      }
      return false;
    }
  }

  public static Vector3OrNumberParaWithExpression(project_name: string, object_id: string, id: string, para_type: ParaType, paras: VeryParas, var_str: string, log: boolean = true): boolean {
    if (var_str.indexOf(",") > -1 || var_str.indexOf("，") > -1) {
      paras.isVec = false;
      let floatsArray: string[] = var_str.split(/,|，/);
      if (floatsArray.length === 3) {
        if (!this.privateNumberParaWithExpression(project_name, object_id, id, para_type, paras, floatsArray[0].trim(), 0, log)) {
          return false;
        }
        if (!this.privateNumberParaWithExpression(project_name, object_id, id, para_type, paras, floatsArray[1].trim(), 1, log)) {
          return false;
        }
        if (!this.privateNumberParaWithExpression(project_name, object_id, id, para_type, paras, floatsArray[2].trim(), 2, log)) {
          return false;
        }
        return true;
      }
      else {
        if (log) {
          VE_ErrorManager.Add(new VE_Error('', `${id}  ${para_type === ParaType.Action ? '响应' : '触发'} 传入参数错误，变量：${var_str}，应为“（数字1, 数字2, 数字3）”格式的Vector3变量，当前参数个数不符合，请检查！`, '', Severity.Error));
        }
        return false;
      }
    }
    else {
      paras.isVec = true;
      return this.Vector3ParaWithExpression(project_name, object_id, id, para_type, paras, var_str, log);
    }
  }

  private static privateNumberParaWithExpression(project_name: string, object_id: string, id: string, para_type: ParaType, paras: VeryParas, var_str: string, index: number, log: boolean = true): boolean {
    if (VarTools.IsVarID(var_str)) {
      let errorInfo: ErrorInfo = new ErrorInfo();
      let veryVar: Nullable<IVeryVar> = VarTools.GetVeryVarWithExpression(project_name, object_id, var_str, errorInfo);
      if (veryVar === null) {
        if (log) {
          VE_ErrorManager.Add(new VE_Error('', `${id}  ${para_type === ParaType.Action ? '响应' : '触发'} 传入参数错误，变量：${var_str}，${errorInfo.message}`, '', Severity.Error));
        }
        return false;
      }
      else if (veryVar.className === 'VeryNumber') {
        paras.vecNumbers[index] = <VeryNumber>veryVar;
        return true;
      }
      else if (veryVar.className === 'VeryExpression') {
        if (veryVar.varType === 'number') {
          paras.vecNumbers[index].setExpression(<VeryExpression>veryVar);
          return true;
        }
        else {
          if (log) {
            VE_ErrorManager.Add(new VE_Error('', `${id}  ${para_type === ParaType.Action ? '响应' : '触发'} 传入参数错误，变量：${var_str}，该公式变量计算结果不为number数字，请检查！`, '', Severity.Error));
          }
          return false;
        }
      }
      else {
        if (log) {
          VE_ErrorManager.Add(new VE_Error('', `${id}  ${para_type === ParaType.Action ? '响应' : '触发'} 传入参数错误，变量：${var_str}，应为number数字变量，请检查，请检查！`, '', Severity.Error));
        }
        return false;
      }
    }
    else {
      paras.vecNumbers[index].value = parseFloat(var_str);
      if (isNaN(paras.vecNumbers[index].value)) {
        VE_ErrorManager.Add(new VE_Error('', `${id}  ${para_type === ParaType.Action ? '响应' : '触发'} 传入参数错误，变量：${var_str}，应为number数字常量，请检查！`, '', Severity.Error));
        return false;
      }
      return true;
    }
  }

  private static privateNumberPara(project_name: string, object_id: string, id: string, para_type: ParaType, paras: VeryParas, var_str: string, index: number, log: boolean = true): boolean {
    if (VarTools.IsVarID(var_str)) {
      return ParaParserUtility.privateNumberParaOnlyVar(project_name, object_id, id, para_type, paras, var_str, index, log);
    }
    else {
      paras.vecNumbers[index].value = parseFloat(var_str);
      if (isNaN(paras.vecNumbers[index].value)) {
        VE_ErrorManager.Add(new VE_Error('', `${id}  ${para_type === ParaType.Action ? '响应' : '触发'} 传入参数错误，变量：${var_str}，应为number数字常量，请检查！`, '', Severity.Error));
        return false;
      }
    }
    return true;
  }

  private static privateNumberParaOnlyVar(project_name: string, object_id: string, id: string, para_type: ParaType, paras: VeryParas, var_str: string, index: number, log: boolean = true): boolean {
    if (VarTools.IsVarID(var_str)) {
      let errorInfo: ErrorInfo = new ErrorInfo();
      let veryVar: Nullable<IVeryVar> = VarTools.GetVeryVar(project_name, object_id, var_str, errorInfo);
      if (veryVar === null) {
        VE_ErrorManager.Add(new VE_Error('', `${id}  ${para_type === ParaType.Action ? '响应' : '触发'} 传入参数错误，变量：${var_str}，${errorInfo.message}`, '', Severity.Error));
        return false;
      }
      else if (veryVar.className === 'VeryNumber') {
        paras.vecNumbers[index] = <VeryNumber>veryVar;
        return true;
      }
      else {
        if (log) {
          VE_ErrorManager.Add(new VE_Error('', `${id}  ${para_type === ParaType.Action ? '响应' : '触发'} 传入参数错误，变量：${var_str}，应为number数字变量，请检查！`, '', Severity.Error));
        }
        return false;
      }
    }
    else {
      if (log) {
        VE_ErrorManager.Add(new VE_Error('', `${id}  ${para_type === ParaType.Action ? '响应' : '触发'} 传入参数错误，变量：${var_str}，应为number数字变量，不能为常量，请检查！`, '', Severity.Error));
      }
      return false;
    }
  }


}