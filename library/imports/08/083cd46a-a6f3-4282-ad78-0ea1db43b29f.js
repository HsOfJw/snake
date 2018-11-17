"use strict";
cc._RF.push(module, '083cdRqpvNCgq14DqHbQ7Kf', 'AppleNode');
// scripts/gameobject/AppleNode.js

"use strict";

var Entity = require("Entity");

cc.Class({
    extends: Entity,

    ctor: function ctor() {
        this.setName("AppleNode");
        this.sprite.spriteFrame.setTexture(cc.url.raw('resources/gamescene/apple.png'));
    }
});

cc._RF.pop();