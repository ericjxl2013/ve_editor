import { VeryTableRow } from "./veryTableRow";

export class VeryTable {
  private _id: string = "";
  public get ID(): string {
    return this._id;
  }
  public set ID(id: string) {
    this._id = id;
  }

  private _columnIDs: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

  private _rows: VeryTableRow[] = [];

  public get RowCount(): number {
    if (!this._rows) {
      return 0;
    } else {
      return this._rows.length;
    }
  }

  constructor(data: string[][], id = "默认Sheet") {
    this._id = id;
    this._rows = [];
    if (data) {
      for (let i = 0; i < data.length; i++) {
        let newRow = new VeryTableRow(data[i]);
        this._rows.push(newRow);
      }
    }
  }

  /**
   * 根据行序号和列序号获取表格数据
   * @param row_index 行序号
   * @param column_index 列序号
   */
  public getData(row_index: number, column_index: number): string {
    // if (row_index >= 0 && row_index < this._rows.length) {
    //   let row: VeryTableRow = this._rows[row_index];
    //   return row.getData(column_index);
    // } else {
    //   return undefined;
    // }
    return this._rows[row_index].getData(column_index);
  }

  /**
   * 根据行号返回行数据
   * @param row_index 行序号
   */
  public getRow(row_index: number): VeryTableRow | undefined {
    if (row_index >= 0 && row_index < this._rows.length) {
      return this._rows[row_index];
    } else {
      return undefined;
    }
  }

  /**
   * 获取表格位置
   * @param row_index 行序号
   * @param column_index 列序号
   */
  public pos(row_index: number, column_index: number): string {
    return "表名：" + this.ID + "，位置：（" + (row_index + 1) + "，" + this.getColumnID(column_index) + "）";
  }

  /**
   * 根据列序号获取列ID，序号超过26以后，需要进行计算
   * @param column_index 列序号
   */
  private getColumnID(column_index: number): string {
    if (column_index >= 0 && column_index < 26) {
      return this._columnIDs[column_index];
    } else if (column_index < 0) {
      return 'error';
    } else {
      let a: number = Math.floor(column_index / 26);
      let b: number = column_index % 26;
      if (a === 0) {
        return this._columnIDs[a];
      } else {
        return this._columnIDs[a - 1] + this._columnIDs[b];
      }
    }
  }

  // public addRowStringArray(row_data: string[]): void {

  // }

  // public addRowStrings(...strs: string[]): void {

  // }

  public addRow(data: VeryTableRow): void {
    // 
    this._rows.push(data);

  }


}