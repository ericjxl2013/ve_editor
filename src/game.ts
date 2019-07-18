///// <reference path="./dts/babylon.d.ts"/>

import { VeryEngine, VE_Objects, VE_Manager } from "./veryengine/veryEngine";

import { BabylonEngine, Time } from "./veryengine/babylon";

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
		BabylonEngine.Canvas = this._canvas;
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
			// TODO: 对象中相关数据dispose
			VE_Manager.dispose();
			// console.log(VE_Manager.projects.projects);
			this._engine.dispose();
		}
		this._engine = new BABYLON.Engine(this._canvas, true);
		BabylonEngine.Engine = this._engine;
		// Resize
		let engine = this._engine;
		window.addEventListener("resize", function () {
			engine.resize();
		});

		this._scene = new BABYLON.Scene(this._engine);
		BabylonEngine.Scene = this._scene;
		Time.start();

		// TODO: 设定相机
		var camera = new BABYLON.ArcRotateCamera("MainCamera", 0, 0, 10, new BABYLON.Vector3(0, 0, 0), this._scene);
		camera.setPosition(new BABYLON.Vector3(20, 200, 400));
		camera.attachControl(this._canvas, true);
		camera.lowerBetaLimit = 0.1;
		camera.upperBetaLimit = (Math.PI / 2) * 0.99;
		camera.lowerRadiusLimit = 150;

		let inputMap: { [key: string]: boolean } = {};

		// TODO: 加载过度动画开
		engine.hideLoadingUI();
		// engine.displayLoadingUI();

		// TODO: 加载scene.babylon场景文件，当前为默认
		BABYLON.SceneLoader.Append("./scene/", "scene.babylon", this._scene, function (scene) {
			// do something with the scene
			// 加载过度动画关
			// engine.hideLoadingUI();

			// Keyboard events
			// var blue = scene.getMeshByName('blue')!;

			// scene.actionManager = new BABYLON.ActionManager(scene);
			// scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyDownTrigger, function (evt) {
			// 	inputMap[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";
			// }));
			// scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyUpTrigger, function (evt) {
			// 	inputMap[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";
			// }));


			// // Game/Render loop
			// scene.onBeforeRenderObservable.add(() => {

			// 	if (inputMap["w"] || inputMap["ArrowUp"]) {
			// 		blue.position.z -= 100 * engine.getDeltaTime() / 1000;
			// 	}
			// 	if (inputMap["a"] || inputMap["ArrowLeft"]) {
			// 		blue.position.x += 100 * engine.getDeltaTime() / 1000;
			// 	}
			// 	if (inputMap["s"] || inputMap["ArrowDown"]) {
			// 		blue.position.z += 100 * engine.getDeltaTime() / 1000;
			// 	}
			// 	if (inputMap["d"] || inputMap["ArrowRight"]) {
			// 		blue.position.x -= 100 * engine.getDeltaTime() / 1000;
			// 	}
			// })

			// // sphere
			// var sphere = scene.getMeshByName('sphere')!;
			// sphere.actionManager = new BABYLON.ActionManager(scene);

			// sphere.actionManager.registerAction(new BABYLON.SetValueAction(
			// 	{ trigger: BABYLON.ActionManager.OnIntersectionEnterTrigger, parameter: blue },
			// 	sphere, "scaling", new BABYLON.Vector3(2, 2, 2)));

			// sphere.actionManager.registerAction(new BABYLON.SetValueAction(
			// 	{ trigger: BABYLON.ActionManager.OnIntersectionExitTrigger, parameter: blue }
			// 	, sphere, "scaling", new BABYLON.Vector3(1, 1, 1)));

			// TODO: 表格加载测试，应在所有模型加载完以后再初始化引擎
			// console.log(hot1.getData());
			let entrance: VeryEngine = new VeryEngine();
			console.log(`空行数：${hot1.countEmptyRows()}`);
			try {
				entrance.init(hot1.getData(), projectName);
			} catch (e) { // TODO: 可能会影响效率
				console.error(e);
			}

			let objects: VE_Objects = VE_Manager.objects(projectName);
			// 全局渲染帧循环
			scene.onBeforeRenderObservable.add(() => {
				// 添加帧函数
				// Time._sum();

				// 触发响应循环
				for (let i: number = 0; i < objects.count; i++) {
					let objectID: string = objects.getObjectID(i);
					objects.getVeryObject(objectID).update();
				}

			})


		});


		// const lightPos = new BABYLON.Vector3(0, 1, 0);
		// new BABYLON.HemisphericLight('hemlight', lightPos, this._scene);

		// const sphereOpts = { segments: 16, diameter: 1 };
		// let sphere = BABYLON.MeshBuilder.CreateSphere(
		// 	'mainsphere',
		// 	sphereOpts,
		// 	this._scene
		// );
		// sphere.position.y = 1;

		// const groundOpts = { width: 6, height: 6, subdivisions: 2 };
		// BABYLON.MeshBuilder.CreateGround('mainground', groundOpts, this._scene);




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
