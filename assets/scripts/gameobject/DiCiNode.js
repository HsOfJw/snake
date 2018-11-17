var Entity = require("Entity");

cc.Class({
    extends: Entity,

    ctor(){
        this.setName("DiCiNode");
        this.sprite.spriteFrame.setTexture(cc.url.raw('resources/gamescene/dici.png'));
    }
});
