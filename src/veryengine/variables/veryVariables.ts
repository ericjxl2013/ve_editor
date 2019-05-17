import { IVeryVar } from "./IVeryVar";
import { ErrorInfo } from "../utility/errorInfo";
import { VeryVarManager } from "./veryVarManager";
import { GameObject } from "../babylon/babylonVariables";
import { VeryExpression } from "./veryExpression";

export class VeryBool implements IVeryVar {
  public get varType(): string {
    return "bool|开关";
  }

  public get className(): string {
    return "VeryBool";
  }

  private _isExpression: boolean = false;
  private _expression: Nullable<VeryExpression> = null;

  public get value(): boolean {
    if (this._isExpression) {
      return this._expression!.value.evaluate();
    }
    return this._value;
  }
  public set value(val: boolean) {
    this._value = val;
  }
  private _value: boolean = false;

  constructor() {
    this._value = false;
  }

  public setValue(val: any): void {
    this._value = val;
  }

  public getValue(): any {
    if (this._isExpression) {
      return this._expression!.value.evaluate();
    }
    return this._value;
  }

  public setExpression(expression: VeryExpression): void {
    this._expression = expression;
    this._isExpression = true;
  }

  public initValue(value_str: string, error_info: ErrorInfo): any {
    value_str = value_str.trim();
    if (value_str.toLowerCase() === "false" || value_str === "关") {
      return false;
    } else if (value_str.toLowerCase() === "true" || value_str === "开") {
      return true;
    } else if (
      value_str === "" ||
      value_str.toLowerCase() === "null" ||
      value_str.toLowerCase() === "none"
    ) {
      return false;
    } else {
      error_info.isRight = false;
      error_info.message =
        "类型: " +
        this.varType +
        "，值：" +
        value_str +
        "，该变量值和类型不匹配，转化错误，请检查！";
      return null;
    }
  }

  public clone(): IVeryVar {
    let varClone: VeryBool = new VeryBool();
    varClone.setValue(this._value);
    return varClone;
  }
}

export class VeryInt implements IVeryVar {
  public get varType(): string {
    return "int|整数";
  }

  public get className(): string {
    return "VeryInt";
  }

  public get value(): number {
    return Math.round(this._value);
  }
  public set value(val: number) {
    this._value = Math.round(val);
  }
  private _value: number = 0;

  constructor() {
    this._value = 0;
  }

  public getValue(): any {
    return this.value;
  }

  public setValue(val: any): void {
    this.value = val;
  }

  public initValue(value_str: string, error_info: ErrorInfo): any {
    // 先转化为float，直接使用parseInt没有四舍五入的效果
    let newFloat = parseFloat(value_str);
    if (!isNaN(newFloat)) {
      // 可对float进行四舍五入
      return Math.round(newFloat);
    } else {
      error_info.isRight = false;
      error_info.message =
        "类型: " +
        this.varType +
        "，值：" +
        value_str +
        "，该变量值和类型不匹配，转化错误，请检查！";
      return null;
    }
  }

  public clone(): IVeryVar {
    let varClone: VeryInt = new VeryInt();
    varClone.setValue(this._value);
    return varClone;
  }
}

export class VeryFloat implements IVeryVar {
  public get varType(): string {
    return "float|浮点数";
  }

  public get className(): string {
    return "VeryFloat";
  }

  public get value(): number {
    return this._value;
  }
  public set value(val: number) {
    this._value = val;
  }
  private _value: number = 0;

  constructor() {
    this._value = 0;
  }

  public setValue(val: number) {
    this._value = val;
  }

  // 之后可能会有公式的情况
  public getValue(): any {
    return this._value;
  }

  public initValue(value_str: string, error_info: ErrorInfo): any {
    let newVal = parseFloat(value_str);
    if (!isNaN(newVal)) {
      return newVal;
    } else {
      error_info.isRight = false;
      error_info.message =
        "类型: " +
        this.varType +
        "，值：" +
        value_str +
        "，该变量值和类型不匹配，转化错误，请检查！";
      return null;
    }
  }

  public clone(): IVeryVar {
    let varClone: VeryFloat = new VeryFloat();
    varClone.setValue(this._value);
    return varClone;
  }
}

export class VeryNumber implements IVeryVar {
  public get varType(): string {
    return "number|数字";
  }

  public get className(): string {
    return "VeryNumber";
  }

  private _isExpression: boolean = false;
  private _expression: Nullable<VeryExpression> = null;

  public get value(): number {
    if (this._isExpression && this._expression) {
      return this._expression.value.evaluate();
    }
    return this._value;
  }
  public set value(val: number) {
    this._value = val;
  }
  private _value: number = 0;

  constructor() {
    this._value = 0;
  }

  public setValue(val: number): void {
    this._value = val;
  }

  public setExpression(expression: VeryExpression): void {
    this._expression = expression;
    this._isExpression = true;
  }

  public getValue(): any {
    if (this._isExpression && this._expression) {
      return this._expression.value.evaluate();
    }
    return this._value;
  }

  public initValue(value_str: string, error_info: ErrorInfo): any {
    let newVal = parseFloat(value_str);
    if (!isNaN(newVal)) {
      return newVal;
    } else {
      error_info.isRight = false;
      error_info.message =
        "类型: " +
        this.varType +
        "，值：" +
        value_str +
        "，该变量值和类型不匹配，转化错误，请检查！";
      return null;
    }
  }

  public clone(): IVeryVar {
    let varClone: VeryNumber = new VeryNumber();
    varClone.setValue(this._value);
    return varClone;
  }
}

export class VeryString implements IVeryVar {
  public get varType(): string {
    return "string|字符串";
  }

