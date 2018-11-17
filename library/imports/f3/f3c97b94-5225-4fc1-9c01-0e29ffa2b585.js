"use strict";
cc._RF.push(module, 'f3c97uUUiVPwZwBDin/orWF', 'DiCiNode');
// scripts/gameobject/DiCiNode.js

"use strict";

var Entity = require("Entity");

cc.Class({
    extends: Entity,

    ctor: function ctor() {
        this.setName("DiCiNode");
        this.sprite.spriteFrame.setTexture(cc.url.raw('resources/gamescene/dici.png'));
    }
});

cc._RF.pop();