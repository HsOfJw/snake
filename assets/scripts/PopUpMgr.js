window.Game = window.Game || {};

window.Game.PopUpMgr = {

    Show_ScaleEffect: function(node, duration){
        if(duration == undefined){
            duration = GameConfig.PopUpDuration;
        }
        node.active = true;
        node.setScale(0.1, 0.1);

        var action1 = new cc.scaleTo(duration, 1, 1);
        var action2 = new cc.scaleTo(duration, 1, 1);
        node.runAction(cc.sequence(action1, cc.callFunc(function(){
            node.setScale(1, 1);
        })));
    },

    Hide_ScaleEffect: function(node, duration){
        if(duration == undefined){
            duration = GameConfig.PopUpDuration;
        }

        var action1 = new cc.scaleTo(duration, 0, 0);
        node.runAction(new cc.sequence(action1, cc.callFunc(function(){
            node.active = false;
        })));
    }
};
