(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/PopUpMgr.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'f3b2eAC1U5DUbFv58COq2lg', 'PopUpMgr', __filename);
// scripts/PopUpMgr.js

"use strict";

window.Game = window.Game || {};

window.Game.PopUpMgr = {

    Show_ScaleEffect: function Show_ScaleEffect(node, duration) {
        if (duration == undefined) {
            duration = GameConfig.PopUpDuration;
        }
        node.active = true;
        node.setScale(0.1, 0.1);

        var action1 = new cc.scaleTo(duration, 1, 1);
        var action2 = new cc.scaleTo(duration, 1, 1);
        node.runAction(cc.sequence(action1, cc.callFunc(function () {
            node.setScale(1, 1);
        })));
    },

    Hide_ScaleEffect: function Hide_ScaleEffect(node, duration) {
        if (duration == undefined) {
            duration = GameConfig.PopUpDuration;
        }

        var action1 = new cc.scaleTo(duration, 0, 0);
        node.runAction(new cc.sequence(action1, cc.callFunc(function () {
            node.active = false;
        })));
    }
};

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
        //# sourceMappingURL=PopUpMgr.js.map
        