"use strict";
cc._RF.push(module, '33071qy1a5BsYBpPe97/qWS', 'Snakes');
// scripts/Snakes.js

'use strict';

var MoveDirection = require('ConstDefine').MoveDirection;
var SnakeHead = require('SnakeHead');
var SnakeBody = require('SnakeBody');
var SnakeTail = require('SnakeTail');
var Util = require('Util');
var BaseNode = require("BaseNode");

cc.Class({
    extends: BaseNode,

    headNode: null,
    bodyNode: null,
    tailNode: null,
    isWin: null,
    dropComponent: null,
    winDirection: null,

    ctor: function ctor() {
        this.setAnchorPoint(cc.p(0, 0));
        this.setPosition(-667, -375);
        this.doEnter();
    },
    doEnter: function doEnter() {
        this.isWin = false;
        this.winDirection = 0;
        this.dropComponent = this.addComponent("DropComponent");
    },
    doExit: function doExit() {
        this.removeAllChildren();

        this.headNode.doExit();
        this.bodyNode.doExit();
        this.tailNode.doExit();

        this.dropComponent = null;
        this.headNode = null;
        this.bodyNode = null;
        this.tailNode = null;
    },
    setMyChangedDirtyFlag: function setMyChangedDirtyFlag(dirtyFlag) {
        this._super(dirtyFlag);

        this.headNode.setMyChangedDirtyFlag(dirtyFlag);
        this.bodyNode.setMyChangedDirtyFlag(dirtyFlag);
        this.tailNode.setMyChangedDirtyFlag(dirtyFlag);
    },
    create: function create() {
        var parentNode = this;

        if (parentNode) {
            var startGID = Game.MapUtil.GetStartGID();

            this.headNode = new SnakeHead(startGID.headGID);
            this.bodyNode = new SnakeBody(parentNode);
            this.tailNode = new SnakeTail(startGID.tailGID);
            this.bodyNode.addSection(startGID.bodyGID);

            parentNode.addChild(this.headNode, 10);
            parentNode.addChild(this.tailNode, 9);

            this.headNode.setSnake(this);
            this.bodyNode.setSnake(this);
            this.tailNode.setSnake(this);

            this.tailNode.doRotateAction();

            parentNode.zIndex = 10;
        }
    },
    isStatic: function isStatic() {
        if (this.dropComponent) {
            if (this.dropComponent.droping) {
                return false;
            }
        }

        return true;
    },
    getHeadCurGID: function getHeadCurGID() {
        return this.headNode.getGID();
    },
    move: function move() {
        this.tailNode.move();
        this.bodyNode.move();
        this.headNode.move();
    },
    refreshZIndex: function refreshZIndex() {
        return;

        // var zIndexArr = [];

        // zIndexArr.push(this.tailNode.zIndex);
        // var allSection = this.bodyNode.getAllSection();
        // for(var i = 0;i < allSection.length; i ++){
        //     zIndexArr.push(allSection[i].zIndex);
        // }
        // zIndexArr.push(this.headNode.zIndex);

        // Util.Sort(zIndexArr);

        // var index = 0;

        // this.headNode.zIndex = zIndexArr[index ++];
        // for(var i = allSection.length - 1; i >= 0; i --){
        //     allSection[i].zIndex = zIndexArr[index ++];
        // }
        // this.tailNode.zIndex = zIndexArr[index++];

        // var a = this.headNode.zIndex;
        // this.headNode.zIndex = this.tailNode.zIndex;
        // this.tailNode.zIndex = a;
    },


    getAllNode: function getAllNode() {
        var arr = [];

        if (this.tailNode) {
            arr.push(this.tailNode);
        }

        arr = arr.concat(this.bodyNode.getAllSection());

        if (this.headNode) {
            arr.push(this.headNode);
        }

        return arr;
    },

    getAllGID: function getAllGID() {
        var gidarr = [];

        if (this.headNode) {
            gidarr.push(this.headNode.getGID());
        }
        if (this.tailNode) {
            gidarr.push(this.tailNode.getGID());
        }

        if (this.bodyNode) {
            for (var i = 0; i < this.bodyNode.bodyLength; i++) {
                var bodyGID = this.bodyNode.getSectionGID(i);
                gidarr.push(bodyGID);
            }
        }
        return gidarr;
    },

    getMaxGID: function getMaxGID() {
        var gidarr = this.getAllGID();
        var maxY = 0;
        for (var i = 0; i < gidarr.length; i++) {
            var gid = gidarr[i];
            var tid = Game.MapUtil.ConvertGIDToTID(gid);
            if (tid.y > maxY) {
                maxY = tid.y;
            }
        }

        var maxGID = [];
        for (var i = 0; i < gidarr.length; i++) {
            var gid = gidarr[i];
            var tid = Game.MapUtil.ConvertGIDToTID(gid);
            if (tid.y == maxY) {
                maxGID.push(gid);
            }
        }
        return maxGID;
    },

    getNodeByGID: function getNodeByGID(gid) {
        if (gid == this.headNode.gid) {
            return this.headNode;
        }
        if (gid == this.tailNode.gid) {
            return this.tailNode;
        }

        return this.bodyNode.getSectionByGID(gid);
    },

    getAllNextGID: function getAllNextGID() {
        var gidarr = [];
        gidarr.push(this.headNode.getNextGID());
        gidarr.push(this.tailNode.getNextGID());

        for (var i = 0; i < this.bodyNode.bodyLength; i++) {
            var bodyGID = this.bodyNode.getSectionNextGID(i);
            gidarr.push(bodyGID);
        }
        return gidarr;
    },

    eatApple: function eatApple(direction, appleGID) {
        this.doMeetFace();

        this.bodyNode.addSection(this.headNode.getGID());
        this.bodyNode.setSnake(this);
        this.headNode.setNextGID(appleGID);
        // this.headNode.move(direction);

        this.headNode.setDirection(direction);
        // this.headNode.doTransfrom();

        Game.EventCenter.DispatchEvent(Game.MessageType.Update_Game_Object_ZIndex);

        this.setMyChangedDirtyFlag(true);
    },
    changeParent: function changeParent(parent) {
        if (parent) {
            var allNode = this.getAllNode();

            for (var i = 0; i < allNode.length; i++) {
                var node = allNode[i];
                node.changeParent(parent);
            }
        }
    },


    //是否与地面垂直
    isVertical: function isVertical() {
        var allGID = this.getAllGID();

        var curGID = this.headNode.getGID();
        var totalLen = this.bodyNode.bodyLength + 2;

        for (var i = 0; i < totalLen - 1; i++) {
            var nextGID = Game.MapUtil.GetDownGID(curGID);
            if (Util.IsContainElement(allGID, nextGID)) {
                curGID = nextGID;
            } else {
                return false;
            }
        }

        return true;
    },
    doDropAction: function doDropAction() {
        Game.GlobalVar.isDroping = true;

        this.headNode.doDropAction();
        this.bodyNode.doDropAction();
        this.tailNode.doDropAction();
    },
    moveFinish: function moveFinish() {
        this.myDropDirtyFlag = true;

        Game.EventCenter.DispatchEventSync(Game.MessageType.Snake_Move_Finish);
        Game.EventCenter.DispatchEventSync(Game.MessageType.Check_Stone_Drop);
        Game.EventCenter.DispatchEventSync(Game.MessageType.CheckIsNotMove);
    },
    dropFinish: function dropFinish() {
        Game.GlobalVar.isDroping = false;

        if (this.headNode.y < 0) {
            Game.EventCenter.DispatchEvent(Game.MessageType.GAME_FAIL);
            return;
        }

        this.dropComponent.dropFinish();
        this.myDropDirtyFlag = true;

        Game.EventCenter.DispatchEventSync(Game.MessageType.Snake_Drop_Finish);
        Game.EventCenter.DispatchEventSync(Game.MessageType.Check_Stone_Drop);
    },
    outLevel: function outLevel(direction) {
        // this.headNode.setDirection(direction);
        // this.bodyNode.setDirection(direction);
        // this.tailNode.setDirection(direction);
    },


    //正常表情
    doNormalFace: function doNormalFace() {
        this.headNode.doNormalFace();
    },


    //流口水表情
    doAtTheMouthFace: function doAtTheMouthFace() {
        this.headNode.doAtTheMouthFace();
    },


    //满足表情
    doMeetFace: function doMeetFace() {
        this.headNode.doMeetFace();
    },


    //绝望表情
    doDespairFace: function doDespairFace() {
        this.headNode.doDespairFace();
    },
    gameOver: function gameOver() {
        // if(this.headNode){
        //     this.headNode.gameOver();
        //     this.headNode = null;
        // }
        // if(this.bodyNode){
        //     this.bodyNode.gameOver();
        //     this.bodyNode = null;
        // }
        // if(this.tailNode){
        //     this.tailNode.gameOver();
        //     this.tailNode = null;
        // }

        // if(this.dropComponent){
        //     this.dropComponent.gameOver();
        //     this.dropComponent = null;
        // }

        // this.headNode = null;
        // this.bodyNode = null;
        // this.tailNode = null;
        // this.dropComponent = null;

        // this.node.destroy();
    },
    win: function win() {
        // this.node.destroy();
    },
    failed: function failed() {
        // this.node.destroy();
    },
    frameOnMove: function frameOnMove(dt) {
        if (this.headNode) this.headNode.frameOnMove(dt);
        if (this.bodyNode) this.bodyNode.frameOnMove(dt);
        if (this.tailNode) this.tailNode.frameOnMove(dt);
        if (this.dropComponent) this.dropComponent.frameOnMove(dt);
    },
    onDestroy: function onDestroy() {
        cc.log("Snakes-->onDestroy");
    }
});

cc._RF.pop();