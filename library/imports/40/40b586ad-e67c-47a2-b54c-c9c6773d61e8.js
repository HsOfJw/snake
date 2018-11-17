"use strict";
cc._RF.push(module, '40b58at5nxHorVMycZ3PWHo', 'Entity');
// scripts/gameobject/Entity.js

"use strict";

var BaseNode = require("BaseNode");

cc.Class({
    extends: BaseNode,

    gid: 0,

    nextGID: 0,

    sprite: null,

    ctor: function ctor() {
        this.setName("Entity");

        this.gid = arguments[0];
        this.nextGID = this.gid;

        var sprite = this.addComponent(cc.Sprite);
        sprite.spriteFrame = new cc.SpriteFrame();

        this.refreshPos(this.gid);
        this.sprite = sprite;
    },
    doEnter: function doEnter() {},
    doExit: function doExit() {},


    getNewPos: function getNewPos(gid) {
        var newPos = Game.MapUtil.ConvertGIDToPos(gid);
        return newPos;
    },

    doDropAction: function doDropAction() {
        var self = this;

        if (Game.GlobalVar.isGameOver) {
            return;
        }

        this.nextGID = this.gid + Game.MapUtil.GetMapBlockNum().width;
        var gid = this.nextGID;

        var moveDistance = Game.MapUtil.GetMapBlockSize().width;
        var newPos = this.getNewPos(gid);

        var moveTo = new cc.moveTo(GameConfig.DropSpeed, newPos);
        var sequence = new cc.sequence(moveTo, cc.callFunc(function () {
            self.dropFinish();
        }));
        this.runAction(sequence);
        this.gid = gid;
    },

    dropFinish: function dropFinish() {},
    refreshPos: function refreshPos(gid) {
        var pos = Game.MapUtil.ConvertGIDToPos(gid);
        this.setPosition(pos);
    },
    getGID: function getGID() {
        return this.gid;
    },
    setGID: function setGID(gid) {
        this.gid = gid;
    },
    setNextGID: function setNextGID(nextGid) {
        this.nextGID = nextGid;
    },
    getNextGID: function getNextGID() {
        return this.nextGID;
    }
});

cc._RF.pop();