import { ActionType, SequenceActionState } from "../enum";
import { GameObject } from "../babylon";
import { VeryEngineObject } from "../object";
import { VE_SequenceActions } from "../state";

export abstract class VE_ActionBehaviour {

  /**
   * 响应类型ID，以此ID在表格中索引当前响应，ID可多对一，中间使用“|”分隔；
   */
  public abstract get ID(): string;

  /**
   * 当前响应完整类名；
   */
  public abstract get className(): string;

  /**
   * 当前响应所在场景；
   */
  public get scene(): BABYLON.Scene {
    return this._scene;
  }
  private _scene!: BABYLON.Scene;

  /**
   * 当前脚本是否激活；
   */
  public get enabled(): boolean {
    return this._enabled;
  }
  public set enabled(val: boolean) {
    this._enabled = val;
  }
  private _enabled: boolean = true;

  /**
   * 响应所属工程名；
   */
  public get projectName(): string {
    return this._projectName;
  };
  private _projectName: string = '';

  /**
   * 响应所在GameObject；
   */
  protected gameObject: Nullable<GameObject> = null;

  /**
   * 响应所属对象；
   */
  protected veryObject: Nullable<VeryEngineObject> = null;

  /**
   * 响应所属对象名；
   */
  public get objectID(): string {
    return this._objectID;
  };
  private _objectID: string = '';

  /**
   * 当前响应名；
   */
  public get actionID(): string {
    return this._actionID;
  }
  private _actionID: string = '';

  /**
   * 响应类型，一般响应或者动画类型响应；
   */
  public get type(): ActionType {
    return ActionType.Normal;
  }

  private _erveryFrame: boolean = false;
  /**
   * 响应是否每帧运行；
   */
  public get everyFrame(): boolean {
    return this._erveryFrame;
  }

  /**
   * 响应是否依次运行；
   */
  public isSequence: boolean = false;

  /**
   * 依次运行响应，当前状态；
   */
  public get SequenceState(): SequenceActionState {
    return this._sequenceState;
  }
  public set SequenceState(val: SequenceActionState) {
    this._sequenceState = val;
  }
  private _sequenceState: SequenceActionState = SequenceActionState.Initial;

  private _sequenceAction: Nullable<VE_SequenceActions> = null;

  /**
   * 设置响应所属场景；
   * @param scene 当前场景；
   */
  public set(scene: BABYLON.Scene): void {
    this._scene = scene;
  }

  public setEveryFrame(is_every_frame: boolean): void {
    this._erveryFrame = is_every_frame;
  }

  public setActionID(project_name: string, object_id: string, action_id: string): void {
    this._projectName = project_name;
    this._objectID = object_id;
    this._actionID = action_id;
  }

  public setVeryObject(very_object: VeryEngineObject): void {
    this.veryObject = very_object;
    this.gameObject = very_object.gameObject;
  }

  /**
   * 响应参数解析；抽象函数，子响应必须覆盖；
   * @param para_array 响应参数数组，忽略表格中第1个响应类型ID，以第2个参数开始；
   */
  public abstract paraParser(para_array: string[]): boolean;

  /**
   * 启动或停止响应；注意：系统函数，勿在子响应类中覆盖；
   * @param action_val 响应启动/停止；
   * @param every_frame 响应是否每帧运行；
   */
  public action(action_val: boolean, every_frame: boolean): void {
    this._enabled = action_val;
    this._erveryFrame = every_frame;
    if (this._enabled) {
      this.active()
      if (!this._erveryFrame) {
        this.onUpdate();
      }
    }
  }

  /**
   * 依次运行响应控制；注意：系统函数，勿在子响应类中覆盖；
   * @param sequence 依次运行响应控制类；
   * @param action_val 响应启动/停止；
   * @param every_frame 响应是否每帧运行；
   */
  public sequenceAction(sequence: VE_SequenceActions, action_val: boolean, every_frame: boolean): void {
    this._sequenceAction = sequence;
    this._sequenceState = SequenceActionState.Running;
    this.action(action_val, every_frame);
  }

  /**
   * 响应启动或停止；抽象函数，子响应必须覆盖；
   */
  public abstract active(): void;

  /**
   * 帧循环函数，类似Unity的Update函数，若有需要，可以在子响应中覆盖，子响应的update循环将不受everyFrame每帧运行参数控制；
   */
  public update(): void {
    if (this._enabled && this._erveryFrame) {
      this.onUpdate();
    }
  }

  /**
   * 帧循环函数，需在子响应中覆盖使用，受everyFrame每帧运行参数控制；
   */
  public onUpdate(): void {

  }

  /**
   * 依次运行响应控制，暂停；
   */
  public pause(): void {
    this._sequenceState = SequenceActionState.Pause;
  }

  /**
   * 依次运行响应控制，恢复运行；
   */
  public resume(): void {
    this._sequenceState = SequenceActionState.Running;
  }

  /**
   * 依次运行响应控制，停止；
   */
  public stop(): void {
    this._sequenceState = SequenceActionState.Initial;
  }

  /**
   * 依次运行响应控制，结束运行；
   */
  public finish(): void {
    this._sequenceState = SequenceActionState.Initial;
    if (this._sequenceAction !== null) {
      this._sequenceAction.finishAction(this);
      this._sequenceAction = null;
    }
    this.enabled = false;
  }

  /**
   * 如果创建过程中有异步callback获取其他创建的类，需要destroy时删除；抽象函数，子响应必须覆盖；
   */
  public abstract destroy(): void;


}