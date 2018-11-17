var Entity = require('Entity');
var MoveComponent = require('MoveComponent').MoveComponent;
var DropComponent   = require('DropComponent');

cc.Class({
    extends: Entity,

    moveComponent: null,
    dropComponent: null,

    ctor(){
        this.setName("StoneNode");

        this.moveComponent = this.addComponent("MoveComponent");
        this.dropComponent = this.addComponent("DropComponent");

        this.sprite.spriteFrame.setTexture(cc.url.raw('resources/gamescene/stone.png'));
    },

    doExit(){
        this.moveComponent = null;
        this.dropComponent = null;
    },

    doEnter(){

    },
    
    getAllGID: function(){
        var gidarr = [];
        gidarr.push(this.gid);
        return gidarr;
    },

    getMaxGID: function(){
        return this.getAllGID();
    },

    getNodeByGID: function(gid){
        return this;
    },

    startMove: function(){
        Game.AudioManager.playPushStoneSound();
    },

    moveFinish(){
        this.myDropDirtyFlag = true;
    },

    dropFinish(){
        Game.GlobalVar.isStoneDroping = false;
        if(this.y < 0){
            this.setMyDeleteDirtyFlag(true);
            return;
        }
        Game.EventCenter.DispatchEvent(Game.MessageType.Stone_Drop_Finish);
        this.dropComponent.dropFinish();


        this.myDropDirtyFlag = true;
    },

    doRotateAction: function(){

    },

    frameOnMove(dt){
        this.dropComponent.frameOnMove(dt);
        this.moveComponent.frameOnMove(dt);
    }
});
