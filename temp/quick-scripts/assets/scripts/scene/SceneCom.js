(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/scene/SceneCom.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '84d50+SeepBiIUArlC+mfFM', 'SceneCom', __filename);
// scripts/scene/SceneCom.js

"use strict";

cc.Class({
    extends: cc.Component,

    doCtor: function doCtor() {
        cc.log(this.name, "------------->>>doCtor");
    },
    doEnter: function doEnter() {
        cc.log(this.name, "------------->>>doEnter");

        this.node.active = true;
    },
    doExit: function doExit() {
        cc.log(this.name, "------------->>>doExit");

        this.node.x = 0;
        this.node.y = 0;

        this.node.active = false;

        this.node.stopAllActions();
    },
    frameOnMove: function frameOnMove(dt) {}
});

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=SceneCom.js.map
        