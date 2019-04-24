!function i(s,a,u){function c(t,e){if(!a[t]){if(!s[t]){var r="function"==typeof require&&require;if(!e&&r)return r(t,!0);if(l)return l(t,!0);var n=new Error("Cannot find module '"+t+"'");throw n.code="MODULE_NOT_FOUND",n}var o=a[t]={exports:{}};s[t][0].call(o.exports,function(e){return c(s[t][1][e]||e)},o,o.exports,i,s,a,u)}return a[t].exports}for(var l="function"==typeof require&&require,e=0;e<u.length;e++)c(u[e]);return c}({1:[function(e,t,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var o=e("./veryengine/veryEngine"),n=function(){function e(e,t){this._showFps=!0,this._canvas=e,this._fps=t,this._table=document.getElementById("VeryTable")}return e.prototype.createScene=function(){this._engine&&this._engine.dispose(),this._engine=new BABYLON.Engine(this._canvas,!0);var e=this._engine;window.addEventListener("resize",function(){e.resize()}),this._scene=new BABYLON.Scene(this._engine);var t=new BABYLON.Vector3(0,5,-10),r=new BABYLON.FreeCamera("maincam",t,this._scene);r.setTarget(BABYLON.Vector3.Zero()),r.attachControl(this._canvas,!1);var n=new BABYLON.Vector3(0,1,0);new BABYLON.HemisphericLight("hemlight",n,this._scene);BABYLON.MeshBuilder.CreateSphere("mainsphere",{segments:16,diameter:1},this._scene).position.y=1;return BABYLON.MeshBuilder.CreateGround("mainground",{width:6,height:6,subdivisions:2},this._scene),(new o.VeryEngine).init(hot1.getData(),projectName),this},e.prototype.animate=function(){var e=this;return this._engine.runRenderLoop(function(){e._canvas.width!==e._canvas.clientWidth&&e._engine.resize(),e._scene&&e._scene.render(),e._showFps&&e.updateFpsPos()}),this},e.prototype.toggleDebug=function(){if(this._engine){var e=this._engine.scenes[0];e.debugLayer.isVisible()?e.debugLayer.hide():e.debugLayer.show({embedMode:!0})}return this},e.prototype.updateFpsPos=function(){this._fps&&(this._fps.style.right=document.body.clientWidth-(this._table.clientWidth+this._canvas.clientWidth)+"px",this._fps.innerHTML=this._engine.getFps().toFixed()+" fps")},e}();r.default=n},{"./veryengine/veryEngine":8}],2:[function(e,t,r){"use strict";var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(r,"__esModule",{value:!0});var o,i,s,a=n(e("./game"));document.getElementById("runButton").addEventListener("click",function(){o&&o.createScene().animate()}),document.getElementById("debugButton").addEventListener("click",function(){o&&o.toggleDebug()}),i=document.getElementById("renderCanvas"),s=document.getElementById("fpsLabel"),null!==i&&null!==s&&(o=new a.default(i,s)).createScene().animate()},{"./game":1}],3:[function(e,t,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n=function(){function r(){}return r.initZone=function(){this.errorZone||(this.errorZone=document.getElementById("errorZone"))},r.showMsg=function(e,t){this.initZone(),this.errorContentNow||(this.errorContentNow=this.errorContentPrefix),this.errorContentNow+=e+t+"<br/>",this.errorZone.style.display="block",this.errorZone.innerHTML=this.errorContentNow+"</div>";var r=this.errorZone.querySelector(".close"),n=this;r.addEventListener("click",function(){n.errorZone.style.display="none"})},r.show=function(e){this.showMsg("打印信息>>>",e)},r.showError=function(e){this.showMsg("错误信息>>>",e)},r.showWarn=function(e){this.showMsg("警告信息>>>",e)},r.clear=function(){r.initZone(),r.errorContentNow=r.errorContentPrefix,r.errorZone.innerHTML=r.errorContentNow+"</div>";var e=r.errorZone.querySelector(".close"),t=r;e.addEventListener("click",function(){t.errorZone.style.display="none"})},r.close=function(){r.initZone(),"none"===r.errorZone.style.display?r.errorZone.style.display="block":r.errorZone.style.display="none"},r.errorContentPrefix='<div class="alert alert-error"><button type="button" class="close" data-dismiss="alert">&times;</button>',r}();r.ShowError=n},{}],4:[function(e,t,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),function(e){for(var t in e)r.hasOwnProperty(t)||(r[t]=e[t])}(e("./variables/index"))},{"./variables/index":5}],5:[function(e,t,r){"use strict";function n(e){for(var t in e)r.hasOwnProperty(t)||(r[t]=e[t])}Object.defineProperty(r,"__esModule",{value:!0}),n(e("./veryVarManager")),n(e("./veryVariables"))},{"./veryVarManager":6,"./veryVariables":7}],6:[function(e,t,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n=e("../html/showError"),o=function(){function e(){}return e.HasVarType=function(e){return!!this.VeryVarTypes[e]},e.AddVarType=function(e,t){this.VeryVarTypes[e]?n.ShowError.showError("VeryVar变量初始化错误，变量类型重复，当前变量名："+e+"，当前变量类型："+t):this.VeryVarTypes[e]=t},e.CreateVar=function(e){return Object.create(this.GetVarType(e))},e.GetVarType=function(e){return this.VeryVarTypes&&this.VeryVarTypes[e]?this.VeryVarTypes[e]:null},e.VeryVarTypes={},e}();r.VeryVarManager=o},{"../html/showError":3}],7:[function(e,t,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n=e("./veryVarManager"),o=function(){function e(){this.VarType="Bool",this._value=!1,this._value=!1}return Object.defineProperty(e.prototype,"Value",{get:function(){return this._value},set:function(e){this._value=e},enumerable:!0,configurable:!0}),e.prototype.setValue=function(e){this._value=e},e.prototype.getValue=function(){return this._value},e.prototype.initValue=function(e,t){return"false"!==e.toLowerCase()&&("true"===e.toLowerCase()||""!==e&&"null"!==e.toLowerCase()&&"none"!==e.toLowerCase()&&(t.isRight=!1,void(t.message="Type: "+this.VarType+"，值："+e+"，该变量值和类型不匹配，转化错误，请检查！")))},e}();r.VeryBool=o;var i=function(){function e(){this.VarType="Int",this._value=0,this._value=0}return Object.defineProperty(e.prototype,"Value",{get:function(){return Math.round(this._value)},set:function(e){this._value=Math.round(e)},enumerable:!0,configurable:!0}),e.prototype.getValue=function(){return this.Value},e.prototype.setValue=function(e){this.Value=e},e.prototype.initValue=function(e,t){var r=parseFloat(e);return isNaN(r)?(t.isRight=!1,void(t.message="Type: "+this.VarType+"，值："+e+"，该变量值和类型不匹配，转化错误，请检查！")):Math.round(r)},e}();r.VeryInt=i;var s=function(){function e(){this.VarType="Float",this._value=0,this._value=0}return Object.defineProperty(e.prototype,"Value",{get:function(){return this._value},set:function(e){this._value=e},enumerable:!0,configurable:!0}),e.prototype.setValue=function(e){this._value=e},e.prototype.getValue=function(){return this._value},e.prototype.initValue=function(e,t){var r=parseFloat(e);return isNaN(r)?(t.isRight=!1,void(t.message="Type: "+this.VarType+"，值："+e+"，该变量值和类型不匹配，转化错误，请检查！")):r},e}();r.VeryFloat=s;var a=function(){function e(){this.VarType="Number",this._value=0,this._value=0}return Object.defineProperty(e.prototype,"Value",{get:function(){return this._value},set:function(e){this._value=e},enumerable:!0,configurable:!0}),e.prototype.setValue=function(e){this._value=e},e.prototype.getValue=function(){return this._value},e.prototype.initValue=function(e,t){var r=parseFloat(e);return isNaN(r)?(t.isRight=!1,void(t.message="Type: "+this.VarType+"，值："+e+"，该变量值和类型不匹配，转化错误，请检查！")):r},e}();r.VeryNumber=a;var u=function(){function e(){this.VarType="String",this._value="",this._value=""}return Object.defineProperty(e.prototype,"Value",{get:function(){return this._value},set:function(e){this._value=e},enumerable:!0,configurable:!0}),e.prototype.getValue=function(){return this._value},e.prototype.setValue=function(e){this._value=e},e.prototype.initValue=function(e,t){e.startsWith("'")||e.startsWith('"')||e.startsWith("“")||e.startsWith("‘")?this._value=e.substr(1,e.length-2):this._value=e,t.isRight=!0},e}();r.VeryString=u;var c=function(){function e(){this.VarType="Vector3",this._value=BABYLON.Vector3.Zero(),this._value=BABYLON.Vector3.Zero()}return Object.defineProperty(e.prototype,"Value",{get:function(){return this._value},set:function(e){this._value=e},enumerable:!0,configurable:!0}),e.prototype.getValue=function(){return this._value},e.prototype.setValue=function(e){this._value=e},e.prototype.initValue=function(e,t){"none"===e||"null"===e||(t.isRight=!1,t.message="Type: "+this.VarType+"，值："+e+"，该变量值和类型不匹配，转化错误，请检查！")},e}();r.VeryVector3=c,n.VeryVarManager.AddVarType("bool",new o),n.VeryVarManager.AddVarType("开关",new o),n.VeryVarManager.AddVarType("int",new i),n.VeryVarManager.AddVarType("float",new s),n.VeryVarManager.AddVarType("number",new a),n.VeryVarManager.AddVarType("数字",new a),n.VeryVarManager.AddVarType("string",new u),n.VeryVarManager.AddVarType("字符串",new u),n.VeryVarManager.AddVarType("vector3",new c),n.VeryVarManager.AddVarType("响应",new c)},{"./veryVarManager":6}],8:[function(e,t,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n=e("../verytable/index"),o=e("./html/showError");!function(e){for(var t in e)r.hasOwnProperty(t)||(r[t]=e[t])}(e("./index"));var i=function(){function e(){}return e.prototype.init=function(e,t){var r=new n.VeryTable(e);console.log(r.pos(7,5))},e.prototype.showErrorTest=function(e){o.ShowError.show("大股东萨芬个是电饭锅三分隔收费的发大股东萨芬个是电饭锅三分隔收费的发大股东萨芬个是电饭锅三分隔收费的发大股东萨芬个是电饭锅三分隔收费的发大股东萨芬个是电饭锅三分隔收费的发大股东萨芬个是电饭锅三分隔收费的发，错误位置："+e.pos(7,5)),o.ShowError.showError("大股东萨芬个是电饭锅三分隔收费的发，错误位置："+e.pos(7,5)),o.ShowError.showWarn("大股东萨芬个是电饭锅三分隔收费的发，错误位置："+e.pos(7,5)),o.ShowError.show("大股东萨芬个是电饭锅三分隔收费的发，错误位置："+e.pos(7,5)),o.ShowError.show("大股东萨芬个是电饭锅三分隔收费的发，错误位置："+e.pos(7,5)),document.getElementById("settingsButton").addEventListener("click",o.ShowError.close)},e}();r.VeryEngine=i},{"../verytable/index":9,"./html/showError":3,"./index":4}],9:[function(e,t,r){"use strict";function n(e){for(var t in e)r.hasOwnProperty(t)||(r[t]=e[t])}Object.defineProperty(r,"__esModule",{value:!0}),n(e("./veryTableRow")),n(e("./veryTable")),n(e("./veryTableSet"))},{"./veryTable":10,"./veryTableRow":11,"./veryTableSet":12}],10:[function(e,t,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var o=e("./veryTableRow"),n=function(){function e(e,t){if(void 0===t&&(t="默认Sheet"),this._id="",this._columnIDs=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],this._rows=[],this._id=t,this._rows=[],e)for(var r=0;r<e.length;r++){var n=new o.VeryTableRow(e[r]);this._rows.push(n)}}return Object.defineProperty(e.prototype,"ID",{get:function(){return this._id},set:function(e){this._id=e},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"RowCount",{get:function(){return this._rows?this._rows.length:0},enumerable:!0,configurable:!0}),e.prototype.getData=function(e,t){return 0<=e&&e<this._rows.length?this._rows[e].getData(t):void 0},e.prototype.getRow=function(e){return 0<=e&&e<this._rows.length?this._rows[e]:void 0},e.prototype.pos=function(e,t){return"表名："+this.ID+"，位置：（"+(e+1)+"，"+this.getColumnID(t)+"）"},e.prototype.getColumnID=function(e){if(0<=e&&e<26)return this._columnIDs[e];if(e<0)return"error";var t=Math.floor(e/26),r=e%26;return 0===t?this._columnIDs[t]:this._columnIDs[t-1]+this._columnIDs[r]},e.prototype.addRow=function(e){this._rows.push(e)},e}();r.VeryTable=n},{"./veryTableRow":11}],11:[function(e,t,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n=function(){function e(e){this._rowData=[],this._rowData=e}return Object.defineProperty(e.prototype,"Count",{get:function(){return this._rowData?this._rowData.length:0},enumerable:!0,configurable:!0}),e.prototype.getData=function(e){return 0<=e&&e<this.Count?this._rowData[e]:void 0},e.prototype.add=function(e){this._rowData.push(e)},e.prototype.insert=function(e,t){this._rowData.push(t);var r=this._rowData.slice(e);r.push(t),this._rowData=r},e.prototype.remove=function(e){this._rowData.splice(e,1)},e.prototype.removeEnd=function(){this._rowData.pop()},e}();r.VeryTableRow=n},{}],12:[function(e,t,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n=function(){function e(e){this._tables=[],e&&(this._tables=e)}return Object.defineProperty(e.prototype,"Count",{get:function(){return this._tables?this._tables.length:0},enumerable:!0,configurable:!0}),e.prototype.getTable=function(e){return 0<=e&&e<this.Count?this._tables[e]:void 0},e.prototype.addTable=function(e){this._tables.push(e)},e.prototype.removeTable=function(e){0<=e&&e<this.Count&&this._tables.splice(e,1)},e}();r.VeryTableSet=n},{}]},{},[2]);
//# sourceMappingURL=veryengine.js.map
