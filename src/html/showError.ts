export class ShowError {

  /**
   * 报错信息显示；
   * @param error_msg 报错或警告信息；
   */
  static show(error_msg: string): void {
    let errorContent =
      '<div class="alert alert-error"><button type="button" class="close" data-dismiss="alert">&times;</button>';
    errorContent += error_msg + "</div>";
    const errorZone: HTMLElement | null = document.getElementById("errorZone");
    if (errorZone !== null) {
      errorZone.style.display = "block";
      errorZone.innerHTML = errorContent;
      // Close button error
      var closeBtn = errorZone.querySelector(".close");
      if (closeBtn !== null) {
        closeBtn.addEventListener("click", function () {
          errorZone.style.display = "none";
        });
      }
    }
  }

  static close(): void {
    document.getElementById("errorZone")!.style.display = "none";
  }
}