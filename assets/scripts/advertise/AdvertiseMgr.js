var WXHelper = require("WXHelper");

module.exports = {

    bannerAd: null,

    CreateBannerAd: function(config){
        if(WXHelper.IsWXContext() == false){
            return;
        }

        if(!config){
            return;
        }

        cc.log("CreateBannerAd------------------------------------");

        let modelWidth = Game.SystemInfo.windowWidth;
        let modelHeight = Game.SystemInfo.windowHeight;


        let bannerAd = wx.createBannerAd({
            adUnitId: config.adUnitID,
            style: {
                left: 0,
                top: 0,
                width: config.show.width,
            }
        });

        var self = this;

        bannerAd.onResize(res => {
            let buttonTop = config.show.top;
            let buttonLeft = modelWidth / 2 - bannerAd.style.realWidth * 0.5;

            if(config.show.top == undefined){
                buttonTop = modelHeight - bannerAd.style.realHeight;
            }
            bannerAd.style.left = buttonLeft;
            bannerAd.style.top = buttonTop;

            console.log(buttonLeft)
            console.log(buttonTop)

            console.log(res.width, res.height)
            console.log(bannerAd.style.realWidth, bannerAd.style.realHeight)

        });
        bannerAd.show();

        this.bannerAd = bannerAd;
    },

    DestroyBannerAd: function(){
        if(this.bannerAd){
            this.bannerAd.hide();
            this.bannerAd.destroy();
        }
    },

    CreateVideoAd: function(config, callback){
        if(WXHelper.IsWXContext() == false){
            return;
        }

        if(!config){
            return;
        }

        let videoAd = wx.createRewardedVideoAd({
            adUnitId: config.adUnitID,
        });
        
        videoAd.load().then(() => videoAd.show()).catch(err => console.log(err.errMsg));

        videoAd.onClose(res => {
            cc.log(res);
            // 用户点击了【关闭广告】按钮
            // 小于 2.1.0 的基础库版本，res 是一个 undefined
            var isFinish = false;

            if (res && res.isEnded || res === undefined) {
              // 正常播放结束，可以下发游戏奖励
                isFinish = true;
            }
            else {
                // 播放中途退出，不下发游戏奖励
                isFinish = false;
            }

            callback(isFinish);
        })
    }
};