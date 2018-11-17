(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/SnakeSection.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'b9850esvjRPK7fw7Q0H3Oyb', 'SnakeSection', __filename);
// scripts/SnakeSection.js

"use strict";

var SnakeNode = require("SnakeNode");
var Util = require("Util");
var MoveDirection = require('ConstDefine').MoveDirection;
var SnakeDirection = require('ConstDefine').SnakeDirection;

cc.Class({
    extends: SnakeNode,

    newSprite: null,

    isFrist: null,

    ctor: function ctor(gid) {
        var self = this;

        this.isFrist = false;
        this.setName("SnakeSection");
        this.sprite.spriteFrame.setTexture(cc.url.raw('resources/gamescene/body.png'));
    },
    move: function move() {
        this.doMoveAction();
    },
    moveFinish: function moveFinish() {
        if (this.direction == SnakeDirection.SD_Left_Up || this.direction == SnakeDirection.SD_Left_Down || this.direction == SnakeDirection.SD_Right_Down || this.direction == SnakeDirection.SD_Right_Up) {
            this.sprite.spriteFrame = new cc.SpriteFrame(cc.url.raw("resources/gamescene/body_a.png"));
            var newSprite = this.getNewSprite();
            if (newSprite) {
                newSprite.active = false;
            }
        }
        this.doRotateAction();

        if (this.isFrist) {
            this.snakes.moveFinish();
        }
    },
    dropFinish: function dropFinish() {
        var newSprite = this.getNewSprite();
        if (newSprite) {
            newSprite.active = false;
        }
    },


    doRotateAction: function doRotateAction() {
        var rotate = 0;

        if (this.direction == SnakeDirection.SD_Right_Down) {
            rotate = 180;
        } else if (this.direction == SnakeDirection.SD_Left_Down) {
            rotate = 270;
        } else if (this.direction == SnakeDirection.SD_Right_Up) {
            rotate = 90;
        } else if (this.direction == SnakeDirection.SD_Left) {
            rotate = 180;
        }

        this.rotation = rotate;
    },

    doTransfrom: function doTransfrom() {
        if (this.direction == SnakeDirection.SD_Up || this.direction == SnakeDirection.SD_Down || this.direction == SnakeDirection.SD_Left || this.direction == SnakeDirection.SD_Right) {
            this.sprite.spriteFrame = new cc.SpriteFrame(cc.url.raw("resources/gamescene/body.png"));
        } else if (this.direction == SnakeDirection.SD_Left_Up) {
            var newSprite = this.getNewSprite();
            if (newSprite) {
                var newPos = Game.MapUtil.ConvertGIDToPos(this.nextGID);
                if (this.isChanged) {
                    newPos.x += (cc.director.getWinSize().width - 1334) * 0.5;
                    newPos = this.parent.convertToNodeSpaceAR(newPos);
                }
                newSprite.rotation = 0;
                newSprite.position = newPos;
                newSprite.zIndex = this.zIndex;
                newSprite.active = true;
            }
        } else if (this.direction == SnakeDirection.SD_Right_Down) {
            var newSprite = this.getNewSprite();
            if (newSprite) {
                newSprite.rotation = 180;
                var newPos = Game.MapUtil.ConvertGIDToPos(this.nextGID);
                if (this.isChanged) {
                    newPos.x += (cc.director.getWinSize().width - 1334) * 0.5;
                    newPos = this.parent.convertToNodeSpaceAR(newPos);
                }
                newSprite.position = newPos;
                newSprite.active = true;
                newSprite.zIndex = this.zIndex;
            }
        } else if (this.direction == SnakeDirection.SD_Left_Down) {
            var newSprite = this.getNewSprite();
            if (newSprite) {
                newSprite.rotation = 270;
                var newPos = Game.MapUtil.ConvertGIDToPos(this.nextGID);
                if (this.isChanged) {
                    newPos.x += (cc.director.getWinSize().width - 1334) * 0.5;
                    newPos = this.parent.convertToNodeSpaceAR(newPos);
                }
                newSprite.position = newPos;
                newSprite.active = true;
                newSprite.zIndex = this.zIndex;
            }
        } else if (this.direction == SnakeDirection.SD_Right_Up) {
            var newSprite = this.getNewSprite();
            if (newSprite) {
                newSprite.rotation = 90;
                var newPos = Game.MapUtil.ConvertGIDToPos(this.nextGID);
                if (this.isChanged) {
                    newPos.x += (cc.director.getWinSize().width - 1334) * 0.5;
                    newPos = this.parent.convertToNodeSpaceAR(newPos);
                }
                newSprite.position = newPos;
                newSprite.active = true;
                newSprite.zIndex = this.zIndex;
            }
        }
    },

    getNewSprite: function getNewSprite() {
        if (!this.newSprite) {
            var node = new cc.Node("Section_NewSprite");
            var sprite = node.addComponent(cc.Sprite);
            sprite.spriteFrame = new cc.SpriteFrame(cc.url.raw("resources/gamescene/body_a.png"));
            this.parent.addChild(node);
            this.newSprite = node;
        }

        return this.newSprite;
    },

    changeParent: function changeParent(parent) {
        this._super(parent);

        var newSprite = this.getNewSprite();
        // var pos = newSprite.position;
        // var newPos = parent.convertToNodeSpaceAR(pos);
        // newSprite.position = newPos;
        newSprite.parent = parent;
    },


    setDirection: function setDirection(move_direction) {
        this.preDirection = this.direction;
        this.direction = move_direction;
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
        //# sourceMappingURL=SnakeSection.js.map
        