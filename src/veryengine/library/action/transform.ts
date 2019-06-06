import { VE_ActionBehaviour, VE_Actions } from '../../action';
import { VeryGameObject, VeryBool, VeryVector3, VeryNumber } from '../../variables';
import { Time, Transform } from '../../babylon';
import { ParaParserUtility, VeryParas } from '../../utility';
import { ParaType, Severity } from '../../enum';
import { VE_ErrorManager, VE_Error } from '../../global';

export class Action_SetPosition extends VE_ActionBehaviour {


  public get ID(): string {
    return 'Set_Position|设置位置';
  }

  public get className(): string {
    return 'Action_SetPosition';
  }


  private _posvalue: VeryNumber = new VeryNumber();
  private _posVec: VeryVector3 = new VeryVector3();

  private _space: BABYLON.Space = BABYLON.Space.LOCAL;

  private _isVec: boolean = false;
  private _x: VeryNumber = new VeryNumber();
  private _y: VeryNumber = new VeryNumber();
  private _z: VeryNumber = new VeryNumber();

  private _axis: number = 0;

  private _trans: VeryGameObject = new VeryGameObject();
  private _ref: VeryGameObject = new VeryGameObject();

  public active(): void {

  }

  public onUpdate(): void {
    if (this._trans !== null && this._trans.value !== null) {
      if (this._space === BABYLON.Space.LOCAL) {
        if (this._axis === 0) {
          this._trans.value.transform.localPosition = new BABYLON.Vector3(this._posvalue.value, this._trans.value.transform.localPosition.y, this._trans.value.transform.localPosition.z);
        }
        else if (this._axis === 1) {
          this._trans.value.transform.localPosition = new BABYLON.Vector3(this._trans.value.transform.localPosition.x, this._posvalue.value, this._trans.value.transform.localPosition.z);
        }
        else if (this._axis === 2) {
          this._trans.value.transform.localPosition = new BABYLON.Vector3(this._trans.value.transform.localPosition.x, this._trans.value.transform.localPosition.y, this._posvalue.value);
        }
        else {
          if (this._isVec) {
            this._trans.value.transform.localPosition = this._posVec.value;
          }
          else {
            this._trans.value.transform.localPosition = new BABYLON.Vector3(this._x.value, this._y.value, this._z.value);
          }
        }
      }
      else if (this._space === BABYLON.Space.WORLD) {
        if (this._axis === 0) {
          this._trans.value.transform.position = new BABYLON.Vector3(this._posvalue.value, this._trans.value.transform.position.y, this._trans.value.transform.position.z);
        }
        else if (this._axis === 1) {
          this._trans.value.transform.position = new BABYLON.Vector3(this._trans.value.transform.position.x, this._posvalue.value, this._trans.value.transform.position.z);
        }
        else if (this._axis === 2) {
          this._trans.value.transform.position = new BABYLON.Vector3(this._trans.value.transform.position.x, this._trans.value.transform.position.y, this._posvalue.value);
        }
        else {
          if (this._isVec) {
            this._trans.value.transform.position = this._posVec.value;
          }
          else {
            this._trans.value.transform.position = new BABYLON.Vector3(this._x.value, this._y.value, this._z.value);
          }
        }
      }
      else {
        if (this._ref.value !== null) {
          let oriFather: Nullable<Transform> = this._trans.value.transform.parent;
          this._trans.value.transform.parent = this._ref.value.transform;
          if (this._axis === 0)  //X轴
          {
            this._trans.value.transform.localPosition = new BABYLON.Vector3(this._posvalue.value, this._trans.value.transform.localPosition.y, this._trans.value.transform.localPosition.z);
          }
          else if (this._axis === 1)  //Y轴
          {
            this._trans.value.transform.localPosition = new BABYLON.Vector3(this._trans.value.transform.localPosition.x, this._posvalue.value, this._trans.value.transform.localPosition.z);
          }
          else if (this._axis === 2)  //Z轴
          {
            this._trans.value.transform.localPosition = new BABYLON.Vector3(this._trans.value.transform.localPosition.x, this._trans.value.transform.localPosition.y, this._posvalue.value);
          }
          else {
            if (this._isVec) {
              this._trans.value.transform.localPosition = this._posVec.value;
            }
            else {
              this._trans.value.transform.localPosition = new BABYLON.Vector3(this._x.value, this._y.value, this._z.value);
            }
          }
          this._trans.value.transform.parent = oriFather;
        }
        else {
          console.warn(this.ID + " 响应，参考物体为空，请检查！");
        }
      }
    }
  }

