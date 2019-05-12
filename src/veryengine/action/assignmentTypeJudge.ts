import { IVeryVar } from "../variables";
import { IExpression } from "../expression";

export class VE_AssignmentTypeJudge {

  public static allow(first: IVeryVar, second: IVeryVar): boolean {
    if (first.varType === second.varType) {
      return true;
    }
    else {
      return false;
    }
  }

  public static allowExpression(first: IVeryVar, second: IExpression): boolean {
    if (first.varType === second.expType) {
      return true;
    }
    else {
      return false;
    }
  }

}