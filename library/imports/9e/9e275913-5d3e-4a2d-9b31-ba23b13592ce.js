"use strict";
cc._RF.push(module, '9e275kTXT5KLZsxuiOxNZLO', 'SnakeTail');
// scripts/SnakeTail.js

"use strict";

var SnakeNode = require("SnakeNode");
var SnakeDirection = require('ConstDefine').SnakeDirection;

cc.Class({
    extends: SnakeNode,

    previouNode: null,

    newSprite: null,

    ctor: function ctor() {
        this.setName("SnakeTail");
        this.sprite.spriteFrame.setTexture(cc.url.raw('resources/gamescene/tail.png'));
    },
    move: function move(direction) {
        this.doRotateAction(direction);
        this.doMoveAction();
    },
    moveFinish: function moveFinish() {
        this.doRotateAction();
        var newSprite = this.getNewSprite();
        if (newSprite) {
            newSprite.active = false;
        }
    },
    doTransfrom: function doTransfrom() {
        var newSprite = this.getNewSprite();
        if (newSprite) {
            var newPos = Game.MapUtil.ConvertGIDToPos(this.nextGID);
            if (this.isChanged) {
                newPos.x += (cc.director.getWinSize().width - 1334) * 0.5;
                newPos = this.parent.convertToNodeSpaceAR(newPos);
            }
            newSprite.position = newPos;
            newSprite.zIndex = this.zIndex - 1;
            newSprite.active = true;
            newSprite.rotation = this.rotation;
        }
    },
    getNewSprite: function getNewSprite() {
        if (!this.newSprite) {
            var node = new cc.Node("Tail_NewSprite");
            var sprite = node.addComponent(cc.Sprite);
            sprite.spriteFrame = new cc.SpriteFrame();
            sprite.spriteFrame.setTexture(cc.url.raw("resources/gamescene/tail.png"));
            this.parent.addChild(node);

            this.newSprite = node;
        }
        return this.newSprite;
    },
    changeParent: function changeParent(parent) {
        this._super(parent);

        var newSprite = this.getNewSprite();

        newSprite.parent = parent;
    },
    doRotateAction: function doRotateAction() {
        var upGID = Game.MapUtil.GetUpGID(this.nextGID);
        var downGID = Game.MapUtil.GetDownGID(this.nextGID);
        var leftGID = Game.MapUtil.GetLeftGID(this.nextGID);
        var rifhtGID = Game.MapUtil.GetRightGID(this.nextGID);
        var tempGID = this.snakes.bodyNode.getLastSection().getNextGID();

        if (upGID == tempGID) {
            this.rotation = -90;
        } else if (downGID == tempGID) {
            this.rotation = 90;
        } else if (leftGID == tempGID) {
            this.rotation = -180;
        } else if (rifhtGID == tempGID) {
            this.rotation = 0;
        }
    }
});

cc._RF.pop();