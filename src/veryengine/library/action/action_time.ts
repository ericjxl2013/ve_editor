import { VE_ActionBehaviour, VE_Actions } from "../../action";
import { ParaType, ActionType } from "../../enum";
import { ParaParserUtility, VeryParas } from "../../utility";
import { VeryBool, VeryNumber } from "../../variables";
import { Time } from "../../babylon";
import { VE_CustomTriggerManager } from "../../trigger";

export class Action_Timer extends VE_ActionBehaviour {

  public get ID(): string {
    return "Timer|定时器";
  }

  public get className(): string {
    return "Action_Timer";
  }

  private _switch: VeryBool = new VeryBool();

  private _timerEvent: (() => void) | null = null;

  // 是否支持多重激活，当有多个激活时，分别记录每个激活的时间
  private _mutiple: VeryBool = new VeryBool();

  private _totalTime: VeryNumber = new VeryNumber();

  private _timer: VeryTimeControl[] = [];


  public active(): void {
    if (this._switch.value) {
      this.timeSet();
    }
    else {
      this._timer = [];
    }
  }

  private timeSet(): void {
    if (this._mutiple.value) {
      let timer: VeryTimeControl = new VeryTimeControl(this._totalTime.value, Time.time);
      this._timer.push(timer);
    }
    else {
      if (this._timer.length == 0) {
        let timer: VeryTimeControl = new VeryTimeControl(this._totalTime.value, Time.time);
        this._timer.push(timer);
      }
      else {
        this._timer[0].reset(this._totalTime.value, Time.time);
      }
    }
  }

  public update(): void {
    if (this._timer.length > 0) {
      for (let i: number = 0; i < this._timer.length; i++) {
        if (this._timer[i].isTimesUp(Time.time)) {
          if (this._timer.length > i) {
            this._timer.splice(i, 1);
            i--;
          }
          this.timesUp();
        }
      }
    }
  }

  // 是否到时间
  private timesUp(): void {
    if (this._timerEvent !== null) {
      this._timerEvent();
      this.finish();
    }
  }


  public paraParser(para_array: string[]): boolean {
    if (!ParaParserUtility.ParaNumbers(this.ID, ParaType.Action, para_array.length, 3, 4)) {
      return false;
    } else {
      // 参数1：启动或者停止计时器
      let para1: VeryParas = new VeryParas();
      if (!ParaParserUtility.BoolParaWithExpression(this.projectName, this.objectID, this.ID, ParaType.Action, para1, para_array[0])) {
        return false;
      }
      this._switch = para1.bool;

      // 参数2：触发ID
      let triggerArray: string[] = para_array[1].split(/,|，/);
      for (let i: number = 0; i < triggerArray.length; i++) {
        VE_CustomTriggerManager.ConnectCustomTrigger(this.projectName, this.objectID, triggerArray[i].trim(), this.setCallback);
      }

      // 参数3：总时间
      let para3: VeryParas = new VeryParas();
      if (!ParaParserUtility.NumberParaWithExpression(this.projectName, this.objectID, this.ID, ParaType.Action, para3, para_array[2])) {
        return false;
      }
      this._totalTime = para3.number;

      if (para_array.length > 3) {
        // 参数4： 多重激活，同时启动多个定时器；
        let para4: VeryParas = new VeryParas();
        if (!ParaParserUtility.BoolParaWithExpression(this.projectName, this.objectID, this.ID, ParaType.Action, para4, para_array[3])) {
          return false;
        }
        this._mutiple = para4.bool;
      } else {
        this._mutiple.value = true;
      }

      return true;
    }
  }


  private setCallback(callback: () => void): void {
    this._timerEvent = callback;
  }


  public destroy(): void {

  }


}


export class VeryTimeControl {
  private _totalTime: number;
  private _startTime: number;
  private _timeRecorder: number;

  public constructor(time: number, start_time: number) {
    if (time < 0) {
      time = 0;
    }
    this._totalTime = time;
    this._startTime = start_time;
    this._timeRecorder = 0;
  }

  public isTimesUp(current_time: number): boolean {
    this._timeRecorder = current_time - this._startTime;

    if (this._timeRecorder >= this._totalTime) {
      return true;
    }
    else {
      return false;
    }
  }

  public reset(time: number, start_time: number): void {
    if (time < 0) {
      time = 0;
    }
    this._totalTime = time;
    this._startTime = start_time;
    this._timeRecorder = 0;
  }
}


export class Action_Wait extends VE_ActionBehaviour {

  public get ID(): string {
    return "Wait|等待";
  }

  public get className(): string {
    return "Action_Wait";
  }

  public get type(): ActionType {
    return ActionType.Animation;
  }

  private _waitTime: VeryNumber = new VeryNumber();

  private _timer: number = 0;
  private _switch: boolean = false;

  public active(): void {
    if (this._waitTime.value === 0) {
      this.timesUp();
    }
    else {
      this._switch = true;
      this._timer = 0;
    }
  }

  public update(): void {
    if (this._switch) {
      this._timer += Time.deltaTime;
      if (this._timer > this._waitTime.value) {
        this.timesUp();
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
    if (!ParaParserUtility.ParaNumbers(this.ID, ParaType.Action, para_array.length, 1)) {
      return false;
    } else {
      // 参数1：等待时间 
      let para1: VeryParas = new VeryParas();
      if (!ParaParserUtility.NumberParaWithExpression(this.projectName, this.objectID, this.ID, ParaType.Action, para1, para_array[0])) {
        return false;
      }
      this._waitTime = para1.number;

      return true;
    }
  }


  public destroy(): void {

  }

}


VE_Actions.addAction(Action_Timer);
VE_Actions.addAction(Action_Wait);