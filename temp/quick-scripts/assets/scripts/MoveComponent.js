(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/MoveComponent.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '801abM5VAVIb6IgdWzg7Obc', 'MoveComponent', __filename);
// scripts/MoveComponent.js

'use strict';

var MoveDirection = require('ConstDefine').MoveDirection;

var MoveComponent = cc.Class({

    extends: cc.Component,

    isMoving: null,

    ctor: function ctor() {
        var self = this;

        this.isMoving = false;
    },
    startMove: function startMove() {
        if (this.isMoving) {
            return;
        }
        if (!this.node) {
            return;
        }

        if (this.node.nextGID < 0) {
            return;
        }

        var self = this;

        this.isMoving = true;

        //先转动身体
        // self.node.setDirection(Game.curOpDir);
        // self.node.doRotateAction();
        if (self.node.doTransfrom) {
            self.node.doTransfrom();
        }

        if (self.node.startMove) {
            self.node.startMove();
        }

        var gid = this.node.nextGID;

        var tiledwidth = Game.MapUtil.GetMapBlockSize().width;
        var newPos = this.node.getNewPos(gid);

        var moveTo = new cc.moveTo(GameConfig.SnakeMoveSpeed, newPos);
        var sequence = new cc.sequence(moveTo, cc.callFunc(function () {
            self.moveFinish();
        }));
        this.node.runAction(sequence);
        this.node.gid = gid;
    },
    moveFinish: function moveFinish() {
        this.node.moveFinish();

        this.isMoving = false;
    },
    frameOnMove: function frameOnMove(dt) {
        if (this.node.myChangedDirtyFlag) {
            this.startMove();

            this.node.setMyChangedDirtyFlag(false);
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
        //# sourceMappingURL=MoveComponent.js.map
        