var StoneNode = require('./gameobject/StoneNode');

cc.Class({
    extends: cc.Component,

    stoneNodeVec: null,

    ctor(){

    },

    GenerateStone(parent) {
        var self = this;
        var parentNode = parent;

        if(parentNode){
            this.stoneNodeVec = [];

            var allStoneGID = Game.MapUtil.GetAllStoneGID();
            for(var i = 0;i < allStoneGID.length;i ++){
                var stoneNode = new StoneNode(allStoneGID[i]);
                parentNode.addChild(stoneNode, 10);

                this.stoneNodeVec.push(stoneNode);
            }
        }
    },

    GetAllStoneNode(){
        return this.stoneNodeVec;
    },

    GetAllStoneGID(){
        var allStoneGID = [];
        for(var i = 0;i < this.stoneNodeVec.length; i ++){
            var stone = this.stoneNodeVec[i];
            allStoneGID.push(stone.gid);
        }

        return allStoneGID;
    },

    RemoveStoneByGID(gid){
        for(var i = 0;i < this.stoneNodeVec.length;i ++){
            var stone = this.stoneNodeVec[i];
            if(stone && stone.gid == gid){
                stone.destroy();
                this.stoneNodeVec.splice(i, 1);
            }
        }
    },

    Clear(){
        if(this.stoneNodeVec){
            for(var i = 0;i < this.stoneNodeVec.length;i ++){
                var stone = this.stoneNodeVec[i];
                if(stone){
                    stone.doExit();
                }
            }
            this.stoneNodeVec.length = 0;
        }

        Game.EventCenter.RemoveEvent(this.uuid);
    },

    SetMyDropDirtyFlag(){
        for(var i = 0;i < this.stoneNodeVec.length;i ++){
            var stone = this.stoneNodeVec[i];
            if(stone){
                stone.setMyDropDirtyFlag(true);
            }
        }
    },

    FrameOnMove(dt){
        for(var i = this.stoneNodeVec.length - 1;i >= 0;i --){
            var stone = this.stoneNodeVec[i];
            if(stone && stone.myDeleteDirtyFlag){
                stone.RemoveStoneByGID(stone.gid);
            }
        }

        for(var i = 0;i < this.stoneNodeVec.length;i ++){
            var stone = this.stoneNodeVec[i];
            if(stone){
                stone.frameOnMove(dt);
            }
        }
    },

    onDestroy(){
        cc.log("Stones-->onDestroy");
    }
});

