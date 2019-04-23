// import { VeryTableRow } from "./veryTableRow";
/**
 * 1. 主要使用TypeScript进行开发，掌握其一般开发流程，从项目建立到发布最终的生产代码（打包、合并、编译等）；
 * 2. 实际使用过程：在浏览器代码中，点击运行代码
 */
import { VeryTable } from "./veryTable";

export class VeryTableSet {

  private _tables: VeryTable[] = [];

  public get Count(): number {
    if (!this._tables) {
      return 0;
    } else {
      return this._tables.length;
    }
  }

  constructor(tables?: VeryTable[]) {
    if (tables) {
      this._tables = tables;
    }
  }

  public getTable(index: number): VeryTable | undefined {
    if (index >= 0 && index < this.Count) {
      return this._tables[index];
    } else {
      return undefined;
    }
  }

  public addTable(table: VeryTable): void {
    this._tables.push(table);
  }

  public removeTable(index: number): void {
    if (index >= 0 && index < this.Count) {
      this._tables.splice(index, 1);
    }
  }


}