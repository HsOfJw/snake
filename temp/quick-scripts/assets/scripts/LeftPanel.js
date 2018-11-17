(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/LeftPanel.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'cb09bzzIFpCUbNUXLfNyU6S', 'LeftPanel', __filename);
// scripts/LeftPanel.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        content: { displayName: "内容节点", default: null, type: cc.Node },
        leftPanelItem: { displayName: "侧拉板子节点", default: null, type: cc.Prefab }
    },

    onLoad: function onLoad() {
        this._initPage();
    },

    //初始化页面信息
    _initPage: function _initPage() {
        var self = this;

        this.loadingDisPlay();

        var out = this.node.parent.getChildByName("cblBtn");
        var bgWid = this.node.getChildByName("bg").width;
        this.node.setPosition(960, 0);
        var moveAction = cc.moveTo(0.2, out.x - bgWid / 3, 0);
        this.node.runAction(moveAction);
        this.content.removeAllChildren();

        Game.SendMessage.SendGetGameListMessage(GameConfig.GameListID, function (data) {
            self._showData(data);
        });
    },


    //遍历展示数据
    _showData: function _showData(recData) {

        this.node.getChildByName("loadingLabel").active = false;

        if (recData.state === "10") {
            console.log("游戏列表审核中，不进行遍历展示");
        } else {
            var gameList = recData.redirect;
            for (var i = 0; i < gameList.length; i++) {
                var item = cc.instantiate(this.leftPanelItem);
                var script = item.getComponent("PanelItem");
                if (script) {
                    var directInfo = {
                        img_url: gameList[i].img_url,
                        game_id: gameList[i].game_id,
                        name: gameList[i].name,
                        app_id: recData.hz_app_id,
                        path: recData.hz_path
                    };
                    script.setItemData(directInfo);
                }
                this.content.addChild(item);
            }
        }
    },
    onBtnClickBack: function onBtnClickBack() {
        var _this = this;

        var func = cc.callFunc(function () {
            _this.node.destroy();
        });

        var moveAction = cc.moveTo(0.2, cc.p(960, 0));
        var seq2 = cc.sequence(moveAction, func);
        this.node.runAction(seq2);
    },


    //显示正在加载中文字
    loadingDisPlay: function loadingDisPlay() {
        var loadingLabel = this.node.getChildByName("loadingLabel").getComponent(cc.Label); //文本的Label组件
        loadingLabel.string = "正在加载中";
        var index = 0;
        loadingLabel.schedule(function () {
            if (index > 3) {
                index = 0;
            }
            loadingLabel.string = "\u6B63\u5728\u52A0\u8F7D\u4E2D" + ".".repeat(index);
            index++;
        }, 0.5, cc.macro.REPEAT_FOREVER, 0);
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
        //# sourceMappingURL=LeftPanel.js.map
        