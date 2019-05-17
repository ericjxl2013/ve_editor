import { VE_ActionBehaviour, VE_Actions } from '../../action';
import { VeryGameObject, VeryBool, VeryVector3, VeryNumber } from '../../variables';
import { Time } from '../../babylon';
import { ParaParserUtility } from '../../utility';
import { ParaType } from '../../enum';

export class Action_Translate extends VE_ActionBehaviour {

  public get ID(): string {
    return '直线运动|Translate';
  }

  private _refType: BABYLON.Space = BABYLON.Space.LOCAL;

  private _translateObj: Nullable<VeryGameObject> = null;
  private _refObj: Nullable<VeryGameObject> = null;

  private _isDeltaTime: VeryBool = new VeryBool();

  private _isVec: boolean = true;
  private _vecVar: VeryVector3 = new VeryVector3();
  private _xVar: VeryNumber = new VeryNumber();
  private _yVar: VeryNumber = new VeryNumber();
  private _zVar: VeryNumber = new VeryNumber();

  private _paraTime: number = 1;
  private _paraVec: VeryVector3 = new VeryVector3();

  public active(): void {

  }


  public onUpdate(): void {
    if (!this._translateObj || !this._translateObj.value) {
      return;
    } else {
      // 是否为每秒运动
      if (this._isDeltaTime) {
        this._paraTime = Time.deltaTime;
      } else {
        this._paraTime = 1;
      }

      // 方向向量
      if (this._isVec) {
        // 直接赋值为引用传递，在进行坐标变换时，可能被改变原始值，这样比较保险
        this._paraVec.value.copyFrom(this._vecVar.value);
      } else {
        this._paraVec.value.x = this._xVar.value;
        this._paraVec.value.y = this._yVar.value;
        this._paraVec.value.z = this._zVar.value;
      }

      this._paraVec.value = this._paraVec.value.multiplyByFloats(this._paraTime, this._paraTime, this._paraTime);

      // 参考局部或世界坐标移动
      if (this._refType === BABYLON.Space.LOCAL || this._refType === BABYLON.Space.WORLD) {
        this._translateObj.value.transform.translate(this._paraVec.value, this._refType);
      }
      // 参考与某个物体移动
      else {
        if (this._refObj && this._refObj.value) {
          this._translateObj.value.transform.translateRelativeTo(this._paraVec.value, this._refObj.value.transform);
        } else {
          this._translateObj.value.transform.translate(this._paraVec.value, BABYLON.Space.WORLD);
        }
      }

    }
  }

  public paraParser(para_array: string[]): boolean {
    if (!ParaParserUtility.ParaNumbers(this.ID, ParaType.Action, para_array.length, 4)) {
      return false;
    } else {
      // 1、传入物体，也可以为模板变量
      
    }
    return true;
  }

  public destroy(): void {
    // 
  }



}


VE_Actions.addAction(new Action_Translate());

