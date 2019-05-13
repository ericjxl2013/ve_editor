
interface HandTable {
  getData(): Array<Array<string>>;
  width: number;
  countEmptyRows(): number;
}

declare var hot1: HandTable;

declare var projectName: string;

declare function loadData2(): any ;

declare type Nullable<T> = T | null;

declare var dataLoaded: boolean;