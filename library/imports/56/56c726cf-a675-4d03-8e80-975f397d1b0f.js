"use strict";
cc._RF.push(module, '56c72bPpnVNA46Al185fRsP', 'StoneMgr');
// scripts/StoneMgr.js

"use strict";

var StoneNode = require('./gameobject/StoneNode');

cc.Class({
    extends: cc.Component,

    stoneNodeVec: null,

    ctor: function ctor() {},
    GenerateStone: function GenerateStone(parent) {
        var self = this;
        var parentNode = parent;

        if (parentNode) {
            this.stoneNodeVec = [];

            var allStoneGID = Game.MapUtil.GetAllStoneGID();
            for (var i = 0; i < allStoneGID.length; i++) {
                var stoneNode = new StoneNode(allStoneGID[i]);
                parentNode.addChild(stoneNode, 10);

                this.stoneNodeVec.push(stoneNode);
            }
        }
    },
    GetAllStoneNode: function GetAllStoneNode() {
        return this.stoneNodeVec;
    },
    GetAllStoneGID: function GetAllStoneGID() {
        var allStoneGID = [];
        for (var i = 0; i < this.stoneNodeVec.length; i++) {
            var stone = this.stoneNodeVec[i];
            allStoneGID.push(stone.gid);
        }

        return allStoneGID;
    },
    RemoveStoneByGID: function RemoveStoneByGID(gid) {
        for (var i = 0; i < this.stoneNodeVec.length; i++) {
            var stone = this.stoneNodeVec[i];
            if (stone && stone.gid == gid) {
                stone.destroy();
                this.stoneNodeVec.splice(i, 1);
            }
        }
    },
    Clear: function Clear() {
        if (this.stoneNodeVec) {
            for (var i = 0; i < this.stoneNodeVec.length; i++) {
                var stone = this.stoneNodeVec[i];
                if (stone) {
                    stone.doExit();
                }
            }
            this.stoneNodeVec.length = 0;
        }

        Game.EventCenter.RemoveEvent(this.uuid);
    },
    SetMyDropDirtyFlag: function SetMyDropDirtyFlag() {
        for (var i = 0; i < this.stoneNodeVec.length; i++) {
            var stone = this.stoneNodeVec[i];
            if (stone) {
                stone.setMyDropDirtyFlag(true);
            }
        }
    },
    FrameOnMove: function FrameOnMove(dt) {
        for (var i = this.stoneNodeVec.length - 1; i >= 0; i--) {
            var stone = this.stoneNodeVec[i];
            if (stone && stone.myDeleteDirtyFlag) {
                stone.RemoveStoneByGID(stone.gid);
            }
        }

        for (var i = 0; i < this.stoneNodeVec.length; i++) {
            var stone = this.stoneNodeVec[i];
            if (stone) {
                stone.frameOnMove(dt);
            }
        }
    },
    onDestroy: function onDestroy() {
        cc.log("Stones-->onDestroy");
    }
});

cc._RF.pop();