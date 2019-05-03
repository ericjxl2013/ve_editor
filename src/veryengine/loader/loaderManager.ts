import { VeryTable } from "src/verytable";

export class LoaderManager {

  private _table: VeryTable;

  constructor(table: VeryTable) {
    this._table = table;

  }

  public load(project_name: string): boolean {
    

    return true;
  }


}