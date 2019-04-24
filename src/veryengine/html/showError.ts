export class ShowError {

  public static errorContentPrefix: string = '<div class="alert alert-error"><button type="button" class="close" data-dismiss="alert">&times;</button>';
  public static errorContentNow: string;
  public static errorZone: HTMLElement;

  public static initZone(): void {
    if (!this.errorZone) {
      this.errorZone = document.getElementById("errorZone")!;
    }
  }
  /**
   * 报错信息显示；
   * TODO: log、error、warn信息分颜色显示，支持滚动栏，不然报错信息多了以后无法查看；
   * @param error_msg 报错或警告信息；
   */
  private static showMsg(prefix: string, error_msg: string): void {
    this.initZone();
    if (!this.errorContentNow) {
      this.errorContentNow = this.errorContentPrefix;
    }
    this.errorContentNow += prefix + error_msg + "<br/>";
    this.errorZone.style.display = "block";
    this.errorZone.innerHTML = this.errorContentNow + '</div>';
    // Close button error
    let closeBtn = this.errorZone.querySelector(".close")!;
    let that = this;
    closeBtn.addEventListener("click", function () {
      that.errorZone.style.display = "none";
    });
  }

  public static show(error_msg: string): void {
    this.showMsg('打印信息>>>', error_msg);
  }

  public static showError(error_msg: string): void {
    this.showMsg('错误信息>>>', error_msg);
  }

  public static showWarn(error_msg: string): void {
    this.showMsg('警告信息>>>', error_msg);
  }

  public static clear(): void {
    ShowError.initZone();
    ShowError.errorContentNow = ShowError.errorContentPrefix;
    ShowError.errorZone.innerHTML = ShowError.errorContentNow + '</div>';
    // Close button error
    let closeBtn = ShowError.errorZone.querySelector(".close")!;
    let that = ShowError;
    closeBtn.addEventListener("click", function () {
      that.errorZone.style.display = "none";
    });
  }

  public static close(): void {
    ShowError.initZone();
    if(ShowError.errorZone.style.display === "none") {
      ShowError.errorZone.style.display = "block";
    } else {
      ShowError.errorZone.style.display = "none";
    }
  }
}