var Util = require("Util");
var WXHelper = require("WXHelper");
var SceneCom = require("SceneCom");

cc.Class({
    extends: SceneCom,

    properties: {
       returnBtn: cc.Node,
       rankingScrollView: cc.Sprite,//显示排行榜
    },

    onLoad(){
        var self = this;

        this.tempTime = 0;

        this.returnBtn.on(cc.Node.EventType.TOUCH_END, function(){
            self.ranklistbtnClicked();
        });

        Util.ScreenAdaptation(this.rankingScrollView.node);

        this.tex = WXHelper.FetchFriendRankList();
    },

    ranklistbtnClicked(){
        Game.SceneMgr.switchScene(Game.SceneType.StartScene);
    },

    
    // 刷新子域的纹理
    _updateSubDomainCanvas() {
        if (window.sharedCanvas != undefined && this.tex) {
            this.tex.initWithElement(window.sharedCanvas);
            this.tex.handleLoadedTexture();
            this.rankingScrollView.spriteFrame = new cc.SpriteFrame(this.tex);
        }
    },

    update (dt) {
        this.tempTime += dt;

        if(this.tempTime >= GameConfig.FetchFriendRankListUpdateTime){
            this.tempTime = 0;
            this._updateSubDomainCanvas();
        }
    },

    onDestroy(){
        cc.log("RanklistScene-->>>onDestroy");

        WXHelper.ClearSharedCanvas();

        this.rankingScrollView.spriteFrame = null;
    }
});
