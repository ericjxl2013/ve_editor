/**字典数据结构类 */
export class Dictionary<KT, VT> {
  private _keys: KT[] = [];
  private _values: VT[] = [];
  public get count(): number {
    return this.Count();
  }

  public constructor() {
  }

  /**给字典增加一条数据,返回字典的长度 */
  public Add(key: any, value: any): number {
    this._keys.push(key);
    return this._values.push(value);
  }

  public Remove(key: any) {
    var index = this._keys.indexOf(key, 0);
    this._keys.splice(index, 1);
    this._values.splice(index, 1);
  }

  private Count(): number {
    return this._keys.length;
  }

  /**直接使用SetValue()修改已经存在的字典数据项 */
  public SetValue(key: any, value: any): boolean {
    var index = this._keys.indexOf(key, 0);
    if (index != -1) {
      this._keys[index] = key;
      this._values[index] = value;
      return true;
    }
    return false;
  }

	/**
	 *返回字典数据；
	 */
  public GetValue(key: KT): VT | null {
    var index = this._keys.indexOf(key, 0);
    if (index != -1) {
      return this._values[index];
    } else {
      return null;
    }
  }

  public ContainsKey(key: any): boolean {
    let ks = this._keys;
    for (let i = 0; i < ks.length; ++i) {
      if (ks[i] == key) {
        return true;;
      }
    }
    return false;
  }

  public GetKeys(): KT[] {
    return this._keys;
  }

  public GetValues(): VT[] {
    return this._values;
  }
}