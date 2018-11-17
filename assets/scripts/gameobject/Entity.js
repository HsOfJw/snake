var BaseNode = require("BaseNode");

cc.Class({
    extends: BaseNode,

    gid: 0,

    nextGID: 0,

    sprite: null,

    ctor(){
        this.setName("Entity");

        this.gid = arguments[0];
        this.nextGID = this.gid;

        var sprite = this.addComponent(cc.Sprite);
        sprite.spriteFrame = new cc.SpriteFrame();

        this.refreshPos(this.gid);
        this.sprite = sprite;
    },

    doEnter(){

    },

    doExit(){

    },

    getNewPos: function(gid){
        var newPos = Game.MapUtil.ConvertGIDToPos(gid);
        return newPos;
    },
    
    doDropAction: function(){
        var self = this;

        if(Game.GlobalVar.isGameOver){
            return;
        }

        this.nextGID = this.gid + Game.MapUtil.GetMapBlockNum().width;
        var gid = this.nextGID;

        var moveDistance = Game.MapUtil.GetMapBlockSize().width;
        var newPos = this.getNewPos(gid);

        var moveTo = new cc.moveTo(GameConfig.DropSpeed, newPos);
        var sequence = new cc.sequence(moveTo, cc.callFunc(function(){
            self.dropFinish();
        }));
        this.runAction(sequence);
        this.gid = gid;
    },

    dropFinish(){

    },

    refreshPos(gid){
        var pos = Game.MapUtil.ConvertGIDToPos(gid);
        this.setPosition(pos);
    },

    getGID(){
        return this.gid;
    },

    setGID(gid){
        this.gid = gid;
    },

    setNextGID(nextGid){
        this.nextGID = nextGid;
    },

    getNextGID(){
        return this.nextGID;
    }
});
