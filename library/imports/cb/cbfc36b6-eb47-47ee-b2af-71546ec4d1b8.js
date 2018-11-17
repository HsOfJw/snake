"use strict";
cc._RF.push(module, 'cbfc3a260dH7rKvcVRuxNG4', 'DiCiMgr');
// scripts/DiCiMgr.js

'use strict';

var Util = require('Util');
var DiCiNode = require('./gameobject/DiCiNode');

cc.Class({
    extends: cc.Component,

    diciNodeVec: null,
    diciGIDVec: null,

    ctor: function ctor() {},
    GenerateDiCi: function GenerateDiCi(myParent) {
        if (!myParent) {
            return;
        }

        this.diciGIDVec = [];
        this.diciNodeVec = [];

        var diciGID = Game.MapUtil.GetDiCiGID();
        for (var i = 0; i < diciGID.length; i++) {
            var gidobj = diciGID[i];

            if (gidobj.gid > 0) {
                var pos = Game.MapUtil.ConvertGIDToPos(gidobj.gid);
                var diciNode = new DiCiNode();
                diciNode.setPosition(pos);
                diciNode.gid = gidobj.gid;
                myParent.addChild(diciNode, 10);
                this.diciNodeVec.push(diciNode);
                this.diciGIDVec.push(gidobj.gid);
                switch (gidobj.direction) {
                    case 1:
                        {
                            diciNode.rotation = 180;
                            break;
                        }
                    case 2:
                        {
                            diciNode.rotation = 0;
                            break;
                        }
                    case 3:
                        {
                            diciNode.rotation = 90;
                            break;
                        }
                    case 4:
                        {
                            diciNode.rotation = -90;
                            break;
                        }
                }
            }
        }
    },
    GetAllDiCiNode: function GetAllDiCiNode() {
        return this.diciNodeVec;
    },
    GetAllDiCiGID: function GetAllDiCiGID() {
        return this.diciGIDVec;
    },
    RemoveDiCiByGID: function RemoveDiCiByGID(gid) {
        for (var i = 0; i < this.diciNodeVec.length; i++) {
            if (this.diciNodeVec[i].gid == gid) {
                this.diciNodeVec[i].destroy();
                this.diciNodeVec.splice(i, 1);
                break;
            }
        }

        for (var i = 0; i < this.diciGIDVec.length; i++) {
            if (this.diciGIDVec[i] == gid) {
                this.diciGIDVec.splice(i, 1);
                break;
            }
        }

        // Game.MapUtil.RemoveAppleGID(gid);
    },
    Clear: function Clear() {
        if (this.diciNodeVec) {
            this.diciNodeVec.length = 0;
        }
        if (this.diciGIDVec) {
            this.diciGIDVec.length = 0;
        }
    }
});

cc._RF.pop();