import { VE_TriggerBehaviour, VE_Triggers } from "../../trigger";
import { VeryGameObject } from "../../variables";
import { ParaParserUtility, VeryParas } from "../../utility";
import { ParaType, Severity } from "../../enum";
import { VE_ErrorManager, VE_Error } from "../../global";

export class Trigger_MouseOver extends VE_TriggerBehaviour {

  public get ID(): string {
    return 'On_Mouse_Over|碰撞体鼠标经过';
  };

  public get className(): string {
    return 'Trigger_MouseOver';
  };

  private _target: VeryGameObject = new VeryGameObject();

  private _observer: Nullable<BABYLON.Observer<BABYLON.PointerInfo>> = null;


  public paraParser(para_array: string[]): boolean {

    if (!ParaParserUtility.ParaNumbers(this.ID, ParaType.Trigger, para_array.length, 0, 1)) {
      return false;
    }
    else {

      if (para_array.length > 0) {
        // 参数1： 指定碰撞物体
        let para1: VeryParas = new VeryParas();
        if (!ParaParserUtility.GameObjectPara(this.projectName, this.objectID, this.ID, ParaType.Trigger, para1, para_array[0])) {
          return false;
        }
        this._target = para1.gameObject;
      } else {
        // 默认为当前对象所在物体
        this._target.value = this.gameObject;
      }

      if (this._target.value === null) {
        VE_ErrorManager.Add(new VE_Error('', this.ID + " 触发 传入参数格式错误：" + para_array[0] + "，填写0、1、2或者left、right、middle或者左、右、中，请检查！", '', Severity.Error));
        return false;
      } else {
        if (this._target.value.transform.mesh === null) {

        } else {
          // 允许鼠标移动时获取碰撞信息
          this._target.value.transform.mesh.enablePointerMoveEvents = true;
        }
      }

      this._observer = this.scene.onPointerObservable.add((pointInfo: BABYLON.PointerInfo) => {
        if (pointInfo.type === BABYLON.PointerEventTypes.POINTERMOVE) {
          if (pointInfo.pickInfo !== null && pointInfo.pickInfo.pickedMesh !== null && this._target.value) {
            if (pointInfo.pickInfo.pickedMesh === this._target.value.transform.mesh) {
              this.sendEvent();
            }
          }
        }
      });

      return true;
    }
  }

  public destroy(): void {
    if (this._observer) {
      this._scene.onPointerObservable.remove(this._observer);
    }
    this._observer = null;
  }

}

VE_Triggers.addTrigger(Trigger_MouseOver);