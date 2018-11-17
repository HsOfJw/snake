var Util = require("Util");
var WXHelper = require("WXHelper");

var JJCYView = cc.Class({

    jjchNode: cc.Node,
    jjchSprite: cc.Sprite,

    isShow: null,

    tex: null,

    ctor(){
        this.isShow = false;

        this.tempTime = 0;

        this.init();
    },

    show () {
        this.isShow = true;
    },

    init(){
        this.tex = WXHelper.JJCYPlayer();
    },

    setView(view){
        if(view){
            this.jjchNode = view;

            this.jjchSprite = view.getComponent(cc.Sprite);
            // Util.ScreenAdaptation(this.jjchNode);

            // this.jjchNode.width = cc.winSize.width;
            // this.jjchNode.height = cc.winSize.height;
        }
    },
        
    // 刷新子域的纹理
    _updateSubDomainCanvas() {
        if (window.sharedCanvas != undefined) {
            if(this.tex){
                this.tex.initWithElement(window.sharedCanvas);
                this.tex.handleLoadedTexture();
                this.jjchSprite.spriteFrame = new cc.SpriteFrame(this.tex);
            }
        }
    },


    update(dt){
        if(this.isShow == false){
            return;
        }

        this.tempTime += dt;

        if(this.tempTime >= GameConfig.JJCYPlayerUpdateTime){
            this.tempTime = 0;
            this._updateSubDomainCanvas();
        }
    }
});
