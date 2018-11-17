(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/SnakeBody.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '640e2TxJlBIDKppRJgETHHX', 'SnakeBody', __filename);
// scripts/SnakeBody.js

"use strict";

var SnakeSection = require("SnakeSection");

var SnakeBody = function SnakeBody() {

    this.bodyLength = 0;

    this.parent = arguments[0];

    this.sectionVec = null;

    this.addSection = function (gid) {
        if (this.sectionVec == null) {
            this.sectionVec = [];
        }

        var section = new SnakeSection(gid);
        this.parent.addChild(section, 8);
        section.name = section.name + this.sectionVec.length;

        this.sectionVec.push(section);

        this.bodyLength++;

        this.setFirstSection(gid);
    }, this.getAllSection = function () {
        return this.sectionVec;
    }, this.stopAllActions = function () {
        for (var i = 0; i < this.bodyLength; i++) {
            if (this.sectionVec[i]) {
                this.sectionVec[i].stopAllActions();
            }
        }
    }, this.getSectionByGID = function (gid) {
        for (var i = 0; i < this.bodyLength; i++) {
            if (this.sectionVec[i].gid == gid) {
                return this.sectionVec[i];
            }
        }
        return null;
    }, this.getSectionGID = function (index) {
        if (this.sectionVec.length <= 0) return 0;

        var maxIndex = this.sectionVec.length - 1;
        var newIndex = maxIndex - index;

        if (this.sectionVec[newIndex]) {
            return this.sectionVec[newIndex].getGID();
        }
        return 0;
    }, this.getSectionDirection = function (index) {
        if (this.sectionVec.length <= 0) return 0;

        var maxIndex = this.sectionVec.length - 1;
        var newIndex = maxIndex - index;

        if (this.sectionVec[newIndex]) {
            return this.sectionVec[newIndex].getDirection();
        }
        return 0;
    }, this.getSectionNextGID = function (index) {
        if (this.sectionVec.length <= 0) return 0;

        var maxIndex = this.sectionVec.length - 1;
        var newIndex = maxIndex - index;

        if (this.sectionVec[newIndex]) {
            return this.sectionVec[newIndex].getNextGID();
        }
        return 0;
    }, this.setSectionNextGID = function (index, gid) {
        if (this.sectionVec.length <= 0) return 0;

        var maxIndex = this.sectionVec.length - 1;
        var newIndex = maxIndex - index;

        if (this.sectionVec[newIndex]) {
            this.sectionVec[newIndex].setNextGID(gid);
        }
    }, this.setSectionDirectioin = function (index, direction) {
        if (this.sectionVec.length <= 0) return 0;

        var maxIndex = this.sectionVec.length - 1;
        var newIndex = maxIndex - index;

        if (this.sectionVec[newIndex]) {
            this.sectionVec[newIndex].setDirection(direction);
        }
    }, this.setDirection = function (direction) {
        for (var i = 0; i < this.bodyLength; i++) {
            this.sectionVec[i].setDirection(direction);
        }
    }, this.doExit = function () {
        for (var i = 0; i < this.bodyLength; i++) {
            this.sectionVec[i].doExit();
        }
    }, this.setMyChangedDirtyFlag = function (dirtyFlag) {
        for (var i = 0; i < this.bodyLength; i++) {
            this.sectionVec[i].setMyChangedDirtyFlag(dirtyFlag);
        }
    }, this.setFirstSection = function (gid) {
        for (var i = 0; i < this.bodyLength; i++) {
            if (this.sectionVec[i].gid == gid) {
                this.sectionVec[i].isFrist = true;
            } else {
                this.sectionVec[i].isFrist = false;
            }
        }
    },

    //身体节数
    this.setSectionNum = function (num) {
        this.bodyLength = num;
    }, this.getSectionNum = function () {
        return this.bodyLength;
    }, this.moveToLeft = function () {
        for (var i = 0; i < this.bodyLength; i++) {
            this.sectionVec[i].moveToLeft();
        }
    }, this.moveToRight = function () {
        for (var i = 0; i < this.bodyLength; i++) {
            this.sectionVec[i].moveToRight();
        }
    }, this.moveToUp = function () {
        for (var i = 0; i < this.bodyLength; i++) {
            this.sectionVec[i].moveToUp();
        }
    }, this.moveToDown = function () {
        for (var i = 0; i < this.bodyLength; i++) {
            this.sectionVec[i].moveToDown();
        }
    }, this.doDropAction = function () {
        for (var i = 0; i < this.bodyLength; i++) {
            this.sectionVec[i].doDropAction();
        }
    }, this.doMoveAction = function () {
        for (var i = 0; i < this.bodyLength; i++) {
            this.sectionVec[i].doMoveAction();
        }
    }, this.getLastSection = function () {
        return this.sectionVec[0];
    }, this.setSnake = function (snake) {
        for (var i = 0; i < this.bodyLength; i++) {
            this.sectionVec[i].setSnake(snake);
        }
    }, this.frameOnMove = function (dt) {
        for (var i = 0; i < this.bodyLength; i++) {
            this.sectionVec[i].frameOnMove(dt);
        }
    }, this.gameOver = function () {
        for (var i = 0; i < this.bodyLength; i++) {
            this.sectionVec[i].gameOver();
        }
    };
};

module.exports = SnakeBody;

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
        //# sourceMappingURL=SnakeBody.js.map
        