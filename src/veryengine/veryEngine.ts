import { VeryTable } from "../verytable/index";
import { ShowError } from "./html/showError";

// 导出entrance
export * from "./index";

export class VeryEngine {

  public static Canvas: HTMLCanvasElement;
  public static Engine: BABYLON.Engine;
  public static Scene: BABYLON.Scene;


  constructor() {

  }


  init(data: Array<Array<string>>, project_name: string): void {
    // TODO: 之后可能会变成多个Table，暂时未1个
    let tableData: VeryTable = new VeryTable(data);
    console.log(tableData.pos(7, 5));




    // this.showErrorTest(tableData);
  }


  showErrorTest(tableData: VeryTable): void {
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