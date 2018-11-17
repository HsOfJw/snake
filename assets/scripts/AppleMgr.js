var Util = require('Util');
var AppleNode = require('./gameobject/AppleNode');

cc.Class({
    extends: cc.Component,

    appleNodeVec: null,
    appleGIDVec: null,

    ctor(){
    },

    GenerateApple(myParent){
        if(!myParent){
            return;
        }

        this.appleGIDVec = [];
        this.appleNodeVec = [];

        var allAppleGID = Game.MapUtil.GetAppleGID();
        for(var i = 0;i < allAppleGID.length; i ++){
            var gid = allAppleGID[i];
			cc.log(1111111111);
			
			
			
            if(gid > 0){
                var pos = Game.MapUtil.ConvertGIDToPos(gid);
                var appleNode = new AppleNode("AppleNode");
                appleNode.setPosition(pos);
                appleNode.gid = gid;
                myParent.addChild(appleNode);
                this.appleNodeVec.push(appleNode);
                this.appleGIDVec.push(gid);
            }
        }
    },

    GetAllAppleNode(){
        return this.appleNodeVec;
    },

    GetAllAppleGID(){
        return this.appleGIDVec;
    },

    RemoveAppleByGID(gid){
        for(var i = 0;i < this.appleNodeVec.length;i ++){
            if(this.appleNodeVec[i].gid == gid){
                this.appleNodeVec[i].destroy();
                this.appleNodeVec.splice(i, 1);
                break;
            }
        }

        for(var i = 0;i < this.appleGIDVec.length;i ++){
            if(this.appleGIDVec[i] == gid){
                this.appleGIDVec.splice(i, 1);
                break;
            }
        }

        Game.MapUtil.RemoveAppleGID(gid);
    },

    Clear(){
        if(this.appleNodeVec){
            this.appleNodeVec.length = 0;
        }
        if(this.appleGIDVec){
            this.appleGIDVec.length = 0;
        }
    }
});
