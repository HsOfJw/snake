"use strict";
cc._RF.push(module, '84d50+SeepBiIUArlC+mfFM', 'SceneCom');
// scripts/scene/SceneCom.js

"use strict";

cc.Class({
    extends: cc.Component,

    doCtor: function doCtor() {
        cc.log(this.name, "------------->>>doCtor");
    },
    doEnter: function doEnter() {
        cc.log(this.name, "------------->>>doEnter");

        this.node.active = true;
    },
    doExit: function doExit() {
        cc.log(this.name, "------------->>>doExit");

        this.node.x = 0;
        this.node.y = 0;

        this.node.active = false;

        this.node.stopAllActions();
    },
    frameOnMove: function frameOnMove(dt) {}
});

cc._RF.pop();