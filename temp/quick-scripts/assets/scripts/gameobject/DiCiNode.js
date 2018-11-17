(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/gameobject/DiCiNode.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'f3c97uUUiVPwZwBDin/orWF', 'DiCiNode', __filename);
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
        //# sourceMappingURL=DiCiNode.js.map
        