(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/layer/GameOverLayer.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'dbfd7FfgI5CDZFbsgefBJRR', 'GameOverLayer', __filename);
// scripts/layer/GameOverLayer.js

"use strict";

var Util = require("Util");
var GlobalVar = require("GlobalVar");
var LevelData = require("LevelData");
var WXHelper = require("WXHelper");
var AdvertiseMgr = require("AdvertiseMgr");
var AdvertiseConfig = require("AdvertiseConfig");

cc.Class({
    extends: cc.Component,

    properties: {
        //历史最高分
        histroyMaxScore: {
            default: null,
            type: cc.Node
        },
        //新纪录|别气馁
        newRecrod: {
            default: null,
            type: cc.Node
        },
        //抽奖按钮(暂时不用了)
        lockyDrawUI: {
            default: null,
            type: cc.Node
        },
        // //选择关卡按钮
        // selectBtn:{
        //     default: null,
        //     type: cc.Node
        // },
        //分享按钮
        shareBtn: {
            default: null,
            type: cc.Node
        },
        //返回按钮
        returnBtn: {
            default: null,
            type: cc.Node
        },
        //下一关按钮
        nextLevelBtn: {
            default: null,
            type: cc.Node
        },
        //继续挑战按钮
        continueBtn: {
            default: null,
            type: cc.Node
        },
        //休息一下按钮
        restBtn: {
            default: null,
            type: cc.Node
        },
        //求助好友按钮
        forHelpBtn: {
            default: null,
            type: cc.Node
        },
        maskBg: {
            default: null,
            type: cc.Node
        },

        moreGameLayout: cc.Node,

        cblPrefab: cc.Prefab,

        rankingSprite: cc.Sprite //显示排行榜
    },

    onLoad: function onLoad() {
        this.initLayer();
    },
    start: function start() {
        var self = this;
        this.tempTime = 0;

        this.rankingSprite.node.zIndex = 1000;

        this.initMoreGameUI();
    },
    initMoreGameUI: function initMoreGameUI() {
        var self = this;

        Game.SendMessage.SendGetGameListMessage(GameConfig.GameListID, function (data) {
            if (data) {
                var gameList = data.redirect;
                for (var i = 0; i < gameList.length, i < 3; i++) {
                    var item = cc.instantiate(self.cblPrefab);
                    var script = item.getComponent("PanelItem");
                    item.setPosition(0, 0);
                    if (script) {
                        var directInfo = {
                            img_url: gameList[i].img_url,
                            game_id: gameList[i].game_id,
                            name: gameList[i].name,
                            app_id: data.hz_app_id,
                            path: data.hz_path
                        };
                        script.setItemData(directInfo);
                    }
                    self.moreGameLayout.addChild(item);
                }
            }
        });
    },
    show: function show(isNewRecrod) {
        this.node.active = true;
        this.maskBg.active = true;
        this.rankingSprite.node.active = true;
        Game.PopUpMgr.Show_ScaleEffect(this.node);

        this.refreshUI(isNewRecrod);
        this.showRankList();

        if (Game.GlobalVar.isWin) {
            if (Game.GlobalVar.curLevel == GameConfig.LevelNum) {
                if (this.nextLevelBtn) {
                    var sprite = this.nextLevelBtn.getComponent(cc.Sprite);
                    if (sprite) {
                        sprite.spriteFrame = new cc.SpriteFrame(cc.url.raw("resources/gamescene/beContinued.png"));
                    }
                }
            }
        }
    },
    hide: function hide() {
        this.tex = null;
        this.tempTime = 0;
        this.maskBg.active = false;

        this.rankingSprite.node.active = false;

        Game.PopUpMgr.Hide_ScaleEffect(this.node);
    },
    initLayer: function initLayer() {
        var self = this;

        this.maskBg.zIndex = 100;
        this.node.zIndex = 101;

        // this.lockyDrawUI.on(cc.Node.EventType.TOUCH_END,function(event){
        //     self.lockyDrawBtnClicked(event);
        // });
        Util.RegBtnTouchBeginEvent(this.maskBg, this.maskLayerClicked.bind(this));
        // Util.RegBtnClickEvent(this.selectBtn, this.selectBtnClicked.bind(this));
        Util.RegBtnClickEvent(this.shareBtn, this.shareBtnClicked.bind(this));
        Util.RegBtnClickEvent(this.returnBtn, this.retureBtnClicked.bind(this));
        Util.RegBtnClickEvent(this.nextLevelBtn, this.nextLevelBtnClicked.bind(this));
        Util.RegBtnClickEvent(this.continueBtn, this.continueClicked.bind(this));
        Util.RegBtnClickEvent(this.restBtn, this.restClicked.bind(this));
        Util.RegBtnClickEvent(this.forHelpBtn, this.forHelpBtnClicked.bind(this));

        Util.ScreenAdaptation(this.rankingSprite.node);
        Util.ScreenAdaptation(this.maskBg);
    },
    showRankList: function showRankList() {
        this.tex = WXHelper.GameOverRankList();
    },
    refreshUI: function refreshUI(isNewRecrod, isFail) {
        if (this.histroyMaxScore) Util.SetNodeText(this.histroyMaxScore, LevelData.GetCurPassTime());
        if (isNewRecrod && this.newRecrod) {
            this.newRecrod.active = true;
            var newRecrodTime = LevelData.GetCurPassTime();
            var newRecrodTextUI = this.newRecrod.getChildByName("newScore");
            Util.SetNodeText(newRecrodTextUI, newRecrodTime);
        } else {
            this.newRecrod.active = false;
        }

        if (isFail) {
            //不要气馁
            this.newRecrod.active = true;
        }
    },
    lockyDrawBtnClicked: function lockyDrawBtnClicked() {
        cc.log("lockyDrawBtnClicked");

        Game.AudioManager.playButtonSound();

        Game.EventCenter.DispatchEvent(Game.MessageType.ClickedLockydrawBtn);
    },
    shareBtnClicked: function shareBtnClicked() {
        cc.log("shareBtnClicked");

        Game.AudioManager.playButtonSound();

        WXHelper.Share();
    },
    retureBtnClicked: function retureBtnClicked() {
        Game.AudioManager.playButtonSound();

        Game.SceneMgr.switchScene(Game.SceneType.StartScene);
    },
    nextLevelBtnClicked: function nextLevelBtnClicked() {
        Game.AudioManager.playButtonSound();

        Game.EventCenter.DispatchEvent(Game.MessageType.Join_Next_Level);
    },
    continueClicked: function continueClicked() {
        cc.log("continueClicked");

        //创建视频广告
        if (WXHelper.IsWXContext()) {
            AdvertiseMgr.CreateVideoAd(AdvertiseConfig.ADConfig_Relive_Video, function (isFinish) {
                if (isFinish) {
                    Game.EventCenter.DispatchEvent(Game.MessageType.Reset_Start_Game);
                } else {
                    // WXHelper.ShowToast(GameConfig.Game_Tip_2);
                }
            });
        } else {
            Game.EventCenter.DispatchEvent(Game.MessageType.Reset_Start_Game);
        }
    },
    restClicked: function restClicked() {
        Game.SceneMgr.switchScene(Game.SceneType.StartScene);
    },
    forHelpBtnClicked: function forHelpBtnClicked() {
        cc.log("forHelpBtnClicked");

        WXHelper.Share();
    },
    selectBtnClicked: function selectBtnClicked() {
        Game.AudioManager.playButtonSound();

        Game.SceneMgr.switchScene(Game.SceneType.SelectScene);
    },
    maskLayerClicked: function maskLayerClicked() {
        return true;
    },


    // 刷新子域的纹理
    _updateSubDomainCanvas: function _updateSubDomainCanvas() {
        if (window.sharedCanvas != undefined && this.tex && this.rankingSprite) {
            this.tex.initWithElement(window.sharedCanvas);
            this.tex.handleLoadedTexture();
            this.rankingSprite.spriteFrame = new cc.SpriteFrame(this.tex);
        }
    },
    update: function update(dt) {
        if (this.node.active == false) {
            return;
        }

        this.tempTime += dt;

        if (this.tempTime >= GameConfig.GameOverRankListUpdateTime) {
            this.tempTime = 0;
            this._updateSubDomainCanvas();
        }
    },
    onDestroy: function onDestroy() {
        cc.log("WinLayer onDestroy");
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
        //# sourceMappingURL=GameOverLayer.js.map
        