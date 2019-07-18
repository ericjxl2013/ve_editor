import { VE_ActionBehaviour, VE_Actions } from '../../action';
import { ParaParserUtility, ErrorInfo, VeryParas } from '../../utility';
import { ParaType, Severity } from '../../enum';
import { VE_Template } from '../../template';
import { VeryString, VeryGameObject, VeryVector3, VeryNumber, VeryBool, VarTools } from '../../variables';
import { VE_ErrorManager, VE_Error } from '../../global';
import { VE_Manager } from '../../manager';
import { GameObject } from '../../babylon';
import { VeryEngineObject } from '../../object';

export class Action_CreateTemplateInstance extends VE_ActionBehaviour {

  public get ID(): string {
    return '创建模板对象|Create_Instance';
  };

  public get className(): string {
    return 'Action_CreateTemplateInstance';
  };


  private _template: Nullable<VE_Template> = null;
  private _templateVarID: string = '';
  // TODO: 派生模板实例化
  private _deriveID: VeryString = new VeryString();
  private _objectInfo: VeryString = new VeryString();
  private _ref: VeryGameObject = new VeryGameObject();

  private _position: VeryVector3 = new VeryVector3();
  private _posX: VeryNumber = new VeryNumber();
  private _posY: VeryNumber = new VeryNumber();
  private _posZ: VeryNumber = new VeryNumber();
  private _isPositionVec: boolean = true;

  private _angle: VeryVector3 = new VeryVector3();
  private _angleX: VeryNumber = new VeryNumber();
  private _angleY: VeryNumber = new VeryNumber();
  private _angleZ: VeryNumber = new VeryNumber();
  private _isAngleVec: boolean = true;

  private _destoryOnCreateNew: VeryBool = new VeryBool();



  public active(): void {
    if (this._template === null) return;
    let errorInfo: ErrorInfo = new ErrorInfo();
    let template: Nullable<VE_Template> = VE_Manager.templates(this.projectName).createInstance(this.objectID, this._templateVarID, this._template, this._objectInfo.value, errorInfo, this._destoryOnCreateNew.value);
    if (template === null || template.templateInstance === null) {
      console.error(this.ID + " 响应 创建模板对象错误，错误原因：" + errorInfo.message);
      return;
    }
    if (this._ref.value !== null) {
      if (this._isPositionVec) {
        template.templateInstance.gameObject.transform.position = this._ref.value.transform.transformPosition(this._position.value);
      }
      else {
        template.templateInstance.gameObject.transform.position = this._ref.value.transform.transformPosition(new BABYLON.Vector3(this._posX.value, this._posY.value, this._posZ.value));
      }

      let emptyAngle: GameObject = new GameObject("Angle__Empty");
      emptyAngle.transform.parent = this._ref.value.transform;
      if (this._isAngleVec) {
        emptyAngle.transform.localEulerAngles = this._angle.value;
      }
      else {
        emptyAngle.transform.localEulerAngles = new BABYLON.Vector3(this._angleX.value, this._angleY.value, this._angleZ.value);
      }
      template.templateInstance.gameObject.transform.eulerAngles = emptyAngle.transform.eulerAngles;
      GameObject.Destroy(emptyAngle);
    }
    else {
      if (this._isPositionVec) {
        template.templateInstance.gameObject.transform.position = this._position.value;
      }
      else {
        template.templateInstance.gameObject.transform.position = new BABYLON.Vector3(this._posX.value, this._posY.value, this._posZ.value);
      }

      if (this._isAngleVec) {
        template.templateInstance.gameObject.transform.eulerAngles = this._angle.value;
      }
      else {
        template.templateInstance.gameObject.transform.eulerAngles = new BABYLON.Vector3(this._angleX.value, this._angleY.value, this._angleZ.value);
      }
    }
  }

