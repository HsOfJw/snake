"use strict";
cc._RF.push(module, '1e061wY5+NPY7IuNaeKMLVm', 'EventCenter');
// scripts/EventCenter.js

"use strict";

window.Game = window.Game || {};

//所有自定义事件派发中心
window.Game.EventCenter = {

    eventTargetList: null,

    dispatchList: null,

    RegisterEvent: function RegisterEvent(uuid, key, callback) {
        if (!this.eventTargetList) {
            this.eventTargetList = {};
        }
        if (!this.eventTargetList[uuid]) {
            this.eventTargetList[uuid] = {};
        }
        if (!this.eventTargetList[uuid][key]) {
            this.eventTargetList[uuid][key] = [];
        }

        this.eventTargetList[uuid][key].push(callback);
    },

    DispatchEvent: function DispatchEvent(key, data) {
        if (this.eventTargetList) {

            for (var target in this.eventTargetList) {
                if (this.eventTargetList[target]) {
                    var eventList = this.eventTargetList[target];
                    if (eventList[key]) {
                        var callbackArr = eventList[key];
                        if (callbackArr) {
                            for (var i = 0; i < callbackArr.length; i++) {
                                callbackArr[i](data);
                            }
                        }
                    }
                }
            }
        }
    },

    DispatchEventSync: function DispatchEventSync(key) {
        if (!this.dispatchList) {
            this.dispatchList = [];
        }

        this.dispatchList.push(key);
    },

    FrameOnMove: function FrameOnMove(dt) {
        if (this.dispatchList && this.dispatchList.length > 0) {
            var len = this.dispatchList.length;
            for (var i = 0; i < len; i++) {
                var key = this.dispatchList[i];
                this.DispatchEvent(key);
            }
            this.dispatchList.length = 0;
        }
    },

    RemoveEvent: function RemoveEvent(uuid) {
        if (this.eventTargetList && this.eventTargetList[uuid]) {
            delete this.eventTargetList[uuid];
        }
    },


    ClearAll: function ClearAll() {
        if (this.eventTargetList) {
            this.eventTargetList = null;
        }
        if (this.dispatchList) {
            this.dispatchList.length = 0;
            this.dispatchList = null;
        }
    }
};

Game.MessageType = {
    Snake_Move_Finish: "Snake_Move_Finish",
    Snake_Drop_Finish: "Snake_Drop_Finish",
    Stone_Drop_Finish: "Stone_Drop_Finish",
    CheckIsNotMove: "CheckIsNotMove",
    Check_Stone_Drop: "Check_Stone_Drop",
    GAME_WIN: "GAME_WIN",
    GAME_FAIL: "GAME_FAIL",
    Can_Eat_Apple: "Can_Eat_Apple",
    ClickedLockydrawBtn: "ClickedLockydrawBtn",

    Join_Next_Level: "Join_Next_Level",
    Reset_Start_Game: "Reset_Start_Game",

    Advertise_Play_Finish: "Advertise_Play_Finish",

    //刷新游戏对象层级事件
    Update_Game_Object_ZIndex: "Update_Game_Object_ZIndex",

    //控制蛇移动的事件
    Ctr_Snake_Move_To_Left: "Ctr_Snake_Move_To_Left",
    Ctr_Snake_Move_To_Right: "Ctr_Snake_Move_To_Right",
    Ctr_Snake_Move_To_Up: "Ctr_Snake_Move_To_Up",
    Ctr_Snake_Move_To_Down: "Ctr_Snake_Move_To_Down",

    //网络消息
    Game_MIN_TIME_REP: "Game_MIN_TIME_REP", //获取当前关卡内的最小过关时间成功
    Game_MIN_TIME_REP_NO_DATA: "Game_MIN_TIME_REP_NO_DATA" //获取当前关卡内的最小过关时间失败 没有数据
};

cc._RF.pop();