  public get className(): string {
    return "VeryString";
  }

  private _isExpression: boolean = false;
  private _expression: Nullable<VeryExpression> = null;

  public get value(): string {
    if (this._isExpression) {
      return this._expression!.value.evaluate().toString();
    }
    return this._value;
  }
  public set value(val: string) {
    this._value = val;
  }
  private _value: string = "";

  constructor() {
    this._value = "";
  }

  public getValue(): any {
    if (this._isExpression) {
      return this._expression!.value.evaluate().toString();
    }
    return this._value;
  }

  public setValue(val: any): void {
    this._value = val;
  }

  public initValue(value_str: string, error_info: ErrorInfo): any {
    let rValue: string;
    if (
      value_str.startsWith("'") ||
      value_str.startsWith('"') ||
      value_str.startsWith("“") ||
      value_str.startsWith("‘")
    ) {
      rValue = value_str.substring(1, value_str.length - 2);
    } else {
      rValue = value_str;
    }
    return rValue;
  }

  public clone(): IVeryVar {
    let varClone: VeryString = new VeryString();
    varClone.setValue(this._value);
    return varClone;
  }

  public setExpression(expression: VeryExpression): void {
    this._isExpression = true;
    this._expression = expression;
  }
}

export class VeryVector3 implements IVeryVar {
  public get varType(): string {
    return "vector3|向量";
  }

  public get className(): string {
    return "VeryVector3";
  }

  private _isExpression: boolean = false;
  private _expression: Nullable<VeryExpression> = null;

  public get value(): BABYLON.Vector3 {
    if (this._isExpression && this._expression) {
      return this._expression.value.evaluate();
    }
    return this._value;
  }
  public set value(val: BABYLON.Vector3) {
    this._value = val;
  }
  private _value: BABYLON.Vector3 = BABYLON.Vector3.Zero();

  constructor() {
    this._value = BABYLON.Vector3.Zero();
  }

  public getValue(): any {
    if (this._isExpression && this._expression) {
      return this._expression.value.evaluate();
    }
    return this._value;
  }

  public setValue(val: any) {
    this._value = val;
  }

  public setExpression(expression: VeryExpression): void {
    this._isExpression = true;
    this._expression = expression;
  }

  public initValue(value_str: string, error_info: ErrorInfo): any {
    let rValue: BABYLON.Vector3 = BABYLON.Vector3.Zero();
    if (value_str === "none" || value_str === "null" || value_str === "") {
      return rValue;
    } else {
      let vec3Str: string[] = value_str.split(/,|，/);
      if (vec3Str.length !== 3) {
        error_info.isRight = false;
        error_info.message =
          "类型: " +
          this.varType +
          ", 值: " +
          value_str +
          "，Vector3|向量类型值格式错误，转化错误！";
        return null;
      } else {
        let n1: number = parseFloat(vec3Str[0]);
        let n2: number = parseFloat(vec3Str[1]);
        let n3: number = parseFloat(vec3Str[2]);
        if (isNaN(n1) || isNaN(n2) || isNaN(n3)) {
          error_info.isRight = false;
          error_info.message =
            "类型: " +
            this.varType +
            ", 值: " +
            value_str +
            "，Vector3|向量类型值格式错误，转化错误！";
          return null;
        } else {
          rValue = new BABYLON.Vector3(n1, n2, n3);
        }
      }
    }
    return rValue;
  }

  public clone(): IVeryVar {
    let varClone: VeryVector3 = new VeryVector3();
    let r: BABYLON.Vector3 = new BABYLON.Vector3(
      this._value.x,
      this._value.y,
      this._value.z
    );
    varClone.setValue(r);
    return varClone;
  }
}

export class VeryGameObject implements IVeryVar {
  public get varType(): string {
    return "GameObject|对象";
  }

  public get className(): string {
    return "VeryGameObject";
  }

  public get value(): Nullable<GameObject> {
    return this._value;
  }
  public set value(val: Nullable<GameObject>) {
    this._value = val;
  }
  private _value: Nullable<GameObject> = null;

  constructor() {

  }

  public setValue(val: any) {
    this._value = val;
  }

  // 之后可能会有公式的情况
  public getValue(): any {
    return this._value;
  }

  public initValue(value_str: string, error_info: ErrorInfo): any {

    if (value_str === '' || value_str.toLowerCase() === 'null' || value_str.toLowerCase() === 'none') {
      return null;
    } else {
      let rValue: Nullable<GameObject> = GameObject.Find(value_str);
      if (rValue === null) {
        error_info.isRight = false;
        error_info.message =
          "类型: " +
          this.varType +
          "，值：" +
          value_str +
          "，在场景中找不到指定对象，请检查！";
      }
      return rValue;
    }
  }

  public clone(): IVeryVar {
    let varClone: VeryGameObject = new VeryGameObject();
    varClone.setValue(this._value);
    return varClone;
  }
}


VeryVarManager.addVarType("bool", new VeryBool());
VeryVarManager.addVarType('开关', new VeryBool());

VeryVarManager.addVarType('int', new VeryInt());
VeryVarManager.addVarType('float', new VeryFloat());

VeryVarManager.addVarType('number', new VeryNumber());
VeryVarManager.addVarType('数字', new VeryNumber());

VeryVarManager.addVarType('string', new VeryString());
VeryVarManager.addVarType('字符串', new VeryString());

VeryVarManager.addVarType('Vector3', new VeryVector3());
VeryVarManager.addVarType('向量', new VeryVector3());
VeryVarManager.addVarType('GameObject', new VeryGameObject());
VeryVarManager.addVarType('对象', new VeryGameObject());

