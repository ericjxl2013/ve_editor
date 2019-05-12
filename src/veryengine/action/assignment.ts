import { VE_State } from "../state";
import { AssignType } from "../enum";
import { IVeryVar } from "../variables";
import { VE_Template } from "../template";
import { ShowError } from "../html";
import { ErrorInfo } from "../utility";
import { IExpression } from "../expression";
import { VE_AssignmentTypeJudge } from "./assignmentTypeJudge";

export class VE_Assignment {

  public get state(): VE_State {
    return this._state;
  }
  private _state: VE_State;

  private _totalStr: string = '';

  public get leftType(): AssignType {
    return this._leftType;
  }
  private _leftType: AssignType = AssignType.Variable;

  public get rightType(): AssignType {
    return this._rightType;
  }
  private _rightType: AssignType = AssignType.Variable;

  public get leftVariable(): Nullable<IVeryVar> {
    return this._leftVariable;
  }
  private _leftVariable: Nullable<IVeryVar> = null;
  private _leftTemplate: Nullable<VE_Template> = null;
  private _leftVarID: string = '';

  private _rightConstStr: string = '';
  private _rightConstValue: any = null;
  public get rightVariable(): Nullable<IVeryVar> {
    return this._leftVariable;
  }
  private _rightVariable: Nullable<IVeryVar> = null;
  private _rightTemplate: Nullable<VE_Template> = null;
  private _rightVarID: string = '';

  private _pos: string = '';

  constructor(state: VE_State, total_string: string) {
    this._state = state;
    this._totalStr = total_string;
  }

  public setPos(pos: string): void {
    this._pos = pos;
  }

  public setLeftVariable(variable: IVeryVar): void {
    this._leftType = AssignType.Variable;
    this._leftVariable = variable;
  }

  public setLeftTemplate(template: VE_Template): void {
    this._leftType = AssignType.Template;
    this._leftTemplate = template;
  }

  public setLeftTemplateVar(template: VE_Template, var_id: string): void {
    this._leftType = AssignType.TemplateVariable;
    this._leftTemplate = template;
    this._leftVarID = var_id;
  }

  public setRightVariable(variable: IVeryVar): void {
    this._rightType = AssignType.Variable;
    this._rightVariable = variable;
  }

  public setRightTemplate(template: VE_Template): void {
    this._rightType = AssignType.Template;
    this._rightTemplate = template;
  }

  public setRightNull(): void {
    this._rightType = AssignType.Template;
    this._rightTemplate = null;
  }

  public setRightTemplateVariable(template: VE_Template, var_id: string): void {
    this._rightType = AssignType.TemplateVariable;
    this._rightTemplate = template;
    this._rightVarID = var_id;
  }

  public setRightConst(const_str: string): void {
    this._rightType = AssignType.Const;
    this._rightConstStr = const_str;
  }

  public setRightConstValue(const_value: any) {
    this._rightType = AssignType.Const;
    this._rightConstValue = const_value;
  }

  public finish(): void {

  }

  public assign(): void {
    // 变量
    if (this._leftType === AssignType.Variable) {
      this.rightAssignment();
    }
    // 模板变量
    else if (this._leftType === AssignType.Template) {
      if (this._rightTemplate == null) {
        if (this._leftTemplate !== null) {
          this._leftTemplate.unload();
        }
      }
      else {
        this._leftTemplate = this._rightTemplate;
      }
    }
    // 模板变量.变量
    else {
      if (this._leftTemplate!.templateInstance !== null) {
        if (this._leftTemplate!.templateInstance.isCreatedExpression(this._leftVarID)) {
          ShowError.showError('位置：' + this._pos + "，项目名：" + this.state.Fsm.projectName + "，对象名：" + this.state.Fsm.objectID + "，状态名：" + this.state.Fsm.fsmID + "，赋值响应：" + this._totalStr + "，错误：左侧变量不能为“公式”，" + this._rightTemplate!.templateVarID);
          return;
        }
        else if (this._leftTemplate!.templateInstance.isCreatedVariable(this._leftVarID)) {
          this._leftVariable = this._leftTemplate!.templateInstance.getVariable(this._leftVarID);
          this.rightAssignment();
        }
        else if (this._leftTemplate!.templateInstance.isCreatedFsm(this._leftVarID)) {
          this._leftVariable = this._leftTemplate!.templateInstance.getFsm(this._leftVarID).fsmVar;
          this.rightAssignment();
        }
        else {
          ShowError.showError('位置：' + this._pos + "，项目名：" + this.state.Fsm.projectName + "，对象名：" + this.state.Fsm.objectID + "，状态名：" + this.state.Fsm.fsmID + "，赋值响应：" + this._totalStr + "，错误：左侧无法被查找到，" + this._rightTemplate!.templateVarID);
          return;
        }
      }
      else {
        ShowError.showError('位置：' + this._pos + "，项目名：" + this.state.Fsm.projectName + "，对象名：" + this.state.Fsm.objectID + "，状态名：" + this.state.Fsm.fsmID + "，赋值响应：" + this._totalStr + "，错误：左侧模板变量未实例化，" + this._leftTemplate!.templateVarID);
        return;
      }
    }
  }

