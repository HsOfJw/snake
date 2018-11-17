var MoveDirection = require('ConstDefine').MoveDirection;

var MoveComponent = cc.Class({

    extends: cc.Component,

    isMoving: null,

    ctor(){
        var self = this;

        this.isMoving = false;
    },

    startMove(){
        if(this.isMoving){
            return;
        }
        if(!this.node){
            return;
        }

        if(this.node.nextGID < 0){
            return;
        }

        var self = this;

        this.isMoving = true;

        //先转动身体
        // self.node.setDirection(Game.curOpDir);
        // self.node.doRotateAction();
        if(self.node.doTransfrom){
            self.node.doTransfrom();
        }
        
        if(self.node.startMove){
            self.node.startMove();
        }

        var gid = this.node.nextGID;

        var tiledwidth = Game.MapUtil.GetMapBlockSize().width;
        var newPos = this.node.getNewPos(gid);

        var moveTo = new cc.moveTo(GameConfig.SnakeMoveSpeed, newPos);
        var sequence = new cc.sequence(moveTo, cc.callFunc(function(){
            self.moveFinish();
        }));
        this.node.runAction(sequence);
        this.node.gid = gid;
    },

    moveFinish(){
        this.node.moveFinish();

        this.isMoving = false;
    },

    frameOnMove(dt){
        if(this.node.myChangedDirtyFlag){
            this.startMove();

            this.node.setMyChangedDirtyFlag(false);
        }
    }
});
