import { VE_State } from "../state/state";
import { StateConst } from "../state/stateConst";
import { IExpression } from "../expression";
import { VeryEngineObject } from "../object";
import { GameObject } from "../babylon";

export abstract class VE_TriggerBehaviour {

  /**
   * 触发类型ID，以此ID在表格中索引当前触发，ID可多对一，中间使用“|”分隔；
   */
  public abstract get ID(): string;

  /**
   * 当前触发完整类名；
   */
  public abstract get className(): string;

  /**
   * 当前触发所在场景；
   */
  public get scene(): BABYLON.Scene {
    return this._scene;
  }
  public _scene!: BABYLON.Scene;

  /**
   * 当前脚本是否激活；
   */
  public get enabled(): boolean {
    return this._enabled && this.isEnabled;
  }
  public set enabled(val: boolean) {
    this._enabled = val;
  }
  private _enabled: boolean = true;

  /**
   * 触发所属工程名；
   */
  public get projectName(): string {
    return this._projectName;
  }
  private _projectName: string = '';

  /**
   * 当前触发脚步是否允许被触发；
   */
  public get isEnabled(): boolean {
    if (this._logicalSwitch) {
      for (let i: number = 0; i < this._logicalSwitch.length; i++) {
        if (this._logicalSwitch[i] && !this._logicalSwitch[i].evaluate()) {
          return false;
        }
      }
    }
    return true;
  }

  // Logical
  private _logicalSwitch: IExpression[] = [];
  private _logicalExp: Nullable<IExpression>[] = [];
  // State
  private _triggerTargets: VE_State[] = [];

  protected gameObject: Nullable<GameObject> = null;

  /**
   * 触发所属对象；
   */
  protected veryObject: Nullable<VeryEngineObject> = null;

  /**
   * 触发所属对象名；
   */
  public get objectID(): string {
    return this._objectID;
  }
  private _objectID: string = 'object-axxx';

  /**
   * 当前触发名；
   */
  public get triggerID(): string {
    return this._triggerID;
  }
  private _triggerID: string = '';

  /**
   * 当前：对象名.触发名；
   */
  public get unionID(): string {
    return this._id;
  }
  private _id: string = '';

  /**
   * 设置触发所属场景；
   * @param scene 当前场景；
   */
  public set(scene: BABYLON.Scene): void {
    this._scene = scene;
  }

  public setTriggerID(project_name: string, trigger_id: string, object_id: string): void {
    this._projectName = project_name;
    this._triggerID = trigger_id;
    this._objectID = object_id;
    this._id = object_id + StateConst.STATE_SEPARATOR + trigger_id;
  }

  public addLogicalSwitch(exp: IExpression): void {
    this._logicalSwitch.push(exp);
  }

  public addTriggerTarget(exp: Nullable<IExpression>, state: VE_State): void {
    this._logicalExp.push(exp);
    this._triggerTargets.push(state);
  }

  public setVeryObject(very_object: VeryEngineObject): void {
    this.veryObject = very_object;
    this.gameObject = very_object.gameObject;
  }

  /**
   * 触发激活，在子触发类中调用该函数，激活触发；
   */
  public sendEvent(): void {
    if(this.isEnabled) {
      this.eventProcess();
    }
  }

  // 关联具体响应
  private eventProcess(): void {
    if (this._triggerTargets) {
      // console.log(`ID: ${this.triggerID} --- Count: ${this._triggerTargets.length}`);
      for (let i: number = 0; i < this._triggerTargets.length; i++) {
        if (this._logicalExp[i] === null || this._logicalExp[i]!.evaluate()) {
          this._triggerTargets[i].action(this._id);
        }
      }
    }
  }

  /**
   * 触发参数解析；抽象函数，子触发必须覆盖；
   * @param para_array 触发参数数组，忽略表格中第1个触发类型ID，以第2个参数开始；
   */
  public abstract paraParser(para_array: string[]): boolean;

  /**
   * 帧循环函数，类似Unity的Update函数，若有需要，可以在子触发中覆盖，子触发的update循环将不受 触发激活条件 参数控制；
   */
  public update(): void {
    if (this.isEnabled) {
      this.onUpdate();
    }
  }

  /**
   * 帧循环函数，需在子触发中覆盖使用，受 触发激活条件 参数控制；
   */
  public onUpdate(): void {

  }

  /**
   * 如果创建过程中有异步callback获取其他创建的类，需要destroy时删除；抽象函数，子触发必须覆盖；
   */
  public abstract destroy(): void;


}