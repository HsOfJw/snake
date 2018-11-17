(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/DropComponent.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'fdeb8NW78xFGo2Zaokn7Twu', 'DropComponent', __filename);
// scripts/DropComponent.js

"use strict";

var Util = require("Util");
var MoveDirection = require('ConstDefine').MoveDirection;

var DropComponent = cc.Class({

    extends: cc.Component,

    droping: null,

    ctor: function ctor() {
        var self = this;

        this.droping = false;
    },
    checkDrop: function checkDrop() {
        if (this.node.isWin) {
            return;
        }
        if (this.droping) {
            return;
        }
        if (this.isFloated()) {
            this.startDrop();
        }
    },
    isFloated: function isFloated() {
        var allGID = this.node.getAllGID();
        if (allGID.length <= 0) {
            return false;
        }

        var terrainGidVec = Game.MapUtil.GetMapTerrainGID();

        for (var i = 0; i < allGID.length; i++) {
            var downGID = Game.MapUtil.GetDownGID(allGID[i]);
            if (Util.IsContainElement(terrainGidVec, downGID) || Game.MapUtil.IsNull(downGID) == false) {
                return false;
            }
        }

        if (this.node.name == "StoneNode") {
            var snakeGID = Game.MapUtil.GetSnakeGID();
            for (var i = 0; i < allGID.length; i++) {
                var downGID = Game.MapUtil.GetDownGID(allGID[i]);
                if (Util.IsContainElement(snakeGID, downGID)) {
                    return false;
                }
            }
        }
        return true;
    },
    startDrop: function startDrop() {
        if (!this.node) {
            return;
        }
        var self = this;

        this.droping = true;
        if (this.node.name == "StoneNode") {
            Game.GlobalVar.isStoneDroping = true;
        }

        this.node.doDropAction();
    },
    dropFinish: function dropFinish() {
        this.droping = false;
    },
    frameOnMove: function frameOnMove(dt) {
        if (this.node.myDropDirtyFlag) {
            this.checkDrop();

            this.node.setMyDropDirtyFlag(false);
        }
    }
});

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
        //# sourceMappingURL=DropComponent.js.map
        