(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/scene/LogoScene.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'ea9ebs4Ex1F85BLVi4qU0xA', 'LogoScene', __filename);
// scripts/scene/LogoScene.js

"use strict";

var WXHelper = require("WXHelper");
var SceneCom = require("SceneCom");
var Util = require("Util");
var GameRes = require("GameRes");

cc.Class({
    extends: SceneCom,

    properties: {
        //巨网logo
        jwLogo: {
            default: null,
            type: cc.Node
        },

        gameAdBg: {
            default: null,
            type: cc.Node
        }
    },

    isCalled: null,

    onLoad: function onLoad() {
        this.isCalled = false;

        this.loadRes();

        WXHelper.GetSystemInfo();

        this.getLaunchOptionsSync();
    },
    loadRes: function loadRes() {
        for (var i = 0; i < GameRes.StartSceneRes.length; i++) {
            var res = GameRes.StartSceneRes[i];
            cc.loader.loadRes(res, function (err, texture) {
                if (err) {
                    cc.log(err);
                } else {}
            });
        }
    },


    //获取启动参数
    getLaunchOptionsSync: function getLaunchOptionsSync() {
        var self = this;

        if (window.wx != undefined) {

            wx.onShow(function (res) {
                //监听小游戏回到前台的事件
                console.log('onshow', res.query);
                if (res.query.game_id == GameConfig.GameID) {
                    //跳到自己的游戏
                    console.log("[loading] 游戏返回到前台的参数中  跳转到自己的游戏中");
                    self.showJWLogo();
                }
            });

            var wx_onLaunch = wx.getLaunchOptionsSync();

            console.log(wx_onLaunch);

            var gid = wx_onLaunch.query.gid;
            if (gid) {
                console.log("开始走非正常流程");
                Game.GlobalVar.GameAdGID = gid;
                this.jwLogo.active = false;
                this.getGameAd(gid);
                return;
            } else if (wx_onLaunch.query.td_id) {
                //存储td_id  程序获取到uid的时候 发送请求
                Game.GlobalVar.td_id = wx_onLaunch.query.td_id;
            }
        }
        //显示巨网logo
        this.showJWLogo();
    },


    //获取游戏广告
    getGameAd: function getGameAd(gid) {
        var self = this;
        if (window.wx != undefined) {
            Game.SendMessage.SendGetGameAdMessage(gid, function (data) {
                Game.GlobalVar.GameAdInfo = data;
                var bgUrl = data.img;
                Util.loadRemoteImg(self.gameAdBg, bgUrl);
                self.gameAdBg.active = true;
                self.gameAdBg.on(cc.Node.EventType.TOUCH_END, self.logoClicked.bind(self));
            });
        }
    },


    //落地页点击
    logoClicked: function logoClicked() {
        if (!Game.GlobalVar.GameAdInfo) {
            return;
        }

        var self = this;

        var status = Game.GlobalVar.GameAdInfo.state;

        var ToMiniProgram = {
            envVersion: 'release',
            success: function success() {
                console.log("跳转成功", Game.GlobalVar.GameAdGID);
                self.showJWLogo();
            },
            fail: function fail(res) {
                console.log("跳转失败", res);
                self.showJWLogo();
            }
        };

        if (status == 1) {
            //审核中  跳到游戏
            if (Game.GlobalVar.GameAdInfo.app_id == GameConfig.AppID) {
                self.showJWLogo();
                return;
            }
            ToMiniProgram.appId = Game.GlobalVar.GameAdInfo.app_id;
            ToMiniProgram.extraData = Game.GlobalVar.GameAdInfo.param;
            ToMiniProgram.path = Game.GlobalVar.GameAdInfo.path;
            console.log("跳转到游戏中");
        } else if (status == 2) {
            //通过审核 跳盒子
            console.log("跳转到盒子中");
            ToMiniProgram.appId = Game.GlobalVar.GameAdInfo.hz_app_id;
            ToMiniProgram.path = Game.GlobalVar.GameAdInfo.hz_path;
            ToMiniProgram.extraData = { gid: Game.GlobalVar.GameAdGID };
        }
        if (window.wx != undefined) {
            wx.navigateToMiniProgram(ToMiniProgram);
        }
    },
    showJWLogo: function showJWLogo() {
        // cc.director.preloadScene('GameScene');
        if (this.jwLogo) {
            this.jwLogo.active = true;
            if (this.isCalled == false) {
                this.isCalled = true;
                this.scheduleOnce(this.juLogoFinish.bind(this), GameConfig.JWLogoDuration);
            }
        }
        if (this.gameAdBg) {
            this.gameAdBg.active = false;
        }
    },
    juLogoFinish: function juLogoFinish() {
        Game.SceneMgr.switchScene(Game.SceneType.StartScene);
    },
    onDestroy: function onDestroy() {}
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
        //# sourceMappingURL=LogoScene.js.map
        