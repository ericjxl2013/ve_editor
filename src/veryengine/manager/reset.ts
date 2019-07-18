import { VE_Manager } from "./manager";

export class VE_Reset {

  private static _clearTotal: (() => void)[] = [];
  private static _clearProject: ((project_name: string) => void)[] = [];


  constructor() {

  }

  public static dispose(): void {

    // 对象
    VE_Manager.clear();

    // 变量

    // 触发

    // 响应

  }

  public static addClear(callback: () => void): void {
    this._clearTotal.push(callback);
  }

  public static addProjectClear(callback: (project_name: string) => void): void {
    this._clearProject.push(callback);
  }

  public static clear(): void {
    this._clearTotal.forEach((value => {
      value();
    }))
  }

  public static clearProject(project_name: string): void {
    this._clearProject.forEach((value, index: number) => {
      value(project_name);
    })
  }


}