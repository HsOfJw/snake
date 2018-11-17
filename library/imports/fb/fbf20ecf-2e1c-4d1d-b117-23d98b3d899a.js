"use strict";
cc._RF.push(module, 'fbf207PLhxNHbEXI9mLPYma', 'MaskLayer');
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