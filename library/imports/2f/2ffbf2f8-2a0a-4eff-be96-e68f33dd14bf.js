"use strict";
cc._RF.push(module, '2ffbfL4KgpO/76W5o8z3RS/', 'LockydrawLayer');
// scripts/LockydrawLayer.js

"use strict";

var PropUtil = require("PropUtil");
var Util = require("Util");
var LevelData = require("LevelData");
var WXHelper = require("WXHelper");

cc.Class({
    extends: cc.Component,

    properties: {
        returnBtn: cc.Node,
        zpNode: cc.Node,
        feiqNode: cc.Node,
        getLayerNode: cc.Node,
        jtNode: cc.Node,
        receiveNode: cc.Node,
        showOffNode: cc.Node,
        flashingNode: cc.Node,
        jumpBtnNode: cc.Node
    },

    start: function start() {
        var self = this;

        this.node.zIndex = 200;

        if (LevelData.GetCurLockydrawData()) {
            this.jtNode.getComponent(cc.Button).interactable = false;
        } else {
            this.jtNode.getComponent(cc.Button).interactable = true;
            this.jtNode.on(cc.Node.EventType.TOUCH_END, function () {
                self.jtNodeClicked();
            });
        }

        this.receiveNode.on(cc.Node.EventType.TOUCH_END, function () {
            self.receiveBtnClicked();
        });
        this.showOffNode.on(cc.Node.EventType.TOUCH_END, function () {
            self.showOffBtnClicked();
        });
        this.returnBtn.on(cc.Node.EventType.TOUCH_END, function () {
            self.returnBtnClicked();
        });
        this.jumpBtnNode.on(cc.Node.EventType.TOUCH_END, function () {
            self.jumpBtnClicked();
        });

        this.node.active = false;
        this.getLayerNode.active = false;

        this.flashingNode.runAction(new cc.repeatForever(new cc.blink(GameConfig.LockydrawBlinkTime, 1)));
    },
    show: function show() {
        this.node.active = true;

        if (LevelData.GetCurLockydrawData() == true) {
            this.jtNode.getComponent(cc.Button).interactable = false;
            this.jtNode.off(cc.Node.EventType.TOUCH_END);
        }
    },
    jtNodeClicked: function jtNodeClicked() {
        Game.AudioManager.playButtonSound();

        this.jtNode.getComponent(cc.Button).interactable = false;
        this.jtNode.off(cc.Node.EventType.TOUCH_END);

        this.startLockyDraw();
    },
    jumpBtnClicked: function jumpBtnClicked() {
        Game.AudioManager.playButtonSound();

        this.getLayerNode.active = false;
    },
    receiveBtnClicked: function receiveBtnClicked() {
        Game.AudioManager.playButtonSound();

        cc.log("receiveBtnClicked");

        this.receiveNode.getComponent(cc.Button).interactable = false;
        this.receiveNode.off(cc.Node.EventType.TOUCH_END);

        var receiveSuccessfulNode = this.getLayerNode.getChildByName("ReceiveSuccessful");
        if (receiveSuccessfulNode) {
            var delayTime = new cc.delayTime(1);
            var moveAction = new cc.moveTo(2, cc.p(0, cc.winSize.height));
            var fadeAction = new cc.fadeIn(2);

            receiveSuccessfulNode.runAction(cc.sequence(delayTime, moveAction, fadeAction));
        }
    },
    showOffBtnClicked: function showOffBtnClicked() {
        Game.AudioManager.playButtonSound();

        WXHelper.Share();

        cc.log("showOffBtnClicked");
    },
    returnBtnClicked: function returnBtnClicked() {
        Game.AudioManager.playButtonSound();

        cc.log("returnBtnClicked");

        this.node.active = false;
    },
    startLockyDraw: function startLockyDraw() {
        var self = this;

        var propID = PropUtil.GetPropID();
        var rotate = GameConfig.LockyDrawMinAngle + PropUtil.PropRotate[propID];
        var rotateAction = new cc.rotateTo(GameConfig.LockyDrawRotateTime, rotate);
        var newAction = rotateAction.easing(cc.easeSineOut(5));
        var sequence = new cc.sequence(newAction, new cc.callFunc(function () {
            self.lockydrawFinish(propID);
        }));

        this.zpNode.runAction(sequence);
    },
    lockydrawFinish: function lockydrawFinish(propid) {
        var self = this;

        LevelData.UpdateCurLockydrawData(true);

        if (PropUtil.PropType[propid] == 3) {
            this.feiqNode.active = true;
        } else {
            this.getLayerNode.active = true;

            var moneyImg = this.getLayerNode.getChildByName("MoneyImg");
            var redPacketImg = this.getLayerNode.getChildByName("RedPagImg");

            moneyImg.active = PropUtil.PropType[propid] == 1;
            redPacketImg.active = PropUtil.PropType[propid] == 2;

            if (PropUtil.PropType[propid] == 2) {
                Game.AudioManager.playGetMoneySound();

                var RedPacketNum = redPacketImg.getChildByName("RedPacketNum");
                var Yuan = redPacketImg.getChildByName("Yuan");
                if (RedPacketNum) {
                    RedPacketNum.active = false;
                }
                if (Yuan) {
                    Yuan.active = false;
                }
                redPacketImg.on(cc.Node.EventType.TOUCH_END, function () {
                    self.openReaPacket();
                });
            }

            if (PropUtil.PropType[propid] == 1) {
                Game.AudioManager.playGetMoneySound();

                var PropTextNode = this.getLayerNode.getChildByName("PropText");
                var moneynumNode = PropTextNode.getChildByName("num");
                if (moneynumNode) {
                    Util.SetNodeText(moneynumNode, PropUtil.PropList[propid]);
                }
            }
        }
    },
    openReaPacket: function openReaPacket() {
        var redPacketImg = this.getLayerNode.getChildByName("RedPagImg");
        var RedPacketNum = redPacketImg.getChildByName("RedPacketNum");
        var Yuan = redPacketImg.getChildByName("Yuan");

        var randomNum = parseInt(Math.random() * 2);

        RedPacketNum.active = true;
        Yuan.active = true;

        Util.SetNodeTexture(redPacketImg, "resources/gamescene/gengduo.png");
        Util.SetNodeText(RedPacketNum, PropUtil.RedPacketList[randomNum]);
    }

    // update (dt) {},

});

cc._RF.pop();