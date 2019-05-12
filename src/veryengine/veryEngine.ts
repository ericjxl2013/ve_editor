import { VeryTable } from "../verytable/index";
import { ShowError } from "./html/showError";
import { LoaderManager } from "./loader/loaderManager";
import { ErrorInfo } from "./utility";
import { IVeryVar, VeryVarManager, VeryBool } from "./variables";
import { VE_Expressions } from "./expression";
import { VE_ErrorManager } from "./global";

// 导出entrance
export * from "./index";

export class VeryEngine {

  public static Canvas: HTMLCanvasElement;
  public static Engine: BABYLON.Engine;
  public static Scene: BABYLON.Scene;


  constructor() {

  }


  public init(data: Array<Array<string>>, project_name: string): void {
    // TODO: 之后可能s会变成多个Table，暂时未1个
    let tableData: VeryTable = new VeryTable(data, 'VeRyEngine');
    // console.log(tableData.pos(7, 5));
    // console.log(tableData);
    console.log('开始');

    VeryVarManager.addVarType('bool', new VeryBool());

    // let errorInfo: ErrorInfo = new ErrorInfo();
    // let v1: Nullable<IVeryVar> = VeryVarManager.createVariable('a', '数字', '3.1415926', errorInfo);
    // console.log(v1!.getValue());
    // errorInfo.clear();
    // let v2: Nullable<IVeryVar> = VeryVarManager.createVariable('b', '开关', '开', errorInfo);
    // console.log(v2!.getValue());
    // errorInfo.clear();
    // let v3: Nullable<IVeryVar> = VeryVarManager.createVariable('c', '向量', '1,2,3', errorInfo);
    // console.log(v3!.clone());
    // errorInfo.clear();
    // let v4: Nullable<IVeryVar> = VeryVarManager.createVariable('c', '向量', 'ac1,dg2,3', errorInfo);
    // console.log(v4);
    // console.log(errorInfo.message);


    let manager: LoaderManager = new LoaderManager();
    let result: boolean = manager.load(projectName, tableData);
    console.log(result);
    if(!result) {
      VE_ErrorManager.print();
    }



    // this.showErrorTest(tableData);
  }


  public showErrorTest(tableData: VeryTable): void {
    // /*
    ShowError.show('大股东萨芬个是电饭锅三分隔收费的发大股东萨芬个是电饭锅三分隔收费的发大股东萨芬个是电饭锅三分隔收费的发大股东萨芬个是电饭锅三分隔收费的发大股东萨芬个是电饭锅三分隔收费的发大股东萨芬个是电饭锅三分隔收费的发，错误位置：' + tableData.pos(7, 5));

    ShowError.showError('大股东萨芬个是电饭锅三分隔收费的发，错误位置：' + tableData.pos(7, 5));

    ShowError.showWarn('大股东萨芬个是电饭锅三分隔收费的发，错误位置：' + tableData.pos(7, 5));

    ShowError.show('大股东萨芬个是电饭锅三分隔收费的发，错误位置：' + tableData.pos(7, 5));

    ShowError.show('大股东萨芬个是电饭锅三分隔收费的发，错误位置：' + tableData.pos(7, 5));


    document.getElementById("settingsButton")!.addEventListener("click", ShowError.close);
    // */
  }

}