import { ErrorInfo } from "../utility/errorInfo";

export interface IVeryVar {
  varType: string;
  className: string;
  setValue(val: any): void;
  getValue(): any;
  initValue(value_str: string, error_info: ErrorInfo): any;
  clone(): IVeryVar;
}