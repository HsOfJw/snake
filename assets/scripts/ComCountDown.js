var Util = require("Util");

cc.Class({
    extends: cc.Component,

    properties: {
       bgSprite: cc.SpriteFrame,

       numSprite: [cc.SpriteFrame],

       goSprite: cc.SpriteFrame,
    },

    index: null,

    play(callback) {
        if(!this.node){
            return;
        }

        var self = this;

        this.index = 0;

        var countDownNode = Util.CreateSpriteWithFrame("CountDownNode", this.bgSprite);

        if(!countDownNode){
            return;
        }

        countDownNode.zIndex = 50;
        countDownNode.y = cc.winSize.height + countDownNode.height * 0.5;
        this.node.addChild(countDownNode);

        var numNode = Util.CreateSpriteWithFrame("NumNode", this.numSprite[this.index ++]);

        countDownNode.addChild(numNode);

        var action = this.createCountDownAction(function(){
            self.schedule(function(){
                if(self.index >=  self.numSprite.length){
                    countDownNode.runAction(new cc.sequence(new cc.moveTo(0.2, 0, cc.winSize.height + countDownNode.height * 0.5), new cc.removeSelf(true)));
                    self.unschedule("Countdown");
                    callback();
                    return;
                }
                Util.SetNodeSprteFrame(numNode, this.numSprite[this.index ++]);
            }, 1, "Countdown");
            Game.AudioManager.playDaojishiSound();
        });

        countDownNode.runAction(action);
    },

    createCountDownAction(callback){
        var moveAction = new cc.moveTo(0.2, 0, 0);
        var callfunc = new cc.callFunc(callback);

        return cc.sequence(moveAction, callfunc);
    },
    // update (dt) {},
});
