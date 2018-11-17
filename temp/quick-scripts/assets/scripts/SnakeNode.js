(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/SnakeNode.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '65aadxBxSVNMoR6JkdplJ5/', 'SnakeNode', __filename);
// scripts/SnakeNode.js

'use strict';

var MoveDirection = require('ConstDefine').MoveDirection;
var Entity = require('Entity');
var MoveComponent = require('MoveComponent').MoveComponent;
var SnakeDirection = require('ConstDefine').SnakeDirection;

cc.Class({
    extends: Entity,

    snakes: null,

    preDirection: null,
    direction: null,

    moveComponent: null,

    isChanged: null,

    ctor: function ctor() {
        this.setName("SnakeNode");

        this.doEnter();
    },
    doEnter: function doEnter() {
        this.isChanged = false;
        this.direction = SnakeDirection.SD_Right;
        this.preDirection = SnakeDirection.SD_Right;
        this.moveComponent = this.addComponent("MoveComponent");
    },
    doExit: function doExit() {
        this.snakes = null;

        this.moveComponent = null;
    },
    changeParent: function changeParent(parent) {
        var myWorldPos = this.convertToWorldSpaceAR(cc.Vec2.ZERO);

        var pos = this.position;
        var newPos = parent.convertToNodeSpaceAR(myWorldPos);
        this.position = newPos;
        this.parent = parent;
        this.isChanged = true;
    },
    moveFinish: function moveFinish() {},


    setDirection: function setDirection(direction) {
        this.preDirection = this.direction;
        this.direction = direction;
    },

    getDirection: function getDirection() {
        return this.direction;
    },

    doRotateAction: function doRotateAction() {},

    getNewPos: function getNewPos(gid) {
        var newPos = Game.MapUtil.ConvertGIDToPos(gid);

        if (this.isChanged) {
            newPos.x += (cc.director.getWinSize().width - 1334) * 0.5;

            newPos = this.parent.convertToNodeSpaceAR(newPos);
        }

        return newPos;
    },

    doTransfrom: function doTransfrom() {},

    setSnake: function setSnake(snake) {
        this.snakes = snake;
    },

    frameOnMove: function frameOnMove(dt) {
        this.moveComponent.frameOnMove(dt);
    }

    // gameOver(){
    //     if(this.snakes){
    //         this.snakes = null;
    //     }
    //     if(this.moveComponent){
    //         this.moveComponent.gameOver();
    //         this.moveComponent = null;
    //     }
    // }
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
        //# sourceMappingURL=SnakeNode.js.map
        