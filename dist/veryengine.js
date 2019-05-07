!(function o(a, s, u) {
  function c(e, t) {
    if (!s[e]) {
      if (!a[e]) {
        var r = "function" == typeof require && require;
        if (!t && r) return r(e, !0);
        if (p) return p(e, !0);
        var i = new Error("Cannot find module '" + e + "'");
        throw ((i.code = "MODULE_NOT_FOUND"), i);
      }
      var n = (s[e] = { exports: {} });
      a[e][0].call(
        n.exports,
        function(t) {
          return c(a[e][1][t] || t);
        },
        n,
        n.exports,
        o,
        a,
        s,
        u
      );
    }
    return s[e].exports;
  }
  for (
    var p = "function" == typeof require && require, t = 0;
    t < u.length;
    t++
  )
    c(u[t]);
  return c;
})(
  {
    1: [
      function(t, e, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", { value: !0 });
        var i = t("./veryengine/veryEngine"),
          n = (function() {
            function t(t, e) {
              (this._showFps = !0),
                (this._canvas = t),
                (i.VeryEngine.Canvas = this._canvas),
                (this._fps = e),
                (this._table = document.getElementById("VeryTable"));
            }
            return (
              (t.prototype.createScene = function() {
                this._engine && this._engine.dispose(),
                  (this._engine = new BABYLON.Engine(this._canvas, !0)),
                  (i.VeryEngine.Engine = this._engine);
                var e = this._engine;
                window.addEventListener("resize", function() {
                  e.resize();
                }),
                  (this._scene = new BABYLON.Scene(this._engine)),
                  (i.VeryEngine.Scene = this._scene);
                var t = new BABYLON.ArcRotateCamera(
                  "MainCamera",
                  0,
                  0,
                  10,
                  new BABYLON.Vector3(0, 0, 0),
                  this._scene
                );
                return (
                  t.setPosition(new BABYLON.Vector3(20, 200, 400)),
                  t.attachControl(this._canvas, !0),
                  (t.lowerBetaLimit = 0.1),
                  (t.upperBetaLimit = (Math.PI / 2) * 0.99),
                  (t.lowerRadiusLimit = 150),
                  e.displayLoadingUI(),
                  BABYLON.SceneLoader.Append(
                    "./scene/",
                    "scene.babylon",
                    this._scene,
                    function(t) {
                      e.hideLoadingUI();
                    }
                  ),
                  new i.VeryEngine().init(hot1.getData(), projectName),
                  this._scene.onBeforeRenderObservable.add(function() {
                    i.Time._sum();
                  }),
                  this
                );
              }),
              (t.prototype.animate = function() {
                var t = this;
                return (
                  this._engine.runRenderLoop(function() {
                    t._canvas.width !== t._canvas.clientWidth &&
                      t._engine.resize(),
                      t._scene && t._scene.render(),
                      t._showFps && t.updateFpsPos();
                  }),
                  this
                );
              }),
              (t.prototype.toggleDebug = function() {
                if (this._engine) {
                  var t = this._engine.scenes[0];
                  t.debugLayer.isVisible()
                    ? t.debugLayer.hide()
                    : t.debugLayer.show({ embedMode: !0 });
                }
                return this;
              }),
              (t.prototype.updateFpsPos = function() {
                this._fps &&
                  ((this._fps.style.right =
                    document.body.clientWidth -
                    (this._table.clientWidth + this._canvas.clientWidth) +
                    "px"),
                  (this._fps.innerHTML =
                    this._engine.getFps().toFixed() + " fps"));
              }),
              t
            );
          })();
        r.default = n;
      },
      { "./veryengine/veryEngine": 76 }
    ],
    2: [
      function(t, e, r) {
        "use strict";
        var i =
          (this && this.__importDefault) ||
          function(t) {
            return t && t.__esModule ? t : { default: t };
          };
        Object.defineProperty(r, "__esModule", { value: !0 });
        var n,
          o,
          a,
          s = i(t("./game"));
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
      function(t, e, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", { value: !0 });
        var i = t("../enum"),
          n = (function() {
            function t() {
              (this._enabled = !0),
                (this._projectName = ""),
                (this._objectID = ""),
                (this._actionID = ""),
                (this._erveryFrame = !1),
                (this.isSequence = !1),
                (this._sequenceState = i.SequenceActionState.Initial);
            }
            return (
              Object.defineProperty(t.prototype, "enabled", {
                get: function() {
                  return this._enabled;
                },
                set: function(t) {
                  this._enabled = t;
                },
                enumerable: !0,
                configurable: !0
              }),
              Object.defineProperty(t.prototype, "projectName", {
                get: function() {
                  return this._projectName;
                },
                enumerable: !0,
                configurable: !0
              }),
              Object.defineProperty(t.prototype, "objectID", {
                get: function() {
                  return this._objectID;
                },
                enumerable: !0,
                configurable: !0
              }),
              Object.defineProperty(t.prototype, "actionID", {
                get: function() {
                  return this._actionID;
                },
                enumerable: !0,
                configurable: !0
              }),
              Object.defineProperty(t.prototype, "Type", {
                get: function() {
                  return i.ActionType.Normal;
                },
                enumerable: !0,
                configurable: !0
              }),
              Object.defineProperty(t.prototype, "everyFrame", {
                get: function() {
                  return this._erveryFrame;
                },
                enumerable: !0,
                configurable: !0
              }),
              Object.defineProperty(t.prototype, "SequenceState", {
                get: function() {
                  return this._sequenceState;
                },
                set: function(t) {
                  this._sequenceState = t;
                },
                enumerable: !0,
                configurable: !0
              }),
              (t.prototype.setEveryFrame = function(t) {
                this._erveryFrame = t;
              }),
              (t.prototype.setActionID = function(t, e) {
                (this._objectID = t), (this._actionID = e);
              }),
              (t.prototype.paraParser = function(t) {
                return !0;
              }),
              (t.prototype.action = function(t, e) {
                (this._enabled = t),
                  (this._erveryFrame = e),
                  this._enabled &&
                    (this.active(), this._erveryFrame || this.onUpdate());
              }),
              (t.prototype.update = function() {
                this._enabled && this._erveryFrame && this.onUpdate();
              }),
              (t.prototype.onUpdate = function() {}),
              (t.prototype.pause = function() {
                this._sequenceState = i.SequenceActionState.Pause;
              }),
              (t.prototype.resume = function() {
                this._sequenceState = i.SequenceActionState.Running;
              }),
              (t.prototype.stop = function() {
                this._sequenceState = i.SequenceActionState.Initial;
              }),
              (t.prototype.finish = function() {
                (this._sequenceState = i.SequenceActionState.Initial),
                  (this.enabled = !1);
              }),
              t
            );
          })();
        r.VE_ActionBehaviour = n;
      },
      { "../enum": 15 }
    ],
    4: [
      function(t, e, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", { value: !0 });
        var n = t("../html"),
          i = (function() {
            function t() {}
            return (
              (t.addAction = function(t) {
                for (var e = t.ID.split("|"), r = 0; r < e.length; r++) {
                  var i = e[r].trim().toLowerCase();
                  this._actionDics[i]
                    ? n.ShowError.showError(
                        "响应初始化错误，响应ID重复，当前响应ID：" +
                          i +
                          "，请为当前响应重新分配响应ID！"
                      )
                    : (this._actionDics[i] = t);
                }
              }),
              (t.hasAction = function(t) {
                return (t = t.toLowerCase()), !!this._actionDics[t];
              }),
              (t.createAction = function(t) {
                return (
                  (t = t.toLowerCase()), Object.create(this._actionDics[t])
                );
              }),
              (t.remove = function(t) {
                (t = t.toLowerCase()), delete this._actionDics[t];
              }),
              (t._actionDics = {}),
              t
            );
          })();
        r.VE_Actions = i;
      },
      { "../html": 37 }
    ],
    5: [
      function(t, e, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", { value: !0 });
        var i = t("../enum"),
          n = (function() {
            function t(t, e) {
              (this._totalStr = ""),
                (this._leftType = i.AssignType.Variable),
                (this._rightType = i.AssignType.Variable),
                (this._state = t),
                (this._totalStr = e);
            }
            return (
              Object.defineProperty(t.prototype, "state", {
                get: function() {
                  return this._state;
                },
                enumerable: !0,
                configurable: !0
              }),
              Object.defineProperty(t.prototype, "leftType", {
                get: function() {
                  return this._leftType;
                },
                enumerable: !0,
                configurable: !0
              }),
              Object.defineProperty(t.prototype, "rightType", {
                get: function() {
                  return this._rightType;
                },
                enumerable: !0,
                configurable: !0
              }),
              t
            );
          })();
        r.VE_Assignment = n;
      },
      { "../enum": 15 }
    ],
    6: [
      function(t, e, r) {
        "use strict";
        function i(t) {
          for (var e in t) r.hasOwnProperty(e) || (r[e] = t[e]);
        }
        Object.defineProperty(r, "__esModule", { value: !0 }),
          i(t("./actionBehaviour")),
          i(t("./assignment")),
          i(t("./actions"));
      },
      { "./actionBehaviour": 3, "./actions": 4, "./assignment": 5 }
    ],
    7: [
      function(t, e, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", { value: !0 });
        var i = t("./fsmData"),
          n = (function() {
            function t(t, e, r) {
              (this._projectName = ""),
                (this._objectID = ""),
                (this._templateID = ""),
                (this._isTemplate = !1),
                (this._fsmIDs = []),
                (this._fsmDic = {}),
                (this._triggerIDs = []),
                (this._triggerDic = {}),
                (this._actionIDs = []),
                (this._actionDic = {}),
                (this._actionInitValue = {}),
                (this._projectName = t),
                (this._isTemplate = r)
                  ? (this._templateID = e)
                  : (this._objectID = e);
            }
            return (
              Object.defineProperty(t.prototype, "projectName", {
                get: function() {
                  return this._projectName;
                },
                enumerable: !0,
                configurable: !0
              }),
              Object.defineProperty(t.prototype, "objectID", {
                get: function() {
                  return this._objectID;
                },
                enumerable: !0,
                configurable: !0
              }),
              Object.defineProperty(t.prototype, "templateID", {
                get: function() {
                  return this._templateID;
                },
                enumerable: !0,
                configurable: !0
              }),
              Object.defineProperty(t.prototype, "isTemplate", {
                get: function() {
                  return this._isTemplate;
                },
                enumerable: !0,
                configurable: !0
              }),
              Object.defineProperty(t.prototype, "id", {
                get: function() {
                  return this._isTemplate ? this._templateID : this._objectID;
                },
                enumerable: !0,
                configurable: !0
              }),
              Object.defineProperty(t.prototype, "triggerCount", {
                get: function() {
                  return this._triggerIDs.length;
                },
                enumerable: !0,
                configurable: !0
              }),
              Object.defineProperty(t.prototype, "actionCount", {
                get: function() {
                  return this._actionIDs.length;
                },
                enumerable: !0,
                configurable: !0
              }),
              Object.defineProperty(t.prototype, "fsmCount", {
                get: function() {
                  return this._fsmIDs.length;
                },
                enumerable: !0,
                configurable: !0
              }),
              (t.prototype.isCreatedFsm = function(t) {
                return !!this._fsmDic[t];
              }),
              (t.prototype.createFsm = function(t) {
                this._fsmIDs.push(t),
                  (this._fsmDic[t] = new i.VE_FsmData(t, this));
              }),
              (t.prototype.getFsmData = function(t) {
                return this._fsmDic[t];
              }),
              (t.prototype.hasFsmIndex = function(t) {
                return 0 <= t && t < this._fsmIDs.length;
              }),
              (t.prototype.getFsmID = function(t) {
                return this._fsmIDs[t];
              }),
              (t.prototype.isCreatedTrigger = function(t) {
                return !!this._triggerDic[t];
              }),
              (t.prototype.addTrigger = function(t, e) {
                this._triggerIDs.push(t), (this._triggerDic[t] = e);
              }),
              (t.prototype.getTrigger = function(t) {
                return this._triggerDic[t];
              }),
              (t.prototype.hasTriggerIndex = function(t) {
                return 0 <= t && t < this._triggerIDs.length;
              }),
              (t.prototype.getTriggerID = function(t) {
                return this._triggerIDs[t];
              }),
              (t.prototype.isCreatedAction = function(t) {
                return !!this._actionDic[t];
              }),
              (t.prototype.addAction = function(t, e, r) {
                this._actionIDs.push(t),
                  (this._actionDic[t] = e),
                  (this._actionInitValue[t] = r);
              }),
              (t.prototype.getAction = function(t) {
                return this._actionDic[t];
              }),
              (t.prototype.getActionInitVal = function(t) {
                return this._actionInitValue[t];
              }),
              (t.prototype.hasActionIndex = function(t) {
                return 0 <= t && t < this._actionIDs.length;
              }),
              (t.prototype.getActionID = function(t) {
                return this._actionIDs[t];
              }),
              (t.prototype.clear = function() {
                (this._fsmIDs = []),
                  (this._fsmDic = {}),
                  (this._triggerIDs = []),
                  (this._triggerDic = {}),
                  (this._actionIDs = []),
                  (this._actionDic = {}),
                  (this._actionInitValue = {});
              }),
              t
            );
          })();
        r.VE_DataSource = n;
      },
      { "./fsmData": 8 }
    ],
    8: [
      function(t, e, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", { value: !0 });
        var i = (function() {
          function t(t, e) {
            (this._fsmType = ""),
              (this._initialValStr = "defalut"),
              (this._states = []),
              (this._dataSource = e),
              (this._fsmID = t);
          }
          return (
            Object.defineProperty(t.prototype, "dataSource", {
              get: function() {
                return this._dataSource;
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(t.prototype, "fsmID", {
              get: function() {
                return this._fsmID;
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(t.prototype, "fsmType", {
              get: function() {
                return this._fsmType;
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(t.prototype, "initialValStr", {
              get: function() {
                return this._initialValStr;
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(t.prototype, "count", {
              get: function() {
                return this._states.length;
              },
              enumerable: !0,
              configurable: !0
            }),
            (t.prototype.initFsm = function(t, e) {
              (this._fsmType = t), (this._initialValStr = e);
            }),
            (t.prototype.addState = function(t) {
              this._states.push(t);
            }),
            (t.prototype.getState = function(t) {
              return this._states[t];
            }),
            t
          );
        })();
        r.VE_FsmData = i;
      },
      {}
    ],
    9: [
      function(t, e, r) {
        "use strict";
        function i(t) {
          for (var e in t) r.hasOwnProperty(e) || (r[e] = t[e]);
        }
        Object.defineProperty(r, "__esModule", { value: !0 }),
          i(t("./variableData")),
          i(t("./fsmData")),
          i(t("./stateActionData")),
          i(t("./stateTriggerData")),
          i(t("./stateData")),
          i(t("./dataSource"));
      },
      {
        "./dataSource": 7,
        "./fsmData": 8,
        "./stateActionData": 10,
        "./stateData": 11,
        "./stateTriggerData": 12,
        "./variableData": 13
      }
    ],
    10: [
      function(t, e, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", { value: !0 });
        var o = t("../enum"),
          i = (function() {
            function t(t, e, r, i, n) {
              void 0 === e && (e = "false"),
                void 0 === r && (r = "false"),
                void 0 === i && (i = "false"),
                void 0 === n && (n = o.StateActionType.Action),
                (this.totalString = ""),
                (this.varID = ""),
                (this.varValue = ""),
                (this.actionID = t),
                (this.enabled = e),
                (this.everyFrame = r),
                (this.isSequence = i),
                (this.type = n);
            }
            return (
              (t.prototype.setNormalAction = function(t, e, r, i) {
                void 0 === e && (e = "false"),
                  void 0 === r && (r = "false"),
                  void 0 === i && (i = "false"),
                  (this.actionID = t),
                  (this.enabled = e),
                  (this.everyFrame = r),
                  (this.isSequence = i),
                  (this.type = o.StateActionType.Action);
              }),
              (t.prototype.setAssignmentAction = function(t, e, r) {
                (this.totalString = t),
                  (this.varID = e),
                  (this.varValue = r),
                  (this.type = o.StateActionType.Assignment);
              }),
              t
            );
          })();
        r.VE_StateActionData = i;
      },
      { "../enum": 15 }
    ],
    11: [
      function(t, e, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", { value: !0 });
        var n = t("../state"),
          i = (function() {
            function t(t, e, r, i) {
              void 0 === i && (i = n.StateConst.STATE_INDEX),
                (this._stateIndex = n.StateConst.STATE_INDEX),
                (this.logicalExp = ""),
                (this._triggers = []),
                (this._actions = []),
                (this._associatedStates = []),
                (this._isSequence = !1),
                (this._fsmData = t),
                (this._valStr = e),
                (this._isInitialValue = r),
                (this._stateIndex = i);
            }
            return (
              Object.defineProperty(t.prototype, "fsmData", {
                get: function() {
                  return this._fsmData;
                },
                enumerable: !0,
                configurable: !0
              }),
              Object.defineProperty(t.prototype, "ValStr", {
                get: function() {
                  return this._valStr;
                },
                enumerable: !0,
                configurable: !0
              }),
              Object.defineProperty(t.prototype, "isInitialValue", {
                get: function() {
                  return this._isInitialValue;
                },
                enumerable: !0,
                configurable: !0
              }),
              Object.defineProperty(t.prototype, "stateIndex", {
                get: function() {
                  return this._stateIndex;
                },
                enumerable: !0,
                configurable: !0
              }),
              Object.defineProperty(t.prototype, "isSequence", {
                get: function() {
                  return this._isSequence;
                },
                enumerable: !0,
                configurable: !0
              }),
              Object.defineProperty(t.prototype, "triggerCount", {
                get: function() {
                  return this._triggers.length;
                },
                enumerable: !0,
                configurable: !0
              }),
              Object.defineProperty(t.prototype, "actionCount", {
                get: function() {
                  return this._actions.length;
                },
                enumerable: !0,
                configurable: !0
              }),
              Object.defineProperty(t.prototype, "associatedStateCount", {
                get: function() {
                  return this._associatedStates.length;
                },
                enumerable: !0,
                configurable: !0
              }),
              (t.prototype.hasTrigger = function(t) {
                return 0 <= t && t < this._triggers.length;
              }),
              (t.prototype.addTrigger = function(t) {
                this._triggers.push(t);
              }),
              (t.prototype.getTrigger = function(t) {
                return this._triggers[t];
              }),
              (t.prototype.hasAction = function(t) {
                return 0 <= t && t < this._actions.length;
              }),
              (t.prototype.addAction = function(t) {
                this._actions.push(t);
              }),
              (t.prototype.getAction = function(t) {
                return this._actions[t];
              }),
              (t.prototype.hasAssociatedState = function(t) {
                return 0 <= t && t < this._associatedStates.length;
              }),
              (t.prototype.addAssociatedState = function(t) {
                this._associatedStates.push(t);
              }),
              (t.prototype.getAssociatedState = function(t) {
                return this._associatedStates[t];
              }),
              (t.prototype.setSequence = function() {
                this._isSequence = !0;
              }),
              t
            );
          })();
        r.VE_StateData = i;
      },
      { "../state": 56 }
    ],
    12: [
      function(t, e, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", { value: !0 });
        var i = (function() {
          function t(t) {
            (this.triggerID = t),
              (this.logicalSwitch = ""),
              (this.logicalExp = "");
          }
          return (
            Object.defineProperty(t, "Empty", {
              get: function() {
                return new t("");
              },
              enumerable: !0,
              configurable: !0
            }),
            t
          );
        })();
        r.VE_StateTriggerData = i;
      },
      {}
    ],
    13: [
      function(t, e, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", { value: !0 });
        var i = (function() {
          function t(t) {
            (this._projectName = ""),
              (this._variableIDs = []),
              (this._varDics = {}),
              (this._varPosDic = {}),
              (this._projectName = t);
          }
          return (
            Object.defineProperty(t.prototype, "projectName", {
              get: function() {
                return this._projectName;
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(t.prototype, "count", {
              get: function() {
                return this._variableIDs.length;
              },
              enumerable: !0,
              configurable: !0
            }),
            (t.prototype.isCreatedVariable = function(t) {
              return !!this._varDics[t];
            }),
            (t.prototype.addVariable = function(t, e, r) {
              (this._varDics[t] = e),
                this._variableIDs.push(t),
                (this._varPosDic[t] = r);
            }),
            (t.prototype.getVariableID = function(t) {
              return 0 <= t && t < this._variableIDs.length
                ? this._variableIDs[t]
                : "";
            }),
            (t.prototype.getVariableParas = function(t) {
              return this._varDics[t];
            }),
            (t.prototype.getPos = function(t) {
              return this._varPosDic[t];
            }),
            (t.prototype.clear = function() {
              (this._variableIDs = []), (this._varDics = {});
            }),
            t
          );
        })();
        r.VE_VariableData = i;
      },
      {}
    ],
    14: [
      function(t, e, r) {
        "use strict";
        var i, n, o, a, s, u, c;
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
          ((s = r.AssociatedFsmType || (r.AssociatedFsmType = {}))[
            (s.Object = 0)
          ] = "Object"),
          (s[(s.Template = 1)] = "Template"),
          ((u = r.VariableScope || (r.VariableScope = {}))[(u.Local = 0)] =
            "Local"),
          (u[(u.Fsm = 1)] = "Fsm"),
          (u[(u.Global = 2)] = "Global"),
          (u[(u.Scene = 3)] = "Scene"),
          ((c = r.Severity || (r.Severity = {}))[(c.Warning = 0)] = "Warning"),
          (c[(c.Error = 1)] = "Error");
      },
      {}
    ],
    15: [
      function(t, e, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", { value: !0 }),
          (function(t) {
            for (var e in t) r.hasOwnProperty(e) || (r[e] = t[e]);
          })(t("./enumTypes"));
      },
      { "./enumTypes": 14 }
    ],
    16: [
      function(t, e, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", { value: !0 });
        var i = (function() {
          function t(t, e, r) {
            (this._value = ""),
              (this._line = 0),
              (this._pos = 0),
              (this._value = t),
              (this._line = e),
              (this._pos = r);
          }
          return (
            (t.prototype.getValue = function() {
              return this._value;
            }),
            (t.prototype.getLine = function() {
              return this._line;
            }),
            (t.prototype.getPos = function() {
              return this._pos;
            }),
            (t.prototype.isDigit = function() {
              return /\d/.test(this._value);
            }),
            (t.prototype.isLetter = function() {
              return /[a-zA-Z]/.test(this._value);
            }),
            (t.prototype.isWhiteSpace = function() {
              return " " === this._value;
            }),
            (t.prototype.isNewLine = function() {
              return "\n" === this._value;
            }),
            (t.prototype.isEndOfInput = function() {
              return "\0" === this._value;
            }),
            (t.prototype.is = function() {
              for (var t = [], e = 0; e < arguments.length; e++)
                t[e] = arguments[e];
              for (var r = 0; r < t.length; r++)
                if (t[r] === this._value && "\0" !== t[r]) return !0;
              return !1;
            }),
            (t.prototype.toString = function() {
              return this._value;
            }),
            t
          );
        })();
        r.ExpChar = i;
      },
      {}
    ],
    17: [
      function(t, e, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", { value: !0 });
        var i = t("./scope"),
          n = t("./positions"),
          o = t("./expressionParsing"),
          a = t("../enum"),
          s = t("../html"),
          u = (function() {
            function t() {}
            return (
              (t.init = function() {
                this._scope = i.Scope.Create();
              }),
              (t.isCreated = function(t) {
                return !!this._scope.isCreated(t) || !!this._expVariable[t];
              }),
              (t.isCreatedVariable = function(t) {
                return !!this._scope.isCreated(t);
              }),
              (t.isCreatedExpression = function(t) {
                return !!this._expVariable[t];
              }),
              (t.createVariable = function(t, e, r) {
                return (
                  (this.errors = []),
                  this.isCreated(t)
                    ? (this.errors.push(
                        n.ParseError.Error(
                          new n.NameLocation(t),
                          "变量：" +
                            t +
                            "，类型：" +
                            e +
                            "，该变量已创建，请勿重复创建！"
                        )
                      ),
                      !1)
                    : (this._scope.setVariable(t, e, r), !0)
                );
              }),
              (t.createExpression = function(t, e) {
                if (((this.errors = []), this.isCreated(t)))
                  return (
                    this.errors.push(
                      n.ParseError.Error(
                        new n.NameLocation(t),
                        "表达式名：" +
                          t +
                          "，表达式：" +
                          e +
                          "，该表达式已定义，请勿重复定义！"
                      )
                    ),
                    !1
                  );
                var r = o.VE_ExpressionParsing.parsing(
                  t,
                  e,
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
                return (this._expVariable[t] = r), !0;
              }),
              (t.getValue = function(t) {
                return this.isCreated(t)
                  ? this.isCreatedVariable(t)
                    ? this._scope.find(t).getValue()
                    : this._expVariable[t].evaluate()
                  : null;
              }),
              (t.getExpression = function(t) {
                return this._expVariable[t] ? this._expVariable[t] : null;
              }),
              (t.getVariable = function(t) {
                return this.isCreatedVariable(t) ? this._scope.find(t) : null;
              }),
              (t.printError = function() {
                if (0 < this.errors.length)
                  for (var t = 0; t < this.errors.length; t++)
                    console.log(this.errors[t].toString()),
                      s.ShowError.showError(this.errors[t].toString());
              }),
              (t._expVariable = {}),
              (t.errors = []),
              (t._projectName = ""),
              (t._objectID = ""),
              t
            );
          })();
        (r.ExpManager = u).init();
        try {
          u.createVariable("first", "number", 1),
            u.createVariable("second", "number", 2),
            u.createVariable("third", "bool", !0),
            console.log(u.getValue("third")),
            u.createExpression("exp1", "（first * second + second） > 10"),
            console.log("值2： " + u.getExpression("exp1").evaluate());
        } catch (t) {}
        u.printError();
      },
      {
        "../enum": 15,
        "../html": 37,
        "./expressionParsing": 19,
        "./positions": 25,
        "./scope": 26
      }
    ],
    18: [
      function(t, e, r) {
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
    19: [
      function(t, e, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", { value: !0 });
        var s = t("./tokenizer"),
          c = t("./expressions"),
          p = t("./expressionEnum"),
          n = t("./functionExpression"),
          o = t("./functions"),
          l = t("./variableExpression"),
          i = t("../enum"),
          a = (function() {
            function t() {}
            return (
              (t.init = function() {
                (this._bracketPair["("] = ")"),
                  (this._bracketPair["["] = "]"),
                  (this._bracketPair["{"] = "}"),
                  (this._bracketPair["（"] = "）"),
                  (this._bracketPair["【"] = "】");
              }),
              (t.parsing = function(t, e, r, i, n, o, a) {
                return (
                  (this._scope = r),
                  (this._projectName = i),
                  (this._objectID = n),
                  (this._fsmID = o),
                  (this._varScope = a),
                  (this._tokenizer = new s.Tokenizer(e)),
                  (this.errors = []),
                  this.parse()
                );
              }),
              (t.parse = function() {
                var t = this.buildExpression();
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
                  t
                );
              }),
              (t.buildExpression = function() {
                var t = this.relationalExp();
                if (this._tokenizer.current().isOperator("&&")) {
                  this._tokenizer.consume();
                  var e = this.buildExpression();
                  return this.reOrder(t, e, c.BinaryOperator.Add);
                }
                if (this._tokenizer.current().isOperator("||")) {
                  this._tokenizer.consume();
                  e = this.buildExpression();
                  return this.reOrder(t, e, c.BinaryOperator.Or);
                }
                return t;
              }),
              (t.relationalExp = function() {
                var t = this.algebraExp();
                if (this._tokenizer.current().isOperator("<")) {
                  this._tokenizer.consume();
                  var e = this.relationalExp();
                  return this.reOrder(t, e, c.BinaryOperator.LT);
                }
                if (this._tokenizer.current().isOperator("<=")) {
                  this._tokenizer.consume();
                  e = this.relationalExp();
                  return this.reOrder(t, e, c.BinaryOperator.LT_EQ);
                }
                if (this._tokenizer.current().isOperator("==")) {
                  this._tokenizer.consume();
                  e = this.relationalExp();
                  return this.reOrder(t, e, c.BinaryOperator.EQ);
                }
                if (this._tokenizer.current().isOperator(">=")) {
                  this._tokenizer.consume();
                  e = this.relationalExp();
                  return this.reOrder(t, e, c.BinaryOperator.GT_EQ);
                }
                if (this._tokenizer.current().isOperator(">")) {
                  this._tokenizer.consume();
                  e = this.relationalExp();
                  return this.reOrder(t, e, c.BinaryOperator.GT);
                }
                if (this._tokenizer.current().isOperator("!=")) {
                  this._tokenizer.consume();
                  e = this.relationalExp();
                  return this.reOrder(t, e, c.BinaryOperator.NEQ);
                }
                return t;
              }),
              (t.algebraExp = function() {
                var t = this.productExp();
                if (this._tokenizer.current().isOperator("+")) {
                  this._tokenizer.consume();
                  var e = this.algebraExp();
                  return this.reOrder(t, e, c.BinaryOperator.Add);
                }
                if (this._tokenizer.current().isOperator("-")) {
                  this._tokenizer.consume();
                  e = this.algebraExp();
                  return this.reOrder(t, e, c.BinaryOperator.Subtract);
                }
                return t;
              }),
              (t.productExp = function() {
                var t = this.exponentExp();
                if (this._tokenizer.current().isOperator("*")) {
                  this._tokenizer.consume();
                  var e = this.productExp();
                  return this.reOrder(t, e, c.BinaryOperator.Multiply);
                }
                if (this._tokenizer.current().isOperator("/")) {
                  this._tokenizer.consume();
                  e = this.productExp();
                  return this.reOrder(t, e, c.BinaryOperator.Divide);
                }
                if (this._tokenizer.current().isOperator("%")) {
                  this._tokenizer.consume();
                  e = this.productExp();
                  return this.reOrder(t, e, c.BinaryOperator.Modulo);
                }
                return t;
              }),
              (t.exponentExp = function() {
                var t = this.atomExp();
                return (
                  (this._tokenizer.current().isOperator("!") ||
                    this._tokenizer.current().isOperator("！")) &&
                    (t = new c.BinaryExpression(t, t, c.BinaryOperator.Not)),
                  t
                );
              }),
              (t.atomExp = function() {
                if (this._tokenizer.current().isOperator("-"))
                  return (
                    this._tokenizer.consume(),
                    (e = new c.BinaryExpression(
                      new c.ConstantExpression(0, "number"),
                      this.atomExp(),
                      c.BinaryOperator.Subtract
                    )).setSeal(),
                    e
                  );
                if (
                  this._tokenizer.current().isOperator("!") &&
                  (this._tokenizer.next().isIdentifier() ||
                    this._tokenizer.next().isKeyword() ||
                    this._tokenizer.next().isStartBracket())
                ) {
                  this._tokenizer.consume();
                  var t = this.atomExp();
                  return "bool" !== t.expType
                    ? (this._tokenizer.addError(
                        this._tokenizer.current(),
                        "取非运算(!)后应跟着bool值类型！"
                      ),
                      c.ConstantExpression.Empty())
                    : new c.BinaryExpression(t, t, c.BinaryOperator.Not);
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
                  this._tokenizer.current().isStartBracket())
                ) {
                  var e,
                    r = this._bracketPair[
                      this._tokenizer.consume().getTrigger()
                    ];
                  return (
                    "BinaryExpression" ===
                      (e = this.buildExpression()).className && e.setSeal(),
                    this.expectTrigger(p.ExpressionType.OPERATOR, r),
                    e
                  );
                }
                if (this._tokenizer.current().isConstant()) {
                  var i = void 0,
                    n = "string";
                  return (
                    (n = this._tokenizer.current().isBool()
                      ? ((i =
                          "true" ===
                          this._tokenizer
                            .current()
                            .getContents()
                            .toLowerCase()),
                        "bool")
                      : this._tokenizer.current().isNumber()
                      ? ((i = parseFloat(
                          this._tokenizer.current().getContents()
                        )),
                        "number")
                      : ((i = this._tokenizer.current().getContents()),
                        "string")),
                    this._tokenizer.consume(),
                    new c.ConstantExpression(i, n)
                  );
                }
                if (this._tokenizer.current().isIdentifier()) {
                  if (this._tokenizer.next().isStartBracket()) {
                    var o = this._bracketPair[
                      this._tokenizer.next().getTrigger()
                    ];
                    return this.functionCall(o);
                  }
                  var a = void 0,
                    s = this._tokenizer.current(),
                    u = this._tokenizer.consume().getContents();
                  return u.endsWith(".") &&
                    this._tokenizer.current().isOperator("*") &&
                    this._tokenizer.next().isIdentifier()
                    ? (console.log("TODO：解析VeryVar变量"),
                      c.ConstantExpression.Empty())
                    : null === (a = this._scope.find(u))
                    ? (this._tokenizer.addError(
                        s,
                        "变量名：" +
                          u +
                          "，该变量在变量作用域中未定义，也未定义该表达式，无法识别！另外，赋值响应右侧如果是公式，不允许引用模板变量！"
                      ),
                      c.ConstantExpression.Empty())
                    : new l.VariableExpression(a);
                }
                return (
                  this._tokenizer.current().isKeyword() ||
                    (this._tokenizer.current().isSpecialIdentifier()
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
                    this._tokenizer.consume()),
                  c.ConstantExpression.Empty()
                );
              }),
              (t.reOrder = function(t, e, r) {
                if ("BinaryExpression" === e.className) {
                  var i = e;
                  if (!i.isSealed() && i.getPriority() === i.getPriorityOp(r))
                    return this.replaceLeft(i, t, r), e;
                }
                return new c.BinaryExpression(t, e, r);
              }),
              (t.replaceLeft = function(t, e, r) {
                if ("BinaryExpression" === t.getLeftExp().className) {
                  var i = t.getLeftExp();
                  if (!i.isSealed() && i.getPriority() === i.getPriorityOp(r))
                    return void this.replaceLeft(i, e, r);
                }
                t.setLeftExp(new c.BinaryExpression(e, t.getLeftExp(), r));
              }),
              (t.functionCall = function(t) {
                var e = new n.FunctionExpression(),
                  r = this._tokenizer.consume();
                if (!o.CustomFunctions.hasFunction(r.getContents()))
                  return (
                    this._tokenizer.addError(
                      r,
                      "未定义函数：" + r.getContents() + "！"
                    ),
                    c.ConstantExpression.Empty()
                  );
                var i = o.CustomFunctions.createFunction(r.getContents());
                for (
                  e.setFunction(i), this._tokenizer.consume();
                  !this._tokenizer.current().isOperator(t) &&
                  !this._tokenizer.current().isEnd();

                )
                  0 !== e.paraCount() &&
                    this.expectTrigger(p.ExpressionType.OPERATOR, ","),
                    e.addPara(this.buildExpression());
                return (
                  this.expectTrigger(p.ExpressionType.OPERATOR, t),
                  e.evaluate(),
                  e.paraCount() > i.parameterNumber() &&
                  0 <= i.parameterNumber()
                    ? (this._tokenizer.addError(
                        r,
                        "函数参数不一致，当前函数：" +
                          r.getContents() +
                          "，规定参数个数Max：" +
                          i.parameterNumber() +
                          "，当前参数个数：" +
                          e.paraCount() +
                          "，请检查！"
                      ),
                      c.ConstantExpression.Empty())
                    : e
                );
              }),
              (t.expectTrigger = function(t, e) {
                this._tokenizer.current().matches(t, e)
                  ? this._tokenizer.consume()
                  : this._tokenizer.addError(
                      this._tokenizer.current(),
                      "期望获得：" +
                        e +
                        "，当前值为：" +
                        this._tokenizer.current().getTrigger() +
                        "，请检查！"
                    );
              }),
              (t.getProjectCollector = function() {
                return this._tokenizer.getProblemCollector();
              }),
              (t._bracketPair = {}),
              (t.errors = []),
              (t._projectName = ""),
              (t._objectID = ""),
              (t._fsmID = ""),
              (t._varScope = i.VariableScope.Local),
              t
            );
          })();
        (r.VE_ExpressionParsing = a).init();
      },
      {
        "../enum": 15,
        "./expressionEnum": 18,
        "./expressions": 20,
        "./functionExpression": 22,
        "./functions": 23,
        "./tokenizer": 29,
        "./variableExpression": 31
      }
    ],
    20: [
      function(t, e, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", { value: !0 });
        var i = t("../utility/dictionary"),
          n = (function() {
            function t() {}
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
                  return "TrueExpression";
                },
                enumerable: !0,
                configurable: !0
              }),
              Object.defineProperty(t.prototype, "value", {
                get: function() {
                  return !0;
                },
                enumerable: !0,
                configurable: !0
              }),
              (t.prototype.evaluate = function() {
                return !0;
              }),
              (t.prototype.clone = function() {
                return new t();
              }),
              (t.prototype.toString = function() {
                return "true";
              }),
              t
            );
          })();
        r.TrueExpression = n;
        var o,
          a,
          s = (function() {
            function t(t, e) {
              (this._expType = "string"),
                (this._value = t),
                (this._expType = e);
            }
            return (
              Object.defineProperty(t.prototype, "expType", {
                get: function() {
                  return this._expType;
                },
                enumerable: !0,
                configurable: !0
              }),
              Object.defineProperty(t.prototype, "className", {
                get: function() {
                  return "ConstantExpression";
                },
                enumerable: !0,
                configurable: !0
              }),
              (t.prototype.evaluate = function() {
                return this._value;
              }),
              (t.prototype.clone = function() {
                return new t(this._value, this._expType);
              }),
              (t.Empty = function() {
                return new t(null, "string");
              }),
              (t.prototype.isEmpty = function() {
                return "string" === this._expType && null === this._value;
              }),
              (t.prototype.toString = function() {
                return null !== this._value ? this._value.toString() : "null";
              }),
              t
            );
          })();
        (r.ConstantExpression = s),
          ((a = o = r.BinaryOperator || (r.BinaryOperator = {})).Add = "+"),
          (a.Subtract = "-"),
          (a.Multiply = "*"),
          (a.Divide = "/"),
          (a.Modulo = "%"),
          (a.Power = "^"),
          (a.LT = "<"),
          (a.LT_EQ = "<="),
          (a.EQ = "="),
          (a.GT_EQ = ">="),
          (a.GT = ">"),
          (a.NEQ = "!="),
          (a.And = "&&"),
          (a.Or = "||"),
          (a.Not = "!");
        var u = (function() {
          function r(t, e, r) {
            (this._expType = ""),
              (this.isRight = !0),
              (this._op = o.EQ),
              (this._isSealed = !1),
              (this._left = t),
              (this._right = e),
              (this._op = r),
              (this._expType = this.resultAutoType(t, e, r)),
              "null" === this._expType &&
                ((this.isRight = !1),
                console.log(
                  "公式两边类型不匹配，左侧类型：" +
                    t.expType +
                    "，右侧类型：" +
                    e.expType +
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
              (this._opDic["+"] = o.Add),
                (this._opDic["-"] = o.Subtract),
                (this._opDic["*"] = o.Multiply),
                (this._opDic["/"] = o.Divide),
                (this._opDic["%"] = o.Modulo),
                (this._opDic["**"] = o.Power),
                (this._opDic["^"] = o.Power),
                (this._opDic["<"] = o.LT),
                (this._opDic["<="] = o.LT_EQ),
                (this._opDic["=="] = o.EQ),
                (this._opDic[">="] = o.GT_EQ),
                (this._opDic[">"] = o.GT),
                (this._opDic["!="] = o.NEQ),
                (this._opDic["&&"] = o.And),
                (this._opDic["||"] = o.Or),
                (this._opDic["!"] = o.Not),
                (this._opDic["！"] = o.Not),
                this._priority.Add(o.Not, 2),
                this._priority.Add(o.Power, 3),
                this._priority.Add(o.Multiply, 4),
                this._priority.Add(o.Divide, 4),
                this._priority.Add(o.Modulo, 4),
                this._priority.Add(o.Add, 5),
                this._priority.Add(o.Subtract, 5),
                this._priority.Add(o.LT, 6),
                this._priority.Add(o.LT_EQ, 6),
                this._priority.Add(o.EQ, 6),
                this._priority.Add(o.GT_EQ, 6),
                this._priority.Add(o.GT, 6),
                this._priority.Add(o.NEQ, 6),
                this._priority.Add(o.And, 7),
                this._priority.Add(o.Or, 7);
            }),
            (r.prototype.resultAutoType = function(t, e, r) {
              return r === o.Add
                ? "string" === t.expType || "string" === e.expType
                  ? "string"
                  : "bool" === t.expType || "bool" === e.expType
                  ? "null"
                  : "number" === t.expType || "number" === e.expType
                  ? "number"
                  : "vector3" === t.expType || "vector3" === e.expType
                  ? "vector3"
                  : "vector2" === t.expType || "vector2" === e.expType
                  ? "vector2"
                  : "null"
                : r === o.Divide ||
                  r === o.Multiply ||
                  r === o.Modulo ||
                  r === o.Power ||
                  r === o.Subtract
                ? "string" === t.expType ||
                  "string" === e.expType ||
                  "bool" === t.expType ||
                  "bool" === t.expType
                  ? "null"
                  : "vector3" === t.expType &&
                    "vector3" === e.expType &&
                    r === o.Subtract
                  ? "vector3"
                  : "vector2" === t.expType &&
                    "vector2" === e.expType &&
                    r === o.Subtract
                  ? "vector2"
                  : ("number" === t.expType &&
                      "vector3" === e.expType &&
                      r === o.Multiply) ||
                    ("vector3" === t.expType &&
                      "number" === e.expType &&
                      r == o.Multiply)
                  ? "vector3"
                  : ("number" === t.expType &&
                      "vector2" === e.expType &&
                      r === o.Multiply) ||
                    ("vector2" === t.expType &&
                      "number" === e.expType &&
                      r == o.Multiply)
                  ? "vector2"
                  : "vector3" === t.expType &&
                    "number" === e.expType &&
                    r === o.Divide
                  ? "vector3"
                  : "vector2" === t.expType &&
                    "number" === e.expType &&
                    r === o.Divide
                  ? "vector2"
                  : "number" === t.expType || "number" === e.expType
                  ? "number"
                  : "null"
                : r === o.LT || r === o.LT_EQ || r === o.GT_EQ || r === o.GT
                ? "string" === t.expType ||
                  "string" === e.expType ||
                  "bool" === t.expType ||
                  "bool" === e.expType
                  ? "null"
                  : "bool"
                : r === o.NEQ || r === o.EQ
                ? e.expType !== t.expType
                  ? "null"
                  : "bool"
                : r === o.Not
                ? "bool" !== e.expType
                  ? "null"
                  : "bool"
                : "string";
            }),
            (r.prototype.setLeftExp = function(t) {
              this._left = t;
            }),
            (r.prototype.setRightExp = function(t) {
              this._right = t;
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
              var t = this._left.evaluate(),
                e = this._right.evaluate();
              if (null === t || null === e) return null;
              if (this._op === o.Add)
                return "string" === this._expType
                  ? t.toString() + e.toString()
                  : "number" === this._expType
                  ? t + e
                  : "vector3" === this._expType
                  ? t.add(e)
                  : "vector2" === this._expType
                  ? t.add(e)
                  : null;
              if (this._op === o.Subtract)
                return "number" === this._expType
                  ? t - e
                  : "vector3" === this._expType
                  ? t.subtract(e)
                  : "vector2" === this._expType
                  ? t.subtract(e)
                  : null;
              if (this._op === o.Multiply) {
                if ("number" === this._expType) return t * e;
                if ("vector3" === this._expType)
                  return "number" == typeof t
                    ? e.multiplyByFloats(t, t, t)
                    : "number" == typeof e
                    ? t.multiplyByFloats(e, e, e)
                    : null;
                if ("vector2" === this._expType)
                  return "number" == typeof t
                    ? e.multiplyByFloats(t, t)
                    : "number" == typeof e
                    ? t.multiplyByFloats(e, e)
                    : null;
              } else {
                if (this._op !== o.Divide) {
                  if (this._op === o.Modulo)
                    return "number" == typeof t && "number" == typeof e
                      ? t % e
                      : null;
                  if (this._op === o.Power)
                    return "number" == typeof t && "number" == typeof e
                      ? Math.pow(t, e)
                      : null;
                  if (this._op === o.And) {
                    var r = this.getBoolean(t),
                      i = this.getBoolean(e);
                    return r && i;
                  }
                  if (this._op !== o.Or)
                    return this._op === o.LT
                      ? t < e
                      : this._op === o.LT_EQ
                      ? t <= e
                      : this._op === o.GT_EQ
                      ? e <= t
                      : this._op === o.GT
                      ? e < t
                      : this._op === o.EQ
                      ? t === e
                      : this._op === o.NEQ
                      ? t !== e
                      : this._op === o.Not
                      ? !this.getBoolean(e)
                      : !this.getBoolean(t);
                  (r = this.getBoolean(t)), (i = this.getBoolean(e));
                  return r || i;
                }
                if ("number" === this._expType) return t / e;
                if ("vector3" === this._expType)
                  return "number" == typeof e
                    ? new BABYLON.Vector3(t.x / e, t.y / e, t.z / e)
                    : null;
                if ("vector2" === this._expType)
                  return "number" == typeof e
                    ? new BABYLON.Vector2(t.x / e, t.y / e)
                    : null;
              }
            }),
            (r.prototype.getBoolean = function(t) {
              return "number" == typeof t
                ? 0 !== t
                : "string" == typeof t
                ? "" !== t
                : "boolean" == typeof t && t;
            }),
            (r.prototype.getPriority = function() {
              var t = r._priority.GetValue(this._op);
              return null === t ? 100 : t;
            }),
            (r.prototype.getPriorityOp = function(t) {
              var e = r._priority.GetValue(t);
              return null === e ? 100 : e;
            }),
            (r._opDic = {}),
            (r._priority = new i.Dictionary()),
            r
          );
        })();
        (r.BinaryExpression = u).init();
      },
      { "../utility/dictionary": 67 }
    ],
    21: [
      function(t, e, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", { value: !0 });
        var i = (function() {
          function t() {
            (this.itemBuffer = []),
              (this.endReached = !1),
              (this.problemCollector = []),
              (this.endOfInputIndicator = void 0);
          }
          return (
            (t.prototype.next = function() {
              return this.nextOffset(1);
            }),
            (t.prototype.nextOffset = function(t) {
              for (; this.itemBuffer.length <= t && !this.endReached; ) {
                var e = this.fetch();
                void 0 !== e ? this.itemBuffer.push(e) : (this.endReached = !0);
              }
              return t >= this.itemBuffer.length
                ? (void 0 === this.endOfInputIndicator &&
                    (this.endOfInputIndicator = this.endOfInput()),
                  this.endOfInputIndicator)
                : this.itemBuffer[t];
            }),
            (t.prototype.current = function() {
              return this.nextOffset(0);
            }),
            (t.prototype.consume = function() {
              var t = this.current();
              return this.consumeNext(1), t;
            }),
            (t.prototype.consumeNext = function(t) {
              if (!(t < 0))
                for (; 0 < t--; )
                  if (0 !== this.itemBuffer.length) this.itemBuffer.shift();
                  else {
                    if (this.endReached) return;
                    void 0 === this.fetch() && (this.endReached = !0);
                  }
            }),
            (t.prototype.getProblemCollector = function() {
              return this.problemCollector;
            }),
            (t.prototype.setProblemCollector = function(t) {
              this.problemCollector = t;
            }),
            t
          );
        })();
        r.ForwardQuery = i;
      },
      {}
    ],
    22: [
      function(t, e, r) {
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
            (r.prototype.setFunction = function(t) {
              this._function = t;
            }),
            (r.prototype.addPara = function(t) {
              this._paras.push(t);
            }),
            (r.prototype.paraCount = function() {
              return this._paras.length;
            }),
            (r.prototype.evaluate = function() {
              var t = null;
              try {
                t = this._function.evaluate(this._paras);
              } catch (t) {
                return console.log("自定义函数编译错误，错误信息：" + t), null;
              }
              return t;
            }),
            (r.prototype.clone = function() {
              var t = new r();
              t._function = this._function;
              for (var e = 0; e < this._paras.length; e++)
                t._paras.push(this._paras[e].clone());
              return t;
            }),
            (r.prototype.toString = function() {
              for (
                var t = this._function.className + "(", e = 0;
                e < this._paras.length;
                e++
              )
                t +=
                  0 < e
                    ? "," + this._paras[e].toString()
                    : this._paras[e].toString();
              return t + ")";
            }),
            r
          );
        })();
        r.FunctionExpression = i;
      },
      {}
    ],
    23: [
      function(t, e, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", { value: !0 });
        var n = t("../html"),
          i = (function() {
            function t() {}
            return (
              Object.defineProperty(t.prototype, "expType", {
                get: function() {
                  return "number";
                },
                enumerable: !0,
                configurable: !0
              }),
              Object.defineProperty(t.prototype, "className", {
                get: function() {
                  return "pow";
                },
                enumerable: !0,
                configurable: !0
              }),
              (t.prototype.parameterNumber = function() {
                return 2;
              }),
              (t.prototype.evaluate = function(t) {
                var e = Math.pow(t[0].evaluate(), t[1].evaluate());
                return NaN === e
                  ? void n.ShowError.showError(
                      "表达式编译错误：Pow函数参数错误，参数1类型：" +
                        t[0].expType +
                        "，参数1值：" +
                        t[0].evaluate() +
                        "，参数2类型：" +
                        t[1].expType +
                        "，参数2值：" +
                        t[1].evaluate() +
                        "，请检查！"
                    )
                  : e;
              }),
              t
            );
          })();
        r.Pow = i;
        var o = (function() {
          function t() {}
          return (
            Object.defineProperty(t.prototype, "expType", {
              get: function() {
                return "number";
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(t.prototype, "className", {
              get: function() {
                return "ln";
              },
              enumerable: !0,
              configurable: !0
            }),
            (t.prototype.parameterNumber = function() {
              return 1;
            }),
            (t.prototype.evaluate = function(t) {
              var e = Math.log(t[0].evaluate());
              return NaN === e || e === 1 / 0
                ? void n.ShowError.showError(
                    "表达式编译错误：Ln函数参数错误，参数类型：" +
                      t[0].expType +
                      "，参数值：" +
                      t[0].evaluate() +
                      "，请检查！"
                  )
                : e;
            }),
            t
          );
        })();
        r.Ln = o;
        var a = (function() {
          function t() {}
          return (
            Object.defineProperty(t.prototype, "expType", {
              get: function() {
                return "number";
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(t.prototype, "className", {
              get: function() {
                return "lg";
              },
              enumerable: !0,
              configurable: !0
            }),
            (t.prototype.parameterNumber = function() {
              return 1;
            }),
            (t.prototype.evaluate = function(t) {
              var e = Math.log10(t[0].evaluate());
              return NaN === e || e === 1 / 0
                ? void n.ShowError.showError(
                    "表达式编译错误：Lg函数参数错误，参数类型：" +
                      t[0].expType +
                      "，参数值：" +
                      t[0].evaluate() +
                      "，请检查！"
                  )
                : e;
            }),
            t
          );
        })();
        r.Lg = a;
        var s = (function() {
          function t() {}
          return (
            Object.defineProperty(t.prototype, "expType", {
              get: function() {
                return "number";
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(t.prototype, "className", {
              get: function() {
                return "sqrt";
              },
              enumerable: !0,
              configurable: !0
            }),
            (t.prototype.parameterNumber = function() {
              return 1;
            }),
            (t.prototype.evaluate = function(t) {
              var e = Math.sqrt(t[0].evaluate());
              return NaN === e
                ? void n.ShowError.showError(
                    "表达式编译错误：Sqrt函数参数错误，参数类型：" +
                      t[0].expType +
                      "，参数值：" +
                      t[0].evaluate() +
                      "，请检查！"
                  )
                : e;
            }),
            t
          );
        })();
        r.Sqrt = s;
        var u = (function() {
          function t() {}
          return (
            Object.defineProperty(t.prototype, "expType", {
              get: function() {
                return "number";
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(t.prototype, "className", {
              get: function() {
                return "abs";
              },
              enumerable: !0,
              configurable: !0
            }),
            (t.prototype.parameterNumber = function() {
              return 1;
            }),
            (t.prototype.evaluate = function(t) {
              var e = Math.abs(t[0].evaluate());
              return NaN === e
                ? void n.ShowError.showError(
                    "表达式编译错误：Abs函数参数错误，参数类型：" +
                      t[0].expType +
                      "，参数值：" +
                      t[0].evaluate() +
                      "，请检查！"
                  )
                : e;
            }),
            t
          );
        })();
        r.Abs = u;
        var c = (function() {
          function t() {}
          return (
            Object.defineProperty(t.prototype, "expType", {
              get: function() {
                return "number";
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(t.prototype, "className", {
              get: function() {
                return "random";
              },
              enumerable: !0,
              configurable: !0
            }),
            (t.prototype.parameterNumber = function() {
              return 2;
            }),
            (t.prototype.evaluate = function(t) {
              var e = t[0].evaluate(),
                r = t[1].evaluate() - t[0].evaluate(),
                i = Math.random() * r + e;
              return NaN === i
                ? void n.ShowError.showError(
                    "表达式编译错误：Random函数参数错误，参数1类型：" +
                      t[0].expType +
                      "，参数1值：" +
                      t[0].evaluate() +
                      "，参数2类型：" +
                      t[1].expType +
                      "，参数2值：" +
                      t[1].evaluate() +
                      "，请检查！"
                  )
                : i;
            }),
            t
          );
        })();
        r.Random = c;
        var p = (function() {
          function t() {}
          return (
            Object.defineProperty(t.prototype, "expType", {
              get: function() {
                return "number";
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(t.prototype, "className", {
              get: function() {
                return "round";
              },
              enumerable: !0,
              configurable: !0
            }),
            (t.prototype.parameterNumber = function() {
              return 1;
            }),
            (t.prototype.evaluate = function(t) {
              var e = Math.round(t[0].evaluate());
              return NaN === e
                ? void n.ShowError.showError(
                    "表达式编译错误：Round函数参数错误，参数类型：" +
                      t[0].expType +
                      "，参数值：" +
                      t[0].evaluate() +
                      "，请检查！"
                  )
                : e;
            }),
            t
          );
        })();
        r.Round = p;
        var l = (function() {
          function t() {}
          return (
            Object.defineProperty(t.prototype, "expType", {
              get: function() {
                return "number";
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(t.prototype, "className", {
              get: function() {
                return "sin";
              },
              enumerable: !0,
              configurable: !0
            }),
            (t.prototype.parameterNumber = function() {
              return 1;
            }),
            (t.prototype.evaluate = function(t) {
              var e = Math.sin(t[0].evaluate());
              return NaN === e
                ? void n.ShowError.showError(
                    "表达式编译错误：Sin函数参数错误，参数类型：" +
                      t[0].expType +
                      "，参数值：" +
                      t[0].evaluate() +
                      "，请检查！"
                  )
                : e;
            }),
            t
          );
        })();
        r.Sin = l;
        var h = (function() {
          function t() {}
          return (
            Object.defineProperty(t.prototype, "expType", {
              get: function() {
                return "number";
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(t.prototype, "className", {
              get: function() {
                return "asin";
              },
              enumerable: !0,
              configurable: !0
            }),
            (t.prototype.parameterNumber = function() {
              return 1;
            }),
            (t.prototype.evaluate = function(t) {
              var e = Math.asin(t[0].evaluate());
              return NaN === e
                ? void n.ShowError.showError(
                    "表达式编译错误：ASin函数参数错误，参数类型：" +
                      t[0].expType +
                      "，参数值：" +
                      t[0].evaluate() +
                      "，请检查！"
                  )
                : e;
            }),
            t
          );
        })();
        r.ASin = h;
        var f = (function() {
          function t() {}
          return (
            Object.defineProperty(t.prototype, "expType", {
              get: function() {
                return "number";
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(t.prototype, "className", {
              get: function() {
                return "cos";
              },
              enumerable: !0,
              configurable: !0
            }),
            (t.prototype.parameterNumber = function() {
              return 1;
            }),
            (t.prototype.evaluate = function(t) {
              var e = Math.cos(t[0].evaluate());
              return NaN === e
                ? void n.ShowError.showError(
                    "表达式编译错误：Cos函数参数错误，参数类型：" +
                      t[0].expType +
                      "，参数值：" +
                      t[0].evaluate() +
                      "，请检查！"
                  )
                : e;
            }),
            t
          );
        })();
        r.Cos = f;
        var _ = (function() {
          function t() {}
          return (
            Object.defineProperty(t.prototype, "expType", {
              get: function() {
                return "number";
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(t.prototype, "className", {
              get: function() {
                return "acos";
              },
              enumerable: !0,
              configurable: !0
            }),
            (t.prototype.parameterNumber = function() {
              return 1;
            }),
            (t.prototype.evaluate = function(t) {
              var e = Math.acos(t[0].evaluate());
              return NaN === e
                ? void n.ShowError.showError(
                    "表达式编译错误：ACos函数参数错误，参数类型：" +
                      t[0].expType +
                      "，参数值：" +
                      t[0].evaluate() +
                      "，请检查！"
                  )
                : e;
            }),
            t
          );
        })();
        r.ACos = _;
        var g = (function() {
          function t() {}
          return (
            Object.defineProperty(t.prototype, "expType", {
              get: function() {
                return "number";
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(t.prototype, "className", {
              get: function() {
                return "tan";
              },
              enumerable: !0,
              configurable: !0
            }),
            (t.prototype.parameterNumber = function() {
              return 1;
            }),
            (t.prototype.evaluate = function(t) {
              var e = Math.tan(t[0].evaluate());
              return NaN === e
                ? void n.ShowError.showError(
                    "表达式编译错误：Tan函数参数错误，参数类型：" +
                      t[0].expType +
                      "，参数值：" +
                      t[0].evaluate() +
                      "，请检查！"
                  )
                : e;
            }),
            t
          );
        })();
        r.Tan = g;
        var y = (function() {
          function t() {}
          return (
            Object.defineProperty(t.prototype, "expType", {
              get: function() {
                return "number";
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(t.prototype, "className", {
              get: function() {
                return "atan";
              },
              enumerable: !0,
              configurable: !0
            }),
            (t.prototype.parameterNumber = function() {
              return 1;
            }),
            (t.prototype.evaluate = function(t) {
              var e = Math.atan(t[0].evaluate());
              return NaN === e
                ? void n.ShowError.showError(
                    "表达式编译错误：ATan函数参数错误，参数类型：" +
                      t[0].expType +
                      "，参数值：" +
                      t[0].evaluate() +
                      "，请检查！"
                  )
                : e;
            }),
            t
          );
        })();
        r.ATan = y;
        var d = (function() {
          function t() {}
          return (
            (t.hasFunction = function(t) {
              return (t = t.toLowerCase()), !!this._functions[t];
            }),
            (t.addFunction = function(t) {
              var e = t.className.toLowerCase();
              this._functions[e]
                ? n.ShowError.showError(
                    "自定义函数初始化错误，函数ID重复，当前函数ID：" +
                      e +
                      "，请为当前自定义函数重新分配ID！"
                  )
                : (this._functions[e] = t);
            }),
            (t.createFunction = function(t) {
              return (t = t.toLowerCase()), Object.create(this._functions[t]);
            }),
            (t.remove = function(t) {
              (t = t.toLowerCase()), delete this._functions[t];
            }),
            (t._functions = {}),
            t
          );
        })();
        (r.CustomFunctions = d).addFunction(new i()),
          d.addFunction(new o()),
          d.addFunction(new a()),
          d.addFunction(new s()),
          d.addFunction(new u()),
          d.addFunction(new c()),
          d.addFunction(new p()),
          d.addFunction(new l()),
          d.addFunction(new h()),
          d.addFunction(new f()),
          d.addFunction(new _()),
          d.addFunction(new g()),
          d.addFunction(new y());
      },
      { "../html": 37 }
    ],
    24: [
      function(t, e, r) {
        "use strict";
        function i(t) {
          for (var e in t) r.hasOwnProperty(e) || (r[e] = t[e]);
        }
        Object.defineProperty(r, "__esModule", { value: !0 }),
          i(t("./expressionEnum")),
          i(t("./expressions")),
          i(t("./functions")),
          i(t("./positions")),
          i(t("./expChar")),
          i(t("./token")),
          i(t("./forwardQuery")),
          i(t("./tokenizer")),
          i(t("./tokenReader")),
          i(t("./variable")),
          i(t("./variableExpression")),
          i(t("./scope")),
          i(t("./functionExpression")),
          i(t("./expressionParsing")),
          i(t("./expManager")),
          i(t("./veryExpressions"));
      },
      {
        "./expChar": 16,
        "./expManager": 17,
        "./expressionEnum": 18,
        "./expressionParsing": 19,
        "./expressions": 20,
        "./forwardQuery": 21,
        "./functionExpression": 22,
        "./functions": 23,
        "./positions": 25,
        "./scope": 26,
        "./token": 27,
        "./tokenReader": 28,
        "./tokenizer": 29,
        "./variable": 30,
        "./variableExpression": 31,
        "./veryExpressions": 32
      }
    ],
    25: [
      function(t, e, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", { value: !0 });
        var n,
          i,
          o = (function() {
            function t(t) {
              (this._value = ""),
                (this._line = 0),
                (this._pos = 0),
                (this._value = t),
                (this._line = 1),
                (this._pos = 1);
            }
            return (
              (t.prototype.getValue = function() {
                return this._value;
              }),
              (t.prototype.getLine = function() {
                return this._line;
              }),
              (t.prototype.getPos = function() {
                return this._pos;
              }),
              t
            );
          })();
        (r.NameLocation = o),
          ((i = n = r.SeverityExp || (r.SeverityExp = {}))[(i.Warning = 0)] =
            "Warning"),
          (i[(i.Error = 1)] = "Error");
        var a = (function() {
          function i(t, e, r) {
            (this._pos = t), (this._message = e), (this._severity = r);
          }
          return (
            (i.Warning = function(t, e) {
              var r = e;
              return (
                0 < t.getLine() &&
                  (r =
                    "警告>>>行号：" +
                    t.getLine() +
                    "，字符序号：" +
                    t.getPos() +
                    "，警告信息：" +
                    e),
                new i(t, r, n.Warning)
              );
            }),
            (i.Error = function(t, e) {
              var r = e;
              return (
                0 < t.getLine() &&
                  (r =
                    "错误>>>行号：" +
                    t.getLine() +
                    "，字符序号：" +
                    t.getPos() +
                    "，警告信息：" +
                    e),
                new i(t, r, n.Error)
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
    26: [
      function(t, e, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", { value: !0 });
        var n = t("./variable"),
          i = (function() {
            function r() {
              (this._parent = void 0), (this._context = {});
            }
            return (
              (r.Create = function() {
                var t = new r();
                return (t._parent = r.GetRootScope()), t;
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
              (r.CreateWithParent = function(t) {
                var e = r.Create();
                return (e._parent = t), e;
              }),
              (r.prototype.find = function(t) {
                return this._context[t]
                  ? this._context[t]
                  : void 0 !== this._parent
                  ? this._parent.find(t)
                  : null;
              }),
              (r.prototype.setVariable = function(t, e, r) {
                var i = this.find(t);
                return null !== i
                  ? (i.setType(e), i.setValue(r), i)
                  : this.createVariable(t, e, r);
              }),
              (r.prototype.createVariable = function(t, e, r) {
                if (this._context[t])
                  return (
                    this._context[t].setType(e),
                    this._context[t].setValue(r),
                    this._context[t]
                  );
                var i = new n.Variable(t, e, r);
                return (this._context[t] = i);
              }),
              (r.prototype.setValue = function(t, e) {
                this._context[t] && this._context[t].setValue(e);
              }),
              (r.prototype.isCreated = function(t) {
                return (
                  !!this._context[t] ||
                  (void 0 !== this._parent && null !== this._parent.find(t))
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
      { "./variable": 30 }
    ],
    27: [
      function(t, e, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", { value: !0 });
        var n = t("./expressionEnum"),
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
              (i.Create = function(t, e) {
                var r = new i();
                return (
                  (r.type = t),
                  (r._line = e.getLine()),
                  (r._pos = e.getPos()),
                  r
                );
              }),
              (i.CreateAndFill = function(t, e) {
                var r = new i();
                return (
                  (r.type = t),
                  (r._line = e.getLine()),
                  (r._pos = e.getPos()),
                  (r._contents = e.getValue()),
                  (r._trigger = e.getValue()),
                  (r._source = e.toString()),
                  r
                );
              }),
              (i.prototype.addToTrigger = function(t) {
                return (
                  (this._trigger += t.getValue()),
                  (this._source += t.getValue()),
                  this
                );
              }),
              (i.prototype.addToSource = function(t) {
                return (this._source += t.getValue()), this;
              }),
              (i.prototype.addToContentChar = function(t) {
                return this.addToContent(t.getValue()), this;
              }),
              (i.prototype.addToContent = function(t) {
                return (this._contents += t), (this._source += t), this;
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
              (i.prototype.setTokenType = function(t) {
                this.type = t;
              }),
              (i.prototype.setTrigger = function(t) {
                this._trigger = t;
              }),
              (i.prototype.setContent = function(t) {
                this._contents = t;
              }),
              (i.prototype.setSource = function(t) {
                this._source = t;
              }),
              (i.prototype.isEnd = function() {
                return this.type === n.ExpressionType.EOI;
              }),
              (i.prototype.is = function(t) {
                return this.type === t;
              }),
              (i.prototype.matches = function(t, e) {
                return !!this.is(t) && ("" !== e && this.getTrigger() === e);
              }),
              (i.prototype.isOperator = function(t) {
                if (0 === t.length) return this.is(n.ExpressionType.OPERATOR);
                for (var e = 0; e < t.length; e++)
                  if (this.matches(n.ExpressionType.OPERATOR, t[e])) return !0;
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
                for (var t = [], e = 0; e < arguments.length; e++)
                  t[e] = arguments[e];
                if (0 === t.length) return this.is(n.ExpressionType.KEYWORD);
                for (var r = 0; r < t.length; r++)
                  if (this.matches(n.ExpressionType.KEYWORD, t[r])) return !0;
                return !1;
              }),
              (i.prototype.isIdentifier = function() {
                for (var t = [], e = 0; e < arguments.length; e++)
                  t[e] = arguments[e];
                if (0 === t.length) return this.is(n.ExpressionType.ID);
                for (var r = 0; r < t.length; r++)
                  if (this.matches(n.ExpressionType.ID, t[r])) return !0;
                return !1;
              }),
              (i.prototype.isSpecialIdentifier = function() {
                for (var t = [], e = 0; e < arguments.length; e++)
                  t[e] = arguments[e];
                if (0 === t.length) return this.is(n.ExpressionType.SPECIAL_ID);
                for (var r = 0; r < t.length; r++)
                  if (this.matches(n.ExpressionType.SPECIAL_ID, t[r]))
                    return !0;
                return !1;
              }),
              (i.prototype.isSpecialIdentifierWithContent = function(t) {
                for (var e = [], r = 1; r < arguments.length; r++)
                  e[r - 1] = arguments[r];
                if (!this.matches(n.ExpressionType.SPECIAL_ID, t)) return !1;
                if (0 === e.length) return !0;
                for (var i = 0; i < e.length; i++)
                  if (this.getContents() === e[i]) return !0;
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
      { "./expressionEnum": 18 }
    ],
    28: [
      function(t, e, r) {
        "use strict";
        var i,
          n =
            (this && this.__extends) ||
            ((i = function(t, e) {
              return (i =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                  function(t, e) {
                    t.__proto__ = e;
                  }) ||
                function(t, e) {
                  for (var r in e) e.hasOwnProperty(r) && (t[r] = e[r]);
                })(t, e);
            }),
            function(t, e) {
              function r() {
                this.constructor = t;
              }
              i(t, e),
                (t.prototype =
                  null === e
                    ? Object.create(e)
                    : ((r.prototype = e.prototype), new r()));
            });
        Object.defineProperty(r, "__esModule", { value: !0 });
        var o = t("./forwardQuery"),
          a = t("./expChar"),
          s = (function(r) {
            function t(t) {
              var e = r.call(this) || this;
              return (
                (e._inputExp = ""),
                (e._line = 1),
                (e._pos = 0),
                (e._count = 0),
                (e._operator = 0),
                (e._inputExp = t),
                (e._count = t.length),
                (e._operator = 0),
                e
              );
            }
            return (
              n(t, r),
              (t.prototype.endOfInput = function() {
                return new a.ExpChar("\0", this._line, this._pos);
              }),
              (t.prototype.fetch = function() {
                if (this._operator <= this._count - 1) {
                  var t = this._inputExp[this._operator];
                  return (
                    this._operator++,
                    "\n" === t && (this._line++, (this._pos = 0)),
                    this._pos++,
                    new a.ExpChar(t, this._line, this._pos)
                  );
                }
              }),
              (t.prototype.toString = function() {
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
              t
            );
          })(o.ForwardQuery);
        r.TokenReader = s;
      },
      { "./expChar": 16, "./forwardQuery": 21 }
    ],
    29: [
      function(t, e, r) {
        "use strict";
        var i,
          n =
            (this && this.__extends) ||
            ((i = function(t, e) {
              return (i =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                  function(t, e) {
                    t.__proto__ = e;
                  }) ||
                function(t, e) {
                  for (var r in e) e.hasOwnProperty(r) && (t[r] = e[r]);
                })(t, e);
            }),
            function(t, e) {
              function r() {
                this.constructor = t;
              }
              i(t, e),
                (t.prototype =
                  null === e
                    ? Object.create(e)
                    : ((r.prototype = e.prototype), new r()));
            });
        Object.defineProperty(r, "__esModule", { value: !0 });
        var o = t("./forwardQuery"),
          a = t("./token"),
          s = t("./tokenReader"),
          u = t("./expressionEnum"),
          c = t("./positions"),
          p = (function(r) {
            function t(t) {
              var e = r.call(this) || this;
              return (
                (e._decimalSeparator = "."),
                (e._lineComment = "//"),
                (e._blockCommentStart = "/*"),
                (e._blockCommentEnd = "*/"),
                (e._brackets = [
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
                (e._treatSinglePipeAsBracket = !0),
                (e._specialIdStarters = []),
                (e._specialIdTerminators = []),
                (e._keywords = {}),
                (e._keywordsCaseSensitive = !1),
                (e._stringDelimiters = {}),
                (e._boolConstant = []),
                (e._inputExp = new s.TokenReader(t)),
                (e._stringDelimiters = {}),
                (e._stringDelimiters['"'] = "\\"),
                (e._stringDelimiters["'"] = "\0"),
                (e._boolConstant = []),
                e._boolConstant.push("false"),
                e._boolConstant.push("true"),
                (e._keywords = {}),
                (e._keywords.this = "this"),
                (e._keywords.null = "null"),
                (e._keywords.none = "none"),
                (e._keywords[void 0] = "undefined"),
                e
              );
            }
            return (
              n(t, r),
              (t.prototype.endOfInput = function() {
                return a.Token.CreateAndFill(
                  u.ExpressionType.EOI,
                  this._inputExp.current()
                );
              }),
              (t.prototype.fetch = function() {
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
                        c.ParseError.Error(
                          this._inputExp.current(),
                          "无效的输入字符: " +
                            this._inputExp.current().getValue()
                        )
                      ),
                      this._inputExp.consume(),
                      this.fetch());
              }),
              (t.prototype.fetchNumber = function() {
                var t = a.Token.Create(
                  u.ExpressionType.NUMBER,
                  this._inputExp.current()
                );
                t.addToContentChar(this._inputExp.consume());
                for (
                  var e = !1;
                  this._inputExp.current().isDigit() ||
                  this._inputExp.current().is(this._decimalSeparator);

                )
                  this._inputExp.current().is(this._decimalSeparator) &&
                    (e &&
                      this.problemCollector.push(
                        c.ParseError.Error(
                          this._inputExp.current(),
                          "公式中有多个小数点！"
                        )
                      ),
                    (e = !0)),
                    t.addToContentChar(this._inputExp.consume());
                return t;
              }),
              (t.prototype.fetchId = function() {
                var t = a.Token.Create(
                  u.ExpressionType.ID,
                  this._inputExp.current()
                );
                for (
                  t.addToContentChar(this._inputExp.consume());
                  this.isIdentifierChar(this._inputExp.current());

                )
                  t.addToContentChar(this._inputExp.consume());
                if (
                  !this._inputExp.current().isEndOfInput() &&
                  -1 <
                    this._specialIdTerminators.indexOf(
                      this._inputExp.current().getValue()
                    )
                ) {
                  var e = a.Token.Create(u.ExpressionType.SPECIAL_ID, t);
                  return (
                    e.setTrigger(this._inputExp.current().getValue()),
                    e.setContent(t.getContents()),
                    e.setSource(t.getContents()),
                    e.addToSource(this._inputExp.current()),
                    this._inputExp.consume(),
                    this.handleKeywords(e)
                  );
                }
                return this.handleKeywords(t);
              }),
              (t.prototype.fetchString = function() {
                var t = this._inputExp.current().getValue(),
                  e = a.Token.Create(
                    u.ExpressionType.STRING,
                    this._inputExp.current()
                  );
                for (
                  e.addToTrigger(this._inputExp.consume());
                  !this._inputExp.current().isNewLine() &&
                  !this._inputExp.current().is(t) &&
                  !this._inputExp.current().isEndOfInput();

                )
                  e.addToContentChar(this._inputExp.consume());
                return (
                  this._inputExp.current().is(t)
                    ? e.addToSource(this._inputExp.consume())
                    : this.problemCollector.push(
                        c.ParseError.Error(
                          this._inputExp.current(),
                          "常量字符串没有结束分隔符！"
                        )
                      ),
                  e
                );
              }),
              (t.prototype.isAtStartOfLineComment = function(t) {
                return (
                  "" !== this._lineComment &&
                  this.canConsumeThisString(this._lineComment, t)
                );
              }),
              (t.prototype.canConsumeThisString = function(t, e) {
                for (var r = 0; r < t.length; r++)
                  if (!this._inputExp.nextOffset(r).is(t[r])) return !1;
                return e && this._inputExp.consumeNext(t.length), !0;
              }),
              (t.prototype.skipToEndOfLine = function() {
                for (
                  ;
                  !this._inputExp.current().isEndOfInput() &&
                  !this._inputExp.current().isNewLine();

                )
                  this._inputExp.consume();
              }),
              (t.prototype.isAtStartOfBlockComment = function(t) {
                return this.canConsumeThisString(this._blockCommentStart, t);
              }),
              (t.prototype.skipBlockComment = function() {
                for (; !this._inputExp.current().isEndOfInput(); ) {
                  if (this.isAtEndOfBlockComment()) return;
                  this._inputExp.consume();
                }
                this.problemCollector.push(
                  c.ParseError.Error(
                    this._inputExp.current(),
                    "块注释没有结束符！"
                  )
                );
              }),
              (t.prototype.isAtEndOfBlockComment = function() {
                return this.canConsumeThisString(this._blockCommentEnd, !0);
              }),
              (t.prototype.isAtStartOfNumber = function() {
                return (
                  !!this._inputExp.current().isDigit() ||
                  !(
                    !this._inputExp.current().is(".") ||
                    !this._inputExp.next().isDigit()
                  )
                );
              }),
              (t.prototype.isAtStartOfIdentifier = function() {
                return (
                  this._inputExp.current().isLetter() ||
                  this._inputExp.current().is("_") ||
                  this._inputExp.current().is("#")
                );
              }),
              (t.prototype.isIdentifierChar = function(t) {
                return (
                  t.isDigit() ||
                  t.isLetter() ||
                  t.is("_") ||
                  t.is(".") ||
                  t.is("#") ||
                  t.is(":") ||
                  t.is("：")
                );
              }),
              (t.prototype.isAtBracket = function(t) {
                for (var e = !0, r = 0; r < this._brackets.length; r++)
                  this._inputExp.current().is(this._brackets[r]) || (e = !1);
                return (
                  !!e ||
                  !(
                    t ||
                    !this._treatSinglePipeAsBracket ||
                    !this._inputExp.current().is("|") ||
                    !this._inputExp.next().is("|")
                  )
                );
              }),
              (t.prototype.isAtStartOfSpecialId = function() {
                return (
                  -1 <
                  this._specialIdStarters.indexOf(
                    this._inputExp.current().getValue()
                  )
                );
              }),
              (t.prototype.fetchSpecialId = function() {
                var t = a.Token.Create(
                  u.ExpressionType.SPECIAL_ID,
                  this._inputExp.current()
                );
                for (
                  t.addToTrigger(this._inputExp.consume());
                  this.isIdentifierChar(this._inputExp.current());

                )
                  t.addToContentChar(this._inputExp.consume());
                return this.handleKeywords(t);
              }),
              (t.prototype.handleKeywords = function(t) {
                var e = "";
                if (
                  (this._keywordsCaseSensitive
                    ? this._keywords[t.getContents()] &&
                      (e = this._keywords[t.getContents()])
                    : this._keywords[t.getContents().toLowerCase()] &&
                      (e = this._keywords[t.getContents().toLowerCase()]),
                  "" == e)
                )
                  return (
                    t.is(u.ExpressionType.SPECIAL_ID) ||
                      ((e = t.getContents().toLowerCase()),
                      -1 < this._boolConstant.indexOf(e) &&
                        t.setTokenType(u.ExpressionType.BOOL)),
                    t
                  );
                var r = a.Token.Create(u.ExpressionType.KEYWORD, t);
                return (
                  r.setTrigger(e),
                  r.setContent(t.getContents()),
                  r.setSource(t.getSource()),
                  r
                );
              }),
              (t.prototype.isOperator = function(t) {
                return (
                  !(
                    t.isEndOfInput() ||
                    t.isDigit() ||
                    t.isLetter() ||
                    t.isWhiteSpace()
                  ) &&
                  !(
                    this.isAtBracket(!0) ||
                    this.isAtStartOfBlockComment(!1) ||
                    this.isAtStartOfLineComment(!1) ||
                    this.isAtStartOfNumber() ||
                    this.isAtStartOfIdentifier() ||
                    this._stringDelimiters[t.getValue()]
                  )
                );
              }),
              (t.prototype.fetchOperator = function() {
                var t = a.Token.Create(
                  u.ExpressionType.OPERATOR,
                  this._inputExp.current()
                );
                return (
                  t.addToTrigger(this._inputExp.consume()),
                  t.isOperator("*") && this._inputExp.current().is("*")
                    ? t.addToTrigger(this._inputExp.consume())
                    : t.isOperator("&") && this._inputExp.current().is("&")
                    ? t.addToTrigger(this._inputExp.consume())
                    : t.isOperator("|") && this._inputExp.current().is("|")
                    ? t.addToTrigger(this._inputExp.consume())
                    : t.isOperator("<") && this._inputExp.current().is("=")
                    ? t.addToTrigger(this._inputExp.consume())
                    : t.isOperator(">") && this._inputExp.current().is("=")
                    ? t.addToTrigger(this._inputExp.consume())
                    : t.isOperator("!") && this._inputExp.current().is("=")
                    ? t.addToTrigger(this._inputExp.consume())
                    : t.isOperator("=") &&
                      this._inputExp.current().is("=") &&
                      t.addToTrigger(this._inputExp.consume()),
                  t
                );
              }),
              (t.prototype.addError = function(t, e) {
                this.getProblemCollector().push(c.ParseError.Error(t, e));
              }),
              (t.prototype.addWarning = function(t, e) {
                this.getProblemCollector().push(c.ParseError.Warning(t, e));
              }),
              t
            );
          })(o.ForwardQuery);
        r.Tokenizer = p;
      },
      {
        "./expressionEnum": 18,
        "./forwardQuery": 21,
        "./positions": 25,
        "./token": 27,
        "./tokenReader": 28
      }
    ],
    30: [
      function(t, e, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", { value: !0 });
        var i = (function() {
          function t(t, e, r) {
            (this._expType = "string"),
              (this._value = null),
              (this._name = ""),
              (this._constant = !1),
              (this._name = t),
              (this._expType = e),
              (this._value = r);
          }
          return (
            Object.defineProperty(t.prototype, "expType", {
              get: function() {
                return this._expType;
              },
              enumerable: !0,
              configurable: !0
            }),
            (t.prototype.setType = function(t) {
              this._constant || (this._expType = t);
            }),
            (t.prototype.setValue = function(t) {
              this._constant || (this._value = t);
            }),
            (t.prototype.makeConstant = function(t) {
              this.setValue(t), (this._constant = !0);
            }),
            (t.prototype.getValue = function() {
              return this._value;
            }),
            (t.prototype.getName = function() {
              return this._name;
            }),
            (t.prototype.isConstant = function() {
              return this._constant;
            }),
            (t.prototype.toString = function() {
              return (
                "Type: " +
                this._expType +
                " --- " +
                this._name +
                ": " +
                this._value.toString()
              );
            }),
            t
          );
        })();
        r.Variable = i;
      },
      {}
    ],
    31: [
      function(t, e, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", { value: !0 });
        var i = (function() {
          function t(t) {
            this._value = t;
          }
          return (
            Object.defineProperty(t.prototype, "expType", {
              get: function() {
                return this._value.expType;
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(t.prototype, "className", {
              get: function() {
                return "VariableExpression";
              },
              enumerable: !0,
              configurable: !0
            }),
            (t.prototype.evaluate = function() {
              return this._value.getValue();
            }),
            (t.prototype.toString = function() {
              return this._value.getName();
            }),
            (t.prototype.clone = function() {
              return new t(this._value);
            }),
            t
          );
        })();
        r.VariableExpression = i;
      },
      {}
    ],
    32: [
      function(t, e, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", { value: !0 });
        var i = t("./scope"),
          n = (function() {
            function t() {}
            return (t._scope = i.Scope.Create()), t;
          })();
        (r.VE_Expressions = n), console.log(n._scope);
      },
      { "./scope": 26 }
    ],
    33: [
      function(t, e, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", { value: !0 });
        var n = t("../enum"),
          i = (function() {
            function i(t, e, r, i) {
              (this._pos = ""),
                (this._message = ""),
                (this._tableName = ""),
                (this._severity = n.Severity.Error),
                (this._pos = t),
                (this._message = e),
                (this._severity = i),
                (this._tableName = r);
            }
            return (
              (i.warning = function(t, e, r) {
                return new i(t, e, r, n.Severity.Warning);
              }),
              (i.error = function(t, e, r) {
                return new i(t, e, r, n.Severity.Error);
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
          function t() {}
          return (
            Object.defineProperty(t, "count", {
              get: function() {
                return this._errorList.length;
              },
              enumerable: !0,
              configurable: !0
            }),
            (t.add = function(t) {
              this._errorList.push(t);
            }),
            (t.getError = function(t) {
              return this._errorList[t];
            }),
            (t.print = function(t) {
              if (t)
                for (var e = 0; e < this._errorList.length; e++)
                  this._errorList[e].getSeverity() === n.Severity.Error
                    ? (console.log(
                        "错误：" + t + " -> " + this._errorList[e].toString()
                      ),
                      this._errorList.splice(e, 1),
                      e--)
                    : this._errorList[e].getSeverity() === n.Severity.Warning &&
                      (console.log(
                        "警告：" + t + " -> " + this._errorList[e].toString()
                      ),
                      this._errorList.splice(e, 1),
                      e--);
              else
                for (e = 0; e < this._errorList.length; e++)
                  this._errorList[e].getSeverity() === n.Severity.Error
                    ? (console.log("错误：" + this._errorList[e].toString()),
                      this._errorList.splice(e, 1),
                      e--)
                    : this._errorList[e].getSeverity() === n.Severity.Warning &&
                      (console.log("警告：" + this._errorList[e].toString()),
                      this._errorList.splice(e, 1),
                      e--);
            }),
            (t.printWarnning = function(t) {
              if (t)
                for (var e = 0; e < this._errorList.length; e++)
                  this._errorList[e].getSeverity() === n.Severity.Warning &&
                    (console.log(
                      "警告：" + t + " -> " + this._errorList[e].toString()
                    ),
                    this._errorList.splice(e, 1),
                    e--);
              else
                for (e = 0; e < this._errorList.length; e++)
                  this._errorList[e].getSeverity() === n.Severity.Warning &&
                    (console.log("警告：" + this._errorList[e].toString()),
                    this._errorList.splice(e, 1),
                    e--);
            }),
            (t.printError = function(t) {
              if (t)
                for (var e = 0; e < this._errorList.length; e++)
                  this._errorList[e].getSeverity() === n.Severity.Error &&
                    (console.log(
                      "错误：" + t + " -> " + this._errorList[e].toString()
                    ),
                    this._errorList.splice(e, 1),
                    e--);
              else
                for (e = 0; e < this._errorList.length; e++)
                  this._errorList[e].getSeverity() === n.Severity.Error &&
                    (console.log(
                      "错误：" + t + " -> " + this._errorList[e].toString()
                    ),
                    this._errorList.splice(e, 1),
                    e--);
            }),
            (t._errorList = []),
            t
          );
        })();
        r.VE_ErrorManager = o;
      },
      { "../enum": 15 }
    ],
    34: [
      function(t, e, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", { value: !0 });
        var i = function() {};
        r.GameGlobal = i;
      },
      {}
    ],
    35: [
      function(t, e, r) {
        "use strict";
        function i(t) {
          for (var e in t) r.hasOwnProperty(e) || (r[e] = t[e]);
        }
        Object.defineProperty(r, "__esModule", { value: !0 }),
          i(t("./gameGlobal")),
          i(t("./time")),
          i(t("./errorManager"));
      },
      { "./errorManager": 33, "./gameGlobal": 34, "./time": 36 }
    ],
    36: [
      function(t, e, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", { value: !0 });
        var i = t("../veryEngine"),
          n = (function() {
            function t() {}
            return (
              Object.defineProperty(t, "frameCount", {
                get: function() {
                  return this._frame;
                },
                enumerable: !0,
                configurable: !0
              }),
              Object.defineProperty(t, "deltaTime", {
                get: function() {
                  return i.VeryEngine.Engine.getDeltaTime() / 1e3;
                },
                enumerable: !0,
                configurable: !0
              }),
              (t._sum = function() {
                this._frame++;
              }),
              (t._frame = 0),
              t
            );
          })();
        r.Time = n;
      },
      { "../veryEngine": 76 }
    ],
    37: [
      function(t, e, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", { value: !0 }),
          (function(t) {
            for (var e in t) r.hasOwnProperty(e) || (r[e] = t[e]);
          })(t("./showError"));
      },
      { "./showError": 38 }
    ],
    38: [
      function(t, e, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", { value: !0 });
        var i = (function() {
          function r() {}
          return (
            (r.initZone = function() {
              this.errorZone ||
                (this.errorZone = document.getElementById("errorZone"));
            }),
            (r.showMsg = function(t, e) {
              this.initZone(),
                this.errorContentNow ||
                  (this.errorContentNow = this.errorContentPrefix),
                (this.errorContentNow += t + e + "<br/>"),
                (this.errorZone.style.display = "block"),
                (this.errorZone.innerHTML = this.errorContentNow + "</div>");
              var r = this.errorZone.querySelector(".close"),
                i = this;
              r.addEventListener("click", function() {
                i.errorZone.style.display = "none";
              });
            }),
            (r.show = function(t) {
              this.showMsg("打印信息>>>", t);
            }),
            (r.showError = function(t) {
              this.showMsg("错误信息>>>", t);
            }),
            (r.showWarn = function(t) {
              this.showMsg("警告信息>>>", t);
            }),
            (r.clear = function() {
              r.initZone(),
                (r.errorContentNow = r.errorContentPrefix),
                (r.errorZone.innerHTML = r.errorContentNow + "</div>");
              var t = r.errorZone.querySelector(".close"),
                e = r;
              t.addEventListener("click", function() {
                e.errorZone.style.display = "none";
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
    39: [
      function(t, e, r) {
        "use strict";
        function i(t) {
          for (var e in t) r.hasOwnProperty(e) || (r[e] = t[e]);
        }
        Object.defineProperty(r, "__esModule", { value: !0 }),
          i(t("./utility/index")),
          i(t("./action/index")),
          i(t("./dataSource/index")),
          i(t("./enum/index")),
          i(t("./expression/index")),
          i(t("./global/index")),
          i(t("./html/index")),
          i(t("./manager/index")),
          i(t("./object/index")),
          i(t("./state/index")),
          i(t("./template/index")),
          i(t("./trigger/index")),
          i(t("./loader/index")),
          i(t("./variables/index")),
          i(t("../verytable/index")),
          i(t("./library/action/index")),
          i(t("./library/trigger/index"));
      },
      {
        "../verytable/index": 77,
        "./action/index": 6,
        "./dataSource/index": 9,
        "./enum/index": 15,
        "./expression/index": 24,
        "./global/index": 35,
        "./html/index": 37,
        "./library/action/index": 40,
        "./library/trigger/index": 42,
        "./loader/index": 45,
        "./manager/index": 47,
        "./object/index": 51,
        "./state/index": 56,
        "./template/index": 60,
        "./trigger/index": 63,
        "./utility/index": 69,
        "./variables/index": 72
      }
    ],
    40: [
      function(t, e, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", { value: !0 }),
          (function(t) {
            for (var e in t) r.hasOwnProperty(e) || (r[e] = t[e]);
          })(t("./translate"));
      },
      { "./translate": 41 }
    ],
    41: [
      function(t, e, r) {
        "use strict";
        var i,
          n =
            (this && this.__extends) ||
            ((i = function(t, e) {
              return (i =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                  function(t, e) {
                    t.__proto__ = e;
                  }) ||
                function(t, e) {
                  for (var r in e) e.hasOwnProperty(r) && (t[r] = e[r]);
                })(t, e);
            }),
            function(t, e) {
              function r() {
                this.constructor = t;
              }
              i(t, e),
                (t.prototype =
                  null === e
                    ? Object.create(e)
                    : ((r.prototype = e.prototype), new r()));
            });
        Object.defineProperty(r, "__esModule", { value: !0 });
        var o = (function(e) {
          function t() {
            var t = (null !== e && e.apply(this, arguments)) || this;
            return (t._refType = BABYLON.Space.LOCAL), t;
          }
          return (
            n(t, e),
            Object.defineProperty(t.prototype, "ID", {
              get: function() {
                return "直线运动|Translate";
              },
              enumerable: !0,
              configurable: !0
            }),
            (t.prototype.active = function() {}),
            (t.prototype.onUpdate = function() {}),
            (t.prototype.destroy = function() {}),
            t
          );
        })(t("../../index").VE_ActionBehaviour);
        r.Action_Translate = o;
      },
      { "../../index": 39 }
    ],
    42: [
      function(t, e, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", { value: !0 }),
          (function(t) {
            for (var e in t) r.hasOwnProperty(e) || (r[e] = t[e]);
          })(t("./input"));
      },
      { "./input": 43 }
    ],
    43: [
      function(t, e, r) {
        "use strict";
        var i,
          n =
            (this && this.__extends) ||
            ((i = function(t, e) {
              return (i =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                  function(t, e) {
                    t.__proto__ = e;
                  }) ||
                function(t, e) {
                  for (var r in e) e.hasOwnProperty(r) && (t[r] = e[r]);
                })(t, e);
            }),
            function(t, e) {
              function r() {
                this.constructor = t;
              }
              i(t, e),
                (t.prototype =
                  null === e
                    ? Object.create(e)
                    : ((r.prototype = e.prototype), new r()));
            });
        Object.defineProperty(r, "__esModule", { value: !0 });
        var o = t("../../index"),
          a = t("../../trigger"),
          s = (function(t) {
            function e() {
              return t.call(this) || this;
            }
            return (
              n(e, t),
              Object.defineProperty(e.prototype, "ID", {
                get: function() {
                  return "鼠标按下|Mouse_Down";
                },
                enumerable: !0,
                configurable: !0
              }),
              (e.prototype.paraParser = function(t) {
                var e = this.scene.onPointerObservable.add(function(t) {});
                return this.scene.onPointerObservable.remove(e), !0;
              }),
              (e.prototype.onUpdate = function() {}),
              (e.prototype.destroy = function() {}),
              e
            );
          })(o.VE_TriggerBehaviour);
        (r.Trigger_MouseDown = s), a.VE_Triggers.addTrigger(new s());
      },
      { "../../index": 39, "../../trigger": 63 }
    ],
    44: [
      function(t, e, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", { value: !0 });
        var u = t("../manager"),
          c = t("../variables"),
          p = t("../utility"),
          l = t("../global"),
          i = (function() {
            function t() {}
            return (
              (t.createProject = function(t) {
                for (
                  var e = u.VE_Manager.templates(t),
                    r = (u.VE_Manager.objects(t), u.VE_Manager.variables(t)),
                    i = 0;
                  i < r.varData.count;
                  i++
                ) {
                  var n = r.varData.getVariableID(i);
                  if (
                    "公式" !== (s = r.varData.getVariableParas(n))[0] &&
                    "expression" !== s[0].toLowerCase()
                  )
                    if (c.VeryVarManager.hasVarType(s[0])) {
                      var o = new p.ErrorInfo(),
                        a = c.VeryVarManager.createVariable(n, s[0], s[1], o);
                      if (null === a)
                        return (
                          l.VE_ErrorManager.add(
                            l.VE_Error.error(
                              r.varData.getPos(n),
                              "项目：" +
                                t +
                                "，全局变量：" +
                                n +
                                "，" +
                                s[0] +
                                "，" +
                                s[1] +
                                "，全局变量创建失败，失败原因：" +
                                o.message +
                                "，请检查！",
                              ""
                            )
                          ),
                          !1
                        );
                      r.addVariable(n, a);
                    } else {
                      if (!e.isCreatedTemplate(s[0]))
                        return (
                          l.VE_ErrorManager.add(
                            l.VE_Error.error(
                              r.varData.getPos(n),
                              "项目：" +
                                t +
                                "，全局变量：" +
                                n +
                                "，" +
                                s[0] +
                                "，" +
                                s[1] +
                                "，全局变量创建失败，当前变量不存在，请检查！",
                              ""
                            )
                          ),
                          !1
                        );
                      r.addTemplate(
                        n,
                        e.getTemplate(s[0]).clone("__global__", n)
                      );
                    }
                }
                for (i = 0; i < r.varData.count; i++) {
                  var s;
                  n = r.varData.getVariableID(i);
                  if (
                    "公式" === (s = r.varData.getVariableParas(n))[0] ||
                    "expression" === s[0].toLowerCase()
                  )
                    o = new p.ErrorInfo();
                }
                return !0;
              }),
              (t.createInstance = function(t, e, r, i, n, o, a) {
                return i;
              }),
              t
            );
          })();
        r.CreateInstance = i;
      },
      {
        "../global": 35,
        "../manager": 47,
        "../utility": 69,
        "../variables": 72
      }
    ],
    45: [
      function(t, e, r) {
        "use strict";
        function i(t) {
          for (var e in t) r.hasOwnProperty(e) || (r[e] = t[e]);
        }
        Object.defineProperty(r, "__esModule", { value: !0 }),
          i(t("./loaderManager")),
          i(t("./createInstance"));
      },
      { "./createInstance": 44, "./loaderManager": 46 }
    ],
    46: [
      function(t, e, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", { value: !0 });
        var P,
          i,
          w = t("../template"),
          A = t("../object"),
          M = t("../dataSource"),
          N = t("../manager"),
          k = t("../variables"),
          L = t("../utility"),
          F = t("../global"),
          B = t("../state"),
          R = t("./createInstance");
        ((i = P = r.AnalisysType || (r.AnalisysType = {}))[(i.Global = 0)] =
          "Global"),
          (i[(i.Object = 1)] = "Object"),
          (i[(i.Template = 2)] = "Template");
        var n = (function() {
          function t() {
            (this._currentType = P.Global),
              (this._projectName = ""),
              (this._lastFsmID = ""),
              (this._activeTemplate = null),
              (this._activeObject = null),
              (this._activeFsmData = null),
              (this._activeStateData = null);
          }
          return (
            (t.prototype.load = function(t, e) {
              (this._projectName = t),
                (this._table = e),
                N.VE_Manager.createProject(t);
              var r = N.VE_Manager.templates(t),
                i = N.VE_Manager.objects(t),
                n = N.VE_Manager.variables(t);
              if (e) {
                for (var o = 0; o < e.RowCount; o++)
                  if (e.getData(o, 0).startsWith("模板_")) {
                    (this._activeFsmData = null),
                      (this._activeStateData = null),
                      (this._currentType = P.Template);
                    var a = e
                      .getData(o, 0)
                      .replace(" ", "")
                      .substring(3);
                    if (-1 < a.indexOf(":") || -1 < a.indexOf("："));
                    else {
                      if (!L.VE_StringFormat.isIDLegal(a))
                        return (
                          F.VE_ErrorManager.add(
                            F.VE_Error.error(
                              e.pos(o, 0),
                              "模板对象名：" +
                                e.getData(o, 0) +
                                "，当前模板对象名不合法，包含非法字符，请检查！",
                              e.ID
                            )
                          ),
                          !1
                        );
                      if (r.isCreatedTemplate(a))
                        return (
                          F.VE_ErrorManager.add(
                            F.VE_Error.error(
                              e.pos(o, 0),
                              "模板对象名：" +
                                e.getData(o, 0) +
                                "，当前模板已创建，请勿使用重复的模板对象名！",
                              e.ID
                            )
                          ),
                          !1
                        );
                      var s = new w.VE_Template(t, a);
                      r.addTemplate(a, s), (this._activeTemplate = s);
                    }
                  } else if ("" !== e.getData(o, 0)) {
                    (this._activeFsmData = null),
                      (this._activeStateData = null),
                      (this._currentType = P.Object);
                    var u = e.getData(o, 0),
                      c = "";
                    if (-1 < u.indexOf("=")) {
                      var p = u.split("=");
                      if (2 !== p.length)
                        return (
                          F.VE_ErrorManager.add(
                            F.VE_Error.error(
                              e.pos(o, 0),
                              "对象名：" +
                                e.getData(o, 0) +
                                "，当前对象名格式错误，应为“对象名”或者“对象名=场景物体名”的形式，请检查！",
                              e.ID
                            )
                          ),
                          !1
                        );
                      (u = p[0].trim()), (c = p[1].trim());
                    }
                    if (!L.VE_StringFormat.isIDLegal(u))
                      return (
                        F.VE_ErrorManager.add(
                          F.VE_Error.error(
                            e.pos(o, 0),
                            "对象名：" +
                              e.getData(o, 0) +
                              "，当前对象名不合法，包含非法字符，请检查！",
                            e.ID
                          )
                        ),
                        !1
                      );
                    var l = null;
                    if ("" === c) l = new k.GameObject("__" + u + "_Empty");
                    else if (null === (l = k.GameObject.find(c)))
                      return (
                        F.VE_ErrorManager.add(
                          F.VE_Error.error(
                            e.pos(o, 0),
                            "对象名：" +
                              c +
                              "，当前对象在场景中不存在，请检查！",
                            e.ID
                          )
                        ),
                        !1
                      );
                    if (i.isCreated(u))
                      return (
                        F.VE_ErrorManager.add(
                          F.VE_Error.error(
                            e.pos(o, 0),
                            "对象名：" +
                              e.getData(o, 0) +
                              "，当前对象已创建，请勿使用重复的对象名！",
                            e.ID
                          )
                        ),
                        !1
                      );
                    var h = new A.VeryEngineObject(t, u, l);
                    i.add(u, h), (this._activeObject = h);
                  } else if (
                    "" !== e.getData(o, 5) &&
                    "" === e.getData(o, 1) &&
                    "" === e.getData(o, 2) &&
                    "" === e.getData(o, 3) &&
                    "" === e.getData(o, 4) &&
                    "" === e.getData(o, 6) &&
                    "" === e.getData(o, 7) &&
                    "" === e.getData(o, 8)
                  ) {
                    var f = e.getData(o, 5);
                    if (this._currentType === P.Global) {
                      if (
                        2 !== (D = L.VE_StringFormat.paraSegment(f)).length &&
                        3 !== D.length
                      )
                        return (
                          F.VE_ErrorManager.add(
                            F.VE_Error.error(
                              e.pos(o, 5),
                              "全局变量：" +
                                e.getData(o, 5) +
                                "，当前全局变量格式不正确，请检查！",
                              e.ID
                            )
                          ),
                          !1
                        );
                      var _ = D[0].trim();
                      if (!L.VE_StringFormat.isIDLegal(_))
                        return (
                          F.VE_ErrorManager.add(
                            F.VE_Error.error(
                              e.pos(o, 5),
                              "全局变量：" +
                                e.getData(o, 5) +
                                "，当前变量名不合法，包含非法字符，请检查！",
                              e.ID
                            )
                          ),
                          !1
                        );
                      var g = [D[1].trim()];
                      if (
                        (2 === D.length ? (g[1] = "") : (g[1] = D[2].trim()),
                        n.varData.isCreatedVariable(_))
                      )
                        return (
                          F.VE_ErrorManager.add(
                            F.VE_Error.error(
                              e.pos(o, 5),
                              "全局变量：" +
                                e.getData(o, 5) +
                                "，当前全局变量名已创建，请检查！",
                              e.ID
                            )
                          ),
                          !1
                        );
                      n.varData.addVariable(_, g, e.pos(o, 5));
                    } else if (-1 < f.indexOf("=")) {
                      if (
                        2 === (g = f.split("=")).length &&
                        g[0].trim() === this._lastFsmID
                      ) {
                        if (null === this._activeFsmData)
                          return (
                            F.VE_ErrorManager.add(
                              F.VE_Error.error(
                                e.pos(o, 5),
                                "状态赋值：" +
                                  e.getData(o, 5) +
                                  "，当前状态不属于任何对象和模板对象，请检查！",
                                e.ID
                              )
                            ),
                            !1
                          );
                        var y = g[1].trim().split(/,|，/),
                          d = B.StateConst.STATE_INDEX,
                          b = null;
                        if (2 === y.length) {
                          if (
                            ((y[0] = y[0].trim()),
                            (y[1] = y[1].trim()),
                            !y[1].startsWith("#"))
                          )
                            return (
                              F.VE_ErrorManager.add(
                                F.VE_Error.error(
                                  e.pos(o, 5),
                                  "状态赋值：" +
                                    e.getData(o, 5) +
                                    "，状态关联ID格式错误，状态关联标志ID写法：“状态ID=赋值，#整数ID”，请检查！",
                                  e.ID
                                )
                              ),
                              !1
                            );
                          if (NaN === (d = parseInt(y[1].substring(1))))
                            return (
                              F.VE_ErrorManager.add(
                                F.VE_Error.error(
                                  e.pos(o, 5),
                                  "状态赋值：" +
                                    e.getData(o, 5) +
                                    "，状态关联ID格式错误，状态关联标志ID写法：“状态ID=赋值，#整数ID”，当前整数转化错误！",
                                  e.ID
                                )
                              ),
                              !1
                            );
                        }
                        (b = new M.VE_StateData(
                          this._activeFsmData,
                          y[0].trim(),
                          !1,
                          d
                        )),
                          this._activeFsmData.addState(b),
                          (this._activeStateData = b);
                      } else {
                        if (3 !== (D = L.VE_StringFormat.paraSegment(f)).length)
                          return (
                            F.VE_ErrorManager.add(
                              F.VE_Error.error(
                                e.pos(o, 5),
                                "局部公式变量：" +
                                  e.getData(o, 5) +
                                  "，当前局部公式变量格式不正确，请检查！",
                                e.ID
                              )
                            ),
                            !1
                          );
                        _ = D[0].trim();
                        if (!L.VE_StringFormat.isIDLegal(_))
                          return (
                            F.VE_ErrorManager.add(
                              F.VE_Error.error(
                                e.pos(o, 5),
                                "变量：" +
                                  e.getData(o, 5) +
                                  "，当前变量名不合法，包含非法字符，请检查！",
                                e.ID
                              )
                            ),
                            !1
                          );
                        var m = [D[1].trim(), D[2].trim()];
                        if (this._currentType === P.Object) {
                          if (this._activeObject.varData.isCreatedVariable(_))
                            return (
                              F.VE_ErrorManager.add(
                                F.VE_Error.error(
                                  e.pos(o, 5),
                                  "对象名：" +
                                    this._activeObject.objectID +
                                    "，局部变量：" +
                                    e.getData(o, 5) +
                                    "，当前局部变量名已创建，请检查！",
                                  e.ID
                                )
                              ),
                              !1
                            );
                          if (this._activeObject.dataSource.isCreatedFsm(_))
                            return (
                              F.VE_ErrorManager.add(
                                F.VE_Error.error(
                                  e.pos(o, 5),
                                  "对象名：" +
                                    this._activeObject.objectID +
                                    "，局部变量：" +
                                    e.getData(o, 5) +
                                    "，局部变量名不能与状态名相同，当前状态已创建，请检查！",
                                  e.ID
                                )
                              ),
                              !1
                            );
                          this._activeObject.varData.addVariable(
                            _,
                            m,
                            e.pos(o, 5)
                          );
                        } else {
                          if (this._currentType !== P.Template)
                            return (
                              F.VE_ErrorManager.add(
                                F.VE_Error.error(
                                  e.pos(o, 5),
                                  "局部变量：" +
                                    e.getData(o, 5) +
                                    "，当前局部变量所属未知，格式错误，请检查！",
                                  e.ID
                                )
                              ),
                              !1
                            );
                          if (this._activeTemplate.varData.isCreatedVariable(_))
                            return (
                              F.VE_ErrorManager.add(
                                F.VE_Error.error(
                                  e.pos(o, 5),
                                  "模板对象名：" +
                                    this._activeTemplate.templateID +
                                    "，局部变量：" +
                                    e.getData(o, 5) +
                                    "，当前局部变量名已创建，请检查！",
                                  e.ID
                                )
                              ),
                              !1
                            );
                          if (this._activeTemplate.dataSource.isCreatedFsm(_))
                            return (
                              F.VE_ErrorManager.add(
                                F.VE_Error.error(
                                  e.pos(o, 5),
                                  "模板对象名：" +
                                    e.getData(o, 5) +
                                    "，当前局部变量所属未知，格式错误，请检查！",
                                  e.ID
                                )
                              ),
                              !1
                            );
                          this._activeTemplate.varData.addVariable(
                            _,
                            m,
                            e.pos(o, 5)
                          );
                        }
                      }
                    } else {
                      if (
                        2 !== (D = L.VE_StringFormat.paraSegment(f)).length &&
                        3 !== D.length
                      )
                        return (
                          F.VE_ErrorManager.add(
                            F.VE_Error.error(
                              e.pos(o, 5),
                              "局部变量：" +
                                e.getData(o, 5) +
                                "，当前局部变量格式不正确，请检查！",
                              e.ID
                            )
                          ),
                          !1
                        );
                      _ = D[0].trim();
                      if (!L.VE_StringFormat.isIDLegal(_))
                        return (
                          F.VE_ErrorManager.add(
                            F.VE_Error.error(
                              e.pos(o, 5),
                              "变量：" +
                                e.getData(o, 5) +
                                "，当前变量名不合法，包含非法字符，请检查！",
                              e.ID
                            )
                          ),
                          !1
                        );
                      g = [D[1].trim()];
                      if (
                        (2 === D.length ? (g[1] = "") : (g[1] = D[2].trim()),
                        this._currentType === P.Object)
                      ) {
                        if (this._activeObject.varData.isCreatedVariable(_))
                          return (
                            F.VE_ErrorManager.add(
                              F.VE_Error.error(
                                e.pos(o, 5),
                                "对象名：" +
                                  this._activeObject.objectID +
                                  "，局部变量：" +
                                  e.getData(o, 5) +
                                  "，当前局部变量名已创建，请检查！",
                                e.ID
                              )
                            ),
                            !1
                          );
                        if (this._activeObject.dataSource.isCreatedFsm(_))
                          return (
                            F.VE_ErrorManager.add(
                              F.VE_Error.error(
                                e.pos(o, 5),
                                "对象名：" +
                                  this._activeObject.objectID +
                                  "，局部变量：" +
                                  e.getData(o, 5) +
                                  "，局部变量名不能与状态名相同，当前状态已创建，请检查！",
                                e.ID
                              )
                            ),
                            !1
                          );
                        this._activeObject.varData.addVariable(
                          _,
                          g,
                          e.pos(o, 5)
                        );
                      } else {
                        if (this._currentType !== P.Template)
                          return (
                            F.VE_ErrorManager.add(
                              F.VE_Error.error(
                                e.pos(o, 5),
                                "局部变量：" +
                                  e.getData(o, 5) +
                                  "，当前局部变量所属未知，格式错误，请检查！",
                                e.ID
                              )
                            ),
                            !1
                          );
                        if (this._activeTemplate.varData.isCreatedVariable(_))
                          return (
                            F.VE_ErrorManager.add(
                              F.VE_Error.error(
                                e.pos(o, 5),
                                "模板对象名：" +
                                  this._activeTemplate.templateID +
                                  "，局部变量：" +
                                  e.getData(o, 5) +
                                  "，当前局部变量名已创建，请检查！",
                                e.ID
                              )
                            ),
                            !1
                          );
                        if (this._activeTemplate.dataSource.isCreatedFsm(_))
                          return (
                            F.VE_ErrorManager.add(
                              F.VE_Error.error(
                                e.pos(o, 5),
                                "模板对象名：" +
                                  this._activeTemplate.templateID +
                                  "，局部变量：" +
                                  e.getData(o, 5) +
                                  "，局部变量名不能与状态名相同，当前状态已创建，请检查！",
                                e.ID
                              )
                            ),
                            !1
                          );
                        this._activeTemplate.varData.addVariable(
                          _,
                          g,
                          e.pos(o, 5)
                        );
                      }
                    }
                  } else {
                    if ("" !== e.getData(o, 5))
                      if (-1 < (f = e.getData(o, 5)).indexOf("=")) {
                        var v = f.split("="),
                          E = v[0].trim();
                        if (2 !== v.length || E !== this._lastFsmID)
                          return (
                            F.VE_ErrorManager.add(
                              F.VE_Error.error(
                                e.pos(o, 5),
                                "状态赋值：" +
                                  e.getData(o, 5) +
                                  "，状态名：" +
                                  E +
                                  "，当前状态未定义，请检查！",
                                e.ID
                              )
                            ),
                            !1
                          );
                        if (null === this._activeFsmData)
                          return (
                            F.VE_ErrorManager.add(
                              F.VE_Error.error(
                                e.pos(o, 5),
                                "状态赋值：" +
                                  e.getData(o, 5) +
                                  "，当前状态不属于任何对象和模板对象，请检查！",
                                e.ID
                              )
                            ),
                            !1
                          );
                        (y = v[1].trim().split(/,|，/)),
                          (d = B.StateConst.STATE_INDEX),
                          (b = null);
                        if (2 === y.length) {
                          if (
                            ((y[0] = y[0].trim()),
                            (y[1] = y[1].trim()),
                            !y[1].startsWith("#"))
                          )
                            return (
                              F.VE_ErrorManager.add(
                                F.VE_Error.error(
                                  e.pos(o, 5),
                                  "状态赋值：" +
                                    e.getData(o, 5) +
                                    "，状态关联ID格式错误，状态关联标志ID写法：“状态ID=赋值，#整数ID”，请检查！",
                                  e.ID
                                )
                              ),
                              !1
                            );
                          if (NaN === (d = parseInt(y[1].substring(1))))
                            return (
                              F.VE_ErrorManager.add(
                                F.VE_Error.error(
                                  e.pos(o, 5),
                                  "状态赋值：" +
                                    e.getData(o, 5) +
                                    "，状态关联ID格式错误，状态关联标志ID写法：“状态ID=赋值，#整数ID”，当前整数转化错误！",
                                  e.ID
                                )
                              ),
                              !1
                            );
                        }
                        (b = new M.VE_StateData(
                          this._activeFsmData,
                          y[0].trim(),
                          !1,
                          d
                        )),
                          this._activeFsmData.addState(b),
                          (this._activeStateData = b);
                      } else {
                        var D;
                        if (
                          2 !== (D = L.VE_StringFormat.paraSegment(f)).length &&
                          3 !== D.length &&
                          4 !== D.length
                        )
                          return (
                            F.VE_ErrorManager.add(
                              F.VE_Error.error(
                                e.pos(o, 5),
                                "状态：" +
                                  e.getData(o, 5) +
                                  "，当前状态格式不正确，应为“状态名，类型，初始值”的形式，请检查！",
                                e.ID
                              )
                            ),
                            !1
                          );
                        E = D[0].trim();
                        if (!L.VE_StringFormat.isIDLegal(E))
                          return (
                            F.VE_ErrorManager.add(
                              F.VE_Error.error(
                                e.pos(o, 5),
                                "状态名：" +
                                  e.getData(o, 5) +
                                  "，当前状态名不合法，包含非法字符，请检查！",
                                e.ID
                              )
                            ),
                            !1
                          );
                        this._lastFsmID = E;
                        g = [D[1].trim()];
                        2 === D.length ? (g[1] = "") : (g[1] = D[2].trim());
                        d = B.StateConst.STATE_INDEX;
                        if (4 === D.length) {
                          if (!D[3].startsWith("#"))
                            return (
                              F.VE_ErrorManager.add(
                                F.VE_Error.error(
                                  e.pos(o, 5),
                                  "状态赋值：" +
                                    D[3] +
                                    "，状态关联ID格式错误，状态关联标志ID写法：“状态ID，变量类型，变量值，#整数ID”，当前整数转化错误！",
                                  e.ID
                                )
                              ),
                              !1
                            );
                          if (NaN === (d = parseInt(D[3].substring(1))))
                            return (
                              F.VE_ErrorManager.add(
                                F.VE_Error.error(
                                  e.pos(o, 5),
                                  "状态赋值：" +
                                    D[3] +
                                    "，状态关联ID格式错误，状态关联标志ID写法：“状态ID，变量类型，变量值，#整数ID”，当前整数转化错误！",
                                  e.ID
                                )
                              ),
                              !1
                            );
                        }
                        if (this._currentType === P.Object) {
                          if (this._activeObject.varData.isCreatedVariable(E))
                            return (
                              F.VE_ErrorManager.add(
                                F.VE_Error.error(
                                  e.pos(o, 5),
                                  "对象名：" +
                                    this._activeObject.objectID +
                                    "，状态名：" +
                                    E +
                                    "，状态名与局部变量名不能相同，当前局部变量已创建，请检查！",
                                  e.ID
                                )
                              ),
                              !1
                            );
                          if (this._activeObject.dataSource.isCreatedFsm(E))
                            return (
                              F.VE_ErrorManager.add(
                                F.VE_Error.error(
                                  e.pos(o, 5),
                                  "对象名：" +
                                    this._activeObject.objectID +
                                    "，状态名：" +
                                    E +
                                    "，当前状态已创建，请检查！",
                                  e.ID
                                )
                              ),
                              !1
                            );
                          if (
                            (this._activeObject.dataSource.createFsm(E),
                            (this._activeFsmData = this._activeObject.dataSource.getFsmData(
                              E
                            )),
                            !k.VeryVarManager.hasVarType(g[0]))
                          )
                            return (
                              F.VE_ErrorManager.add(
                                F.VE_Error.error(
                                  e.pos(o, 5),
                                  "对象名：" +
                                    this._activeObject.objectID +
                                    "，状态名：" +
                                    E +
                                    "，类型：" +
                                    g[0] +
                                    "，状态类型错误，当前状态变量类型在系统中不存在，请检查！",
                                  e.ID
                                )
                              ),
                              !1
                            );
                          this._activeFsmData.initFsm(g[0], g[1]);
                          b = new M.VE_StateData(
                            this._activeFsmData,
                            g[1],
                            !0,
                            d
                          );
                          this._activeFsmData.addState(b),
                            (this._activeStateData = b);
                        } else {
                          if (this._currentType !== P.Template)
                            return (
                              F.VE_ErrorManager.add(
                                F.VE_Error.error(
                                  e.pos(o, 5),
                                  "局部变量：" +
                                    e.getData(o, 5) +
                                    "，当前局部变量所属未知，格式错误，请检查！",
                                  e.ID
                                )
                              ),
                              !1
                            );
                          if (this._activeTemplate.varData.isCreatedVariable(E))
                            return (
                              F.VE_ErrorManager.add(
                                F.VE_Error.error(
                                  e.pos(o, 5),
                                  "模板对象名：" +
                                    this._activeTemplate.templateID +
                                    "，状态名：" +
                                    E +
                                    "，状态名与局部变量名不能相同，当前局部变量已创建，请检查！",
                                  e.ID
                                )
                              ),
                              !1
                            );
                          if (this._activeTemplate.dataSource.isCreatedFsm(E))
                            return (
                              F.VE_ErrorManager.add(
                                F.VE_Error.error(
                                  e.pos(o, 5),
                                  "模板对象名：" +
                                    this._activeTemplate.templateID +
                                    "，状态名：" +
                                    E +
                                    "，当前状态已创建，请检查！",
                                  e.ID
                                )
                              ),
                              !1
                            );
                          if (
                            (this._activeTemplate.dataSource.createFsm(E),
                            (this._activeFsmData = this._activeTemplate.dataSource.getFsmData(
                              E
                            )),
                            !k.VeryVarManager.hasVarType(g[0]))
                          )
                            return (
                              F.VE_ErrorManager.add(
                                F.VE_Error.error(
                                  e.pos(o, 5),
                                  "模板对象名：" +
                                    this._activeTemplate.objectID +
                                    "，状态名：" +
                                    E +
                                    "，类型：" +
                                    g[0] +
                                    "，状态类型错误，当前状态变量类型在系统中不存在，请检查！",
                                  e.ID
                                )
                              ),
                              !1
                            );
                          this._activeFsmData.initFsm(g[0], g[1]);
                          b = new M.VE_StateData(
                            this._activeFsmData,
                            g[1],
                            !0,
                            d
                          );
                          this._activeFsmData.addState(b),
                            (this._activeStateData = b);
                        }
                      }
                    if ("" !== e.getData(o, 2)) {
                      if (
                        null === this._activeFsmData ||
                        null === this._activeStateData
                      )
                        return (
                          F.VE_ErrorManager.add(
                            F.VE_Error.error(
                              e.pos(o, 2),
                              "触发：" +
                                e.getData(o, 2) +
                                "，当前触发不属于任何对象和模板对象，请检查！",
                              e.ID
                            )
                          ),
                          !1
                        );
                      var T = e.getData(o, 2);
                      if (!L.VE_StringFormat.isIDLegal(T))
                        return (
                          F.VE_ErrorManager.add(
                            F.VE_Error.error(
                              e.pos(o, 2),
                              "触发名：" +
                                e.getData(o, 2) +
                                "，当前触发名不合法，包含非法字符，请检查！",
                              e.ID
                            )
                          ),
                          !1
                        );
                      if ("" !== e.getData(o, 3)) {
                        if (this._activeFsmData.dataSource.isCreatedTrigger(T))
                          return (
                            F.VE_ErrorManager.add(
                              F.VE_Error.error(
                                e.pos(o, 2),
                                "触发：" +
                                  e.getData(o, 2) +
                                  "，当前触发已在该对象中定义，请勿重复定义，请检查！",
                                e.ID
                              )
                            ),
                            !1
                          );
                        this._activeFsmData.dataSource.addTrigger(
                          T,
                          L.VE_StringFormat.paraSegment(e.getData(o, 3))
                        );
                      }
                      var O = new M.VE_StateTriggerData(T);
                      this._activeStateData.addTrigger(O),
                        "" !== e.getData(o, 1) &&
                          (O.logicalSwitch = e.getData(o, 1)),
                        "" !== e.getData(o, 4) &&
                          (O.logicalExp = e.getData(o, 4));
                    } else {
                      if ("" !== e.getData(o, 1))
                        return (
                          F.VE_ErrorManager.add(
                            F.VE_Error.error(
                              e.pos(o, 1),
                              "触发启动条件：" +
                                e.getData(o, 1) +
                                "，当前无触发，请勿定义触发启动条件，请检查！",
                              e.ID
                            )
                          ),
                          !1
                        );
                      if ("" !== e.getData(o, 4)) {
                        if (
                          null === this._activeFsmData ||
                          null === this._activeStateData
                        )
                          return (
                            F.VE_ErrorManager.add(
                              F.VE_Error.error(
                                e.pos(o, 4),
                                "状态逻辑条件：" +
                                  e.getData(o, 4) +
                                  "，当前状态逻辑条件不属于任何对象和模板对象，请检查！",
                                e.ID
                              )
                            ),
                            !1
                          );
                        if ("" !== this._activeStateData.logicalExp)
                          return (
                            F.VE_ErrorManager.add(
                              F.VE_Error.error(
                                e.pos(o, 4),
                                "状态逻辑条件：" +
                                  e.getData(o, 4) +
                                  "，在状态的某个值中，无触发的状态逻辑条件只能填写1个，作为关联状态的逻辑条件，此处为第2个，不符合规则，请检查！",
                                e.ID
                              )
                            ),
                            !1
                          );
                        this._activeStateData.logicalExp = e.getData(o, 4);
                      }
                      "" !== e.getData(o, 3) &&
                        F.VE_ErrorManager.add(
                          F.VE_Error.warning(
                            e.pos(o, 3),
                            "触发参数：" +
                              e.getData(o, 3) +
                              "，该处无触发定义，但是填写了触发参数，请检查！",
                            e.ID
                          )
                        );
                    }
                    if ("" !== e.getData(o, 6)) {
                      if (
                        null === this._activeFsmData ||
                        null === this._activeStateData
                      )
                        return (
                          F.VE_ErrorManager.add(
                            F.VE_Error.error(
                              e.pos(o, 6),
                              "响应：" +
                                e.getData(o, 6) +
                                "，当前响应不属于任何对象和模板对象，请检查！",
                              e.ID
                            )
                          ),
                          !1
                        );
                      var x = e.getData(o, 6).toLowerCase();
                      if (
                        x.startsWith("log(") ||
                        x.startsWith("log（") ||
                        x.startsWith("调试（") ||
                        x.startsWith("调试(")
                      ) {
                        var V = t + "___" + B.StateConst.LogCount++,
                          S = new M.VE_StateActionData(V, "true", "false");
                        this._activeStateData.addAction(S);
                        var j = e.getData(o, 6).substring(4);
                        x.startsWith("调试") &&
                          (j = e.getData(o, 6).substring(3)),
                          this._activeFsmData.dataSource.addAction(
                            V,
                            ["调试", "调试", j.substring(0, j.length - 1)],
                            ["false", "false"]
                          ),
                          "" !== e.getData(o, 7) &&
                            F.VE_ErrorManager.add(
                              F.VE_Error.warning(
                                e.pos(o, 7),
                                "响应参数：" +
                                  e.getData(o, 7) +
                                  "，该处不应该再有响应定义，但是填写了响应参数，请检查！",
                                e.ID
                              )
                            );
                      } else if (
                        x.startsWith("error(") ||
                        x.startsWith("error（") ||
                        x.startsWith("错误（") ||
                        x.startsWith("错误(")
                      ) {
                        (V = t + "___" + B.StateConst.LogCount++),
                          (S = new M.VE_StateActionData(V, "true", "false"));
                        this._activeStateData.addAction(S);
                        j = e.getData(o, 6).substring(6);
                        x.startsWith("错误") &&
                          (j = e.getData(o, 6).substring(3)),
                          this._activeFsmData.dataSource.addAction(
                            V,
                            ["调试", "错误", j.substring(0, j.length - 1)],
                            ["false", "false"]
                          ),
                          "" !== e.getData(o, 7) &&
                            F.VE_ErrorManager.add(
                              F.VE_Error.warning(
                                e.pos(o, 7),
                                "响应参数：" +
                                  e.getData(o, 7) +
                                  "，该处不应该再有响应定义，但是填写了响应参数，请检查！",
                                e.ID
                              )
                            );
                      } else if (
                        x.startsWith("warn(") ||
                        x.startsWith("warn（") ||
                        x.startsWith("警告（") ||
                        x.startsWith("警告(")
                      ) {
                        (V = t + "___" + B.StateConst.LogCount++),
                          (S = new M.VE_StateActionData(V, "true", "false"));
                        this._activeStateData.addAction(S);
                        j = e.getData(o, 6).substring(5);
                        x.startsWith("警告") &&
                          (j = e.getData(o, 6).substring(3)),
                          this._activeFsmData.dataSource.addAction(
                            V,
                            ["调试", "警告", j.substring(0, j.length - 1)],
                            ["false", "false"]
                          ),
                          "" !== e.getData(o, 7) &&
                            F.VE_ErrorManager.add(
                              F.VE_Error.warning(
                                e.pos(o, 7),
                                "响应参数：" +
                                  e.getData(o, 7) +
                                  "，该处不应该再有响应定义，但是填写了响应参数，请检查！",
                                e.ID
                              )
                            );
                      } else if (-1 < e.getData(o, 6).indexOf("=")) {
                        "" !== e.getData(o, 7) &&
                          F.VE_ErrorManager.add(
                            F.VE_Error.warning(
                              e.pos(o, 7),
                              "响应参数：" +
                                e.getData(o, 7) +
                                "，该处不应该再有响应定义，但是填写了响应参数，请检查！",
                              e.ID
                            )
                          );
                        var C = e.getData(o, 6).indexOf("=");
                        (S = new M.VE_StateActionData("")).setAssignmentAction(
                          e.getData(o, 6),
                          e
                            .getData(o, 6)
                            .substring(0, C)
                            .trim(),
                          e
                            .getData(o, 6)
                            .substring(C + 1)
                            .trim()
                        ),
                          this._activeStateData.addAction(S);
                      } else {
                        var I = L.VE_StringFormat.paraSegment(e.getData(o, 6));
                        if (2 !== I.length && 3 !== I.length && 4 !== I.length)
                          return (
                            F.VE_ErrorManager.add(
                              F.VE_Error.error(
                                e.pos(o, 6),
                                "响应：" +
                                  e.getData(o, 6) +
                                  "，响应格式不正确，应为“响应ID，启动标志（bool），每帧运行标志（bool）”的形式，请检查！",
                                e.ID
                              )
                            ),
                            !1
                          );
                        S = void 0;
                        if (
                          ((S =
                            2 === I.length
                              ? new M.VE_StateActionData(I[0], I[1])
                              : 3 === I.length
                              ? new M.VE_StateActionData(I[0], I[1], I[2])
                              : new M.VE_StateActionData(
                                  I[0],
                                  I[1],
                                  I[2],
                                  I[3]
                                )),
                          this._activeStateData.addAction(S),
                          "" !== e.getData(o, 7))
                        ) {
                          if (!L.VE_StringFormat.isIDLegal(I[0]))
                            return (
                              F.VE_ErrorManager.add(
                                F.VE_Error.error(
                                  e.pos(o, 6),
                                  "响应名：" +
                                    e.getData(o, 6) +
                                    "，当前响应名不合法，包含非法字符，请检查！",
                                  e.ID
                                )
                              ),
                              !1
                            );
                          if (
                            this._activeFsmData.dataSource.isCreatedAction(I[0])
                          )
                            return (
                              F.VE_ErrorManager.add(
                                F.VE_Error.error(
                                  e.pos(o, 6),
                                  "响应：" +
                                    e.getData(o, 6) +
                                    "，当前响应已在该对象中定义，请勿重复定义，请检查！",
                                  e.ID
                                )
                              ),
                              !1
                            );
                          2 == I.length
                            ? this._activeFsmData.dataSource.addAction(
                                I[0],
                                L.VE_StringFormat.paraSegment(e.getData(o, 7)),
                                [I[1], "false"]
                              )
                            : this._activeFsmData.dataSource.addAction(
                                I[0],
                                L.VE_StringFormat.paraSegment(e.getData(o, 7)),
                                [I[1], I[2]]
                              );
                        }
                      }
                    } else
                      "" !== e.getData(o, 7) &&
                        F.VE_ErrorManager.add(
                          F.VE_Error.warning(
                            e.pos(o, 7),
                            "响应参数：" +
                              e.getData(o, 7) +
                              "，该处无响应定义，但是填写了响应参数，请检查！",
                            e.ID
                          )
                        );
                    if ("" !== e.getData(o, 8)) {
                      if (
                        null === this._activeFsmData ||
                        null === this._activeStateData
                      )
                        return (
                          F.VE_ErrorManager.add(
                            F.VE_Error.error(
                              e.pos(o, 8),
                              "关联状态：" +
                                e.getData(o, 8) +
                                "，当前关联状态不属于任何对象和模板对象，请检查！",
                              e.ID
                            )
                          ),
                          !1
                        );
                      this._activeStateData.addAssociatedState(e.getData(o, 8));
                    }
                  }
                return R.CreateInstance.createProject(t);
              }
              return (
                F.VE_ErrorManager.add(
                  F.VE_Error.error("", "表格内容不存在，引擎无法启动！", "null")
                ),
                !1
              );
            }),
            t
          );
        })();
        r.LoaderManager = n;
      },
      {
        "../dataSource": 9,
        "../global": 35,
        "../manager": 47,
        "../object": 51,
        "../state": 56,
        "../template": 60,
        "../utility": 69,
        "../variables": 72,
        "./createInstance": 44
      }
    ],
    47: [
      function(t, e, r) {
        "use strict";
        function i(t) {
          for (var e in t) r.hasOwnProperty(e) || (r[e] = t[e]);
        }
        Object.defineProperty(r, "__esModule", { value: !0 }),
          i(t("./projects")),
          i(t("./manager")),
          i(t("./reset"));
      },
      { "./manager": 48, "./projects": 49, "./reset": 50 }
    ],
    48: [
      function(t, e, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", { value: !0 });
        var i = t("./projects"),
          n = t("../object"),
          o = t("../template"),
          a = t("../variables"),
          s = (function() {
            function e() {}
            return (
              Object.defineProperty(e, "projects", {
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
              (e.createProject = function(t) {
                e.projects.isCreatedObjects(t) ||
                  e.projects.addObjects(t, new n.VE_Objects(t)),
                  e.projects.isCreatedTemplates(t) ||
                    e.projects.addTemplates(t, new o.VE_Templates(t)),
                  e.projects.isCreatedVariables(t) ||
                    e.projects.addVariables(t, new a.VE_Variables(t));
              }),
              (e.globalVarData = function(t) {
                return (
                  e.projects.isCreatedGlobals(t) ||
                    e.projects.addVariables(t, new a.VE_Variables(t)),
                  e.projects.getGlobalVars(t)
                );
              }),
              (e.templates = function(t) {
                return (
                  e.projects.isCreatedTemplates(t) ||
                    e.projects.addTemplates(t, new o.VE_Templates(t)),
                  e.projects.getTemplates(t)
                );
              }),
              (e.variables = function(t) {
                return (
                  e.projects.isCreatedVariables(t) ||
                    e.projects.addVariables(t, new a.VE_Variables(t)),
                  e.projects.getVariables(t)
                );
              }),
              (e.objects = function(t) {
                return (
                  e.projects.isCreatedObjects(t) ||
                    e.projects.addObjects(t, new n.VE_Objects(t)),
                  e.projects.getObjects(t)
                );
              }),
              (e.clear = function() {
                this._projects = null;
              }),
              (e.clearProject = function(t) {
                e.clearProject(t);
              }),
              (e._projects = null),
              e
            );
          })();
        r.VE_Manager = s;
      },
      {
        "../object": 51,
        "../template": 60,
        "../variables": 72,
        "./projects": 49
      }
    ],
    49: [
      function(t, e, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", { value: !0 });
        var i = (function() {
          function t() {
            (this._objects = {}),
              (this._variables = {}),
              (this._templates = {}),
              (this.projects = []);
          }
          return (
            (t.prototype.isCreatedObjects = function(t) {
              return !!this._objects[t];
            }),
            (t.prototype.addObjects = function(t, e) {
              this._objects[t] = e;
            }),
            (t.prototype.getObjects = function(t) {
              return this._objects[t];
            }),
            (t.prototype.isCreatedVariables = function(t) {
              return !!this._variables[t];
            }),
            (t.prototype.addVariables = function(t, e) {
              this._variables[t] = e;
            }),
            (t.prototype.getVariables = function(t) {
              return this._variables[t];
            }),
            (t.prototype.isCreatedTemplates = function(t) {
              return !!this._templates[t];
            }),
            (t.prototype.addTemplates = function(t, e) {
              this._templates[t] = e;
            }),
            (t.prototype.getTemplates = function(t) {
              return this._templates[t];
            }),
            (t.prototype.isCreatedGlobals = function(t) {
              return !!this._variables[t];
            }),
            (t.prototype.getGlobalVars = function(t) {
              return this._variables[t].varData;
            }),
            (t.prototype.clear = function() {
              (this._objects = {}),
                (this._templates = {}),
                (this._variables = {});
            }),
            (t.prototype.clearPorject = function(t) {
              delete this._objects[t],
                delete this._templates[t],
                delete this._variables[t];
            }),
            (t.prototype.sleep = function() {}),
            t
          );
        })();
        r.VE_Projects = i;
      },
      {}
    ],
    50: [
      function(t, e, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", { value: !0 });
        var i = function() {};
        r.VE_Reset = i;
      },
      {}
    ],
    51: [
      function(t, e, r) {
        "use strict";
        function i(t) {
          for (var e in t) r.hasOwnProperty(e) || (r[e] = t[e]);
        }
        Object.defineProperty(r, "__esModule", { value: !0 }),
          i(t("./veryengineObject")),
          i(t("./objects"));
      },
      { "./objects": 52, "./veryengineObject": 53 }
    ],
    52: [
      function(t, e, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", { value: !0 });
        var i = t("../utility"),
          n = (function() {
            function t(t) {
              (this._projectName = ""),
                (this._objectIDs = []),
                (this._objectDics = {}),
                (this._projectName = t);
            }
            return (
              Object.defineProperty(t.prototype, "projectName", {
                get: function() {
                  return this._projectName;
                },
                enumerable: !0,
                configurable: !0
              }),
              Object.defineProperty(t.prototype, "count", {
                get: function() {
                  return this._objectIDs.length;
                },
                enumerable: !0,
                configurable: !0
              }),
              (t.prototype.isCreated = function(t) {
                return !!this._objectDics[t];
              }),
              (t.prototype.add = function(t, e) {
                this.isCreated(t) ||
                  (this._objectIDs.push(t), (this._objectDics[t] = e));
              }),
              (t.prototype.getObjectID = function(t) {
                return 0 <= t && t < this._objectIDs.length
                  ? this._objectIDs[t]
                  : "";
              }),
              (t.prototype.getVeryObject = function(t) {
                return this._objectDics[t];
              }),
              (t.prototype.unloadObject = function(t) {
                i.ArrayUtility.remove(this._objectIDs, t),
                  delete this._objectDics.object_id;
              }),
              (t.prototype.clear = function() {
                for (var t = 0; t < this._objectIDs.length; t++) {
                  var e = this._objectDics[this._objectIDs[t]];
                  e && e.clear();
                }
                (this._objectIDs = []), (this._objectDics = {});
              }),
              t
            );
          })();
        r.VE_Objects = n;
      },
      { "../utility": 69 }
    ],
    53: [
      function(t, e, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", { value: !0 });
        var i = t("../variables"),
          n = t("../dataSource"),
          o = (function() {
            function t(t, e, r) {
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
                (this._objectID = e),
                (this.gameObject = r),
                (this.dataSource = new n.VE_DataSource(t, e, !1)),
                (this.varData = new n.VE_VariableData(t));
            }
            return (
              Object.defineProperty(t.prototype, "projectName", {
                get: function() {
                  return this._projectName;
                },
                enumerable: !0,
                configurable: !0
              }),
              Object.defineProperty(t.prototype, "objectID", {
                get: function() {
                  return this._objectID;
                },
                enumerable: !0,
                configurable: !0
              }),
              (t.prototype.isCreatedFsm = function(t) {
                return !!this._fsms[t];
              }),
              (t.prototype.addFsm = function(t, e) {
                this._fsms[t] = e;
              }),
              (t.prototype.getFsm = function(t) {
                return this._fsms[t];
              }),
              (t.prototype.isCreatedTrigger = function(t) {
                return !!this._triggers[t];
              }),
              (t.prototype.addTrigger = function(t, e) {
                this._triggers[t] = e;
              }),
              (t.prototype.getTrigger = function(t) {
                return this._triggers[t];
              }),
              (t.prototype.isCreatedAction = function(t) {
                return !!this._actions[t];
              }),
              (t.prototype.addAction = function(t, e) {
                this._actions[t] = e;
              }),
              (t.prototype.getAction = function(t) {
                return this._actions[t];
              }),
              (t.prototype.isCreatedVariable = function(t) {
                return !!this._variables[t];
              }),
              (t.prototype.addVariable = function(t, e) {
                this._variables[t] = e;
              }),
              (t.prototype.getVariable = function(t) {
                return this._variables[t];
              }),
              (t.prototype.isCreatedExpression = function(t) {
                return !this._expressions[t];
              }),
              (t.prototype.addExpression = function(t, e) {
                this._expressions[t] = e;
              }),
              (t.prototype.getExpression = function(t) {
                return this._expressions[t];
              }),
              (t.prototype.isCreatedTemplate = function(t) {
                return !!this._templates[t];
              }),
              (t.prototype.addTemplate = function(t, e) {
                this._templates[t] = e;
              }),
              (t.prototype.getTemplate = function(t) {
                return this._templates[t];
              }),
              (t.prototype.isCreatedVar = function(t) {
                return !!(
                  this._variables[t] ||
                  this._expressions[t] ||
                  this._templates[t]
                );
              }),
              (t.prototype.unload = function() {}),
              (t.prototype.clear = function() {
                var e = this;
                this.dataSource && this.dataSource.clear(),
                  this.varData && this.varData.clear(),
                  (this._variables = {}),
                  (this._expressions = {}),
                  this._templates &&
                    (Object.keys(this._templates).forEach(function(t) {
                      e._templates[t].clear();
                    }),
                    (this._templates = {})),
                  (this._fsms = {}),
                  this._actions &&
                    (Object.keys(this._actions).forEach(function(t) {
                      e._actions[t].destroy();
                    }),
                    (this._actions = {})),
                  this._triggers &&
                    (Object.keys(this._triggers).forEach(function(t) {
                      e._triggers[t].destroy();
                    }),
                    (this._triggers = {}));
              }),
              t
            );
          })();
        r.VeryEngineObject = o;
      },
      { "../dataSource": 9, "../variables": 72 }
    ],
    54: [
      function(t, e, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", { value: !0 });
        var n = t("../enum"),
          i = (function() {
            function t(t) {
              (this._types = []),
                (this._indexs = []),
                (this._numberIndex = {}),
                (this._states = {}),
                (this._templates = {}),
                (this._templateIDs = {}),
                (this._fromState = t);
            }
            return (
              Object.defineProperty(t.prototype, "FromState", {
                get: function() {
                  return this._fromState;
                },
                enumerable: !0,
                configurable: !0
              }),
              (t.prototype.add = function(t, e) {
                this._types.push(n.AssociatedFsmType.Object);
                var r = this._types.length;
                this._indexs.push(r),
                  (this._numberIndex[r] = e),
                  (this._states[r] = t);
              }),
              (t.prototype.addTemplate = function(t, e, r) {
                this._types.push(n.AssociatedFsmType.Object);
                var i = this._types.length;
                this._indexs.push(i),
                  (this._numberIndex[i] = r),
                  (this._templates[i] = t),
                  (this._templateIDs[i] = e);
              }),
              (t.prototype.connect = function() {}),
              t
            );
          })();
        r.VE_AssociatedState = i;
      },
      { "../enum": 15 }
    ],
    55: [
      function(t, e, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", { value: !0 });
        var i = t("../utility/dictionary"),
          n = t("../global"),
          o = t("./stateConst"),
          a = (function() {
            function t() {
              (this._id = ""),
                (this._objectID = ""),
                (this._fsmID = ""),
                (this._stateDics = new i.Dictionary()),
                (this._states = []),
                (this._frameCount = -1),
                (this._triggerIDs = []);
            }
            return (
              Object.defineProperty(t.prototype, "ID", {
                get: function() {
                  return this._id;
                },
                enumerable: !0,
                configurable: !0
              }),
              Object.defineProperty(t.prototype, "ObjectID", {
                get: function() {
                  return this._objectID;
                },
                enumerable: !0,
                configurable: !0
              }),
              Object.defineProperty(t.prototype, "FsmID", {
                get: function() {
                  return this._fsmID;
                },
                enumerable: !0,
                configurable: !0
              }),
              (t.prototype.hasState = function(t) {
                return this._stateDics.ContainsKey(t);
              }),
              (t.prototype.addState = function(t, e) {
                this._stateDics.ContainsKey(t) ||
                  (this._stateDics.Add(t, e), this._states.push(e));
              }),
              (t.prototype.getState = function(t) {
                return this._stateDics.GetValue(t);
              }),
              (t.prototype.removeState = function(t) {
                return !!this.hasState(t) && (this._stateDics.Remove(t), !0);
              }),
              (t.prototype.receiveEvent = function(t) {
                return n.Time.frameCount != this._frameCount
                  ? ((this._frameCount = n.Time.frameCount),
                    (this._triggerIDs = []),
                    this._triggerIDs.push(t),
                    !0)
                  : !!t.startsWith(o.StateConst.ASSOCIATED_STATE_PREFIX) ||
                      (-1 === this._triggerIDs.indexOf(t) &&
                        (this._triggerIDs.push(t), !0));
              }),
              t
            );
          })();
        r.VE_Fsm = a;
      },
      { "../global": 35, "../utility/dictionary": 67, "./stateConst": 59 }
    ],
    56: [
      function(t, e, r) {
        "use strict";
        function i(t) {
          for (var e in t) r.hasOwnProperty(e) || (r[e] = t[e]);
        }
        Object.defineProperty(r, "__esModule", { value: !0 }),
          i(t("./state")),
          i(t("./fsm")),
          i(t("./stateAction")),
          i(t("./associatedState")),
          i(t("./stateConst"));
      },
      {
        "./associatedState": 54,
        "./fsm": 55,
        "./state": 57,
        "./stateAction": 58,
        "./stateConst": 59
      }
    ],
    57: [
      function(t, e, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", { value: !0 });
        var i = (function() {
          function t(t, e) {
            void 0 === e && (e = "空状态"),
              (this._value = "空状态"),
              (this._stateActions = []),
              (this._assocaitedStates = []),
              (this._isSequence = !1),
              (this._fsm = t),
              (this._value = e);
          }
          return (
            Object.defineProperty(t.prototype, "Fsm", {
              get: function() {
                return this._fsm;
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(t.prototype, "Value", {
              get: function() {
                return this._value;
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(t.prototype, "IsSequence", {
              get: function() {
                return this._isSequence;
              },
              enumerable: !0,
              configurable: !0
            }),
            (t.prototype.setValue = function(t) {
              this._value = t;
            }),
            (t.prototype.addAction = function(t) {
              this._stateActions.push(t), BABYLON.Mesh.bind;
            }),
            (t.prototype.action = function(t) {
              this._fsm.receiveEvent(t);
            }),
            t
          );
        })();
        r.VE_State = i;
      },
      {}
    ],
    58: [
      function(t, e, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", { value: !0 });
        var n = t("../enum"),
          i = (function() {
            function t(t, e, r, i) {
              void 0 === r && (r = !1),
                void 0 === i && (i = !1),
                (this._type = n.StateActionType.Action),
                (this._action = t);
            }
            return (
              Object.defineProperty(t.prototype, "Type", {
                get: function() {
                  return this._type;
                },
                enumerable: !0,
                configurable: !0
              }),
              Object.defineProperty(t.prototype, "Action", {
                get: function() {
                  return this._action;
                },
                enumerable: !0,
                configurable: !0
              }),
              t
            );
          })();
        r.VE_StateAction = i;
      },
      { "../enum": 15 }
    ],
    59: [
      function(t, e, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", { value: !0 });
        var i = (function() {
          function t() {}
          return (
            (t.STATE_SEPARATOR = "."),
            (t.ASSOCIATED_STATE_PREFIX = "Associated_State:"),
            (t.VARIABLE_SYMBOL = "*"),
            (t.STATE_INDEX = -1),
            (t.LogCount = -1),
            t
          );
        })();
        r.StateConst = i;
      },
      {}
    ],
    60: [
      function(t, e, r) {
        "use strict";
        function i(t) {
          for (var e in t) r.hasOwnProperty(e) || (r[e] = t[e]);
        }
        Object.defineProperty(r, "__esModule", { value: !0 }),
          i(t("./template")),
          i(t("./templates"));
      },
      { "./template": 61, "./templates": 62 }
    ],
    61: [
      function(t, e, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", { value: !0 });
        var n = t("../dataSource"),
          i = (function() {
            function i(t, e) {
              (this._projectName = ""),
                (this._templateID = ""),
                (this._templateVarID = ""),
                (this._objectID = ""),
                (this.templateInstance = null),
                (this._instanceCount = 0),
                (this._projectName = t),
                (this._templateID = e),
                (this.dataSource = new n.VE_DataSource(t, e, !0)),
                (this.varData = new n.VE_VariableData(t));
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
              (i.prototype.setInstance = function(t) {
                this.templateInstance = t;
              }),
              (i.prototype.isCreatedVariable = function(t) {
                return this.varData.isCreatedVariable(t);
              }),
              (i.prototype.addVariable = function(t, e, r) {
                this.varData.addVariable(t, e, r);
              }),
              (i.prototype.clone = function(t, e) {
                var r = new i(this._projectName, this._templateID);
                return (
                  (r._objectID = t),
                  (r._templateVarID = e),
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
      { "../dataSource": 9 }
    ],
    62: [
      function(t, e, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", { value: !0 });
        var a = t("./template"),
          i = (function() {
            function t(t) {
              (this._projectName = ""),
                (this._templateDic = {}),
                (this._instanceDic = {}),
                (this._projectName = t);
            }
            return (
              Object.defineProperty(t.prototype, "projectName", {
                get: function() {
                  return this._projectName;
                },
                enumerable: !0,
                configurable: !0
              }),
              (t.prototype.isCreatedTemplate = function(t) {
                return !!this._templateDic[t];
              }),
              (t.prototype.addTemplate = function(t, e) {
                this._templateDic[t] = e;
              }),
              (t.prototype.getTemplate = function(t) {
                return this._templateDic[t];
              }),
              (t.prototype.isCreatedInstance = function(t, e) {
                return !(!this._instanceDic[t] || !this._instanceDic[t][e]);
              }),
              (t.prototype.getInstance = function(t, e) {
                return this._instanceDic[t][e];
              }),
              (t.prototype.clear = function() {
                var e = this;
                this._templateDic &&
                  (Object.keys(this._templateDic).forEach(function(t) {
                    e._templateDic[t].clear();
                  }),
                  (this._templateDic = {}));
              }),
              (t.prototype.createInstance = function(t, e, r, i, n, o) {
                return new a.VE_Template(this._projectName, e);
              }),
              t
            );
          })();
        r.VE_Templates = i;
      },
      { "./template": 61 }
    ],
    63: [
      function(t, e, r) {
        "use strict";
        function i(t) {
          for (var e in t) r.hasOwnProperty(e) || (r[e] = t[e]);
        }
        Object.defineProperty(r, "__esModule", { value: !0 }),
          i(t("./triggerBehaviour")),
          i(t("./triggers"));
      },
      { "./triggerBehaviour": 64, "./triggers": 65 }
    ],
    64: [
      function(t, e, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", { value: !0 });
        var i = t("../state/stateConst"),
          n = (function() {
            function t() {
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
              Object.defineProperty(t.prototype, "enabled", {
                get: function() {
                  return this._enabled;
                },
                set: function(t) {
                  this._enabled = t;
                },
                enumerable: !0,
                configurable: !0
              }),
              Object.defineProperty(t.prototype, "projectName", {
                get: function() {
                  return this._projectName;
                },
                enumerable: !0,
                configurable: !0
              }),
              Object.defineProperty(t.prototype, "isEnabled", {
                get: function() {
                  if (this._logicalSwitch)
                    for (var t = 0; t < this._logicalSwitch.length; t++)
                      if (!this._logicalSwitch[t].evaluate()) return !1;
                  return !0;
                },
                enumerable: !0,
                configurable: !0
              }),
              Object.defineProperty(t.prototype, "objectID", {
                get: function() {
                  return this._objectID;
                },
                enumerable: !0,
                configurable: !0
              }),
              Object.defineProperty(t.prototype, "triggerID", {
                get: function() {
                  return this._triggerID;
                },
                enumerable: !0,
                configurable: !0
              }),
              (t.prototype.call = function() {
                console.log(this._objectID);
              }),
              (t.prototype.set = function(t) {
                this.scene = t;
              }),
              (t.prototype.setTriggerID = function(t, e) {
                (this._triggerID = t),
                  (this._objectID = e),
                  (this._id = e + i.StateConst.STATE_SEPARATOR + t);
              }),
              (t.prototype.addLogicalSwitch = function(t) {
                this._logicalSwitch.push(t);
              }),
              (t.prototype.addTriggerTarget = function(t, e) {
                this._logicalExp.push(t), this._triggerTargets.push(e);
              }),
              (t.prototype.sendEvent = function() {
                this.isEnabled && this.eventProcess();
              }),
              (t.prototype.eventProcess = function() {
                if (this._triggerTargets)
                  for (var t = 0; t < this._triggerTargets.length; t++)
                    this._logicalExp[t].evaluate() &&
                      this._triggerTargets[t].action(this._id);
              }),
              (t.prototype.paraParser = function(t) {
                return !0;
              }),
              (t.prototype.update = function() {
                this.isEnabled && this.onUpdate();
              }),
              (t.prototype.onUpdate = function() {}),
              t
            );
          })();
        r.VE_TriggerBehaviour = n;
      },
      { "../state/stateConst": 59 }
    ],
    65: [
      function(t, e, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", { value: !0 });
        var n = t("../html"),
          i = (function() {
            function t() {}
            return (
              (t.addTrigger = function(t) {
                for (var e = t.ID.split("|"), r = 0; r < e.length; r++) {
                  var i = e[r].trim().toLowerCase();
                  this._triggerDics[i]
                    ? n.ShowError.showError(
                        "触发初始化错误，触发ID重复，当前触发ID：" +
                          i +
                          "，请为当前触发重新分配触发ID！"
                      )
                    : (this._triggerDics[i] = t);
                }
              }),
              (t.hasTrigger = function(t) {
                return (t = t.toLowerCase()), !!this._triggerDics[t];
              }),
              (t.createTrigger = function(t) {
                return (
                  (t = t.toLowerCase()), Object.create(this._triggerDics[t])
                );
              }),
              (t.remove = function(t) {
                (t = t.toLowerCase()), delete this._triggerDics[t];
              }),
              (t._triggerDics = {}),
              t
            );
          })();
        r.VE_Triggers = i;
      },
      { "../html": 37 }
    ],
    66: [
      function(t, e, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", { value: !0 });
        var i = (function() {
          function t() {}
          return (
            (t.remove = function(t, e) {
              var r = t.indexOf(e);
              -1 < r && t.splice(r, 1);
            }),
            (t.clear = function(t) {
              [];
            }),
            t
          );
        })();
        r.ArrayUtility = i;
      },
      {}
    ],
    67: [
      function(t, e, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", { value: !0 });
        var i = (function() {
          function t() {
            (this._keys = []), (this._values = []);
          }
          return (
            Object.defineProperty(t.prototype, "count", {
              get: function() {
                return this.Count();
              },
              enumerable: !0,
              configurable: !0
            }),
            (t.prototype.Add = function(t, e) {
              return this._keys.push(t), this._values.push(e);
            }),
            (t.prototype.Remove = function(t) {
              var e = this._keys.indexOf(t, 0);
              this._keys.splice(e, 1), this._values.splice(e, 1);
            }),
            (t.prototype.Count = function() {
              return this._keys.length;
            }),
            (t.prototype.SetValue = function(t, e) {
              var r = this._keys.indexOf(t, 0);
              return (
                -1 != r && ((this._keys[r] = t), (this._values[r] = e), !0)
              );
            }),
            (t.prototype.GetValue = function(t) {
              var e = this._keys.indexOf(t, 0);
              return -1 != e ? this._values[e] : null;
            }),
            (t.prototype.ContainsKey = function(t) {
              for (var e = this._keys, r = 0; r < e.length; ++r)
                if (e[r] == t) return !0;
              return !1;
            }),
            (t.prototype.GetKeys = function() {
              return this._keys;
            }),
            (t.prototype.GetValues = function() {
              return this._values;
            }),
            t
          );
        })();
        r.Dictionary = i;
      },
      {}
    ],
    68: [
      function(t, e, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", { value: !0 });
        var i = (function() {
          function t() {
            (this.isRight = !0), (this.message = "");
          }
          return (
            (t.prototype.clear = function() {
              (this.isRight = !0), (this.message = "");
            }),
            t
          );
        })();
        r.ErrorInfo = i;
      },
      {}
    ],
    69: [
      function(t, e, r) {
        "use strict";
        function i(t) {
          for (var e in t) r.hasOwnProperty(e) || (r[e] = t[e]);
        }
        Object.defineProperty(r, "__esModule", { value: !0 }),
          i(t("./arrayUtility")),
          i(t("./dictionary")),
          i(t("./errorInfo")),
          i(t("./stringFormat"));
      },
      {
        "./arrayUtility": 66,
        "./dictionary": 67,
        "./errorInfo": 68,
        "./stringFormat": 70
      }
    ],
    70: [
      function(t, e, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", { value: !0 });
        var i = (function() {
          function t() {}
          return (
            (t.init = function() {
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
            (t.strEscapeCharacterAction = function(t) {
              for (var e = "", r = 0; r < t.length; r++)
                "\\" == t[r] && r != t.length - 1
                  ? ((e += this.getEscapeCharacter(t[r + 1])), r++)
                  : (e += t[r]);
              return e;
            }),
            (t.strSubsectionAction = function(t) {
              for (
                var e = "", r = [], i = !1, n = !1, o = 0;
                o < t.length;
                o++
              ) {
                if ("\\" == t[o]) {
                  if (o < t.length - 1) {
                    (e += t[o + 1]), o++;
                    continue;
                  }
                  e += t[o];
                  break;
                }
                if (n || ('"' !== t[o] && "“" !== t[o]))
                  if (!n || ('"' !== t[o] && "”" !== t[o]))
                    if ("," === t[o] || "，" === t[o])
                      i ? (e += t[o]) : ("" !== e && r.push(e), (e = ""));
                    else {
                      if (" " === t[o]) continue;
                      e += t[o];
                    }
                  else (n = i = !1), "" !== (e += '"') && r.push(e), (e = "");
                else (i = n = !0), (e += '"');
              }
              return "" !== e && r.push(e), r;
            }),
            (t.getEscapeCharacter = function(t) {
              return this._escapeCharacters[t] ? this._escapeCharacters[t] : t;
            }),
            (t.getEscapeCharacter2 = function(t, e) {
              return this._escapeCharacters[t]
                ? ((e[0] = !0), this._escapeCharacters[t])
                : ((e[0] = !1), t);
            }),
            (t.strSubsection = function(t) {
              for (
                var e = "", r = [], i = !1, n = !1, o = 0;
                o < t.length;
                o++
              ) {
                if ("\\" == t[o]) {
                  if (o < t.length - 1) {
                    (e += this.getEscapeCharacter(t[o + 1])), o++;
                    continue;
                  }
                  e += t[o];
                  break;
                }
                if (
                  "(" === t[o] ||
                  "（" === t[o] ||
                  '"' === t[o] ||
                  "“" === t[o]
                )
                  n = !(i = !0);
                else if (
                  ")" === t[o] ||
                  "）" === t[o] ||
                  '"' === t[o] ||
                  "”" === t[o]
                )
                  (i = !1), "" !== e && r.push(e), (e = ""), (n = !1);
                else if ("," === t[o] || "，" === t[o])
                  i ? (e += t[o]) : ("" !== e && r.push(e), (e = "")), (n = !1);
                else {
                  if (" " === t[o] && !n) continue;
                  (e += t[o]), (n = !0);
                }
              }
              return "" !== e && r.push(e), r;
            }),
            (t.getParaArrayAll = function(t, e) {
              for (var r = e.slice(), i = 0; i < r.length; i++)
                if (r[i].startsWith("$"))
                  if (-1 < r[i].indexOf(",") || r[i].indexOf("，")) {
                    var n = r[i].split(/,|，/);
                    n = this.getParaArrayAll(t, n);
                    for (var o = "", a = 0; a < n.length; a++)
                      a === n.length - 1
                        ? (o += n[a])
                        : ((o += n[a]), (o += ","));
                    r[i] = o;
                  } else console.log("变量名：" + r[i] + "，该变量未被创建！");
                else if (r[i].startsWith("%"))
                  if (-1 < r[i].indexOf(",") || -1 < r[i].indexOf("，")) {
                    n = r[i].split(/,|，/);
                    n = this.getParaArrayAll(t, n);
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
                  n = this.getParaArrayAll(t, n);
                  for (o = "", a = 0; a < n.length; a++)
                    a == n.length - 1 ? (o += n[a]) : ((o += n[a]), (o += ","));
                  r[i] = o;
                }
              return r;
            }),
            (t.paraSegment = function(t) {
              for (
                var e = "", r = [], i = !1, n = 0, o = !1, a = !1, s = 0;
                s < t.length;
                s++
              ) {
                if ("\\" == t[s]) {
                  if (s < t.length - 1) {
                    var u = [!0],
                      c = this.getEscapeCharacter2(t[s + 1], u);
                    u[0] ? (s++, (e += c)) : (e += t[++s]);
                    continue;
                  }
                  e += t[s];
                  break;
                }
                "(" === t[s] || "（" === t[s]
                  ? a
                    ? (e += t[s])
                    : (i
                        ? (n++, (e += t[s]))
                        : "" !== e.trim()
                        ? ((e += t[s]), (o = !0))
                        : s < t.length - 1 &&
                          this.needSaveBracket(t.substring(s + 1)) &&
                          ((e += t[s]), (o = !0)),
                      (i = !0))
                  : ")" === t[s] || "）" === t[s]
                  ? a
                    ? (e += t[s])
                    : 0 < n
                    ? (n--, (i = !0), (e += t[s]))
                    : (i = !(!i || !o) && ((e += t[s]), (o = !1)))
                  : '"' === t[s]
                  ? ((e += t[s]), (a = !a))
                  : "," === t[s] || "，" === t[s]
                  ? a
                    ? (e += t[s])
                    : i
                    ? (e += t[s])
                    : ("" !== e && r.push(e.trim()), (e = ""))
                  : (e += t[s]);
              }
              return "" !== e && r.push(e.trim()), r;
            }),
            (t.needSaveBracket = function(t) {
              for (var e = !1, r = 0, i = 0; i < t.length; i++) {
                if (e) {
                  if (" " === t[i]) continue;
                  return "," !== t[i] && "，" !== t[i];
                }
                "(" === t[i] || "（" === t[i]
                  ? r++
                  : (")" !== t[i] && "）" !== t[i]) || (0 < r ? r-- : (e = !0));
              }
              return !1;
            }),
            (t.isIDLegal = function(t) {
              for (var e = 0; e < t.length; e++)
                if (this._illegalChar[t[e]]) return !1;
              return !0;
            }),
            (t.isFormulaString = function(t) {
              for (var e = 0; e < t.length; e++)
                if (this._formulaChar[t[e]]) return !0;
              return !1;
            }),
            (t._illegalChar = {}),
            (t._formulaChar = {}),
            (t._escapeCharacters = {}),
            t
          );
        })();
        (r.VE_StringFormat = i).init();
      },
      {}
    ],
    71: [
      function(t, e, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", { value: !0 });
        var i = (function() {
          function e(t) {
            (this._transform = new n()), (this.mesh = null), (this.name = t);
          }
          return (
            Object.defineProperty(e.prototype, "gameObject", {
              get: function() {
                return this;
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(e.prototype, "transform", {
              get: function() {
                return this._transform;
              },
              enumerable: !0,
              configurable: !0
            }),
            (e.find = function(t) {
              return new e(t);
            }),
            e
          );
        })();
        r.GameObject = i;
        var n = (function() {
          function t() {
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
            Object.defineProperty(t.prototype, "childCount", {
              get: function() {
                return 0;
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(t.prototype, "hierarchyCount", {
              get: function() {
                return 0;
              },
              enumerable: !0,
              configurable: !0
            }),
            t
          );
        })();
        r.Transform = n;
      },
      {}
    ],
    72: [
      function(t, e, r) {
        "use strict";
        function i(t) {
          for (var e in t) r.hasOwnProperty(e) || (r[e] = t[e]);
        }
        Object.defineProperty(r, "__esModule", { value: !0 }),
          i(t("./veryVarManager")),
          i(t("./veryVariables")),
          i(t("./babylonVariables")),
          i(t("./variables"));
      },
      {
        "./babylonVariables": 71,
        "./variables": 73,
        "./veryVarManager": 74,
        "./veryVariables": 75
      }
    ],
    73: [
      function(t, e, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", { value: !0 });
        var i = t("../dataSource"),
          n = (function() {
            function t(t) {
              (this._projectName = ""),
                (this._veryVars = {}),
                (this._tempalteVars = {}),
                (this._expressions = {}),
                (this._projectName = t),
                (this.varData = new i.VE_VariableData(t));
            }
            return (
              Object.defineProperty(t.prototype, "projectName", {
                get: function() {
                  return this._projectName;
                },
                enumerable: !0,
                configurable: !0
              }),
              (t.prototype.isCreated = function(t) {
                return !!(
                  this._veryVars[t] ||
                  this._tempalteVars[t] ||
                  this._expressions[t]
                );
              }),
              (t.prototype.isCreatedVariable = function(t) {
                return !!this._veryVars[t];
              }),
              (t.prototype.addVariable = function(t, e) {
                this._veryVars[t] = e;
              }),
              (t.prototype.getVariable = function(t) {
                return this._veryVars[t];
              }),
              (t.prototype.isCreatedTemplate = function(t) {
                return !!this._tempalteVars[t];
              }),
              (t.prototype.addTemplate = function(t, e) {
                this._tempalteVars[t] = e;
              }),
              (t.prototype.getTemplate = function(t) {
                return this._tempalteVars[t];
              }),
              (t.prototype.isCreatedExpression = function(t) {
                return !!this._expressions[t];
              }),
              (t.prototype.addExpression = function(t, e) {
                this._expressions[t] = e;
              }),
              (t.prototype.getExpression = function(t) {
                return this._expressions[t];
              }),
              (t.prototype.clear = function() {
                this.varData && this.varData.clear(),
                  (this._veryVars = {}),
                  (this._expressions = {}),
                  (this._tempalteVars = {});
              }),
              t
            );
          })();
        r.VE_Variables = n;
      },
      { "../dataSource": 9 }
    ],
    74: [
      function(t, e, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", { value: !0 });
        var i = t("../html/showError"),
          n = (function() {
            function t() {}
            return (
              (t.hasVarType = function(t) {
                return (t = t.toLowerCase()), !!this._veryVarTypes[t];
              }),
              (t.addVarType = function(t, e) {
                (t = t.toLowerCase().trim()),
                  this._veryVarTypes[t]
                    ? i.ShowError.showError(
                        "VeryVar变量初始化错误，变量类型重复，当前变量名：" +
                          t +
                          "，当前变量类型：" +
                          e
                      )
                    : (this._veryVarTypes[t] = e);
              }),
              (t.createVar = function(t) {
                return (t = t.toLowerCase()), Object.create(this.getVarType(t));
              }),
              (t.createVariable = function(t, e, r, i) {
                var n;
                e = e.toLowerCase();
                try {
                  n = Object.create(this.getVarType(e));
                } catch (t) {
                  return (
                    console.log(t.message),
                    (i.isRight = !1),
                    (i.message =
                      "变量创建错误：当前类型在平台中不存在，请检查！类型名：" +
                      e +
                      "，错误原因：" +
                      t.message),
                    null
                  );
                }
                return null === n
                  ? ((i.isRight = !1),
                    (i.message =
                      "变量创建错误：当前类型在平台中不存在，请检查！类型名：" +
                      e),
                    null)
                  : n;
              }),
              (t.getVarType = function(t) {
                return (
                  (t = t.toLowerCase()),
                  this._veryVarTypes && this._veryVarTypes[t]
                    ? this._veryVarTypes[t]
                    : null
                );
              }),
              (t.remove = function(t) {
                (t = t.toLowerCase()), delete this._veryVarTypes[t];
              }),
              (t._veryVarTypes = {}),
              t
            );
          })();
        r.VeryVarManager = n;
      },
      { "../html/showError": 38 }
    ],
    75: [
      function(t, e, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", { value: !0 });
        var i = t("./veryVarManager"),
          n = (function() {
            function t() {
              (this._value = !1), (this._value = !1);
            }
            return (
              Object.defineProperty(t.prototype, "varType", {
                get: function() {
                  return "bool";
                },
                enumerable: !0,
                configurable: !0
              }),
              Object.defineProperty(t.prototype, "Value", {
                get: function() {
                  return this._value;
                },
                set: function(t) {
                  this._value = t;
                },
                enumerable: !0,
                configurable: !0
              }),
              (t.prototype.setValue = function(t) {
                this._value = t;
              }),
              (t.prototype.getValue = function() {
                return this._value;
              }),
              (t.prototype.initValue = function(t, e) {
                return (
                  "false" !== t.toLowerCase() &&
                  ("true" === t.toLowerCase() ||
                    ("" !== t &&
                      "null" !== t.toLowerCase() &&
                      "none" !== t.toLowerCase() &&
                      ((e.isRight = !1),
                      void (e.message =
                        "Type: " +
                        this.varType +
                        "，值：" +
                        t +
                        "，该变量值和类型不匹配，转化错误，请检查！"))))
                );
              }),
              t
            );
          })();
        r.VeryBool = n;
        var o = (function() {
          function t() {
            (this._value = 0), (this._value = 0);
          }
          return (
            Object.defineProperty(t.prototype, "varType", {
              get: function() {
                return "int";
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(t.prototype, "Value", {
              get: function() {
                return Math.round(this._value);
              },
              set: function(t) {
                this._value = Math.round(t);
              },
              enumerable: !0,
              configurable: !0
            }),
            (t.prototype.getValue = function() {
              return this.Value;
            }),
            (t.prototype.setValue = function(t) {
              this.Value = t;
            }),
            (t.prototype.initValue = function(t, e) {
              var r = parseFloat(t);
              return isNaN(r)
                ? ((e.isRight = !1),
                  void (e.message =
                    "Type: " +
                    this.varType +
                    "，值：" +
                    t +
                    "，该变量值和类型不匹配，转化错误，请检查！"))
                : Math.round(r);
            }),
            t
          );
        })();
        r.VeryInt = o;
        var a = (function() {
          function t() {
            (this._value = 0), (this._value = 0);
          }
          return (
            Object.defineProperty(t.prototype, "varType", {
              get: function() {
                return "float";
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(t.prototype, "Value", {
              get: function() {
                return this._value;
              },
              set: function(t) {
                this._value = t;
              },
              enumerable: !0,
              configurable: !0
            }),
            (t.prototype.setValue = function(t) {
              this._value = t;
            }),
            (t.prototype.getValue = function() {
              return this._value;
            }),
            (t.prototype.initValue = function(t, e) {
              var r = parseFloat(t);
              return isNaN(r)
                ? ((e.isRight = !1),
                  void (e.message =
                    "Type: " +
                    this.varType +
                    "，值：" +
                    t +
                    "，该变量值和类型不匹配，转化错误，请检查！"))
                : r;
            }),
            t
          );
        })();
        r.VeryFloat = a;
        var s = (function() {
          function t() {
            (this._value = 0), (this._value = 0);
          }
          return (
            Object.defineProperty(t.prototype, "varType", {
              get: function() {
                return "number";
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(t.prototype, "Value", {
              get: function() {
                return this._value;
              },
              set: function(t) {
                this._value = t;
              },
              enumerable: !0,
              configurable: !0
            }),
            (t.prototype.setValue = function(t) {
              this._value = t;
            }),
            (t.prototype.getValue = function() {
              return this._value;
            }),
            (t.prototype.initValue = function(t, e) {
              var r = parseFloat(t);
              return isNaN(r)
                ? ((e.isRight = !1),
                  void (e.message =
                    "Type: " +
                    this.varType +
                    "，值：" +
                    t +
                    "，该变量值和类型不匹配，转化错误，请检查！"))
                : r;
            }),
            t
          );
        })();
        r.VeryNumber = s;
        var u = (function() {
          function t() {
            (this._value = ""), (this._value = "");
          }
          return (
            Object.defineProperty(t.prototype, "varType", {
              get: function() {
                return "string";
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(t.prototype, "Value", {
              get: function() {
                return this._value;
              },
              set: function(t) {
                this._value = t;
              },
              enumerable: !0,
              configurable: !0
            }),
            (t.prototype.getValue = function() {
              return this._value;
            }),
            (t.prototype.setValue = function(t) {
              this._value = t;
            }),
            (t.prototype.initValue = function(t, e) {
              t.startsWith("'") ||
              t.startsWith('"') ||
              t.startsWith("“") ||
              t.startsWith("‘")
                ? (this._value = t.substr(1, t.length - 2))
                : (this._value = t),
                (e.isRight = !0);
            }),
            t
          );
        })();
        r.VeryString = u;
        var c = (function() {
          function t() {
            (this._value = BABYLON.Vector3.Zero()),
              (this._value = BABYLON.Vector3.Zero());
          }
          return (
            Object.defineProperty(t.prototype, "varType", {
              get: function() {
                return "vector3";
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(t.prototype, "Value", {
              get: function() {
                return this._value;
              },
              set: function(t) {
                this._value = t;
              },
              enumerable: !0,
              configurable: !0
            }),
            (t.prototype.getValue = function() {
              return this._value;
            }),
            (t.prototype.setValue = function(t) {
              this._value = t;
            }),
            (t.prototype.initValue = function(t, e) {
              "none" === t ||
                "null" === t ||
                ((e.isRight = !1),
                (e.message =
                  "Type: " +
                  this.varType +
                  "，值：" +
                  t +
                  "，该变量值和类型不匹配，转化错误，请检查！"));
            }),
            t
          );
        })();
        (r.VeryVector3 = c),
          i.VeryVarManager.addVarType("bool", new n()),
          i.VeryVarManager.addVarType("开关", new n()),
          i.VeryVarManager.addVarType("int", new o()),
          i.VeryVarManager.addVarType("float", new a()),
          i.VeryVarManager.addVarType("number", new s()),
          i.VeryVarManager.addVarType("数字", new s()),
          i.VeryVarManager.addVarType("string", new u()),
          i.VeryVarManager.addVarType("字符串", new u()),
          i.VeryVarManager.addVarType("vector3", new c()),
          i.VeryVarManager.addVarType("响应", new c());
      },
      { "./veryVarManager": 74 }
    ],
    76: [
      function(t, e, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", { value: !0 });
        var i = t("../verytable/index"),
          n = t("./html/showError"),
          o = t("./loader/loaderManager");
        !(function(t) {
          for (var e in t) r.hasOwnProperty(e) || (r[e] = t[e]);
        })(t("./index"));
        var a = (function() {
          function t() {}
          return (
            (t.prototype.init = function(t, e) {
              var r = new i.VeryTable(t, "VeRyEngine");
              console.log("开始"), new o.LoaderManager().load(projectName, r);
            }),
            (t.prototype.showErrorTest = function(t) {
              n.ShowError.show(
                "大股东萨芬个是电饭锅三分隔收费的发大股东萨芬个是电饭锅三分隔收费的发大股东萨芬个是电饭锅三分隔收费的发大股东萨芬个是电饭锅三分隔收费的发大股东萨芬个是电饭锅三分隔收费的发大股东萨芬个是电饭锅三分隔收费的发，错误位置：" +
                  t.pos(7, 5)
              ),
                n.ShowError.showError(
                  "大股东萨芬个是电饭锅三分隔收费的发，错误位置：" + t.pos(7, 5)
                ),
                n.ShowError.showWarn(
                  "大股东萨芬个是电饭锅三分隔收费的发，错误位置：" + t.pos(7, 5)
                ),
                n.ShowError.show(
                  "大股东萨芬个是电饭锅三分隔收费的发，错误位置：" + t.pos(7, 5)
                ),
                n.ShowError.show(
                  "大股东萨芬个是电饭锅三分隔收费的发，错误位置：" + t.pos(7, 5)
                ),
                document
                  .getElementById("settingsButton")
                  .addEventListener("click", n.ShowError.close);
            }),
            t
          );
        })();
        r.VeryEngine = a;
      },
      {
        "../verytable/index": 77,
        "./html/showError": 38,
        "./index": 39,
        "./loader/loaderManager": 46
      }
    ],
    77: [
      function(t, e, r) {
        "use strict";
        function i(t) {
          for (var e in t) r.hasOwnProperty(e) || (r[e] = t[e]);
        }
        Object.defineProperty(r, "__esModule", { value: !0 }),
          i(t("./veryTableRow")),
          i(t("./veryTable")),
          i(t("./veryTableSet"));
      },
      { "./veryTable": 78, "./veryTableRow": 79, "./veryTableSet": 80 }
    ],
    78: [
      function(t, e, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", { value: !0 });
        var n = t("./veryTableRow"),
          i = (function() {
            function t(t, e) {
              if (
                (void 0 === e && (e = "默认Sheet"),
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
                (this._id = e),
                (this._rows = []),
                t)
              )
                for (var r = 0; r < t.length; r++) {
                  var i = new n.VeryTableRow(t[r]);
                  this._rows.push(i);
                }
            }
            return (
              Object.defineProperty(t.prototype, "ID", {
                get: function() {
                  return this._id;
                },
                set: function(t) {
                  this._id = t;
                },
                enumerable: !0,
                configurable: !0
              }),
              Object.defineProperty(t.prototype, "RowCount", {
                get: function() {
                  return this._rows ? this._rows.length : 0;
                },
                enumerable: !0,
                configurable: !0
              }),
              (t.prototype.getData = function(t, e) {
                return this._rows[t].getData(e);
              }),
              (t.prototype.getRow = function(t) {
                return 0 <= t && t < this._rows.length ? this._rows[t] : void 0;
              }),
              (t.prototype.pos = function(t, e) {
                return (
                  "表名：" +
                  this.ID +
                  "，位置：（" +
                  (t + 1) +
                  "，" +
                  this.getColumnID(e) +
                  "）"
                );
              }),
              (t.prototype.getColumnID = function(t) {
                if (0 <= t && t < 26) return this._columnIDs[t];
                if (t < 0) return "error";
                var e = Math.floor(t / 26),
                  r = t % 26;
                return 0 === e
                  ? this._columnIDs[e]
                  : this._columnIDs[e - 1] + this._columnIDs[r];
              }),
              (t.prototype.addRow = function(t) {
                this._rows.push(t);
              }),
              t
            );
          })();
        r.VeryTable = i;
      },
      { "./veryTableRow": 79 }
    ],
    79: [
      function(t, e, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", { value: !0 });
        var i = (function() {
          function t(t) {
            (this._rowData = []), (this._rowData = t);
          }
          return (
            Object.defineProperty(t.prototype, "Count", {
              get: function() {
                return this._rowData ? this._rowData.length : 0;
              },
              enumerable: !0,
              configurable: !0
            }),
            (t.prototype.getData = function(t) {
              return this._rowData[t];
            }),
            (t.prototype.add = function(t) {
              this._rowData.push(t);
            }),
            (t.prototype.insert = function(t, e) {
              this._rowData.push(e);
              var r = this._rowData.slice(t);
              r.push(e), (this._rowData = r);
            }),
            (t.prototype.remove = function(t) {
              this._rowData.splice(t, 1);
            }),
            (t.prototype.removeEnd = function() {
              this._rowData.pop();
            }),
            t
          );
        })();
        r.VeryTableRow = i;
      },
      {}
    ],
    80: [
      function(t, e, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", { value: !0 });
        var i = (function() {
          function t(t) {
            (this._tables = []), t && (this._tables = t);
          }
          return (
            Object.defineProperty(t.prototype, "Count", {
              get: function() {
                return this._tables ? this._tables.length : 0;
              },
              enumerable: !0,
              configurable: !0
            }),
            (t.prototype.getTable = function(t) {
              return 0 <= t && t < this.Count ? this._tables[t] : void 0;
            }),
            (t.prototype.addTable = function(t) {
              this._tables.push(t);
            }),
            (t.prototype.removeTable = function(t) {
              0 <= t && t < this.Count && this._tables.splice(t, 1);
            }),
            t
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
