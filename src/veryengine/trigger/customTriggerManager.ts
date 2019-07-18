export class VE_CustomTriggerManager {

  // 自定义触发，提取自定义触发函数 
  private static _customTriggerStore: { [key: string]: { [key: string]: { [key: string]: () => void } } } = {};

  //延迟响应，关联响应与自定义触发的入口
  private static _delayAction: { [key: string]: { [key: string]: { [key: string]: ((callback: () => void) => void)[] } } } = {};

  public static AddTriggerEvent(project_name: string, object_id: string, trigger_id: string, timer_event: () => void): void {
    if (!this._customTriggerStore[project_name]) {
      this._customTriggerStore[project_name] = {};
    }
    if (!this._customTriggerStore[project_name][object_id]) {
      this._customTriggerStore[project_name][object_id] = {};
    }
    this._customTriggerStore[project_name][object_id][trigger_id] = timer_event;
    // 延迟的响应与自定义触发连接
    if (this._delayAction[project_name] && this._delayAction[project_name][object_id] && this._delayAction[project_name][object_id][trigger_id]) {
      this._delayAction[project_name][object_id][trigger_id].forEach(value => {
        value(timer_event);
      });
      delete this._delayAction[project_name][object_id][trigger_id];
    }
  }

  // 先查找，若查找到，直接赋值，若查找不到，则加入delay数据结构
  public static ConnectCustomTrigger(project_name: string, object_id: string, trigger_id: string, set_callback: (callback: () => void) => void): void {
    if (this._customTriggerStore[project_name] && this._customTriggerStore[project_name][object_id] && this._customTriggerStore[project_name][object_id][trigger_id]) {
      set_callback(this._customTriggerStore[project_name][object_id][trigger_id]);
    } else {
      if (!this._delayAction[project_name]) {
        this._delayAction[project_name] = {};
      }
      if (!this._delayAction[project_name][object_id]) {
        this._delayAction[project_name][object_id] = {};
      }
      if (!this._delayAction[project_name][object_id][trigger_id]) {
        this._delayAction[project_name][object_id][trigger_id] = [set_callback];
      } else {
        this._delayAction[project_name][object_id][trigger_id].push(set_callback);
      }
    }
  }


}