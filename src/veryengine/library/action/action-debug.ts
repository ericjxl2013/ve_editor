import { VE_ActionBehaviour, VE_Actions } from "../../action";
import { IVeryVar, VarTools } from "../../variables";
import { VE_Template } from "../../template";
import { ParaParserUtility, ErrorInfo } from "../../utility";
import { ParaType, Severity } from "../../enum";
import { VE_ErrorManager, VE_Error } from "../../global";

enum TypeVar { VeryVar, Template, Const };

export class Action_Debug extends VE_ActionBehaviour {

  public get ID(): string {
    return 'Debug|调试';
  };

  public get className(): string {
    return 'Action_Debug';
  };

  private _debugMode: number = 0;

  private _typeList: Array<TypeVar> = [];
  private _veryVarDic: { [key: number]: IVeryVar } = {};
  private _templateDic: { [key: number]: VE_Template } = {};
  private _constDic: { [key: number]: string } = {};

  private _separator: string = " ";

  private _strBuilder: string = '';

  public active(): void {

  }

  public onUpdate(): void {
    this._strBuilder = '';
    for (let i: number = 0; i < this._typeList.length; i++) {
      if (this._typeList[i] === TypeVar.Const) {
        this._strBuilder += this._constDic[i];
      }
      else if (this._typeList[i] === TypeVar.VeryVar) {
        this._strBuilder += this._veryVarDic[i].getValue();
      }
      else if (this._typeList[i] === TypeVar.Template) { // TODO
        //this._templateDic[i].
        //_strBuilder.Append(_toString.GetString(_blueVarDic[i].VarType, _blueVarDic[i].GetValue()));
      }
      this._strBuilder += this._separator;
    }
    this._strBuilder = this._strBuilder.trim();
    if (this._debugMode === 0) {
      // console.log(`一般信息 >>> ${this._strBuilder}`);
      console.log(this._strBuilder);
    }
    else if (this._debugMode == 1) {
      // console.warn(`警告信息 >>> ${this._strBuilder}`);
      console.warn(this._strBuilder);
    }
    else if (this._debugMode == 2) {
      // console.error(`错误信息 >>> ${this._strBuilder}`);
      console.error(this._strBuilder);
    }
  }

  public paraParser(para_array: string[]): boolean {
    if (!ParaParserUtility.ParaNumbers(this.ID, ParaType.Action, para_array.length, 2)) {
      return false;
    } else {
      // 参数1：调试类型
      if (para_array[0].toLowerCase() === "log" || para_array[0] === "调试") {
        this._debugMode = 0;
      }
      else if (para_array[0].toLowerCase() === "warn" || para_array[0] === "警告") {
        this._debugMode = 1;
      }
      else if (para_array[0].toLowerCase() === "error" || para_array[0] === "错误") {
        this._debugMode = 2;
      }
      else {
        VE_ErrorManager.Add(new VE_Error('', this.ID + " 响应 传入参数格式错误，应为Log、Warn或者Error，当前为： " + para_array[0] + "，请检查填入数据！", '', Severity.Error));
        return false;
      }

      // 参数2：打印参数
      //（1）常量；（2）*变量；（3）对象名.*变量（可以是状态）；（4）*模板变量；（5）对象名.*模板变量；（6）×*模板变量.*变量；（7）×对象名.*模板变量.*变量
      let debugArray: string[] = para_array[1].split('+');
      for (let i: number = 0; i < debugArray.length; i++) {
        debugArray[i] = debugArray[i].trim();
        if (VarTools.IsVarID(debugArray[i])) {
          let errorInfo: ErrorInfo = new ErrorInfo();
          let veryVar: Nullable<IVeryVar> = VarTools.GetVeryVarWithExpression(this.projectName, this.objectID, debugArray[i], errorInfo);
          if (veryVar === null) {
            errorInfo.clear();
            let template: Nullable<VE_Template> = VarTools.GetTemplate(this.projectName, this.objectID, debugArray[i], errorInfo);
            if (template === null) {
              VE_ErrorManager.Add(new VE_Error('', this.ID + " 响应 传入参数格式可能有误，当前参数：" + debugArray[i] + "，当前参数含有变量符号，但是在系统中无法查找到，此处当常量处理，请注意！", '', Severity.Error));
              this._constDic[this._typeList.length] = debugArray[i];
              this._typeList.push(TypeVar.Const);
            }
            else {
              this._templateDic[this._typeList.length] = template;
              this._typeList.push(TypeVar.Template);
            }
          }
          else {
            this._veryVarDic[this._typeList.length] = veryVar;
            this._typeList.push(TypeVar.VeryVar);
          }
        }
        else {
          this._constDic[this._typeList.length] = debugArray[i];
          this._typeList.push(TypeVar.Const);
        }
      }

      return true;
    }
  }


  public destroy(): void {

  }

}



VE_Actions.addAction(Action_Debug);