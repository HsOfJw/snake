(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/layer/MaskLayer.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'fbf207PLhxNHbEXI9mLPYma', 'MaskLayer', __filename);
// scripts/layer/MaskLayer.js

"use strict";

var Util = require("Util");
cc.Class({
    extends: cc.Component,

    properties: {},

    onLoad: function onLoad() {
        this.node.on(cc.Node.EventType.TOUCH_START, this.maskLayerClicked.bind(this));
    },
    start: function start() {},
    maskLayerClicked: function maskLayerClicked() {
        return false;
    }
}

// update (dt) {},
);

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
        //# sourceMappingURL=MaskLayer.js.map
        