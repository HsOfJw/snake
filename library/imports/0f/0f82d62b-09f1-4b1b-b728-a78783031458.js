"use strict";
cc._RF.push(module, '0f82dYrCfFLG7cop4eDAxRY', 'BaseNode');
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