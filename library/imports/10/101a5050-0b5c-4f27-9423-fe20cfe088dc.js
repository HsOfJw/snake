"use strict";
cc._RF.push(module, '101a5BQC1xPJ5Qj/iDP4Ijc', 'AudioManager');
// scripts/AudioManager.js

"use strict";

window.Game = window.Game || {};

cc.Class({
    extends: cc.Component,

    properties: {
        //被刺音效
        beici_Sound: {
            url: cc.AudioClip,
            default: null
        },

        //背景音乐
        background_music: {
            url: cc.AudioClip,
            default: null
        },

        //倒计时
        daojishi_Sound: {
            url: cc.AudioClip,
            default: null
        },

        //方向按键点击
        dirClick_Sound: {
            url: cc.AudioClip,
            default: null
        },

        //吃苹果音效
        eatApple_Sound: {
            url: cc.AudioClip,
            default: null
        },

        //失败音效
        fail_Sound: {
            url: cc.AudioClip,
            default: null
        },

        //胜利音效
        win_Sound: {
            url: cc.AudioClip,
            default: null
        },

        //通用按钮音效
        button_Sound: {
            url: cc.AudioClip,
            default: null
        },

        //推动石头音效
        pushStone_Sound: {
            url: cc.AudioClip,
            default: null
        },

        //获得现金奖励音效
        getMoney_Sound: {
            url: cc.AudioClip,
            default: null
        }
    },

    isOpenSound: null,

    curBgm: null,

    playEffect: function playEffect(audio) {
        if (!GameConfig.SoundSwitch) return;
        if (!this.isOpenSound) return;
        cc.audioEngine.play(audio, false, 1);
    },
    playBackgroundMusic: function playBackgroundMusic(audio) {
        if (!GameConfig.SoundSwitch) return;
        if (!this.isOpenSound) return null;

        return cc.audioEngine.play(audio, true, 1);
    },


    //推动石头-音效
    playPushStoneSound: function playPushStoneSound() {
        this.playEffect(this.pushStone_Sound);
    },


    //方向键-音效
    playDirectionSound: function playDirectionSound() {
        this.playEffect(this.dirClick_Sound);
    },


    //被刺-音效
    playBeiCiSound: function playBeiCiSound() {
        this.playEffect(this.beici_Sound);
    },


    //倒计时-音效
    playDaojishiSound: function playDaojishiSound() {
        this.playEffect(this.daojishi_Sound);
    },


    //吃苹果-音效
    playEatAppleSound: function playEatAppleSound() {
        this.playEffect(this.eatApple_Sound);
    },


    //失败-音效
    playFailSound: function playFailSound() {
        this.playEffect(this.fail_Sound);
    },


    //胜利-音效
    playWinSound: function playWinSound() {
        this.playEffect(this.win_Sound);
    },


    //通用按钮-音效
    playButtonSound: function playButtonSound() {
        // this.playEffect(this.pushStone_Sound);
        this.playEffect(this.button_Sound);
    },


    //获得现金奖励-音效
    playGetMoneySound: function playGetMoneySound() {
        this.playEffect(this.getMoney_Sound);
    },


    //播放-背景-音乐
    playBackgroundSound: function playBackgroundSound() {
        if (this.curBgm != null) {
            return;
        }

        this.curBgm = this.playBackgroundMusic(this.background_music);
    },


    //停止-背景-音乐
    stopBackgroundSound: function stopBackgroundSound() {
        if (this.curBgm != null) {
            cc.audioEngine.stop(this.curBgm);
            this.curBgm = null;
        }
    },


    //暂停-背景-音乐
    pauseBackgroundSound: function pauseBackgroundSound() {
        if (this.curBgm != null) cc.audioEngine.pause(this.curBgm);
    },


    //恢复-背景-音乐
    resumeBackgroundSound: function resumeBackgroundSound() {
        if (this.curBgm != null) cc.audioEngine.resume(this.curBgm);
    },


    // LIFE-CYCLE CALLBACKS:

    openSound: function openSound() {
        this.isOpenSound = true;

        this.resumeBackgroundSound();
    },
    closeSound: function closeSound() {
        this.isOpenSound = false;

        this.pauseBackgroundSound();
    },
    onLoad: function onLoad() {
        cc.game.addPersistRootNode(this.node);

        this.isOpenSound = true;
        Game.AudioManager = this;
    },
    start: function start() {}
}

// update (dt) {},
);

cc._RF.pop();