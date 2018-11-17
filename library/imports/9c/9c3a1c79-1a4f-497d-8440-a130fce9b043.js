"use strict";
cc._RF.push(module, '9c3a1x5Gk9JfYRAoTD86bBD', 'SelectScene');
// scripts/scene/SelectScene.js

"use strict";

var SceneCom = require("SceneCom");

cc.Class({
    extends: SceneCom,

    properties: {
        returnBtn: {
            default: null,
            type: cc.Node
        },

        levelLayer: {
            default: null,
            type: cc.Node
        },

        leftBtn: {
            default: null,
            type: cc.Node
        },

        rightBtn: {
            default: null,
            type: cc.Node
        },

        curPage: 1
    },

    pageView: null,

    onLoad: function onLoad() {
        var self = this;

        this.pageView = this.levelLayer.getComponent(cc.PageView);

        this.returnBtn.on(cc.Node.EventType.TOUCH_END, function (event) {
            self.returnClicked();
        });
        this.leftBtn.on(cc.Node.EventType.TOUCH_END, function (event) {
            self.leftBtnClicked();
        });
        this.rightBtn.on(cc.Node.EventType.TOUCH_END, function (event) {
            self.rightBtnClicked();
        });
    },
    returnClicked: function returnClicked() {
        cc.log("returnClicked");
        Game.AudioManager.playButtonSound();

        Game.SceneMgr.switchScene(Game.SceneType.StartScene);
    },
    leftBtnClicked: function leftBtnClicked() {
        cc.log("leftBtnClicked");
        Game.AudioManager.playButtonSound();

        this.pageView.scrollToTopLeft(0.2);
    },
    rightBtnClicked: function rightBtnClicked() {
        cc.log("rightBtnClicked");
        Game.AudioManager.playButtonSound();

        this.pageView.scrollToRight(0.2);
    },
    frameOnMove: function frameOnMove(dt) {},
    onDestroy: function onDestroy() {}
});

cc._RF.pop();