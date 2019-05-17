import { BabylonEngine } from "./engine";

export class Time {
  
  public static get frameCount(): number {
    return this._frame;
  }
  private static _frame: number = 0;


  public static get deltaTime(): number {
    // return 1.0 / GameGlobal.Engine.getFps();
    return BabylonEngine.Engine.getDeltaTime() * 0.001;
  }

  public static _sum(): void {
    this._frame++;
  }
}