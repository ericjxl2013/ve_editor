/// <reference path="./dts/babylon.d.ts"/>

import { VeryEngine } from "./veryengine/veryEngine";

export default class Game {
	private _canvas: HTMLCanvasElement;
	private _fps: HTMLElement;
	private _table!: HTMLElement;
	private _showFps: boolean = true;
	private _engine!: BABYLON.Engine;
	private _scene!: BABYLON.Scene;
	// private _camera!: BABYLON.FreeCamera;

	constructor(canvasElement: HTMLCanvasElement, fps: HTMLElement) {
		this._canvas = canvasElement;
		this._fps = fps;
		// this._engine = new BABYLON.Engine(this._canvas, true);
		this._table = document.getElementById("VeryTable")!;
	}

	/**
	 * 创建场景，并且启动
	 */
	createScene(): Game {
		// 假设有运行中的engine，先停止，重新初始化
		if (this._engine) {
			this._engine.dispose();
		}
		this._engine = new BABYLON.Engine(this._canvas, true);
		// Resize
		let engine = this._engine;
		window.addEventListener("resize", function () {
			engine.resize();
		});

		this._scene = new BABYLON.Scene(this._engine);

		const cameraPos = new BABYLON.Vector3(0, 5, -10);

		let camera = new BABYLON.FreeCamera('maincam', cameraPos, this._scene);
		camera.setTarget(BABYLON.Vector3.Zero());
		camera.attachControl(this._canvas, false);

		const lightPos = new BABYLON.Vector3(0, 1, 0);
		new BABYLON.HemisphericLight('hemlight', lightPos, this._scene);

		const sphereOpts = { segments: 16, diameter: 1 };
		let sphere = BABYLON.MeshBuilder.CreateSphere(
			'mainsphere',
			sphereOpts,
			this._scene
		);
		sphere.position.y = 1;

		const groundOpts = { width: 6, height: 6, subdivisions: 2 };
		BABYLON.MeshBuilder.CreateGround('mainground', groundOpts, this._scene);

		// 表格加载测试
		// console.log(hot1.getData());
		let entrance: VeryEngine = new VeryEngine();
		entrance.init(hot1.getData(), projectName);


		return this;
	}

	/**
	 * 启动渲染循环；
	 */
	animate(): Game {
		this._engine.runRenderLoop(() => {
			if (this._canvas.width !== this._canvas.clientWidth) {
				this._engine.resize();
			}

			if (this._scene) {
				this._scene.render();
			}

			if (this._showFps) {
				this.updateFpsPos();
			}


		});
		return this;
	}

	/**
	 * 属性编辑器UI界面控制；
	 */
	toggleDebug(): Game {
		if (this._engine) {
			// Always showing the debug layer, because you can close it by itself
			var scene = this._engine.scenes[0];
			if (scene.debugLayer.isVisible()) {
				scene.debugLayer.hide();
			}
			else {
				// 此处修改了babylon.d.ts文件
				scene.debugLayer.show({ embedMode: true });
			}
		}
		return this;
	}

	/**
	 * 更新fps显示及显示位置
	 */
	updateFpsPos(): void {
		if (this._fps) {
			this._fps.style.right = document.body.clientWidth - (this._table.clientWidth + this._canvas.clientWidth) + "px";

			this._fps.innerHTML = this._engine.getFps().toFixed() + " fps";
		}
	}
}
