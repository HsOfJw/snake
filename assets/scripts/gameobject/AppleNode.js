var Entity = require("Entity");

cc.Class({
    extends: Entity,

    ctor(){
        this.setName("AppleNode");
        this.sprite.spriteFrame.setTexture(cc.url.raw('resources/gamescene/apple.png'));
    }
});
