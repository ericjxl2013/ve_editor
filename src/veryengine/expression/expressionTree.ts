export interface ExpressTree {
  expType: string;
  evaluate(): any;
  clone(): ExpressTree;
}