import { VeryEngine } from "../veryEngine";

export class Time {
  
  public static get frameCount(): number {
    return this._frame;
  }
  private static _frame: number = 0;


  public static get deltaTime(): number {
    // return 1.0 / GameGlobal.Engine.getFps();
    return VeryEngine.Engine.getDeltaTime() / 1000;
  }

  public static _sum(): void {
    this._frame++;
  }
}