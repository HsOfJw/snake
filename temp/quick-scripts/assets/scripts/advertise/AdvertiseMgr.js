(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/advertise/AdvertiseMgr.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '83b8bElR21Os5AFCR9Hx8k+', 'AdvertiseMgr', __filename);
// scripts/advertise/AdvertiseMgr.js

"use strict";

var WXHelper = require("WXHelper");

module.exports = {

    bannerAd: null,

    CreateBannerAd: function CreateBannerAd(config) {
        if (WXHelper.IsWXContext() == false) {
            return;
        }

        if (!config) {
            return;
        }

        cc.log("CreateBannerAd------------------------------------");

        var modelWidth = Game.SystemInfo.windowWidth;
        var modelHeight = Game.SystemInfo.windowHeight;

        var bannerAd = wx.createBannerAd({
            adUnitId: config.adUnitID,
            style: {
                left: 0,
                top: 0,
                width: config.show.width
            }
        });

        var self = this;

        bannerAd.onResize(function (res) {
            var buttonTop = config.show.top;
            var buttonLeft = modelWidth / 2 - bannerAd.style.realWidth * 0.5;

            if (config.show.top == undefined) {
                buttonTop = modelHeight - bannerAd.style.realHeight;
            }
            bannerAd.style.left = buttonLeft;
            bannerAd.style.top = buttonTop;

            console.log(buttonLeft);
            console.log(buttonTop);

            console.log(res.width, res.height);
            console.log(bannerAd.style.realWidth, bannerAd.style.realHeight);
        });
        bannerAd.show();

        this.bannerAd = bannerAd;
    },

    DestroyBannerAd: function DestroyBannerAd() {
        if (this.bannerAd) {
            this.bannerAd.hide();
            this.bannerAd.destroy();
        }
    },

    CreateVideoAd: function CreateVideoAd(config, callback) {
        if (WXHelper.IsWXContext() == false) {
            return;
        }

        if (!config) {
            return;
        }

        var videoAd = wx.createRewardedVideoAd({
            adUnitId: config.adUnitID
        });

        videoAd.load().then(function () {
            return videoAd.show();
        }).catch(function (err) {
            return console.log(err.errMsg);
        });

        videoAd.onClose(function (res) {
            cc.log(res);
            // 用户点击了【关闭广告】按钮
            // 小于 2.1.0 的基础库版本，res 是一个 undefined
            var isFinish = false;

            if (res && res.isEnded || res === undefined) {
                // 正常播放结束，可以下发游戏奖励
                isFinish = true;
            } else {
                // 播放中途退出，不下发游戏奖励
                isFinish = false;
            }

            callback(isFinish);
        });
    }
};

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
        //# sourceMappingURL=AdvertiseMgr.js.map
        