  public paraParser(para_array: string[]): boolean {
    if (!ParaParserUtility.ParaNumbers(this.ID, ParaType.Action, para_array.length, 4)) {
      return false;
    } else {
      // 参数1：要设置的物体
      let para1: VeryParas = new VeryParas();
      if (!ParaParserUtility.GameObjectPara(this.projectName, this.objectID, this.ID, ParaType.Action, para1, para_array[0])) {
        return false;
      }
      this._trans = para1.gameObject;

      // 参数2：参考坐标或参考物体
      // 相对和世界坐标确定
      if (para_array[1].toLowerCase() === "self" || para_array[1] === "自身") {
        this._space = BABYLON.Space.LOCAL;
      }
      else if (para_array[1].toLowerCase() === "world" || para_array[1] === "世界") {
        this._space = BABYLON.Space.WORLD;
      }
      else {
        this._space = BABYLON.Space.BONE;
        let para2: VeryParas = new VeryParas();
        if (!ParaParserUtility.GameObjectPara(this.projectName, this.objectID, this.ID, ParaType.Action, para2, para_array[1])) {
          return false;
        }
        this._ref = para2.gameObject;
        if (this._ref.value === null) {
          VE_ErrorManager.Add(new VE_Error('', this.ID + " 响应传入参数 参考物体： " + para_array[1] + "，该参考物体在场景中无法找到！", '', Severity.Error));
          return false;
        }
      }

      // 参数3：设置目标
      if (para_array[2].toLowerCase() === "x") {
        this._axis = 0;
      }
      else if (para_array[2].toLowerCase() === "y") {
        this._axis = 1;
      }
      else if (para_array[2].toLowerCase() === "z") {
        this._axis = 2;
      }
      else if (para_array[2].toLowerCase() === "vector3") {
        this._axis = 3;
      }
      else {
        VE_ErrorManager.Add(new VE_Error('', this.ID + " 响应参数格式错误，轴参数应为x、y、z或者vector3，当前为：" + para_array[2] + "，请检查！", '', Severity.Error));
        return false;
      }

      // 参数4：位置坐标
      if (this._axis === 3) {
        let para4: VeryParas = new VeryParas();
        if (!ParaParserUtility.Vector3OrNumberParaWithExpression(this.projectName, this.objectID, this.ID, ParaType.Action, para4, para_array[3])) {
          return false;
        }
        this._isVec = para4.isVec;
        this._posVec = para4.vector3;
        this._x = para4.vecNumbers[0];
        this._y = para4.vecNumbers[1];
        this._z = para4.vecNumbers[2];
      }
      else {
        let para4: VeryParas = new VeryParas();
        if (!ParaParserUtility.NumberParaWithExpression(this.projectName, this.objectID, this.ID, ParaType.Action, para4, para_array[3])) {
          return false;
        }
        this._posvalue = para4.number;
      }

      return true;
    }
  }

  public destroy(): void {

  }



}







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

  private _isVec: boolean = true;
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
      // 参数1：传入物体，也可以为模板变量
      let para1: VeryParas = new VeryParas();
      if (!ParaParserUtility.GameObjectPara(this.projectName, this.objectID, this.ID, ParaType.Action, para1, para_array[0])) {
        return false;
      }
      this._translateObj = para1.gameObject;

      // 参数2：运动向量
      let para2: VeryParas = new VeryParas();
      if (!ParaParserUtility.Vector3OrNumberParaWithExpression(this.projectName, this.objectID, this.ID, ParaType.Action, para2, para_array[1])) {
        return false;
      }
      this._vecVar = para2.vector3;
      this._xVar = para2.vecNumbers[0];
      this._yVar = para2.vecNumbers[1];
      this._zVar = para2.vecNumbers[2];
      this._isVec = para2.isVec;

      // 参数3：坐标系
      if (para_array[2].toLowerCase() === "world" || para_array[2] === "世界") {
        this._refType = BABYLON.Space.WORLD;
      }
      else if (para_array[2].toLowerCase() === "self" || para_array[2] === "自身") {
        this._refType = BABYLON.Space.LOCAL;
      }
      else {
      let para3: VeryParas = new VeryParas();
        if (!ParaParserUtility.GameObjectPara(this.projectName, this.objectID, this.ID, ParaType.Action, para3, para_array[2])) {
          return false;
        }
        this._refObj = para3.gameObject;
        if (this._refObj.value === null) {
          VE_ErrorManager.Add(new VE_Error('', this.ID + " 响应传入参数 参考物体： " + para_array[2] + "，该参考物体在场景中无法找到！", '', Severity.Error));
        }
      }

      // 参数4：是否每秒为单位运动
      let para4: VeryParas = new VeryParas();
      if (!ParaParserUtility.BoolParaWithExpression(this.projectName, this.objectID, this.ID, ParaType.Action, para4, para_array[3])) {
        return false;
      }
      this._isDeltaTime = para4.bool;
      return true;
    }
  }

  public destroy(): void {
    // 
  }


}

VE_Actions.addAction(Action_SetPosition);
VE_Actions.addAction(Action_Translate);

