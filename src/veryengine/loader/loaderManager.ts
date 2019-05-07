import { VeryTable } from '../index';
import { VE_Template, VE_Templates } from '../template';
import { VeryEngineObject, VE_Objects } from '../object';
import { VE_FsmData, VE_StateData, VE_StateTriggerData, VE_StateActionData } from '../dataSource';
import { VE_Manager } from '../manager';
import { VE_Variables, GameObject, VeryVarManager } from '../variables';
import { VE_StringFormat } from '../utility';
import { VE_ErrorManager, VE_Error } from '../global';
import { StateConst } from '../state';
import { CreateInstance } from './createInstance';


export enum AnalisysType { Global, Object, Template }

export class LoaderManager {

  private _currentType: AnalisysType = AnalisysType.Global;

  private _table!: VeryTable;

  private _projectName: string = '';

  private _lastFsmID: string = '';
  private _activeTemplate: Nullable<VE_Template> = null;
  private _activeObject: Nullable<VeryEngineObject> = null;
  private _activeFsmData: Nullable<VE_FsmData> = null;
  private _activeStateData: Nullable<VE_StateData> = null;


  constructor() {

  }

  public load(project_name: string, table: VeryTable): boolean {
    this._projectName = project_name;
    this._table = table;

    //初始化项目存储结构
    VE_Manager.createProject(project_name);

    let templates: VE_Templates = VE_Manager.templates(project_name);
    let objects: VE_Objects = VE_Manager.objects(project_name);
    let globalVars: VE_Variables = VE_Manager.variables(project_name);

    // console.log(table);
    if (table) {
      for (let i: number = 0; i < table.RowCount; i++) {
        // console.log(table.getRow(i));
        // （1）模板对象，创建
        if (table.getData(i, 0).startsWith("模板_")) {
          this._activeFsmData = null;
          this._activeStateData = null;
          this._currentType = AnalisysType.Template;
          let templateID = table.getData(i, 0).replace(' ', '').substring(3);
          // TODO: 继承关系
          if (templateID.indexOf(':') > -1 || templateID.indexOf('：') > -1) {

          } else {
            if (!VE_StringFormat.isIDLegal(templateID)) {
              VE_ErrorManager.add(VE_Error.error(table.pos(i, 0), "模板对象名：" + table.getData(i, 0) + "，当前模板对象名不合法，包含非法字符，请检查！", table.ID))
              return false;
            }
            if (!templates.isCreatedTemplate(templateID)) {
              let template: VE_Template = new VE_Template(project_name, templateID);
              templates.addTemplate(templateID, template);
              this._activeTemplate = template;
            } else {
              VE_ErrorManager.add(VE_Error.error(table.pos(i, 0), "模板对象名：" + table.getData(i, 0) + "，当前模板已创建，请勿使用重复的模板对象名！", table.ID))
              return false;
            }
          }
        }
        // （2）一般对象
        else if (table.getData(i, 0) !== '') {
          this._activeFsmData = null;
          this._activeStateData = null;
          this._currentType = AnalisysType.Object;
          let objectID: string = table.getData(i, 0);
          let objName: string = '';
          if (objectID.indexOf('=') > -1) {
            let nameArray: string[] = objectID.split('=');
            if (nameArray.length === 2) {
              objectID = nameArray[0].trim();
              objName = nameArray[1].trim();
            } else {
              VE_ErrorManager.add(VE_Error.error(table.pos(i, 0), "对象名：" + table.getData(i, 0) + "，当前对象名格式错误，应为“对象名”或者“对象名=场景物体名”的形式，请检查！", table.ID))
              return false;
            }
          }
          if (!VE_StringFormat.isIDLegal(objectID)) {
            VE_ErrorManager.add(VE_Error.error(table.pos(i, 0), "对象名：" + table.getData(i, 0) + "，当前对象名不合法，包含非法字符，请检查！", table.ID))
            return false;
          }
          // 创建实际GameObject
          let activeGameObject: Nullable<GameObject> = null;
          if (objName === '') {
            activeGameObject = new GameObject(`__${objectID}_Empty`);
          } else {
            activeGameObject = GameObject.find(objName);
            if (activeGameObject === null) {
              VE_ErrorManager.add(VE_Error.error(table.pos(i, 0), "对象名：" + objName + "，当前对象在场景中不存在，请检查！", table.ID))
              return false;
            }
          }
          if (!objects.isCreated(objectID)) {
            // 规范化数据存储结构，与模板对象通用
            let tempObject: VeryEngineObject = new VeryEngineObject(project_name, objectID, activeGameObject);
            objects.add(objectID, tempObject);
            this._activeObject = tempObject;
          } else {
            VE_ErrorManager.add(VE_Error.error(table.pos(i, 0), "对象名：" + table.getData(i, 0) + "，当前对象已创建，请勿使用重复的对象名！", table.ID))
            return false;
          }
        }
        // （3）变量或者单独的状态
        else if (table.getData(i, 5) !== "" && table.getData(i, 1) === "" && table.getData(i, 2) === "" && table.getData(i, 3) === "" && table.getData(i, 4) === "" && table.getData(i, 6) === "" && table.getData(i, 7) === "" && table.getData(i, 8) === "") {
          let paraData: string = table.getData(i, 5);
          // 全局变量
          if (this._currentType === AnalisysType.Global) {
            // 字符串加法公式咋办？双引号先不移除
            let varArray: string[] = VE_StringFormat.paraSegment(paraData);
            if (varArray.length === 2 || varArray.length === 3) {
              let varID: string = varArray[0].trim();
              if (!VE_StringFormat.isIDLegal(varID)) {
                VE_ErrorManager.add(VE_Error.error(table.pos(i, 5), "全局变量：" + table.getData(i, 5) + "，当前变量名不合法，包含非法字符，请检查！", table.ID))
                return false;
              }
              let paraArray: string[] = [varArray[1].trim()];
              if (varArray.length === 2) {
                paraArray[1] = '';
              } else {
                paraArray[1] = varArray[2].trim();
              }
              if (!globalVars.varData.isCreatedVariable(varID)) {
                globalVars.varData.addVariable(varID, paraArray, table.pos(i, 5));
              } else {
                VE_ErrorManager.add(VE_Error.error(table.pos(i, 5), "全局变量：" + table.getData(i, 5) + "，当前全局变量名已创建，请检查！", table.ID))
                return false;
              }
            } else {
              VE_ErrorManager.add(VE_Error.error(table.pos(i, 5), "全局变量：" + table.getData(i, 5) + "，当前全局变量格式不正确，请检查！", table.ID))
              return false;
            }
          }
          // 状态赋值或者局部公式变量
          else if (paraData.indexOf('=') > -1) {
            let paraArray: string[] = paraData.split('=');
            // 状态赋值
            // 目前暂不考虑赋值公式中有等号的情况，赋值公式后面只能是常量或者已创建的变量
            if (paraArray.length === 2 && paraArray[0].trim() === this._lastFsmID) {
              if (this._activeFsmData === null) {
                VE_ErrorManager.add(VE_Error.error(table.pos(i, 5), "状态赋值：" + table.getData(i, 5) + "，当前状态不属于任何对象和模板对象，请检查！", table.ID))
                return false;
              } else {
                let stateInfo: string[] = paraArray[1].trim().split(/,|，/);
                let stateIndex: number = StateConst.STATE_INDEX;
                let stateData: Nullable<VE_StateData> = null;
                if (stateInfo.length === 2) {
                  stateInfo[0] = stateInfo[0].trim();
                  stateInfo[1] = stateInfo[1].trim();
                  if (stateInfo[1].startsWith('#')) {
                    stateIndex = parseInt(stateInfo[1].substring(1));
                    if (stateIndex === NaN) {
                      VE_ErrorManager.add(VE_Error.error(table.pos(i, 5), "状态赋值：" + table.getData(i, 5) + "，状态关联ID格式错误，状态关联标志ID写法：“状态ID=赋值，#整数ID”，当前整数转化错误！", table.ID))
                      return false;
                    }
                  } else {
                    VE_ErrorManager.add(VE_Error.error(table.pos(i, 5), "状态赋值：" + table.getData(i, 5) + "，状态关联ID格式错误，状态关联标志ID写法：“状态ID=赋值，#整数ID”，请检查！", table.ID))
                    return false;
                  }
                }
                stateData = new VE_StateData(this._activeFsmData, stateInfo[0].trim(), false, stateIndex);
                this._activeFsmData.addState(stateData);
                this._activeStateData = stateData;
              }
            }
            // 公式变量，局部变量
            else {
              let varArray: string[] = VE_StringFormat.paraSegment(paraData);
              if (varArray.length === 3) {
                let varID: string = varArray[0].trim();
                if (!VE_StringFormat.isIDLegal(varID)) {
                  VE_ErrorManager.add(VE_Error.error(table.pos(i, 5), "变量：" + table.getData(i, 5) + "，当前变量名不合法，包含非法字符，请检查！", table.ID))
                  return false;
                }
                let para2Array: string[] = [varArray[1].trim(), varArray[2].trim()];
                // 判断是模板变量，还是对象变量，注意：局部变量名与状态名也不能重合
                if (this._currentType === AnalisysType.Object) {
                  if (this._activeObject!.varData.isCreatedVariable(varID)) {
                    VE_ErrorManager.add(VE_Error.error(table.pos(i, 5), "对象名：" + this._activeObject!.objectID + "，局部变量：" + table.getData(i, 5) + "，当前局部变量名已创建，请检查！", table.ID))
                    return false;
                  }
                  // 状态重复判断，应该是判断未初始化的原始数据
                  if (this._activeObject!.dataSource.isCreatedFsm(varID)) {
                    VE_ErrorManager.add(VE_Error.error(table.pos(i, 5), "对象名：" + this._activeObject!.objectID + "，局部变量：" + table.getData(i, 5) + "，局部变量名不能与状态名相同，当前状态已创建，请检查！", table.ID))
                    return false;
                  }
                  this._activeObject!.varData.addVariable(varID, para2Array, table.pos(i, 5));
                }
                else if (this._currentType === AnalisysType.Template) {
                  if (this._activeTemplate!.varData.isCreatedVariable(varID)) {
                    VE_ErrorManager.add(VE_Error.error(table.pos(i, 5), "模板对象名：" + this._activeTemplate!.templateID + "，局部变量：" + table.getData(i, 5) + "，当前局部变量名已创建，请检查！", table.ID))
                    return false;
                  }
                  // 状态重复判断，应该是判断未初始化的原始数据
                  if (this._activeTemplate!.dataSource.isCreatedFsm(varID)) {
                    VE_ErrorManager.add(VE_Error.error(table.pos(i, 5), "模板对象名：" + table.getData(i, 5) + "，当前局部变量所属未知，格式错误，请检查！", table.ID))
                    return false;
                  }
                  this._activeTemplate!.varData.addVariable(varID, para2Array, table.pos(i, 5));
                }
                else {
                  VE_ErrorManager.add(VE_Error.error(table.pos(i, 5), "局部变量：" + table.getData(i, 5) + "，当前局部变量所属未知，格式错误，请检查！", table.ID))
                  return false;
                }
              } else {
                VE_ErrorManager.add(VE_Error.error(table.pos(i, 5), "局部公式变量：" + table.getData(i, 5) + "，当前局部公式变量格式不正确，请检查！", table.ID))
                return false;
              }
            }
          }
          // 局部变量，一般变量，模板变量或者公式变量
          else {
            let varArray: string[] = VE_StringFormat.paraSegment(paraData);
            if (varArray.length === 2 || varArray.length === 3) {
              let varID: string = varArray[0].trim();
              if (!VE_StringFormat.isIDLegal(varID)) {
                VE_ErrorManager.add(VE_Error.error(table.pos(i, 5), "变量：" + table.getData(i, 5) + "，当前变量名不合法，包含非法字符，请检查！", table.ID))
                return false;
              }
              let paraArray: string[] = [varArray[1].trim()];
              if (varArray.length === 2) {
                paraArray[1] = '';
              } else {
                paraArray[1] = varArray[2].trim();
              }
              // 判断是模板变量，还是对象变量，注意：局部变量名与状态名也不能重合
              if (this._currentType === AnalisysType.Object) {
                if (this._activeObject!.varData.isCreatedVariable(varID)) {
                  VE_ErrorManager.add(VE_Error.error(table.pos(i, 5), "对象名：" + this._activeObject!.objectID + "，局部变量：" + table.getData(i, 5) + "，当前局部变量名已创建，请检查！", table.ID))
                  return false;
                }
                // 状态重复判断，应该是判断未初始化的原始数据
                if (this._activeObject!.dataSource.isCreatedFsm(varID)) {
                  VE_ErrorManager.add(VE_Error.error(table.pos(i, 5), "对象名：" + this._activeObject!.objectID + "，局部变量：" + table.getData(i, 5) + "，局部变量名不能与状态名相同，当前状态已创建，请检查！", table.ID))
                  return false;
                }
                this._activeObject!.varData.addVariable(varID, paraArray, table.pos(i, 5));
              }
              else if (this._currentType === AnalisysType.Template) {
                if (this._activeTemplate!.varData.isCreatedVariable(varID)) {
                  VE_ErrorManager.add(VE_Error.error(table.pos(i, 5), "模板对象名：" + this._activeTemplate!.templateID + "，局部变量：" + table.getData(i, 5) + "，当前局部变量名已创建，请检查！", table.ID))
                  return false;
                }
                // 状态重复判断，应该是判断未初始化的原始数据
                if (this._activeTemplate!.dataSource.isCreatedFsm(varID)) {
                  VE_ErrorManager.add(VE_Error.error(table.pos(i, 5), "模板对象名：" + this._activeTemplate!.templateID + "，局部变量：" + table.getData(i, 5) + "，局部变量名不能与状态名相同，当前状态已创建，请检查！", table.ID))
                  return false;
                }
                this._activeTemplate!.varData.addVariable(varID, paraArray, table.pos(i, 5));
              }
              else {
                VE_ErrorManager.add(VE_Error.error(table.pos(i, 5), "局部变量：" + table.getData(i, 5) + "，当前局部变量所属未知，格式错误，请检查！", table.ID))
                return false;
              }
            } else {
              VE_ErrorManager.add(VE_Error.error(table.pos(i, 5), "局部变量：" + table.getData(i, 5) + "，当前局部变量格式不正确，请检查！", table.ID))
              return false;
            }
          }
        }
        // （4）状态 + 触发 + 条件 + 响应 + 关联状态，多种复合情况
        else {
          // 状态解析
          if (table.getData(i, 5) !== '') {
            let paraData: string = table.getData(i, 5);
            // 状态赋值
            if (paraData.indexOf('=') > -1) {
              let stateArray: string[] = paraData.split('=');
              let fsmID: string = stateArray[0].trim();
              // 目前暂不考虑赋值公式中有等号的情况，赋值公式后面只能是常量或者已创建的变量
              if (stateArray.length === 2 && fsmID === this._lastFsmID) {
                if (this._activeFsmData === null) {
                  VE_ErrorManager.add(VE_Error.error(table.pos(i, 5), "状态赋值：" + table.getData(i, 5) + "，当前状态不属于任何对象和模板对象，请检查！", table.ID))
                  return false;
                } else {
                  let stateInfo: string[] = stateArray[1].trim().split(/,|，/);
                  let stateIndex: number = StateConst.STATE_INDEX;
                  let stateData: Nullable<VE_StateData> = null;
                  if (stateInfo.length === 2) {
                    stateInfo[0] = stateInfo[0].trim();
                    stateInfo[1] = stateInfo[1].trim();
                    if (stateInfo[1].startsWith('#')) {
                      stateIndex = parseInt(stateInfo[1].substring(1));
                      if (stateIndex === NaN) {
                        VE_ErrorManager.add(VE_Error.error(table.pos(i, 5), "状态赋值：" + table.getData(i, 5) + "，状态关联ID格式错误，状态关联标志ID写法：“状态ID=赋值，#整数ID”，当前整数转化错误！", table.ID))
                        return false;
                      }
                    } else {
                      VE_ErrorManager.add(VE_Error.error(table.pos(i, 5), "状态赋值：" + table.getData(i, 5) + "，状态关联ID格式错误，状态关联标志ID写法：“状态ID=赋值，#整数ID”，请检查！", table.ID))
                      return false;
                    }
                  }
                  stateData = new VE_StateData(this._activeFsmData, stateInfo[0].trim(), false, stateIndex);
                  this._activeFsmData.addState(stateData);
                  this._activeStateData = stateData;
                }
              } else {
                VE_ErrorManager.add(VE_Error.error(table.pos(i, 5), "状态赋值：" + table.getData(i, 5) + "，状态名：" + fsmID + "，当前状态未定义，请检查！", table.ID))
                return false;
              }
            }
            // 创建状态机
            else {
              let varArray: string[] = VE_StringFormat.paraSegment(paraData);
              if (varArray.length === 2 || varArray.length === 3 || varArray.length === 4) {
                let fsmID: string = varArray[0].trim();
                if (!VE_StringFormat.isIDLegal(fsmID)) {
                  VE_ErrorManager.add(VE_Error.error(table.pos(i, 5), "状态名：" + table.getData(i, 5) + "，当前状态名不合法，包含非法字符，请检查！", table.ID))
                  return false;
                }
                this._lastFsmID = fsmID;
                let paraArray: string[] = [varArray[1].trim()];
                if (varArray.length === 2) {
                  paraArray[1] = '';
                } else {
                  paraArray[1] = varArray[2].trim();
                }
                let stateIndex: number = StateConst.STATE_INDEX;
                if (varArray.length === 4) {
                  if (varArray[3].startsWith('#')) {
                    stateIndex = parseInt(varArray[3].substring(1));
                    if (stateIndex === NaN) {
                      VE_ErrorManager.add(VE_Error.error(table.pos(i, 5), "状态赋值：" + varArray[3] + "，状态关联ID格式错误，状态关联标志ID写法：“状态ID，变量类型，变量值，#整数ID”，当前整数转化错误！", table.ID))
                      return false;
                    }
                  } else {
                    VE_ErrorManager.add(VE_Error.error(table.pos(i, 5), "状态赋值：" + varArray[3] + "，状态关联ID格式错误，状态关联标志ID写法：“状态ID，变量类型，变量值，#整数ID”，当前整数转化错误！", table.ID))
                    return false;
                  }
                }
                // 判断是模板状态，还是对象状态，注意：局部变量名与状态名也不能重合
                if (this._currentType === AnalisysType.Object) {
                  if (this._activeObject!.varData.isCreatedVariable(fsmID)) {
                    VE_ErrorManager.add(VE_Error.error(table.pos(i, 5), "对象名：" + this._activeObject!.objectID + "，状态名：" + fsmID + "，状态名与局部变量名不能相同，当前局部变量已创建，请检查！", table.ID))
                    return false;
                  }
                  // 状态重复判断，应该是判断未初始化的原始数据
                  if (this._activeObject!.dataSource.isCreatedFsm(fsmID)) {
                    VE_ErrorManager.add(VE_Error.error(table.pos(i, 5), "对象名：" + this._activeObject!.objectID + "，状态名：" + fsmID + "，当前状态已创建，请检查！", table.ID))
                    return false;
                  }
                  // 创建状态机数据
                  this._activeObject!.dataSource.createFsm(fsmID);
                  this._activeFsmData = this._activeObject!.dataSource.getFsmData(fsmID);
                  // 初始化状态机
                  if (VeryVarManager.hasVarType(paraArray[0])) {
                    this._activeFsmData.initFsm(paraArray[0], paraArray[1]);
                    // 创建具体状态
                    let stateData: VE_StateData = new VE_StateData(this._activeFsmData, paraArray[1], true, stateIndex);
                    this._activeFsmData.addState(stateData);
                    this._activeStateData = stateData;
                  } else {
                    VE_ErrorManager.add(VE_Error.error(table.pos(i, 5), "对象名：" + this._activeObject!.objectID + "，状态名：" + fsmID + "，类型：" + paraArray[0] + "，状态类型错误，当前状态变量类型在系统中不存在，请检查！", table.ID))
                    return false;
                  }
                }
                else if (this._currentType === AnalisysType.Template) {
                  if (this._activeTemplate!.varData.isCreatedVariable(fsmID)) {
                    VE_ErrorManager.add(VE_Error.error(table.pos(i, 5), "模板对象名：" + this._activeTemplate!.templateID + "，状态名：" + fsmID + "，状态名与局部变量名不能相同，当前局部变量已创建，请检查！", table.ID))
                    return false;
                  }
                  // 状态重复判断，应该是判断未初始化的原始数据
                  if (this._activeTemplate!.dataSource.isCreatedFsm(fsmID)) {
                    VE_ErrorManager.add(VE_Error.error(table.pos(i, 5), "模板对象名：" + this._activeTemplate!.templateID + "，状态名：" + fsmID + "，当前状态已创建，请检查！", table.ID))
                    return false;
                  }
                  // 创建状态机数据
                  this._activeTemplate!.dataSource.createFsm(fsmID);
                  this._activeFsmData = this._activeTemplate!.dataSource.getFsmData(fsmID);
                  // 初始化状态机
                  if (VeryVarManager.hasVarType(paraArray[0])) {
                    this._activeFsmData.initFsm(paraArray[0], paraArray[1]);
                    // 创建具体状态
                    let stateData: VE_StateData = new VE_StateData(this._activeFsmData, paraArray[1], true, stateIndex);
                    this._activeFsmData.addState(stateData);
                    this._activeStateData = stateData;
                  } else {
                    VE_ErrorManager.add(VE_Error.error(table.pos(i, 5), "模板对象名：" + this._activeTemplate!.objectID + "，状态名：" + fsmID + "，类型：" + paraArray[0] + "，状态类型错误，当前状态变量类型在系统中不存在，请检查！", table.ID))
                    return false;
                  }
                }
                else {
                  VE_ErrorManager.add(VE_Error.error(table.pos(i, 5), "局部变量：" + table.getData(i, 5) + "，当前局部变量所属未知，格式错误，请检查！", table.ID))
                  return false;
                }
              } else {
                VE_ErrorManager.add(VE_Error.error(table.pos(i, 5), "状态：" + table.getData(i, 5) + "，当前状态格式不正确，应为“状态名，类型，初始值”的形式，请检查！", table.ID))
                return false;
              }
            }
          }

          // 触发解析
          if (table.getData(i, 2) !== '') {
            if (this._activeFsmData === null || this._activeStateData === null) {
              VE_ErrorManager.add(VE_Error.error(table.pos(i, 2), "触发：" + table.getData(i, 2) + "，当前触发不属于任何对象和模板对象，请检查！", table.ID))
              return false;
            }
            // 触发定义不为空，则加入到DataSource中，并且判断重复性
            let triggerID: string = table.getData(i, 2);
            if (!VE_StringFormat.isIDLegal(triggerID)) {
              VE_ErrorManager.add(VE_Error.error(table.pos(i, 2), "触发名：" + table.getData(i, 2) + "，当前触发名不合法，包含非法字符，请检查！", table.ID))
              return false;
            }
            if (table.getData(i, 3) !== '') {
              if (!this._activeFsmData!.dataSource.isCreatedTrigger(triggerID)) {
                this._activeFsmData!.dataSource.addTrigger(triggerID, VE_StringFormat.paraSegment(table.getData(i, 3)));
              } else {
                VE_ErrorManager.add(VE_Error.error(table.pos(i, 2), "触发：" + table.getData(i, 2) + "，当前触发已在该对象中定义，请勿重复定义，请检查！", table.ID))
                return false;
              }
            }

            // 触发数据加入StateData中
            let triggerData: VE_StateTriggerData = new VE_StateTriggerData(triggerID);
            this._activeStateData.addTrigger(triggerData);

            // 触发启动条件
            if (table.getData(i, 1) !== '') {
              triggerData.logicalSwitch = table.getData(i, 1);
            }

            // 触发逻辑条件
            if (table.getData(i, 4) !== '') {
              triggerData.logicalExp = table.getData(i, 4);
            }
          } else {
            // 触发启动条件
            if (table.getData(i, 1) !== '') {
              VE_ErrorManager.add(VE_Error.error(table.pos(i, 1), "触发启动条件：" + table.getData(i, 1) + "，当前无触发，请勿定义触发启动条件，请检查！", table.ID))
              return false;
            }

            // 关联状态逻辑条件
            if (table.getData(i, 4) !== '') {
              if (this._activeFsmData === null || this._activeStateData === null) {
                VE_ErrorManager.add(VE_Error.error(table.pos(i, 4), "状态逻辑条件：" + table.getData(i, 4) + "，当前状态逻辑条件不属于任何对象和模板对象，请检查！", table.ID))
                return false;
              }
              if (this._activeStateData.logicalExp !== '') {
                VE_ErrorManager.add(VE_Error.error(table.pos(i, 4), "状态逻辑条件：" + table.getData(i, 4) + "，在状态的某个值中，无触发的状态逻辑条件只能填写1个，作为关联状态的逻辑条件，此处为第2个，不符合规则，请检查！", table.ID))
                return false;
              } else {
                this._activeStateData.logicalExp = table.getData(i, 4);
              }
            }

            if (table.getData(i, 3) !== '') {
              VE_ErrorManager.add(VE_Error.warning(table.pos(i, 3), "触发参数：" + table.getData(i, 3) + "，该处无触发定义，但是填写了触发参数，请检查！", table.ID))
            }
          }

          // 响应解析
          if (table.getData(i, 6) !== '') {
            if (this._activeFsmData === null || this._activeStateData === null) {
              VE_ErrorManager.add(VE_Error.error(table.pos(i, 6), "响应：" + table.getData(i, 6) + "，当前响应不属于任何对象和模板对象，请检查！", table.ID))
              return false;
            }
            // 特殊调试响应
            let tempStr: string = table.getData(i, 6).toLowerCase();
            if (tempStr.startsWith('log(') || tempStr.startsWith('log（') || tempStr.startsWith('调试（') || tempStr.startsWith('调试(')) {
              let newActionID: string = project_name + '___' + StateConst.LogCount++;
              let actionData: VE_StateActionData = new VE_StateActionData(newActionID, 'true', 'false');
              this._activeStateData.addAction(actionData);
              let actionPara: string = table.getData(i, 6).substring(4);
              if (tempStr.startsWith('调试')) {
                actionPara = table.getData(i, 6).substring(3);
              }
              this._activeFsmData.dataSource.addAction(newActionID, ['调试', '调试', actionPara.substring(0, actionPara.length - 1)], ['false', 'false']);
              if (table.getData(i, 7) !== '') {
                VE_ErrorManager.add(VE_Error.warning(table.pos(i, 7), "响应参数：" + table.getData(i, 7) + "，该处不应该再有响应定义，但是填写了响应参数，请检查！", table.ID))
              }
            }
            else if (tempStr.startsWith('error(') || tempStr.startsWith('error（') || tempStr.startsWith('错误（') || tempStr.startsWith('错误(')) {
              let newActionID: string = project_name + '___' + StateConst.LogCount++;
              let actionData: VE_StateActionData = new VE_StateActionData(newActionID, 'true', 'false');
              this._activeStateData.addAction(actionData);
              let actionPara: string = table.getData(i, 6).substring(6);
              if (tempStr.startsWith('错误')) {
                actionPara = table.getData(i, 6).substring(3);
              }
              this._activeFsmData.dataSource.addAction(newActionID, ['调试', '错误', actionPara.substring(0, actionPara.length - 1)], ['false', 'false']);
              if (table.getData(i, 7) !== '') {
                VE_ErrorManager.add(VE_Error.warning(table.pos(i, 7), "响应参数：" + table.getData(i, 7) + "，该处不应该再有响应定义，但是填写了响应参数，请检查！", table.ID))
              }
            }
            else if (tempStr.startsWith('warn(') || tempStr.startsWith('warn（') || tempStr.startsWith('警告（') || tempStr.startsWith('警告(')) {
              let newActionID: string = project_name + '___' + StateConst.LogCount++;
              let actionData: VE_StateActionData = new VE_StateActionData(newActionID, 'true', 'false');
              this._activeStateData.addAction(actionData);
              let actionPara: string = table.getData(i, 6).substring(5);
              if (tempStr.startsWith('警告')) {
                actionPara = table.getData(i, 6).substring(3);
              }
              this._activeFsmData.dataSource.addAction(newActionID, ['调试', '警告', actionPara.substring(0, actionPara.length - 1)], ['false', 'false']);
              if (table.getData(i, 7) !== '') {
                VE_ErrorManager.add(VE_Error.warning(table.pos(i, 7), "响应参数：" + table.getData(i, 7) + "，该处不应该再有响应定义，但是填写了响应参数，请检查！", table.ID))
              }
            }
            else if (table.getData(i, 6).indexOf('=') > -1) {
              if (table.getData(i, 7) !== '') {
                VE_ErrorManager.add(VE_Error.warning(table.pos(i, 7), "响应参数：" + table.getData(i, 7) + "，该处不应该再有响应定义，但是填写了响应参数，请检查！", table.ID))
              }

              // 允许“=”后面直接赋值 公式
              let equalIndex: number = table.getData(i, 6).indexOf('=');
              let actionData: VE_StateActionData = new VE_StateActionData('');
              actionData.setAssignmentAction(table.getData(i, 6), table.getData(i, 6).substring(0, equalIndex).trim(), table.getData(i, 6).substring(equalIndex + 1).trim());
              this._activeStateData.addAction(actionData);
            }
            else {
              // 响应ID
              let actionArray: string[] = VE_StringFormat.paraSegment(table.getData(i, 6));
              if (actionArray.length === 2 || actionArray.length === 3 || actionArray.length === 4) {
                let actionData: VE_StateActionData;
                if (actionArray.length === 2) {
                  actionData = new VE_StateActionData(actionArray[0], actionArray[1]);
                } else if (actionArray.length === 3) {
                  actionData = new VE_StateActionData(actionArray[0], actionArray[1], actionArray[2]);
                } else {
                  actionData = new VE_StateActionData(actionArray[0], actionArray[1], actionArray[2], actionArray[3]);
                }
                this._activeStateData.addAction(actionData);
              } else {
                VE_ErrorManager.add(VE_Error.error(table.pos(i, 6), "响应：" + table.getData(i, 6) + "，响应格式不正确，应为“响应ID，启动标志（bool），每帧运行标志（bool）”的形式，请检查！", table.ID))
                return false;
              }

              // 响应定义
              if (table.getData(i, 7) !== '') {
                if (!VE_StringFormat.isIDLegal(actionArray[0])) {
                  VE_ErrorManager.add(VE_Error.error(table.pos(i, 6), "响应名：" + table.getData(i, 6) + "，当前响应名不合法，包含非法字符，请检查！", table.ID))
                  return false;
                }
                if (!this._activeFsmData.dataSource.isCreatedAction(actionArray[0])) {
                  if (actionArray.length == 2) {
                    this._activeFsmData.dataSource.addAction(actionArray[0], VE_StringFormat.paraSegment(table.getData(i, 7)), [actionArray[1], 'false']);
                  } else {
                    this._activeFsmData.dataSource.addAction(actionArray[0], VE_StringFormat.paraSegment(table.getData(i, 7)), [actionArray[1], actionArray[2]]);
                  }
                } else {
                  VE_ErrorManager.add(VE_Error.error(table.pos(i, 6), "响应：" + table.getData(i, 6) + "，当前响应已在该对象中定义，请勿重复定义，请检查！", table.ID))
                  return false;
                }
              }
            }
          } else {
            if (table.getData(i, 7) !== '') {
              VE_ErrorManager.add(VE_Error.warning(table.pos(i, 7), "响应参数：" + table.getData(i, 7) + "，该处无响应定义，但是填写了响应参数，请检查！", table.ID))
            }
          }

          // 关联状态解析
          if (table.getData(i, 8) !== '') {
            if (this._activeFsmData === null || this._activeStateData === null) {
              VE_ErrorManager.add(VE_Error.error(table.pos(i, 8), "关联状态：" + table.getData(i, 8) + "，当前关联状态不属于任何对象和模板对象，请检查！", table.ID))
              return false;
            }
            this._activeStateData!.addAssociatedState(table.getData(i, 8));
          }
        }
      }

      return CreateInstance.createProject(project_name);
    } else {
      VE_ErrorManager.add(VE_Error.error('', '表格内容不存在，引擎无法启动！', 'null'));
      return false;
    }

  }


}