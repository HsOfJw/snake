(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/MainScene.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '2e80bxUIJtFs6aXIfrGh/FV', 'MainScene', __filename);
// scripts/MainScene.js

"use strict";

// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        //好友排行榜
        fetchFriendRankList: cc.Node,
        //游戏结束界面排行榜
        gameOverRankList: cc.Node,
        //即将超越的玩家
        jjcyPlayer: cc.Node
    },

    onLoad: function onLoad() {
        var self = this;

        var that = cc.view;

        cc.view._convertPointWithScale = function (point) {
            var viewport = that._viewPortRect;
            point.x = (point.x - viewport.x) / (that._scaleX / 2);
            point.y = (point.y - viewport.y) / (that._scaleY / 2);
        };
        cc.view._convertTouchesWithScale = function (touches) {
            var viewport = that._viewPortRect,
                scaleX = that._scaleX / 2,
                scaleY = that._scaleY / 2,
                selTouch,
                selPoint,
                selPrePoint;
            for (var i = 0; i < touches.length; i++) {
                selTouch = touches[i];
                selPoint = selTouch._point;
                selPrePoint = selTouch._prevPoint;
                selPoint.x = (selPoint.x - viewport.x) / scaleX;
                selPoint.y = (selPoint.y - viewport.y) / scaleY;
                selPrePoint.x = (selPrePoint.x - viewport.x) / scaleX;
                selPrePoint.y = (selPrePoint.y - viewport.y) / scaleY;
            }
        };

        this.clearCanvas();
    },
    start: function start() {
        var self = this;

        if (this.fetchFriendRankList) {
            this.fetchFriendRankList.active = false;
        }
        if (this.gameOverRankList) {
            this.gameOverRankList.active = false;
        }
        if (this.jjcyPlayer) {
            this.jjcyPlayer.active = false;
        }

        cc.log("子域场景运行");

        window.wx.onMessage(function (data) {
            cc.log("接收主域发来消息：", data);

            if (data.messageType == 1) {
                //好友排行榜
                self.showFetchFriendRankList();
            } else if (data.messageType == 2) {
                //胜利界面排行榜
                GlobalVar.curLevel = data.curLevel;

                self.showGameOverRankList();
            } else if (data.messageType == 3) {
                //即将超越的玩家
                GlobalVar.curLevel = data.curLevel;

                self.showJJCYPlayer();
            } else if (data.messageType == 4) {
                //清理画布
                self.clearCanvas();
            }
        });
    },
    showFetchFriendRankList: function showFetchFriendRankList() {
        this.jjcyPlayer.active = false;
        this.gameOverRankList.active = false;

        var fetchFriendCom = this.fetchFriendRankList.getComponent("RankListScene");
        if (fetchFriendCom) {
            fetchFriendCom.show();
        }

        this.fetchFriendRankList.active = true;
    },
    showGameOverRankList: function showGameOverRankList() {
        this.fetchFriendRankList.active = false;
        this.jjcyPlayer.active = false;

        var winLayerRankCom = this.gameOverRankList.getComponent("WinLayerRank");
        if (winLayerRankCom) {
            winLayerRankCom.show();
        }

        this.gameOverRankList.active = true;
    },
    showJJCYPlayer: function showJJCYPlayer() {
        this.fetchFriendRankList.active = false;
        this.gameOverRankList.active = false;

        var jjcyPlayerCom = this.jjcyPlayer.getComponent("JJCYScene");
        if (jjcyPlayerCom) {
            jjcyPlayerCom.show();
        }

        this.jjcyPlayer.active = true;
    },
    clearCanvas: function clearCanvas() {
        var winLayerRankCom = this.gameOverRankList.getComponent("WinLayerRank");
        if (winLayerRankCom) {
            winLayerRankCom.clearCanvas();
        }

        var jjcyPlayerCom = this.jjcyPlayer.getComponent("JJCYScene");
        if (jjcyPlayerCom) {
            jjcyPlayerCom.clearCanvas();
        }

        var fetchFriendCom = this.fetchFriendRankList.getComponent("RankListScene");
        if (fetchFriendCom) {
            fetchFriendCom.clearCanvas();
        }
    }
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
        //# sourceMappingURL=MainScene.js.map
        