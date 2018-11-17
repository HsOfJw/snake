"use strict";
cc._RF.push(module, '81462iC9BpEJI+vWZ6zjvPp', 'SnakeControler');
// scripts/SnakeControler.js

"use strict";

var Util = require("Util");

cc.Class({
    extends: cc.Component,

    properties: {
        leftBtn: cc.Node,
        rightBtn: cc.Node,
        upBtn: cc.Node,
        downBtn: cc.Node
    },

    onLoad: function onLoad() {
        this.node.zIndex = 11;

        Util.RegKeyUpEvent(this.onKeyUp.bind(this));

        Util.RegBtnTouchEndEvent(this.leftBtn, this.leftBtnClicked.bind(this));
        Util.RegBtnTouchEndEvent(this.rightBtn, this.rightBtnClicked.bind(this));
        Util.RegBtnTouchEndEvent(this.upBtn, this.upBtnClicked.bind(this));
        Util.RegBtnTouchEndEvent(this.downBtn, this.downBtnClicked.bind(this));
    },


    /*************虚拟键控制蛇移动************/
    leftBtnClicked: function leftBtnClicked() {
        Game.EventCenter.DispatchEvent(Game.MessageType.Ctr_Snake_Move_To_Left);
    },
    rightBtnClicked: function rightBtnClicked() {
        Game.EventCenter.DispatchEvent(Game.MessageType.Ctr_Snake_Move_To_Right);
    },
    upBtnClicked: function upBtnClicked() {
        Game.EventCenter.DispatchEvent(Game.MessageType.Ctr_Snake_Move_To_Up);
    },
    downBtnClicked: function downBtnClicked() {
        Game.EventCenter.DispatchEvent(Game.MessageType.Ctr_Snake_Move_To_Down);
    },

    /////////////////////////////////////////////


    //键盘控制蛇移动
    onKeyUp: function onKeyUp(event) {
        switch (event.keyCode) {
            case cc.KEY.left:
                Game.EventCenter.DispatchEvent(Game.MessageType.Ctr_Snake_Move_To_Left);
                break;
            case cc.KEY.right:
                Game.EventCenter.DispatchEvent(Game.MessageType.Ctr_Snake_Move_To_Right);
                break;
            case cc.KEY.up:
                Game.EventCenter.DispatchEvent(Game.MessageType.Ctr_Snake_Move_To_Up);
                break;
            case cc.KEY.down:
                Game.EventCenter.DispatchEvent(Game.MessageType.Ctr_Snake_Move_To_Down);
                break;
        }
    }
}

// update (dt) {},
);

cc._RF.pop();