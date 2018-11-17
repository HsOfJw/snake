var Util = require("Util");
cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad () {
        this.node.on(cc.Node.EventType.TOUCH_START, this.maskLayerClicked.bind(this));
    },

    start () {

    },

    maskLayerClicked(){
        return false;
    },

    // update (dt) {},
});
