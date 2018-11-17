"use strict";
cc._RF.push(module, 'c0964iRN0BDc4Bi+HDICq9H', 'WXHelper');
// scripts/WXHelper.js

"use strict";

var GlobalVar = require("GlobalVar");

var WXHelper = {

    userInfoBtn: null,

    IsWXContext: function IsWXContext() {
        if (window.wx != undefined) {
            return true;
        }
        return false;
    },

    Login: function Login(callback) {
        var self = this;

        var userid = GameLocalData.ReadUserID();
        if (userid) {
            //本地有userid不用登陆直接返回
            callback(1);
        } else {
            if (window.wx != undefined) {
                var success = function success(res) {
                    cc.log("login success:resCode = " + res.code);
                    callback(2, res.code);
                };
                var fail = function fail() {
                    cc.log("login fail");
                    callback(3);
                };
                wx.login({
                    success: success,
                    fail: fail
                });
            } else {
                callback(19);
            }
        }
    },

    Share: function Share(callback) {
        cc.log("Share");

        if (WXHelper.IsWXContext() == false) {
            return;
        }

        var canvas = cc.game.canvas;
        var width = cc.winSize.width;
        var height = cc.winSize.height;
        canvas.toTempFilePath({
            x: 0,
            y: 0,
            width: width,
            height: height,
            destWidth: 500,
            destHeight: 400,
            success: function success(res) {
                if (window.wx != undefined) {
                    window.wx.shareAppMessage({
                        title: Game.GlobalVar.ShareText,
                        imageUrl: res.tempFilePath,
                        success: function success(res) {
                            console.log("分享成功");
                        }
                    });
                }
            }
        });
    },

    GetUseInfo: function GetUseInfo(successCb, failCb) {
        wx.getUserInfo({
            withCredentials: fales,
            lang: "zh_CN",
            success: successCb,
            fail: failCb
        });
    },

    UploadUserCloudStorage: function UploadUserCloudStorage(data) {
        cc.log("UploadUserCloudStorage" + data);

        if (window.wx != undefined) {
            wx.setUserCloudStorage({
                KVDataList: data,
                success: function success(res) {
                    console.log('setUserCloudStorage', 'success', res);
                },
                fail: function fail(res) {
                    console.log('setUserCloudStorage', 'fail');
                },
                complete: function complete(res) {
                    console.log('setUserCloudStorage', 'ok');
                }
            });
        }
    },

    FetchFriendRankList: function FetchFriendRankList() {
        if (window.wx != undefined) {
            window.wx.showShareMenu({ withShareTicket: true }); //设置分享按钮，方便获取群id展示群排行榜

            WXHelper.InitSharedCanvas();

            window.wx.postMessage({
                messageType: 1
            });

            cc.log("发送消息到子域!--->>>展示好友排行榜");

            return new cc.Texture2D();
        }
    },

    GameOverRankList: function GameOverRankList() {
        if (window.wx != undefined) {
            window.wx.showShareMenu({ withShareTicket: true }); //设置分享按钮，方便获取群id展示群排行榜

            WXHelper.InitSharedCanvas();

            window.wx.postMessage({
                messageType: 2,
                curLevel: Game.GlobalVar.curLevel
            });
            cc.log("发送消息到子域!--->>>展示游戏结束界面排行榜");

            return new cc.Texture2D();
        }
    },

    JJCYPlayer: function JJCYPlayer() {
        if (window.wx != undefined) {
            window.wx.showShareMenu({ withShareTicket: true }); //设置分享按钮，方便获取群id展示群排行榜

            WXHelper.InitSharedCanvas();

            window.wx.postMessage({
                messageType: 3,
                curLevel: Game.GlobalVar.curLevel
            });

            return new cc.Texture2D();
        }
    },

    InitSharedCanvas: function InitSharedCanvas() {
        if (window.wx != undefined) {
            var openDataContext = wx.getOpenDataContext();
            var sharedCanvas = openDataContext.canvas;
            if (sharedCanvas) {
                sharedCanvas.width = cc.game.canvas.width * 2;
                sharedCanvas.height = cc.game.canvas.height * 2;
            }
        }
    },

    ClearSharedCanvas: function ClearSharedCanvas() {
        if (window.wx != undefined) {
            var openDataContext = wx.getOpenDataContext();
            var sharedCanvas = openDataContext.canvas;
            if (sharedCanvas) {
                sharedCanvas.width = 0;
                sharedCanvas.height = 0;
            }

            window.wx.postMessage({
                messageType: 4
            });

            cc.log("发送消息到子域!--->>>清理画布");
        }
    },

    CreateUserInfoButton: function CreateUserInfoButton(callback) {
        var self = this;

        cc.log("CreateUserInfoButton");

        if (window.wx != undefined) {

            if (Game.SystemInfo) {
                var modelWidth = Game.SystemInfo.windowWidth;
                var modelHeight = Game.SystemInfo.windowHeight;
                var buttonWidth = 364 * (modelWidth / cc.winSize.width);
                var buttonHeight = 126 * (modelHeight / cc.winSize.height);
                var buttonLeft = modelWidth / 2 - buttonWidth * 0.5;
                var buttonTop = modelHeight * 0.5;

                var button = wx.createUserInfoButton({
                    type: 'image ',
                    image: 'http://gather.51weiwan.com//uploads//file//20180731//06fc14a09a16c33ce4b41e80d69e76fd.png',
                    style: {
                        left: buttonLeft,
                        top: buttonTop,
                        width: buttonWidth,
                        height: buttonHeight
                    }
                });

                button.onTap(function (res) {
                    callback(res);
                });

                self.userInfoBtn = button;
            }
        }
    },

    DestroyUserInfoBtn: function DestroyUserInfoBtn() {
        if (this.userInfoBtn) {
            this.userInfoBtn.destroy();
        }
    },

    GetSystemInfo: function GetSystemInfo(callback) {
        //调用微信接口 获取设备信息
        if (Game.SystemInfo) {
            return;
        }
        if (window.wx != undefined) {
            Game.SystemInfo = wx.getSystemInfoSync();
        }
    },

    //更多游戏
    MoreGame: function MoreGame() {
        if (window.wx != undefined) {
            var configData = GameLocalData.ReadConfigData();
            wx.navigateToMiniProgram({
                appId: configData.app_id,
                path: '',
                envVersion: 'release',
                success: function success() {
                    console.log("跳转到更多游戏成功");
                },
                fail: function fail(res) {
                    console.log("跳转到更多游戏失败", res);
                }
            });
        }
    },

    ShowToast: function ShowToast(title) {
        if (this.IsWXContext()) {
            wx.showToast({
                title: title
            });
        }
    }
};

module.exports = WXHelper;

cc._RF.pop();