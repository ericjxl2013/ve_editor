import { VeryEngineObject } from "./veryengineObject";
import { ArrayUtility } from "../utility";

export class VE_Objects {

  public get projectName(): string {
    return this._projectName;
  }
  private _projectName: string = '';

  private _objectIDs: string[] = [];
  private _objectDics: { [key: string]: VeryEngineObject } = {};

  public get count(): number {
    return this._objectIDs.length;
  }

  constructor(project_name: string) {
    this._projectName = project_name;
  }

  public isCreated(object_id: string): boolean {
    if (this._objectDics[object_id]) {
      return true;
    } else {
      return false;
    }
  }

  public add(object_id: string, very_object: VeryEngineObject): void {
    if (!this.isCreated(object_id)) {
      this._objectIDs.push(object_id);
      this._objectDics[object_id] = very_object;
    }
  }

  public getObjectID(index: number): string {
    if(index >= 0 && index < this._objectIDs.length) {
      return this._objectIDs[index];
    } else {
      return '';
    }
  }

  public getVeryObject(object_id: string): VeryEngineObject {
    return this._objectDics[object_id];
  }

  public unloadObject(object_id: string): void {
    // this._objectIDs.re
    ArrayUtility.remove(this._objectIDs, object_id);
    delete this._objectDics.object_id;

  }

  public clear(): void {
    for(let i: number = 0; i < this._objectIDs.length; i++) {
      let tempObject = this._objectDics[this._objectIDs[i]];
      if(tempObject) {
        tempObject.clear();
      }
    }
    this._objectIDs = [];
    this._objectDics = {};
  }
}