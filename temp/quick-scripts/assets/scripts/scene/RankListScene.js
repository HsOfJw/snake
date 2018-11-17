(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/scene/RankListScene.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '0a230oiED1DH56n/osPQAIB', 'RankListScene', __filename);
// scripts/scene/RankListScene.js

"use strict";

var Util = require("Util");
var WXHelper = require("WXHelper");
var SceneCom = require("SceneCom");

cc.Class({
    extends: SceneCom,

    properties: {
        returnBtn: cc.Node,
        rankingScrollView: cc.Sprite //显示排行榜
    },

    onLoad: function onLoad() {
        var self = this;

        this.tempTime = 0;

        this.returnBtn.on(cc.Node.EventType.TOUCH_END, function () {
            self.ranklistbtnClicked();
        });

        Util.ScreenAdaptation(this.rankingScrollView.node);

        this.tex = WXHelper.FetchFriendRankList();
    },
    ranklistbtnClicked: function ranklistbtnClicked() {
        Game.SceneMgr.switchScene(Game.SceneType.StartScene);
    },


    // 刷新子域的纹理
    _updateSubDomainCanvas: function _updateSubDomainCanvas() {
        if (window.sharedCanvas != undefined && this.tex) {
            this.tex.initWithElement(window.sharedCanvas);
            this.tex.handleLoadedTexture();
            this.rankingScrollView.spriteFrame = new cc.SpriteFrame(this.tex);
        }
    },
    update: function update(dt) {
        this.tempTime += dt;

        if (this.tempTime >= GameConfig.FetchFriendRankListUpdateTime) {
            this.tempTime = 0;
            this._updateSubDomainCanvas();
        }
    },
    onDestroy: function onDestroy() {
        cc.log("RanklistScene-->>>onDestroy");

        WXHelper.ClearSharedCanvas();

        this.rankingScrollView.spriteFrame = null;
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
        //# sourceMappingURL=RankListScene.js.map
        