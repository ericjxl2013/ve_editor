import { ErrorInfo } from "./errorInfo";

export class VE_TypeConvert {


  public static boolConvert(info: string, errorInfo: ErrorInfo): boolean {
    info = info.toLowerCase().trim();
    if(info === 'true' || info === '开') {
      return true;
    } else if(info === 'false' || info === '关') {
      return false;
    } else {
      errorInfo.isRight = false;
      errorInfo.message = 'bool|开关类型转换错误，格式不正确，原始字符串：' + info;
      return false;
    }
  }

  public static intConvert(info: string, errorInfo: ErrorInfo): number {
    info = info.toLowerCase().trim();
    let num: number = parseFloat(info);
    if(isNaN(num)) {
      errorInfo.isRight = false;
      errorInfo.message = 'number|数字类型转化错误，格式不正确，原始字符串：' + info;
      return - 1;
    } else {
      return Math.round(num);
    }
  }

  public static floatConvert(info: string, errorInfo: ErrorInfo): number {
    info = info.toLowerCase().trim();
    let num: number = parseFloat(info);
    if(isNaN(num)) {
      errorInfo.isRight = false;
      errorInfo.message = 'number|数字类型转化错误，格式不正确，原始字符串：' + info;
      return - 1;
    } else {
      return num;
    }
  }


}