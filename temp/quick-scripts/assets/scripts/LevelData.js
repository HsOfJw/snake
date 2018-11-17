(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/LevelData.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '5d4fc1EADRHiZ3/XMAc/fmG', 'LevelData', __filename);
// scripts/LevelData.js

"use strict";

var GlobalVar = require("GlobalVar");

var LevelData = {

    allLevelData: null,

    challengeCount: null,

    curDate: null,

    GetInitInfoObj: function GetInitInfoObj() {
        var levelInfo = {};
        for (var i = 1; i <= GameConfig.LevelNum; i++) {
            var levelObj = {};
            levelObj["lock_state"] = false;
            levelObj["lockydraw"] = false;
            levelObj["pass_time"] = 0;
            levelObj["daojishi"] = false;
            levelObj["click_count"] = 0;
            levelObj["reset_count"] = 0;

            if (i == 1) {
                levelObj["lock_state"] = true;
            }

            levelInfo[i] = levelObj;
        }

        return levelInfo;
    },

    //处理异常的数据(跳过解锁的情况)
    DisposeUnusualData: function DisposeUnusualData() {
        var bFlag = false;

        for (var i = 0; i < GameConfig.LevelNum; i++) {
            var levelData = this.allLevelData[i];
            if (bFlag) {
                levelData.lock_state = false;
                levelData.pass_time = 0;
                levelData.daojishi = false;
                levelData.click_count = 0;
                levelData.reset_count = 0;
            }
            if (levelData && !bFlag && levelData.lock_state == false) {
                bFlag = true;
            }
        }

        this.SaveLevelData();
    },

    //读取关卡剩余挑战次数
    ReadChallengeCount: function ReadChallengeCount() {
        this.curDate = new Date();

        var key = this.curDate.toLocaleDateString();

        var dataObj = null;
        var dataStr = GameLocalData.GetLevelChallengeCount();
        if (dataStr) {
            dataObj = JSON.parse(dataStr);
        }

        if (!dataObj || dataObj[key] == undefined) {
            this.challengeCount = 0;
        } else {
            this.challengeCount = dataObj[key];
        }
    },

    //保存关卡挑战次数
    SaveChallengeCount: function SaveChallengeCount() {
        if (this.curDate) {
            var key = this.curDate.toLocaleDateString();

            var dataObj = {};

            dataObj[key] = this.challengeCount;

            GameLocalData.SaveLevelChallengeCount(dataObj);
        }
    },

    UseChallengeCount: function UseChallengeCount() {
        this.challengeCount += 1;

        this.SaveChallengeCount();
    },

    GetChallengeCount: function GetChallengeCount() {
        return this.challengeCount;
    },

    SetChallengeCount: function SetChallengeCount(value) {
        this.challengeCount = value;

        this.SaveChallengeCount();
    },

    ReadLevelData: function ReadLevelData() {
        if (!this.allLevelData) {
            var info = GameLocalData.ReadLevelData();
            if (!info) {
                this.allLevelData = LevelData.GetInitInfoObj();
            } else {
                this.allLevelData = info;
            }
        }
        return this.allLevelData;
    },

    SaveLevelData: function SaveLevelData(levelInfoObj) {
        if (!levelInfoObj) {
            levelInfoObj = this.allLevelData;
        }

        if (levelInfoObj) {
            GameLocalData.SaveLevelData(levelInfoObj);
        }
    },

    IsLockedLevel: function IsLockedLevel(level_id) {
        if (this.isValidLevelID(level_id) == false) {
            return false;
        }

        var allLevelData = this.allLevelData;
        if (allLevelData) {
            var levelData = allLevelData[level_id];
            if (levelData) {
                return levelData["lock_state"];
            }
        }
    },

    UpdateLockStateData: function UpdateLockStateData(level_id, lock_state) {
        if (this.isValidLevelID(level_id) == false) {
            return false;
        }

        var allLevelData = this.allLevelData;
        if (allLevelData) {
            var levelData = allLevelData[level_id];
            levelData["lock_state"] = lock_state;
        }
        this.SaveLevelData();
    },

    UpdateLockydrawData: function UpdateLockydrawData(level_id, lockydraw) {
        if (this.isValidLevelID(level_id) == false) {
            return false;
        }

        var allLevelData = this.allLevelData;
        if (allLevelData) {
            var levelData = allLevelData[level_id];
            levelData["lockydraw"] = lockydraw;
        }
        this.SaveLevelData();
    },

    UpdatePassTime: function UpdatePassTime(level_id, passtime) {
        if (this.isValidLevelID(level_id) == false) {
            return false;
        }

        var allLevelData = this.allLevelData;
        if (allLevelData) {
            var levelData = allLevelData[level_id];
            levelData["pass_time"] = passtime;
        }

        this.SaveLevelData();
    },

    UpdateDaojishiData: function UpdateDaojishiData() {
        var allLevelData = this.allLevelData;
        if (allLevelData) {
            var levelData = allLevelData[Game.GlobalVar.curLevel];
            levelData["daojishi"] = true;
        }

        this.SaveLevelData();
    },

    GetClickCount: function GetClickCount(levelID) {
        var allLevelData = this.allLevelData;
        if (allLevelData) {
            var levelData = allLevelData[levelID];
            if (levelData.click_count == undefined) {
                levelData.click_count = 0;
            }
            return levelData.click_count;
        }
    },

    AddClickCount: function AddClickCount(levelID) {
        var allLevelData = this.allLevelData;
        if (allLevelData) {
            var levelData = allLevelData[levelID];
            if (levelData.click_count == undefined) {
                levelData.click_count = 0;
            }
            levelData.click_count++;
        }

        this.SaveLevelData();
    },

    AddResetCount: function AddResetCount(levelID) {
        var allLevelData = this.allLevelData;
        if (allLevelData) {
            var levelData = allLevelData[levelID];
            if (levelData.reset_count == undefined) {
                levelData.reset_count = 0;
            }
            levelData.reset_count++;
        }
        this.SaveLevelData();
    },

    ClearResetCount: function ClearResetCount(levelID) {
        var allLevelData = this.allLevelData;
        if (allLevelData) {
            var levelData = allLevelData[levelID];
            if (levelData.reset_count == undefined) {
                levelData.reset_count = 0;
            }
            levelData.reset_count = 0;
        }
        this.SaveLevelData();
    },

    GetResetCount: function GetResetCount(levelID) {
        var allLevelData = this.allLevelData;
        if (allLevelData) {
            var levelData = allLevelData[levelID];
            if (levelData.reset_count == undefined) {
                levelData.reset_count = 0;
            }
            return levelData.reset_count;
        }
    },

    UpdateNextLockstateData: function UpdateNextLockstateData(lock_state) {
        LevelData.UpdateLockStateData(Game.GlobalVar.curLevel + 1, lock_state);
    },

    UpdateCurLockydrawData: function UpdateCurLockydrawData(lockydraw) {
        LevelData.UpdateLockydrawData(Game.GlobalVar.curLevel, lockydraw);
    },

    UpdateCurPassTime: function UpdateCurPassTime(pass_time) {
        LevelData.UpdatePassTime(Game.GlobalVar.curLevel, pass_time);
    },

    GetCurLockydrawData: function GetCurLockydrawData() {
        //debug
        return false;

        var allLevelData = this.allLevelData;
        if (allLevelData) {
            var levelData = allLevelData[Game.GlobalVar.curLevel];
            return levelData["lockydraw"];
        }
    },

    GetCurPassTime: function GetCurPassTime() {
        var allLevelData = this.allLevelData;
        if (allLevelData) {
            var levelData = allLevelData[Game.GlobalVar.curLevel];
            return levelData.pass_time;
        }
    },

    IsPlayedLevel: function IsPlayedLevel(levelID) {
        var allLevelData = this.allLevelData;
        if (allLevelData) {
            var levelData = allLevelData[levelID];
            if (levelData.pass_time == 0 || levelData.pass_time == undefined) {
                return false;
            }
        }
        return true;
    },

    IsPlayedCurLevel: function IsPlayedCurLevel() {
        return this.IsPlayedLevel(Game.GlobalVar.curLevel);
    },

    IsPlayDaojishi: function IsPlayDaojishi() {
        if (this.IsPlayedCurLevel()) {
            return true;
        }

        var allLevelData = this.allLevelData;
        if (allLevelData) {
            var levelData = allLevelData[Game.GlobalVar.curLevel];
            if (levelData.daojishi) {
                return true;
            }
        }
        return false;
    },

    GenerateUserCloudData: function GenerateUserCloudData() {
        var kvDataList = [];

        var level_data = [];
        var time_data = [];

        if (this.allLevelData) {
            for (var level_id in this.allLevelData) {
                if (this.allLevelData[level_id].lock_state) {
                    level_data.push(level_id);
                    time_data.push(this.allLevelData[level_id].pass_time);
                }
            }
        }

        var level_obj = {
            key: "level_num",
            value: JSON.stringify(level_data)
        };

        var time_obj = {
            key: "pass_time",
            value: JSON.stringify(time_data)
        };

        kvDataList.push(level_obj);
        kvDataList.push(time_obj);

        return kvDataList;
    },

    isValidLevelID: function isValidLevelID(level_id) {
        if (level_id >= 1 && level_id <= GameConfig.LevelNum) {
            return true;
        }

        return false;
    }
};

module.exports = LevelData;

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
        //# sourceMappingURL=LevelData.js.map
        