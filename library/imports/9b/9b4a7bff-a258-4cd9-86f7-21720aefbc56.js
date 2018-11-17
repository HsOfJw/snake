"use strict";
cc._RF.push(module, '9b4a7v/olhM2Yb3IXIK77xW', 'GlobalVar');
// scripts/GlobalVar.js

"use strict";

window.Game = window.Game || {};

Game.GlobalVar = {

    curLevel: 1, //当前所处的关卡id

    ShareText: "开局一条蛇无限进化，结局你无法想象！！",

    loadingSceneType: 1,

    isWin: false,

    isDroping: false,
    isStoneDroping: false,

    isEatedApple: false,

    userID: null,
    td_id: null, //平台数据插入相关

    isGameOver: false,

    GameAdGID: null,

    GameAdInfo: null
};

window.GameConfig = {

    isOpenDaojishi: true, //是否打开倒计时

    SoundSwitch: true, //声音开关

    JWLogoDuration: 2,

    DebugMode: true,

    PopUpDuration: 0.15,

    TransitionSceneDuration: 0.15,

    SnakeMoveSpeed: 0.2,
    DropSpeed: 0.1,

    RankListNum: 10,

    LevelNum: 30,

    LockyDrawMinAngle: 5 * 360,

    LockyDrawRotateTime: 5,

    LockydrawBlinkTime: 0.5,

    GameOverRankListUpdateTime: 0,
    FetchFriendRankListUpdateTime: 0,
    JJCYPlayerUpdateTime: 1.5,

    AppID: "wxd296113def5acd74",

    Game_Tip_1: "观看完整广告才能顺利重置",
    Game_Tip_2: "观看完整广告才能继续挑战",

    //获取游戏广告
    GetGameADAddr: 'https://gather.51weiwan.com/hz/general/plan1',

    //登录接口
    LoginAddr: "https://gather.51weiwan.com/api/login/index",

    insertData: 'https://gather.51weiwan.com/api/terrace/index',

    //上传玩家通关时间的接口地址
    SendPassLevelTimeAddr: "https://gather.51weiwan.com/api/game/timeAdd",

    //获取通关时间的接口地址
    GetPassLevelTimeAddr: "https://gather.51weiwan.com/api/game/minTime",

    //获取配置的接口
    GetConfigAddr: "https://gather.51weiwan.com/api/app/getConfig",

    //获取跳转游戏列表
    GetGameList: 'https://gather.51weiwan.com/api/app/redirectlist',

    GameListID: 9001,

    GameID: 9
};

window.GameLocalData = {

    //读取关卡数据
    ReadLevelData: function ReadLevelData() {
        var infoStr = cc.sys.localStorage.getItem('levelInfo');
        if (infoStr) {
            var infoObj = JSON.parse(infoStr);
            return infoObj;
        }
        return null;
    },

    //读取user id
    ReadUserID: function ReadUserID() {
        var userid = cc.sys.localStorage.getItem('userid');
        if (userid) {
            return userid;
        }
        return null;
    },

    //读取配置
    ReadConfigData: function ReadConfigData() {
        var config = cc.sys.localStorage.getItem('config');
        if (config) {
            return JSON.parse(config);
        }
        return null;
    },

    //保存配置
    SaveConfigData: function SaveConfigData(config) {
        cc.sys.localStorage.setItem('config', JSON.stringify(config));
    },

    //获取关卡剩余挑战次数
    GetLevelChallengeCount: function GetLevelChallengeCount() {
        return cc.sys.localStorage.getItem('challenge_count');
    },

    //保存关卡剩余挑战次数
    SaveLevelChallengeCount: function SaveLevelChallengeCount(challengeCount) {
        cc.sys.localStorage.setItem('challenge_count', JSON.stringify(challengeCount));
    },

    //清除user id
    ClearUserID: function ClearUserID() {
        cc.sys.localStorage.removeItem('userid');
    },

    //保存关卡数据
    SaveLevelData: function SaveLevelData(levelData) {
        var levelInfoStr = JSON.stringify(levelData);
        cc.sys.localStorage.setItem('levelInfo', levelInfoStr);
    },

    //保存user id
    SaveUserID: function SaveUserID(userid) {
        cc.sys.localStorage.setItem('userid', userid);
    }
};

cc._RF.pop();