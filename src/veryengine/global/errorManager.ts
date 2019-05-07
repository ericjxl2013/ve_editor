import { Severity } from "../enum";

export class VE_Error {
  private _pos: string = '';
  private _message: string = '';
  private _tableName: string = '';
  private _severity: Severity = Severity.Error;

  /**
   * 实例化报错信息数据结构；
   * @param pos 错误信息位置；
   * @param message 错误信息内容；
   * @param table_name 错误文件路径；
   * @param severity 报警类型；
   */
  constructor(pos: string, message: string, table_name: string, severity: Severity) {
    this._pos = pos;
    this._message = message;
    this._severity = severity;
    this._tableName = table_name;
  }

  /**
   * 实例化警告类型报错信息；
   * @param pos 错误信息位置；
   * @param msg 错误信息内容；
   * @param table_name 错误文件路径；
   */
  public static warning(pos: string, msg: string, table_name: string): VE_Error {
    return new VE_Error(pos, msg, table_name, Severity.Warning);
  }

  /**
   * 实例化错误类型报错信息；
   * @param pos 错误信息位置；
   * @param msg 错误信息内容；
   * @param table_name 表格名；
   */
  public static error(pos: string, msg: string, table_name: string): VE_Error {
    return new VE_Error(pos, msg, table_name, Severity.Error);
  }

  /**
   * 获取错误信息位置；
   */
  public getPos(): string {
    return this._pos;
  }

  /**
   * 获取错误信息；
   */
  public getMessage(): string {
    return this._message;
  }

  /**
   * 获取错误信息文件路径；
   */
  public getTableName(): string {
    return this._tableName;
  }

  /**
   * 获取错误信息类型；
   */
  public getSeverity(): Severity {
    return this._severity;
  }

  public toString(): string {
    return "位置：" + this._pos + "，错误信息：" + this._message + "，表格名：" + this._tableName;
  }
}


export class VE_ErrorManager {

  private static _errorList: VE_Error[] = [];

  /// <summary>
  /// 当前错误个数；
  /// </summary>
  public static get count() {
    return this._errorList.length;
  }

  /// <summary>
  /// 添加报错信息；
  /// </summary>
  /// <param name="error">具体报错信息数据结构；</param>
  public static add(error: VE_Error): void {
    this._errorList.push(error);
  }

  /// <summary>
  /// 获取具体的报错信息；
  /// </summary>
  /// <param name="index">报错信息索引；</param>
  /// <returns>具体报错信息数据结构；</returns>
  public static getError(index: number): VE_Error {
    return this._errorList[index];
  }

  /// <summary>
  /// TODO: 所有报错打印，打印完删除相关信息；
  /// </summary>
  /// <param name="prefix">报错信息前缀；</param>
  public static print(prefix?: string): void {
    if (prefix) {
      for (let i: number = 0; i < this._errorList.length; i++) {
        if (this._errorList[i].getSeverity() === Severity.Error) {
          console.log('错误：' + prefix + " -> " + this._errorList[i].toString());
          this._errorList.splice(i, 1);
          i--;
        }
        else if (this._errorList[i].getSeverity() === Severity.Warning) {
          console.log('警告：' + prefix + " -> " + this._errorList[i].toString());
          this._errorList.splice(i, 1);
          i--;
        }
      }
    } else {
      for (let i: number = 0; i < this._errorList.length; i++) {
        if (this._errorList[i].getSeverity() === Severity.Error) {
          console.log('错误：' + this._errorList[i].toString());
          this._errorList.splice(i, 1);
          i--;
        }
        else if (this._errorList[i].getSeverity() === Severity.Warning) {
          console.log('警告：' + this._errorList[i].toString());
          this._errorList.splice(i, 1);
          i--;
        }
      }
    }
  }

  /// <summary>
  /// 所有报警打印，打印完删除相关信息；
  /// </summary>
  /// <param name="prefix">报警信息前缀；</param>
  public static printWarnning(prefix?: string): void {
    if (prefix) {
      for (let i: number = 0; i < this._errorList.length; i++) {
        if (this._errorList[i].getSeverity() === Severity.Warning) {
          console.log('警告：' + prefix + " -> " + this._errorList[i].toString());
          this._errorList.splice(i, 1);
          i--;
        }
      }
    } else {
      for (let i: number = 0; i < this._errorList.length; i++) {
        if (this._errorList[i].getSeverity() === Severity.Warning) {
          console.log('警告：' + this._errorList[i].toString());
          this._errorList.splice(i, 1);
          i--;
        }
      }
    }
  }

  /// <summary>
  /// 所有错误打印，打印完删除相关信息；
  /// </summary>
  /// <param name="prefix">报错信息前缀；</param>
  public static printError(prefix: string): void {
    if (prefix) {
      for (let i: number = 0; i < this._errorList.length; i++) {
        if (this._errorList[i].getSeverity() === Severity.Error) {
          console.log('错误：' + prefix + " -> " + this._errorList[i].toString());
          this._errorList.splice(i, 1);
          i--;
        }
      }
    } else {
      for (let i: number = 0; i < this._errorList.length; i++) {
        if (this._errorList[i].getSeverity() === Severity.Error) {
          console.log('错误：' + prefix + " -> " + this._errorList[i].toString());
          this._errorList.splice(i, 1);
          i--;
        }
      }
    }
  }
}