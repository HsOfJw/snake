(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/gameobject/StoneNode.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '3512f/PI2dDqbqpX3yf5mFo', 'StoneNode', __filename);
// scripts/gameobject/StoneNode.js

'use strict';

var Entity = require('Entity');
var MoveComponent = require('MoveComponent').MoveComponent;
var DropComponent = require('DropComponent');

cc.Class({
    extends: Entity,

    moveComponent: null,
    dropComponent: null,

    ctor: function ctor() {
        this.setName("StoneNode");

        this.moveComponent = this.addComponent("MoveComponent");
        this.dropComponent = this.addComponent("DropComponent");

        this.sprite.spriteFrame.setTexture(cc.url.raw('resources/gamescene/stone.png'));
    },
    doExit: function doExit() {
        this.moveComponent = null;
        this.dropComponent = null;
    },
    doEnter: function doEnter() {},


    getAllGID: function getAllGID() {
        var gidarr = [];
        gidarr.push(this.gid);
        return gidarr;
    },

    getMaxGID: function getMaxGID() {
        return this.getAllGID();
    },

    getNodeByGID: function getNodeByGID(gid) {
        return this;
    },

    startMove: function startMove() {
        Game.AudioManager.playPushStoneSound();
    },

    moveFinish: function moveFinish() {
        this.myDropDirtyFlag = true;
    },
    dropFinish: function dropFinish() {
        Game.GlobalVar.isStoneDroping = false;
        if (this.y < 0) {
            this.setMyDeleteDirtyFlag(true);
            return;
        }
        Game.EventCenter.DispatchEvent(Game.MessageType.Stone_Drop_Finish);
        this.dropComponent.dropFinish();

        this.myDropDirtyFlag = true;
    },


    doRotateAction: function doRotateAction() {},

    frameOnMove: function frameOnMove(dt) {
        this.dropComponent.frameOnMove(dt);
        this.moveComponent.frameOnMove(dt);
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
        //# sourceMappingURL=StoneNode.js.map
        