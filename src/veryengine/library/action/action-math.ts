import { VE_ActionBehaviour, VE_Actions } from "../../action";
import { ActionType, ParaType, Severity } from "../../enum";
import { ParaParserUtility, VeryParas, FloatUitlity } from "../../utility";
import { VeryNumber } from "../../variables";
import { VE_ErrorManager, VE_Error } from "../../global";
import { Time } from "../../babylon";

export class Action_Float_Interpolate extends VE_ActionBehaviour {

  public get ID(): string {
    return "Float_Interpolate|浮点数插值";
  }

  public get className(): string {
    return "Action_Float_Interpolate";
  }

  public get type(): ActionType {
    return ActionType.Animation;
  }

  private _switch: boolean = false;
  private _timer: number = 0;
  private _isLinear: boolean = true;

  private _startFloat: VeryNumber = new VeryNumber();
  private _endFloat: VeryNumber = new VeryNumber();
  private _timeFloat: VeryNumber = new VeryNumber();
  private _resultFloat: VeryNumber = new VeryNumber();

  public active(): void {
    if (this._timeFloat.value === 0) {
      this.timesUp();
    }
    else {
      this._timer = 0;
      this._switch = true;
    }
  }

  public pause(): void {
    this._switch = false;
    super.pause();
  }

  public resume(): void {
    this._switch = true;
    super.resume();
  }

  public stop(): void {
    this.timesUp();
    super.stop();
  }

  private timesUp(): void {
    this._switch = false;
    this._timer = 0;
    this.finish();
  }

  public update(): void {
    if (this._switch) {
      this._timer += Time.deltaTime;
      if (this._timer > this._timeFloat.value) {
        this._switch = false;
        this._timer = 0;
        if (this._isLinear) {

          this._resultFloat.value = FloatUitlity.Lerp(this._startFloat.value, this._endFloat.value, 1);
        }
        else {
          this._resultFloat.value = FloatUitlity.SLerp(this._startFloat.value, this._endFloat.value, 1);
        }
        this.timesUp();
      }
      else {
        if (this._isLinear) {
          this._resultFloat.value = FloatUitlity.Lerp(this._startFloat.value, this._endFloat.value, this._timer / this._timeFloat.value);
        }
        else {
          this._resultFloat.value = FloatUitlity.SLerp(this._startFloat.value, this._endFloat.value, this._timer / this._timeFloat.value);
        }
      }
    }
  }

  public paraParser(para_array: string[]): boolean {
    if (!ParaParserUtility.ParaNumbers(this.ID, ParaType.Action, para_array.length, 5)) {
      return false;
    } else {
      // 参数1：插值类型
      if (para_array[0].toLowerCase() === "linear" || para_array[0] === "线性") {
        this._isLinear = true;
      }
      else if (para_array[0].toLowerCase() === "smooth" || para_array[0] === "圆滑") {
        this._isLinear = false;
      }
      else {
        VE_ErrorManager.Add(new VE_Error('', this.ID + " 响应 传入参数格式错误，应为Log、Warn或者Error，当前为： " + para_array[0] + "，请检查填入数据！", '', Severity.Error));
        return false;
      }

      // 参数2：起始值
      let para2 = new VeryParas();
      if (!ParaParserUtility.NumberParaWithExpression(this.projectName, this.objectID, this.ID, ParaType.Action, para2, para_array[1])) {
        return false;
      }
      this._startFloat = para2.number;

      // 参数3：终止值
      let para3 = new VeryParas();
      if (!ParaParserUtility.NumberParaWithExpression(this.projectName, this.objectID, this.ID, ParaType.Action, para3, para_array[2])) {
        return false;
      }
      this._endFloat = para3.number;

      // 参数4：持续时长
      let para4 = new VeryParas();
      if (!ParaParserUtility.NumberParaWithExpression(this.projectName, this.objectID, this.ID, ParaType.Action, para4, para_array[3])) {
        return false;
      }
      this._timeFloat = para4.number;

      // 参数5：插值结果
      let para5 = new VeryParas();
      if (!ParaParserUtility.NumberParaOnlyVar(this.projectName, this.objectID, this.ID, ParaType.Action, para5, para_array[4])) {
        return false;
      }
      this._resultFloat = para5.number;

      return true;
    }
  }


  public destroy(): void {

  }

}



VE_Actions.addAction(Action_Float_Interpolate);