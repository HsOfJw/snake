(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/gameobject/AppleNode.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '083cdRqpvNCgq14DqHbQ7Kf', 'AppleNode', __filename);
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
        //# sourceMappingURL=AppleNode.js.map
        