import { VE_Template } from "./template";
import { ErrorInfo } from "../utility";
import { StateConst } from "../state";
import { GameObject } from "../babylon";
import { VE_Objects, VeryEngineObject } from "../object";
import { VE_Manager } from "../manager";

export class VE_Templates {

  public get projectName(): string {
    return this._projectName;
  }
  private _projectName: string = '';

  private _templateDic: { [key: string]: VE_Template } = {};

  private _instanceDic: { [key: string]: { [key: string]: VE_Template } } = {};


  constructor(project_name: string) {
    this._projectName = project_name;
  }

  public isCreatedTemplate(template_id: string): boolean {
    if (this._templateDic[template_id]) {
      return true;
    } else {
      return false;
    }
  }

  public addTemplate(template_id: string, template: VE_Template): void {
    this._templateDic[template_id] = template;
  }

  public getTemplate(template_id: string): VE_Template {
    return this._templateDic[template_id];
  }

  public isCreatedInstance(object_id: string, var_id: string): boolean {
    if (this._instanceDic[object_id] && this._instanceDic[object_id][var_id]) {
      return true;
    } else {
      return false;
    }
  }

  public getInstance(object_id: string, var_id: string): VE_Template {
    return this._instanceDic[object_id][var_id];
  }

  // public getState(var_id: string, state_id: string, index: number): VE_State {

  // } 

  public clear(): void {
    if (this._templateDic) {
      Object.keys(this._templateDic).forEach(key => {
        this._templateDic[key].clear();
      })
      this._templateDic = {};
    }
  }

  // TODO
  public createInstance(object_id: string, var_id: string, template: VE_Template, object_name: string, error_info: ErrorInfo, destory_on_create_new: boolean): Nullable<VE_Template> {

    let errorPos: string = "错误定位信息：（项目：" + this._projectName + "，对象：" + object_id + "，模板变量：" + var_id + "，模板名：" + template.templateID + "）";

    // 若当前已有实例，则先删除
    if (template.templateInstance !== null && destory_on_create_new) {
      template.templateInstance.unload();
      template.setInstance(null);
    } else {
      // TODO: 当前实例添加到backup区域

    }

    // （1）创建GameObject，3种情况，1、实例化当前场景中已有的模型，直接写物体名；2、Resources目录下的Prefab物体，prefab：前缀 + 实际路径；3、创建空物体，不填或者“null”；
    let gameObject: Nullable<GameObject> = null;
    let hasCreated: boolean = false;
    let newObjectID: string = template.templateID + "_" + var_id.replace(StateConst.VARIABLE_SYMBOL, "");
    if (object_name === '' || object_name.toLowerCase() === "null" || object_name.toLowerCase() === "none") {
      gameObject = new GameObject(newObjectID + "_Empty");
      hasCreated = true;
    }
    else {
      gameObject = GameObject.Find(object_name);
      if(gameObject === null) {
        error_info.isRight = false;
        error_info.message = "模板对象实例化失败：无法在场景中查找到对应名字的物体，也无法以预制件在TResources文件夹中加载，物体名：" + object_name + "！" + errorPos;
        return null;
      }
      // TODO: 无prefab类似结构
      /*
      try {
        gameObject = Resources.Load(object_name) as GameObject;
        if (gameObject == null) {
          gameObject = GameObjectTools.FindGameObject(object_name);
          if (gameObject == null) {
            error_info = "模板对象实例化失败：无法在场景中查找到对应名字的物体，也无法以预制件在TResources文件夹中加载，物体名：" + object_name + "！" + errorPos;
            return null;
          }
        }
      }
      catch
      {
        gameObject = GameObjectTools.FindGameObject(object_name);
        if (gameObject == null) {
          error_info = "模板对象实例化失败：无法在场景中查找到对应名字的物体，也无法以预制件在TResources文件夹中加载，物体名：" + object_name + "！" + errorPos;
          return null;
        }
      }
      */
    }
    // 实例化物体，物体为场景中的物体
    if (!hasCreated) {
      gameObject = GameObject.CreateInstance(gameObject);
    }
    // gameObject!.SetActive(true);
    gameObject!.name += "_" + template.instanceCount;
    newObjectID += "_" + template.instanceCount;
    template.increase();
    // 创建Object
    let instance: VeryEngineObject = new VeryEngineObject(this._projectName, newObjectID, gameObject!);
    template.setInstance(instance);

    let objects: VE_Objects = VE_Manager.objects(this._projectName);
    // 添加新对象，以便于变量查找
    objects.add(newObjectID, instance);
    // TODO: 回调函数，销毁时删除Objects中的数据
    // instance.setUnloadCallback(objects.unloadObject);


    

    return new VE_Template(this._projectName, var_id);
  }

}