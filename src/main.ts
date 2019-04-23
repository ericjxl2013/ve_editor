import Game from "./game";

let game!:Game;
/**
 * 初始化入口；
 */
function initGame(): void {
  let canvas = <HTMLCanvasElement>document.getElementById("renderCanvas");
  let fpsLabel = document.getElementById("fpsLabel");
  if(canvas !== null && fpsLabel !== null) {
    game = new Game(canvas, fpsLabel);
    game.createScene().animate();  // 链式调用
  }
}

function runBtn(): void {
  if(game) {
    game.createScene().animate();
  }
}

function toggleDebug(): void {
  if(game) {
    game.toggleDebug();
  }
}

// 关联按钮
document.getElementById("runButton")!.addEventListener("click", runBtn);

// 关联按钮
document.getElementById("debugButton")!.addEventListener("click", toggleDebug);

// 启动引擎
initGame();






