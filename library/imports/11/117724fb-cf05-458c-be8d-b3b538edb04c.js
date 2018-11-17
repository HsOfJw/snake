"use strict";
cc._RF.push(module, '11772T7zwVFjL6Ns7U47bBM', 'StartScene');
// scripts/scene/StartScene.js

"use strict";

var LevelData = require("LevelData");
var WXHelper = require("WXHelper");
var GameRes = require("GameRes");
var SceneCom = require("SceneCom");
var AdvertiseMgr = require("AdvertiseMgr");
var AdvertiseConfig = require("AdvertiseConfig");

cc.Class({
    extends: SceneCom,

    properties: {
        musicBtn: {
            default: null,
            type: cc.Node
        },

        vibrationBtn: {
            default: null,
            type: cc.Node
        },

        ranklistBtn: {
            default: null,
            type: cc.Node
        },

        shareBtn: {
            default: null,
            type: cc.Node
        },

        startBtn: {
            default: null,
            type: cc.Node
        },

        //更多游戏按钮
        moreGame: {
            default: null,
            type: cc.Node
        },

        cblBtn: cc.Node,

        cblPrefab: cc.Prefab
    },

    musicBtnState: null,

    vibrationBtnState: null,

    onLoad: function onLoad() {
        var self = this;

        this.musicBtnState = 1;
        this.vibrationBtnState = 1;

        this.moreGame.on(cc.Node.EventType.TOUCH_END, function (event) {
            self.moreGameBtnClicked();
        });

        this.musicBtn.on(cc.Node.EventType.TOUCH_END, function (event) {
            self.musicBtnClicket();
        });

        this.vibrationBtn.on(cc.Node.EventType.TOUCH_END, function (event) {
            self.vibrationBtnClick();
        });

        this.ranklistBtn.on(cc.Node.EventType.TOUCH_END, function (event) {
            self.ranklistBtnClicked();
        });

        this.shareBtn.on(cc.Node.EventType.TOUCH_END, function (event) {
            self.shareBtnClicked();
        });

        this.startBtn.on(cc.Node.EventType.TOUCH_END, function (event) {
            self.startBtnClicked();
        });

        this.cblBtn.on(cc.Node.EventType.TOUCH_END, function () {
            self.cblBtnClicked();
        });

        var levelData = LevelData.ReadLevelData();
        WXHelper.UploadUserCloudStorage(LevelData.GenerateUserCloudData());
        LevelData.DisposeUnusualData();

        //获取配置
        Game.SendMessage.SendGetConfigMessage();
    },
    start: function start() {
        var self = this;

        var userid = GameLocalData.ReadUserID();

        if (WXHelper.IsWXContext() && userid == null) {

            this.startBtn.active = false;

            WXHelper.CreateUserInfoButton(function (res) {

                self.login(function (state, resCode) {
                    if (state == 1) {
                        var userid = GameLocalData.ReadUserID();
                        self.loginComplete(userid);
                    } else if (state == 2) {
                        Game.SendMessage.SendLogin(resCode, res.iv, res.encryptedData, function (resData) {
                            self.loginComplete(resData.data.uid);
                        });
                    } else if (state == 3) {
                        //失败
                        self.loginComplete(-1);
                    }
                });
            });
        } else {
            Game.GlobalVar.userID = userid;
            this._insertDataToServer();
            this.startBtn.active = true;
        }

        //创建广告
        AdvertiseMgr.CreateBannerAd(AdvertiseConfig.ADConfig_HomePage_Bottom);

        Game.AudioManager.playBackgroundSound();
    },

    //平台数据插入
    _insertDataToServer: function _insertDataToServer() {
        if (Game.GlobalVar.td_id) {
            var request = {
                user_id: Game.GlobalVar.userID,
                td_id: Game.GlobalVar.td_id

            };
            console.log("发送登陆的消息: ", request);

            var onMessage = function onMessage(data) {
                console.log("平台数据插入返回的数据为", data);
            };

            Game.NetManager.sendMsg("GET", Game.GameConfig.LoginAddr, request, onMessage);
        }
    },

    cblBtnClicked: function cblBtnClicked() {
        if (this.cblPrefab) {
            var cblNode = cc.instantiate(this.cblPrefab);
            this.node.addChild(cblNode, 1000);
        }
    },


    //更多游戏点击
    moreGameBtnClicked: function moreGameBtnClicked() {
        Game.AudioManager.playButtonSound();

        WXHelper.MoreGame();
    },
    startBtnClicked: function startBtnClicked() {
        var userid = GameLocalData.ReadUserID();

        if (WXHelper.IsWXContext()) {
            this.loginComplete(userid, 1);
        } else {
            this.loginComplete(19951214, 1);
        }
    },
    ranklistBtnClicked: function ranklistBtnClicked() {
        Game.AudioManager.playButtonSound();

        AdvertiseMgr.DestroyBannerAd();

        Game.SceneMgr.switchScene(Game.SceneType.RanklistScene);
    },
    shareBtnClicked: function shareBtnClicked() {
        Game.AudioManager.playButtonSound();

        WXHelper.Share();
    },
    musicBtnClicket: function musicBtnClicket() {
        Game.AudioManager.playButtonSound();

        if (this.musicBtnState == 0) {
            this.musicBtnState = 1;
        } else {
            this.musicBtnState = 0;
        }

        this.refreshMusicBtnState();
    },
    vibrationBtnClick: function vibrationBtnClick() {
        Game.AudioManager.playButtonSound();

        if (this.vibrationBtnState == 0) {
            this.vibrationBtnState = 1;
        } else {
            this.vibrationBtnState = 0;
        }

        this.refreshVibrationBtnState();
    },
    refreshMusicBtnState: function refreshMusicBtnState() {
        var musicSprite = this.musicBtn.getComponent(cc.Sprite);

        if (musicSprite) {
            if (this.musicBtnState == 0) {
                Game.AudioManager.closeSound();
                musicSprite.spriteFrame.setTexture(cc.url.raw('resources/EffectOff.png'));
            } else {
                Game.AudioManager.openSound();
                musicSprite.spriteFrame.setTexture(cc.url.raw('resources/EffectOn.png'));
            }
        }
    },
    refreshVibrationBtnState: function refreshVibrationBtnState() {
        var vibrationSprite = this.vibrationBtn.getComponent(cc.Sprite);

        if (vibrationSprite) {
            if (this.vibrationBtnState == 0) {
                vibrationSprite.spriteFrame.setTexture(cc.url.raw('resources/VibrationOff.png'));
            } else {
                vibrationSprite.spriteFrame.setTexture(cc.url.raw('resources/VibrationOn.png'));
            }
        }
    },
    login: function login(callback) {
        var self = this;

        if (GameConfig.DebugMode) {
            GameLocalData.ClearUserID();
        }

        WXHelper.Login(callback);
    },
    loginComplete: function loginComplete(userid) {
        cc.log("loginComplete-->>>userid = ", userid);

        AdvertiseMgr.DestroyBannerAd();

        Game.AudioManager.playButtonSound();

        if (userid && userid >= 0) {
            WXHelper.DestroyUserInfoBtn();

            Game.GlobalVar.userID = userid;

            this._insertDataToServer();
            GameLocalData.SaveUserID(userid);

            Game.SceneMgr.switchScene(Game.SceneType.SelectScene);
        }
    },
    onDestroy: function onDestroy() {
        // Game.AudioManager.stopBackgroundSound();
    }
});

cc._RF.pop();