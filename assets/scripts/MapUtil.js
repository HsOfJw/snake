window.Game = window.Game || {};

var MoveDirection = require('ConstDefine').MoveDirection;
var Util = require('Util');

Game.MapUtil = {

    //地图节点
    MapNode: null,

    //地图的尺寸
    MapSize: null,

    //地图块的尺寸
    MapBlockSize: null,

    //地图横向和纵向地图块的个数
    MapBlockNum: null,

    //地图上所有地形的GID
    MapTerrainGID: null,

    //门的GID
    DoorGID: null,

    //苹果的GID
    AppleGID: null,

    //所有地刺的GID
    DiCiGID: null,

    //所有石头的GID
    StoneGID: null,

    //蛇包含的所有GID
    SnakeGID: null,

    //出生点的GID
    StartGID: null,
    
    Init: function(mapNode){
        this.MapNode = mapNode;
        this.MapBlockSize = mapNode.getTileSize();
        this.MapBlockNum = mapNode.getMapSize();
        this.MapSize = cc.size(mapNode.node.width, mapNode.node.height);

        this.InitAppleGID();
        this.InitDiCiGIDVec();
        this.InitDoorGID();
        this.InitStartGID();
        this.InitStoneGIDVec();
        this.InitTerrainGidVec();
    },

    InitEnd: function(){
        this.MapNode = null;
    },

    Reset: function(){
        this.MapSize = null;
        this.MapBlockSize = null;
        this.MapBlockNum = null;
        this.DoorGID = null;

        if(this.MapTerrainGID){
            this.MapTerrainGID.length = 0;
            this.MapTerrainGID = null;
        }
        if(this.AppleGID){
            this.AppleGID.length = 0;
            this.AppleGID = null;
        }
        if(this.DiCiGID){
            this.DiCiGID.length = 0;
            this.DiCiGID = null;
        }
        if(this.StoneGID){
            this.StoneGID.length = 0;
            this.StoneGID = null;
        }

        if(this.StartGID){
            this.StartGID.length = 0;
            this.StartGID = null;
        }

        if(this.SnakeGID){
            this.SnakeGID.length = 0;
            this.SnakeGID = null;
        }
    },


    InitTerrainGidVec: function(){
        this.MapTerrainGID = [];
        var allLayers = this.MapNode.allLayers();
        for (var i = 0; i < allLayers.length; ++i) {
            var layer = allLayers[i];

            var allTiles= layer.getTiles();
            for(var j = 0; j < allTiles.length; j ++){
                if(allTiles[j] > 0){
                    this.MapTerrainGID.push(j);
                }
            }
        }
    },

    InitStoneGIDVec: function(){
        this.StoneGID = [];
        var index = 1;
        while(true){
            var gid = this.getGIDByName("stone_" + index);
            if(gid >= 0){
                this.StoneGID.push(gid);
                index ++;
            }else{
                break;
            }
        }
                
        var gid = this.getGIDByName("stone");

        if(gid >= 0){
            this.StoneGID.push(gid);
        }
    },

    InitDiCiGIDVec: function(){
        this.DiCiGID = [];
        var index = 1;

        for(var direction = 1; direction <= 4; direction ++){
            while(true){
                var gid = this.getGIDByName("ci" + direction + "_" + index);
                if(gid >= 0){
                    var gidobj = {
                        gid: gid,
                        direction: direction
                    };
                    this.DiCiGID.push(gidobj);
                    index ++;
                }else{
                    index = 1;
                    break;
                }
            }
        }

        while(true){
            var gid = this.getGIDByName("ci_" + index);
            if(gid >= 0){
                var gidobj = {
                    gid: gid,
                    direction: 3
                };
                this.DiCiGID.push(gidobj);
                index ++;
            }else{
                break;
            }
        }
        
        var gid = this.getGIDByName("ci");

        if(gid >= 0){
            var gidobj = {
                gid: gid,
                direction: 2
            };
            this.DiCiGID.push(gidobj);
        }
    },

    InitAppleGID: function(){
        this.AppleGID = [];
        var index = 1;
        while(true){
            var gid = this.getGIDByName("apple_" + index);
            if(gid >= 0){
                this.AppleGID.push(gid);
                index ++;
            }else{
                break;
            }
        }

        var gid = this.getGIDByName("apple");

        if(gid >= 0){
            this.AppleGID.push(gid);
        }
    },

    InitDoorGID: function(){
        this.DoorGID = this.getGIDByName("door");
    },

    InitStartGID: function(){
        this.StartGID = {};
        this.SnakeGID = [];

        this.StartGID.headGID = this.getGIDByName("startPos_1");
        this.StartGID.bodyGID = this.getGIDByName("startPos_2");
        this.StartGID.tailGID = this.getGIDByName("startPos_3");

        if(this.StartGID.headGID < 0){
            this.StartGID.headGID = this.getGIDByName("startPos");
        }
        if(this.StartGID.bodyGID < 0){
            this.StartGID.bodyGID = this.StartGID.headGID - 1;
        }
        if(this.StartGID.tailGID < 0){
            this.StartGID.tailGID = this.StartGID.bodyGID - 1;
        }

        this.SnakeGID.push(this.StartGID.headGID);
        this.SnakeGID.push(this.StartGID.bodyGID);
        this.SnakeGID.push(this.StartGID.tailGID);
    },

    //判断某个gid所在的图块是否为空
    IsNull: function(gid){

        if(this.DoorGID == gid){
            return false;
        }

        if(Util.IsContainElement(this.AppleGID, gid)){
            return false;
        }

        if(Util.IsContainElement(this.DiCiGID, gid)){
            return false;
        }

        if(Util.IsContainElement(this.StoneGID, gid)){
            return false;
        }

        // if(Util.IsContainElement(this.SnakeGID, gid)){
        //     return false;
        // }

        return true;
    },

    RemoveTiled: function(gid){
        if(!this.MapNode){
            return;
        }

        var tid = this.ConvertGIDToTID(gid);

        var allLayers = this.MapNode.allLayers();
        for (var i = 0; i < allLayers.length; ++i) {
            var layer = allLayers[i];

            if(layer)
            {
                layer.removeTileAt(tid);
            }
        }
    },

    GetTiledSpriteFrame: function(gid){
        if(!this.MapNode){
            return null;
        }

        var tid = this.ConvertGIDToTID(gid);

        var width = 52;
        var height = 67;

        var allLayers = this.MapNode.allLayers();
        for (var i = 0; i < allLayers.length; ++i) {
            var layer = allLayers[i];

            var sprite = layer.getTileAt(tid);
            var img_id = layer.getTileGIDAt(tid);

            if(sprite && img_id > 0)
            {
                img_id -= 1;
                sprite.color = new cc.Color(255,255,255,255);
                if(img_id >= 7){
                    img_id -= 7;
                }
                var url = sprite.getTexture().url;
                var spriteFrame = new cc.SpriteFrame(url, new cc.Rect(width * img_id, 0, width, height));
                var pos = this.ConvertGIDToPos(gid, cc.p(0.5, 0.5));
                return {
                    spriteFrame: spriteFrame,
                    pos: cc.p(pos.x, pos.y)
                };
            }
        }
        return;
    },
    
    ConvertMapYToCanvasY: function(mapY){
        if(!this.MapSize){
            return 0;
        }
        return this.MapSize.height - mapY;
    },

    ConvertTIDToGID: function(tid){
        if(!this.MapBlockNum){
            return 0;
        }

        return tid.y * this.MapBlockNum.width + tid.x;
    },

    ConvertGIDToTID: function(gid){
        if(!this.MapBlockNum){
            return cc.p();
        }

        var x = gid % this.MapBlockNum.width;
        var y = parseInt(gid / this.MapBlockNum.width);
        return cc.p(x, y);
    },

    ConvertPosToTid: function(pos){
        if(!this.MapBlockSize || !this.MapSize){
            return cc.p();
        }

        var tidX = parseInt(pos.x / this.MapBlockSize.width);
        var tidY = parseInt((this.MapSize.height - pos.y) / this.MapBlockSize.height);

        return cc.p(tidX, tidY);
    },

    ConvertMapPosToGID: function(pos){
        if(!this.MapBlockSize){
            return 0;
        }

        var tidX = parseInt(pos.x / this.MapBlockSize.width);
        var tidY = parseInt(pos.y / this.MapBlockSize.height);

        return this.ConvertTIDToGID(cc.p(tidX, tidY));
    },

    ConvertGIDToPos: function(gid, anchropoint){
        if(!this.MapBlockSize){
            return cc.p();
        }

        if(!anchropoint){
            anchropoint = cc.p(0.5, 0.5);
        }

        var tid = this.ConvertGIDToTID(gid);

        var posX = (tid.x + anchropoint.x) * this.MapBlockSize.width;
        var posY = (tid.y + anchropoint.y) * this.MapBlockSize.height;
        posY = this.ConvertMapYToCanvasY(posY);

        return cc.p(posX, posY + 5);
    },

    GetMapTerrainGID: function(){
        return this.MapTerrainGID;
    },

    GetNextGID: function(moveDirection, curGID){     
        var nextTid = this.ConvertGIDToTID(curGID);
                                                            
        switch(moveDirection){
            case MoveDirection.MD_Left:
            {
                nextTid.x --;
                break;
            }
            case MoveDirection.MD_Right:
            {
                nextTid.x ++;
                break;
            }
            case MoveDirection.MD_Up:
            {
                nextTid.y --;
                break;
            }
            case MoveDirection.MD_Down:
            {
                nextTid.y ++;
                break;
            }
        }
        return this.ConvertTIDToGID(nextTid);
    },
    
    RemoveAppleGID: function(appleGID){
        if(this.AppleGID){
            for(var i = 0;i < this.AppleGID.length;i ++){
                if(appleGID == this.AppleGID[i]){
                    this.AppleGID.splice(i, 1);
                }
            }
        }
    },

    GetMapBlockNum: function(){
        return this.MapBlockNum;
    },

    GetMapBlockSize: function(){
        return this.MapBlockSize;
    },

    GetLeftGID: function(gid){
        return gid - 1;
    },

    GetRightGID: function(gid){
        return gid + 1;
    },

    GetUpGID: function(gid){
        if(this.MapBlockNum){
            return gid - this.MapBlockNum.width;
        }
        return -1;
    },

    GetDownGID: function(gid){
        if(this.MapBlockNum){
            return gid + this.MapBlockNum.width;
        }
        return -1;
    },

    GetDoorGID: function(){
        return this.DoorGID;
    },

    GetAppleGID: function(){
        return this.AppleGID;
    },

    GetStartGID: function(){
        return this.StartGID;
    },

    GetAllStoneGID: function(){
        return this.StoneGID;
    },

    GetSnakeGID: function(){
        return this.SnakeGID;
    },

    GetDiCiGID: function(){
        return this.DiCiGID;
    },

    GetProperty: function(objname, propertyname){
        return this.getProperty(objname, propertyname);
    },

    UpdateStoneGID: function(allStoneGID){
        this.StoneGID = allStoneGID;
    },

    UpdateSnakeGID: function(snakeGID){
        this.SnakeGID = snakeGID;
    },

//私有方法
    getGIDByName: function(name){
        var gid = -1;
        if(this.MapNode){
            var objLayer = this.MapNode.getObjectGroup("objLayer");
            if(objLayer){
                var posObj = objLayer.getObject(name);
                if(posObj){
                    var pos = cc.p(posObj.getProperty("x"), posObj.getProperty("y"));
    
                    var tidX = parseInt(pos.x / this.MapBlockSize.width);
                    var tidY = parseInt(pos.y / this.MapBlockSize.height);
    
                    gid = this.ConvertTIDToGID(cc.p(tidX, tidY));
                }
            }
        }
        return gid;
    },

    getProperty: function(objname, propertyname){
        if(this.MapNode){
            var objLayer = this.MapNode.getObjectGroup("objLayer");
            if(objLayer){
                var obj = objLayer.getObject(objname);
                if(obj){
                    var property = obj.getProperty(propertyname);
                    return property;
                }
            }
            return null;
        }
    }
};