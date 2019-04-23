<<<<<<< HEAD
!(function o(s, u, a) {
  function c(t, e) {
    if (!u[t]) {
      if (!s[t]) {
        var n = "function" == typeof require && require;
        if (!e && n) return n(t, !0);
        if (h) return h(t, !0);
        var r = new Error("Cannot find module '" + t + "'");
        throw ((r.code = "MODULE_NOT_FOUND"), r);
      }
      var i = (u[t] = { exports: {} });
      s[t][0].call(
        i.exports,
        function(e) {
          return c(s[t][1][e] || e);
        },
        i,
        i.exports,
        o,
        s,
        u,
        a
      );
    }
    return u[t].exports;
  }
  for (
    var h = "function" == typeof require && require, e = 0;
    e < a.length;
    e++
  )
    c(a[e]);
  return c;
})(
  {
    1: [
      function(e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", { value: !0 });
        var i = e("./veryengine/veryEngine"),
          r = (function() {
            function e(e, t) {
              (this._showFps = !0),
                (this._canvas = e),
                (this._fps = t),
                (this._table = document.getElementById("VeryTable"));
            }
            return (
              (e.prototype.createScene = function() {
                this._engine && this._engine.dispose(),
                  (this._engine = new BABYLON.Engine(this._canvas, !0));
                var e = this._engine;
                window.addEventListener("resize", function() {
                  e.resize();
                }),
                  (this._scene = new BABYLON.Scene(this._engine));
                var t = new BABYLON.Vector3(0, 5, -10),
                  n = new BABYLON.FreeCamera("maincam", t, this._scene);
                n.setTarget(BABYLON.Vector3.Zero()),
                  n.attachControl(this._canvas, !1);
                var r = new BABYLON.Vector3(0, 1, 0);
                new BABYLON.HemisphericLight("hemlight", r, this._scene);
                BABYLON.MeshBuilder.CreateSphere(
                  "mainsphere",
                  { segments: 16, diameter: 1 },
                  this._scene
                ).position.y = 1;
                return (
                  BABYLON.MeshBuilder.CreateGround(
                    "mainground",
                    { width: 6, height: 6, subdivisions: 2 },
                    this._scene
                  ),
                  new i.VeryEngine().init(hot1.getData(), projectName),
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
        n.default = r;
      },
      { "./veryengine/veryEngine": 3 }
    ],
    2: [
      function(e, t, n) {
        "use strict";
        var r =
          (this && this.__importDefault) ||
          function(e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(n, "__esModule", { value: !0 });
        var i,
          o,
          s,
          u = r(e("./game"));
        document
          .getElementById("runButton")
          .addEventListener("click", function() {
            i && i.createScene().animate();
          }),
          document
            .getElementById("debugButton")
            .addEventListener("click", function() {
              i && i.toggleDebug();
            }),
          (o = document.getElementById("renderCanvas")),
          (s = document.getElementById("fpsLabel")),
          null !== o &&
            null !== s &&
            (i = new u.default(o, s)).createScene().animate();
      },
      { "./game": 1 }
    ],
    3: [
      function(e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", { value: !0 });
        var r = e("../verytable/index"),
          i = (function() {
            function e() {}
            return (
              (e.prototype.init = function(e, t) {
                var n = new r.VeryTable(e);
                console.log(n.pos(7, 5));
              }),
              e
            );
          })();
        n.VeryEngine = i;
      },
      { "../verytable/index": 4 }
    ],
    4: [
      function(e, t, n) {
        "use strict";
        function r(e) {
          for (var t in e) n.hasOwnProperty(t) || (n[t] = e[t]);
        }
        Object.defineProperty(n, "__esModule", { value: !0 }),
          r(e("./veryTableRow")),
          r(e("./veryTable")),
          r(e("./veryTableSet"));
      },
      { "./veryTable": 5, "./veryTableRow": 6, "./veryTableSet": 7 }
    ],
    5: [
      function(e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", { value: !0 });
        var i = e("./veryTableRow"),
          r = (function() {
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
                for (var n = 0; n < e.length; n++) {
                  var r = new i.VeryTableRow(e[n]);
                  this._rows.push(r);
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
                return 0 <= e && e < this._rows.length
                  ? this._rows[e].getData(t)
                  : void 0;
              }),
              (e.prototype.getRow = function(e) {
                return 0 <= e && e < this._rows.length ? this._rows[e] : void 0;
              }),
              (e.prototype.pos = function(e, t) {
                return (
                  "表名：" +
                  this.ID +
                  "，位置：（" +
                  (e + 1) +
                  "，" +
                  this.getColumnID(t) +
                  "）"
                );
              }),
              (e.prototype.getColumnID = function(e) {
                if (0 <= e && e < 26) return this._columnIDs[e];
                if (e < 0) return "error";
                var t = Math.floor(e / 26),
                  n = e % 26;
                return 0 === t
                  ? this._columnIDs[t]
                  : this._columnIDs[t - 1] + this._columnIDs[n];
              }),
              (e.prototype.addRow = function(e) {
                this._rows.push(e);
              }),
              e
            );
          })();
        n.VeryTable = r;
      },
      { "./veryTableRow": 6 }
    ],
    6: [
      function(e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", { value: !0 });
        var r = (function() {
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
              return 0 <= e && e < this.Count ? this._rowData[e] : void 0;
            }),
            (e.prototype.add = function(e) {
              this._rowData.push(e);
            }),
            (e.prototype.insert = function(e, t) {
              this._rowData.push(t);
              var n = this._rowData.slice(e);
              n.push(t), (this._rowData = n);
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
        n.VeryTableRow = r;
      },
      {}
    ],
    7: [
      function(e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", { value: !0 });
        var r = (function() {
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
        n.VeryTableSet = r;
      },
      {}
    ]
  },
  {},
  [2]
);
=======
!function o(s,u,a){function c(t,e){if(!u[t]){if(!s[t]){var n="function"==typeof require&&require;if(!e&&n)return n(t,!0);if(h)return h(t,!0);var r=new Error("Cannot find module '"+t+"'");throw r.code="MODULE_NOT_FOUND",r}var i=u[t]={exports:{}};s[t][0].call(i.exports,function(e){return c(s[t][1][e]||e)},i,i.exports,o,s,u,a)}return u[t].exports}for(var h="function"==typeof require&&require,e=0;e<a.length;e++)c(a[e]);return c}({1:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var i=e("./veryengine/veryEngine"),r=function(){function e(e,t){this._showFps=!0,this._canvas=e,this._fps=t,this._table=document.getElementById("VeryTable")}return e.prototype.createScene=function(){this._engine&&this._engine.dispose(),this._engine=new BABYLON.Engine(this._canvas,!0);var e=this._engine;window.addEventListener("resize",function(){e.resize()}),this._scene=new BABYLON.Scene(this._engine);var t=new BABYLON.Vector3(0,5,-10),n=new BABYLON.FreeCamera("maincam",t,this._scene);n.setTarget(BABYLON.Vector3.Zero()),n.attachControl(this._canvas,!1);var r=new BABYLON.Vector3(0,1,0);new BABYLON.HemisphericLight("hemlight",r,this._scene);BABYLON.MeshBuilder.CreateSphere("mainsphere",{segments:16,diameter:1},this._scene).position.y=1;return BABYLON.MeshBuilder.CreateGround("mainground",{width:6,height:6,subdivisions:2},this._scene),(new i.VeryEngine).init(hot1.getData(),projectName),this},e.prototype.animate=function(){var e=this;return this._engine.runRenderLoop(function(){e._canvas.width!==e._canvas.clientWidth&&e._engine.resize(),e._scene&&e._scene.render(),e._showFps&&e.updateFpsPos()}),this},e.prototype.toggleDebug=function(){if(this._engine){var e=this._engine.scenes[0];e.debugLayer.isVisible()?e.debugLayer.hide():e.debugLayer.show({embedMode:!0})}return this},e.prototype.updateFpsPos=function(){this._fps&&(this._fps.style.right=document.body.clientWidth-(this._table.clientWidth+this._canvas.clientWidth)+"px",this._fps.innerHTML=this._engine.getFps().toFixed()+" fps")},e}();n.default=r},{"./veryengine/veryEngine":3}],2:[function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(n,"__esModule",{value:!0});var i,o,s,u=r(e("./game"));document.getElementById("runButton").addEventListener("click",function(){i&&i.createScene().animate()}),document.getElementById("debugButton").addEventListener("click",function(){i&&i.toggleDebug()}),o=document.getElementById("renderCanvas"),s=document.getElementById("fpsLabel"),null!==o&&null!==s&&(i=new u.default(o,s)).createScene().animate()},{"./game":1}],3:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var r=e("../verytable/index"),i=function(){function e(){}return e.prototype.init=function(e,t){var n=new r.VeryTable(e);console.log(n.pos(7,5))},e}();n.VeryEngine=i},{"../verytable/index":4}],4:[function(e,t,n){"use strict";function r(e){for(var t in e)n.hasOwnProperty(t)||(n[t]=e[t])}Object.defineProperty(n,"__esModule",{value:!0}),r(e("./veryTableRow")),r(e("./veryTable")),r(e("./veryTableSet"))},{"./veryTable":5,"./veryTableRow":6,"./veryTableSet":7}],5:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var i=e("./veryTableRow"),r=function(){function e(e,t){if(void 0===t&&(t="默认Sheet"),this._id="",this._columnIDs=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],this._rows=[],this._id=t,this._rows=[],e)for(var n=0;n<e.length;n++){var r=new i.VeryTableRow(e[n]);this._rows.push(r)}}return Object.defineProperty(e.prototype,"ID",{get:function(){return this._id},set:function(e){this._id=e},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"RowCount",{get:function(){return this._rows?this._rows.length:0},enumerable:!0,configurable:!0}),e.prototype.getData=function(e,t){return 0<=e&&e<this._rows.length?this._rows[e].getData(t):void 0},e.prototype.getRow=function(e){return 0<=e&&e<this._rows.length?this._rows[e]:void 0},e.prototype.pos=function(e,t){return"表名："+this.ID+"，位置：（"+(e+1)+"，"+this.getColumnID(t)+"）"},e.prototype.getColumnID=function(e){if(0<=e&&e<26)return this._columnIDs[e];if(e<0)return"error";var t=Math.floor(e/26),n=e%26;return 0===t?this._columnIDs[t]:this._columnIDs[t-1]+this._columnIDs[n]},e.prototype.addRow=function(e){this._rows.push(e)},e}();n.VeryTable=r},{"./veryTableRow":6}],6:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var r=function(){function e(e){this._rowData=[],this._rowData=e}return Object.defineProperty(e.prototype,"Count",{get:function(){return this._rowData?this._rowData.length:0},enumerable:!0,configurable:!0}),e.prototype.getData=function(e){return 0<=e&&e<this.Count?this._rowData[e]:void 0},e.prototype.add=function(e){this._rowData.push(e)},e.prototype.insert=function(e,t){this._rowData.push(t);var n=this._rowData.slice(e);n.push(t),this._rowData=n},e.prototype.remove=function(e){this._rowData.splice(e,1)},e.prototype.removeEnd=function(){this._rowData.pop()},e}();n.VeryTableRow=r},{}],7:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var r=function(){function e(e){this._tables=[],e&&(this._tables=e)}return Object.defineProperty(e.prototype,"Count",{get:function(){return this._tables?this._tables.length:0},enumerable:!0,configurable:!0}),e.prototype.getTable=function(e){return 0<=e&&e<this.Count?this._tables[e]:void 0},e.prototype.addTable=function(e){this._tables.push(e)},e.prototype.removeTable=function(e){0<=e&&e<this.Count&&this._tables.splice(e,1)},e}();n.VeryTableSet=r},{}]},{},[2]);
>>>>>>> 3b68f939e26acc0de5856e15f90ceeae73cef756
//# sourceMappingURL=veryengine.js.map
