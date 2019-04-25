import { ExpressTree } from "./expressionTree";

export class TrueTree implements ExpressTree {
  public get expType(): string {
    return 'bool';
  }

  constructor() {

  }

  evaluate(): any {
    return true;
  }
  clone(): ExpressTree {
    let exp: TrueTree  = new TrueTree();
    return exp;
  }
}