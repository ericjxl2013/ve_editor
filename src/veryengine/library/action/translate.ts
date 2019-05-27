import { VE_ActionBehaviour, VE_Actions } from '../../action';
import { VeryGameObject, VeryBool, VeryVector3, VeryNumber } from '../../variables';
import { Time } from '../../babylon';
import { ParaParserUtility } from '../../utility';
import { ParaType, Severity } from '../../enum';
import { VE_ErrorManager, VE_Error } from '../../global';

export class Action_Translate extends VE_ActionBehaviour {

  public get ID(): string {
    return '直线运动|Translate';
  }

  public get className(): string {
    return 'Action_Translate';
  }

  private _refType: BABYLON.Space = BABYLON.Space.LOCAL;

  private _translateObj: VeryGameObject = new VeryGameObject();
  private _refObj: VeryGameObject = new VeryGameObject();

  private _isDeltaTime: VeryBool = new VeryBool();

  private _isVec: boolean[] = [true];
  private _vecVar: VeryVector3 = new VeryVector3();
  private _xVar: VeryNumber = new VeryNumber();
  private _yVar: VeryNumber = new VeryNumber();
  private _zVar: VeryNumber = new VeryNumber();

  private _paraTime: number = 1;
  private _paraVec: VeryVector3 = new VeryVector3();

  public active(): void {
    // console.log(this.actionID);
  }


  public onUpdate(): void {
    if (!this._translateObj || !this._translateObj.value) {
      return;
    } else {
      // 是否为每秒运动
      if (this._isDeltaTime && this._isDeltaTime.value) {
        this._paraTime = Time.deltaTime;
      } else {
        this._paraTime = 1;
      }

      // 方向向量
      if (this._isVec[0]) {
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
      // 参数1：传入物体，也可以为模板变量
      if (!ParaParserUtility.GameObjectPara(this.projectName, this.objectID, this.ID, ParaType.Action, this._translateObj, para_array[0])) {
        return false;
      }

      // 参数2：运动向量
      if (!ParaParserUtility.Vector3OrNumberParaWithExpression(this.projectName, this.objectID, this.ID, ParaType.Action, this._vecVar, this._xVar, this._yVar, this._zVar, this._isVec, para_array[1])) {
        return false;
      }

      // 参数3：坐标系
      if (para_array[2].toLowerCase() === "world" || para_array[2] === "世界") {
        this._refType = BABYLON.Space.WORLD;
      }
      else if (para_array[2].toLowerCase() === "self" || para_array[2] === "自身") {
        this._refType = BABYLON.Space.LOCAL;
      }
      else {
        if (!ParaParserUtility.GameObjectPara(this.projectName, this.objectID, this.ID, ParaType.Action, this._refObj, para_array[2])) {
          return false;
        }
        if (this._refObj.value === null) {
          VE_ErrorManager.Add(new VE_Error('', this.ID + " 响应传入参数 参考物体： " + para_array[2] + "，该参考物体在场景中无法找到！", '', Severity.Error));
        }
      }

      // 参数4：是否每秒为单位运动
      if (!ParaParserUtility.BoolParaWithExpression(this.projectName, this.objectID, this.ID, ParaType.Action, this._isDeltaTime, para_array[3])) {
        return false;
      }

      return true;
    }
  }

  public destroy(): void {
    // 
  }


}


VE_Actions.addAction(Action_Translate);