  private rightAssignment(): void {
    // 变量
    if (this._rightType === AssignType.Variable) {
      this._leftVariable!.setValue(this._rightVariable!.getValue());
    }
    // 常量
    else if (this._rightType === AssignType.Const) {
      if (this._rightConstValue === null) {
        let errorInfo: ErrorInfo = new ErrorInfo();
        this._rightConstValue = this._leftVariable!.initValue(this._rightConstStr, errorInfo);
        if (!errorInfo.isRight) {
          ShowError.showError('位置：' + this._pos + "，项目名：" + this.state.Fsm.projectName + "，对象名：" + this.state.Fsm.objectID + "，状态名：" + this.state.Fsm.fsmID + "，赋值响应：" + this._totalStr + "，错误：右侧常量转化错误，" + this._rightConstStr);
          return;
        }
        else {
          //UnityEngine.Debug.Log("赋值响应1 - " + _totalStr + "：" + this._rightConstValue);
          this._leftVariable!.setValue(this._rightConstValue);
        }
      }
      else {
        //UnityEngine.Debug.Log("赋值响应2 - " + _totalStr + "：" + this._rightConstValue);
        this._leftVariable!.setValue(this._rightConstValue);
      }
    }
    else  //模板变量.变量
    {
      if (this._rightTemplate!.templateInstance != null) {
        if (this._rightTemplate!.templateInstance.isCreatedExpression(this._rightVarID)) {
          let exp: IExpression = this._rightTemplate!.templateInstance.getExpression(this._rightVarID);
          if (VE_AssignmentTypeJudge.allowExpression(this._leftVariable!, exp)) {
            this._leftVariable!.setValue(exp.evaluate());
          }
          else {
            ShowError.showError('位置：' + this._pos + "，项目名：" + this.state.Fsm.projectName + "，对象名：" + this.state.Fsm.objectID + "，状态名：" + this.state.Fsm.fsmID + "，赋值响应：" + this._totalStr + "，错误：左侧和右侧数据格式不匹配，不能完成赋值，" + this._rightTemplate!.templateVarID);
            return;
          }
        }
        else if (this._rightTemplate!.templateInstance.isCreatedVariable(this._rightVarID)) {
          let v: IVeryVar = this._rightTemplate!.templateInstance.getVariable(this._rightVarID);
          if (VE_AssignmentTypeJudge.allow(this._leftVariable!, v)) {
            this._leftVariable!.setValue(v.getValue());
          }
          else {
            ShowError.showError('位置：' + this._pos + "，项目名：" + this.state.Fsm.projectName + "，对象名：" + this.state.Fsm.objectID + "，状态名：" + this.state.Fsm.fsmID + "，赋值响应：" + this._totalStr + "，错误：左侧和右侧数据格式不匹配，不能完成赋值，" + this._rightTemplate!.templateVarID);
            return;
          }
        }
        else if (this._rightTemplate!.templateInstance.isCreatedFsm(this._rightVarID)) {
          let v: IVeryVar = this._rightTemplate!.templateInstance.getFsm(this._rightVarID).fsmVar;
          if (VE_AssignmentTypeJudge.allow(this._leftVariable!, v)) {
            this._leftVariable!.setValue(v.getValue());
          }
          else {
            ShowError.showError('位置：' + this._pos + "，项目名：" + this.state.Fsm.projectName + "，对象名：" + this.state.Fsm.objectID + "，状态名：" + this.state.Fsm.fsmID + "，赋值响应：" + this._totalStr + "，错误：左侧和右侧数据格式不匹配，不能完成赋值，" + this._rightTemplate!.templateVarID);
            return;
          }
        }
        else {
          ShowError.showError('位置：' + this._pos + "，项目名：" + this.state.Fsm.projectName + "，对象名：" + this.state.Fsm.objectID + "，状态名：" + this.state.Fsm.fsmID + "，赋值响应：" + this._totalStr + "，错误：无法获取右侧变量，不能完成赋值，" + this._rightTemplate!.templateVarID);
          return;
        }
      }
      else {
        ShowError.showError('位置：' + this._pos + "，项目名：" + this.state.Fsm.projectName + "，对象名：" + this.state.Fsm.objectID + "，状态名：" + this.state.Fsm.fsmID + "，赋值响应：" + this._totalStr + "，错误：右侧模板变量未实例化，" + this._rightTemplate!.templateVarID);
        return;
      }
    }
  }

}