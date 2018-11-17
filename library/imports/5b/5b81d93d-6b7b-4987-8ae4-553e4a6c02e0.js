"use strict";
cc._RF.push(module, '5b81dk9a3tJh4rkVT5KbALg', 'PopUpLayer');
// scripts/layer/PopUpLayer.js

'use strict';

var GlobalVar = require("GlobalVar");
var Util = require('Util');

cc.Class({
    extends: cc.Component,

    properties: {
        popUpNode: cc.Node,
        maskLayer: cc.Node,

        watchBtn: cc.Node,

        closeBtn: cc.Node,

        context: cc.Node
    },

    callback: null,

    onLoad: function onLoad() {
        this.watchBtn.on('click', this.watchClicked.bind(this));
        this.closeBtn.on('click', this.closeClicked.bind(this));
    },
    addContext: function addContext(type) {
        if (this.context) {
            if (type == 1) {
                Util.SetNodeTexture(this.context, 'cishu');
            } else if (type == 2) {
                Util.SetNodeTexture(this.context, 'gamescene/chonghzi');
            }
        }
    },
    watchClicked: function watchClicked() {
        if (this.callback) {
            this.callback();
        }
        this.node.destroy();
    },
    closeClicked: function closeClicked() {
        this.node.destroy();
    },
    show: function show(callback) {
        this.callback = callback;
        Game.PopUpMgr.Show_ScaleEffect(this.popUpNode, GameConfig.PopUpDuration);
    },
    onDestroy: function onDestroy() {}
}

// update (dt) {},
);

cc._RF.pop();