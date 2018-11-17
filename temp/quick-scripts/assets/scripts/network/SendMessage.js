(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/network/SendMessage.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '1f55deuUN1KgYIGDiNqwCzO', 'SendMessage', __filename);
// scripts/network/SendMessage.js

"use strict";

window.Game = window.Game || {};

window.Game.SendMessage = {

    SendLogin: function SendLogin(code, iv, encryptedData, successCb) {
        cc.log("SendLogin: code = ", code, "iv = ", iv, "encryted = ", encryptedData);

        var request = {
            code: code,
            game_id: GameConfig.GameID.toString(),
            iv: iv,
            encryptedData: encryptedData
        };

        var onMessage = function onMessage(data) {
            cc.log("SendLogin == onMessage", data);
            successCb(data);
        };

        Game.NetManager.sendMsg("Get", GameConfig.LoginAddr, request, onMessage);
    },

    //发送获取游戏列表的消息
    SendGetGameListMessage: function SendGetGameListMessage(locationID, callback) {
        var request = {
            game_id: GameConfig.GameID,
            location: locationID
        };

        console.log("发送获取游戏列表的消息:", request);

        var onMessage = function onMessage(res) {
            if (res.errno == 0) {
                callback(res.data);
            }
        };

        Game.NetManager.sendMsg("GET", GameConfig.GetGameList, request, onMessage);
    },


    //发送过关时间的消息给服务器
    SendPassLevelTime: function SendPassLevelTime(level_id, time) {
        cc.log("SendPassLevelTime:", level_id, time);

        var request = {
            user_id: Game.GlobalVar.userID.toString(),
            level_id: level_id.toString(),
            time: time.toString(),
            game_id: GameConfig.GameID.toString()
        };

        var onMessage = function onMessage(data) {
            cc.log("SendPassLevelTime == onMessage", data);
        };

        Game.NetManager.sendMsg("POST", GameConfig.SendPassLevelTimeAddr, request, onMessage);
    },

    //获取某个关卡内通关用时最少的玩家
    SendGetPassLevelMinTime: function SendGetPassLevelMinTime(level_id) {
        cc.log("SendGetPassLevelMinTime:", level_id);

        var request = {
            level_id: level_id.toString(),
            game_id: GameConfig.GameID.toString()
        };

        var onMessage = function onMessage(res) {
            cc.log("SendGetPassLevelMinTime == onMessage", res);
            if (res.errno == 0) {
                Game.EventCenter.DispatchEvent(Game.MessageType.Game_MIN_TIME_REP, res.data.time);
            } else if (res.errno == 2007) {
                Game.EventCenter.DispatchEvent(Game.MessageType.Game_MIN_TIME_REP_NO_DATA);
            }
        };

        Game.NetManager.sendMsg("Get", GameConfig.GetPassLevelTimeAddr, request, onMessage);
    },


    //发送获取配置的消息
    SendGetConfigMessage: function SendGetConfigMessage() {
        cc.log("SendGetConfigMessage:");

        var request = {
            game_id: GameConfig.GameID.toString()
        };

        var onMessage = function onMessage(res) {
            cc.log("SendGetConfigMessage == onMessage", res);
            if (res.errno == 0) {
                GameLocalData.SaveConfigData(res.data);
            } else if (res.errno == 2007) {}
        };

        Game.NetManager.sendMsg("Get", GameConfig.GetConfigAddr, request, onMessage);
    },


    //发送获取游戏广告的的消息
    SendGetGameAdMessage: function SendGetGameAdMessage(gid, callback) {
        cc.log("SendGetGameAdMessage:");

        var request = {
            gid: gid
        };

        var onMessage = function onMessage(res) {
            cc.log("SendGetConfigMessage == onMessage", res);
            if (res.errno == 0) {
                callback(res.data);
            }
        };

        Game.NetManager.sendMsg("Get", GameConfig.GetGameADAddr, request, onMessage);
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
        //# sourceMappingURL=SendMessage.js.map
        