  // 1.变量
  // 2.模板名
  // 3.路径或模型名
  // 4.参考系
  // 5.位置
  // 6.角度
  public paraParser(para_array: string[]): boolean {
    if (!ParaParserUtility.ParaNumbers(this.ID, ParaType.Action, para_array.length, 6, 7)) {
      return false;
    } else {

      // 参数1：模板变量（1）*模板变量；（2）对象名.*模板变量；
      let errorInfo: ErrorInfo = new ErrorInfo();
      this._templateVarID = para_array[0];
      this._template = VarTools.GetTemplate(this.projectName, this.objectID, para_array[0], errorInfo);
      if (this._template === null) {
        VE_ErrorManager.Add(new VE_Error('', this.ID + " 响应 传入参数格式错误，创建模板对象错误，模板对象：" + para_array[0] + "，错误原因： " + errorInfo.message, '', Severity.Error));
        return false;
      }

      // 参数2： 模板名
      let para2: VeryParas = new VeryParas();
      if (!ParaParserUtility.StringParaWithExpression(this.projectName, this.objectID, this.ID, ParaType.Action, para2, para_array[1])) {
        return false;
      }
      this._deriveID = para2.string;

      // 参数3： 预制件路径或模型名：（1）prefab路径；（2）空；（3）GameObject Name；
      let para3: VeryParas = new VeryParas();
      if (!ParaParserUtility.StringParaWithExpression(this.projectName, this.objectID, this.ID, ParaType.Action, para3, para_array[2])) {
        return false;
      }
      this._objectInfo = para3.string;

      // 参数4： 参考物体
      let para4: VeryParas = new VeryParas();
      if (!ParaParserUtility.GameObjectPara(this.projectName, this.objectID, this.ID, ParaType.Action, para4, para_array[3])) {
        return false;
      }
      this._ref = para4.gameObject;

      // 参数5： 位置
      let para5: VeryParas = new VeryParas();
      if (!ParaParserUtility.Vector3OrNumberParaWithExpression(this.projectName, this.objectID, this.ID, ParaType.Action, para5, para_array[4])) {
        return false;
      }
      this._isPositionVec = para5.isVec;
      this._position = para5.vector3;
      this._posX = para5.vecNumbers[0];
      this._posY = para5.vecNumbers[1];
      this._posZ = para5.vecNumbers[2];

      // 参数6： 角度
      let para6: VeryParas = new VeryParas();
      if (!ParaParserUtility.Vector3OrNumberParaWithExpression(this.projectName, this.objectID, this.ID, ParaType.Action, para6, para_array[5])) {
        return false;
      }
      this._isAngleVec = para6.isVec;
      this._angle = para6.vector3;
      this._angleX = para6.vecNumbers[0];
      this._angleY = para6.vecNumbers[1];
      this._angleZ = para6.vecNumbers[2];

      // 参数7： 是否销毁旧实例
      if (para_array.length > 6) {
        let para7: VeryParas = new VeryParas();
        if (!ParaParserUtility.BoolParaWithExpression(this.projectName, this.objectID, this.ID, ParaType.Action, para7, para_array[6])) {
          return false;
        }
        this._destoryOnCreateNew = para7.bool;
      } else {
        this._destoryOnCreateNew.value = true;
      }

      return true;
    }
  }


  public destroy(): void {

  }

}


export class Action_DestroyTemplateInstance extends VE_ActionBehaviour {

  public get ID(): string {
    return '删除模板对象|Destroy_Instance';
  };

  public get className(): string {
    return 'Action_DestroyTemplateInstance';
  };

  private _isInstance: boolean = true;
  private _template: Nullable<VE_Template> = null;
  private _instance: Nullable<VeryEngineObject> = null;
  private _templateStr: string = "";

  private _deleteAllTemplates: VeryBool = new VeryBool();

  public active(): void {
    if (this._isInstance) {
      if (this._instance !== null) {
        if (this._instance.template !== null) {
          this._instance.template.unloadInstance(this._instance);
          if (this._deleteAllTemplates.value) {
            let instances: VeryEngineObject[] = this._instance.template.backupInstances;
            if (instances) {
              instances.forEach((value: VeryEngineObject) => {
                value.unload();
              });
            }
            this._instance.template.unload(true);
          }
        }
        this._instance.unload();
      }
    }
    else {
      if (this._template === null || this._template.templateInstance === null) {
        console.error(this.ID + " 响应，模板变量：" + this._templateStr + "，当前模板变量未实例化创建，无法删除！");
        return;
      }
      if (this._deleteAllTemplates.value) {
        let instances: VeryEngineObject[] = this._template.backupInstances;
        if (instances) {
          instances.forEach((value: VeryEngineObject) => {
            value.unload();
          });
        }
        this._template.unload(true);
      } else {
        this._template.templateInstance.unload();
        this._template.unload();
      }
    }
  }


  public paraParser(para_array: string[]): boolean {
    if (!ParaParserUtility.ParaNumbers(this.ID, ParaType.Action, para_array.length, 1, 2)) {
      return false;
    } else {
      // 参数1：待删除对象
      if (para_array[0].toLowerCase() === "this") {
        this._instance = this.veryObject;
        this._isInstance = true;
      }
      else {
        this._isInstance = false;
        this._templateStr = para_array[0];
        // *模板变量&对象名.*模板变量
        let errorInfo: ErrorInfo = new ErrorInfo();
        this._template = VarTools.GetTemplate(this.projectName, this.objectID, para_array[0], errorInfo);
        if (this._template === null) {
          VE_ErrorManager.Add(new VE_Error('', this.ID + " 响应 模板变量获取错误，错误原因：" + errorInfo.message + '，请检查！', '', Severity.Error));
          return false;
        }
        //if (this._template.TemplateInstance == null)
        //{
        //    Debug.LogError(this.ID + " 响应，模板变量：" + para_array[0] + "，当前模板变量未实例化创建，请检查！");
        //    return false;
        //}
        //this._instance = this._template.TemplateInstance;
      }

      if (para_array.length > 1) {
        // 参数2： 是否删除模板对象之前所创建的所有实例
        let para2: VeryParas = new VeryParas();
        if (!ParaParserUtility.BoolParaWithExpression(this.projectName, this.objectID, this.ID, ParaType.Action, para2, para_array[1])) {
          return false;
        }
        this._deleteAllTemplates = para2.bool;
      } else {
        this._deleteAllTemplates.value = false;
      }

      return true;
    }
  }


  public destroy(): void {

  }

}


VE_Actions.addAction(Action_CreateTemplateInstance);
VE_Actions.addAction(Action_DestroyTemplateInstance);