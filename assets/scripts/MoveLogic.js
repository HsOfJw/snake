var MoveDirection = require('ConstDefine').MoveDirection;
var SnakeDirection = require('ConstDefine').SnakeDirection;
var Util = require('Util');

var MoveLogic = cc.Class({

    extends: cc.Component,

    isMoving:       null,
    snakeNode:      null,
    stoneNode:      null,
    winActionState: null,
    isWin:          null,
    winDirection:   null,

    ctor(){
        this.reset();
    },

    init(){
        var self = this;

        Game.EventCenter.RegisterEvent(this.uuid, Game.MessageType.Snake_Move_Finish, function(){
            self.moveFinish();
        });
    },

    onDestroy(){
        this.reset();

        Game.EventCenter.RemoveEvent(this.uuid);
    },

    reset(){
        this.isMoving = false;
        this.stoneNode = null;
        this.snakeNode = null;
        this.isWin = false;
        this.winActionState = 0;
        this.winDirection = 0;
    },

    moveLogic(moveDirection){
        this.isMoving = true;

        var snakeNode = this.snakeNode;

        /************计算位置******************/
        var snakeHeadGid = snakeNode.getHeadCurGID();
        var snakeHeadNextGid = Game.MapUtil.GetNextGID(moveDirection, snakeHeadGid);

        var bodySectionNum = snakeNode.bodyNode.getSectionNum();
        var gidArray = [];
        gidArray.push(snakeHeadGid);
        var index;

        for(index = 0;index < bodySectionNum; index ++){
            var sectionGID = snakeNode.bodyNode.getSectionGID(index);
            gidArray.push(sectionGID);
        }

        snakeNode.headNode.setNextGID(snakeHeadNextGid);
        for(index = 0;index < bodySectionNum; index ++){
            snakeNode.bodyNode.setSectionNextGID(index, gidArray[index]);
        }
        snakeNode.tailNode.setNextGID(gidArray[index]);
        
        if(this.isWin && gidArray[index] == Game.MapUtil.GetDoorGID()){
            this.winActionState = 1;
        }
        /**********************************/



        /************计算指向******************/
        var snakeHeadNextDir = moveDirection;
        var snakeHeadDir = snakeNode.headNode.getDirection();
        var dirArr = [];
        dirArr.push(snakeHeadDir);
        for(index = 0;index < bodySectionNum; index ++){
            var dir = snakeNode.bodyNode.getSectionDirection(index);
            dirArr.push(dir);
        }


        snakeNode.headNode.setDirection(snakeHeadNextDir);
        var tempPreDir = snakeHeadNextDir;
        for(index = 0;index < bodySectionNum; index ++){
            var tempCurDir = dirArr[index];
            if(tempPreDir == SnakeDirection.SD_Up && tempCurDir == SnakeDirection.SD_Right){
                tempCurDir = SnakeDirection.SD_Left_Up;
            }else if(tempPreDir == SnakeDirection.SD_Right && tempCurDir == SnakeDirection.SD_Up){
                tempCurDir = SnakeDirection.SD_Right_Down;
            }else if(tempPreDir == SnakeDirection.SD_Down && tempCurDir == SnakeDirection.SD_Right){
                tempCurDir = SnakeDirection.SD_Left_Down;
            }else if(tempPreDir == SnakeDirection.SD_Left && tempCurDir == SnakeDirection.SD_Down){
                tempCurDir = SnakeDirection.SD_Left_Up;
            }else if(tempPreDir == SnakeDirection.SD_Up && tempCurDir == SnakeDirection.SD_Left){
                tempCurDir = SnakeDirection.SD_Right_Up;
            }else if(tempPreDir == SnakeDirection.SD_Left &&  tempCurDir == SnakeDirection.SD_Up){
                tempCurDir = SnakeDirection.SD_Left_Down;
            }else if(tempPreDir == SnakeDirection.SD_Right &&  tempCurDir == SnakeDirection.SD_Down){
                tempCurDir = SnakeDirection.SD_Right_Up;
            }else if(tempPreDir == SnakeDirection.SD_Down &&  tempCurDir == SnakeDirection.SD_Left){
                tempCurDir = SnakeDirection.SD_Right_Down;
            }
            tempPreDir = tempCurDir;
            snakeNode.bodyNode.setSectionDirectioin(index, tempCurDir);
        }

        var tempCurDir = dirArr[index];
        if(tempCurDir == SnakeDirection.SD_Left_Up && tempPreDir == SnakeDirection.SD_Up){
            tempCurDir = SnakeDirection.SD_Up;
        }else if(tempCurDir == SnakeDirection.SD_Right_Down){
            tempCurDir = SnakeDirection.SD_Right;
        }else if(tempCurDir == SnakeDirection.SD_Left_Down){
            tempCurDir = SnakeDirection.SD_Down;
        }else if(tempCurDir == SnakeDirection.SD_Left_Up && tempPreDir == SnakeDirection.SD_Left){
            tempCurDir = SnakeDirection.SD_Left;    
        }
        snakeNode.tailNode.setDirection(tempCurDir);


        //开始移动
        snakeNode.setMyChangedDirtyFlag(true);
        /**********************************/


        //石头移动逻辑
        var allStoneNode = this.stoneNode.GetAllStoneNode();
        for(var i = 0;i < allStoneNode.length;i ++){
            var stone = allStoneNode[i];
            if(stone && stone.gid == snakeHeadNextGid){
                var stoneNextGID = Game.MapUtil.GetNextGID(moveDirection, snakeHeadNextGid);
                stone.nextGID = stoneNextGID;
                stone.setMyChangedDirtyFlag(true);
                break;
            }
        }
        //////////////////////////////

        Game.EventCenter.DispatchEvent(Game.MessageType.Update_Game_Object_ZIndex);
    },

    rotateLogic(direction){

    },

    moveFinish(){
        var self = this;

        if(self.isWin){
            if(self.winActionState == 0){
                self.moveLogic(self.winDirection);
            }else if(self.winActionState == 1){
                self.moveLogic(self.winDirection);
                self.winActionState = 2;
            }else if(self.winActionState == 2){
                //结束
                cc.log("game over");
                Game.EventCenter.DispatchEvent(Game.MessageType.GAME_WIN);
            }
        }

        self.isMoving = false;
    },

    //指定一个方向，判断是否可以移动
    isCanMove(moveDirection, isNotMoveLogic){
        if(this.isMoving || !this.snakeNode || this.isWin) return false;

        var snakeNode = this.snakeNode;

        var curGID = snakeNode.getHeadCurGID();
        var nextGID = Game.MapUtil.GetNextGID(moveDirection, curGID);

        var terrainGidVec = Game.MapUtil.GetMapTerrainGID();

        if(!isNotMoveLogic){
            if(snakeNode.dropComponent.droping){
                return false;
            }
        }

        if(Util.IsContainElement(terrainGidVec, nextGID)){
            return false;
        }

        for(var i = 0; i < snakeNode.bodyNode.bodyLength; i++){
            var bodyGID = snakeNode.bodyNode.getSectionGID(i);
            if(nextGID == bodyGID){
                return false;
            }
        }
        var tailGID = snakeNode.tailNode.getGID();
        if(tailGID == nextGID){
            return false;
        }

        var allStoneGID = Game.MapUtil.GetAllStoneGID();
        if(Util.IsContainElement(allStoneGID, nextGID)){
            var nextNetGID = Game.MapUtil.GetNextGID(moveDirection, nextGID);
            if(Game.MapUtil.IsNull(nextNetGID) == false || Util.IsContainElement(terrainGidVec, nextNetGID)){
                return false;
            }
        }

        return true;
    },

    //是否不能动了
    isNotMove(){
        if(this.snakeNode.dropComponent.droping){
            return false;
        }
        
        if(this.snakeNode.isVertical()){
            if(this.isCanMove(MoveDirection.MD_Left, true) || this.isCanMove(MoveDirection.MD_Right, true)){
                return false;
            }else{
                return true;
            }
        }

        for(var i = MoveDirection.MD_Left; i <= MoveDirection.MD_Down; i ++){
            if(this.isCanMove(i, true)){
                return false;
            }
        }

        return true;
    }
});

module.exports = MoveLogic;
