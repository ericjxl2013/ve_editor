!(function o(a, s, u) {
  function p(t, e) {
    if (!s[t]) {
      if (!a[t]) {
        var r = "function" == typeof require && require;
        if (!e && r) return r(t, !0);
        if (c) return c(t, !0);
        var i = new Error("Cannot find module '" + t + "'");
        throw ((i.code = "MODULE_NOT_FOUND"), i);
      }
      var n = (s[t] = { exports: {} });
      a[t][0].call(
        n.exports,
        function(e) {
          return p(a[t][1][e] || e);
        },
        n,
        n.exports,
        o,
        a,
        s,
        u
      );
    }
    return s[t].exports;
  }
  for (
    var c = "function" == typeof require && require, e = 0;
    e < u.length;
    e++
  )
    p(u[e]);
  return p;
})(
  {
    1: [
      function(e, t, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", { value: !0 });
        var i = e("./veryengine/veryEngine"),
          n = (function() {
            function e(e, t) {
              (this._showFps = !0),
                (this._canvas = e),
                (i.VeryEngine.Canvas = this._canvas),
                (this._fps = t),
                (this._table = document.getElementById("VeryTable"));
            }
            return (
              (e.prototype.createScene = function() {
                this._engine && this._engine.dispose(),
                  (this._engine = new BABYLON.Engine(this._canvas, !0)),
                  (i.VeryEngine.Engine = this._engine);
                var t = this._engine;
                window.addEventListener("resize", function() {
                  t.resize();
                }),
                  (this._scene = new BABYLON.Scene(this._engine)),
                  (i.VeryEngine.Scene = this._scene);
                var e = new BABYLON.ArcRotateCamera(
                  "MainCamera",
                  0,
                  0,
                  10,
                  new BABYLON.Vector3(0, 0, 0),
                  this._scene
                );
                return (
                  e.setPosition(new BABYLON.Vector3(20, 200, 400)),
                  e.attachControl(this._canvas, !0),
                  (e.lowerBetaLimit = 0.1),
                  (e.upperBetaLimit = (Math.PI / 2) * 0.99),
                  (e.lowerRadiusLimit = 150),
                  t.displayLoadingUI(),
                  BABYLON.SceneLoader.Append(
                    "./scene/",
                    "scene.babylon",
                    this._scene,
                    function(e) {
                      t.hideLoadingUI();
                    }
                  ),
                  new i.VeryEngine().init(hot1.getData(), projectName),
                  this._scene.onBeforeRenderObservable.add(function() {
                    i.Time._sum();
                  }),
                  this
                );
              }),
              (e.prototype.animate = function() {
                var e = this;
                return (
                  this._engine.runRenderLoop(function() {
                    e._canvas.width !== e._canvas.clientWidth &&
                      e._engine.resize(),
                      e._scene && e._scene.render(),
                      e._showFps && e.updateFpsPos();
                  }),
                  this
                );
              }),
              (e.prototype.toggleDebug = function() {
                if (this._engine) {
                  var e = this._engine.scenes[0];
                  e.debugLayer.isVisible()
                    ? e.debugLayer.hide()
                    : e.debugLayer.show({ embedMode: !0 });
                }
                return this;
              }),
              (e.prototype.updateFpsPos = function() {
                this._fps &&
                  ((this._fps.style.right =
                    document.body.clientWidth -
                    (this._table.clientWidth + this._canvas.clientWidth) +
                    "px"),
                  (this._fps.innerHTML =
                    this._engine.getFps().toFixed() + " fps"));
              }),
              e
            );
          })();
        r.default = n;
      },
      { "./veryengine/veryEngine": 81 }
    ],
    2: [
      function(e, t, r) {
        "use strict";
        var i =
          (this && this.__importDefault) ||
          function(e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(r, "__esModule", { value: !0 });
        var n,
          o,
          a,
          s = i(e("./game"));
        document
          .getElementById("runButton")
          .addEventListener("click", function() {
            n && n.createScene().animate();
          }),
          document
            .getElementById("debugButton")
            .addEventListener("click", function() {
              n && n.toggleDebug();
            }),
          (o = document.getElementById("renderCanvas")),
          (a = document.getElementById("fpsLabel")),
          null !== o &&
            null !== a &&
            (n = new s.default(o, a)).createScene().animate();
      },
      { "./game": 1 }
    ],
    3: [
      function(e, t, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", { value: !0 });
        var i = e("../enum"),
          n = (function() {
            function e() {
              (this._enabled = !0),
                (this._projectName = ""),
                (this._objectID = ""),
                (this._actionID = ""),
                (this._erveryFrame = !1),
                (this.isSequence = !1),
                (this._sequenceState = i.SequenceActionState.Initial);
            }
            return (
              Object.defineProperty(e.prototype, "enabled", {
                get: function() {
                  return this._enabled;
                },
                set: function(e) {
                  this._enabled = e;
                },
                enumerable: !0,
                configurable: !0
              }),
              Object.defineProperty(e.prototype, "projectName", {
                get: function() {
                  return this._projectName;
                },
                enumerable: !0,
                configurable: !0
              }),
              Object.defineProperty(e.prototype, "objectID", {
                get: function() {
                  return this._objectID;
                },
                enumerable: !0,
                configurable: !0
              }),
              Object.defineProperty(e.prototype, "actionID", {
                get: function() {
                  return this._actionID;
                },
                enumerable: !0,
                configurable: !0
              }),
              Object.defineProperty(e.prototype, "Type", {
                get: function() {
                  return i.ActionType.Normal;
                },
                enumerable: !0,
                configurable: !0
              }),
              Object.defineProperty(e.prototype, "everyFrame", {
                get: function() {
                  return this._erveryFrame;
                },
                enumerable: !0,
                configurable: !0
              }),
              Object.defineProperty(e.prototype, "SequenceState", {
                get: function() {
                  return this._sequenceState;
                },
                set: function(e) {
                  this._sequenceState = e;
                },
                enumerable: !0,
                configurable: !0
              }),
              (e.prototype.setEveryFrame = function(e) {
                this._erveryFrame = e;
              }),
              (e.prototype.setActionID = function(e, t) {
                (this._objectID = e), (this._actionID = t);
              }),
              (e.prototype.paraParser = function(e) {
                return !0;
              }),
              (e.prototype.action = function(e, t) {
                (this._enabled = e),
                  (this._erveryFrame = t),
                  this._enabled &&
                    (this.active(), this._erveryFrame || this.onUpdate());
              }),
              (e.prototype.update = function() {
                this._enabled && this._erveryFrame && this.onUpdate();
              }),
              (e.prototype.onUpdate = function() {}),
              (e.prototype.pause = function() {
                this._sequenceState = i.SequenceActionState.Pause;
              }),
              (e.prototype.resume = function() {
                this._sequenceState = i.SequenceActionState.Running;
              }),
              (e.prototype.stop = function() {
                this._sequenceState = i.SequenceActionState.Initial;
              }),
              (e.prototype.finish = function() {
                (this._sequenceState = i.SequenceActionState.Initial),
                  (this.enabled = !1);
              }),
              e
            );
          })();
        r.VE_ActionBehaviour = n;
      },
      { "../enum": 17 }
    ],
    4: [
      function(e, t, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", { value: !0 });
        var n = e("../html"),
          s = e("../state"),
          u = e("../manager"),
          i = (function() {
            function e() {}
            return (
              (e.addAction = function(e) {
                for (var t = e.ID.split("|"), r = 0; r < t.length; r++) {
                  var i = t[r].trim().toLowerCase();
                  this._actionDics[i]
                    ? n.ShowError.showError(
                        "响应初始化错误，响应ID重复，当前响应ID：" +
                          i +
                          "，请为当前响应重新分配响应ID！"
                      )
                    : (this._actionDics[i] = e);
                }
              }),
              (e.hasAction = function(e) {
                return (e = e.toLowerCase()), !!this._actionDics[e];
              }),
              (e.createAction = function(e) {
                return (
                  (e = e.toLowerCase()), Object.create(this._actionDics[e])
                );
              }),
              (e.remove = function(e) {
                (e = e.toLowerCase()), delete this._actionDics[e];
              }),
              (e.findAction = function(e, t) {
                if (e.isCreatedAction(t)) return e.getAction(t);
                var r = t.split(s.StateConst.STATE_SEPARATOR);
                if (2 !== r.length) return null;
                var i = u.VE_Manager.objects(e.projectName),
                  n = r[0].trim(),
                  o = r[1].trim();
                if (i.isCreated(n)) {
                  var a = i.getVeryObject(n);
                  return a.isCreatedAction(o) ? a.getAction(o) : null;
                }
                return null;
              }),
              (e._actionDics = {}),
              e
            );
          })();
        r.VE_Actions = i;
      },
      { "../html": 39, "../manager": 49, "../state": 60 }
    ],
    5: [
      function(e, t, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", { value: !0 });
        var i = e("../enum"),
          n = e("../html"),
          o = e("../utility"),
          a = e("./assignmentTypeJudge"),
          s = (function() {
            function e(e, t) {
              (this._totalStr = ""),
                (this._leftType = i.AssignType.Variable),
                (this._rightType = i.AssignType.Variable),
                (this._leftVariable = null),
                (this._leftTemplate = null),
                (this._leftVarID = ""),
                (this._rightConstStr = ""),
                (this._rightConstValue = null),
                (this._rightVariable = null),
                (this._rightTemplate = null),
                (this._rightVarID = ""),
                (this._pos = ""),
                (this._state = e),
                (this._totalStr = t);
            }
            return (
              Object.defineProperty(e.prototype, "state", {
                get: function() {
                  return this._state;
                },
                enumerable: !0,
                configurable: !0
              }),
              Object.defineProperty(e.prototype, "leftType", {
                get: function() {
                  return this._leftType;
                },
                enumerable: !0,
                configurable: !0
              }),
              Object.defineProperty(e.prototype, "rightType", {
                get: function() {
                  return this._rightType;
                },
                enumerable: !0,
                configurable: !0
              }),
              Object.defineProperty(e.prototype, "leftVariable", {
                get: function() {
                  return this._leftVariable;
                },
                enumerable: !0,
                configurable: !0
              }),
              Object.defineProperty(e.prototype, "rightVariable", {
                get: function() {
                  return this._leftVariable;
                },
                enumerable: !0,
                configurable: !0
              }),
              (e.prototype.setPos = function(e) {
                this._pos = e;
              }),
              (e.prototype.setLeftVariable = function(e) {
                (this._leftType = i.AssignType.Variable),
                  (this._leftVariable = e);
              }),
              (e.prototype.setLeftTemplate = function(e) {
                (this._leftType = i.AssignType.Template),
                  (this._leftTemplate = e);
              }),
              (e.prototype.setLeftTemplateVar = function(e, t) {
                (this._leftType = i.AssignType.TemplateVariable),
                  (this._leftTemplate = e),
                  (this._leftVarID = t);
              }),
              (e.prototype.setRightVariable = function(e) {
                (this._rightType = i.AssignType.Variable),
                  (this._rightVariable = e);
              }),
              (e.prototype.setRightTemplate = function(e) {
                (this._rightType = i.AssignType.Template),
                  (this._rightTemplate = e);
              }),
              (e.prototype.setRightNull = function() {
                (this._rightType = i.AssignType.Template),
                  (this._rightTemplate = null);
              }),
              (e.prototype.setRightTemplateVariable = function(e, t) {
                (this._rightType = i.AssignType.TemplateVariable),
                  (this._rightTemplate = e),
                  (this._rightVarID = t);
              }),
              (e.prototype.setRightConst = function(e) {
                (this._rightType = i.AssignType.Const),
                  (this._rightConstStr = e);
              }),
              (e.prototype.setRightConstValue = function(e) {
                (this._rightType = i.AssignType.Const),
                  (this._rightConstValue = e);
              }),
              (e.prototype.finish = function() {}),
              (e.prototype.assign = function() {
                if (this._leftType === i.AssignType.Variable)
                  this.rightAssignment();
                else if (this._leftType === i.AssignType.Template)
                  null == this._rightTemplate
                    ? null !== this._leftTemplate && this._leftTemplate.unload()
                    : (this._leftTemplate = this._rightTemplate);
                else {
                  if (null === this._leftTemplate.templateInstance)
                    return void n.ShowError.showError(
                      "位置：" +
                        this._pos +
                        "，项目名：" +
                        this.state.Fsm.projectName +
                        "，对象名：" +
                        this.state.Fsm.objectID +
                        "，状态名：" +
                        this.state.Fsm.fsmID +
                        "，赋值响应：" +
                        this._totalStr +
                        "，错误：左侧模板变量未实例化，" +
                        this._leftTemplate.templateVarID
                    );
                  if (
                    this._leftTemplate.templateInstance.isCreatedExpression(
                      this._leftVarID
                    )
                  )
                    return void n.ShowError.showError(
                      "位置：" +
                        this._pos +
                        "，项目名：" +
                        this.state.Fsm.projectName +
                        "，对象名：" +
                        this.state.Fsm.objectID +
                        "，状态名：" +
                        this.state.Fsm.fsmID +
                        "，赋值响应：" +
                        this._totalStr +
                        "，错误：左侧变量不能为“公式”，" +
                        this._rightTemplate.templateVarID
                    );
                  if (
                    this._leftTemplate.templateInstance.isCreatedVariable(
                      this._leftVarID
                    )
                  )
                    (this._leftVariable = this._leftTemplate.templateInstance.getVariable(
                      this._leftVarID
                    )),
                      this.rightAssignment();
                  else {
                    if (
                      !this._leftTemplate.templateInstance.isCreatedFsm(
                        this._leftVarID
                      )
                    )
                      return void n.ShowError.showError(
                        "位置：" +
                          this._pos +
                          "，项目名：" +
                          this.state.Fsm.projectName +
                          "，对象名：" +
                          this.state.Fsm.objectID +
                          "，状态名：" +
                          this.state.Fsm.fsmID +
                          "，赋值响应：" +
                          this._totalStr +
                          "，错误：左侧无法被查找到，" +
                          this._rightTemplate.templateVarID
                      );
                    (this._leftVariable = this._leftTemplate.templateInstance.getFsm(
                      this._leftVarID
                    ).fsmVar),
                      this.rightAssignment();
                  }
                }
              }),
              (e.prototype.rightAssignment = function() {
                if (this._rightType === i.AssignType.Variable)
                  this._leftVariable.setValue(this._rightVariable.getValue());
                else if (this._rightType === i.AssignType.Const)
                  if (null === this._rightConstValue) {
                    var e = new o.ErrorInfo();
                    if (
                      ((this._rightConstValue = this._leftVariable.initValue(
                        this._rightConstStr,
                        e
                      )),
                      !e.isRight)
                    )
                      return void n.ShowError.showError(
                        "位置：" +
                          this._pos +
                          "，项目名：" +
                          this.state.Fsm.projectName +
                          "，对象名：" +
                          this.state.Fsm.objectID +
                          "，状态名：" +
                          this.state.Fsm.fsmID +
                          "，赋值响应：" +
                          this._totalStr +
                          "，错误：右侧常量转化错误，" +
                          this._rightConstStr
                      );
                    this._leftVariable.setValue(this._rightConstValue);
                  } else this._leftVariable.setValue(this._rightConstValue);
                else {
                  if (null == this._rightTemplate.templateInstance)
                    return void n.ShowError.showError(
                      "位置：" +
                        this._pos +
                        "，项目名：" +
                        this.state.Fsm.projectName +
                        "，对象名：" +
                        this.state.Fsm.objectID +
                        "，状态名：" +
                        this.state.Fsm.fsmID +
                        "，赋值响应：" +
                        this._totalStr +
                        "，错误：右侧模板变量未实例化，" +
                        this._rightTemplate.templateVarID
                    );
                  if (
                    this._rightTemplate.templateInstance.isCreatedExpression(
                      this._rightVarID
                    )
                  ) {
                    var t = this._rightTemplate.templateInstance.getExpression(
                      this._rightVarID
                    );
                    if (
                      !a.VE_AssignmentTypeJudge.allowExpression(
                        this._leftVariable,
                        t
                      )
                    )
                      return void n.ShowError.showError(
                        "位置：" +
                          this._pos +
                          "，项目名：" +
                          this.state.Fsm.projectName +
                          "，对象名：" +
                          this.state.Fsm.objectID +
                          "，状态名：" +
                          this.state.Fsm.fsmID +
                          "，赋值响应：" +
                          this._totalStr +
                          "，错误：左侧和右侧数据格式不匹配，不能完成赋值，" +
                          this._rightTemplate.templateVarID
                      );
                    this._leftVariable.setValue(t.evaluate());
                  } else if (
                    this._rightTemplate.templateInstance.isCreatedVariable(
                      this._rightVarID
                    )
                  ) {
                    var r = this._rightTemplate.templateInstance.getVariable(
                      this._rightVarID
                    );
                    if (!a.VE_AssignmentTypeJudge.allow(this._leftVariable, r))
                      return void n.ShowError.showError(
                        "位置：" +
                          this._pos +
                          "，项目名：" +
                          this.state.Fsm.projectName +
                          "，对象名：" +
                          this.state.Fsm.objectID +
                          "，状态名：" +
                          this.state.Fsm.fsmID +
                          "，赋值响应：" +
                          this._totalStr +
                          "，错误：左侧和右侧数据格式不匹配，不能完成赋值，" +
                          this._rightTemplate.templateVarID
                      );
                    this._leftVariable.setValue(r.getValue());
                  } else {
                    if (
                      !this._rightTemplate.templateInstance.isCreatedFsm(
                        this._rightVarID
                      )
                    )
                      return void n.ShowError.showError(
                        "位置：" +
                          this._pos +
                          "，项目名：" +
                          this.state.Fsm.projectName +
                          "，对象名：" +
                          this.state.Fsm.objectID +
                          "，状态名：" +
                          this.state.Fsm.fsmID +
                          "，赋值响应：" +
                          this._totalStr +
                          "，错误：无法获取右侧变量，不能完成赋值，" +
                          this._rightTemplate.templateVarID
                      );
                    r = this._rightTemplate.templateInstance.getFsm(
                      this._rightVarID
                    ).fsmVar;
                    if (!a.VE_AssignmentTypeJudge.allow(this._leftVariable, r))
                      return void n.ShowError.showError(
                        "位置：" +
                          this._pos +
                          "，项目名：" +
                          this.state.Fsm.projectName +
                          "，对象名：" +
                          this.state.Fsm.objectID +
                          "，状态名：" +
                          this.state.Fsm.fsmID +
                          "，赋值响应：" +
                          this._totalStr +
                          "，错误：左侧和右侧数据格式不匹配，不能完成赋值，" +
                          this._rightTemplate.templateVarID
                      );
                    this._leftVariable.setValue(r.getValue());
                  }
                }
              }),
              e
            );
          })();
        r.VE_Assignment = s;
      },
      {
        "../enum": 17,
        "../html": 39,
        "../utility": 73,
        "./assignmentTypeJudge": 6
      }
    ],
    6: [
      function(e, t, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", { value: !0 });
        var i = (function() {
          function e() {}
          return (
            (e.allow = function(e, t) {
              return e.varType === t.varType;
            }),
            (e.allowExpression = function(e, t) {
              return e.varType === t.expType;
            }),
            e
          );
        })();
        r.VE_AssignmentTypeJudge = i;
      },
      {}
    ],
    7: [
      function(e, t, r) {
        "use strict";
        function i(e) {
          for (var t in e) r.hasOwnProperty(t) || (r[t] = e[t]);
        }
        Object.defineProperty(r, "__esModule", { value: !0 }),
          i(e("./actionBehaviour")),
          i(e("./assignment")),
          i(e("./actions")),
          i(e("./sequenceActions"));
      },
      {
        "./actionBehaviour": 3,
        "./actions": 4,
        "./assignment": 5,
        "./sequenceActions": 8
      }
    ],
    8: [
      function(e, t, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", { value: !0 });
        var i = e("../enum"),
          n = (function() {
            function e() {
              this._sequenceState = i.SequenceActionState.Initial;
            }
            return (
              Object.defineProperty(e.prototype, "sequenceState", {
                get: function() {
                  return this._sequenceState;
                },
                enumerable: !0,
                configurable: !0
              }),
              e
            );
          })();
        r.VE_SequenceActions = n;
      },
      { "../enum": 17 }
    ],
    9: [
      function(e, t, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", { value: !0 });
        var i = e("./fsmData"),
          n = (function() {
            function e(e, t, r) {
              (this._projectName = ""),
                (this._objectID = ""),
                (this._templateID = ""),
                (this._isTemplate = !1),
                (this._fsmIDs = []),
                (this._fsmDic = {}),
                (this._fsmPosDic = {}),
                (this._triggerIDs = []),
                (this._triggerDic = {}),
                (this._triggerPosDic = {}),
                (this._actionIDs = []),
                (this._actionDic = {}),
                (this._actionInitValue = {}),
                (this._actionPosDic = {}),
                (this._projectName = e),
                (this._isTemplate = r)
                  ? (this._templateID = t)
                  : (this._objectID = t);
            }
            return (
              Object.defineProperty(e.prototype, "projectName", {
                get: function() {
                  return this._projectName;
                },
                enumerable: !0,
                configurable: !0
              }),
              Object.defineProperty(e.prototype, "objectID", {
                get: function() {
                  return this._objectID;
                },
                enumerable: !0,
                configurable: !0
              }),
              Object.defineProperty(e.prototype, "templateID", {
                get: function() {
                  return this._templateID;
                },
                enumerable: !0,
                configurable: !0
              }),
              Object.defineProperty(e.prototype, "isTemplate", {
                get: function() {
                  return this._isTemplate;
                },
                enumerable: !0,
                configurable: !0
              }),
              Object.defineProperty(e.prototype, "id", {
                get: function() {
                  return this._isTemplate ? this._templateID : this._objectID;
                },
                enumerable: !0,
                configurable: !0
              }),
              Object.defineProperty(e.prototype, "triggerCount", {
                get: function() {
                  return this._triggerIDs.length;
                },
                enumerable: !0,
                configurable: !0
              }),
              Object.defineProperty(e.prototype, "actionCount", {
                get: function() {
                  return this._actionIDs.length;
                },
                enumerable: !0,
                configurable: !0
              }),
              Object.defineProperty(e.prototype, "fsmCount", {
                get: function() {
                  return this._fsmIDs.length;
                },
                enumerable: !0,
                configurable: !0
              }),
              (e.prototype.isCreatedFsm = function(e) {
                return !!this._fsmDic[e];
              }),
              (e.prototype.createFsm = function(e, t) {
                this._fsmIDs.push(e),
                  (this._fsmDic[e] = new i.VE_FsmData(e, this)),
                  (this._fsmPosDic[e] = t);
              }),
              (e.prototype.getFsmData = function(e) {
                return this._fsmDic[e];
              }),
              (e.prototype.getFsmPos = function(e) {
                return this._fsmPosDic[e];
              }),
              (e.prototype.hasFsmIndex = function(e) {
                return 0 <= e && e < this._fsmIDs.length;
              }),
              (e.prototype.getFsmID = function(e) {
                return this._fsmIDs[e];
              }),
              (e.prototype.isCreatedTrigger = function(e) {
                return !!this._triggerDic[e];
              }),
              (e.prototype.addTrigger = function(e, t, r) {
                this._triggerIDs.push(e),
                  (this._triggerDic[e] = t),
                  (this._triggerPosDic[e] = r);
              }),
              (e.prototype.getTrigger = function(e) {
                return this._triggerDic[e];
              }),
              (e.prototype.getTriggerPos = function(e) {
                return this._triggerPosDic[e];
              }),
              (e.prototype.hasTriggerIndex = function(e) {
                return 0 <= e && e < this._triggerIDs.length;
              }),
              (e.prototype.getTriggerID = function(e) {
                return this._triggerIDs[e];
              }),
              (e.prototype.getTriggerPara = function(e) {
                return this._triggerDic[e];
              }),
              (e.prototype.isCreatedAction = function(e) {
                return !!this._actionDic[e];
              }),
              (e.prototype.addAction = function(e, t, r, i) {
                this._actionIDs.push(e),
                  (this._actionDic[e] = t),
                  (this._actionInitValue[e] = r),
                  (this._actionPosDic[e] = i);
              }),
              (e.prototype.getActionPara = function(e) {
                return this._actionDic[e];
              }),
              (e.prototype.getActionPos = function(e) {
                return this._actionPosDic[e];
              }),
              (e.prototype.getActionInitVal = function(e) {
                return this._actionInitValue[e];
              }),
              (e.prototype.hasActionIndex = function(e) {
                return 0 <= e && e < this._actionIDs.length;
              }),
              (e.prototype.getActionID = function(e) {
                return this._actionIDs[e];
              }),
              (e.prototype.clear = function() {
                (this._fsmIDs = []),
                  (this._fsmDic = {}),
                  (this._triggerIDs = []),
                  (this._triggerDic = {}),
                  (this._actionIDs = []),
                  (this._actionDic = {}),
                  (this._actionInitValue = {});
              }),
              e
            );
          })();
        r.VE_DataSource = n;
      },
      { "./fsmData": 10 }
    ],
    10: [
      function(e, t, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", { value: !0 });
        var i = (function() {
          function e(e, t) {
            (this._fsmType = ""),
              (this._initialValStr = "defalut"),
              (this._states = []),
              (this._dataSource = t),
              (this._fsmID = e);
          }
          return (
            Object.defineProperty(e.prototype, "dataSource", {
              get: function() {
                return this._dataSource;
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(e.prototype, "fsmID", {
              get: function() {
                return this._fsmID;
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(e.prototype, "fsmType", {
              get: function() {
                return this._fsmType;
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(e.prototype, "initialValStr", {
              get: function() {
                return this._initialValStr;
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(e.prototype, "count", {
              get: function() {
                return this._states.length;
              },
              enumerable: !0,
              configurable: !0
            }),
            (e.prototype.initFsm = function(e, t) {
              (this._fsmType = e), (this._initialValStr = t);
            }),
            (e.prototype.addState = function(e) {
              this._states.push(e);
            }),
            (e.prototype.getStateData = function(e) {
              return this._states[e];
            }),
            e
          );
        })();
        r.VE_FsmData = i;
      },
      {}
    ],
    11: [
      function(e, t, r) {
        "use strict";
        function i(e) {
          for (var t in e) r.hasOwnProperty(t) || (r[t] = e[t]);
        }
        Object.defineProperty(r, "__esModule", { value: !0 }),
          i(e("./variableData")),
          i(e("./fsmData")),
          i(e("./stateActionData")),
          i(e("./stateTriggerData")),
          i(e("./stateData")),
          i(e("./dataSource"));
      },
      {
        "./dataSource": 9,
        "./fsmData": 10,
        "./stateActionData": 12,
        "./stateData": 13,
        "./stateTriggerData": 14,
        "./variableData": 15
      }
    ],
    12: [
      function(e, t, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", { value: !0 });
        var o = e("../enum"),
          i = (function() {
            function e(e, t, r, i, n) {
              void 0 === t && (t = "false"),
                void 0 === r && (r = "false"),
                void 0 === i && (i = "false"),
                void 0 === n && (n = o.StateActionType.Action),
                (this.totalString = ""),
                (this.varID = ""),
                (this.varValue = ""),
                (this.actionID = e),
                (this.enabled = t),
                (this.everyFrame = r),
                (this.isSequence = i),
                (this.type = n);
            }
            return (
              (e.prototype.setNormalAction = function(e, t, r, i) {
                void 0 === t && (t = "false"),
                  void 0 === r && (r = "false"),
                  void 0 === i && (i = "false"),
                  (this.actionID = e),
                  (this.enabled = t),
                  (this.everyFrame = r),
                  (this.isSequence = i),
                  (this.type = o.StateActionType.Action);
              }),
              (e.prototype.setAssignmentAction = function(e, t, r) {
                (this.totalString = e),
                  (this.varID = t),
                  (this.varValue = r),
                  (this.type = o.StateActionType.Assignment);
              }),
              e
            );
          })();
        r.VE_StateActionData = i;
      },
      { "../enum": 17 }
    ],
    13: [
      function(e, t, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", { value: !0 });
        var n = e("../state"),
          i = (function() {
            function e(e, t, r, i) {
              void 0 === i && (i = n.StateConst.STATE_INDEX),
                (this._stateIndex = n.StateConst.STATE_INDEX),
                (this.logicalExp = ""),
                (this.rowIndex = -1),
                (this._triggers = []),
                (this._triggersPos = []),
                (this._actions = []),
                (this._actionsPos = []),
                (this._associatedStates = []),
                (this._associatedStatesPos = []),
                (this._isSequence = !1),
                (this._fsmData = e),
                (this._valStr = t),
                (this._isInitialValue = r),
                (this._stateIndex = i);
            }
            return (
              Object.defineProperty(e.prototype, "fsmData", {
                get: function() {
                  return this._fsmData;
                },
                enumerable: !0,
                configurable: !0
              }),
              Object.defineProperty(e.prototype, "ValStr", {
                get: function() {
                  return this._valStr;
                },
                enumerable: !0,
                configurable: !0
              }),
              Object.defineProperty(e.prototype, "isInitialValue", {
                get: function() {
                  return this._isInitialValue;
                },
                enumerable: !0,
                configurable: !0
              }),
              Object.defineProperty(e.prototype, "stateIndex", {
                get: function() {
                  return this._stateIndex;
                },
                enumerable: !0,
                configurable: !0
              }),
              Object.defineProperty(e.prototype, "isSequence", {
                get: function() {
                  return this._isSequence;
                },
                enumerable: !0,
                configurable: !0
              }),
              Object.defineProperty(e.prototype, "triggerCount", {
                get: function() {
                  return this._triggers.length;
                },
                enumerable: !0,
                configurable: !0
              }),
              Object.defineProperty(e.prototype, "actionCount", {
                get: function() {
                  return this._actions.length;
                },
                enumerable: !0,
                configurable: !0
              }),
              Object.defineProperty(e.prototype, "associatedStateCount", {
                get: function() {
                  return this._associatedStates.length;
                },
                enumerable: !0,
                configurable: !0
              }),
              (e.prototype.hasTrigger = function(e) {
                return 0 <= e && e < this._triggers.length;
              }),
              (e.prototype.addTrigger = function(e, t) {
                this._triggers.push(e), this._triggersPos.push(t);
              }),
              (e.prototype.getTrigger = function(e) {
                return this._triggers[e];
              }),
              (e.prototype.getTriggerPos = function(e) {
                return this._triggersPos[e];
              }),
              (e.prototype.hasAction = function(e) {
                return 0 <= e && e < this._actions.length;
              }),
              (e.prototype.addAction = function(e, t) {
                this._actions.push(e), this._actionsPos.push(t);
              }),
              (e.prototype.getAction = function(e) {
                return this._actions[e];
              }),
              (e.prototype.getActionPos = function(e) {
                return this._actionsPos[e];
              }),
              (e.prototype.hasAssociatedState = function(e) {
                return 0 <= e && e < this._associatedStates.length;
              }),
              (e.prototype.addAssociatedState = function(e, t) {
                this._associatedStates.push(e),
                  this._associatedStatesPos.push(t);
              }),
              (e.prototype.getAssociatedState = function(e) {
                return this._associatedStates[e];
              }),
              (e.prototype.getAssociatedStatePos = function(e) {
                return this._associatedStatesPos[e];
              }),
              (e.prototype.setSequence = function() {
                this._isSequence = !0;
              }),
              e
            );
          })();
        r.VE_StateData = i;
      },
      { "../state": 60 }
    ],
    14: [
      function(e, t, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", { value: !0 });
        var i = (function() {
          function e(e) {
            (this.triggerID = e),
              (this.logicalSwitch = ""),
              (this.logicalExp = "");
          }
          return (
            Object.defineProperty(e, "Empty", {
              get: function() {
                return new e("");
              },
              enumerable: !0,
              configurable: !0
            }),
            e
          );
        })();
        r.VE_StateTriggerData = i;
      },
      {}
    ],
    15: [
      function(e, t, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", { value: !0 });
        var i = (function() {
          function e(e) {
            (this._projectName = ""),
              (this._variableIDs = []),
              (this._varDics = {}),
              (this._varPosDic = {}),
              (this._projectName = e);
          }
          return (
            Object.defineProperty(e.prototype, "projectName", {
              get: function() {
                return this._projectName;
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(e.prototype, "count", {
              get: function() {
                return this._variableIDs.length;
              },
              enumerable: !0,
              configurable: !0
            }),
            (e.prototype.isCreatedVariable = function(e) {
              return !!this._varDics[e];
            }),
            (e.prototype.addVariable = function(e, t, r) {
              (this._varDics[e] = t),
                this._variableIDs.push(e),
                (this._varPosDic[e] = r);
            }),
            (e.prototype.getVariableID = function(e) {
              return 0 <= e && e < this._variableIDs.length
                ? this._variableIDs[e]
                : "";
            }),
            (e.prototype.getVariableParas = function(e) {
              return this._varDics[e];
            }),
            (e.prototype.getPos = function(e) {
              return this._varPosDic[e];
            }),
            (e.prototype.clear = function() {
              (this._variableIDs = []), (this._varDics = {});
            }),
            e
          );
        })();
        r.VE_VariableData = i;
      },
      {}
    ],
    16: [
      function(e, t, r) {
        "use strict";
        var i, n, o, a, s, u, p, c;
        Object.defineProperty(r, "__esModule", { value: !0 }),
          ((i = r.ActionType || (r.ActionType = {}))[(i.Normal = 0)] =
            "Normal"),
          (i[(i.Animation = 1)] = "Animation"),
          ((n = r.SequenceActionState || (r.SequenceActionState = {}))[
            (n.Initial = 0)
          ] = "Initial"),
          (n[(n.Prepared = 1)] = "Prepared"),
          (n[(n.Running = 2)] = "Running"),
          (n[(n.Pause = 3)] = "Pause"),
          ((o = r.StateActionType || (r.StateActionType = {}))[(o.Action = 0)] =
            "Action"),
          (o[(o.Assignment = 1)] = "Assignment"),
          ((a = r.AssignType || (r.AssignType = {}))[(a.Variable = 0)] =
            "Variable"),
          (a[(a.Template = 1)] = "Template"),
          (a[(a.TemplateVariable = 2)] = "TemplateVariable"),
          (a[(a.Const = 3)] = "Const"),
          ((s = r.AssignmentType || (r.AssignmentType = {}))[(s.Const = 0)] =
            "Const"),
          (s[(s.Variable = 1)] = "Variable"),
          (s[(s.Expression = 2)] = "Expression"),
          ((u = r.AssociatedFsmType || (r.AssociatedFsmType = {}))[
            (u.Object = 0)
          ] = "Object"),
          (u[(u.Template = 1)] = "Template"),
          ((p = r.VariableScope || (r.VariableScope = {}))[(p.Local = 0)] =
            "Local"),
          (p[(p.Fsm = 1)] = "Fsm"),
          (p[(p.Global = 2)] = "Global"),
          (p[(p.Scene = 3)] = "Scene"),
          ((c = r.Severity || (r.Severity = {}))[(c.Warning = 0)] = "Warning"),
          (c[(c.Error = 1)] = "Error");
      },
      {}
    ],
    17: [
      function(e, t, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", { value: !0 }),
          (function(e) {
            for (var t in e) r.hasOwnProperty(t) || (r[t] = e[t]);
          })(e("./enumTypes"));
      },
      { "./enumTypes": 16 }
    ],
    18: [
      function(e, t, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", { value: !0 });
        var i = (function() {
          function e(e, t, r) {
            (this._value = ""),
              (this._line = 0),
              (this._pos = 0),
              (this._value = e),
              (this._line = t),
              (this._pos = r);
          }
          return (
            (e.prototype.getValue = function() {
              return this._value;
            }),
            (e.prototype.getLine = function() {
              return this._line;
            }),
            (e.prototype.getPos = function() {
              return this._pos;
            }),
            (e.prototype.isDigit = function() {
              return /\d/.test(this._value);
            }),
            (e.prototype.isLetter = function() {
              return /[a-zA-Z]/.test(this._value);
            }),
            (e.prototype.isWhiteSpace = function() {
              return " " === this._value;
            }),
            (e.prototype.isNewLine = function() {
              return "\n" === this._value;
            }),
            (e.prototype.isEndOfInput = function() {
              return "\0" === this._value;
            }),
            (e.prototype.is = function() {
              for (var e = [], t = 0; t < arguments.length; t++)
                e[t] = arguments[t];
              for (var r = 0; r < e.length; r++)
                if (e[r] === this._value && "\0" !== e[r]) return !0;
              return !1;
            }),
            (e.prototype.toString = function() {
              return this._value;
            }),
            e
          );
        })();
        r.ExpChar = i;
      },
      {}
    ],
    19: [
      function(e, t, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", { value: !0 });
        var i = e("./scope"),
          n = e("./positions"),
          o = e("./expressionParsing"),
          a = e("../enum"),
          s = e("../html"),
          u = (function() {
            function e() {}
            return (
              (e.init = function() {
                this._scope = i.Scope.Create();
              }),
              (e.isCreated = function(e) {
                return !!this._scope.isCreated(e) || !!this._expVariable[e];
              }),
              (e.isCreatedVariable = function(e) {
                return !!this._scope.isCreated(e);
              }),
              (e.isCreatedExpression = function(e) {
                return !!this._expVariable[e];
              }),
              (e.createVariable = function(e, t, r) {
                return (
                  (this.errors = []),
                  this.isCreated(e)
                    ? (this.errors.push(
                        n.ParseError.Error(
                          new n.NameLocation(e),
                          "变量：" +
                            e +
                            "，类型：" +
                            t +
                            "，该变量已创建，请勿重复创建！"
                        )
                      ),
                      !1)
                    : (this._scope.setVariable(e, t, r), !0)
                );
              }),
              (e.createExpression = function(e, t) {
                if (((this.errors = []), this.isCreated(e)))
                  return (
                    this.errors.push(
                      n.ParseError.Error(
                        new n.NameLocation(e),
                        "表达式名：" +
                          e +
                          "，表达式：" +
                          t +
                          "，该表达式已定义，请勿重复定义！"
                      )
                    ),
                    !1
                  );
                var r = o.VE_ExpressionParsing.parsing(
                  e,
                  t,
                  this._scope,
                  this._projectName,
                  "",
                  "",
                  a.VariableScope.Scene
                );
                if (0 < o.VE_ExpressionParsing.errors.length) {
                  for (var i = 0; i < o.VE_ExpressionParsing.errors.length; i++)
                    this.errors.push(o.VE_ExpressionParsing.errors[i]);
                  return !1;
                }
                return (this._expVariable[e] = r), !0;
              }),
              (e.getValue = function(e) {
                return this.isCreated(e)
                  ? this.isCreatedVariable(e)
                    ? this._scope.find(e).getValue()
                    : this._expVariable[e].evaluate()
                  : null;
              }),
              (e.getExpression = function(e) {
                return this._expVariable[e] ? this._expVariable[e] : null;
              }),
              (e.getVariable = function(e) {
                return this.isCreatedVariable(e) ? this._scope.find(e) : null;
              }),
              (e.printError = function() {
                if (0 < this.errors.length)
                  for (var e = 0; e < this.errors.length; e++)
                    console.log(this.errors[e].toString()),
                      s.ShowError.showError(this.errors[e].toString());
              }),
              (e._expVariable = {}),
              (e.errors = []),
              (e._projectName = ""),
              (e._objectID = ""),
              e
            );
          })();
        (r.ExpManager = u).init();
      },
      {
        "../enum": 17,
        "../html": 39,
        "./expressionParsing": 21,
        "./positions": 27,
        "./scope": 28
      }
    ],
    20: [
      function(e, t, r) {
        "use strict";
        var i;
        Object.defineProperty(r, "__esModule", { value: !0 }),
          ((i = r.ExpressionType || (r.ExpressionType = {}))[(i.ID = 0)] =
            "ID"),
          (i[(i.SPECIAL_ID = 1)] = "SPECIAL_ID"),
          (i[(i.KEYWORD = 2)] = "KEYWORD"),
          (i[(i.STRING = 3)] = "STRING"),
          (i[(i.NUMBER = 4)] = "NUMBER"),
          (i[(i.BOOL = 5)] = "BOOL"),
          (i[(i.OPERATOR = 6)] = "OPERATOR"),
          (i[(i.INTEGER = 7)] = "INTEGER"),
          (i[(i.FLOAT = 8)] = "FLOAT"),
          (i[(i.DOUBLE = 9)] = "DOUBLE"),
          (i[(i.EOI = 10)] = "EOI");
      },
      {}
    ],
    21: [
      function(e, t, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", { value: !0 });
        var s = e("./tokenizer"),
          _ = e("./expressions"),
          g = e("./expressionEnum"),
          n = e("./functionExpression"),
          o = e("./functions"),
          d = e("./variableExpression"),
          y = e("../enum"),
          m = e("./veryExpressions"),
          E = e("../manager"),
          i = (function() {
            function e() {}
            return (
              (e.init = function() {
                (this._bracketPair["("] = ")"),
                  (this._bracketPair["["] = "]"),
                  (this._bracketPair["{"] = "}"),
                  (this._bracketPair["（"] = "）"),
                  (this._bracketPair["【"] = "】");
              }),
              (e.parsing = function(e, t, r, i, n, o, a) {
                return (
                  (this._scope = r),
                  (this._projectName = i),
                  (this._objectID = n),
                  (this._fsmID = o),
                  (this._varScope = a),
                  (this._tokenizer = new s.Tokenizer(t)),
                  (this.errors = []),
                  this.parse()
                );
              }),
              (e.parse = function() {
                var e = this.buildExpression();
                return (
                  this._tokenizer.current().isEnd() ||
                    (this._tokenizer.addError(
                      this._tokenizer.current(),
                      "未定义字符：" +
                        this._tokenizer.current().getSource() +
                        "！"
                    ),
                    this._tokenizer.consume()),
                  (this.errors = this._tokenizer.getProblemCollector()),
                  e
                );
              }),
              (e.buildExpression = function() {
                var e = this.relationalExp();
                if (this._tokenizer.current().isOperator("&&")) {
                  this._tokenizer.consume();
                  var t = this.buildExpression();
                  return this.reOrder(e, t, _.BinaryOperator.Add);
                }
                if (this._tokenizer.current().isOperator("||")) {
                  this._tokenizer.consume();
                  t = this.buildExpression();
                  return this.reOrder(e, t, _.BinaryOperator.Or);
                }
                return e;
              }),
              (e.relationalExp = function() {
                var e = this.algebraExp();
                if (this._tokenizer.current().isOperator("<")) {
                  this._tokenizer.consume();
                  var t = this.relationalExp();
                  return this.reOrder(e, t, _.BinaryOperator.LT);
                }
                if (this._tokenizer.current().isOperator("<=")) {
                  this._tokenizer.consume();
                  t = this.relationalExp();
                  return this.reOrder(e, t, _.BinaryOperator.LT_EQ);
                }
                if (this._tokenizer.current().isOperator("==")) {
                  this._tokenizer.consume();
                  t = this.relationalExp();
                  return this.reOrder(e, t, _.BinaryOperator.EQ);
                }
                if (this._tokenizer.current().isOperator(">=")) {
                  this._tokenizer.consume();
                  t = this.relationalExp();
                  return this.reOrder(e, t, _.BinaryOperator.GT_EQ);
                }
                if (this._tokenizer.current().isOperator(">")) {
                  this._tokenizer.consume();
                  t = this.relationalExp();
                  return this.reOrder(e, t, _.BinaryOperator.GT);
                }
                if (this._tokenizer.current().isOperator("!=")) {
                  this._tokenizer.consume();
                  t = this.relationalExp();
                  return this.reOrder(e, t, _.BinaryOperator.NEQ);
                }
                return e;
              }),
              (e.algebraExp = function() {
                var e = this.productExp();
                if (this._tokenizer.current().isOperator("+")) {
                  this._tokenizer.consume();
                  var t = this.algebraExp();
                  return this.reOrder(e, t, _.BinaryOperator.Add);
                }
                if (this._tokenizer.current().isOperator("-")) {
                  this._tokenizer.consume();
                  t = this.algebraExp();
                  return this.reOrder(e, t, _.BinaryOperator.Subtract);
                }
                return e;
              }),
              (e.productExp = function() {
                var e = this.exponentExp();
                if (this._tokenizer.current().isOperator("*")) {
                  this._tokenizer.consume();
                  var t = this.productExp();
                  return this.reOrder(e, t, _.BinaryOperator.Multiply);
                }
                if (this._tokenizer.current().isOperator("/")) {
                  this._tokenizer.consume();
                  t = this.productExp();
                  return this.reOrder(e, t, _.BinaryOperator.Divide);
                }
                if (this._tokenizer.current().isOperator("%")) {
                  this._tokenizer.consume();
                  t = this.productExp();
                  return this.reOrder(e, t, _.BinaryOperator.Modulo);
                }
                return e;
              }),
              (e.exponentExp = function() {
                var e = this.atomExp();
                return (
                  (this._tokenizer.current().isOperator("!") ||
                    this._tokenizer.current().isOperator("！")) &&
                    (e = new _.BinaryExpression(e, e, _.BinaryOperator.Not)),
                  e
                );
              }),
              (e.atomExp = function() {
                if (this._tokenizer.current().isOperator("-"))
                  return (
                    this._tokenizer.consume(),
                    (r = new _.BinaryExpression(
                      new _.ConstantExpression(0, "number"),
                      this.atomExp(),
                      _.BinaryOperator.Subtract
                    )).setSeal(),
                    r
                  );
                if (
                  this._tokenizer.current().isOperator("!") &&
                  (this._tokenizer.next().isIdentifier() ||
                    this._tokenizer.next().isKeyword() ||
                    this._tokenizer.next().isStartBracket())
                ) {
                  this._tokenizer.consume();
                  var e = this.atomExp();
                  return "bool" !== e.expType
                    ? (this._tokenizer.addError(
                        this._tokenizer.current(),
                        "取非运算(!)后应跟着bool值类型！"
                      ),
                      _.ConstantExpression.Empty())
                    : new _.BinaryExpression(e, e, _.BinaryOperator.Not);
                }
                if (
                  (this._tokenizer.current().isOperator("+") &&
                    this._tokenizer.next().isStartBracket() &&
                    this._tokenizer.consume(),
                  this._tokenizer.current().isOperator("+") &&
                    this._tokenizer.next().isConstant() &&
                    this._tokenizer.consume(),
                  this._tokenizer.current().isOperator("+") &&
                    this._tokenizer.next().isIdentifier() &&
                    this._tokenizer.consume(),
                  this._tokenizer.current().isOperator("*") &&
                    this._tokenizer.next().isIdentifier())
                ) {
                  this._tokenizer.consume();
                  var t = "*" + this._tokenizer.current().getContents();
                  return null !==
                    (c = m.VE_Expressions.getParseExpression(
                      this._projectName,
                      this._objectID,
                      t,
                      this._varScope
                    ))
                    ? (this._tokenizer.consume(), c)
                    : (null ===
                      m.VE_Expressions.getTemplateExpression(
                        this._projectName,
                        this._objectID,
                        t,
                        this._varScope
                      )
                        ? this._tokenizer.addError(
                            this._tokenizer.current(),
                            "VeryVar变量名：" +
                              t +
                              "，该VeryVar变量未定义，无法在系统中查找到，请检查！"
                          )
                        : this._tokenizer.addError(
                            this._tokenizer.current(),
                            "VeryVar变量名：" +
                              t +
                              "，公式中不支持模板变量，请检查！"
                          ),
                      this._tokenizer.consume(),
                      _.ConstantExpression.Empty());
                }
                if (this._tokenizer.current().isStartBracket()) {
                  var r,
                    i = this._bracketPair[
                      this._tokenizer.consume().getTrigger()
                    ];
                  return (
                    "BinaryExpression" ===
                      (r = this.buildExpression()).className && r.setSeal(),
                    this.expectTrigger(g.ExpressionType.OPERATOR, i),
                    r
                  );
                }
                if (this._tokenizer.current().isConstant()) {
                  var n = void 0,
                    o = "string";
                  return (
                    (o = this._tokenizer.current().isBool()
                      ? ((n =
                          "true" ===
                          this._tokenizer
                            .current()
                            .getContents()
                            .toLowerCase()),
                        "bool")
                      : this._tokenizer.current().isNumber()
                      ? ((n = parseFloat(
                          this._tokenizer.current().getContents()
                        )),
                        "number")
                      : ((n = this._tokenizer.current().getContents()),
                        "string")),
                    this._tokenizer.consume(),
                    new _.ConstantExpression(n, o)
                  );
                }
                if (this._tokenizer.current().isIdentifier()) {
                  if (this._tokenizer.next().isStartBracket()) {
                    var a = this._bracketPair[
                      this._tokenizer.next().getTrigger()
                    ];
                    return this.functionCall(a);
                  }
                  var s = void 0,
                    u = this._tokenizer.current(),
                    p = this._tokenizer.consume().getContents();
                  if (
                    p.endsWith(".") &&
                    this._tokenizer.current().isOperator("*") &&
                    this._tokenizer.next().isIdentifier()
                  ) {
                    this._tokenizer.consume();
                    var c;
                    t = p + "*" + this._tokenizer.current().getContents();
                    return null !==
                      (c = m.VE_Expressions.getParseExpression(
                        this._projectName,
                        this._objectID,
                        t,
                        this._varScope
                      ))
                      ? (this._tokenizer.consume(), c)
                      : (null ===
                        m.VE_Expressions.getTemplateExpression(
                          this._projectName,
                          this._objectID,
                          t,
                          this._varScope
                        )
                          ? this._tokenizer.addError(
                              u,
                              "VeryVar变量名：" +
                                t +
                                "，该VeryVar变量未定义，无法在系统中查找到，请检查！"
                            )
                          : this._tokenizer.addError(
                              this._tokenizer.current(),
                              "VeryVar变量名：" +
                                t +
                                "，公式中不支持模板变量，请检查！"
                            ),
                        this._tokenizer.consume(),
                        _.ConstantExpression.Empty());
                  }
                  return null === (s = this._scope.find(p))
                    ? (this._tokenizer.addError(
                        u,
                        "变量名：" +
                          p +
                          "，该变量在变量作用域中未定义，也未定义该表达式，无法识别！另外，赋值响应右侧如果是公式，不允许引用模板变量！"
                      ),
                      _.ConstantExpression.Empty())
                    : new d.VariableExpression(s);
                }
                if (this._tokenizer.current().isKeyword()) {
                  if (
                    "this" !==
                    this._tokenizer
                      .current()
                      .getContents()
                      .toLowerCase()
                      .trim()
                  )
                    return "null" ===
                      this._tokenizer
                        .current()
                        .getContents()
                        .toLowerCase()
                        .trim() ||
                      "none" ===
                        this._tokenizer
                          .current()
                          .getContents()
                          .toLowerCase()
                          .trim()
                      ? (this._tokenizer.consume(),
                        new _.VeryTemplateExpression())
                      : (this._tokenizer.addError(
                          this._tokenizer.current(),
                          "关键字：" +
                            this._tokenizer.current().getContents() +
                            "，该关键字暂无定义，请勿使用！"
                        ),
                        this._tokenizer.consume(),
                        _.ConstantExpression.Empty());
                  if (
                    this._varScope === y.VariableScope.Fsm &&
                    "" !== this._fsmID
                  ) {
                    var l = E.VE_Manager.objects(this._projectName);
                    if (null !== l) {
                      var h = l.getVeryObject(this._objectID);
                      if (null != h) {
                        var f = h.getFsm(this._fsmID);
                        if (null != f)
                          return (
                            this._tokenizer.consume(),
                            new _.VeryVarExpression(f.fsmVar)
                          );
                      }
                    }
                  }
                  return (
                    this._tokenizer.addError(
                      this._tokenizer.current(),
                      "关键字：this，该关键字只能使用与状态定义中的触发启动条件和状态逻辑表达式，此处超出使用范围，请检查！"
                    ),
                    this._tokenizer.consume(),
                    _.ConstantExpression.Empty()
                  );
                }
                return (
                  this._tokenizer.current().isSpecialIdentifier()
                    ? this._tokenizer.addError(
                        this._tokenizer.current(),
                        "特殊ID：" +
                          this._tokenizer.current().getSource() +
                          "，暂时未定义，请勿使用！"
                      )
                    : this._tokenizer.addError(
                        this._tokenizer.current(),
                        "检测到无效字符：" +
                          this._tokenizer.current().getSource() +
                          "，请检查！"
                      ),
                  this._tokenizer.consume(),
                  _.ConstantExpression.Empty()
                );
              }),
              (e.reOrder = function(e, t, r) {
                if ("BinaryExpression" === t.className) {
                  var i = t;
                  if (!i.isSealed() && i.getPriority() === i.getPriorityOp(r))
                    return this.replaceLeft(i, e, r), t;
                }
                return new _.BinaryExpression(e, t, r);
              }),
              (e.replaceLeft = function(e, t, r) {
                if ("BinaryExpression" === e.getLeftExp().className) {
                  var i = e.getLeftExp();
                  if (!i.isSealed() && i.getPriority() === i.getPriorityOp(r))
                    return void this.replaceLeft(i, t, r);
                }
                e.setLeftExp(new _.BinaryExpression(t, e.getLeftExp(), r));
              }),
              (e.functionCall = function(e) {
                var t = new n.FunctionExpression(),
                  r = this._tokenizer.consume();
                if (!o.CustomFunctions.hasFunction(r.getContents()))
                  return (
                    this._tokenizer.addError(
                      r,
                      "未定义函数：" + r.getContents() + "！"
                    ),
                    _.ConstantExpression.Empty()
                  );
                var i = o.CustomFunctions.createFunction(r.getContents());
                for (
                  t.setFunction(i), this._tokenizer.consume();
                  !this._tokenizer.current().isOperator(e) &&
                  !this._tokenizer.current().isEnd();

                )
                  0 !== t.paraCount() &&
                    this.expectTrigger(g.ExpressionType.OPERATOR, ","),
                    t.addPara(this.buildExpression());
                return (
                  this.expectTrigger(g.ExpressionType.OPERATOR, e),
                  t.evaluate(),
                  t.paraCount() > i.parameterNumber() &&
                  0 <= i.parameterNumber()
                    ? (this._tokenizer.addError(
                        r,
                        "函数参数不一致，当前函数：" +
                          r.getContents() +
                          "，规定参数个数Max：" +
                          i.parameterNumber() +
                          "，当前参数个数：" +
                          t.paraCount() +
                          "，请检查！"
                      ),
                      _.ConstantExpression.Empty())
                    : t
                );
              }),
              (e.expectTrigger = function(e, t) {
                this._tokenizer.current().matches(e, t)
                  ? this._tokenizer.consume()
                  : this._tokenizer.addError(
                      this._tokenizer.current(),
                      "期望获得：" +
                        t +
                        "，当前值为：" +
                        this._tokenizer.current().getTrigger() +
                        "，请检查！"
                    );
              }),
              (e.getProjectCollector = function() {
                return this._tokenizer.getProblemCollector();
              }),
              (e._bracketPair = {}),
              (e.errors = []),
              (e._projectName = ""),
              (e._objectID = ""),
              (e._fsmID = ""),
              (e._varScope = y.VariableScope.Local),
              e
            );
          })();
        (r.VE_ExpressionParsing = i).init();
      },
      {
        "../enum": 17,
        "../manager": 49,
        "./expressionEnum": 20,
        "./expressions": 22,
        "./functionExpression": 24,
        "./functions": 25,
        "./tokenizer": 31,
        "./variableExpression": 33,
        "./veryExpressions": 34
      }
    ],
    22: [
      function(e, t, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", { value: !0 });
        var i = e("../utility/dictionary"),
          n = e("../template"),
          o = (function() {
            function e() {}
            return (
              Object.defineProperty(e.prototype, "expType", {
                get: function() {
                  return "bool";
                },
                enumerable: !0,
                configurable: !0
              }),
              Object.defineProperty(e.prototype, "className", {
                get: function() {
                  return "TrueExpression";
                },
                enumerable: !0,
                configurable: !0
              }),
              Object.defineProperty(e.prototype, "value", {
                get: function() {
                  return !0;
                },
                enumerable: !0,
                configurable: !0
              }),
              (e.prototype.evaluate = function() {
                return !0;
              }),
              (e.prototype.clone = function() {
                return new e();
              }),
              (e.prototype.toString = function() {
                return "true";
              }),
              e
            );
          })();
        r.TrueExpression = o;
        var a,
          s,
          u = (function() {
            function e(e, t) {
              (this._expType = "string"),
                (this._value = e),
                (this._expType = t);
            }
            return (
              Object.defineProperty(e.prototype, "expType", {
                get: function() {
                  return this._expType;
                },
                enumerable: !0,
                configurable: !0
              }),
              Object.defineProperty(e.prototype, "className", {
                get: function() {
                  return "ConstantExpression";
                },
                enumerable: !0,
                configurable: !0
              }),
              (e.prototype.evaluate = function() {
                return this._value;
              }),
              (e.prototype.clone = function() {
                return new e(this._value, this._expType);
              }),
              (e.Empty = function() {
                return new e(null, "string");
              }),
              (e.prototype.isEmpty = function() {
                return "string" === this._expType && null === this._value;
              }),
              (e.prototype.toString = function() {
                return null !== this._value ? this._value.toString() : "null";
              }),
              e
            );
          })();
        (r.ConstantExpression = u),
          ((s = a = r.BinaryOperator || (r.BinaryOperator = {})).Add = "+"),
          (s.Subtract = "-"),
          (s.Multiply = "*"),
          (s.Divide = "/"),
          (s.Modulo = "%"),
          (s.Power = "^"),
          (s.LT = "<"),
          (s.LT_EQ = "<="),
          (s.EQ = "="),
          (s.GT_EQ = ">="),
          (s.GT = ">"),
          (s.NEQ = "!="),
          (s.And = "&&"),
          (s.Or = "||"),
          (s.Not = "!");
        var p = (function() {
          function r(e, t, r) {
            (this._expType = ""),
              (this.isRight = !0),
              (this._op = a.EQ),
              (this._isSealed = !1),
              (this._left = e),
              (this._right = t),
              (this._op = r),
              (this._expType = this.resultAutoType(e, t, r)),
              "null" === this._expType &&
                ((this.isRight = !1),
                console.log(
                  "公式两边类型不匹配，左侧类型：" +
                    e.expType +
                    "，右侧类型：" +
                    t.expType +
                    "，计算类型：" +
                    r.toString()
                ));
          }
          return (
            Object.defineProperty(r.prototype, "expType", {
              get: function() {
                return this._expType;
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(r.prototype, "className", {
              get: function() {
                return "BinaryExpression";
              },
              enumerable: !0,
              configurable: !0
            }),
            (r.init = function() {
              (this._opDic["+"] = a.Add),
                (this._opDic["-"] = a.Subtract),
                (this._opDic["*"] = a.Multiply),
                (this._opDic["/"] = a.Divide),
                (this._opDic["%"] = a.Modulo),
                (this._opDic["**"] = a.Power),
                (this._opDic["^"] = a.Power),
                (this._opDic["<"] = a.LT),
                (this._opDic["<="] = a.LT_EQ),
                (this._opDic["=="] = a.EQ),
                (this._opDic[">="] = a.GT_EQ),
                (this._opDic[">"] = a.GT),
                (this._opDic["!="] = a.NEQ),
                (this._opDic["&&"] = a.And),
                (this._opDic["||"] = a.Or),
                (this._opDic["!"] = a.Not),
                (this._opDic["！"] = a.Not),
                this._priority.Add(a.Not, 2),
                this._priority.Add(a.Power, 3),
                this._priority.Add(a.Multiply, 4),
                this._priority.Add(a.Divide, 4),
                this._priority.Add(a.Modulo, 4),
                this._priority.Add(a.Add, 5),
                this._priority.Add(a.Subtract, 5),
                this._priority.Add(a.LT, 6),
                this._priority.Add(a.LT_EQ, 6),
                this._priority.Add(a.EQ, 6),
                this._priority.Add(a.GT_EQ, 6),
                this._priority.Add(a.GT, 6),
                this._priority.Add(a.NEQ, 6),
                this._priority.Add(a.And, 7),
                this._priority.Add(a.Or, 7);
            }),
            (r.prototype.resultAutoType = function(e, t, r) {
              return r === a.Add
                ? "string" === e.expType || "string" === t.expType
                  ? "string"
                  : "bool" === e.expType || "bool" === t.expType
                  ? "null"
                  : "number" === e.expType || "number" === t.expType
                  ? "number"
                  : "vector3" === e.expType || "vector3" === t.expType
                  ? "vector3"
                  : "vector2" === e.expType || "vector2" === t.expType
                  ? "vector2"
                  : "null"
                : r === a.Divide ||
                  r === a.Multiply ||
                  r === a.Modulo ||
                  r === a.Power ||
                  r === a.Subtract
                ? "string" === e.expType ||
                  "string" === t.expType ||
                  "bool" === e.expType ||
                  "bool" === e.expType
                  ? "null"
                  : "vector3" === e.expType &&
                    "vector3" === t.expType &&
                    r === a.Subtract
                  ? "vector3"
                  : "vector2" === e.expType &&
                    "vector2" === t.expType &&
                    r === a.Subtract
                  ? "vector2"
                  : ("number" === e.expType &&
                      "vector3" === t.expType &&
                      r === a.Multiply) ||
                    ("vector3" === e.expType &&
                      "number" === t.expType &&
                      r == a.Multiply)
                  ? "vector3"
                  : ("number" === e.expType &&
                      "vector2" === t.expType &&
                      r === a.Multiply) ||
                    ("vector2" === e.expType &&
                      "number" === t.expType &&
                      r == a.Multiply)
                  ? "vector2"
                  : "vector3" === e.expType &&
                    "number" === t.expType &&
                    r === a.Divide
                  ? "vector3"
                  : "vector2" === e.expType &&
                    "number" === t.expType &&
                    r === a.Divide
                  ? "vector2"
                  : "number" === e.expType || "number" === t.expType
                  ? "number"
                  : "null"
                : r === a.LT || r === a.LT_EQ || r === a.GT_EQ || r === a.GT
                ? "string" === e.expType ||
                  "string" === t.expType ||
                  "bool" === e.expType ||
                  "bool" === t.expType
                  ? "null"
                  : "bool"
                : r === a.NEQ || r === a.EQ
                ? t.expType !== e.expType
                  ? "null"
                  : "bool"
                : r === a.Not
                ? "bool" !== t.expType
                  ? "null"
                  : "bool"
                : "string";
            }),
            (r.prototype.setLeftExp = function(e) {
              this._left = e;
            }),
            (r.prototype.setRightExp = function(e) {
              this._right = e;
            }),
            (r.prototype.getOp = function() {
              return this._op;
            }),
            (r.prototype.getLeftExp = function() {
              return this._left;
            }),
            (r.prototype.getRightExp = function() {
              return this._right;
            }),
            (r.prototype.isSealed = function() {
              return this._isSealed;
            }),
            (r.prototype.setSeal = function() {
              this._isSealed = !0;
            }),
            (r.prototype.toString = function() {
              return (
                "(" +
                this._left.toString() +
                " " +
                this._op.toString() +
                " " +
                this._right.toString() +
                ")"
              );
            }),
            (r.prototype.clone = function() {
              return new r(this._left.clone(), this._right.clone(), this._op);
            }),
            (r.prototype.evaluate = function() {
              if ("null" === this._expType) return null;
              "FunctionExpression" === this._left.className &&
                this._left.evaluate(),
                "FunctionExpression" === this._right.className &&
                  this._right.evaluate(),
                (this._expType = this.resultAutoType(
                  this._left,
                  this._right,
                  this._op
                ));
              var e = this._left.evaluate(),
                t = this._right.evaluate();
              if (null === e || null === t) return null;
              if (this._op === a.Add)
                return "string" === this._expType
                  ? e.toString() + t.toString()
                  : "number" === this._expType
                  ? e + t
                  : "vector3" === this._expType
                  ? e.add(t)
                  : "vector2" === this._expType
                  ? e.add(t)
                  : null;
              if (this._op === a.Subtract)
                return "number" === this._expType
                  ? e - t
                  : "vector3" === this._expType
                  ? e.subtract(t)
                  : "vector2" === this._expType
                  ? e.subtract(t)
                  : null;
              if (this._op === a.Multiply) {
                if ("number" === this._expType) return e * t;
                if ("vector3" === this._expType)
                  return "number" == typeof e
                    ? t.multiplyByFloats(e, e, e)
                    : "number" == typeof t
                    ? e.multiplyByFloats(t, t, t)
                    : null;
                if ("vector2" === this._expType)
                  return "number" == typeof e
                    ? t.multiplyByFloats(e, e)
                    : "number" == typeof t
                    ? e.multiplyByFloats(t, t)
                    : null;
              } else {
                if (this._op !== a.Divide) {
                  if (this._op === a.Modulo)
                    return "number" == typeof e && "number" == typeof t
                      ? e % t
                      : null;
                  if (this._op === a.Power)
                    return "number" == typeof e && "number" == typeof t
                      ? Math.pow(e, t)
                      : null;
                  if (this._op === a.And) {
                    var r = this.getBoolean(e),
                      i = this.getBoolean(t);
                    return r && i;
                  }
                  if (this._op !== a.Or)
                    return this._op === a.LT
                      ? e < t
                      : this._op === a.LT_EQ
                      ? e <= t
                      : this._op === a.GT_EQ
                      ? t <= e
                      : this._op === a.GT
                      ? t < e
                      : this._op === a.EQ
                      ? e === t
                      : this._op === a.NEQ
                      ? e !== t
                      : this._op === a.Not
                      ? !this.getBoolean(t)
                      : !this.getBoolean(e);
                  (r = this.getBoolean(e)), (i = this.getBoolean(t));
                  return r || i;
                }
                if ("number" === this._expType) return e / t;
                if ("vector3" === this._expType)
                  return "number" == typeof t
                    ? new BABYLON.Vector3(e.x / t, e.y / t, e.z / t)
                    : null;
                if ("vector2" === this._expType)
                  return "number" == typeof t
                    ? new BABYLON.Vector2(e.x / t, e.y / t)
                    : null;
              }
            }),
            (r.prototype.getBoolean = function(e) {
              return "number" == typeof e
                ? 0 !== e
                : "string" == typeof e
                ? "" !== e
                : "boolean" == typeof e && e;
            }),
            (r.prototype.getPriority = function() {
              var e = r._priority.GetValue(this._op);
              return null === e ? 100 : e;
            }),
            (r.prototype.getPriorityOp = function(e) {
              var t = r._priority.GetValue(e);
              return null === t ? 100 : t;
            }),
            (r._opDic = {}),
            (r._priority = new i.Dictionary()),
            r
          );
        })();
        r.BinaryExpression = p;
        var c = (function() {
          function e(e) {
            this._value = e;
          }
          return (
            Object.defineProperty(e.prototype, "expType", {
              get: function() {
                return this._value ? this._value.varType : "null";
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(e.prototype, "className", {
              get: function() {
                return "VeryVarExpression";
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(e.prototype, "value", {
              get: function() {
                return this._value;
              },
              enumerable: !0,
              configurable: !0
            }),
            (e.prototype.evaluate = function() {
              return this._value.getValue();
            }),
            (e.prototype.clone = function() {
              return new e(this._value.clone());
            }),
            (e.prototype.toString = function() {
              return this._value ? this._value.toString() : "null";
            }),
            e
          );
        })();
        r.VeryVarExpression = c;
        var l = (function() {
          function t() {
            (this._isTemplate = !1),
              (this._template = new n.VE_Template("", ""));
          }
          return (
            Object.defineProperty(t.prototype, "expType", {
              get: function() {
                return "bool";
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(t.prototype, "className", {
              get: function() {
                return "VeryTemplateExpression";
              },
              enumerable: !0,
              configurable: !0
            }),
            (t.prototype.setTemplate = function(e) {
              (this._isTemplate = !0), (this._template = e);
            }),
            (t.prototype.evaluate = function() {
              return (
                !!this._isTemplate &&
                (!!this._template && null !== this._template.templateInstance)
              );
            }),
            (t.prototype.clone = function() {
              var e = new t();
              return (
                (e._template = this._template),
                (e._isTemplate = this._isTemplate),
                e
              );
            }),
            (t.prototype.toString = function() {
              return this._isTemplate && this._template
                ? (null === this._template.templateInstance).toString()
                : "false";
            }),
            t
          );
        })();
        (r.VeryTemplateExpression = l), p.init();
      },
      { "../template": 64, "../utility/dictionary": 71 }
    ],
    23: [
      function(e, t, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", { value: !0 });
        var i = (function() {
          function e() {
            (this.itemBuffer = []),
              (this.endReached = !1),
              (this.problemCollector = []),
              (this.endOfInputIndicator = void 0);
          }
          return (
            (e.prototype.next = function() {
              return this.nextOffset(1);
            }),
            (e.prototype.nextOffset = function(e) {
              for (; this.itemBuffer.length <= e && !this.endReached; ) {
                var t = this.fetch();
                void 0 !== t ? this.itemBuffer.push(t) : (this.endReached = !0);
              }
              return e >= this.itemBuffer.length
                ? (void 0 === this.endOfInputIndicator &&
                    (this.endOfInputIndicator = this.endOfInput()),
                  this.endOfInputIndicator)
                : this.itemBuffer[e];
            }),
            (e.prototype.current = function() {
              return this.nextOffset(0);
            }),
            (e.prototype.consume = function() {
              var e = this.current();
              return this.consumeNext(1), e;
            }),
            (e.prototype.consumeNext = function(e) {
              if (!(e < 0))
                for (; 0 < e--; )
                  if (0 !== this.itemBuffer.length) this.itemBuffer.shift();
                  else {
                    if (this.endReached) return;
                    void 0 === this.fetch() && (this.endReached = !0);
                  }
            }),
            (e.prototype.getProblemCollector = function() {
              return this.problemCollector;
            }),
            (e.prototype.setProblemCollector = function(e) {
              this.problemCollector = e;
            }),
            e
          );
        })();
        r.ForwardQuery = i;
      },
      {}
    ],
    24: [
      function(e, t, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", { value: !0 });
        var i = (function() {
          function r() {
            this._paras = [];
          }
          return (
            Object.defineProperty(r.prototype, "expType", {
              get: function() {
                return this._function.expType;
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(r.prototype, "className", {
              get: function() {
                return this._function.className;
              },
              enumerable: !0,
              configurable: !0
            }),
            (r.prototype.setFunction = function(e) {
              this._function = e;
            }),
            (r.prototype.addPara = function(e) {
              this._paras.push(e);
            }),
            (r.prototype.paraCount = function() {
              return this._paras.length;
            }),
            (r.prototype.evaluate = function() {
              var e = null;
              try {
                e = this._function.evaluate(this._paras);
              } catch (e) {
                return console.log("自定义函数编译错误，错误信息：" + e), null;
              }
              return e;
            }),
            (r.prototype.clone = function() {
              var e = new r();
              e._function = this._function;
              for (var t = 0; t < this._paras.length; t++)
                e._paras.push(this._paras[t].clone());
              return e;
            }),
            (r.prototype.toString = function() {
              for (
                var e = this._function.className + "(", t = 0;
                t < this._paras.length;
                t++
              )
                e +=
                  0 < t
                    ? "," + this._paras[t].toString()
                    : this._paras[t].toString();
              return e + ")";
            }),
            r
          );
        })();
        r.FunctionExpression = i;
      },
      {}
    ],
    25: [
      function(e, t, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", { value: !0 });
        var n = e("../html"),
          i = (function() {
            function e() {}
            return (
              Object.defineProperty(e.prototype, "expType", {
                get: function() {
                  return "number";
                },
                enumerable: !0,
                configurable: !0
              }),
              Object.defineProperty(e.prototype, "className", {
                get: function() {
                  return "pow";
                },
                enumerable: !0,
                configurable: !0
              }),
              (e.prototype.parameterNumber = function() {
                return 2;
              }),
              (e.prototype.evaluate = function(e) {
                var t = Math.pow(e[0].evaluate(), e[1].evaluate());
                return NaN === t
                  ? void n.ShowError.showError(
                      "表达式编译错误：Pow函数参数错误，参数1类型：" +
                        e[0].expType +
                        "，参数1值：" +
                        e[0].evaluate() +
                        "，参数2类型：" +
                        e[1].expType +
                        "，参数2值：" +
                        e[1].evaluate() +
                        "，请检查！"
                    )
                  : t;
              }),
              e
            );
          })();
        r.Pow = i;
        var o = (function() {
          function e() {}
          return (
            Object.defineProperty(e.prototype, "expType", {
              get: function() {
                return "number";
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(e.prototype, "className", {
              get: function() {
                return "ln";
              },
              enumerable: !0,
              configurable: !0
            }),
            (e.prototype.parameterNumber = function() {
              return 1;
            }),
            (e.prototype.evaluate = function(e) {
              var t = Math.log(e[0].evaluate());
              return NaN === t || t === 1 / 0
                ? void n.ShowError.showError(
                    "表达式编译错误：Ln函数参数错误，参数类型：" +
                      e[0].expType +
                      "，参数值：" +
                      e[0].evaluate() +
                      "，请检查！"
                  )
                : t;
            }),
            e
          );
        })();
        r.Ln = o;
        var a = (function() {
          function e() {}
          return (
            Object.defineProperty(e.prototype, "expType", {
              get: function() {
                return "number";
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(e.prototype, "className", {
              get: function() {
                return "lg";
              },
              enumerable: !0,
              configurable: !0
            }),
            (e.prototype.parameterNumber = function() {
              return 1;
            }),
            (e.prototype.evaluate = function(e) {
              var t = Math.log10(e[0].evaluate());
              return NaN === t || t === 1 / 0
                ? void n.ShowError.showError(
                    "表达式编译错误：Lg函数参数错误，参数类型：" +
                      e[0].expType +
                      "，参数值：" +
                      e[0].evaluate() +
                      "，请检查！"
                  )
                : t;
            }),
            e
          );
        })();
        r.Lg = a;
        var s = (function() {
          function e() {}
          return (
            Object.defineProperty(e.prototype, "expType", {
              get: function() {
                return "number";
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(e.prototype, "className", {
              get: function() {
                return "sqrt";
              },
              enumerable: !0,
              configurable: !0
            }),
            (e.prototype.parameterNumber = function() {
              return 1;
            }),
            (e.prototype.evaluate = function(e) {
              var t = Math.sqrt(e[0].evaluate());
              return NaN === t
                ? void n.ShowError.showError(
                    "表达式编译错误：Sqrt函数参数错误，参数类型：" +
                      e[0].expType +
                      "，参数值：" +
                      e[0].evaluate() +
                      "，请检查！"
                  )
                : t;
            }),
            e
          );
        })();
        r.Sqrt = s;
        var u = (function() {
          function e() {}
          return (
            Object.defineProperty(e.prototype, "expType", {
              get: function() {
                return "number";
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(e.prototype, "className", {
              get: function() {
                return "abs";
              },
              enumerable: !0,
              configurable: !0
            }),
            (e.prototype.parameterNumber = function() {
              return 1;
            }),
            (e.prototype.evaluate = function(e) {
              var t = Math.abs(e[0].evaluate());
              return NaN === t
                ? void n.ShowError.showError(
                    "表达式编译错误：Abs函数参数错误，参数类型：" +
                      e[0].expType +
                      "，参数值：" +
                      e[0].evaluate() +
                      "，请检查！"
                  )
                : t;
            }),
            e
          );
        })();
        r.Abs = u;
        var p = (function() {
          function e() {}
          return (
            Object.defineProperty(e.prototype, "expType", {
              get: function() {
                return "number";
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(e.prototype, "className", {
              get: function() {
                return "random";
              },
              enumerable: !0,
              configurable: !0
            }),
            (e.prototype.parameterNumber = function() {
              return 2;
            }),
            (e.prototype.evaluate = function(e) {
              var t = e[0].evaluate(),
                r = e[1].evaluate() - e[0].evaluate(),
                i = Math.random() * r + t;
              return NaN === i
                ? void n.ShowError.showError(
                    "表达式编译错误：Random函数参数错误，参数1类型：" +
                      e[0].expType +
                      "，参数1值：" +
                      e[0].evaluate() +
                      "，参数2类型：" +
                      e[1].expType +
                      "，参数2值：" +
                      e[1].evaluate() +
                      "，请检查！"
                  )
                : i;
            }),
            e
          );
        })();
        r.Random = p;
        var c = (function() {
          function e() {}
          return (
            Object.defineProperty(e.prototype, "expType", {
              get: function() {
                return "number";
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(e.prototype, "className", {
              get: function() {
                return "round";
              },
              enumerable: !0,
              configurable: !0
            }),
            (e.prototype.parameterNumber = function() {
              return 1;
            }),
            (e.prototype.evaluate = function(e) {
              var t = Math.round(e[0].evaluate());
              return NaN === t
                ? void n.ShowError.showError(
                    "表达式编译错误：Round函数参数错误，参数类型：" +
                      e[0].expType +
                      "，参数值：" +
                      e[0].evaluate() +
                      "，请检查！"
                  )
                : t;
            }),
            e
          );
        })();
        r.Round = c;
        var l = (function() {
          function e() {}
          return (
            Object.defineProperty(e.prototype, "expType", {
              get: function() {
                return "number";
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(e.prototype, "className", {
              get: function() {
                return "sin";
              },
              enumerable: !0,
              configurable: !0
            }),
            (e.prototype.parameterNumber = function() {
              return 1;
            }),
            (e.prototype.evaluate = function(e) {
              var t = Math.sin(e[0].evaluate());
              return NaN === t
                ? void n.ShowError.showError(
                    "表达式编译错误：Sin函数参数错误，参数类型：" +
                      e[0].expType +
                      "，参数值：" +
                      e[0].evaluate() +
                      "，请检查！"
                  )
                : t;
            }),
            e
          );
        })();
        r.Sin = l;
        var h = (function() {
          function e() {}
          return (
            Object.defineProperty(e.prototype, "expType", {
              get: function() {
                return "number";
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(e.prototype, "className", {
              get: function() {
                return "asin";
              },
              enumerable: !0,
              configurable: !0
            }),
            (e.prototype.parameterNumber = function() {
              return 1;
            }),
            (e.prototype.evaluate = function(e) {
              var t = Math.asin(e[0].evaluate());
              return NaN === t
                ? void n.ShowError.showError(
                    "表达式编译错误：ASin函数参数错误，参数类型：" +
                      e[0].expType +
                      "，参数值：" +
                      e[0].evaluate() +
                      "，请检查！"
                  )
                : t;
            }),
            e
          );
        })();
        r.ASin = h;
        var f = (function() {
          function e() {}
          return (
            Object.defineProperty(e.prototype, "expType", {
              get: function() {
                return "number";
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(e.prototype, "className", {
              get: function() {
                return "cos";
              },
              enumerable: !0,
              configurable: !0
            }),
            (e.prototype.parameterNumber = function() {
              return 1;
            }),
            (e.prototype.evaluate = function(e) {
              var t = Math.cos(e[0].evaluate());
              return NaN === t
                ? void n.ShowError.showError(
                    "表达式编译错误：Cos函数参数错误，参数类型：" +
                      e[0].expType +
                      "，参数值：" +
                      e[0].evaluate() +
                      "，请检查！"
                  )
                : t;
            }),
            e
          );
        })();
        r.Cos = f;
        var _ = (function() {
          function e() {}
          return (
            Object.defineProperty(e.prototype, "expType", {
              get: function() {
                return "number";
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(e.prototype, "className", {
              get: function() {
                return "acos";
              },
              enumerable: !0,
              configurable: !0
            }),
            (e.prototype.parameterNumber = function() {
              return 1;
            }),
            (e.prototype.evaluate = function(e) {
              var t = Math.acos(e[0].evaluate());
              return NaN === t
                ? void n.ShowError.showError(
                    "表达式编译错误：ACos函数参数错误，参数类型：" +
                      e[0].expType +
                      "，参数值：" +
                      e[0].evaluate() +
                      "，请检查！"
                  )
                : t;
            }),
            e
          );
        })();
        r.ACos = _;
        var g = (function() {
          function e() {}
          return (
            Object.defineProperty(e.prototype, "expType", {
              get: function() {
                return "number";
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(e.prototype, "className", {
              get: function() {
                return "tan";
              },
              enumerable: !0,
              configurable: !0
            }),
            (e.prototype.parameterNumber = function() {
              return 1;
            }),
            (e.prototype.evaluate = function(e) {
              var t = Math.tan(e[0].evaluate());
              return NaN === t
                ? void n.ShowError.showError(
                    "表达式编译错误：Tan函数参数错误，参数类型：" +
                      e[0].expType +
                      "，参数值：" +
                      e[0].evaluate() +
                      "，请检查！"
                  )
                : t;
            }),
            e
          );
        })();
        r.Tan = g;
        var d = (function() {
          function e() {}
          return (
            Object.defineProperty(e.prototype, "expType", {
              get: function() {
                return "number";
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(e.prototype, "className", {
              get: function() {
                return "atan";
              },
              enumerable: !0,
              configurable: !0
            }),
            (e.prototype.parameterNumber = function() {
              return 1;
            }),
            (e.prototype.evaluate = function(e) {
              var t = Math.atan(e[0].evaluate());
              return NaN === t
                ? void n.ShowError.showError(
                    "表达式编译错误：ATan函数参数错误，参数类型：" +
                      e[0].expType +
                      "，参数值：" +
                      e[0].evaluate() +
                      "，请检查！"
                  )
                : t;
            }),
            e
          );
        })();
        r.ATan = d;
        var y = (function() {
          function e() {}
          return (
            (e.hasFunction = function(e) {
              return (e = e.toLowerCase()), !!this._functions[e];
            }),
            (e.addFunction = function(e) {
              var t = e.className.toLowerCase();
              this._functions[t]
                ? n.ShowError.showError(
                    "自定义函数初始化错误，函数ID重复，当前函数ID：" +
                      t +
                      "，请为当前自定义函数重新分配ID！"
                  )
                : (this._functions[t] = e);
            }),
            (e.createFunction = function(e) {
              return (e = e.toLowerCase()), Object.create(this._functions[e]);
            }),
            (e.remove = function(e) {
              (e = e.toLowerCase()), delete this._functions[e];
            }),
            (e._functions = {}),
            e
          );
        })();
        (r.CustomFunctions = y).addFunction(new i()),
          y.addFunction(new o()),
          y.addFunction(new a()),
          y.addFunction(new s()),
          y.addFunction(new u()),
          y.addFunction(new p()),
          y.addFunction(new c()),
          y.addFunction(new l()),
          y.addFunction(new h()),
          y.addFunction(new f()),
          y.addFunction(new _()),
          y.addFunction(new g()),
          y.addFunction(new d());
      },
      { "../html": 39 }
    ],
    26: [
      function(e, t, r) {
        "use strict";
        function i(e) {
          for (var t in e) r.hasOwnProperty(t) || (r[t] = e[t]);
        }
        Object.defineProperty(r, "__esModule", { value: !0 }),
          i(e("./expressionEnum")),
          i(e("./expressions")),
          i(e("./functions")),
          i(e("./positions")),
          i(e("./expChar")),
          i(e("./token")),
          i(e("./forwardQuery")),
          i(e("./tokenizer")),
          i(e("./tokenReader")),
          i(e("./variable")),
          i(e("./variableExpression")),
          i(e("./scope")),
          i(e("./functionExpression")),
          i(e("./expressionParsing")),
          i(e("./expManager")),
          i(e("./veryExpressions"));
      },
      {
        "./expChar": 18,
        "./expManager": 19,
        "./expressionEnum": 20,
        "./expressionParsing": 21,
        "./expressions": 22,
        "./forwardQuery": 23,
        "./functionExpression": 24,
        "./functions": 25,
        "./positions": 27,
        "./scope": 28,
        "./token": 29,
        "./tokenReader": 30,
        "./tokenizer": 31,
        "./variable": 32,
        "./variableExpression": 33,
        "./veryExpressions": 34
      }
    ],
    27: [
      function(e, t, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", { value: !0 });
        var n,
          i,
          o = (function() {
            function e(e) {
              (this._value = ""),
                (this._line = 0),
                (this._pos = 0),
                (this._value = e),
                (this._line = 1),
                (this._pos = 1);
            }
            return (
              (e.prototype.getValue = function() {
                return this._value;
              }),
              (e.prototype.getLine = function() {
                return this._line;
              }),
              (e.prototype.getPos = function() {
                return this._pos;
              }),
              e
            );
          })();
        (r.NameLocation = o),
          ((i = n = r.SeverityExp || (r.SeverityExp = {}))[(i.Warning = 0)] =
            "Warning"),
          (i[(i.Error = 1)] = "Error");
        var a = (function() {
          function i(e, t, r) {
            (this._pos = e), (this._message = t), (this._severity = r);
          }
          return (
            (i.Warning = function(e, t) {
              var r = t;
              return (
                0 < e.getLine() &&
                  (r =
                    "警告>>>行号：" +
                    e.getLine() +
                    "，字符序号：" +
                    e.getPos() +
                    "，警告信息：" +
                    t),
                new i(e, r, n.Warning)
              );
            }),
            (i.Error = function(e, t) {
              var r = t;
              return (
                0 < e.getLine() &&
                  (r =
                    "错误>>>行号：" +
                    e.getLine() +
                    "，字符序号：" +
                    e.getPos() +
                    "，警告信息：" +
                    t),
                new i(e, r, n.Error)
              );
            }),
            (i.prototype.getPosition = function() {
              return this._pos;
            }),
            (i.prototype.getMessage = function() {
              return this._message;
            }),
            (i.prototype.getSeverity = function() {
              return this._severity;
            }),
            (i.prototype.toString = function() {
              return (
                "类型：" +
                this._severity.toString() +
                "，信息：" +
                this._message
              );
            }),
            i
          );
        })();
        r.ParseError = a;
      },
      {}
    ],
    28: [
      function(e, t, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", { value: !0 });
        var n = e("./variable"),
          i = (function() {
            function r() {
              (this._parent = void 0), (this._context = {});
            }
            return (
              (r.Create = function() {
                var e = new r();
                return (e._parent = r.GetRootScope()), e;
              }),
              (r.GetRootScope = function() {
                return (
                  void 0 === r._root &&
                    ((r._root = new r())
                      .setVariable("PI", "number", Math.PI)
                      .makeConstant(Math.PI),
                    r._root
                      .setVariable("EULER", "number", Math.E)
                      .makeConstant(Math.E)),
                  r._root
                );
              }),
              (r.CreateWithParent = function(e) {
                var t = r.Create();
                return (t._parent = e), t;
              }),
              (r.prototype.find = function(e) {
                return this._context[e]
                  ? this._context[e]
                  : void 0 !== this._parent
                  ? this._parent.find(e)
                  : null;
              }),
              (r.prototype.setVariable = function(e, t, r) {
                var i = this.find(e);
                return null !== i
                  ? (i.setType(t), i.setValue(r), i)
                  : this.createVariable(e, t, r);
              }),
              (r.prototype.createVariable = function(e, t, r) {
                if (this._context[e])
                  return (
                    this._context[e].setType(t),
                    this._context[e].setValue(r),
                    this._context[e]
                  );
                var i = new n.Variable(e, t, r);
                return (this._context[e] = i);
              }),
              (r.prototype.setValue = function(e, t) {
                this._context[e] && this._context[e].setValue(t);
              }),
              (r.prototype.isCreated = function(e) {
                return (
                  !!this._context[e] ||
                  (void 0 !== this._parent && null !== this._parent.find(e))
                );
              }),
              (r.prototype.clear = function() {
                this._context = {};
              }),
              r
            );
          })();
        r.Scope = i;
      },
      { "./variable": 32 }
    ],
    29: [
      function(e, t, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", { value: !0 });
        var n = e("./expressionEnum"),
          i = (function() {
            function i() {
              (this.type = n.ExpressionType.STRING),
                (this._source = ""),
                (this._contents = ""),
                (this._trigger = ""),
                (this._line = 0),
                (this._pos = 0);
            }
            return (
              (i.Create = function(e, t) {
                var r = new i();
                return (
                  (r.type = e),
                  (r._line = t.getLine()),
                  (r._pos = t.getPos()),
                  r
                );
              }),
              (i.CreateAndFill = function(e, t) {
                var r = new i();
                return (
                  (r.type = e),
                  (r._line = t.getLine()),
                  (r._pos = t.getPos()),
                  (r._contents = t.getValue()),
                  (r._trigger = t.getValue()),
                  (r._source = t.toString()),
                  r
                );
              }),
              (i.prototype.addToTrigger = function(e) {
                return (
                  (this._trigger += e.getValue()),
                  (this._source += e.getValue()),
                  this
                );
              }),
              (i.prototype.addToSource = function(e) {
                return (this._source += e.getValue()), this;
              }),
              (i.prototype.addToContentChar = function(e) {
                return this.addToContent(e.getValue()), this;
              }),
              (i.prototype.addToContent = function(e) {
                return (this._contents += e), (this._source += e), this;
              }),
              (i.prototype.getTrigger = function() {
                return this._trigger;
              }),
              (i.prototype.getTokenType = function() {
                return this.type;
              }),
              (i.prototype.getContents = function() {
                return this._contents;
              }),
              (i.prototype.getSource = function() {
                return this._source;
              }),
              (i.prototype.getLine = function() {
                return this._line;
              }),
              (i.prototype.getPos = function() {
                return this._pos;
              }),
              (i.prototype.setTokenType = function(e) {
                this.type = e;
              }),
              (i.prototype.setTrigger = function(e) {
                this._trigger = e;
              }),
              (i.prototype.setContent = function(e) {
                this._contents = e;
              }),
              (i.prototype.setSource = function(e) {
                this._source = e;
              }),
              (i.prototype.isEnd = function() {
                return this.type === n.ExpressionType.EOI;
              }),
              (i.prototype.is = function(e) {
                return this.type === e;
              }),
              (i.prototype.matches = function(e, t) {
                return !!this.is(e) && ("" !== t && this.getTrigger() === t);
              }),
              (i.prototype.isOperator = function(e) {
                if (0 === e.length) return this.is(n.ExpressionType.OPERATOR);
                for (var t = 0; t < e.length; t++)
                  if (this.matches(n.ExpressionType.OPERATOR, e[t])) return !0;
                return !1;
              }),
              (i.prototype.isStartBracket = function() {
                return (
                  !!this.is(n.ExpressionType.OPERATOR) &&
                  ("(" === this._trigger || "（" === this._trigger)
                );
              }),
              (i.prototype.isEndBracket = function() {
                return (
                  !!this.is(n.ExpressionType.OPERATOR) &&
                  (")" === this._trigger || "）" === this._trigger)
                );
              }),
              (i.prototype.isStartSquareBracket = function() {
                return (
                  !!this.is(n.ExpressionType.OPERATOR) &&
                  ("[" === this._trigger || "【" === this._trigger)
                );
              }),
              (i.prototype.isEndSquareBracket = function() {
                return (
                  !!this.is(n.ExpressionType.OPERATOR) &&
                  ("]" === this._trigger || "】" === this._trigger)
                );
              }),
              (i.prototype.isStartBrace = function() {
                return (
                  !!this.is(n.ExpressionType.OPERATOR) && "{" === this._trigger
                );
              }),
              (i.prototype.isEndBrace = function() {
                return (
                  !!this.is(n.ExpressionType.OPERATOR) && "}" === this._trigger
                );
              }),
              (i.prototype.isKeyword = function() {
                for (var e = [], t = 0; t < arguments.length; t++)
                  e[t] = arguments[t];
                if (0 === e.length) return this.is(n.ExpressionType.KEYWORD);
                for (var r = 0; r < e.length; r++)
                  if (this.matches(n.ExpressionType.KEYWORD, e[r])) return !0;
                return !1;
              }),
              (i.prototype.isIdentifier = function() {
                for (var e = [], t = 0; t < arguments.length; t++)
                  e[t] = arguments[t];
                if (0 === e.length) return this.is(n.ExpressionType.ID);
                for (var r = 0; r < e.length; r++)
                  if (this.matches(n.ExpressionType.ID, e[r])) return !0;
                return !1;
              }),
              (i.prototype.isSpecialIdentifier = function() {
                for (var e = [], t = 0; t < arguments.length; t++)
                  e[t] = arguments[t];
                if (0 === e.length) return this.is(n.ExpressionType.SPECIAL_ID);
                for (var r = 0; r < e.length; r++)
                  if (this.matches(n.ExpressionType.SPECIAL_ID, e[r]))
                    return !0;
                return !1;
              }),
              (i.prototype.isSpecialIdentifierWithContent = function(e) {
                for (var t = [], r = 1; r < arguments.length; r++)
                  t[r - 1] = arguments[r];
                if (!this.matches(n.ExpressionType.SPECIAL_ID, e)) return !1;
                if (0 === t.length) return !0;
                for (var i = 0; i < t.length; i++)
                  if (this.getContents() === t[i]) return !0;
                return !1;
              }),
              (i.prototype.isNumber = function() {
                return this.is(n.ExpressionType.NUMBER);
              }),
              (i.prototype.isBool = function() {
                return this.is(n.ExpressionType.BOOL);
              }),
              (i.prototype.isString = function() {
                return this.is(n.ExpressionType.STRING);
              }),
              (i.prototype.isConstant = function() {
                return this.isNumber() || this.isBool() || this.isString();
              }),
              (i.prototype.toString = function() {
                return (
                  this.getTokenType().toString() +
                  ": " +
                  this.getContents() +
                  " (" +
                  this._line +
                  ": " +
                  this._pos +
                  "), Trigger: " +
                  this.getTrigger()
                );
              }),
              i
            );
          })();
        r.Token = i;
      },
      { "./expressionEnum": 20 }
    ],
    30: [
      function(e, t, r) {
        "use strict";
        var i,
          n =
            (this && this.__extends) ||
            ((i = function(e, t) {
              return (i =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                  function(e, t) {
                    e.__proto__ = t;
                  }) ||
                function(e, t) {
                  for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r]);
                })(e, t);
            }),
            function(e, t) {
              function r() {
                this.constructor = e;
              }
              i(e, t),
                (e.prototype =
                  null === t
                    ? Object.create(t)
                    : ((r.prototype = t.prototype), new r()));
            });
        Object.defineProperty(r, "__esModule", { value: !0 });
        var o = e("./forwardQuery"),
          a = e("./expChar"),
          s = (function(r) {
            function e(e) {
              var t = r.call(this) || this;
              return (
                (t._inputExp = ""),
                (t._line = 1),
                (t._pos = 0),
                (t._count = 0),
                (t._operator = 0),
                (t._inputExp = e),
                (t._count = e.length),
                (t._operator = 0),
                t
              );
            }
            return (
              n(e, r),
              (e.prototype.endOfInput = function() {
                return new a.ExpChar("\0", this._line, this._pos);
              }),
              (e.prototype.fetch = function() {
                if (this._operator <= this._count - 1) {
                  var e = this._inputExp[this._operator];
                  return (
                    this._operator++,
                    "\n" === e && (this._line++, (this._pos = 0)),
                    this._pos++,
                    new a.ExpChar(e, this._line, this._pos)
                  );
                }
              }),
              (e.prototype.toString = function() {
                return 0 === this.itemBuffer.length
                  ? this._line + ":" + this._pos + ": Buffer empty"
                  : this.itemBuffer.length < 2
                  ? this._line +
                    ":" +
                    this._pos +
                    ": " +
                    this.current().toString()
                  : this._line +
                    ":" +
                    this._pos +
                    ": " +
                    this.current().toString() +
                    ", " +
                    this.next().toString();
              }),
              e
            );
          })(o.ForwardQuery);
        r.TokenReader = s;
      },
      { "./expChar": 18, "./forwardQuery": 23 }
    ],
    31: [
      function(e, t, r) {
        "use strict";
        var i,
          n =
            (this && this.__extends) ||
            ((i = function(e, t) {
              return (i =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                  function(e, t) {
                    e.__proto__ = t;
                  }) ||
                function(e, t) {
                  for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r]);
                })(e, t);
            }),
            function(e, t) {
              function r() {
                this.constructor = e;
              }
              i(e, t),
                (e.prototype =
                  null === t
                    ? Object.create(t)
                    : ((r.prototype = t.prototype), new r()));
            });
        Object.defineProperty(r, "__esModule", { value: !0 });
        var o = e("./forwardQuery"),
          a = e("./token"),
          s = e("./tokenReader"),
          u = e("./expressionEnum"),
          p = e("./positions"),
          c = (function(r) {
            function e(e) {
              var t = r.call(this) || this;
              return (
                (t._decimalSeparator = "."),
                (t._lineComment = "//"),
                (t._blockCommentStart = "/*"),
                (t._blockCommentEnd = "*/"),
                (t._brackets = [
                  "(",
                  ")",
                  "（",
                  "）",
                  "[",
                  "]",
                  "{",
                  "}",
                  "【",
                  "】"
                ]),
                (t._treatSinglePipeAsBracket = !0),
                (t._specialIdStarters = []),
                (t._specialIdTerminators = []),
                (t._keywords = {}),
                (t._keywordsCaseSensitive = !1),
                (t._stringDelimiters = {}),
                (t._boolConstant = []),
                (t._inputExp = new s.TokenReader(e)),
                (t._stringDelimiters = {}),
                (t._stringDelimiters['"'] = "\\"),
                (t._stringDelimiters["'"] = "\0"),
                (t._boolConstant = []),
                t._boolConstant.push("false"),
                t._boolConstant.push("true"),
                (t._keywords = {}),
                (t._keywords.this = "this"),
                (t._keywords.null = "null"),
                (t._keywords.none = "none"),
                (t._keywords[void 0] = "undefined"),
                t
              );
            }
            return (
              n(e, r),
              (e.prototype.endOfInput = function() {
                return a.Token.CreateAndFill(
                  u.ExpressionType.EOI,
                  this._inputExp.current()
                );
              }),
              (e.prototype.fetch = function() {
                for (; this._inputExp.current().isWhiteSpace(); )
                  this._inputExp.consume();
                if (!this._inputExp.current().isEndOfInput())
                  return this.isAtStartOfLineComment(!0)
                    ? (this.skipToEndOfLine(), this.fetch())
                    : this.isAtStartOfBlockComment(!0)
                    ? (this.skipBlockComment(), this.fetch())
                    : this.isAtStartOfNumber()
                    ? this.fetchNumber()
                    : this.isAtStartOfIdentifier()
                    ? this.fetchId()
                    : this._stringDelimiters[
                        this._inputExp.current().getValue()
                      ]
                    ? this.fetchString()
                    : this.isAtBracket(!1)
                    ? a.Token.CreateAndFill(
                        u.ExpressionType.OPERATOR,
                        this._inputExp.consume()
                      )
                    : this.isAtStartOfSpecialId()
                    ? this.fetchSpecialId()
                    : this.isOperator(this._inputExp.current())
                    ? this.fetchOperator()
                    : (this.problemCollector.push(
                        p.ParseError.Error(
                          this._inputExp.current(),
                          "无效的输入字符: " +
                            this._inputExp.current().getValue()
                        )
                      ),
                      this._inputExp.consume(),
                      this.fetch());
              }),
              (e.prototype.fetchNumber = function() {
                var e = a.Token.Create(
                  u.ExpressionType.NUMBER,
                  this._inputExp.current()
                );
                e.addToContentChar(this._inputExp.consume());
                for (
                  var t = !1;
                  this._inputExp.current().isDigit() ||
                  this._inputExp.current().is(this._decimalSeparator);

                )
                  this._inputExp.current().is(this._decimalSeparator) &&
                    (t &&
                      this.problemCollector.push(
                        p.ParseError.Error(
                          this._inputExp.current(),
                          "公式中有多个小数点！"
                        )
                      ),
                    (t = !0)),
                    e.addToContentChar(this._inputExp.consume());
                return e;
              }),
              (e.prototype.fetchId = function() {
                var e = a.Token.Create(
                  u.ExpressionType.ID,
                  this._inputExp.current()
                );
                for (
                  e.addToContentChar(this._inputExp.consume());
                  this.isIdentifierChar(this._inputExp.current());

                )
                  e.addToContentChar(this._inputExp.consume());
                if (
                  !this._inputExp.current().isEndOfInput() &&
                  -1 <
                    this._specialIdTerminators.indexOf(
                      this._inputExp.current().getValue()
                    )
                ) {
                  var t = a.Token.Create(u.ExpressionType.SPECIAL_ID, e);
                  return (
                    t.setTrigger(this._inputExp.current().getValue()),
                    t.setContent(e.getContents()),
                    t.setSource(e.getContents()),
                    t.addToSource(this._inputExp.current()),
                    this._inputExp.consume(),
                    this.handleKeywords(t)
                  );
                }
                return this.handleKeywords(e);
              }),
              (e.prototype.fetchString = function() {
                var e = this._inputExp.current().getValue(),
                  t = a.Token.Create(
                    u.ExpressionType.STRING,
                    this._inputExp.current()
                  );
                for (
                  t.addToTrigger(this._inputExp.consume());
                  !this._inputExp.current().isNewLine() &&
                  !this._inputExp.current().is(e) &&
                  !this._inputExp.current().isEndOfInput();

                )
                  t.addToContentChar(this._inputExp.consume());
                return (
                  this._inputExp.current().is(e)
                    ? t.addToSource(this._inputExp.consume())
                    : this.problemCollector.push(
                        p.ParseError.Error(
                          this._inputExp.current(),
                          "常量字符串没有结束分隔符！"
                        )
                      ),
                  t
                );
              }),
              (e.prototype.isAtStartOfLineComment = function(e) {
                return (
                  "" !== this._lineComment &&
                  this.canConsumeThisString(this._lineComment, e)
                );
              }),
              (e.prototype.canConsumeThisString = function(e, t) {
                for (var r = 0; r < e.length; r++)
                  if (!this._inputExp.nextOffset(r).is(e[r])) return !1;
                return t && this._inputExp.consumeNext(e.length), !0;
              }),
              (e.prototype.skipToEndOfLine = function() {
                for (
                  ;
                  !this._inputExp.current().isEndOfInput() &&
                  !this._inputExp.current().isNewLine();

                )
                  this._inputExp.consume();
              }),
              (e.prototype.isAtStartOfBlockComment = function(e) {
                return this.canConsumeThisString(this._blockCommentStart, e);
              }),
              (e.prototype.skipBlockComment = function() {
                for (; !this._inputExp.current().isEndOfInput(); ) {
                  if (this.isAtEndOfBlockComment()) return;
                  this._inputExp.consume();
                }
                this.problemCollector.push(
                  p.ParseError.Error(
                    this._inputExp.current(),
                    "块注释没有结束符！"
                  )
                );
              }),
              (e.prototype.isAtEndOfBlockComment = function() {
                return this.canConsumeThisString(this._blockCommentEnd, !0);
              }),
              (e.prototype.isAtStartOfNumber = function() {
                return (
                  !!this._inputExp.current().isDigit() ||
                  !(
                    !this._inputExp.current().is(".") ||
                    !this._inputExp.next().isDigit()
                  )
                );
              }),
              (e.prototype.isAtStartOfIdentifier = function() {
                return (
                  this._inputExp.current().isLetter() ||
                  this._inputExp.current().is("_") ||
                  this._inputExp.current().is("#")
                );
              }),
              (e.prototype.isIdentifierChar = function(e) {
                return (
                  e.isDigit() ||
                  e.isLetter() ||
                  e.is("_") ||
                  e.is(".") ||
                  e.is("#") ||
                  e.is(":") ||
                  e.is("：")
                );
              }),
              (e.prototype.isAtBracket = function(e) {
                for (var t = !0, r = 0; r < this._brackets.length; r++)
                  this._inputExp.current().is(this._brackets[r]) || (t = !1);
                return (
                  !!t ||
                  !(
                    e ||
                    !this._treatSinglePipeAsBracket ||
                    !this._inputExp.current().is("|") ||
                    !this._inputExp.next().is("|")
                  )
                );
              }),
              (e.prototype.isAtStartOfSpecialId = function() {
                return (
                  -1 <
                  this._specialIdStarters.indexOf(
                    this._inputExp.current().getValue()
                  )
                );
              }),
              (e.prototype.fetchSpecialId = function() {
                var e = a.Token.Create(
                  u.ExpressionType.SPECIAL_ID,
                  this._inputExp.current()
                );
                for (
                  e.addToTrigger(this._inputExp.consume());
                  this.isIdentifierChar(this._inputExp.current());

                )
                  e.addToContentChar(this._inputExp.consume());
                return this.handleKeywords(e);
              }),
              (e.prototype.handleKeywords = function(e) {
                var t = "";
                if (
                  (this._keywordsCaseSensitive
                    ? this._keywords[e.getContents()] &&
                      (t = this._keywords[e.getContents()])
                    : this._keywords[e.getContents().toLowerCase()] &&
                      (t = this._keywords[e.getContents().toLowerCase()]),
                  "" == t)
                )
                  return (
                    e.is(u.ExpressionType.SPECIAL_ID) ||
                      ((t = e.getContents().toLowerCase()),
                      -1 < this._boolConstant.indexOf(t) &&
                        e.setTokenType(u.ExpressionType.BOOL)),
                    e
                  );
                var r = a.Token.Create(u.ExpressionType.KEYWORD, e);
                return (
                  r.setTrigger(t),
                  r.setContent(e.getContents()),
                  r.setSource(e.getSource()),
                  r
                );
              }),
              (e.prototype.isOperator = function(e) {
                return (
                  !(
                    e.isEndOfInput() ||
                    e.isDigit() ||
                    e.isLetter() ||
                    e.isWhiteSpace()
                  ) &&
                  !(
                    this.isAtBracket(!0) ||
                    this.isAtStartOfBlockComment(!1) ||
                    this.isAtStartOfLineComment(!1) ||
                    this.isAtStartOfNumber() ||
                    this.isAtStartOfIdentifier() ||
                    this._stringDelimiters[e.getValue()]
                  )
                );
              }),
              (e.prototype.fetchOperator = function() {
                var e = a.Token.Create(
                  u.ExpressionType.OPERATOR,
                  this._inputExp.current()
                );
                return (
                  e.addToTrigger(this._inputExp.consume()),
                  e.isOperator("*") && this._inputExp.current().is("*")
                    ? e.addToTrigger(this._inputExp.consume())
                    : e.isOperator("&") && this._inputExp.current().is("&")
                    ? e.addToTrigger(this._inputExp.consume())
                    : e.isOperator("|") && this._inputExp.current().is("|")
                    ? e.addToTrigger(this._inputExp.consume())
                    : e.isOperator("<") && this._inputExp.current().is("=")
                    ? e.addToTrigger(this._inputExp.consume())
                    : e.isOperator(">") && this._inputExp.current().is("=")
                    ? e.addToTrigger(this._inputExp.consume())
                    : e.isOperator("!") && this._inputExp.current().is("=")
                    ? e.addToTrigger(this._inputExp.consume())
                    : e.isOperator("=") &&
                      this._inputExp.current().is("=") &&
                      e.addToTrigger(this._inputExp.consume()),
                  e
                );
              }),
              (e.prototype.addError = function(e, t) {
                this.getProblemCollector().push(p.ParseError.Error(e, t));
              }),
              (e.prototype.addWarning = function(e, t) {
                this.getProblemCollector().push(p.ParseError.Warning(e, t));
              }),
              e
            );
          })(o.ForwardQuery);
        r.Tokenizer = c;
      },
      {
        "./expressionEnum": 20,
        "./forwardQuery": 23,
        "./positions": 27,
        "./token": 29,
        "./tokenReader": 30
      }
    ],
    32: [
      function(e, t, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", { value: !0 });
        var i = (function() {
          function e(e, t, r) {
            (this._expType = "string"),
              (this._value = null),
              (this._name = ""),
              (this._constant = !1),
              (this._name = e),
              (this._expType = t),
              (this._value = r);
          }
          return (
            Object.defineProperty(e.prototype, "expType", {
              get: function() {
                return this._expType;
              },
              enumerable: !0,
              configurable: !0
            }),
            (e.prototype.setType = function(e) {
              this._constant || (this._expType = e);
            }),
            (e.prototype.setValue = function(e) {
              this._constant || (this._value = e);
            }),
            (e.prototype.makeConstant = function(e) {
              this.setValue(e), (this._constant = !0);
            }),
            (e.prototype.getValue = function() {
              return this._value;
            }),
            (e.prototype.getName = function() {
              return this._name;
            }),
            (e.prototype.isConstant = function() {
              return this._constant;
            }),
            (e.prototype.toString = function() {
              return (
                "Type: " +
                this._expType +
                " --- " +
                this._name +
                ": " +
                this._value.toString()
              );
            }),
            e
          );
        })();
        r.Variable = i;
      },
      {}
    ],
    33: [
      function(e, t, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", { value: !0 });
        var i = (function() {
          function e(e) {
            this._value = e;
          }
          return (
            Object.defineProperty(e.prototype, "expType", {
              get: function() {
                return this._value.expType;
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(e.prototype, "className", {
              get: function() {
                return "VariableExpression";
              },
              enumerable: !0,
              configurable: !0
            }),
            (e.prototype.evaluate = function() {
              return this._value.getValue();
            }),
            (e.prototype.toString = function() {
              return this._value.getName();
            }),
            (e.prototype.clone = function() {
              return new e(this._value);
            }),
            e
          );
        })();
        r.VariableExpression = i;
      },
      {}
    ],
    34: [
      function(e, t, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", { value: !0 });
        var i = e("./scope"),
          c = e("./expressions"),
          u = e("./expressionParsing"),
          l = e("../enum"),
          n = e("../scene"),
          h = e("../manager"),
          f = e("../state"),
          o = (function() {
            function s() {}
            return (
              (s.createSceneExpression = function(e, t, r) {
                var i = u.VE_ExpressionParsing.parsing(
                  e,
                  t,
                  s._scope,
                  "",
                  "",
                  "",
                  l.VariableScope.Scene
                );
                return (
                  0 < u.VE_ExpressionParsing.errors.length &&
                    ((r.isRight = !1),
                    (r.message = s.errorMessage(
                      u.VE_ExpressionParsing.errors
                    ))),
                  i
                );
              }),
              (s.createGlobalExpression = function(e, t, r, i) {
                var n = u.VE_ExpressionParsing.parsing(
                  e,
                  t,
                  s._scope,
                  r,
                  "",
                  "",
                  l.VariableScope.Global
                );
                return (
                  0 < u.VE_ExpressionParsing.errors.length &&
                    ((i.isRight = !1),
                    (i.message = s.errorMessage(
                      u.VE_ExpressionParsing.errors
                    ))),
                  n
                );
              }),
              (s.createLocalExpression = function(e, t, r, i, n) {
                var o = u.VE_ExpressionParsing.parsing(
                  e,
                  t,
                  s._scope,
                  r,
                  i,
                  "",
                  l.VariableScope.Local
                );
                return (
                  0 < u.VE_ExpressionParsing.errors.length &&
                    ((n.isRight = !1),
                    (n.message = s.errorMessage(
                      u.VE_ExpressionParsing.errors
                    ))),
                  o
                );
              }),
              (s.createFsmExpression = function(e, t, r, i, n, o) {
                var a = u.VE_ExpressionParsing.parsing(
                  e,
                  t,
                  s._scope,
                  r,
                  i,
                  n,
                  l.VariableScope.Fsm
                );
                return (
                  0 < u.VE_ExpressionParsing.errors.length &&
                    ((o.isRight = !1),
                    (o.message = s.errorMessage(
                      u.VE_ExpressionParsing.errors
                    ))),
                  a
                );
              }),
              (s.getParseExpression = function(e, t, r, i) {
                if (-1 < r.indexOf(f.StateConst.STATE_SEPARATOR)) {
                  var n = r.split(f.StateConst.STATE_SEPARATOR);
                  if (2 !== n.length) return null;
                  if (
                    ((t = n[0].trim()),
                    (r = n[1].trim().substring(1)),
                    i !== l.VariableScope.Local && i !== l.VariableScope.Fsm)
                  )
                    return null;
                  if ((a = h.VE_Manager.objects(e))) {
                    if ((s = a.getVeryObject(t))) {
                      if (s.isCreatedVariable(r)) {
                        var o = s.getVariable(r);
                        return new c.VeryVarExpression(o);
                      }
                      if (s.isCreatedExpression(r)) return s.getExpression(r);
                      if (s.isCreatedFsm(r)) {
                        o = s.getFsm(r).fsmVar;
                        return new c.VeryVarExpression(o);
                      }
                      return null;
                    }
                    return null;
                  }
                  return null;
                }
                if (r.startsWith(f.StateConst.VARIABLE_SYMBOL)) {
                  if (
                    ((r = r.substring(1)),
                    i !== l.VariableScope.Local && i !== l.VariableScope.Fsm)
                  )
                    return i === l.VariableScope.Global
                      ? this.getParseGlobal(e, r)
                      : this.getParseScene(r);
                  var a;
                  if ((a = h.VE_Manager.objects(e))) {
                    var s;
                    if ((s = a.getVeryObject(t))) {
                      if (s.isCreatedVariable(r)) {
                        o = s.getVariable(r);
                        return new c.VeryVarExpression(o);
                      }
                      if (s.isCreatedExpression(r)) return s.getExpression(r);
                      if (s.isCreatedFsm(r)) {
                        o = s.getFsm(r).fsmVar;
                        return new c.VeryVarExpression(o);
                      }
                      return this.getParseGlobal(e, r);
                    }
                    return null;
                  }
                  return null;
                }
                return null;
              }),
              (s.getParseGlobal = function(e, t) {
                var r = h.VE_Manager.variables(e);
                if (r) {
                  if (r.isCreatedVariable(t)) {
                    var i = r.getVariable(t);
                    return new c.VeryVarExpression(i);
                  }
                  return r.isCreatedExpression(t)
                    ? r.getExpression(t)
                    : this.getParseScene(t);
                }
                return null;
              }),
              (s.getParseScene = function(e) {
                if (n.VerySceneVariables.Variables.isCreated(e)) {
                  var t = n.VerySceneVariables.Variables.getVariable(e);
                  return new c.VeryVarExpression(t);
                }
                return n.VerySceneVariables.Variables.isCreatedExpression(e)
                  ? n.VerySceneVariables.Variables.getExpression(e)
                  : null;
              }),
              (s.errorMessage = function(e) {
                for (var t = "", r = 0; r < e.length; r++)
                  t += e[r].getMessage() + ";\n";
                return t;
              }),
              (s.getTemplateExpression = function(e, t, r, i) {
                if (-1 < r.indexOf(f.StateConst.STATE_SEPARATOR)) {
                  var n = r.split(f.StateConst.STATE_SEPARATOR);
                  if (2 !== n.length) return null;
                  if (
                    ((t = n[0].trim()),
                    (r = n[1].trim().substring(1)),
                    i !== l.VariableScope.Local && i !== l.VariableScope.Fsm)
                  )
                    return null;
                  if ((a = h.VE_Manager.objects(e))) {
                    if ((s = a.getVeryObject(t))) {
                      if (s.isCreatedTemplate(r)) {
                        var o = s.getTemplate(r);
                        return (
                          (p = new c.VeryTemplateExpression()).setTemplate(o), p
                        );
                      }
                      return null;
                    }
                    return null;
                  }
                  return null;
                }
                if (r.startsWith(f.StateConst.VARIABLE_SYMBOL)) {
                  if (
                    ((r = r.substring(1)),
                    i === l.VariableScope.Local || i === l.VariableScope.Fsm)
                  ) {
                    var a;
                    if ((a = h.VE_Manager.objects(e))) {
                      var s;
                      if ((s = a.getVeryObject(t))) {
                        if (s.isCreatedTemplate(r)) {
                          o = s.getTemplate(r);
                          return (
                            (p = new c.VeryTemplateExpression()).setTemplate(o),
                            p
                          );
                        }
                        if ((u = h.VE_Manager.variables(e))) {
                          if (u.isCreatedTemplate(r)) {
                            o = u.getTemplate(r);
                            return (
                              (p = new c.VeryTemplateExpression()).setTemplate(
                                o
                              ),
                              p
                            );
                          }
                          return null;
                        }
                        return null;
                      }
                      return null;
                    }
                    return null;
                  }
                  if (i !== l.VariableScope.Global) return null;
                  var u;
                  if ((u = h.VE_Manager.variables(e))) {
                    if (u.isCreatedTemplate(r)) {
                      var p;
                      o = u.getTemplate(r);
                      return (
                        (p = new c.VeryTemplateExpression()).setTemplate(o), p
                      );
                    }
                    return null;
                  }
                  return null;
                }
                return null;
              }),
              (s._scope = i.Scope.Create()),
              s
            );
          })();
        r.VE_Expressions = o;
      },
      {
        "../enum": 17,
        "../manager": 49,
        "../scene": 56,
        "../state": 60,
        "./expressionParsing": 21,
        "./expressions": 22,
        "./scope": 28
      }
    ],
    35: [
      function(e, t, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", { value: !0 });
        var n = e("../enum"),
          i = (function() {
            function i(e, t, r, i) {
              (this._pos = ""),
                (this._message = ""),
                (this._tableName = ""),
                (this._severity = n.Severity.Error),
                (this._pos = e),
                (this._message = t),
                (this._severity = i),
                (this._tableName = r);
            }
            return (
              (i.warning = function(e, t, r) {
                return new i(e, t, r, n.Severity.Warning);
              }),
              (i.error = function(e, t, r) {
                return new i(e, t, r, n.Severity.Error);
              }),
              (i.prototype.getPos = function() {
                return this._pos;
              }),
              (i.prototype.getMessage = function() {
                return this._message;
              }),
              (i.prototype.getTableName = function() {
                return this._tableName;
              }),
              (i.prototype.getSeverity = function() {
                return this._severity;
              }),
              (i.prototype.toString = function() {
                return (
                  "位置：" +
                  this._pos +
                  "，错误信息：" +
                  this._message +
                  "，表格名：" +
                  this._tableName
                );
              }),
              i
            );
          })();
        r.VE_Error = i;
        var o = (function() {
          function e() {}
          return (
            Object.defineProperty(e, "count", {
              get: function() {
                return this._errorList.length;
              },
              enumerable: !0,
              configurable: !0
            }),
            (e.add = function(e) {
              this._errorList.push(e);
            }),
            (e.getError = function(e) {
              return this._errorList[e];
            }),
            (e.print = function(e) {
              if (e)
                for (var t = 0; t < this._errorList.length; t++)
                  this._errorList[t].getSeverity() === n.Severity.Error
                    ? (console.log(
                        "错误：" + e + " -> " + this._errorList[t].toString()
                      ),
                      this._errorList.splice(t, 1),
                      t--)
                    : this._errorList[t].getSeverity() === n.Severity.Warning &&
                      (console.log(
                        "警告：" + e + " -> " + this._errorList[t].toString()
                      ),
                      this._errorList.splice(t, 1),
                      t--);
              else
                for (t = 0; t < this._errorList.length; t++)
                  this._errorList[t].getSeverity() === n.Severity.Error
                    ? (console.log("错误：" + this._errorList[t].toString()),
                      this._errorList.splice(t, 1),
                      t--)
                    : this._errorList[t].getSeverity() === n.Severity.Warning &&
                      (console.log("警告：" + this._errorList[t].toString()),
                      this._errorList.splice(t, 1),
                      t--);
            }),
            (e.printWarnning = function(e) {
              if (e)
                for (var t = 0; t < this._errorList.length; t++)
                  this._errorList[t].getSeverity() === n.Severity.Warning &&
                    (console.log(
                      "警告：" + e + " -> " + this._errorList[t].toString()
                    ),
                    this._errorList.splice(t, 1),
                    t--);
              else
                for (t = 0; t < this._errorList.length; t++)
                  this._errorList[t].getSeverity() === n.Severity.Warning &&
                    (console.log("警告：" + this._errorList[t].toString()),
                    this._errorList.splice(t, 1),
                    t--);
            }),
            (e.printError = function(e) {
              if (e)
                for (var t = 0; t < this._errorList.length; t++)
                  this._errorList[t].getSeverity() === n.Severity.Error &&
                    (console.log(
                      "错误：" + e + " -> " + this._errorList[t].toString()
                    ),
                    this._errorList.splice(t, 1),
                    t--);
              else
                for (t = 0; t < this._errorList.length; t++)
                  this._errorList[t].getSeverity() === n.Severity.Error &&
                    (console.log(
                      "错误：" + e + " -> " + this._errorList[t].toString()
                    ),
                    this._errorList.splice(t, 1),
                    t--);
            }),
            (e._errorList = []),
            e
          );
        })();
        r.VE_ErrorManager = o;
      },
      { "../enum": 17 }
    ],
    36: [
      function(e, t, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", { value: !0 });
        var i = function() {};
        r.GameGlobal = i;
      },
      {}
    ],
    37: [
      function(e, t, r) {
        "use strict";
        function i(e) {
          for (var t in e) r.hasOwnProperty(t) || (r[t] = e[t]);
        }
        Object.defineProperty(r, "__esModule", { value: !0 }),
          i(e("./gameGlobal")),
          i(e("./time")),
          i(e("./errorManager"));
      },
      { "./errorManager": 35, "./gameGlobal": 36, "./time": 38 }
    ],
    38: [
      function(e, t, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", { value: !0 });
        var i = e("../veryEngine"),
          n = (function() {
            function e() {}
            return (
              Object.defineProperty(e, "frameCount", {
                get: function() {
                  return this._frame;
                },
                enumerable: !0,
                configurable: !0
              }),
              Object.defineProperty(e, "deltaTime", {
                get: function() {
                  return i.VeryEngine.Engine.getDeltaTime() / 1e3;
                },
                enumerable: !0,
                configurable: !0
              }),
              (e._sum = function() {
                this._frame++;
              }),
              (e._frame = 0),
              e
            );
          })();
        r.Time = n;
      },
      { "../veryEngine": 81 }
    ],
    39: [
      function(e, t, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", { value: !0 }),
          (function(e) {
            for (var t in e) r.hasOwnProperty(t) || (r[t] = e[t]);
          })(e("./showError"));
      },
      { "./showError": 40 }
    ],
    40: [
      function(e, t, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", { value: !0 });
        var i = (function() {
          function r() {}
          return (
            (r.initZone = function() {
              this.errorZone ||
                (this.errorZone = document.getElementById("errorZone"));
            }),
            (r.showMsg = function(e, t) {
              this.initZone(),
                this.errorContentNow ||
                  (this.errorContentNow = this.errorContentPrefix),
                (this.errorContentNow += e + t + "<br/>"),
                (this.errorZone.style.display = "block"),
                (this.errorZone.innerHTML = this.errorContentNow + "</div>");
              var r = this.errorZone.querySelector(".close"),
                i = this;
              r.addEventListener("click", function() {
                i.errorZone.style.display = "none";
              });
            }),
            (r.show = function(e) {
              this.showMsg("打印信息>>>", e);
            }),
            (r.showError = function(e) {
              this.showMsg("错误信息>>>", e);
            }),
            (r.showWarn = function(e) {
              this.showMsg("警告信息>>>", e);
            }),
            (r.clear = function() {
              r.initZone(),
                (r.errorContentNow = r.errorContentPrefix),
                (r.errorZone.innerHTML = r.errorContentNow + "</div>");
              var e = r.errorZone.querySelector(".close"),
                t = r;
              e.addEventListener("click", function() {
                t.errorZone.style.display = "none";
              });
            }),
            (r.close = function() {
              r.initZone(),
                "none" === r.errorZone.style.display
                  ? (r.errorZone.style.display = "block")
                  : (r.errorZone.style.display = "none");
            }),
            (r.errorContentPrefix =
              '<div class="alert alert-error"><button type="button" class="close" data-dismiss="alert">&times;</button>'),
            r
          );
        })();
        r.ShowError = i;
      },
      {}
    ],
    41: [
      function(e, t, r) {
        "use strict";
        function i(e) {
          for (var t in e) r.hasOwnProperty(t) || (r[t] = e[t]);
        }
        Object.defineProperty(r, "__esModule", { value: !0 }),
          i(e("./utility/index")),
          i(e("./action/index")),
          i(e("./dataSource/index")),
          i(e("./enum/index")),
          i(e("./expression/index")),
          i(e("./global/index")),
          i(e("./html/index")),
          i(e("./manager/index")),
          i(e("./object/index")),
          i(e("./state/index")),
          i(e("./template/index")),
          i(e("./trigger/index")),
          i(e("./loader/index")),
          i(e("./variables/index")),
          i(e("./scene/index")),
          i(e("../verytable/index")),
          i(e("./library/action/index")),
          i(e("./library/trigger/index"));
      },
      {
        "../verytable/index": 82,
        "./action/index": 7,
        "./dataSource/index": 11,
        "./enum/index": 17,
        "./expression/index": 26,
        "./global/index": 37,
        "./html/index": 39,
        "./library/action/index": 42,
        "./library/trigger/index": 44,
        "./loader/index": 47,
        "./manager/index": 49,
        "./object/index": 53,
        "./scene/index": 56,
        "./state/index": 60,
        "./template/index": 64,
        "./trigger/index": 67,
        "./utility/index": 73,
        "./variables/index": 77
      }
    ],
    42: [
      function(e, t, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", { value: !0 }),
          (function(e) {
            for (var t in e) r.hasOwnProperty(t) || (r[t] = e[t]);
          })(e("./translate"));
      },
      { "./translate": 43 }
    ],
    43: [
      function(e, t, r) {
        "use strict";
        var i,
          n =
            (this && this.__extends) ||
            ((i = function(e, t) {
              return (i =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                  function(e, t) {
                    e.__proto__ = t;
                  }) ||
                function(e, t) {
                  for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r]);
                })(e, t);
            }),
            function(e, t) {
              function r() {
                this.constructor = e;
              }
              i(e, t),
                (e.prototype =
                  null === t
                    ? Object.create(t)
                    : ((r.prototype = t.prototype), new r()));
            });
        Object.defineProperty(r, "__esModule", { value: !0 });
        var o = (function(t) {
          function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            return (e._refType = BABYLON.Space.LOCAL), e;
          }
          return (
            n(e, t),
            Object.defineProperty(e.prototype, "ID", {
              get: function() {
                return "直线运动|Translate";
              },
              enumerable: !0,
              configurable: !0
            }),
            (e.prototype.active = function() {}),
            (e.prototype.onUpdate = function() {}),
            (e.prototype.destroy = function() {}),
            e
          );
        })(e("../../index").VE_ActionBehaviour);
        r.Action_Translate = o;
      },
      { "../../index": 41 }
    ],
    44: [
      function(e, t, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", { value: !0 }),
          (function(e) {
            for (var t in e) r.hasOwnProperty(t) || (r[t] = e[t]);
          })(e("./input"));
      },
      { "./input": 45 }
    ],
    45: [
      function(e, t, r) {
        "use strict";
        var i,
          n =
            (this && this.__extends) ||
            ((i = function(e, t) {
              return (i =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                  function(e, t) {
                    e.__proto__ = t;
                  }) ||
                function(e, t) {
                  for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r]);
                })(e, t);
            }),
            function(e, t) {
              function r() {
                this.constructor = e;
              }
              i(e, t),
                (e.prototype =
                  null === t
                    ? Object.create(t)
                    : ((r.prototype = t.prototype), new r()));
            });
        Object.defineProperty(r, "__esModule", { value: !0 });
        var o = e("../../index"),
          a = e("../../trigger"),
          s = (function(e) {
            function t() {
              return e.call(this) || this;
            }
            return (
              n(t, e),
              Object.defineProperty(t.prototype, "ID", {
                get: function() {
                  return "鼠标按下|Mouse_Down";
                },
                enumerable: !0,
                configurable: !0
              }),
              (t.prototype.paraParser = function(e) {
                var t = this.scene.onPointerObservable.add(function(e) {});
                return this.scene.onPointerObservable.remove(t), !0;
              }),
              (t.prototype.onUpdate = function() {}),
              (t.prototype.destroy = function() {}),
              t
            );
          })(o.VE_TriggerBehaviour);
        (r.Trigger_MouseDown = s), a.VE_Triggers.addTrigger(new s());
      },
      { "../../index": 41, "../../trigger": 67 }
    ],
    46: [
      function(e, t, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", { value: !0 });
        var U = e("../manager"),
          K = e("../variables"),
          X = e("../utility"),
          J = e("../global"),
          H = e("../expression"),
          $ = e("../state"),
          ee = e("../trigger"),
          te = e("../action"),
          re = e("../enum"),
          ie = e("../utility/typeConvert"),
          D = e("../action/assignmentTypeJudge"),
          x = e("../scene"),
          i = (function() {
            function e() {}
            return (
              (e.createProject = function(e) {
                for (
                  var t = U.VE_Manager.templates(e),
                    r = U.VE_Manager.objects(e),
                    i = U.VE_Manager.variables(e),
                    n = 0;
                  n < i.varData.count;
                  n++
                ) {
                  var o = i.varData.getVariableID(n);
                  if (
                    "公式" !== (g = i.varData.getVariableParas(o))[0] &&
                    "expression" !== g[0].toLowerCase()
                  )
                    if (K.VeryVarManager.hasVarType(g[0])) {
                      var a = new X.ErrorInfo(),
                        s = K.VeryVarManager.createVariable(o, g[0], g[1], a);
                      if (!a.isRight || null === s)
                        return (
                          J.VE_ErrorManager.add(
                            J.VE_Error.error(
                              i.varData.getPos(o),
                              "项目：" +
                                e +
                                "，全局变量：" +
                                o +
                                "，" +
                                g[0] +
                                "，" +
                                g[1] +
                                "，全局变量创建失败，失败原因：" +
                                a.message +
                                "，请检查！",
                              ""
                            )
                          ),
                          !1
                        );
                      i.addVariable(o, s);
                    } else {
                      if (!t.isCreatedTemplate(g[0]))
                        return (
                          J.VE_ErrorManager.add(
                            J.VE_Error.error(
                              i.varData.getPos(o),
                              "项目：" +
                                e +
                                "，全局变量：" +
                                o +
                                "，" +
                                g[0] +
                                "，" +
                                g[1] +
                                "，全局变量创建失败，当前变量不存在，请检查！",
                              ""
                            )
                          ),
                          !1
                        );
                      i.addTemplate(
                        o,
                        t.getTemplate(g[0]).clone("__global__", o)
                      );
                    }
                }
                for (n = 0; n < i.varData.count; n++) {
                  o = i.varData.getVariableID(n);
                  if (
                    "公式" === (g = i.varData.getVariableParas(o))[0] ||
                    "expression" === g[0].toLowerCase()
                  ) {
                    a = new X.ErrorInfo();
                    var u = H.VE_Expressions.createGlobalExpression(
                      o,
                      g[1],
                      e,
                      a
                    );
                    if (!a.isRight || !u)
                      return (
                        J.VE_ErrorManager.add(
                          J.VE_Error.error(
                            i.varData.getPos(o),
                            "项目：" +
                              e +
                              "，全局变量：" +
                              o +
                              "," +
                              g[0] +
                              "," +
                              g[1] +
                              "，全局变量创建失败，公式创建错误：\n" +
                              a.message,
                            ""
                          )
                        ),
                        !1
                      );
                    i.addExpression(o, u);
                  }
                }
                for (n = 0; n < r.count; n++)
                  for (
                    var p = r.getObjectID(n), c = r.getVeryObject(p), l = 0;
                    l < c.varData.count;
                    l++
                  ) {
                    o = c.varData.getVariableID(l);
                    if (
                      "公式" !== (g = c.varData.getVariableParas(o))[0] &&
                      "expression" !== g[0].toLowerCase().trim()
                    )
                      if (K.VeryVarManager.hasVarType(g[0])) {
                        a = new X.ErrorInfo();
                        if (
                          null ===
                            (s = K.VeryVarManager.createVariable(
                              o,
                              g[0],
                              g[1],
                              a
                            )) ||
                          !a.isRight
                        )
                          return (
                            J.VE_ErrorManager.add(
                              J.VE_Error.error(
                                c.varData.getPos(o),
                                "项目：" +
                                  e +
                                  "，全局变量：" +
                                  o +
                                  "，" +
                                  g[0] +
                                  "，" +
                                  g[1] +
                                  "，全局变量创建失败，失败原因：" +
                                  a.message +
                                  "，请检查！",
                                ""
                              )
                            ),
                            !1
                          );
                        i.addVariable(o, s);
                      } else {
                        if (!t.isCreatedTemplate(g[0]))
                          return (
                            J.VE_ErrorManager.add(
                              J.VE_Error.error(
                                c.varData.getPos(o),
                                "项目：" +
                                  e +
                                  "，对象：" +
                                  p +
                                  "，局部变量：" +
                                  o +
                                  "," +
                                  g[0] +
                                  "," +
                                  g[1] +
                                  "，局部变量创建失败，当前变量不存在，请检查！",
                                ""
                              )
                            ),
                            !1
                          );
                        c.addTemplate(o, t.getTemplate(g[0]).clone(p, o));
                      }
                  }
                for (n = 0; n < r.count; n++)
                  for (
                    p = r.getObjectID(n), c = r.getVeryObject(p), l = 0;
                    l < c.dataSource.fsmCount;
                    l++
                  ) {
                    var h = c.dataSource.getFsmID(l),
                      f = c.dataSource.getFsmData(h);
                    a = new X.ErrorInfo();
                    if (
                      null ===
                        (s = K.VeryVarManager.createVariable(
                          h,
                          f.fsmType,
                          f.initialValStr,
                          a
                        )) ||
                      !a.isRight
                    )
                      return (
                        J.VE_ErrorManager.add(
                          J.VE_Error.error(
                            c.dataSource.getFsmPos(h),
                            "项目：" +
                              e +
                              "，对象：" +
                              p +
                              "，状态：" +
                              h +
                              "，状态变量初始值创建错误，错误原因：" +
                              a.message +
                              "，请检查！",
                            ""
                          )
                        ),
                        !1
                      );
                    var _ = new $.VE_Fsm(e, p, h, s, c);
                    c.addFsm(h, _);
                  }
                for (n = 0; n < r.count; n++)
                  for (
                    p = r.getObjectID(n), c = r.getVeryObject(p), l = 0;
                    l < c.varData.count;
                    l++
                  ) {
                    var g;
                    o = c.varData.getVariableID(l);
                    if (
                      "公式" === (g = c.varData.getVariableParas(o))[0] ||
                      "expression" === g[0].toLowerCase().trim()
                    ) {
                      (a = new X.ErrorInfo()),
                        (s = H.VE_Expressions.createLocalExpression(
                          o,
                          g[1],
                          e,
                          p,
                          a
                        ));
                      if (!a.isRight || !s)
                        return (
                          J.VE_ErrorManager.add(
                            J.VE_Error.error(
                              c.varData.getPos(o),
                              "项目：" +
                                e +
                                "，对象：" +
                                p +
                                "，局部变量：" +
                                o +
                                "," +
                                g[0] +
                                "," +
                                g[1] +
                                "，局部变量创建失败，公式创建错误：\n" +
                                a.message,
                              ""
                            )
                          ),
                          !1
                        );
                      c.addExpression(o, s);
                    }
                  }
                for (n = 0; n < r.count; n++)
                  for (
                    p = r.getObjectID(n), c = r.getVeryObject(p), l = 0;
                    l < c.dataSource.triggerCount;
                    l++
                  ) {
                    var d = c.dataSource.getTriggerID(l),
                      y = c.dataSource.getTriggerPara(d);
                    if (!ee.VE_Triggers.hasTrigger(y[0]))
                      return (
                        J.VE_ErrorManager.add(
                          J.VE_Error.error(
                            c.dataSource.getTriggerPos(d),
                            "项目：" +
                              e +
                              "，对象：" +
                              p +
                              "，触发：" +
                              d +
                              "，触发类型：" +
                              y[0] +
                              "，当前系统中不存在该触发类型，请检查！",
                            ""
                          )
                        ),
                        !1
                      );
                    var m = ee.VE_Triggers.createTrigger(y[0]);
                    c.addTrigger(d, m);
                  }
                for (n = 0; n < r.count; n++)
                  for (
                    p = r.getObjectID(n), c = r.getVeryObject(p), l = 0;
                    l < c.dataSource.actionCount;
                    l++
                  ) {
                    var E = c.dataSource.getActionID(l),
                      b = c.dataSource.getActionPara(E);
                    if (!te.VE_Actions.hasAction(b[0]))
                      return (
                        J.VE_ErrorManager.add(
                          J.VE_Error.error(
                            c.dataSource.getActionPos(E),
                            "项目：" +
                              e +
                              "，对象：" +
                              p +
                              "，响应：" +
                              E +
                              "，响应类型：" +
                              b[0] +
                              "，当前系统中不存在该响应类型，请检查！",
                            ""
                          )
                        ),
                        !1
                      );
                    var v = te.VE_Actions.createAction(b[0]);
                    c.addAction(E, v);
                  }
                for (n = 0; n < r.count; n++)
                  for (
                    p = r.getObjectID(n), c = r.getVeryObject(p), l = 0;
                    l < c.dataSource.fsmCount;
                    l++
                  ) {
                    (h = c.dataSource.getFsmID(l)),
                      (f = c.dataSource.getFsmData(h)),
                      (_ = c.getFsm(h));
                    for (var V = 0; V < f.count; V++) {
                      var T = f.getStateData(V),
                        S = new $.VE_State(_, _.count + 1);
                      if (T.isInitialValue)
                        S.setInitialValue(_.fsmVar.getValue());
                      else if (!this.stateAssignment(e, p, h, i, r, c, _, T, S))
                        return !1;
                      if (
                        (T.isSequence && S.setSequence(), "" !== T.logicalExp)
                      ) {
                        a = new X.ErrorInfo();
                        var D = H.VE_Expressions.createFsmExpression(
                          "",
                          T.logicalExp,
                          e,
                          p,
                          h,
                          a
                        );
                        if (!a.isRight || !D)
                          return (
                            J.VE_ErrorManager.add(
                              J.VE_Error.error(
                                "（" + T.rowIndex.toString() + "，E）",
                                "项目：" +
                                  e +
                                  "，对象：" +
                                  p +
                                  "，状态：" +
                                  h +
                                  "，状态逻辑表达式：" +
                                  T.logicalExp +
                                  "，逻辑表达式创建失败，公式创建错误：\n" +
                                  a.message,
                                ""
                              )
                            ),
                            !1
                          );
                        S.logicalAssociated = D;
                      }
                      for (var x = 0; x < T.triggerCount; x++) {
                        var O = T.getTrigger(x),
                          C = T.getTriggerPos(x);
                        if (
                          null ===
                          (m = ee.VE_Triggers.findTrigger(c, O.triggerID))
                        )
                          return (
                            J.VE_ErrorManager.add(
                              J.VE_Error.error(
                                C,
                                "项目：" +
                                  e +
                                  "，对象：" +
                                  p +
                                  "，状态：" +
                                  h +
                                  "，触发：" +
                                  O.triggerID +
                                  "，当前触发无法在系统中查找到，请检查！",
                                ""
                              )
                            ),
                            !1
                          );
                        D = null;
                        if ("" !== O.logicalExp) {
                          a = new X.ErrorInfo();
                          if (
                            ((D = H.VE_Expressions.createFsmExpression(
                              "",
                              O.logicalExp,
                              e,
                              p,
                              h,
                              a
                            )),
                            !a.isRight || null === D)
                          )
                            return (
                              J.VE_ErrorManager.add(
                                J.VE_Error.error(
                                  C,
                                  "项目：" +
                                    e +
                                    "，对象：" +
                                    p +
                                    "，状态：" +
                                    h +
                                    "，状态逻辑表达式：" +
                                    O.logicalExp +
                                    "，逻辑表达式创建失败，公式创建错误：\n" +
                                    a.message,
                                  ""
                                )
                              ),
                              !1
                            );
                        }
                        if (
                          (m.addTriggerTarget(D, S), "" !== O.logicalSwitch)
                        ) {
                          a = new X.ErrorInfo();
                          var I = H.VE_Expressions.createFsmExpression(
                            "",
                            O.logicalSwitch,
                            e,
                            p,
                            h,
                            a
                          );
                          if (!a.isRight || null === I)
                            return (
                              J.VE_ErrorManager.add(
                                J.VE_Error.error(
                                  C,
                                  "项目：" +
                                    e +
                                    "，对象：" +
                                    p +
                                    "，状态：" +
                                    h +
                                    "，触发启动条件：" +
                                    O.logicalSwitch +
                                    "，触发启动条件创建失败，公式创建错误：\n" +
                                    a.message,
                                  ""
                                )
                              ),
                              !1
                            );
                          m.addLogicalSwitch(I);
                        }
                      }
                      for (x = 0; x < T.actionCount; x++) {
                        var j = T.getAction(x),
                          P = T.getActionPos(x);
                        if (j.type === re.StateActionType.Action) {
                          if (
                            null ===
                            (v = te.VE_Actions.findAction(c, j.actionID))
                          )
                            return (
                              J.VE_ErrorManager.add(
                                J.VE_Error.error(
                                  P,
                                  "项目：" +
                                    e +
                                    "，对象：" +
                                    p +
                                    "，状态：" +
                                    h +
                                    "，响应：" +
                                    j.actionID +
                                    "，当前响应无法在系统中查找到，请检查！",
                                  ""
                                )
                              ),
                              !1
                            );
                          (a = new X.ErrorInfo()),
                            ie.VE_TypeConvert.boolConvert(j.enabled, a);
                          if (!a.isRight)
                            return (
                              J.VE_ErrorManager.add(
                                J.VE_Error.error(
                                  P,
                                  "项目：" +
                                    e +
                                    "，对象：" +
                                    p +
                                    "，状态：" +
                                    h +
                                    "，响应：" +
                                    j.actionID +
                                    "，响应启动参数目前只允许填写bool常量true或者false，不允许填写变量，请检查！",
                                  ""
                                )
                              ),
                              !1
                            );
                          ie.VE_TypeConvert.boolConvert(j.everyFrame, a);
                          if (!a.isRight)
                            return (
                              J.VE_ErrorManager.add(
                                J.VE_Error.error(
                                  P,
                                  "项目：" +
                                    e +
                                    "，对象：" +
                                    p +
                                    "，状态：" +
                                    h +
                                    "，响应：" +
                                    j.actionID +
                                    "，响应每帧运行参数目前只允许填写bool常量true或者false，不允许填写变量，请检查！",
                                  ""
                                )
                              ),
                              !1
                            );
                          ie.VE_TypeConvert.boolConvert(j.everyFrame, a);
                          if (!a.isRight)
                            return (
                              J.VE_ErrorManager.add(
                                J.VE_Error.error(
                                  P,
                                  "项目：" +
                                    e +
                                    "，对象：" +
                                    p +
                                    "，状态：" +
                                    h +
                                    "，响应：" +
                                    j.actionID +
                                    "，响应动画顺序运行参数目前只允许填写bool常量true或者false，不允许填写变量，请检查！",
                                  ""
                                )
                              ),
                              !1
                            );
                          var w = new $.VE_StateAction();
                          w.setAction(v), S.addAction(w);
                        } else if (
                          !this.assignmentAction(e, p, h, i, r, c, j, S)
                        )
                          return !1;
                      }
                      if (_.isCreatedState(T.stateIndex))
                        return (
                          J.VE_ErrorManager.add(
                            J.VE_Error.error(
                              "（" + T.rowIndex.toString() + "，I）",
                              "项目：" +
                                e +
                                "，对象：" +
                                p +
                                "，状态：" +
                                h +
                                "，状态赋值：" +
                                T.ValStr +
                                "，当前关联ID已创建，请勿重复创建！",
                              ""
                            )
                          ),
                          !1
                        );
                      _.addState(S, T.stateIndex);
                    }
                  }
                for (n = 0; n < r.count; n++)
                  for (
                    p = r.getObjectID(n), c = r.getVeryObject(p), l = 0;
                    l < c.dataSource.fsmCount;
                    l++
                  )
                    for (
                      h = c.dataSource.getFsmID(l),
                        f = c.dataSource.getFsmData(h),
                        _ = c.getFsm(h),
                        V = 0;
                      V < f.count;
                      V++
                    )
                      for (
                        T = f.getStateData(V), S = _.getState(V), x = 0;
                        x < T.associatedStateCount;
                        x++
                      ) {
                        for (
                          var A = T.getAssociatedState(x),
                            M = T.getAssociatedStatePos(x),
                            F = new $.VE_AssociatedState(S),
                            L = A.split(/,|，/),
                            N = 0;
                          N < L.length;
                          N++
                        ) {
                          A = L[N].trim();
                          var k = $.StateConst.STATE_INDEX,
                            R = A.split("=");
                          if (1 === R.length) k = $.StateConst.STATE_INDEX;
                          else {
                            if (2 !== R.length)
                              return (
                                J.VE_ErrorManager.add(
                                  J.VE_Error.error(
                                    M,
                                    "项目：" +
                                      e +
                                      "，对象：" +
                                      p +
                                      "，状态：" +
                                      h +
                                      "，关联状态：" +
                                      A +
                                      "，当前关联状态格式错误，应为“状态名=子状态ID（整数）”的形式，请检查！",
                                    ""
                                  )
                                ),
                                !1
                              );
                            a = new X.ErrorInfo();
                            if (
                              ((k = ie.VE_TypeConvert.intConvert(
                                R[1].trim(),
                                a
                              )),
                              !a.isRight)
                            )
                              return (
                                J.VE_ErrorManager.add(
                                  J.VE_Error.error(
                                    M,
                                    "项目：" +
                                      e +
                                      "，对象：" +
                                      p +
                                      "，状态：" +
                                      h +
                                      "，关联状态：" +
                                      A +
                                      "，当前关联状态格式错误，应为“状态名=子状态ID（整数）”的形式，请检查！",
                                    ""
                                  )
                                ),
                                !1
                              );
                          }
                          var B = R[0].trim();
                          if (-1 < B.indexOf($.StateConst.STATE_SEPARATOR)) {
                            for (
                              var z = B.split($.StateConst.STATE_SEPARATOR),
                                W = 0;
                              W < z.length;
                              W++
                            )
                              z[W] = z[W].trim();
                            if (3 === z.length) {
                              if (!r.isCreated(z[0]))
                                return (
                                  J.VE_ErrorManager.add(
                                    J.VE_Error.error(
                                      M,
                                      "项目：" +
                                        e +
                                        "，对象：" +
                                        p +
                                        "，状态：" +
                                        h +
                                        "，关联状态：" +
                                        A +
                                        "，当前关联状态填写格式为“对象名.*模板变量.状态名”，无法查找到该对象，请检查！",
                                      ""
                                    )
                                  ),
                                  !1
                                );
                              var G = r.getVeryObject(z[0]);
                              if (
                                !z[1].startsWith($.StateConst.VARIABLE_SYMBOL)
                              )
                                return (
                                  J.VE_ErrorManager.add(
                                    J.VE_Error.error(
                                      M,
                                      "项目：" +
                                        e +
                                        "，对象：" +
                                        p +
                                        "，状态：" +
                                        h +
                                        "，关联状态：" +
                                        A +
                                        "，当前关联状态填写格式为“对象名.*模板变量.状态名”，模板变量填写格式不正确，请检查！",
                                      ""
                                    )
                                  ),
                                  !1
                                );
                              o = z[1].substring(1);
                              if (!G.isCreatedTemplate(o))
                                return (
                                  J.VE_ErrorManager.add(
                                    J.VE_Error.error(
                                      M,
                                      "项目：" +
                                        e +
                                        "，对象：" +
                                        p +
                                        "，状态：" +
                                        h +
                                        "，关联状态：" +
                                        A +
                                        "，当前关联状态填写格式为“对象名.*模板变量.状态名”，在当前对象中无法查找到该模板变量，请检查！",
                                      ""
                                    )
                                  ),
                                  !1
                                );
                              if (
                                !(Y = G.getTemplate(o)).dataSource.isCreatedFsm(
                                  z[2]
                                )
                              )
                                return (
                                  J.VE_ErrorManager.add(
                                    J.VE_Error.error(
                                      M,
                                      "项目：" +
                                        e +
                                        "，对象：" +
                                        p +
                                        "，状态：" +
                                        h +
                                        "，关联状态：" +
                                        A +
                                        "，当前关联状态填写格式为“对象名.*模板变量.状态名”，在当前对象的该模板变量中无法查找到对应状态名，请检查！",
                                      ""
                                    )
                                  ),
                                  !1
                                );
                              F.addTemplate(Y, z[2], k);
                            } else {
                              if (2 !== z.length)
                                return (
                                  J.VE_ErrorManager.add(
                                    J.VE_Error.error(
                                      M,
                                      "项目：" +
                                        e +
                                        "，对象：" +
                                        p +
                                        "，状态：" +
                                        h +
                                        "，关联状态：" +
                                        A +
                                        "，状态名填写错误，无法查找到对应状态，请检查！",
                                      ""
                                    )
                                  ),
                                  !1
                                );
                              var q = z[0].trim();
                              if (
                                ((B = z[1].trim()),
                                q.startsWith($.StateConst.VARIABLE_SYMBOL))
                              )
                                if (
                                  ((q = q.substring(1)), c.isCreatedTemplate(q))
                                ) {
                                  if (
                                    !(Y = c.getTemplate(
                                      q
                                    )).dataSource.isCreatedFsm(z[1])
                                  )
                                    return (
                                      J.VE_ErrorManager.add(
                                        J.VE_Error.error(
                                          M,
                                          "项目：" +
                                            e +
                                            "，对象：" +
                                            p +
                                            "，状态：" +
                                            h +
                                            "，关联状态：" +
                                            A +
                                            "，当前关联状态填写格式为“*模板变量.状态名”，在当前模板变量中无法查找到对应状态名，请检查！",
                                          ""
                                        )
                                      ),
                                      !1
                                    );
                                  F.addTemplate(Y, z[1], k);
                                } else {
                                  if (!i.isCreatedTemplate(q))
                                    return (
                                      J.VE_ErrorManager.add(
                                        J.VE_Error.error(
                                          M,
                                          "项目：" +
                                            e +
                                            "，对象：" +
                                            p +
                                            "，状态：" +
                                            h +
                                            "，关联状态：" +
                                            A +
                                            "，当前关联状态填写格式为“*模板变量.状态名”，在当前系统中无法查找到该模板变量，请检查！",
                                          ""
                                        )
                                      ),
                                      !1
                                    );
                                  var Y;
                                  if (
                                    !(Y = i.getTemplate(
                                      q
                                    )).dataSource.isCreatedFsm(z[1])
                                  )
                                    return (
                                      J.VE_ErrorManager.add(
                                        J.VE_Error.error(
                                          M,
                                          "项目：" +
                                            e +
                                            "，对象：" +
                                            p +
                                            "，状态：" +
                                            h +
                                            "，关联状态：" +
                                            A +
                                            "，当前关联状态填写格式为“*模板变量.状态名”，在当前模板变量中无法查找到对应状态名，请检查！",
                                          ""
                                        )
                                      ),
                                      !1
                                    );
                                  F.addTemplate(Y, z[1], k);
                                }
                              else {
                                if (null === (G = r.getVeryObject(q)))
                                  return (
                                    J.VE_ErrorManager.add(
                                      J.VE_Error.error(
                                        M,
                                        "项目：" +
                                          e +
                                          "，对象：" +
                                          p +
                                          "，状态：" +
                                          h +
                                          "，关联状态：" +
                                          A +
                                          "，当前关联状态填写格式为“对象名.状态名”，当前系统中无法查找到该对象名，请检查！",
                                        ""
                                      )
                                    ),
                                    !1
                                  );
                                if (null === (Q = G.getFsm(B)))
                                  return (
                                    J.VE_ErrorManager.add(
                                      J.VE_Error.error(
                                        M,
                                        "项目：" +
                                          e +
                                          "，对象：" +
                                          p +
                                          "，状态：" +
                                          h +
                                          "，关联状态：" +
                                          A +
                                          "，当前关联状态填写格式为“对象名.状态名”，当前对象名所对应的对象中无法查找到该状态名，请检查！",
                                        ""
                                      )
                                    ),
                                    !1
                                  );
                                if (null === (Z = Q.getState(k)))
                                  return (
                                    J.VE_ErrorManager.add(
                                      J.VE_Error.error(
                                        M,
                                        "项目：" +
                                          e +
                                          "，对象：" +
                                          p +
                                          "，状态：" +
                                          h +
                                          "，关联状态：" +
                                          A +
                                          "，当前关联状态填写格式为“对象名.状态名”，当前关联状态序号超出对应状态序号范围，请检查！",
                                        ""
                                      )
                                    ),
                                    !1
                                  );
                                F.add(Z, k);
                              }
                            }
                          } else {
                            var Q, Z;
                            if (null === (Q = c.getFsm(B)))
                              return (
                                J.VE_ErrorManager.add(
                                  J.VE_Error.error(
                                    M,
                                    "项目：" +
                                      e +
                                      "，对象：" +
                                      p +
                                      "，状态：" +
                                      h +
                                      "，关联状态：" +
                                      A +
                                      "，状态名填写错误，可以查找到对象，但是对象上无法查找到该状态，请检查！",
                                    ""
                                  )
                                ),
                                !1
                              );
                            if (null === (Z = Q.getState(k)))
                              return (
                                J.VE_ErrorManager.add(
                                  J.VE_Error.error(
                                    M,
                                    "项目：" +
                                      e +
                                      "，对象：" +
                                      p +
                                      "，状态：" +
                                      h +
                                      "，关联状态：" +
                                      A +
                                      "，状态名填写错误，可以查找到对象和状态，但是状态序号超出范围，请检查！",
                                    ""
                                  )
                                ),
                                !1
                              );
                            F.add(Z, k);
                          }
                        }
                        S.addAssociatedState(F);
                      }
                return !0;
              }),
              (e.stateAssignment = function(e, t, r, i, n, o, a, s, u) {
                var p = s.ValStr;
                if (-1 < p.indexOf($.StateConst.VARIABLE_SYMBOL))
                  if (-1 < p.indexOf($.StateConst.STATE_SEPARATOR)) {
                    for (
                      var c = p.split($.StateConst.STATE_SEPARATOR), l = 0;
                      l < c.length;
                      l++
                    )
                      c[l] = c[l].trim();
                    if (2 === c.length) {
                      if (!c[1].startsWith($.StateConst.VARIABLE_SYMBOL))
                        return (
                          J.VE_ErrorManager.add(
                            J.VE_Error.error(
                              "（" + s.rowIndex + "，F）",
                              "项目：" +
                                e +
                                "，对象：" +
                                t +
                                "，状态：" +
                                r +
                                "，状态赋值：" +
                                s.ValStr +
                                "，状态赋值变量格式错误，应为“（1）*变量；（2）对象名.*变量；（3）*模板变量.*变量；（4）对象名.*模板变量.*变量”几种形式，当前不符合，无法解析，请检查！",
                              ""
                            )
                          ),
                          !1
                        );
                      if (c[0].startsWith($.StateConst.VARIABLE_SYMBOL)) {
                        var h = c[0].substring(1),
                          f = c[1].substring(1);
                        if (o.isCreatedTemplate(h)) {
                          if (
                            !(d = o.getTemplate(h)).varData.isCreatedVariable(
                              f
                            ) &&
                            !d.dataSource.isCreatedFsm(f)
                          )
                            return (
                              J.VE_ErrorManager.add(
                                J.VE_Error.error(
                                  "（" + s.rowIndex + "，F）",
                                  "项目：" +
                                    e +
                                    "，对象：" +
                                    t +
                                    "，状态：" +
                                    r +
                                    "，状态赋值：" +
                                    s.ValStr +
                                    "，当前赋值格式“*模板变量.*变量”，当前“*模板变量”可以查找到，但是无法查到对应“*变量”，请检查！",
                                  ""
                                )
                              ),
                              !1
                            );
                          u.setTemplateInfo(d, f, p);
                        } else {
                          if (!i.isCreatedTemplate(h))
                            return (
                              J.VE_ErrorManager.add(
                                J.VE_Error.error(
                                  "（" + s.rowIndex + "，F）",
                                  "项目：" +
                                    e +
                                    "，对象：" +
                                    t +
                                    "，状态：" +
                                    r +
                                    "，状态赋值：" +
                                    s.ValStr +
                                    "，当前赋值格式“*模板变量.*变量”，当前“*模板变量”无法在系统中查找到，请检查！",
                                  ""
                                )
                              ),
                              !1
                            );
                          if (
                            !(d = i.getTemplate(h)).varData.isCreatedVariable(
                              f
                            ) &&
                            !d.dataSource.isCreatedFsm(f)
                          )
                            return (
                              J.VE_ErrorManager.add(
                                J.VE_Error.error(
                                  "（" + s.rowIndex + "，F）",
                                  "项目：" +
                                    e +
                                    "，对象：" +
                                    t +
                                    "，状态：" +
                                    r +
                                    "，状态赋值：" +
                                    s.ValStr +
                                    "，当前赋值格式“*模板变量.*变量”，当前“*模板变量”可以查找到，但是无法查到对应“*变量”，请检查！",
                                  ""
                                )
                              ),
                              !1
                            );
                          u.setTemplateInfo(d, f, p);
                        }
                      } else {
                        if (c[0] === t && c[1].substring(1) === r)
                          return (
                            J.VE_ErrorManager.add(
                              J.VE_Error.error(
                                "",
                                "项目：" +
                                  e +
                                  "，对象：" +
                                  t +
                                  "，状态：" +
                                  r +
                                  "，状态赋值：" +
                                  s.ValStr +
                                  "，当前赋值格式“对象名.*变量”，状态变量赋值不能自己赋值给自己，请检查！",
                                ""
                              )
                            ),
                            !1
                          );
                        var _ = new X.ErrorInfo(),
                          g = K.VeryVarManager.getVariable(
                            c[1].substring(1),
                            e,
                            c[0],
                            _
                          );
                        if (!_.isRight || null === g)
                          return (
                            J.VE_ErrorManager.add(
                              J.VE_Error.error(
                                "（" + s.rowIndex + "，F）",
                                "项目：" +
                                  e +
                                  "，对象：" +
                                  t +
                                  "，状态：" +
                                  r +
                                  "，状态赋值：" +
                                  s.ValStr +
                                  "，当前赋值格式“对象名.*变量”，*变量：" +
                                  c[1] +
                                  "无法在系统中查找到，错误信息：" +
                                  _,
                                ""
                              )
                            ),
                            !1
                          );
                        if (!D.VE_AssignmentTypeJudge.allow(a.fsmVar, g))
                          return (
                            J.VE_ErrorManager.add(
                              J.VE_Error.error(
                                "（" + s.rowIndex + "，F）",
                                "项目：" +
                                  e +
                                  "，对象：" +
                                  t +
                                  "，状态：" +
                                  r +
                                  "，状态赋值：" +
                                  s.ValStr +
                                  "，当前赋值格式“对象名.*变量”，变量类型与状态类型不匹配，不能赋值，请检查！",
                                ""
                              )
                            ),
                            !1
                          );
                        u.setStateVariable(g);
                      }
                    } else {
                      if (3 !== c.length)
                        return (
                          J.VE_ErrorManager.add(
                            J.VE_Error.error(
                              "（" + s.rowIndex + "，F）",
                              "项目：" +
                                e +
                                "，对象：" +
                                t +
                                "，状态：" +
                                r +
                                "，状态赋值：" +
                                s.ValStr +
                                "，状态赋值变量格式错误，应为“（1）*变量；（2）对象名.*变量；（3）*模板变量.*变量；（4）对象名.*模板变量.*变量”几种形式，当前不符合，无法解析，请检查！",
                              ""
                            )
                          ),
                          !1
                        );
                      if (
                        c[0].startsWith($.StateConst.STATE_SEPARATOR) ||
                        !c[1].startsWith($.StateConst.STATE_SEPARATOR) ||
                        !c[2].startsWith($.StateConst.STATE_SEPARATOR)
                      )
                        return (
                          J.VE_ErrorManager.add(
                            J.VE_Error.error(
                              "（" + s.rowIndex + "，F）",
                              "项目：" +
                                e +
                                "，对象：" +
                                t +
                                "，状态：" +
                                r +
                                "，状态赋值：" +
                                s.ValStr +
                                "，状态赋值变量格式错误，应为“（1）*变量；（2）对象名.*变量；（3）*模板变量.*变量；（4）对象名.*模板变量.*变量”几种形式，当前不符合，无法解析，请检查！",
                              ""
                            )
                          ),
                          !1
                        );
                      (h = c[1].substring(1)), (f = c[2].substring(1));
                      if (!n.isCreated(c[0]))
                        return (
                          J.VE_ErrorManager.add(
                            J.VE_Error.error(
                              "（" + s.rowIndex + "，F）",
                              "项目：" +
                                e +
                                "，对象：" +
                                t +
                                "，状态：" +
                                r +
                                "，状态赋值：" +
                                s.ValStr +
                                "，当前赋值格式“对象名.*模板变量.*变量”，当前“对象名”无法在系统中查找到，请检查！",
                              ""
                            )
                          ),
                          !1
                        );
                      var d,
                        y = n.getVeryObject(c[0]);
                      if (!y.isCreatedTemplate(h))
                        return (
                          J.VE_ErrorManager.add(
                            J.VE_Error.error(
                              "（" + s.rowIndex + "，F）",
                              "项目：" +
                                e +
                                "，对象：" +
                                t +
                                "，状态：" +
                                r +
                                "，状态赋值：" +
                                s.ValStr +
                                "，当前赋值格式“对象名.*模板变量.*变量”，当前“对象名”的对象中无法查找到该“*模板变量”，请检查！",
                              ""
                            )
                          ),
                          !1
                        );
                      if (
                        !(d = y.getTemplate(h)).varData.isCreatedVariable(f) &&
                        !d.dataSource.isCreatedFsm(f)
                      )
                        return (
                          J.VE_ErrorManager.add(
                            J.VE_Error.error(
                              "（" + s.rowIndex + "，F）",
                              "项目：" +
                                e +
                                "，对象：" +
                                t +
                                "，状态：" +
                                r +
                                "，状态赋值：" +
                                s.ValStr +
                                "，当前赋值格式“对象名.*模板变量.*变量”，当前“对象名.*模板变量”可以查找到，但是无法查到对应“*变量”，请检查！",
                              ""
                            )
                          ),
                          !1
                        );
                      u.setTemplateInfo(d, f, p);
                    }
                  } else {
                    if ((f = p.substring(1)) == r)
                      return (
                        J.VE_ErrorManager.add(
                          J.VE_Error.error(
                            "（" + s.rowIndex + "，F）",
                            "项目：" +
                              e +
                              "，对象：" +
                              t +
                              "，状态：" +
                              r +
                              "，状态赋值：" +
                              s.ValStr +
                              "，当前赋值格式“*变量”，状态变量赋值不能自己赋值给自己，请检查！",
                            ""
                          )
                        ),
                        !1
                      );
                    _ = new X.ErrorInfo();
                    var m = K.VeryVarManager.getVariable(f, e, t, _);
                    if (null === m)
                      return (
                        J.VE_ErrorManager.add(
                          J.VE_Error.error(
                            "（" + s.rowIndex + "，F）",
                            "项目：" +
                              e +
                              "，对象：" +
                              t +
                              "，状态：" +
                              r +
                              "，状态赋值：" +
                              s.ValStr +
                              "，状态赋值变量无法在当前系统中查找到，错误信息：" +
                              _,
                            ""
                          )
                        ),
                        !1
                      );
                    if (!D.VE_AssignmentTypeJudge.allow(a.fsmVar, m))
                      return (
                        J.VE_ErrorManager.add(
                          J.VE_Error.error(
                            "（" + s.rowIndex + "，F）",
                            "项目：" +
                              e +
                              "，对象：" +
                              t +
                              "，状态：" +
                              r +
                              "，状态赋值：" +
                              s.ValStr +
                              "，当前赋值格式“*变量”，变量类型与状态类型不匹配，不能赋值，请检查！",
                            ""
                          )
                        ),
                        !1
                      );
                    u.setStateVariable(m);
                  }
                else {
                  _ = new X.ErrorInfo();
                  var E = a.fsmVar.initValue(p, _);
                  if (!_.isRight)
                    return (
                      J.VE_ErrorManager.add(
                        J.VE_Error.error(
                          "（" + s.rowIndex + "，F）",
                          "项目：" +
                            e +
                            "，对象：" +
                            t +
                            "，状态：" +
                            r +
                            "，状态赋值：" +
                            s.ValStr +
                            "，状态赋值常量转化错误，请检查！",
                          ""
                        )
                      ),
                      !1
                    );
                  u.setConstValue(E);
                }
                return !0;
              }),
              (e.assignmentAction = function(e, t, r, i, n, o, a, s) {
                var u = new te.VE_Assignment(s, a.totalString),
                  p = a.varID;
                if (!(-1 < p.indexOf($.StateConst.VARIABLE_SYMBOL)))
                  return (
                    J.VE_ErrorManager.add(
                      J.VE_Error.error(
                        "",
                        "项目：" +
                          e +
                          "，对象：" +
                          t +
                          "，状态：" +
                          r +
                          "，赋值响应：" +
                          a.totalString +
                          "，赋值响应等号左边必须为变量，请检查！",
                        ""
                      )
                    ),
                    !1
                  );
                if (-1 < p.indexOf($.StateConst.STATE_SEPARATOR)) {
                  for (
                    var c = p.split($.StateConst.STATE_SEPARATOR), l = 0;
                    l < c.length;
                    l++
                  )
                    c[l] = c[l].trim();
                  if (2 === c.length)
                    if (c[0].startsWith($.StateConst.VARIABLE_SYMBOL)) {
                      var h = c[0].substring(1);
                      if (((p = c[1].substring(1)), o.isCreatedTemplate(h))) {
                        if (
                          (d = o.getTemplate(h)).varData.isCreatedVariable(p)
                        ) {
                          if (
                            "expression" ===
                              (f = d.varData.getVariableParas(
                                p
                              ))[1].toLowerCase() ||
                            "公式" === f[1].toLowerCase()
                          )
                            return (
                              J.VE_ErrorManager.add(
                                J.VE_Error.error(
                                  "",
                                  "项目：" +
                                    e +
                                    "，对象：" +
                                    t +
                                    "，状态：" +
                                    r +
                                    "，赋值响应：" +
                                    a.totalString +
                                    "，当前赋值响应等号左侧格式“*模板变量.*变量”，该变量不能为“公式”，请检查！",
                                  ""
                                )
                              ),
                              !1
                            );
                          u.setLeftTemplateVar(d, p);
                        } else {
                          if (!d.dataSource.isCreatedFsm(p))
                            return (
                              J.VE_ErrorManager.add(
                                J.VE_Error.error(
                                  "",
                                  "项目：" +
                                    e +
                                    "，对象：" +
                                    t +
                                    "，状态：" +
                                    r +
                                    "，赋值响应：" +
                                    a.totalString +
                                    "，当前赋值响应等号左侧格式“*模板变量.*变量”，当前“*模板变量”可以查找到，但是无法查到对应“*变量”，请检查！",
                                  ""
                                )
                              ),
                              !1
                            );
                          u.setLeftTemplateVar(d, p);
                        }
                      } else {
                        if (!i.isCreatedTemplate(h))
                          return (
                            J.VE_ErrorManager.add(
                              J.VE_Error.error(
                                "",
                                "项目：" +
                                  e +
                                  "，对象：" +
                                  t +
                                  "，状态：" +
                                  r +
                                  "，赋值响应：" +
                                  a.totalString +
                                  "，当前赋值响应等号左侧格式“*模板变量.*变量”，当前“*模板变量”无法在系统中查找到，请检查！",
                                ""
                              )
                            ),
                            !1
                          );
                        if (
                          (d = i.getTemplate(h)).varData.isCreatedVariable(p)
                        ) {
                          var f;
                          if (
                            "expression" ===
                              (f = d.varData.getVariableParas(
                                p
                              ))[1].toLowerCase() ||
                            "公式" === f[1].toLowerCase()
                          )
                            return (
                              J.VE_ErrorManager.add(
                                J.VE_Error.error(
                                  "",
                                  "项目：" +
                                    e +
                                    "，对象：" +
                                    t +
                                    "，状态：" +
                                    r +
                                    "，赋值响应：" +
                                    a.totalString +
                                    "，当前赋值响应等号左侧格式“*模板变量.*变量”，该变量不能为“公式”，请检查！",
                                  ""
                                )
                              ),
                              !1
                            );
                          u.setLeftTemplateVar(d, p);
                        } else {
                          if (!d.dataSource.isCreatedFsm(p))
                            return (
                              J.VE_ErrorManager.add(
                                J.VE_Error.error(
                                  "",
                                  "项目：" +
                                    e +
                                    "，对象：" +
                                    t +
                                    "，状态：" +
                                    r +
                                    "，赋值响应：" +
                                    a.totalString +
                                    "，当前赋值响应等号左侧格式“*模板变量.*变量”，当前“*模板变量”可以查找到，但是无法查到对应“*变量”，请检查！",
                                  ""
                                )
                              ),
                              !1
                            );
                          u.setLeftTemplateVar(d, p);
                        }
                      }
                    } else {
                      if (!n.isCreated(c[0]))
                        return (
                          J.VE_ErrorManager.add(
                            J.VE_Error.error(
                              "",
                              "项目：" +
                                e +
                                "，对象：" +
                                t +
                                "，状态：" +
                                r +
                                "，赋值响应：" +
                                a.totalString +
                                "，赋值响应等号左侧变量格式“对象名.*变量”，当前“对象名”无法在系统中查找到，请检查！",
                              ""
                            )
                          ),
                          !1
                        );
                      var _ = n.getVeryObject(c[0]);
                      if (((p = p.substring(1)), _.isCreatedExpression(p)))
                        return (
                          J.VE_ErrorManager.add(
                            J.VE_Error.error(
                              "",
                              "项目：" +
                                e +
                                "，对象：" +
                                t +
                                "，状态：" +
                                r +
                                "，赋值响应：" +
                                a.totalString +
                                "，当前赋值响应等号左侧格式“对象名.*变量”，该变量不能为“公式”，请检查！",
                              ""
                            )
                          ),
                          !1
                        );
                      if (_.isCreatedFsm(p)) {
                        var g = _.getFsm(p).fsmVar;
                        u.setLeftVariable(g);
                      } else if (_.isCreatedVariable(p)) {
                        g = _.getVariable(p);
                        u.setLeftVariable(g);
                      } else {
                        if (!_.isCreatedTemplate(p))
                          return (
                            J.VE_ErrorManager.add(
                              J.VE_Error.error(
                                "",
                                "项目：" +
                                  e +
                                  "，对象：" +
                                  t +
                                  "，状态：" +
                                  r +
                                  "，赋值响应：" +
                                  a.totalString +
                                  "，当前赋值响应等号左侧格式“对象名.*变量”，无法在当前对象名中查找到该变量，请检查！",
                                ""
                              )
                            ),
                            !1
                          );
                        var d = _.getTemplate(p);
                        u.setLeftTemplate(d);
                      }
                    }
                  else {
                    if (3 !== c.length)
                      return (
                        J.VE_ErrorManager.add(
                          J.VE_Error.error(
                            "",
                            "项目：" +
                              e +
                              "，对象：" +
                              t +
                              "，状态：" +
                              r +
                              "，赋值响应：" +
                              a.totalString +
                              "，赋值响应等号左侧变量格式错误，应为“（1）*变量；（2）对象名.*变量；（3）*模板变量.*变量；（4）对象名.*模板变量.*变量”几种形式，当前不符合，无法解析，请检查！",
                            ""
                          )
                        ),
                        !1
                      );
                    if (
                      c[0].startsWith($.StateConst.STATE_SEPARATOR) ||
                      !c[1].startsWith($.StateConst.STATE_SEPARATOR) ||
                      !c[2].startsWith($.StateConst.STATE_SEPARATOR)
                    )
                      return (
                        J.VE_ErrorManager.add(
                          J.VE_Error.error(
                            "",
                            "项目：" +
                              e +
                              "，对象：" +
                              t +
                              "，状态：" +
                              r +
                              "，赋值响应：" +
                              a.totalString +
                              "，赋值响应等号左侧变量格式错误，应为“（1）*变量；（2）对象名.*变量；（3）*模板变量.*变量；（4）对象名.*模板变量.*变量”几种形式，当前不符合，无法解析，请检查！",
                            ""
                          )
                        ),
                        !1
                      );
                    h = c[1].substring(1);
                    if (((p = c[2].substring(1)), !n.isCreated(c[0])))
                      return (
                        J.VE_ErrorManager.add(
                          J.VE_Error.error(
                            "",
                            "项目：" +
                              e +
                              "，对象：" +
                              t +
                              "，状态：" +
                              r +
                              "，赋值响应：" +
                              a.totalString +
                              "，赋值响应等号左侧变量格式“对象名.*模板变量.*变量”，当前“对象名”无法在系统中查找到，请检查！",
                            ""
                          )
                        ),
                        !1
                      );
                    if (!(V = n.getVeryObject(c[0])).isCreatedTemplate(h))
                      return (
                        J.VE_ErrorManager.add(
                          J.VE_Error.error(
                            "",
                            "项目：" +
                              e +
                              "，对象：" +
                              t +
                              "，状态：" +
                              r +
                              "，赋值响应：" +
                              a.totalString +
                              "，赋值响应等号左侧变量格式“对象名.*模板变量.*变量”，当前“对象名”的对象中无法查找到该“*模板变量”，请检查！",
                            ""
                          )
                        ),
                        !1
                      );
                    if ((d = V.getTemplate(h)).dataSource.isCreatedFsm(p))
                      u.setLeftTemplateVar(d, p);
                    else {
                      if (!d.varData.isCreatedVariable(p))
                        return (
                          J.VE_ErrorManager.add(
                            J.VE_Error.error(
                              "",
                              "项目：" +
                                e +
                                "，对象：" +
                                t +
                                "，状态：" +
                                r +
                                "，赋值响应：" +
                                a.totalString +
                                "，赋值响应等号左侧变量格式“对象名.*模板变量.*变量”，当前“对象名.*模板变量”可以查找到，但是无法查到对应“*变量”，请检查！",
                              ""
                            )
                          ),
                          !1
                        );
                      var y = d.varData.getVariableParas(p);
                      if (
                        "expression" === y[1].toLowerCase() ||
                        "公式" === y[1].toLowerCase()
                      )
                        return (
                          J.VE_ErrorManager.add(
                            J.VE_Error.error(
                              "",
                              "项目：" +
                                e +
                                "，对象：" +
                                t +
                                "，状态：" +
                                r +
                                "，赋值响应：" +
                                a.totalString +
                                "，赋值响应等号左侧变量格式“对象名.*模板变量.*变量”，当前“对象名.*模板变量.*变量”为公式变量，公式变量不可直接赋值，请检查！",
                              ""
                            )
                          ),
                          !1
                        );
                      u.setLeftTemplateVar(d, p);
                    }
                  }
                } else {
                  if (((p = p.substring(1)), o.isCreatedExpression(p)))
                    return (
                      J.VE_ErrorManager.add(
                        J.VE_Error.error(
                          "",
                          "项目：" +
                            e +
                            "，对象：" +
                            t +
                            "，状态：" +
                            r +
                            "，赋值响应：" +
                            a.totalString +
                            "，当前赋值响应等号左侧格式“*变量”，该变量不能为“公式”，请检查！",
                          ""
                        )
                      ),
                      !1
                    );
                  if (o.isCreatedFsm(p)) {
                    g = o.getFsm(p).fsmVar;
                    u.setLeftVariable(g);
                  } else if (o.isCreatedVariable(p)) {
                    g = o.getVariable(p);
                    u.setLeftVariable(g);
                  } else if (o.isCreatedTemplate(p)) {
                    d = o.getTemplate(p);
                    u.setLeftTemplate(d);
                  } else {
                    if (i.isCreatedExpression(p))
                      return (
                        J.VE_ErrorManager.add(
                          J.VE_Error.error(
                            "",
                            "项目：" +
                              e +
                              "，对象：" +
                              t +
                              "，状态：" +
                              r +
                              "，赋值响应：" +
                              a.totalString +
                              "，当前赋值响应等号左侧格式“*变量”，该变量不能为“公式”，请检查！",
                            ""
                          )
                        ),
                        !1
                      );
                    if (i.isCreatedVariable(p)) {
                      g = i.getVariable(p);
                      u.setLeftVariable(g);
                    } else {
                      if (!i.isCreatedTemplate(p))
                        return (
                          J.VE_ErrorManager.add(
                            J.VE_Error.error(
                              "",
                              "项目：" +
                                e +
                                "，对象：" +
                                t +
                                "，状态：" +
                                r +
                                "，赋值响应：" +
                                a.totalString +
                                "，当前赋值响应等号左侧格式“*变量”，无法在当前系统中查找到该变量，请检查！",
                              ""
                            )
                          ),
                          !1
                        );
                      d = i.getTemplate(p);
                      u.setLeftTemplate(d);
                    }
                  }
                }
                if (
                  (p = a.varValue.trim()).startsWith('"') ||
                  p.startsWith("'") ||
                  p.startsWith("“") ||
                  p.startsWith("‘")
                )
                  u.setRightConst(p.substring(1, p.length - 2).trim());
                else if (X.VE_StringFormat.isFormulaString(p)) {
                  var m = new X.ErrorInfo();
                  $.StateConst.AssignmentFormulaCount++;
                  var E = H.VE_Expressions.createLocalExpression(
                    $.StateConst.AssignmentPrefix +
                      $.StateConst.AssignmentFormulaCount.toString(),
                    p,
                    e,
                    t,
                    m
                  );
                  if (!m.isRight || !E)
                    return (
                      J.VE_ErrorManager.add(
                        J.VE_Error.error(
                          "",
                          "项目：" +
                            e +
                            "，对象：" +
                            t +
                            "，状态：" +
                            r +
                            "，赋值响应：" +
                            a.totalString +
                            "，当前赋值响应等号右侧格式“公式”，公式解析错误，请检查！错误信息：" +
                            m,
                          ""
                        )
                      ),
                      !1
                    );
                  u.setRightVariable(new K.VeryExpression(E));
                } else if (-1 < p.indexOf($.StateConst.VARIABLE_SYMBOL))
                  if (-1 < p.indexOf($.StateConst.STATE_SEPARATOR)) {
                    for (
                      c = p.split($.StateConst.STATE_SEPARATOR), l = 0;
                      l < c.length;
                      l++
                    )
                      c[l] = c[l].trim();
                    if (2 === c.length)
                      if (c[0].startsWith($.StateConst.VARIABLE_SYMBOL)) {
                        h = c[0].substring(1);
                        if (((p = c[1].substring(1)), o.isCreatedTemplate(h))) {
                          if (
                            !(d = o.getTemplate(h)).varData.isCreatedVariable(
                              p
                            ) &&
                            !d.dataSource.isCreatedFsm(p)
                          )
                            return (
                              J.VE_ErrorManager.add(
                                J.VE_Error.error(
                                  "",
                                  "项目：" +
                                    e +
                                    "，对象：" +
                                    t +
                                    "，状态：" +
                                    r +
                                    "，赋值响应：" +
                                    a.totalString +
                                    "，当前赋值响应等号右侧格式“*模板变量.*变量”，当前“*模板变量”可以查找到，但是无法查到对应“*变量”，请检查！",
                                  ""
                                )
                              ),
                              !1
                            );
                          u.setRightTemplateVariable(d, p);
                        } else {
                          if (!i.isCreatedTemplate(h))
                            return (
                              J.VE_ErrorManager.add(
                                J.VE_Error.error(
                                  "",
                                  "项目：" +
                                    e +
                                    "，对象：" +
                                    t +
                                    "，状态：" +
                                    r +
                                    "，赋值响应：" +
                                    a.totalString +
                                    "，当前赋值响应等号右侧格式“*模板变量.*变量”，当前“*模板变量”无法在系统中查找到，请检查！",
                                  ""
                                )
                              ),
                              !1
                            );
                          if (
                            !(d = i.getTemplate(h)).varData.isCreatedVariable(
                              p
                            ) &&
                            !d.dataSource.isCreatedFsm(p)
                          )
                            return (
                              J.VE_ErrorManager.add(
                                J.VE_Error.error(
                                  "",
                                  "项目：" +
                                    e +
                                    "，对象：" +
                                    t +
                                    "，状态：" +
                                    r +
                                    "，赋值响应：" +
                                    a.totalString +
                                    "，当前赋值响应等号右侧格式“*模板变量.*变量”，当前“*模板变量”可以查找到，但是无法查到对应“*变量”，请检查！",
                                  ""
                                )
                              ),
                              !1
                            );
                          u.setRightTemplateVariable(d, p);
                        }
                      } else {
                        if (!n.isCreated(c[0]))
                          return (
                            J.VE_ErrorManager.add(
                              J.VE_Error.error(
                                "",
                                "项目：" +
                                  e +
                                  "，对象：" +
                                  t +
                                  "，状态：" +
                                  r +
                                  "，赋值响应：" +
                                  a.totalString +
                                  "，赋值响应等号右侧变量格式“对象名.*变量”，当前“对象名”无法在系统中查找到，请检查！",
                                ""
                              )
                            ),
                            !1
                          );
                        _ = n.getVeryObject(c[0]);
                        p = p.substring(1);
                        var b = null,
                          v = null;
                        if (_.isCreatedExpression(p))
                          b = new K.VeryExpression(_.getExpression(p));
                        else if (_.isCreatedFsm(p)) b = _.getFsm(p).fsmVar;
                        else if (_.isCreatedVariable(p)) b = _.getVariable(p);
                        else {
                          if (!_.isCreatedTemplate(p))
                            return (
                              J.VE_ErrorManager.add(
                                J.VE_Error.error(
                                  "",
                                  "项目：" +
                                    e +
                                    "，对象：" +
                                    t +
                                    "，状态：" +
                                    r +
                                    "，赋值响应：" +
                                    a.totalString +
                                    "，当前赋值响应等号右侧格式“对象名.*变量”，无法在当前系统中查找到该变量，请检查！",
                                  ""
                                )
                              ),
                              !1
                            );
                          v = _.getTemplate(p);
                        }
                        if (null !== b) {
                          if (u.leftType === re.AssignType.Template)
                            return (
                              J.VE_ErrorManager.add(
                                J.VE_Error.error(
                                  "",
                                  "项目：" +
                                    e +
                                    "，对象：" +
                                    t +
                                    "，状态：" +
                                    r +
                                    "，赋值响应：" +
                                    a.totalString +
                                    "，当前赋值响应等号左侧为“模板变量”类型，右侧为“普通变量”类型，无法赋值，请检查！",
                                  ""
                                )
                              ),
                              !1
                            );
                          if (u.leftType === re.AssignType.Variable) {
                            if (
                              !D.VE_AssignmentTypeJudge.allow(u.leftVariable, b)
                            )
                              return (
                                J.VE_ErrorManager.add(
                                  J.VE_Error.error(
                                    "",
                                    "项目：" +
                                      e +
                                      "，对象：" +
                                      t +
                                      "，状态：" +
                                      r +
                                      "，赋值响应：" +
                                      a.totalString +
                                      "，当前赋值响应等号左侧和右侧类型不匹配，无法赋值，请检查！",
                                    ""
                                  )
                                ),
                                !1
                              );
                            u.setRightVariable(b);
                          } else u.setRightVariable(b);
                        } else {
                          if (null == v)
                            return (
                              J.VE_ErrorManager.add(
                                J.VE_Error.error(
                                  "",
                                  "项目：" +
                                    e +
                                    "，对象：" +
                                    t +
                                    "，状态：" +
                                    r +
                                    "，赋值响应：" +
                                    a.totalString +
                                    "，当前赋值响应等号右侧数据无法识别，请检查！",
                                  ""
                                )
                              ),
                              !1
                            );
                          if (u.leftType !== re.AssignType.Template)
                            return (
                              J.VE_ErrorManager.add(
                                J.VE_Error.error(
                                  "",
                                  "项目：" +
                                    e +
                                    "，对象：" +
                                    t +
                                    "，状态：" +
                                    r +
                                    "，赋值响应：" +
                                    a.totalString +
                                    "，当前赋值响应等号左侧为“模板变量”，右侧为“普通变量”，无法赋值，请检查！",
                                  ""
                                )
                              ),
                              !1
                            );
                          u.setRightTemplate(v);
                        }
                      }
                    else {
                      if (3 !== c.length)
                        return (
                          J.VE_ErrorManager.add(
                            J.VE_Error.error(
                              "",
                              "项目：" +
                                e +
                                "，对象：" +
                                t +
                                "，状态：" +
                                r +
                                "，赋值响应：" +
                                a.totalString +
                                "，赋值响应等号右侧变量格式错误，应为“（1）*变量；（2）对象名.*变量；（3）*模板变量.*变量；（4）对象名.*模板变量.*变量”几种形式，当前不符合，无法解析，请检查！",
                              ""
                            )
                          ),
                          !1
                        );
                      if (
                        c[0].startsWith($.StateConst.STATE_SEPARATOR) ||
                        !c[1].startsWith($.StateConst.STATE_SEPARATOR) ||
                        !c[2].startsWith($.StateConst.STATE_SEPARATOR)
                      )
                        return (
                          J.VE_ErrorManager.add(
                            J.VE_Error.error(
                              "",
                              "项目：" +
                                e +
                                "，对象：" +
                                t +
                                "，状态：" +
                                r +
                                "，赋值响应：" +
                                a.totalString +
                                "，赋值响应等号右侧变量格式错误，应为“（1）*变量；（2）对象名.*变量；（3）*模板变量.*变量；（4）对象名.*模板变量.*变量”几种形式，当前不符合，无法解析，请检查！",
                              ""
                            )
                          ),
                          !1
                        );
                      var V;
                      h = c[1].substring(1);
                      if (((p = c[2].substring(1)), !n.isCreated(c[0])))
                        return (
                          J.VE_ErrorManager.add(
                            J.VE_Error.error(
                              "",
                              "项目：" +
                                e +
                                "，对象：" +
                                t +
                                "，状态：" +
                                r +
                                "，赋值响应：" +
                                a.totalString +
                                "，赋值响应等号右侧变量格式“对象名.*模板变量.*变量”，当前“对象名”无法在系统中查找到，请检查！",
                              ""
                            )
                          ),
                          !1
                        );
                      if (!(V = n.getVeryObject(c[0])).isCreatedTemplate(h))
                        return (
                          J.VE_ErrorManager.add(
                            J.VE_Error.error(
                              "",
                              "项目：" +
                                e +
                                "，对象：" +
                                t +
                                "，状态：" +
                                r +
                                "，赋值响应：" +
                                a.totalString +
                                "，赋值响应等号右侧变量格式“对象名.*模板变量.*变量”，当前“对象名”的对象中无法查找到该“*模板变量”，请检查！",
                              ""
                            )
                          ),
                          !1
                        );
                      if (
                        !(d = V.getTemplate(h)).dataSource.isCreatedFsm(p) &&
                        !d.varData.isCreatedVariable(p)
                      )
                        return (
                          J.VE_ErrorManager.add(
                            J.VE_Error.error(
                              "",
                              "项目：" +
                                e +
                                "，对象：" +
                                t +
                                "，状态：" +
                                r +
                                "，赋值响应：" +
                                a.totalString +
                                "，赋值响应等号右侧变量格式“对象名.*模板变量.*变量”，当前“对象名.*模板变量”可以查找到，但是无法查到对应“*变量”，请检查！",
                              ""
                            )
                          ),
                          !1
                        );
                      u.setRightTemplateVariable(d, p);
                    }
                  } else {
                    p = p.substring(1);
                    (b = null), (v = null);
                    if (o.isCreatedExpression(p))
                      b = new K.VeryExpression(o.getExpression(p));
                    else if (o.isCreatedFsm(p)) b = o.getFsm(p).fsmVar;
                    else if (o.isCreatedVariable(p)) b = o.getVariable(p);
                    else if (o.isCreatedTemplate(p)) v = o.getTemplate(p);
                    else if (i.isCreatedExpression(p))
                      b = new K.VeryExpression(i.getExpression(p));
                    else if (i.isCreatedVariable(p)) b = i.getVariable(p);
                    else if (i.isCreatedTemplate(p)) v = i.getTemplate(p);
                    else if (
                      x.VerySceneVariables.Variables.isCreatedExpression(p)
                    )
                      b = new K.VeryExpression(
                        x.VerySceneVariables.Variables.getExpression(p)
                      );
                    else {
                      if (!x.VerySceneVariables.Variables.isCreatedVariable(p))
                        return (
                          J.VE_ErrorManager.add(
                            J.VE_Error.error(
                              "",
                              "项目：" +
                                e +
                                "，对象：" +
                                t +
                                "，状态：" +
                                r +
                                "，赋值响应：" +
                                a.totalString +
                                "，当前赋值响应等号右侧格式“*变量”，无法在当前系统中查找到该变量，请检查！",
                              ""
                            )
                          ),
                          !1
                        );
                      b = x.VerySceneVariables.Variables.getVariable(p);
                    }
                    if (null != b) {
                      if (u.leftType === re.AssignType.Template)
                        return (
                          J.VE_ErrorManager.add(
                            J.VE_Error.error(
                              "",
                              "项目：" +
                                e +
                                "，对象：" +
                                t +
                                "，状态：" +
                                r +
                                "，赋值响应：" +
                                a.totalString +
                                "，当前赋值响应等号左侧为“模板变量”类型，右侧为“普通变量”类型，无法赋值，请检查！",
                              ""
                            )
                          ),
                          !1
                        );
                      if (u.leftType === re.AssignType.Variable) {
                        if (!D.VE_AssignmentTypeJudge.allow(u.leftVariable, b))
                          return (
                            J.VE_ErrorManager.add(
                              J.VE_Error.error(
                                "",
                                "项目：" +
                                  e +
                                  "，对象：" +
                                  t +
                                  "，状态：" +
                                  r +
                                  "，赋值响应：" +
                                  a.totalString +
                                  "，当前赋值响应等号左侧和右侧类型不匹配，无法赋值，请检查！",
                                ""
                              )
                            ),
                            !1
                          );
                        u.setRightVariable(b);
                      } else u.setRightVariable(b);
                    } else {
                      if (null == v)
                        return (
                          J.VE_ErrorManager.add(
                            J.VE_Error.error(
                              "",
                              "项目：" +
                                e +
                                "，对象：" +
                                t +
                                "，状态：" +
                                r +
                                "，赋值响应：" +
                                a.totalString +
                                "，当前赋值响应等号右侧数据无法识别，请检查！",
                              ""
                            )
                          ),
                          !1
                        );
                      if (u.leftType !== re.AssignType.Template)
                        return (
                          J.VE_ErrorManager.add(
                            J.VE_Error.error(
                              "",
                              "项目：" +
                                e +
                                "，对象：" +
                                t +
                                "，状态：" +
                                r +
                                "，赋值响应：" +
                                a.totalString +
                                "，当前赋值响应等号左侧为“模板变量”，右侧为“普通变量”，无法赋值，请检查！",
                              ""
                            )
                          ),
                          !1
                        );
                      u.setRightTemplate(v);
                    }
                  }
                else if (u.leftType === re.AssignType.Template) {
                  if ("null" !== p.trim().toLowerCase())
                    return (
                      J.VE_ErrorManager.add(
                        J.VE_Error.error(
                          "",
                          "项目：" +
                            e +
                            "，对象：" +
                            t +
                            "，状态：" +
                            r +
                            "，赋值响应：" +
                            a.totalString +
                            "，当前赋值响应等号左侧为模板变量，右侧赋值为常量时只能填“null”，表示销毁模板变量，当前格式错误，请检查！",
                          ""
                        )
                      ),
                      !1
                    );
                  u.setRightNull();
                } else if (u.leftType === re.AssignType.TemplateVariable)
                  u.setRightConst(p);
                else {
                  if (null === u.leftVariable)
                    return (
                      J.VE_ErrorManager.add(
                        J.VE_Error.error(
                          "",
                          "项目：" +
                            e +
                            "，对象：" +
                            t +
                            "，状态：" +
                            r +
                            "，赋值响应：" +
                            a.totalString +
                            "，当前赋值响应等号左侧变量获取为空，请检查！",
                          ""
                        )
                      ),
                      !1
                    );
                  m = new X.ErrorInfo();
                  var T = u.leftVariable.initValue(p, m);
                  if (!m.isRight || !T)
                    return (
                      J.VE_ErrorManager.add(
                        J.VE_Error.error(
                          "",
                          "项目：" +
                            e +
                            "，对象：" +
                            t +
                            "，状态：" +
                            r +
                            "，赋值响应：" +
                            a.totalString +
                            "，当前赋值响应等号左侧变量类型与右侧常量值不匹配，错误信息：" +
                            m +
                            "，请检查！",
                          ""
                        )
                      ),
                      !1
                    );
                  u.setRightConstValue(T);
                }
                var S = new $.VE_StateAction();
                return S.setAssignment(u), s.addAction(S), !0;
              }),
              (e.createInstance = function(e, t, r, i, n, o, a) {
                return i;
              }),
              e
            );
          })();
        r.CreateInstance = i;
      },
      {
        "../action": 7,
        "../action/assignmentTypeJudge": 6,
        "../enum": 17,
        "../expression": 26,
        "../global": 37,
        "../manager": 49,
        "../scene": 56,
        "../state": 60,
        "../trigger": 67,
        "../utility": 73,
        "../utility/typeConvert": 75,
        "../variables": 77
      }
    ],
    47: [
      function(e, t, r) {
        "use strict";
        function i(e) {
          for (var t in e) r.hasOwnProperty(t) || (r[t] = e[t]);
        }
        Object.defineProperty(r, "__esModule", { value: !0 }),
          i(e("./loaderManager")),
          i(e("./createInstance"));
      },
      { "./createInstance": 46, "./loaderManager": 48 }
    ],
    48: [
      function(e, t, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", { value: !0 });
        var P,
          i,
          w = e("../template"),
          A = e("../object"),
          M = e("../dataSource"),
          F = e("../manager"),
          L = e("../variables"),
          N = e("../utility"),
          k = e("../global"),
          R = e("../state"),
          B = e("./createInstance");
        ((i = P = r.AnalisysType || (r.AnalisysType = {}))[(i.Global = 0)] =
          "Global"),
          (i[(i.Object = 1)] = "Object"),
          (i[(i.Template = 2)] = "Template");
        var n = (function() {
          function e() {
            (this._currentType = P.Global),
              (this._projectName = ""),
              (this._lastFsmID = ""),
              (this._activeTemplate = null),
              (this._activeObject = null),
              (this._activeFsmData = null),
              (this._activeStateData = null);
          }
          return (
            (e.prototype.load = function(e, t) {
              (this._projectName = e),
                (this._table = t),
                F.VE_Manager.createProject(e);
              var r = F.VE_Manager.templates(e),
                i = F.VE_Manager.objects(e),
                n = F.VE_Manager.variables(e);
              if (t) {
                for (var o = 0; o < t.RowCount; o++)
                  if (t.getData(o, 0).startsWith("模板_")) {
                    (this._activeFsmData = null),
                      (this._activeStateData = null),
                      (this._currentType = P.Template);
                    var a = t
                      .getData(o, 0)
                      .replace(" ", "")
                      .substring(3);
                    if (-1 < a.indexOf(":") || -1 < a.indexOf("："));
                    else {
                      if (!N.VE_StringFormat.isIDLegal(a))
                        return (
                          k.VE_ErrorManager.add(
                            k.VE_Error.error(
                              t.pos(o, 0),
                              "模板对象名：" +
                                t.getData(o, 0) +
                                "，当前模板对象名不合法，包含非法字符，请检查！",
                              t.ID
                            )
                          ),
                          !1
                        );
                      if (r.isCreatedTemplate(a))
                        return (
                          k.VE_ErrorManager.add(
                            k.VE_Error.error(
                              t.pos(o, 0),
                              "模板对象名：" +
                                t.getData(o, 0) +
                                "，当前模板已创建，请勿使用重复的模板对象名！",
                              t.ID
                            )
                          ),
                          !1
                        );
                      var s = new w.VE_Template(e, a);
                      r.addTemplate(a, s), (this._activeTemplate = s);
                    }
                  } else if ("" !== t.getData(o, 0)) {
                    (this._activeFsmData = null),
                      (this._activeStateData = null),
                      (this._currentType = P.Object);
                    var u = t.getData(o, 0),
                      p = "";
                    if (-1 < u.indexOf("=")) {
                      var c = u.split("=");
                      if (2 !== c.length)
                        return (
                          k.VE_ErrorManager.add(
                            k.VE_Error.error(
                              t.pos(o, 0),
                              "对象名：" +
                                t.getData(o, 0) +
                                "，当前对象名格式错误，应为“对象名”或者“对象名=场景物体名”的形式，请检查！",
                              t.ID
                            )
                          ),
                          !1
                        );
                      (u = c[0].trim()), (p = c[1].trim());
                    }
                    if (!N.VE_StringFormat.isIDLegal(u))
                      return (
                        k.VE_ErrorManager.add(
                          k.VE_Error.error(
                            t.pos(o, 0),
                            "对象名：" +
                              t.getData(o, 0) +
                              "，当前对象名不合法，包含非法字符，请检查！",
                            t.ID
                          )
                        ),
                        !1
                      );
                    var l = null;
                    if ("" === p) l = new L.GameObject("__" + u + "_Empty");
                    else if (null === (l = L.GameObject.find(p)))
                      return (
                        k.VE_ErrorManager.add(
                          k.VE_Error.error(
                            t.pos(o, 0),
                            "对象名：" +
                              p +
                              "，当前对象在场景中不存在，请检查！",
                            t.ID
                          )
                        ),
                        !1
                      );
                    if (i.isCreated(u))
                      return (
                        k.VE_ErrorManager.add(
                          k.VE_Error.error(
                            t.pos(o, 0),
                            "对象名：" +
                              t.getData(o, 0) +
                              "，当前对象已创建，请勿使用重复的对象名！",
                            t.ID
                          )
                        ),
                        !1
                      );
                    var h = new A.VeryEngineObject(e, u, l);
                    i.add(u, h), (this._activeObject = h);
                  } else if (
                    "" !== t.getData(o, 5) &&
                    "" === t.getData(o, 1) &&
                    "" === t.getData(o, 2) &&
                    "" === t.getData(o, 3) &&
                    "" === t.getData(o, 4) &&
                    "" === t.getData(o, 6) &&
                    "" === t.getData(o, 7) &&
                    "" === t.getData(o, 8)
                  ) {
                    var f = t.getData(o, 5);
                    if (this._currentType === P.Global) {
                      if (
                        2 !== (V = N.VE_StringFormat.paraSegment(f)).length &&
                        3 !== V.length
                      )
                        return (
                          k.VE_ErrorManager.add(
                            k.VE_Error.error(
                              t.pos(o, 5),
                              "全局变量：" +
                                t.getData(o, 5) +
                                "，当前全局变量格式不正确，请检查！",
                              t.ID
                            )
                          ),
                          !1
                        );
                      var _ = V[0].trim();
                      if (!N.VE_StringFormat.isIDLegal(_))
                        return (
                          k.VE_ErrorManager.add(
                            k.VE_Error.error(
                              t.pos(o, 5),
                              "全局变量：" +
                                t.getData(o, 5) +
                                "，当前变量名不合法，包含非法字符，请检查！",
                              t.ID
                            )
                          ),
                          !1
                        );
                      var g = [V[1].trim()];
                      if (
                        (2 === V.length ? (g[1] = "") : (g[1] = V[2].trim()),
                        n.varData.isCreatedVariable(_))
                      )
                        return (
                          k.VE_ErrorManager.add(
                            k.VE_Error.error(
                              t.pos(o, 5),
                              "全局变量：" +
                                t.getData(o, 5) +
                                "，当前全局变量名已创建，请检查！",
                              t.ID
                            )
                          ),
                          !1
                        );
                      n.varData.addVariable(_, g, t.pos(o, 5));
                    } else if (-1 < f.indexOf("=")) {
                      if (
                        2 === (g = f.split("=")).length &&
                        g[0].trim() === this._lastFsmID
                      ) {
                        if (null === this._activeFsmData)
                          return (
                            k.VE_ErrorManager.add(
                              k.VE_Error.error(
                                t.pos(o, 5),
                                "状态赋值：" +
                                  t.getData(o, 5) +
                                  "，当前状态不属于任何对象和模板对象，请检查！",
                                t.ID
                              )
                            ),
                            !1
                          );
                        var d = g[1].trim().split(/,|，/),
                          y = R.StateConst.STATE_INDEX,
                          m = null;
                        if (2 === d.length) {
                          if (
                            ((d[0] = d[0].trim()),
                            (d[1] = d[1].trim()),
                            !d[1].startsWith("#"))
                          )
                            return (
                              k.VE_ErrorManager.add(
                                k.VE_Error.error(
                                  t.pos(o, 5),
                                  "状态赋值：" +
                                    t.getData(o, 5) +
                                    "，状态关联ID格式错误，状态关联标志ID写法：“状态ID=赋值，#整数ID”，请检查！",
                                  t.ID
                                )
                              ),
                              !1
                            );
                          if (NaN === (y = parseInt(d[1].substring(1))))
                            return (
                              k.VE_ErrorManager.add(
                                k.VE_Error.error(
                                  t.pos(o, 5),
                                  "状态赋值：" +
                                    t.getData(o, 5) +
                                    "，状态关联ID格式错误，状态关联标志ID写法：“状态ID=赋值，#整数ID”，当前整数转化错误！",
                                  t.ID
                                )
                              ),
                              !1
                            );
                        }
                        ((m = new M.VE_StateData(
                          this._activeFsmData,
                          d[0].trim(),
                          !1,
                          y
                        )).rowIndex = o),
                          this._activeFsmData.addState(m),
                          (this._activeStateData = m);
                      } else {
                        if (3 !== (V = N.VE_StringFormat.paraSegment(f)).length)
                          return (
                            k.VE_ErrorManager.add(
                              k.VE_Error.error(
                                t.pos(o, 5),
                                "局部公式变量：" +
                                  t.getData(o, 5) +
                                  "，当前局部公式变量格式不正确，请检查！",
                                t.ID
                              )
                            ),
                            !1
                          );
                        _ = V[0].trim();
                        if (!N.VE_StringFormat.isIDLegal(_))
                          return (
                            k.VE_ErrorManager.add(
                              k.VE_Error.error(
                                t.pos(o, 5),
                                "变量：" +
                                  t.getData(o, 5) +
                                  "，当前变量名不合法，包含非法字符，请检查！",
                                t.ID
                              )
                            ),
                            !1
                          );
                        var E = [V[1].trim(), V[2].trim()];
                        if (this._currentType === P.Object) {
                          if (this._activeObject.varData.isCreatedVariable(_))
                            return (
                              k.VE_ErrorManager.add(
                                k.VE_Error.error(
                                  t.pos(o, 5),
                                  "对象名：" +
                                    this._activeObject.objectID +
                                    "，局部变量：" +
                                    t.getData(o, 5) +
                                    "，当前局部变量名已创建，请检查！",
                                  t.ID
                                )
                              ),
                              !1
                            );
                          if (this._activeObject.dataSource.isCreatedFsm(_))
                            return (
                              k.VE_ErrorManager.add(
                                k.VE_Error.error(
                                  t.pos(o, 5),
                                  "对象名：" +
                                    this._activeObject.objectID +
                                    "，局部变量：" +
                                    t.getData(o, 5) +
                                    "，局部变量名不能与状态名相同，当前状态已创建，请检查！",
                                  t.ID
                                )
                              ),
                              !1
                            );
                          this._activeObject.varData.addVariable(
                            _,
                            E,
                            t.pos(o, 5)
                          );
                        } else {
                          if (this._currentType !== P.Template)
                            return (
                              k.VE_ErrorManager.add(
                                k.VE_Error.error(
                                  t.pos(o, 5),
                                  "局部变量：" +
                                    t.getData(o, 5) +
                                    "，当前局部变量所属未知，格式错误，请检查！",
                                  t.ID
                                )
                              ),
                              !1
                            );
                          if (this._activeTemplate.varData.isCreatedVariable(_))
                            return (
                              k.VE_ErrorManager.add(
                                k.VE_Error.error(
                                  t.pos(o, 5),
                                  "模板对象名：" +
                                    this._activeTemplate.templateID +
                                    "，局部变量：" +
                                    t.getData(o, 5) +
                                    "，当前局部变量名已创建，请检查！",
                                  t.ID
                                )
                              ),
                              !1
                            );
                          if (this._activeTemplate.dataSource.isCreatedFsm(_))
                            return (
                              k.VE_ErrorManager.add(
                                k.VE_Error.error(
                                  t.pos(o, 5),
                                  "模板对象名：" +
                                    t.getData(o, 5) +
                                    "，当前局部变量所属未知，格式错误，请检查！",
                                  t.ID
                                )
                              ),
                              !1
                            );
                          this._activeTemplate.varData.addVariable(
                            _,
                            E,
                            t.pos(o, 5)
                          );
                        }
                      }
                    } else {
                      if (
                        2 !== (V = N.VE_StringFormat.paraSegment(f)).length &&
                        3 !== V.length
                      )
                        return (
                          k.VE_ErrorManager.add(
                            k.VE_Error.error(
                              t.pos(o, 5),
                              "局部变量：" +
                                t.getData(o, 5) +
                                "，当前局部变量格式不正确，请检查！",
                              t.ID
                            )
                          ),
                          !1
                        );
                      _ = V[0].trim();
                      if (!N.VE_StringFormat.isIDLegal(_))
                        return (
                          k.VE_ErrorManager.add(
                            k.VE_Error.error(
                              t.pos(o, 5),
                              "变量：" +
                                t.getData(o, 5) +
                                "，当前变量名不合法，包含非法字符，请检查！",
                              t.ID
                            )
                          ),
                          !1
                        );
                      g = [V[1].trim()];
                      if (
                        (2 === V.length ? (g[1] = "") : (g[1] = V[2].trim()),
                        this._currentType === P.Object)
                      ) {
                        if (this._activeObject.varData.isCreatedVariable(_))
                          return (
                            k.VE_ErrorManager.add(
                              k.VE_Error.error(
                                t.pos(o, 5),
                                "对象名：" +
                                  this._activeObject.objectID +
                                  "，局部变量：" +
                                  t.getData(o, 5) +
                                  "，当前局部变量名已创建，请检查！",
                                t.ID
                              )
                            ),
                            !1
                          );
                        if (this._activeObject.dataSource.isCreatedFsm(_))
                          return (
                            k.VE_ErrorManager.add(
                              k.VE_Error.error(
                                t.pos(o, 5),
                                "对象名：" +
                                  this._activeObject.objectID +
                                  "，局部变量：" +
                                  t.getData(o, 5) +
                                  "，局部变量名不能与状态名相同，当前状态已创建，请检查！",
                                t.ID
                              )
                            ),
                            !1
                          );
                        this._activeObject.varData.addVariable(
                          _,
                          g,
                          t.pos(o, 5)
                        );
                      } else {
                        if (this._currentType !== P.Template)
                          return (
                            k.VE_ErrorManager.add(
                              k.VE_Error.error(
                                t.pos(o, 5),
                                "局部变量：" +
                                  t.getData(o, 5) +
                                  "，当前局部变量所属未知，格式错误，请检查！",
                                t.ID
                              )
                            ),
                            !1
                          );
                        if (this._activeTemplate.varData.isCreatedVariable(_))
                          return (
                            k.VE_ErrorManager.add(
                              k.VE_Error.error(
                                t.pos(o, 5),
                                "模板对象名：" +
                                  this._activeTemplate.templateID +
                                  "，局部变量：" +
                                  t.getData(o, 5) +
                                  "，当前局部变量名已创建，请检查！",
                                t.ID
                              )
                            ),
                            !1
                          );
                        if (this._activeTemplate.dataSource.isCreatedFsm(_))
                          return (
                            k.VE_ErrorManager.add(
                              k.VE_Error.error(
                                t.pos(o, 5),
                                "模板对象名：" +
                                  this._activeTemplate.templateID +
                                  "，局部变量：" +
                                  t.getData(o, 5) +
                                  "，局部变量名不能与状态名相同，当前状态已创建，请检查！",
                                t.ID
                              )
                            ),
                            !1
                          );
                        this._activeTemplate.varData.addVariable(
                          _,
                          g,
                          t.pos(o, 5)
                        );
                      }
                    }
                  } else {
                    if ("" !== t.getData(o, 5))
                      if (-1 < (f = t.getData(o, 5)).indexOf("=")) {
                        var b = f.split("="),
                          v = b[0].trim();
                        if (2 !== b.length || v !== this._lastFsmID)
                          return (
                            k.VE_ErrorManager.add(
                              k.VE_Error.error(
                                t.pos(o, 5),
                                "状态赋值：" +
                                  t.getData(o, 5) +
                                  "，状态名：" +
                                  v +
                                  "，当前状态未定义，请检查！",
                                t.ID
                              )
                            ),
                            !1
                          );
                        if (null === this._activeFsmData)
                          return (
                            k.VE_ErrorManager.add(
                              k.VE_Error.error(
                                t.pos(o, 5),
                                "状态赋值：" +
                                  t.getData(o, 5) +
                                  "，当前状态不属于任何对象和模板对象，请检查！",
                                t.ID
                              )
                            ),
                            !1
                          );
                        (d = b[1].trim().split(/,|，/)),
                          (y = R.StateConst.STATE_INDEX),
                          (m = null);
                        if (2 === d.length) {
                          if (
                            ((d[0] = d[0].trim()),
                            (d[1] = d[1].trim()),
                            !d[1].startsWith("#"))
                          )
                            return (
                              k.VE_ErrorManager.add(
                                k.VE_Error.error(
                                  t.pos(o, 5),
                                  "状态赋值：" +
                                    t.getData(o, 5) +
                                    "，状态关联ID格式错误，状态关联标志ID写法：“状态ID=赋值，#整数ID”，请检查！",
                                  t.ID
                                )
                              ),
                              !1
                            );
                          if (NaN === (y = parseInt(d[1].substring(1))))
                            return (
                              k.VE_ErrorManager.add(
                                k.VE_Error.error(
                                  t.pos(o, 5),
                                  "状态赋值：" +
                                    t.getData(o, 5) +
                                    "，状态关联ID格式错误，状态关联标志ID写法：“状态ID=赋值，#整数ID”，当前整数转化错误！",
                                  t.ID
                                )
                              ),
                              !1
                            );
                        }
                        ((m = new M.VE_StateData(
                          this._activeFsmData,
                          d[0].trim(),
                          !1,
                          y
                        )).rowIndex = o),
                          this._activeFsmData.addState(m),
                          (this._activeStateData = m);
                      } else {
                        var V;
                        if (
                          2 !== (V = N.VE_StringFormat.paraSegment(f)).length &&
                          3 !== V.length &&
                          4 !== V.length
                        )
                          return (
                            k.VE_ErrorManager.add(
                              k.VE_Error.error(
                                t.pos(o, 5),
                                "状态：" +
                                  t.getData(o, 5) +
                                  "，当前状态格式不正确，应为“状态名，类型，初始值”的形式，请检查！",
                                t.ID
                              )
                            ),
                            !1
                          );
                        v = V[0].trim();
                        if (!N.VE_StringFormat.isIDLegal(v))
                          return (
                            k.VE_ErrorManager.add(
                              k.VE_Error.error(
                                t.pos(o, 5),
                                "状态名：" +
                                  t.getData(o, 5) +
                                  "，当前状态名不合法，包含非法字符，请检查！",
                                t.ID
                              )
                            ),
                            !1
                          );
                        this._lastFsmID = v;
                        g = [V[1].trim()];
                        2 === V.length ? (g[1] = "") : (g[1] = V[2].trim());
                        y = R.StateConst.STATE_INDEX;
                        if (4 === V.length) {
                          if (!V[3].startsWith("#"))
                            return (
                              k.VE_ErrorManager.add(
                                k.VE_Error.error(
                                  t.pos(o, 5),
                                  "状态赋值：" +
                                    V[3] +
                                    "，状态关联ID格式错误，状态关联标志ID写法：“状态ID，变量类型，变量值，#整数ID”，当前整数转化错误！",
                                  t.ID
                                )
                              ),
                              !1
                            );
                          if (NaN === (y = parseInt(V[3].substring(1))))
                            return (
                              k.VE_ErrorManager.add(
                                k.VE_Error.error(
                                  t.pos(o, 5),
                                  "状态赋值：" +
                                    V[3] +
                                    "，状态关联ID格式错误，状态关联标志ID写法：“状态ID，变量类型，变量值，#整数ID”，当前整数转化错误！",
                                  t.ID
                                )
                              ),
                              !1
                            );
                        }
                        if (this._currentType === P.Object) {
                          if (this._activeObject.varData.isCreatedVariable(v))
                            return (
                              k.VE_ErrorManager.add(
                                k.VE_Error.error(
                                  t.pos(o, 5),
                                  "对象名：" +
                                    this._activeObject.objectID +
                                    "，状态名：" +
                                    v +
                                    "，状态名与局部变量名不能相同，当前局部变量已创建，请检查！",
                                  t.ID
                                )
                              ),
                              !1
                            );
                          if (this._activeObject.dataSource.isCreatedFsm(v))
                            return (
                              k.VE_ErrorManager.add(
                                k.VE_Error.error(
                                  t.pos(o, 5),
                                  "对象名：" +
                                    this._activeObject.objectID +
                                    "，状态名：" +
                                    v +
                                    "，当前状态已创建，请检查！",
                                  t.ID
                                )
                              ),
                              !1
                            );
                          if (
                            (this._activeObject.dataSource.createFsm(
                              v,
                              t.pos(o, 5)
                            ),
                            (this._activeFsmData = this._activeObject.dataSource.getFsmData(
                              v
                            )),
                            !L.VeryVarManager.hasVarType(g[0]))
                          )
                            return (
                              k.VE_ErrorManager.add(
                                k.VE_Error.error(
                                  t.pos(o, 5),
                                  "对象名：" +
                                    this._activeObject.objectID +
                                    "，状态名：" +
                                    v +
                                    "，类型：" +
                                    g[0] +
                                    "，状态类型错误，当前状态变量类型在系统中不存在，请检查！",
                                  t.ID
                                )
                              ),
                              !1
                            );
                          this._activeFsmData.initFsm(g[0], g[1]),
                            ((m = new M.VE_StateData(
                              this._activeFsmData,
                              g[1],
                              !0,
                              y
                            )).rowIndex = o),
                            this._activeFsmData.addState(m),
                            (this._activeStateData = m);
                        } else {
                          if (this._currentType !== P.Template)
                            return (
                              k.VE_ErrorManager.add(
                                k.VE_Error.error(
                                  t.pos(o, 5),
                                  "局部变量：" +
                                    t.getData(o, 5) +
                                    "，当前局部变量所属未知，格式错误，请检查！",
                                  t.ID
                                )
                              ),
                              !1
                            );
                          if (this._activeTemplate.varData.isCreatedVariable(v))
                            return (
                              k.VE_ErrorManager.add(
                                k.VE_Error.error(
                                  t.pos(o, 5),
                                  "模板对象名：" +
                                    this._activeTemplate.templateID +
                                    "，状态名：" +
                                    v +
                                    "，状态名与局部变量名不能相同，当前局部变量已创建，请检查！",
                                  t.ID
                                )
                              ),
                              !1
                            );
                          if (this._activeTemplate.dataSource.isCreatedFsm(v))
                            return (
                              k.VE_ErrorManager.add(
                                k.VE_Error.error(
                                  t.pos(o, 5),
                                  "模板对象名：" +
                                    this._activeTemplate.templateID +
                                    "，状态名：" +
                                    v +
                                    "，当前状态已创建，请检查！",
                                  t.ID
                                )
                              ),
                              !1
                            );
                          if (
                            (this._activeTemplate.dataSource.createFsm(
                              v,
                              t.pos(o, 5)
                            ),
                            (this._activeFsmData = this._activeTemplate.dataSource.getFsmData(
                              v
                            )),
                            !L.VeryVarManager.hasVarType(g[0]))
                          )
                            return (
                              k.VE_ErrorManager.add(
                                k.VE_Error.error(
                                  t.pos(o, 5),
                                  "模板对象名：" +
                                    this._activeTemplate.objectID +
                                    "，状态名：" +
                                    v +
                                    "，类型：" +
                                    g[0] +
                                    "，状态类型错误，当前状态变量类型在系统中不存在，请检查！",
                                  t.ID
                                )
                              ),
                              !1
                            );
                          this._activeFsmData.initFsm(g[0], g[1]),
                            ((m = new M.VE_StateData(
                              this._activeFsmData,
                              g[1],
                              !0,
                              y
                            )).rowIndex = o),
                            this._activeFsmData.addState(m),
                            (this._activeStateData = m);
                        }
                      }
                    if ("" !== t.getData(o, 2)) {
                      if (
                        null === this._activeFsmData ||
                        null === this._activeStateData
                      )
                        return (
                          k.VE_ErrorManager.add(
                            k.VE_Error.error(
                              t.pos(o, 2),
                              "触发：" +
                                t.getData(o, 2) +
                                "，当前触发不属于任何对象和模板对象，请检查！",
                              t.ID
                            )
                          ),
                          !1
                        );
                      var T = t.getData(o, 2);
                      if (!N.VE_StringFormat.isIDLegal(T))
                        return (
                          k.VE_ErrorManager.add(
                            k.VE_Error.error(
                              t.pos(o, 2),
                              "触发名：" +
                                t.getData(o, 2) +
                                "，当前触发名不合法，包含非法字符，请检查！",
                              t.ID
                            )
                          ),
                          !1
                        );
                      if ("" !== t.getData(o, 3)) {
                        if (this._activeFsmData.dataSource.isCreatedTrigger(T))
                          return (
                            k.VE_ErrorManager.add(
                              k.VE_Error.error(
                                t.pos(o, 2),
                                "触发：" +
                                  t.getData(o, 2) +
                                  "，当前触发已在该对象中定义，请勿重复定义，请检查！",
                                t.ID
                              )
                            ),
                            !1
                          );
                        this._activeFsmData.dataSource.addTrigger(
                          T,
                          N.VE_StringFormat.paraSegment(t.getData(o, 3)),
                          t.pos(o, 2)
                        );
                      }
                      var S = new M.VE_StateTriggerData(T);
                      this._activeStateData.addTrigger(S, t.pos(o, 2)),
                        "" !== t.getData(o, 1) &&
                          (S.logicalSwitch = t.getData(o, 1)),
                        "" !== t.getData(o, 4) &&
                          (S.logicalExp = t.getData(o, 4));
                    } else {
                      if ("" !== t.getData(o, 1))
                        return (
                          k.VE_ErrorManager.add(
                            k.VE_Error.error(
                              t.pos(o, 1),
                              "触发启动条件：" +
                                t.getData(o, 1) +
                                "，当前无触发，请勿定义触发启动条件，请检查！",
                              t.ID
                            )
                          ),
                          !1
                        );
                      if ("" !== t.getData(o, 4)) {
                        if (
                          null === this._activeFsmData ||
                          null === this._activeStateData
                        )
                          return (
                            k.VE_ErrorManager.add(
                              k.VE_Error.error(
                                t.pos(o, 4),
                                "状态逻辑条件：" +
                                  t.getData(o, 4) +
                                  "，当前状态逻辑条件不属于任何对象和模板对象，请检查！",
                                t.ID
                              )
                            ),
                            !1
                          );
                        if ("" !== this._activeStateData.logicalExp)
                          return (
                            k.VE_ErrorManager.add(
                              k.VE_Error.error(
                                t.pos(o, 4),
                                "状态逻辑条件：" +
                                  t.getData(o, 4) +
                                  "，在状态的某个值中，无触发的状态逻辑条件只能填写1个，作为关联状态的逻辑条件，此处为第2个，不符合规则，请检查！",
                                t.ID
                              )
                            ),
                            !1
                          );
                        this._activeStateData.logicalExp = t.getData(o, 4);
                      }
                      "" !== t.getData(o, 3) &&
                        k.VE_ErrorManager.add(
                          k.VE_Error.warning(
                            t.pos(o, 3),
                            "触发参数：" +
                              t.getData(o, 3) +
                              "，该处无触发定义，但是填写了触发参数，请检查！",
                            t.ID
                          )
                        );
                    }
                    if ("" !== t.getData(o, 6)) {
                      if (
                        null === this._activeFsmData ||
                        null === this._activeStateData
                      )
                        return (
                          k.VE_ErrorManager.add(
                            k.VE_Error.error(
                              t.pos(o, 6),
                              "响应：" +
                                t.getData(o, 6) +
                                "，当前响应不属于任何对象和模板对象，请检查！",
                              t.ID
                            )
                          ),
                          !1
                        );
                      var D = t.getData(o, 6).toLowerCase();
                      if (
                        D.startsWith("log(") ||
                        D.startsWith("log（") ||
                        D.startsWith("调试（") ||
                        D.startsWith("调试(")
                      ) {
                        var x = e + "___" + R.StateConst.LogCount++,
                          O = new M.VE_StateActionData(x, "true", "false");
                        this._activeStateData.addAction(O, t.pos(o, 6));
                        var C = t.getData(o, 6).substring(4);
                        D.startsWith("调试") &&
                          (C = t.getData(o, 6).substring(3)),
                          this._activeFsmData.dataSource.addAction(
                            x,
                            ["调试", "调试", C.substring(0, C.length - 1)],
                            ["false", "false"],
                            t.pos(o, 6)
                          ),
                          "" !== t.getData(o, 7) &&
                            k.VE_ErrorManager.add(
                              k.VE_Error.warning(
                                t.pos(o, 7),
                                "响应参数：" +
                                  t.getData(o, 7) +
                                  "，该处不应该再有响应定义，但是填写了响应参数，请检查！",
                                t.ID
                              )
                            );
                      } else if (
                        D.startsWith("error(") ||
                        D.startsWith("error（") ||
                        D.startsWith("错误（") ||
                        D.startsWith("错误(")
                      ) {
                        (x = e + "___" + R.StateConst.LogCount++),
                          (O = new M.VE_StateActionData(x, "true", "false"));
                        this._activeStateData.addAction(O, t.pos(o, 6));
                        C = t.getData(o, 6).substring(6);
                        D.startsWith("错误") &&
                          (C = t.getData(o, 6).substring(3)),
                          this._activeFsmData.dataSource.addAction(
                            x,
                            ["调试", "错误", C.substring(0, C.length - 1)],
                            ["false", "false"],
                            t.pos(o, 6)
                          ),
                          "" !== t.getData(o, 7) &&
                            k.VE_ErrorManager.add(
                              k.VE_Error.warning(
                                t.pos(o, 7),
                                "响应参数：" +
                                  t.getData(o, 7) +
                                  "，该处不应该再有响应定义，但是填写了响应参数，请检查！",
                                t.ID
                              )
                            );
                      } else if (
                        D.startsWith("warn(") ||
                        D.startsWith("warn（") ||
                        D.startsWith("警告（") ||
                        D.startsWith("警告(")
                      ) {
                        (x = e + "___" + R.StateConst.LogCount++),
                          (O = new M.VE_StateActionData(x, "true", "false"));
                        this._activeStateData.addAction(O, t.pos(o, 6));
                        C = t.getData(o, 6).substring(5);
                        D.startsWith("警告") &&
                          (C = t.getData(o, 6).substring(3)),
                          this._activeFsmData.dataSource.addAction(
                            x,
                            ["调试", "警告", C.substring(0, C.length - 1)],
                            ["false", "false"],
                            t.pos(o, 6)
                          ),
                          "" !== t.getData(o, 7) &&
                            k.VE_ErrorManager.add(
                              k.VE_Error.warning(
                                t.pos(o, 7),
                                "响应参数：" +
                                  t.getData(o, 7) +
                                  "，该处不应该再有响应定义，但是填写了响应参数，请检查！",
                                t.ID
                              )
                            );
                      } else if (-1 < t.getData(o, 6).indexOf("=")) {
                        "" !== t.getData(o, 7) &&
                          k.VE_ErrorManager.add(
                            k.VE_Error.warning(
                              t.pos(o, 7),
                              "响应参数：" +
                                t.getData(o, 7) +
                                "，该处不应该再有响应定义，但是填写了响应参数，请检查！",
                              t.ID
                            )
                          );
                        var I = t.getData(o, 6).indexOf("=");
                        (O = new M.VE_StateActionData("")).setAssignmentAction(
                          t.getData(o, 6),
                          t
                            .getData(o, 6)
                            .substring(0, I)
                            .trim(),
                          t
                            .getData(o, 6)
                            .substring(I + 1)
                            .trim()
                        ),
                          this._activeStateData.addAction(O, t.pos(o, 6));
                      } else {
                        var j = N.VE_StringFormat.paraSegment(t.getData(o, 6));
                        if (2 !== j.length && 3 !== j.length && 4 !== j.length)
                          return (
                            k.VE_ErrorManager.add(
                              k.VE_Error.error(
                                t.pos(o, 6),
                                "响应：" +
                                  t.getData(o, 6) +
                                  "，响应格式不正确，应为“响应ID，启动标志（bool），每帧运行标志（bool）”的形式，请检查！",
                                t.ID
                              )
                            ),
                            !1
                          );
                        O = void 0;
                        if (
                          ((O =
                            2 === j.length
                              ? new M.VE_StateActionData(j[0], j[1])
                              : 3 === j.length
                              ? new M.VE_StateActionData(j[0], j[1], j[2])
                              : new M.VE_StateActionData(
                                  j[0],
                                  j[1],
                                  j[2],
                                  j[3]
                                )),
                          this._activeStateData.addAction(O, t.pos(o, 6)),
                          "" !== t.getData(o, 7))
                        ) {
                          if (!N.VE_StringFormat.isIDLegal(j[0]))
                            return (
                              k.VE_ErrorManager.add(
                                k.VE_Error.error(
                                  t.pos(o, 6),
                                  "响应名：" +
                                    t.getData(o, 6) +
                                    "，当前响应名不合法，包含非法字符，请检查！",
                                  t.ID
                                )
                              ),
                              !1
                            );
                          if (
                            this._activeFsmData.dataSource.isCreatedAction(j[0])
                          )
                            return (
                              k.VE_ErrorManager.add(
                                k.VE_Error.error(
                                  t.pos(o, 6),
                                  "响应：" +
                                    t.getData(o, 6) +
                                    "，当前响应已在该对象中定义，请勿重复定义，请检查！",
                                  t.ID
                                )
                              ),
                              !1
                            );
                          2 == j.length
                            ? this._activeFsmData.dataSource.addAction(
                                j[0],
                                N.VE_StringFormat.paraSegment(t.getData(o, 7)),
                                [j[1], "false"],
                                t.pos(o, 6)
                              )
                            : this._activeFsmData.dataSource.addAction(
                                j[0],
                                N.VE_StringFormat.paraSegment(t.getData(o, 7)),
                                [j[1], j[2]],
                                t.pos(o, 6)
                              );
                        }
                      }
                    } else
                      "" !== t.getData(o, 7) &&
                        k.VE_ErrorManager.add(
                          k.VE_Error.warning(
                            t.pos(o, 7),
                            "响应参数：" +
                              t.getData(o, 7) +
                              "，该处无响应定义，但是填写了响应参数，请检查！",
                            t.ID
                          )
                        );
                    if ("" !== t.getData(o, 8)) {
                      if (
                        null === this._activeFsmData ||
                        null === this._activeStateData
                      )
                        return (
                          k.VE_ErrorManager.add(
                            k.VE_Error.error(
                              t.pos(o, 8),
                              "关联状态：" +
                                t.getData(o, 8) +
                                "，当前关联状态不属于任何对象和模板对象，请检查！",
                              t.ID
                            )
                          ),
                          !1
                        );
                      this._activeStateData.addAssociatedState(
                        t.getData(o, 8),
                        t.pos(o, 8)
                      );
                    }
                  }
                return B.CreateInstance.createProject(e);
              }
              return (
                k.VE_ErrorManager.add(
                  k.VE_Error.error("", "表格内容不存在，引擎无法启动！", "null")
                ),
                !1
              );
            }),
            e
          );
        })();
        r.LoaderManager = n;
      },
      {
        "../dataSource": 11,
        "../global": 37,
        "../manager": 49,
        "../object": 53,
        "../state": 60,
        "../template": 64,
        "../utility": 73,
        "../variables": 77,
        "./createInstance": 46
      }
    ],
    49: [
      function(e, t, r) {
        "use strict";
        function i(e) {
          for (var t in e) r.hasOwnProperty(t) || (r[t] = e[t]);
        }
        Object.defineProperty(r, "__esModule", { value: !0 }),
          i(e("./projects")),
          i(e("./manager")),
          i(e("./reset"));
      },
      { "./manager": 50, "./projects": 51, "./reset": 52 }
    ],
    50: [
      function(e, t, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", { value: !0 });
        var i = e("./projects"),
          n = e("../object"),
          o = e("../template"),
          a = e("../variables"),
          s = (function() {
            function t() {}
            return (
              Object.defineProperty(t, "projects", {
                get: function() {
                  return (
                    null === this._projects &&
                      (this._projects = new i.VE_Projects()),
                    this._projects
                  );
                },
                enumerable: !0,
                configurable: !0
              }),
              (t.createProject = function(e) {
                t.projects.isCreatedObjects(e) ||
                  t.projects.addObjects(e, new n.VE_Objects(e)),
                  t.projects.isCreatedTemplates(e) ||
                    t.projects.addTemplates(e, new o.VE_Templates(e)),
                  t.projects.isCreatedVariables(e) ||
                    t.projects.addVariables(e, new a.VE_Variables(e));
              }),
              (t.globalVarData = function(e) {
                return (
                  t.projects.isCreatedGlobals(e) ||
                    t.projects.addVariables(e, new a.VE_Variables(e)),
                  t.projects.getGlobalVars(e)
                );
              }),
              (t.templates = function(e) {
                return (
                  t.projects.isCreatedTemplates(e) ||
                    t.projects.addTemplates(e, new o.VE_Templates(e)),
                  t.projects.getTemplates(e)
                );
              }),
              (t.variables = function(e) {
                return (
                  t.projects.isCreatedVariables(e) ||
                    t.projects.addVariables(e, new a.VE_Variables(e)),
                  t.projects.getVariables(e)
                );
              }),
              (t.objects = function(e) {
                return (
                  t.projects.isCreatedObjects(e) ||
                    t.projects.addObjects(e, new n.VE_Objects(e)),
                  t.projects.getObjects(e)
                );
              }),
              (t.clear = function() {
                this._projects = null;
              }),
              (t.clearProject = function(e) {
                t.clearProject(e);
              }),
              (t._projects = null),
              t
            );
          })();
        r.VE_Manager = s;
      },
      {
        "../object": 53,
        "../template": 64,
        "../variables": 77,
        "./projects": 51
      }
    ],
    51: [
      function(e, t, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", { value: !0 });
        var i = (function() {
          function e() {
            (this._objects = {}),
              (this._variables = {}),
              (this._templates = {}),
              (this.projects = []);
          }
          return (
            (e.prototype.isCreatedObjects = function(e) {
              return !!this._objects[e];
            }),
            (e.prototype.addObjects = function(e, t) {
              this._objects[e] = t;
            }),
            (e.prototype.getObjects = function(e) {
              return this._objects[e];
            }),
            (e.prototype.isCreatedVariables = function(e) {
              return !!this._variables[e];
            }),
            (e.prototype.addVariables = function(e, t) {
              this._variables[e] = t;
            }),
            (e.prototype.getVariables = function(e) {
              return this._variables[e];
            }),
            (e.prototype.isCreatedTemplates = function(e) {
              return !!this._templates[e];
            }),
            (e.prototype.addTemplates = function(e, t) {
              this._templates[e] = t;
            }),
            (e.prototype.getTemplates = function(e) {
              return this._templates[e];
            }),
            (e.prototype.isCreatedGlobals = function(e) {
              return !!this._variables[e];
            }),
            (e.prototype.getGlobalVars = function(e) {
              return this._variables[e].varData;
            }),
            (e.prototype.clear = function() {
              (this._objects = {}),
                (this._templates = {}),
                (this._variables = {});
            }),
            (e.prototype.clearPorject = function(e) {
              delete this._objects[e],
                delete this._templates[e],
                delete this._variables[e];
            }),
            (e.prototype.sleep = function() {}),
            e
          );
        })();
        r.VE_Projects = i;
      },
      {}
    ],
    52: [
      function(e, t, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", { value: !0 });
        var i = function() {};
        r.VE_Reset = i;
      },
      {}
    ],
    53: [
      function(e, t, r) {
        "use strict";
        function i(e) {
          for (var t in e) r.hasOwnProperty(t) || (r[t] = e[t]);
        }
        Object.defineProperty(r, "__esModule", { value: !0 }),
          i(e("./veryengineObject")),
          i(e("./objects"));
      },
      { "./objects": 54, "./veryengineObject": 55 }
    ],
    54: [
      function(e, t, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", { value: !0 });
        var i = e("../utility"),
          n = (function() {
            function e(e) {
              (this._projectName = ""),
                (this._objectIDs = []),
                (this._objectDics = {}),
                (this._projectName = e);
            }
            return (
              Object.defineProperty(e.prototype, "projectName", {
                get: function() {
                  return this._projectName;
                },
                enumerable: !0,
                configurable: !0
              }),
              Object.defineProperty(e.prototype, "count", {
                get: function() {
                  return this._objectIDs.length;
                },
                enumerable: !0,
                configurable: !0
              }),
              (e.prototype.isCreated = function(e) {
                return !!this._objectDics[e];
              }),
              (e.prototype.add = function(e, t) {
                this.isCreated(e) ||
                  (this._objectIDs.push(e), (this._objectDics[e] = t));
              }),
              (e.prototype.getObjectID = function(e) {
                return 0 <= e && e < this._objectIDs.length
                  ? this._objectIDs[e]
                  : "";
              }),
              (e.prototype.getVeryObject = function(e) {
                return this._objectDics[e];
              }),
              (e.prototype.unloadObject = function(e) {
                i.ArrayUtility.remove(this._objectIDs, e),
                  delete this._objectDics.object_id;
              }),
              (e.prototype.clear = function() {
                for (var e = 0; e < this._objectIDs.length; e++) {
                  var t = this._objectDics[this._objectIDs[e]];
                  t && t.clear();
                }
                (this._objectIDs = []), (this._objectDics = {});
              }),
              e
            );
          })();
        r.VE_Objects = n;
      },
      { "../utility": 73 }
    ],
    55: [
      function(e, t, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", { value: !0 });
        var i = e("../variables"),
          n = e("../dataSource"),
          o = (function() {
            function e(e, t, r) {
              (this._projectName = ""),
                (this._objectID = ""),
                (this.gameObject = new i.GameObject("")),
                (this._variables = {}),
                (this._expressions = {}),
                (this._actions = {}),
                (this._triggers = {}),
                (this._fsms = {}),
                (this._templates = {}),
                (this._projectName = projectName),
                (this._objectID = t),
                (this.gameObject = r),
                (this.dataSource = new n.VE_DataSource(e, t, !1)),
                (this.varData = new n.VE_VariableData(e));
            }
            return (
              Object.defineProperty(e.prototype, "projectName", {
                get: function() {
                  return this._projectName;
                },
                enumerable: !0,
                configurable: !0
              }),
              Object.defineProperty(e.prototype, "objectID", {
                get: function() {
                  return this._objectID;
                },
                enumerable: !0,
                configurable: !0
              }),
              (e.prototype.isCreatedFsm = function(e) {
                return !!this._fsms[e];
              }),
              (e.prototype.addFsm = function(e, t) {
                this._fsms[e] = t;
              }),
              (e.prototype.getFsm = function(e) {
                return this._fsms[e];
              }),
              (e.prototype.isCreatedTrigger = function(e) {
                return !!this._triggers[e];
              }),
              (e.prototype.addTrigger = function(e, t) {
                this._triggers[e] = t;
              }),
              (e.prototype.getTrigger = function(e) {
                return this._triggers[e];
              }),
              (e.prototype.isCreatedAction = function(e) {
                return !!this._actions[e];
              }),
              (e.prototype.addAction = function(e, t) {
                this._actions[e] = t;
              }),
              (e.prototype.getAction = function(e) {
                return this._actions[e];
              }),
              (e.prototype.isCreatedVariable = function(e) {
                return !!this._variables[e];
              }),
              (e.prototype.addVariable = function(e, t) {
                this._variables[e] = t;
              }),
              (e.prototype.getVariable = function(e) {
                return this._variables[e];
              }),
              (e.prototype.isCreatedExpression = function(e) {
                return !this._expressions[e];
              }),
              (e.prototype.addExpression = function(e, t) {
                this._expressions[e] = t;
              }),
              (e.prototype.getExpression = function(e) {
                return this._expressions[e];
              }),
              (e.prototype.isCreatedTemplate = function(e) {
                return !!this._templates[e];
              }),
              (e.prototype.addTemplate = function(e, t) {
                this._templates[e] = t;
              }),
              (e.prototype.getTemplate = function(e) {
                return this._templates[e];
              }),
              (e.prototype.isCreatedVar = function(e) {
                return !!(
                  this._variables[e] ||
                  this._expressions[e] ||
                  this._templates[e]
                );
              }),
              (e.prototype.unload = function() {}),
              (e.prototype.clear = function() {
                var t = this;
                this.dataSource && this.dataSource.clear(),
                  this.varData && this.varData.clear(),
                  (this._variables = {}),
                  (this._expressions = {}),
                  this._templates &&
                    (Object.keys(this._templates).forEach(function(e) {
                      t._templates[e].clear();
                    }),
                    (this._templates = {})),
                  (this._fsms = {}),
                  this._actions &&
                    (Object.keys(this._actions).forEach(function(e) {
                      t._actions[e].destroy();
                    }),
                    (this._actions = {})),
                  this._triggers &&
                    (Object.keys(this._triggers).forEach(function(e) {
                      t._triggers[e].destroy();
                    }),
                    (this._triggers = {}));
              }),
              e
            );
          })();
        r.VeryEngineObject = o;
      },
      { "../dataSource": 11, "../variables": 77 }
    ],
    56: [
      function(e, t, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", { value: !0 }),
          (function(e) {
            for (var t in e) r.hasOwnProperty(t) || (r[t] = e[t]);
          })(e("./verySceneVariables"));
      },
      { "./verySceneVariables": 57 }
    ],
    57: [
      function(e, t, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", { value: !0 });
        var i = e("../variables"),
          n = (function() {
            function e() {}
            return (
              Object.defineProperty(e, "Variables", {
                get: function() {
                  return (
                    null === e._variables &&
                      (e._variables = new i.VE_Variables("__scene_varibale__")),
                    e._variables
                  );
                },
                enumerable: !0,
                configurable: !0
              }),
              Object.defineProperty(e, "HasLoaded", {
                get: function() {
                  return this._hasLoaded;
                },
                enumerable: !0,
                configurable: !0
              }),
              (e.initIfNeeded = function() {
                this._hasLoaded || console.log("TODO: 场景变量下载");
              }),
              (e._variables = null),
              (e._hasLoaded = !1),
              e
            );
          })();
        r.VerySceneVariables = n;
      },
      { "../variables": 77 }
    ],
    58: [
      function(e, t, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", { value: !0 });
        var n = e("../enum"),
          i = (function() {
            function e(e) {
              (this._types = []),
                (this._indexs = []),
                (this._numberIndex = {}),
                (this._states = {}),
                (this._templates = {}),
                (this._templateIDs = {}),
                (this._fromState = e);
            }
            return (
              Object.defineProperty(e.prototype, "FromState", {
                get: function() {
                  return this._fromState;
                },
                enumerable: !0,
                configurable: !0
              }),
              (e.prototype.add = function(e, t) {
                this._types.push(n.AssociatedFsmType.Object);
                var r = this._types.length;
                this._indexs.push(r),
                  (this._numberIndex[r] = t),
                  (this._states[r] = e);
              }),
              (e.prototype.addTemplate = function(e, t, r) {
                this._types.push(n.AssociatedFsmType.Object);
                var i = this._types.length;
                this._indexs.push(i),
                  (this._numberIndex[i] = r),
                  (this._templates[i] = e),
                  (this._templateIDs[i] = t);
              }),
              (e.prototype.connect = function() {}),
              e
            );
          })();
        r.VE_AssociatedState = i;
      },
      { "../enum": 17 }
    ],
    59: [
      function(e, t, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", { value: !0 });
        var o = e("../utility/dictionary"),
          i = e("../global"),
          n = e("./stateConst"),
          a = (function() {
            function e(e, t, r, i, n) {
              (this._projectName = ""),
                (this._id = ""),
                (this._objectID = ""),
                (this._fsmID = ""),
                (this._stateDics = new o.Dictionary()),
                (this._states = []),
                (this._frameCount = -1),
                (this._triggerIDs = []),
                (this._projectName = e),
                (this._objectID = t),
                (this._fsmID = r),
                (this._fsmVar = i),
                (this._veryObject = n);
            }
            return (
              Object.defineProperty(e.prototype, "projectName", {
                get: function() {
                  return this._projectName;
                },
                enumerable: !0,
                configurable: !0
              }),
              Object.defineProperty(e.prototype, "ID", {
                get: function() {
                  return this._id;
                },
                enumerable: !0,
                configurable: !0
              }),
              Object.defineProperty(e.prototype, "objectID", {
                get: function() {
                  return this._objectID;
                },
                enumerable: !0,
                configurable: !0
              }),
              Object.defineProperty(e.prototype, "fsmID", {
                get: function() {
                  return this._fsmID;
                },
                enumerable: !0,
                configurable: !0
              }),
              Object.defineProperty(e.prototype, "fsmVar", {
                get: function() {
                  return this._fsmVar;
                },
                enumerable: !0,
                configurable: !0
              }),
              Object.defineProperty(e.prototype, "VeryObject", {
                get: function() {
                  return this._veryObject;
                },
                enumerable: !0,
                configurable: !0
              }),
              Object.defineProperty(e.prototype, "count", {
                get: function() {
                  return this._states.length;
                },
                enumerable: !0,
                configurable: !0
              }),
              (e.prototype.isCreatedState = function(e) {
                return this._stateDics.ContainsKey(e);
              }),
              (e.prototype.addState = function(e, t) {
                this._stateDics.ContainsKey(t) ||
                  (this._stateDics.Add(t, e), this._states.push(e));
              }),
              (e.prototype.getState = function(e) {
                return this._stateDics.GetValue(e);
              }),
              (e.prototype.removeState = function(e) {
                return (
                  !!this.isCreatedState(e) && (this._stateDics.Remove(e), !0)
                );
              }),
              (e.prototype.receiveEvent = function(e) {
                return i.Time.frameCount != this._frameCount
                  ? ((this._frameCount = i.Time.frameCount),
                    (this._triggerIDs = []),
                    this._triggerIDs.push(e),
                    !0)
                  : !!e.startsWith(n.StateConst.ASSOCIATED_STATE_PREFIX) ||
                      (-1 === this._triggerIDs.indexOf(e) &&
                        (this._triggerIDs.push(e), !0));
              }),
              e
            );
          })();
        r.VE_Fsm = a;
      },
      { "../global": 37, "../utility/dictionary": 71, "./stateConst": 63 }
    ],
    60: [
      function(e, t, r) {
        "use strict";
        function i(e) {
          for (var t in e) r.hasOwnProperty(t) || (r[t] = e[t]);
        }
        Object.defineProperty(r, "__esModule", { value: !0 }),
          i(e("./state")),
          i(e("./fsm")),
          i(e("./stateAction")),
          i(e("./associatedState")),
          i(e("./stateConst"));
      },
      {
        "./associatedState": 58,
        "./fsm": 59,
        "./state": 61,
        "./stateAction": 62,
        "./stateConst": 63
      }
    ],
    61: [
      function(e, t, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", { value: !0 });
        var i = e("./stateAction"),
          n = e("../enum"),
          o = (function() {
            function e(e, t) {
              (this._isInitialValue = !1),
                (this._value = ""),
                (this._assignmentType = n.AssignmentType.Const),
                (this._isTemplateVar = !1),
                (this._template = null),
                (this._varID = ""),
                (this._templateVar = null),
                (this._assignmentStr = ""),
                (this._logicalExpression = null),
                (this._index = 0),
                (this._stateVariable = null),
                (this.logicalAssociated = null),
                (this._stateActions = []),
                (this._assocaitedStates = []),
                (this._isSequence = !1),
                (this.sequenceActions = null),
                (this._fsm = e),
                (this._index = t);
            }
            return (
              Object.defineProperty(e.prototype, "Fsm", {
                get: function() {
                  return this._fsm;
                },
                enumerable: !0,
                configurable: !0
              }),
              Object.defineProperty(e.prototype, "isInitialValue", {
                get: function() {
                  return this._isInitialValue;
                },
                enumerable: !0,
                configurable: !0
              }),
              Object.defineProperty(e.prototype, "Value", {
                get: function() {
                  return this._value;
                },
                enumerable: !0,
                configurable: !0
              }),
              Object.defineProperty(e.prototype, "isTemplateVar", {
                get: function() {
                  return this._isTemplateVar;
                },
                enumerable: !0,
                configurable: !0
              }),
              Object.defineProperty(e.prototype, "logicalExpression", {
                get: function() {
                  return this._logicalExpression;
                },
                enumerable: !0,
                configurable: !0
              }),
              Object.defineProperty(e.prototype, "index", {
                get: function() {
                  return this._index;
                },
                enumerable: !0,
                configurable: !0
              }),
              Object.defineProperty(e.prototype, "stateVariable", {
                get: function() {
                  return this._stateVariable;
                },
                enumerable: !0,
                configurable: !0
              }),
              Object.defineProperty(e.prototype, "IsSequence", {
                get: function() {
                  return this._isSequence;
                },
                enumerable: !0,
                configurable: !0
              }),
              (e.prototype.setInitialValue = function(e) {
                (this._value = e),
                  (this._assignmentType = n.AssignmentType.Const);
              }),
              (e.prototype.setSequence = function() {
                this._isSequence = !0;
              }),
              (e.prototype.setLogicalExpression = function(e) {
                this._logicalExpression = e;
              }),
              (e.prototype.setTemplateInfo = function(e, t, r) {
                (this._isTemplateVar = !0),
                  (this._template = e),
                  (this._varID = t),
                  (this._assignmentStr = r);
              }),
              (e.prototype.setConstValue = function(e) {
                (this._value = e),
                  (this._assignmentType = n.AssignmentType.Const);
              }),
              (e.prototype.setStateVariable = function(e) {
                (this._stateVariable = e),
                  (this._assignmentType = n.AssignmentType.Variable);
              }),
              (e.prototype.addAction = function(e) {
                this._stateActions.push(e),
                  e.type === n.StateActionType.Action &&
                    e.action.isSequence &&
                    (this._isSequence = !0);
              }),
              (e.prototype.addAssignment = function(e) {
                var t = new i.VE_StateAction();
                t.setAssignment(e), this._stateActions.push(t);
              }),
              (e.prototype.addAssociatedState = function(e) {
                this._assocaitedStates.push(e);
              }),
              (e.prototype.action = function(e) {
                this._fsm.receiveEvent(e);
              }),
              e
            );
          })();
        r.VE_State = o;
      },
      { "../enum": 17, "./stateAction": 62 }
    ],
    62: [
      function(e, t, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", { value: !0 });
        var i = e("../enum"),
          n = (function() {
            function e() {
              (this._type = i.StateActionType.Action),
                (this._action = null),
                (this._enabled = !1),
                (this._everyFrame = !1),
                (this._assignment = null);
            }
            return (
              Object.defineProperty(e.prototype, "type", {
                get: function() {
                  return this._type;
                },
                enumerable: !0,
                configurable: !0
              }),
              Object.defineProperty(e.prototype, "action", {
                get: function() {
                  return this._action;
                },
                enumerable: !0,
                configurable: !0
              }),
              Object.defineProperty(e.prototype, "enabled", {
                get: function() {
                  return this._enabled;
                },
                enumerable: !0,
                configurable: !0
              }),
              Object.defineProperty(e.prototype, "everyFrame", {
                get: function() {
                  return this._everyFrame;
                },
                enumerable: !0,
                configurable: !0
              }),
              Object.defineProperty(e.prototype, "assignment", {
                get: function() {
                  return this._assignment;
                },
                enumerable: !0,
                configurable: !0
              }),
              (e.prototype.setAction = function(e, t, r, i) {
                void 0 === t && (t = !1),
                  void 0 === r && (r = !1),
                  void 0 === i && (i = !1),
                  (this._action = e),
                  (this._enabled = t),
                  (this._everyFrame = r),
                  (this._action.isSequence = i);
              }),
              (e.prototype.setAssignment = function(e) {
                this._assignment = e;
              }),
              e
            );
          })();
        r.VE_StateAction = n;
      },
      { "../enum": 17 }
    ],
    63: [
      function(e, t, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", { value: !0 });
        var i = (function() {
          function e() {}
          return (
            (e.STATE_SEPARATOR = "."),
            (e.ASSOCIATED_STATE_PREFIX = "Associated_State:"),
            (e.VARIABLE_SYMBOL = "*"),
            (e.STATE_INDEX = -1),
            (e.LogCount = -1),
            (e.AssignmentPrefix = "AssignmentFormula_"),
            (e.AssignmentFormulaCount = 0),
            e
          );
        })();
        r.StateConst = i;
      },
      {}
    ],
    64: [
      function(e, t, r) {
        "use strict";
        function i(e) {
          for (var t in e) r.hasOwnProperty(t) || (r[t] = e[t]);
        }
        Object.defineProperty(r, "__esModule", { value: !0 }),
          i(e("./template")),
          i(e("./templates"));
      },
      { "./template": 65, "./templates": 66 }
    ],
    65: [
      function(e, t, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", { value: !0 });
        var n = e("../dataSource"),
          i = (function() {
            function i(e, t) {
              (this._projectName = ""),
                (this._templateID = ""),
                (this._templateVarID = ""),
                (this._objectID = ""),
                (this.templateInstance = null),
                (this._instanceCount = 0),
                (this._projectName = e),
                (this._templateID = t),
                (this.dataSource = new n.VE_DataSource(e, t, !0)),
                (this.varData = new n.VE_VariableData(e));
            }
            return (
              Object.defineProperty(i.prototype, "projectName", {
                get: function() {
                  return this._projectName;
                },
                enumerable: !0,
                configurable: !0
              }),
              Object.defineProperty(i.prototype, "templateID", {
                get: function() {
                  return this._templateID;
                },
                enumerable: !0,
                configurable: !0
              }),
              Object.defineProperty(i.prototype, "templateVarID", {
                get: function() {
                  return this._templateVarID;
                },
                enumerable: !0,
                configurable: !0
              }),
              Object.defineProperty(i.prototype, "objectID", {
                get: function() {
                  return this._objectID;
                },
                enumerable: !0,
                configurable: !0
              }),
              (i.prototype.instanceCount = function() {
                return this._instanceCount;
              }),
              (i.prototype.setInstance = function(e) {
                this.templateInstance = e;
              }),
              (i.prototype.isCreatedVariable = function(e) {
                return this.varData.isCreatedVariable(e);
              }),
              (i.prototype.addVariable = function(e, t, r) {
                this.varData.addVariable(e, t, r);
              }),
              (i.prototype.unload = function() {}),
              (i.prototype.clone = function(e, t) {
                var r = new i(this._projectName, this._templateID);
                return (
                  (r._objectID = e),
                  (r._templateVarID = t),
                  (r.dataSource = this.dataSource),
                  (r.varData = this.varData),
                  (r._instanceCount = this._instanceCount),
                  r
                );
              }),
              (i.prototype.clear = function() {
                this.dataSource && this.dataSource.clear(),
                  this.varData && this.varData.clear(),
                  this.templateInstance && this.templateInstance.clear();
              }),
              i
            );
          })();
        r.VE_Template = i;
      },
      { "../dataSource": 11 }
    ],
    66: [
      function(e, t, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", { value: !0 });
        var a = e("./template"),
          i = (function() {
            function e(e) {
              (this._projectName = ""),
                (this._templateDic = {}),
                (this._instanceDic = {}),
                (this._projectName = e);
            }
            return (
              Object.defineProperty(e.prototype, "projectName", {
                get: function() {
                  return this._projectName;
                },
                enumerable: !0,
                configurable: !0
              }),
              (e.prototype.isCreatedTemplate = function(e) {
                return !!this._templateDic[e];
              }),
              (e.prototype.addTemplate = function(e, t) {
                this._templateDic[e] = t;
              }),
              (e.prototype.getTemplate = function(e) {
                return this._templateDic[e];
              }),
              (e.prototype.isCreatedInstance = function(e, t) {
                return !(!this._instanceDic[e] || !this._instanceDic[e][t]);
              }),
              (e.prototype.getInstance = function(e, t) {
                return this._instanceDic[e][t];
              }),
              (e.prototype.clear = function() {
                var t = this;
                this._templateDic &&
                  (Object.keys(this._templateDic).forEach(function(e) {
                    t._templateDic[e].clear();
                  }),
                  (this._templateDic = {}));
              }),
              (e.prototype.createInstance = function(e, t, r, i, n, o) {
                return new a.VE_Template(this._projectName, t);
              }),
              e
            );
          })();
        r.VE_Templates = i;
      },
      { "./template": 65 }
    ],
    67: [
      function(e, t, r) {
        "use strict";
        function i(e) {
          for (var t in e) r.hasOwnProperty(t) || (r[t] = e[t]);
        }
        Object.defineProperty(r, "__esModule", { value: !0 }),
          i(e("./triggerBehaviour")),
          i(e("./triggers"));
      },
      { "./triggerBehaviour": 68, "./triggers": 69 }
    ],
    68: [
      function(e, t, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", { value: !0 });
        var i = e("../state/stateConst"),
          n = (function() {
            function e() {
              (this._enabled = !0),
                (this._projectName = ""),
                (this._logicalSwitch = []),
                (this._logicalExp = []),
                (this._triggerTargets = []),
                (this._objectID = "object-axxx"),
                (this._triggerID = ""),
                (this._id = "");
            }
            return (
              Object.defineProperty(e.prototype, "enabled", {
                get: function() {
                  return this._enabled;
                },
                set: function(e) {
                  this._enabled = e;
                },
                enumerable: !0,
                configurable: !0
              }),
              Object.defineProperty(e.prototype, "projectName", {
                get: function() {
                  return this._projectName;
                },
                enumerable: !0,
                configurable: !0
              }),
              Object.defineProperty(e.prototype, "isEnabled", {
                get: function() {
                  if (this._logicalSwitch)
                    for (var e = 0; e < this._logicalSwitch.length; e++)
                      if (!this._logicalSwitch[e].evaluate()) return !1;
                  return !0;
                },
                enumerable: !0,
                configurable: !0
              }),
              Object.defineProperty(e.prototype, "objectID", {
                get: function() {
                  return this._objectID;
                },
                enumerable: !0,
                configurable: !0
              }),
              Object.defineProperty(e.prototype, "triggerID", {
                get: function() {
                  return this._triggerID;
                },
                enumerable: !0,
                configurable: !0
              }),
              (e.prototype.call = function() {
                console.log(this._objectID);
              }),
              (e.prototype.set = function(e) {
                this.scene = e;
              }),
              (e.prototype.setTriggerID = function(e, t) {
                (this._triggerID = e),
                  (this._objectID = t),
                  (this._id = t + i.StateConst.STATE_SEPARATOR + e);
              }),
              (e.prototype.addLogicalSwitch = function(e) {
                this._logicalSwitch.push(e);
              }),
              (e.prototype.addTriggerTarget = function(e, t) {
                this._logicalExp.push(e), this._triggerTargets.push(t);
              }),
              (e.prototype.sendEvent = function() {
                this.isEnabled && this.eventProcess();
              }),
              (e.prototype.eventProcess = function() {
                if (this._triggerTargets)
                  for (var e = 0; e < this._triggerTargets.length; e++)
                    this._logicalExp[e].evaluate() &&
                      this._triggerTargets[e].action(this._id);
              }),
              (e.prototype.paraParser = function(e) {
                return !0;
              }),
              (e.prototype.update = function() {
                this.isEnabled && this.onUpdate();
              }),
              (e.prototype.onUpdate = function() {}),
              e
            );
          })();
        r.VE_TriggerBehaviour = n;
      },
      { "../state/stateConst": 63 }
    ],
    69: [
      function(e, t, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", { value: !0 });
        var n = e("../html"),
          s = e("../state"),
          u = e("../manager"),
          i = (function() {
            function e() {}
            return (
              (e.addTrigger = function(e) {
                for (var t = e.ID.split("|"), r = 0; r < t.length; r++) {
                  var i = t[r].trim().toLowerCase();
                  this._triggerDics[i]
                    ? n.ShowError.showError(
                        "触发初始化错误，触发ID重复，当前触发ID：" +
                          i +
                          "，请为当前触发重新分配触发ID！"
                      )
                    : (this._triggerDics[i] = e);
                }
              }),
              (e.hasTrigger = function(e) {
                return (e = e.toLowerCase()), !!this._triggerDics[e];
              }),
              (e.createTrigger = function(e) {
                return (
                  (e = e.toLowerCase()), Object.create(this._triggerDics[e])
                );
              }),
              (e.remove = function(e) {
                (e = e.toLowerCase()), delete this._triggerDics[e];
              }),
              (e.findTrigger = function(e, t) {
                if (e.isCreatedTrigger(t)) return e.getTrigger(t);
                var r = t.split(s.StateConst.STATE_SEPARATOR);
                if (2 !== r.length) return null;
                var i = u.VE_Manager.objects(e.projectName),
                  n = r[0].trim(),
                  o = r[1].trim();
                if (i.isCreated(n)) {
                  var a = i.getVeryObject(n);
                  return a.isCreatedTrigger(o) ? a.getTrigger(o) : null;
                }
                return null;
              }),
              (e._triggerDics = {}),
              e
            );
          })();
        r.VE_Triggers = i;
      },
      { "../html": 39, "../manager": 49, "../state": 60 }
    ],
    70: [
      function(e, t, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", { value: !0 });
        var i = (function() {
          function e() {}
          return (
            (e.remove = function(e, t) {
              var r = e.indexOf(t);
              -1 < r && e.splice(r, 1);
            }),
            (e.clear = function(e) {
              [];
            }),
            e
          );
        })();
        r.ArrayUtility = i;
      },
      {}
    ],
    71: [
      function(e, t, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", { value: !0 });
        var i = (function() {
          function e() {
            (this._keys = []), (this._values = []);
          }
          return (
            Object.defineProperty(e.prototype, "count", {
              get: function() {
                return this.Count();
              },
              enumerable: !0,
              configurable: !0
            }),
            (e.prototype.Add = function(e, t) {
              return this._keys.push(e), this._values.push(t);
            }),
            (e.prototype.Remove = function(e) {
              var t = this._keys.indexOf(e, 0);
              this._keys.splice(t, 1), this._values.splice(t, 1);
            }),
            (e.prototype.Count = function() {
              return this._keys.length;
            }),
            (e.prototype.SetValue = function(e, t) {
              var r = this._keys.indexOf(e, 0);
              return (
                -1 != r && ((this._keys[r] = e), (this._values[r] = t), !0)
              );
            }),
            (e.prototype.GetValue = function(e) {
              var t = this._keys.indexOf(e, 0);
              return -1 != t ? this._values[t] : null;
            }),
            (e.prototype.ContainsKey = function(e) {
              for (var t = this._keys, r = 0; r < t.length; ++r)
                if (t[r] == e) return !0;
              return !1;
            }),
            (e.prototype.GetKeys = function() {
              return this._keys;
            }),
            (e.prototype.GetValues = function() {
              return this._values;
            }),
            e
          );
        })();
        r.Dictionary = i;
      },
      {}
    ],
    72: [
      function(e, t, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", { value: !0 });
        var i = (function() {
          function e() {
            (this.isRight = !0), (this.message = "");
          }
          return (
            (e.prototype.clear = function() {
              (this.isRight = !0), (this.message = "");
            }),
            e
          );
        })();
        r.ErrorInfo = i;
      },
      {}
    ],
    73: [
      function(e, t, r) {
        "use strict";
        function i(e) {
          for (var t in e) r.hasOwnProperty(t) || (r[t] = e[t]);
        }
        Object.defineProperty(r, "__esModule", { value: !0 }),
          i(e("./arrayUtility")),
          i(e("./dictionary")),
          i(e("./errorInfo")),
          i(e("./stringFormat"));
      },
      {
        "./arrayUtility": 70,
        "./dictionary": 71,
        "./errorInfo": 72,
        "./stringFormat": 74
      }
    ],
    74: [
      function(e, t, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", { value: !0 });
        var i = (function() {
          function e() {}
          return (
            (e.init = function() {
              (this._escapeCharacters.n = "\n"),
                (this._escapeCharacters.b = "\b"),
                (this._escapeCharacters.r = "\r"),
                (this._escapeCharacters.t = "\t"),
                (this._escapeCharacters.v = "\v"),
                (this._escapeCharacters.f = "\f"),
                (this._escapeCharacters[0] = "\0"),
                (this._illegalChar["="] = !0),
                (this._illegalChar[","] = !0),
                (this._illegalChar["，"] = !0),
                (this._illegalChar[":"] = !0),
                (this._illegalChar["："] = !0),
                (this._illegalChar["*"] = !0),
                (this._illegalChar["("] = !0),
                (this._illegalChar["（"] = !0),
                (this._illegalChar[")"] = !0),
                (this._illegalChar["）"] = !0),
                (this._illegalChar["@"] = !0),
                (this._illegalChar["#"] = !0),
                (this._illegalChar.$ = !0),
                (this._illegalChar["%"] = !0),
                (this._illegalChar["&"] = !0),
                (this._illegalChar["^"] = !0),
                (this._illegalChar["-"] = !0),
                (this._illegalChar["+"] = !0),
                (this._illegalChar["|"] = !0),
                (this._illegalChar["/"] = !0),
                (this._illegalChar["["] = !0),
                (this._illegalChar["【"] = !0),
                (this._illegalChar["]"] = !0),
                (this._illegalChar["】"] = !0),
                (this._illegalChar["{"] = !0),
                (this._illegalChar["}"] = !0),
                (this._illegalChar["."] = !0),
                (this._illegalChar["。"] = !0),
                (this._illegalChar["<"] = !0),
                (this._illegalChar[">"] = !0),
                (this._illegalChar[";"] = !0),
                (this._illegalChar["；"] = !0),
                (this._illegalChar["?"] = !0),
                (this._illegalChar['"'] = !0),
                (this._illegalChar["“"] = !0),
                (this._illegalChar["”"] = !0),
                (this._illegalChar["'"] = !0),
                (this._illegalChar["‘"] = !0),
                (this._illegalChar["’"] = !0),
                (this._illegalChar["!"] = !0),
                (this._illegalChar["！"] = !0),
                (this._illegalChar["`"] = !0),
                (this._illegalChar["·"] = !0),
                (this._illegalChar["~"] = !0),
                (this._formulaChar["("] = !0),
                (this._formulaChar[")"] = !0),
                (this._formulaChar["（"] = !0),
                (this._formulaChar["）"] = !0),
                (this._formulaChar["!"] = !0),
                (this._formulaChar["！"] = !0),
                (this._formulaChar["^"] = !0),
                (this._formulaChar["%"] = !0),
                (this._formulaChar["&"] = !0),
                (this._formulaChar["-"] = !0),
                (this._formulaChar["+"] = !0),
                (this._formulaChar["="] = !0),
                (this._formulaChar["<"] = !0),
                (this._formulaChar[">"] = !0),
                (this._formulaChar["|"] = !0);
            }),
            (e.strEscapeCharacterAction = function(e) {
              for (var t = "", r = 0; r < e.length; r++)
                "\\" == e[r] && r != e.length - 1
                  ? ((t += this.getEscapeCharacter(e[r + 1])), r++)
                  : (t += e[r]);
              return t;
            }),
            (e.strSubsectionAction = function(e) {
              for (
                var t = "", r = [], i = !1, n = !1, o = 0;
                o < e.length;
                o++
              ) {
                if ("\\" == e[o]) {
                  if (o < e.length - 1) {
                    (t += e[o + 1]), o++;
                    continue;
                  }
                  t += e[o];
                  break;
                }
                if (n || ('"' !== e[o] && "“" !== e[o]))
                  if (!n || ('"' !== e[o] && "”" !== e[o]))
                    if ("," === e[o] || "，" === e[o])
                      i ? (t += e[o]) : ("" !== t && r.push(t), (t = ""));
                    else {
                      if (" " === e[o]) continue;
                      t += e[o];
                    }
                  else (n = i = !1), "" !== (t += '"') && r.push(t), (t = "");
                else (i = n = !0), (t += '"');
              }
              return "" !== t && r.push(t), r;
            }),
            (e.getEscapeCharacter = function(e) {
              return this._escapeCharacters[e] ? this._escapeCharacters[e] : e;
            }),
            (e.getEscapeCharacter2 = function(e, t) {
              return this._escapeCharacters[e]
                ? ((t[0] = !0), this._escapeCharacters[e])
                : ((t[0] = !1), e);
            }),
            (e.strSubsection = function(e) {
              for (
                var t = "", r = [], i = !1, n = !1, o = 0;
                o < e.length;
                o++
              ) {
                if ("\\" == e[o]) {
                  if (o < e.length - 1) {
                    (t += this.getEscapeCharacter(e[o + 1])), o++;
                    continue;
                  }
                  t += e[o];
                  break;
                }
                if (
                  "(" === e[o] ||
                  "（" === e[o] ||
                  '"' === e[o] ||
                  "“" === e[o]
                )
                  n = !(i = !0);
                else if (
                  ")" === e[o] ||
                  "）" === e[o] ||
                  '"' === e[o] ||
                  "”" === e[o]
                )
                  (i = !1), "" !== t && r.push(t), (t = ""), (n = !1);
                else if ("," === e[o] || "，" === e[o])
                  i ? (t += e[o]) : ("" !== t && r.push(t), (t = "")), (n = !1);
                else {
                  if (" " === e[o] && !n) continue;
                  (t += e[o]), (n = !0);
                }
              }
              return "" !== t && r.push(t), r;
            }),
            (e.getParaArrayAll = function(e, t) {
              for (var r = t.slice(), i = 0; i < r.length; i++)
                if (r[i].startsWith("$"))
                  if (-1 < r[i].indexOf(",") || r[i].indexOf("，")) {
                    var n = r[i].split(/,|，/);
                    n = this.getParaArrayAll(e, n);
                    for (var o = "", a = 0; a < n.length; a++)
                      a === n.length - 1
                        ? (o += n[a])
                        : ((o += n[a]), (o += ","));
                    r[i] = o;
                  } else console.log("变量名：" + r[i] + "，该变量未被创建！");
                else if (r[i].startsWith("%"))
                  if (-1 < r[i].indexOf(",") || -1 < r[i].indexOf("，")) {
                    n = r[i].split(/,|，/);
                    n = this.getParaArrayAll(e, n);
                    for (o = "", a = 0; a < n.length; a++)
                      a == n.length - 1
                        ? (o += n[a])
                        : ((o += n[a]), (o += ","));
                    r[i] = o;
                  } else
                    console.log(
                      "变量名：" + r[i] + "，该BlurVar变量未被创建！"
                    );
                else if (-1 < r[i].indexOf(",") || -1 < r[i].indexOf("，")) {
                  n = r[i].split(/,|，/);
                  n = this.getParaArrayAll(e, n);
                  for (o = "", a = 0; a < n.length; a++)
                    a == n.length - 1 ? (o += n[a]) : ((o += n[a]), (o += ","));
                  r[i] = o;
                }
              return r;
            }),
            (e.paraSegment = function(e) {
              for (
                var t = "", r = [], i = !1, n = 0, o = !1, a = !1, s = 0;
                s < e.length;
                s++
              ) {
                if ("\\" == e[s]) {
                  if (s < e.length - 1) {
                    var u = [!0],
                      p = this.getEscapeCharacter2(e[s + 1], u);
                    u[0] ? (s++, (t += p)) : (t += e[++s]);
                    continue;
                  }
                  t += e[s];
                  break;
                }
                "(" === e[s] || "（" === e[s]
                  ? a
                    ? (t += e[s])
                    : (i
                        ? (n++, (t += e[s]))
                        : "" !== t.trim()
                        ? ((t += e[s]), (o = !0))
                        : s < e.length - 1 &&
                          this.needSaveBracket(e.substring(s + 1)) &&
                          ((t += e[s]), (o = !0)),
                      (i = !0))
                  : ")" === e[s] || "）" === e[s]
                  ? a
                    ? (t += e[s])
                    : 0 < n
                    ? (n--, (i = !0), (t += e[s]))
                    : (i = !(!i || !o) && ((t += e[s]), (o = !1)))
                  : '"' === e[s]
                  ? ((t += e[s]), (a = !a))
                  : "," === e[s] || "，" === e[s]
                  ? a
                    ? (t += e[s])
                    : i
                    ? (t += e[s])
                    : ("" !== t && r.push(t.trim()), (t = ""))
                  : (t += e[s]);
              }
              return "" !== t && r.push(t.trim()), r;
            }),
            (e.needSaveBracket = function(e) {
              for (var t = !1, r = 0, i = 0; i < e.length; i++) {
                if (t) {
                  if (" " === e[i]) continue;
                  return "," !== e[i] && "，" !== e[i];
                }
                "(" === e[i] || "（" === e[i]
                  ? r++
                  : (")" !== e[i] && "）" !== e[i]) || (0 < r ? r-- : (t = !0));
              }
              return !1;
            }),
            (e.isIDLegal = function(e) {
              for (var t = 0; t < e.length; t++)
                if (this._illegalChar[e[t]]) return !1;
              return !0;
            }),
            (e.isFormulaString = function(e) {
              for (var t = 0; t < e.length; t++)
                if (this._formulaChar[e[t]]) return !0;
              return !1;
            }),
            (e._illegalChar = {}),
            (e._formulaChar = {}),
            (e._escapeCharacters = {}),
            e
          );
        })();
        (r.VE_StringFormat = i).init();
      },
      {}
    ],
    75: [
      function(e, t, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", { value: !0 });
        var i = (function() {
          function e() {}
          return (
            (e.boolConvert = function(e, t) {
              return (
                "true" === (e = e.toLowerCase().trim()) ||
                "开" === e ||
                ("false" === e ||
                  "关" === e ||
                  ((t.isRight = !1),
                  (t.message =
                    "bool|开关类型转换错误，格式不正确，原始字符串：" + e)),
                !1)
              );
            }),
            (e.intConvert = function(e, t) {
              e = e.toLowerCase().trim();
              var r = parseFloat(e);
              return isNaN(r)
                ? ((t.isRight = !1),
                  (t.message =
                    "number|数字类型转化错误，格式不正确，原始字符串：" + e),
                  -1)
                : Math.round(r);
            }),
            (e.floatConvert = function(e, t) {
              e = e.toLowerCase().trim();
              var r = parseFloat(e);
              return isNaN(r)
                ? ((t.isRight = !1),
                  (t.message =
                    "number|数字类型转化错误，格式不正确，原始字符串：" + e),
                  -1)
                : r;
            }),
            e
          );
        })();
        r.VE_TypeConvert = i;
      },
      {}
    ],
    76: [
      function(e, t, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", { value: !0 });
        var i = (function() {
          function t(e) {
            (this._transform = new n()), (this.mesh = null), (this.name = e);
          }
          return (
            Object.defineProperty(t.prototype, "gameObject", {
              get: function() {
                return this;
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(t.prototype, "transform", {
              get: function() {
                return this._transform;
              },
              enumerable: !0,
              configurable: !0
            }),
            (t.find = function(e) {
              return new t(e);
            }),
            t
          );
        })();
        r.GameObject = i;
        var n = (function() {
          function e() {
            (this._transformNode = null),
              (this._mesh = null),
              (this.localPosition = BABYLON.Vector3.Zero()),
              (this.position = BABYLON.Vector3.Zero()),
              (this.localEulerAngles = BABYLON.Vector3.Zero()),
              (this.eulerAngles = BABYLON.Vector3.Zero()),
              (this.forward = BABYLON.Vector3.Forward()),
              (this.localScale = new BABYLON.Vector3(1, 1, 1));
          }
          return (
            Object.defineProperty(e.prototype, "childCount", {
              get: function() {
                return 0;
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(e.prototype, "hierarchyCount", {
              get: function() {
                return 0;
              },
              enumerable: !0,
              configurable: !0
            }),
            e
          );
        })();
        r.Transform = n;
      },
      {}
    ],
    77: [
      function(e, t, r) {
        "use strict";
        function i(e) {
          for (var t in e) r.hasOwnProperty(t) || (r[t] = e[t]);
        }
        Object.defineProperty(r, "__esModule", { value: !0 }),
          i(e("./veryVarManager")),
          i(e("./veryVariables")),
          i(e("./babylonVariables")),
          i(e("./variables"));
      },
      {
        "./babylonVariables": 76,
        "./variables": 78,
        "./veryVarManager": 79,
        "./veryVariables": 80
      }
    ],
    78: [
      function(e, t, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", { value: !0 });
        var i = e("../dataSource"),
          n = (function() {
            function e(e) {
              (this._projectName = ""),
                (this._veryVars = {}),
                (this._tempalteVars = {}),
                (this._expressions = {}),
                (this._projectName = e),
                (this.varData = new i.VE_VariableData(e));
            }
            return (
              Object.defineProperty(e.prototype, "projectName", {
                get: function() {
                  return this._projectName;
                },
                enumerable: !0,
                configurable: !0
              }),
              (e.prototype.isCreated = function(e) {
                return !!(
                  this._veryVars[e] ||
                  this._tempalteVars[e] ||
                  this._expressions[e]
                );
              }),
              (e.prototype.isCreatedVariable = function(e) {
                return !!this._veryVars[e];
              }),
              (e.prototype.addVariable = function(e, t) {
                this._veryVars[e] = t;
              }),
              (e.prototype.getVariable = function(e) {
                return this._veryVars[e];
              }),
              (e.prototype.isCreatedTemplate = function(e) {
                return !!this._tempalteVars[e];
              }),
              (e.prototype.addTemplate = function(e, t) {
                this._tempalteVars[e] = t;
              }),
              (e.prototype.getTemplate = function(e) {
                return this._tempalteVars[e];
              }),
              (e.prototype.isCreatedExpression = function(e) {
                return !!this._expressions[e];
              }),
              (e.prototype.addExpression = function(e, t) {
                this._expressions[e] = t;
              }),
              (e.prototype.getExpression = function(e) {
                return this._expressions[e];
              }),
              (e.prototype.clear = function() {
                this.varData && this.varData.clear(),
                  (this._veryVars = {}),
                  (this._expressions = {}),
                  (this._tempalteVars = {});
              }),
              e
            );
          })();
        r.VE_Variables = n;
      },
      { "../dataSource": 11 }
    ],
    79: [
      function(e, t, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", { value: !0 });
        var i = e("../html/showError"),
          p = e("../manager"),
          c = e("./veryVariables"),
          n = (function() {
            function e() {}
            return (
              (e.hasVarType = function(e) {
                return (e = e.toLowerCase()), !!this._veryVarTypes[e];
              }),
              (e.addVarType = function(e, t) {
                (e = e.toLowerCase().trim()),
                  this._veryVarTypes[e]
                    ? i.ShowError.showError(
                        "VeryVar变量初始化错误，变量类型重复，当前变量名：" +
                          e +
                          "，当前变量类型：" +
                          t
                      )
                    : (this._veryVarTypes[e] = t);
              }),
              (e.createVar = function(e) {
                return (e = e.toLowerCase()), Object.create(this.getVarType(e));
              }),
              (e.createVariable = function(e, t, r, i) {
                var n;
                t = t.toLowerCase();
                try {
                  if (!(n = Object.create(this.getVarType(t))))
                    return (
                      (i.isRight = !1),
                      (i.message =
                        "变量创建错误：当前类型在平台中不存在，请检查！类型名：" +
                        t),
                      null
                    );
                  var o = n.initValue(r, i);
                  return i.isRight ? (n.setValue(o), n) : null;
                } catch (e) {
                  return (
                    console.log(e.message),
                    (i.isRight = !1),
                    (i.message =
                      "变量创建错误：当前类型在平台中不存在，请检查！类型名：" +
                      t +
                      "，错误原因：" +
                      e.message),
                    null
                  );
                }
              }),
              (e.getVarType = function(e) {
                return (
                  (e = e.toLowerCase()),
                  this._veryVarTypes && this._veryVarTypes[e]
                    ? this._veryVarTypes[e]
                    : null
                );
              }),
              (e.remove = function(e) {
                (e = e.toLowerCase()), delete this._veryVarTypes[e];
              }),
              (e.getVariable = function(e, t, r, i) {
                if ("" === t) return this.getSceneVariable(e, i);
                if ("" === r) return this.getGlobalVariable(e, t, i);
                var n = p.VE_Manager.objects(t);
                if (n) {
                  var o = n.getVeryObject(r);
                  return o
                    ? o.isCreatedVariable(e)
                      ? o.getVariable(e)
                      : o.isCreatedExpression(e)
                      ? new c.VeryExpression(o.getExpression(e))
                      : o.isCreatedFsm(e)
                      ? o.getFsm(e).fsmVar
                      : this.getGlobalVariable(e, t, i)
                    : this.getGlobalVariable(e, t, i);
                }
                return this.getGlobalVariable(e, t, i);
              }),
              (e.getTemplateVariable = function(e, t, r, i, n) {
                if ("" === r)
                  return (
                    (n.isRight = !1),
                    (n.message =
                      "无法在当前项目中查找到当前模板变量：" + e + "；\n"),
                    null
                  );
                if ("" !== i) {
                  var o = p.VE_Manager.objects(r);
                  if (o) {
                    if (o.isCreated(i)) {
                      var a = o.getVeryObject(i);
                      return a.isCreatedTemplate(e)
                        ? null === (s = a.getTemplate(e)).templateInstance
                          ? ((n.isRight = !1),
                            (n.message +=
                              "当前模板变量未实例化，请先实例化该模板对象，模板变量名：" +
                              e +
                              "；\n"),
                            null)
                          : s.templateInstance.isCreatedVariable(t)
                          ? s.templateInstance.getVariable(t)
                          : s.templateInstance.isCreatedExpression(t)
                          ? new c.VeryExpression(
                              s.templateInstance.getExpression(t)
                            )
                          : s.templateInstance.isCreatedFsm(t)
                          ? s.templateInstance.getFsm(t).fsmVar
                          : ((n.isRight = !1),
                            (n.message +=
                              "当前模板变量中无法查找到该变量，模板变量名：" +
                              e +
                              "，变量名：" +
                              t +
                              "；\n"),
                            null)
                        : ((n.isRight = !1),
                          (n.message +=
                            "无法在当前项目中查找到当前模板变量：" +
                            e +
                            "；\n"),
                          null);
                    }
                    return (
                      (n.isRight = !1),
                      (n.message +=
                        "无法在当前项目中查找到当前对象：" + i + "；\n"),
                      null
                    );
                  }
                  return (
                    (n.isRight = !1),
                    (n.message +=
                      "无法在当前项目中查找到当前对象：" + i + "；\n"),
                    null
                  );
                }
                var s,
                  u = p.VE_Manager.variables(r);
                return u && u.isCreatedTemplate(e)
                  ? null === (s = u.getTemplate(e)).templateInstance
                    ? ((n.isRight = !1),
                      (n.message +=
                        "当前模板变量未实例化，请先实例化该模板对象，模板变量名：" +
                        e +
                        "；\n"),
                      null)
                    : s.templateInstance.isCreatedVariable(t)
                    ? s.templateInstance.getVariable(t)
                    : s.templateInstance.isCreatedExpression(t)
                    ? new c.VeryExpression(s.templateInstance.getExpression(t))
                    : s.templateInstance.isCreatedFsm(t)
                    ? s.templateInstance.getFsm(t).fsmVar
                    : ((n.isRight = !1),
                      (n.message +=
                        "当前模板变量中无法查找到该变量，模板变量名：" +
                        e +
                        "，变量名：" +
                        t +
                        "；\n"),
                      null)
                  : ((n.isRight = !1),
                    (n.message +=
                      "无法在当前项目中查找到当前模板变量：" + e + "；\n"),
                    null);
              }),
              (e.getGlobalVariable = function(e, t, r) {
                if ("" === t) return this.getSceneVariable(e, r);
                var i = p.VE_Manager.variables(t);
                return i
                  ? i.isCreatedVariable(e)
                    ? i.getVariable(e)
                    : i.isCreatedExpression(e)
                    ? new c.VeryExpression(i.getExpression(e))
                    : this.getSceneVariable(e, r)
                  : this.getSceneVariable(e, r);
              }),
              (e.getSceneVariable = function(e, t) {
                return (
                  (t.isRight = !1), (t.message = "暂时不支持场景变量！"), null
                );
              }),
              (e._veryVarTypes = {}),
              e
            );
          })();
        r.VeryVarManager = n;
      },
      { "../html/showError": 40, "../manager": 49, "./veryVariables": 80 }
    ],
    80: [
      function(e, t, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", { value: !0 });
        var i = e("./veryVarManager"),
          n = e("../expression"),
          o = (function() {
            function t() {
              (this._value = !1), (this._value = !1);
            }
            return (
              Object.defineProperty(t.prototype, "varType", {
                get: function() {
                  return "bool|开关";
                },
                enumerable: !0,
                configurable: !0
              }),
              Object.defineProperty(t.prototype, "className", {
                get: function() {
                  return "VeryBool";
                },
                enumerable: !0,
                configurable: !0
              }),
              Object.defineProperty(t.prototype, "Value", {
                get: function() {
                  return this._value;
                },
                set: function(e) {
                  this._value = e;
                },
                enumerable: !0,
                configurable: !0
              }),
              (t.prototype.setValue = function(e) {
                this._value = e;
              }),
              (t.prototype.getValue = function() {
                return this._value;
              }),
              (t.prototype.initValue = function(e, t) {
                return (
                  "false" !== (e = e.trim()).toLowerCase() &&
                  "关" !== e &&
                  ("true" === e.toLowerCase() ||
                    "开" === e ||
                    ("" !== e &&
                      "null" !== e.toLowerCase() &&
                      "none" !== e.toLowerCase() &&
                      ((t.isRight = !1),
                      (t.message =
                        "类型: " +
                        this.varType +
                        "，值：" +
                        e +
                        "，该变量值和类型不匹配，转化错误，请检查！"),
                      null)))
                );
              }),
              (t.prototype.clone = function() {
                var e = new t();
                return e.setValue(this._value), e;
              }),
              t
            );
          })();
        r.VeryBool = o;
        var a = (function() {
          function t() {
            (this._value = 0), (this._value = 0);
          }
          return (
            Object.defineProperty(t.prototype, "varType", {
              get: function() {
                return "int|整数";
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(t.prototype, "className", {
              get: function() {
                return "VeryInt";
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(t.prototype, "Value", {
              get: function() {
                return Math.round(this._value);
              },
              set: function(e) {
                this._value = Math.round(e);
              },
              enumerable: !0,
              configurable: !0
            }),
            (t.prototype.getValue = function() {
              return this.Value;
            }),
            (t.prototype.setValue = function(e) {
              this.Value = e;
            }),
            (t.prototype.initValue = function(e, t) {
              var r = parseFloat(e);
              return isNaN(r)
                ? ((t.isRight = !1),
                  (t.message =
                    "类型: " +
                    this.varType +
                    "，值：" +
                    e +
                    "，该变量值和类型不匹配，转化错误，请检查！"),
                  null)
                : Math.round(r);
            }),
            (t.prototype.clone = function() {
              var e = new t();
              return e.setValue(this._value), e;
            }),
            t
          );
        })();
        r.VeryInt = a;
        var s = (function() {
          function t() {
            (this._value = 0), (this._value = 0);
          }
          return (
            Object.defineProperty(t.prototype, "varType", {
              get: function() {
                return "float|浮点数";
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(t.prototype, "className", {
              get: function() {
                return "VeryFloat";
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(t.prototype, "Value", {
              get: function() {
                return this._value;
              },
              set: function(e) {
                this._value = e;
              },
              enumerable: !0,
              configurable: !0
            }),
            (t.prototype.setValue = function(e) {
              this._value = e;
            }),
            (t.prototype.getValue = function() {
              return this._value;
            }),
            (t.prototype.initValue = function(e, t) {
              var r = parseFloat(e);
              return isNaN(r)
                ? ((t.isRight = !1),
                  (t.message =
                    "类型: " +
                    this.varType +
                    "，值：" +
                    e +
                    "，该变量值和类型不匹配，转化错误，请检查！"),
                  null)
                : r;
            }),
            (t.prototype.clone = function() {
              var e = new t();
              return e.setValue(this._value), e;
            }),
            t
          );
        })();
        r.VeryFloat = s;
        var u = (function() {
          function t() {
            (this._value = 0), (this._value = 0);
          }
          return (
            Object.defineProperty(t.prototype, "varType", {
              get: function() {
                return "number|数字";
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(t.prototype, "className", {
              get: function() {
                return "VeryNumber";
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(t.prototype, "Value", {
              get: function() {
                return this._value;
              },
              set: function(e) {
                this._value = e;
              },
              enumerable: !0,
              configurable: !0
            }),
            (t.prototype.setValue = function(e) {
              this._value = e;
            }),
            (t.prototype.getValue = function() {
              return this._value;
            }),
            (t.prototype.initValue = function(e, t) {
              var r = parseFloat(e);
              return isNaN(r)
                ? ((t.isRight = !1),
                  (t.message =
                    "类型: " +
                    this.varType +
                    "，值：" +
                    e +
                    "，该变量值和类型不匹配，转化错误，请检查！"),
                  null)
                : r;
            }),
            (t.prototype.clone = function() {
              var e = new t();
              return e.setValue(this._value), e;
            }),
            t
          );
        })();
        r.VeryNumber = u;
        var p = (function() {
          function t() {
            (this._value = ""), (this._value = "");
          }
          return (
            Object.defineProperty(t.prototype, "varType", {
              get: function() {
                return "string|字符串";
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(t.prototype, "className", {
              get: function() {
                return "VeryString";
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(t.prototype, "Value", {
              get: function() {
                return this._value;
              },
              set: function(e) {
                this._value = e;
              },
              enumerable: !0,
              configurable: !0
            }),
            (t.prototype.getValue = function() {
              return this._value;
            }),
            (t.prototype.setValue = function(e) {
              this._value = e;
            }),
            (t.prototype.initValue = function(e, t) {
              return e.startsWith("'") ||
                e.startsWith('"') ||
                e.startsWith("“") ||
                e.startsWith("‘")
                ? e.substring(1, e.length - 2)
                : e;
            }),
            (t.prototype.clone = function() {
              var e = new t();
              return e.setValue(this._value), e;
            }),
            t
          );
        })();
        r.VeryString = p;
        var c = (function() {
          function r() {
            (this._value = BABYLON.Vector3.Zero()),
              (this._value = BABYLON.Vector3.Zero());
          }
          return (
            Object.defineProperty(r.prototype, "varType", {
              get: function() {
                return "vector3|向量";
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(r.prototype, "className", {
              get: function() {
                return "VeryVector3";
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(r.prototype, "Value", {
              get: function() {
                return this._value;
              },
              set: function(e) {
                this._value = e;
              },
              enumerable: !0,
              configurable: !0
            }),
            (r.prototype.getValue = function() {
              return this._value;
            }),
            (r.prototype.setValue = function(e) {
              this._value = e;
            }),
            (r.prototype.initValue = function(e, t) {
              var r = BABYLON.Vector3.Zero();
              if ("none" === e || "null" === e || "" === e) return r;
              var i = e.split(/,|，/);
              if (3 !== i.length)
                return (
                  (t.isRight = !1),
                  (t.message =
                    "类型: " +
                    this.varType +
                    ", 值: " +
                    e +
                    "，Vector3|向量类型值格式错误，转化错误！"),
                  null
                );
              var n = parseFloat(i[0]),
                o = parseFloat(i[1]),
                a = parseFloat(i[2]);
              return isNaN(n) || isNaN(o) || isNaN(a)
                ? ((t.isRight = !1),
                  (t.message =
                    "类型: " +
                    this.varType +
                    ", 值: " +
                    e +
                    "，Vector3|向量类型值格式错误，转化错误！"),
                  null)
                : (r = new BABYLON.Vector3(n, o, a));
            }),
            (r.prototype.clone = function() {
              var e = new r(),
                t = new BABYLON.Vector3(
                  this._value.x,
                  this._value.y,
                  this._value.z
                );
              return e.setValue(t), e;
            }),
            r
          );
        })();
        r.VeryVector3 = c;
        var l = (function() {
          function e(e) {
            (this._value = n.ConstantExpression.Empty()), (this._value = e);
          }
          return (
            Object.defineProperty(e.prototype, "varType", {
              get: function() {
                return this._value.expType;
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(e.prototype, "className", {
              get: function() {
                return "VeryExpression";
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(e.prototype, "Value", {
              get: function() {
                return this._value;
              },
              set: function(e) {
                this._value = e;
              },
              enumerable: !0,
              configurable: !0
            }),
            (e.prototype.setValue = function(e) {
              this._value = e;
            }),
            (e.prototype.getValue = function() {
              return this._value;
            }),
            (e.prototype.initValue = function(e, t) {
              var r = parseFloat(e);
              return isNaN(r)
                ? ((t.isRight = !1),
                  (t.message =
                    "类型: " +
                    this.varType +
                    "，值：" +
                    e +
                    "，该变量值和类型不匹配，转化错误，请检查！"),
                  null)
                : r;
            }),
            (e.prototype.clone = function() {
              return new e(this._value);
            }),
            e
          );
        })();
        (r.VeryExpression = l),
          console.log("XXX"),
          i.VeryVarManager.addVarType("bool", new o());
      },
      { "../expression": 26, "./veryVarManager": 79 }
    ],
    81: [
      function(e, t, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", { value: !0 });
        var i = e("../verytable/index"),
          n = e("./html/showError");
        !(function(e) {
          for (var t in e) r.hasOwnProperty(t) || (r[t] = e[t]);
        })(e("./index"));
        var o = (function() {
          function e() {}
          return (
            (e.prototype.init = function(e, t) {
              new i.VeryTable(e, "VeRyEngine");
              console.log("开始");
            }),
            (e.prototype.showErrorTest = function(e) {
              n.ShowError.show(
                "大股东萨芬个是电饭锅三分隔收费的发大股东萨芬个是电饭锅三分隔收费的发大股东萨芬个是电饭锅三分隔收费的发大股东萨芬个是电饭锅三分隔收费的发大股东萨芬个是电饭锅三分隔收费的发大股东萨芬个是电饭锅三分隔收费的发，错误位置：" +
                  e.pos(7, 5)
              ),
                n.ShowError.showError(
                  "大股东萨芬个是电饭锅三分隔收费的发，错误位置：" + e.pos(7, 5)
                ),
                n.ShowError.showWarn(
                  "大股东萨芬个是电饭锅三分隔收费的发，错误位置：" + e.pos(7, 5)
                ),
                n.ShowError.show(
                  "大股东萨芬个是电饭锅三分隔收费的发，错误位置：" + e.pos(7, 5)
                ),
                n.ShowError.show(
                  "大股东萨芬个是电饭锅三分隔收费的发，错误位置：" + e.pos(7, 5)
                ),
                document
                  .getElementById("settingsButton")
                  .addEventListener("click", n.ShowError.close);
            }),
            e
          );
        })();
        r.VeryEngine = o;
      },
      { "../verytable/index": 82, "./html/showError": 40, "./index": 41 }
    ],
    82: [
      function(e, t, r) {
        "use strict";
        function i(e) {
          for (var t in e) r.hasOwnProperty(t) || (r[t] = e[t]);
        }
        Object.defineProperty(r, "__esModule", { value: !0 }),
          i(e("./veryTableRow")),
          i(e("./veryTable")),
          i(e("./veryTableSet"));
      },
      { "./veryTable": 83, "./veryTableRow": 84, "./veryTableSet": 85 }
    ],
    83: [
      function(e, t, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", { value: !0 });
        var n = e("./veryTableRow"),
          i = (function() {
            function e(e, t) {
              if (
                (void 0 === t && (t = "默认Sheet"),
                (this._id = ""),
                (this._columnIDs = [
                  "A",
                  "B",
                  "C",
                  "D",
                  "E",
                  "F",
                  "G",
                  "H",
                  "I",
                  "J",
                  "K",
                  "L",
                  "M",
                  "N",
                  "O",
                  "P",
                  "Q",
                  "R",
                  "S",
                  "T",
                  "U",
                  "V",
                  "W",
                  "X",
                  "Y",
                  "Z"
                ]),
                (this._rows = []),
                (this._id = t),
                (this._rows = []),
                e)
              )
                for (var r = 0; r < e.length; r++) {
                  var i = new n.VeryTableRow(e[r]);
                  this._rows.push(i);
                }
            }
            return (
              Object.defineProperty(e.prototype, "ID", {
                get: function() {
                  return this._id;
                },
                set: function(e) {
                  this._id = e;
                },
                enumerable: !0,
                configurable: !0
              }),
              Object.defineProperty(e.prototype, "RowCount", {
                get: function() {
                  return this._rows ? this._rows.length : 0;
                },
                enumerable: !0,
                configurable: !0
              }),
              (e.prototype.getData = function(e, t) {
                return this._rows[e].getData(t);
              }),
              (e.prototype.getRow = function(e) {
                return 0 <= e && e < this._rows.length ? this._rows[e] : void 0;
              }),
              (e.prototype.pos = function(e, t) {
                return (
                  "（" +
                  (e + 1) +
                  "，" +
                  this.getColumnID(t) +
                  "，表名：" +
                  this.ID +
                  "）"
                );
              }),
              (e.prototype.getColumnID = function(e) {
                if (0 <= e && e < 26) return this._columnIDs[e];
                if (e < 0) return "error";
                var t = Math.floor(e / 26),
                  r = e % 26;
                return 0 === t
                  ? this._columnIDs[t]
                  : this._columnIDs[t - 1] + this._columnIDs[r];
              }),
              (e.prototype.addRow = function(e) {
                this._rows.push(e);
              }),
              e
            );
          })();
        r.VeryTable = i;
      },
      { "./veryTableRow": 84 }
    ],
    84: [
      function(e, t, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", { value: !0 });
        var i = (function() {
          function e(e) {
            (this._rowData = []), (this._rowData = e);
          }
          return (
            Object.defineProperty(e.prototype, "Count", {
              get: function() {
                return this._rowData ? this._rowData.length : 0;
              },
              enumerable: !0,
              configurable: !0
            }),
            (e.prototype.getData = function(e) {
              return this._rowData[e];
            }),
            (e.prototype.add = function(e) {
              this._rowData.push(e);
            }),
            (e.prototype.insert = function(e, t) {
              this._rowData.push(t);
              var r = this._rowData.slice(e);
              r.push(t), (this._rowData = r);
            }),
            (e.prototype.remove = function(e) {
              this._rowData.splice(e, 1);
            }),
            (e.prototype.removeEnd = function() {
              this._rowData.pop();
            }),
            e
          );
        })();
        r.VeryTableRow = i;
      },
      {}
    ],
    85: [
      function(e, t, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", { value: !0 });
        var i = (function() {
          function e(e) {
            (this._tables = []), e && (this._tables = e);
          }
          return (
            Object.defineProperty(e.prototype, "Count", {
              get: function() {
                return this._tables ? this._tables.length : 0;
              },
              enumerable: !0,
              configurable: !0
            }),
            (e.prototype.getTable = function(e) {
              return 0 <= e && e < this.Count ? this._tables[e] : void 0;
            }),
            (e.prototype.addTable = function(e) {
              this._tables.push(e);
            }),
            (e.prototype.removeTable = function(e) {
              0 <= e && e < this.Count && this._tables.splice(e, 1);
            }),
            e
          );
        })();
        r.VeryTableSet = i;
      },
      {}
    ]
  },
  {},
  [2]
);
//# sourceMappingURL=veryengine.js.map
