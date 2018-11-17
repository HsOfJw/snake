var SnakeNode = require("SnakeNode");
var MoveDirection = require('ConstDefine').MoveDirection;
var SnakeDirection = require('ConstDefine').SnakeDirection;

cc.Class({
    extends: SnakeNode,

    direction: null,

    curState: null,

    ctor(){
        this.setName("SnakeHead");
        this.curState = 0;

        var direction = parseInt(Game.MapUtil.GetProperty("startPos_1", "direction")); 
        if(direction >= 0){
            this.direction = direction;
        }
        this.sprite.spriteFrame.setTexture(cc.url.raw('resources/gamescene/head1.png'));

        this.refreshPos(arguments[0]);
        this.doRotateAction();
    },
    
    refreshPos(gid){
        if(this.sprite){
            var newPos = this.getNewPos(gid);
            this.setPosition(newPos);
        }
    },
    
    getNewPos: function(gid){
        var tiledwidth = Game.MapUtil.GetMapBlockSize().width;
        var newPos = Game.MapUtil.ConvertGIDToPos(gid);
        var Offset = (this.width - tiledwidth) * 0.5;

        switch(this.direction){
            case MoveDirection.MD_Left:
            {
                newPos.x -= Offset;
                break;
            }
            case MoveDirection.MD_Right:
            {
                newPos.x += Offset;
                break;
            }
            case MoveDirection.MD_Up:
            {
                newPos.y += Offset;
                break;
            }
            case MoveDirection.MD_Down:
            {
                newPos.y -= Offset;
                break;
            }
            default:
            {
                newPos.x += Offset;
                break;
            }
        }

        if(this.isChanged){
            newPos.x += (cc.director.getWinSize().width - 1334) * 0.5;
            newPos = this.parent.convertToNodeSpaceAR(newPos);
        }

        return newPos;
    },
    
    setDirection: function(direction){
        this.preDirection = this.direction;

        this.direction = direction;
    },

    moveFinish(){
        if(Game.GlobalVar.isEatedApple){
            this.doMeetFace();
            Game.GlobalVar.isEatedApple = false;

            return;
        }

        this.doNormalFace();
    },

    dropFinish(){
        this.snakes.dropFinish();
    },

    doTransfrom: function(){
        this.doRotateAction();

        var tiledwidth = Game.MapUtil.GetMapBlockSize().width;
        var Offset = (this.width - tiledwidth) * 0.5;

        if(this.direction == SnakeDirection.SD_Up && this.preDirection == SnakeDirection.SD_Right){
            this.y += Offset;
            this.x -= Offset;
            // this.sprite.spriteFrame = new cc.SpriteFrame(cc.url.raw("resources/gamescene/head_a.png"));
        }else if(this.direction == SnakeDirection.SD_Right && this.preDirection == SnakeDirection.SD_Up){
            this.x += Offset;
            this.y -= Offset;
        }else if(this.direction == SnakeDirection.SD_Down && this.preDirection == SnakeDirection.SD_Right){
            this.x -= Offset;
            this.y -= Offset;
        }else if(this.direction == SnakeDirection.SD_Left && this.preDirection == SnakeDirection.SD_Down){
            this.x -= Offset;
            this.y += Offset;
        }else if(this.direction == SnakeDirection.SD_Up && this.preDirection == SnakeDirection.SD_Left){
            this.x += Offset;
            this.y += Offset;
        }else if(this.direction == SnakeDirection.SD_Left && this.preDirection == SnakeDirection.SD_Up){
            this.x -= Offset;
            this.y -= Offset;
        }else if(this.direction == SnakeDirection.SD_Right && this.preDirection == SnakeDirection.SD_Down){
            this.x += Offset;
            this.y += Offset;
        }else if(this.direction == SnakeDirection.SD_Down && this.preDirection == SnakeDirection.SD_Left){
            this.x += Offset;
            this.y -= Offset;
        }
    },

    doRotateAction(){
        var rotate = 0;

        switch(this.direction){
            case MoveDirection.MD_Left:
            {
                rotate = -180;
                break;
            }
            case MoveDirection.MD_Right:
            {
                rotate = 0;
                break;
            }
            case MoveDirection.MD_Up:
            {
                rotate = -90;
                break;
            }
            case MoveDirection.MD_Down:
            {
                rotate = 90;
                break;
            }
        }

        this.rotation = rotate;

        this._super();
    },

    //正常表情
    doNormalFace(){
        this.sprite.spriteFrame = new cc.SpriteFrame(cc.url.raw("resources/gamescene/head1.png"));
    },

    //流口水表情
    doAtTheMouthFace(){
        this.sprite.spriteFrame = new cc.SpriteFrame(cc.url.raw("resources/gamescene/head2.png"));
    },

    //满足表情
    doMeetFace(){
        this.sprite.spriteFrame = new cc.SpriteFrame(cc.url.raw("resources/gamescene/head3.png"));
    },

    //绝望表情
    doDespairFace(){
        this.sprite.spriteFrame = new cc.SpriteFrame(cc.url.raw("resources/gamescene/head5.png"));
    },
});