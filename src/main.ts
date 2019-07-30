

import { Game } from "./game";

let game!: Game;
let initFlag: boolean = false;

/**
 * 初始化入口；
 */
function initGame(): void {
  let canvas = <HTMLCanvasElement>document.getElementById("renderCanvas");
  let fpsLabel = document.getElementById("fpsLabel");
  if (canvas !== null && fpsLabel !== null) {
    game = new Game(canvas, fpsLabel);
    game.createScene().animate();  // 链式调用
  }
}

function runBtn(): void {
  if (game) {
    game.createScene().animate();
  }
}

function toggleDebug(): void {
  if (game) {
    game.toggleDebug();
  }
}

function init(): void {
  // 等待表格数据加载完成
  if (dataLoaded) {
    initGame();
  } else {
    setTimeout(init, 500);
  }
}

// 关联按钮
document.getElementById("runButton")!.addEventListener("click", runBtn);

// 关联按钮
document.getElementById("debugButton")!.addEventListener("click", toggleDebug);

// 启动引擎
// 第一次启动时，先异步加载数据后再初始化，后期可以直接点击按钮进行加载；
init();
// loadData2()
//   .then(function (hot: HandTable) {
//     console.log(hot.getData());
//   }
//   );








