import { VeryTable } from "../verytable/index";
// import { ShowError } from "../html/showError";

export class VeryEngine {


  constructor() {


  }

  
  init(data: Array<Array<string>>, project_name: string): void {
    // TODO: 之后可能会变成多个Table，暂时未1个
    let tabeData: VeryTable = new VeryTable(data);
    console.log(tabeData.pos(7, 5));

    /* *
    // ShowError.show('错误信息：大股东萨芬个是电饭锅三分隔收费的发大股东萨芬个是电饭锅三分隔收费的发大股东萨芬个是电饭锅三分隔收费的发大股东萨芬个是电饭锅三分隔收费的发大股东萨芬个是电饭锅三分隔收费的发大股东萨芬个是电饭锅三分隔收费的发，错误位置：' +  a.pos(7, 5) + '<br/> ' + '错误信息：大股东萨芬个是电饭锅三分隔收费的发，错误位置：' +  a.pos(7, 5)+ '<br/> ' + '错误信息：大股东萨芬个是电饭锅三分隔收费的发，错误位置：' +  a.pos(7, 5)+ '<br/> ' + '错误信息：大股东萨芬个是电饭锅三分隔收费的发，错误位置：' +  a.pos(7, 5)+ '<br/> ' + '错误信息：大股东萨芬个是电饭锅三分隔收费的发，错误位置：' +  a.pos(7, 5));

    // document.getElementById("settingsButton")!.addEventListener("click", ShowError.close);
    */
  }

}