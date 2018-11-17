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

    ctor(){
        this.setName("SnakeNode");

        this.doEnter();
    },

    doEnter(){
        this.isChanged = false;
        this.direction = SnakeDirection.SD_Right;
        this.preDirection = SnakeDirection.SD_Right;
        this.moveComponent = this.addComponent("MoveComponent");
    },

    doExit(){
        this.snakes = null;

        this.moveComponent = null;
    },

    changeParent(parent){
        var myWorldPos = this.convertToWorldSpaceAR(cc.Vec2.ZERO);

        var pos = this.position;
        var newPos = parent.convertToNodeSpaceAR(myWorldPos);
        this.position = newPos;
        this.parent = parent;
        this.isChanged = true;
    },

    moveFinish(){
    },

    setDirection: function(direction){
        this.preDirection = this.direction;
        this.direction = direction;
    },
    
    getDirection: function(){
        return this.direction;
    },

    doRotateAction: function(){

    },

    getNewPos: function(gid){
        var newPos = Game.MapUtil.ConvertGIDToPos(gid);

        if(this.isChanged){
            newPos.x += (cc.director.getWinSize().width - 1334) * 0.5;

            newPos = this.parent.convertToNodeSpaceAR(newPos);
        }

        return newPos;
    },

    doTransfrom: function(){
        
    },

    setSnake: function(snake){
        this.snakes = snake;
    },

    frameOnMove: function(dt){
        this.moveComponent.frameOnMove(dt);
    },

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
