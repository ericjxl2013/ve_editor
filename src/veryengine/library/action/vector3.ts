import { VE_ActionBehaviour, VE_Actions } from "../../action";
import { Vector3Utility, ParaParserUtility, VeryParas } from "../../utility";
import { ParaType, ActionType, Severity } from "../../enum";
import { VeryVector3, VeryNumber } from "../../variables";
import { VE_ErrorManager, VE_Error } from "../../global";
import { Time } from "../../babylon";

export class Action_Vector3_Interpolate extends VE_ActionBehaviour {

  public get ID(): string {
    return "Vector3_Interpolate|向量插值";
  }

  public get className(): string {
    return "Action_Vector3_Interpolate";
  }

  public get type(): ActionType {
    return ActionType.Animation;
  }

  private _switch: boolean = false;
  private _timer: number = 0;
  private _isLinear: boolean = true;

  private _acceptVec: VeryVector3 = new VeryVector3();

  private _timeFloat: VeryNumber = new VeryNumber();

  private _isVec1: boolean = false;
  private _vecUnit1: VeryVector3 = new VeryVector3();
  private _vecFloat1: VeryNumber[] = [];

  private _isVec2: boolean = false;
  private _vecUnit2: VeryVector3 = new VeryVector3();
  private _vecFloat2: VeryNumber[] = [];


  public active(): void {
    if (this._timeFloat.value === 0) {
      this.timesUp();
    }
    else {
      this._timer = 0;
      this._switch = true;
    }
  }


  public onUpdate(): void {
    if (this._switch) {
      this._timer += Time.deltaTime;

      let vec1: BABYLON.Vector3 = this._vecUnit1.value;
      if (!this._isVec1) {
        vec1 = new BABYLON.Vector3(this._vecFloat1[0].value, this._vecFloat1[1].value, this._vecFloat1[2].value);
      }

      let vec2: BABYLON.Vector3 = this._vecUnit2.value;
      if (!this._isVec2) {
        vec2 = new BABYLON.Vector3(this._vecFloat2[0].value, this._vecFloat2[1].value, this._vecFloat2[2].value);
      }

      if (this._timer > this._timeFloat.value) {
        this._switch = false;
        this._timer = 0;
        if (this._isLinear) {
          this._acceptVec.value = BABYLON.Vector3.Lerp(vec1, vec2, 1);
        }
        else {
          this._acceptVec.value = Vector3Utility.Slerp(vec1, vec2, 1);
        }
        this.timesUp();
      }
      else {
        if (this._isLinear) {
          this._acceptVec.value = BABYLON.Vector3.Lerp(vec1, vec2, this._timer / this._timeFloat.value);
        }
        else {
          this._acceptVec.value = Vector3Utility.Slerp(vec1, vec2, this._timer / this._timeFloat.value);
        }
      }
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
      if (!ParaParserUtility.Vector3OrNumberParaWithExpression(this.projectName, this.objectID, this.ID, ParaType.Action, para2, para_array[1])) {
        return false;
      }
      this._isVec1 = para2.isVec;
      this._vecFloat1 = para2.vecNumbers;
      this._vecUnit1 = para2.vector3;

      // 参数3：终止值
      let para3 = new VeryParas();
      if (!ParaParserUtility.Vector3OrNumberParaWithExpression(this.projectName, this.objectID, this.ID, ParaType.Action, para3, para_array[2])) {
        return false;
      }
      this._isVec2 = para3.isVec;
      this._vecFloat2 = para3.vecNumbers;
      this._vecUnit2 = para3.vector3;

      // 参数4：持续时长
      let para4 = new VeryParas();
      if (!ParaParserUtility.NumberParaWithExpression(this.projectName, this.objectID, this.ID, ParaType.Action, para4, para_array[3])) {
        return false;
      }
      this._timeFloat = para4.number;

      // 参数5：插值结果
      let para5 = new VeryParas();
      if (!ParaParserUtility.Vector3Para(this.projectName, this.objectID, this.ID, ParaType.Action, para5, para_array[4])) {
        return false;
      }
      this._acceptVec = para5.vector3;

      return true;
    }
  }


  public destroy(): void {

  }


}


VE_Actions.addAction(Action_Vector3_Interpolate);