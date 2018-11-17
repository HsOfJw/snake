(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/AppleMgr.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '2bb4bnKlVpGMIJV6BfJYDEE', 'AppleMgr', __filename);
// scripts/AppleMgr.js

'use strict';

var Util = require('Util');
var AppleNode = require('./gameobject/AppleNode');

cc.Class({
    extends: cc.Component,

    appleNodeVec: null,
    appleGIDVec: null,

    ctor: function ctor() {},
    GenerateApple: function GenerateApple(myParent) {
        if (!myParent) {
            return;
        }

        this.appleGIDVec = [];
        this.appleNodeVec = [];

        var allAppleGID = Game.MapUtil.GetAppleGID();
        for (var i = 0; i < allAppleGID.length; i++) {
            var gid = allAppleGID[i];
            if (gid > 0) {
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
    GetAllAppleNode: function GetAllAppleNode() {
        return this.appleNodeVec;
    },
    GetAllAppleGID: function GetAllAppleGID() {
        return this.appleGIDVec;
    },
    RemoveAppleByGID: function RemoveAppleByGID(gid) {
        for (var i = 0; i < this.appleNodeVec.length; i++) {
            if (this.appleNodeVec[i].gid == gid) {
                this.appleNodeVec[i].destroy();
                this.appleNodeVec.splice(i, 1);
                break;
            }
        }

        for (var i = 0; i < this.appleGIDVec.length; i++) {
            if (this.appleGIDVec[i] == gid) {
                this.appleGIDVec.splice(i, 1);
                break;
            }
        }

        Game.MapUtil.RemoveAppleGID(gid);
    },
    Clear: function Clear() {
        if (this.appleNodeVec) {
            this.appleNodeVec.length = 0;
        }
        if (this.appleGIDVec) {
            this.appleGIDVec.length = 0;
        }
    }
});

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=AppleMgr.js.map
        