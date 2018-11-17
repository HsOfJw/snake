(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/gameobject/BaseNode.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '0f82dYrCfFLG7cop4eDAxRY', 'BaseNode', __filename);
// scripts/gameobject/BaseNode.js

"use strict";

cc.Class({
    extends: cc.Node,

    myDropDirtyFlag: null,
    myChangedDirtyFlag: null,
    myDeleteDirtyFlag: null,

    ctor: function ctor() {
        this.setName("BaseNode");

        this.myDropDirtyFlag = false;
        this.myChangedDirtyFlag = false;
        this.myDeleteDirtyFlag = false;
    },
    setMyDropDirtyFlag: function setMyDropDirtyFlag(dirtyFlag) {
        this.myDropDirtyFlag = dirtyFlag;
    },
    setMyChangedDirtyFlag: function setMyChangedDirtyFlag(dirtyFlag) {
        this.myChangedDirtyFlag = dirtyFlag;
    },
    setMyDeleteDirtyFlag: function setMyDeleteDirtyFlag(dirtyFlag) {
        this.myDeleteDirtyFlag = dirtyFlag;
    },
    doEnter: function doEnter() {},
    doExit: function doExit() {}
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
        //# sourceMappingURL=BaseNode.js.map
        