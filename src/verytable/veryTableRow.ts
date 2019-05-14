
export class VeryTableRow {
  public get Count(): number {
    if (!this._rowData) {
      return 0;
    } else {
      return this._rowData.length;
    }
  }

  private _rowData: string[] = [];

  constructor(row_data: string[]) {
    // null或者undefined数据转为""
    row_data.forEach((val, index, array) => {
      if(!array[index]) {
        array[index] = "";
      }
    });
    this._rowData = row_data;
  }

  /**
   * 根据列序号获取表格数据
   * @param column_index 列序号
   */
  public getData(column_index: number): string {
    // if (column_index >= 0 && column_index < this.Count) {
    //   return this._rowData[column_index];
    // } else {
    //   return undefined;
    // }
    return this._rowData[column_index];
  }

  public add(data: string): void {
    this._rowData.push(data);
  }

  public insert(index: number, data: string): void {
    // 先将数组一分为二，在第2个
    this._rowData.push(data);
    let tempData = this._rowData.slice(index);
    tempData.push(data);
    this._rowData = tempData;
  }

  public remove(index: number): void {
    this._rowData.splice(index, 1);
  }

  public removeEnd(): void {
    this._rowData.pop();
  }

  public isEmpty(): boolean {
    if(!this._rowData) {
      return true;
    }
    for(let i: number = 0; i < this._rowData.length; i++) {
      if(!this._rowData[i] && this._rowData[i] !== '') {
        return false;
      }
    }
    return true;
  }

  // public

  // public remove(index: number): any {

  // }
}