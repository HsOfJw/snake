var SceneCom = require("SceneCom");

cc.Class({
    extends: SceneCom,

    properties: {
        returnBtn: {
            default: null,
            type: cc.Node
        },

        levelLayer:{
            default: null,
            type: cc.Node
        },

        leftBtn: {
            default: null,
            type: cc.Node
        },

        rightBtn:{
            default: null,
            type: cc.Node
        },

        curPage: 1,
    },

    pageView: null,

    onLoad () {
        var self = this;

        this.pageView = this.levelLayer.getComponent(cc.PageView);

        this.returnBtn.on(cc.Node.EventType.TOUCH_END,function(event){
            self.returnClicked();
        });
        this.leftBtn.on(cc.Node.EventType.TOUCH_END,function(event){
            self.leftBtnClicked();
        });
        this.rightBtn.on(cc.Node.EventType.TOUCH_END,function(event){
            self.rightBtnClicked();
        });

    },

    returnClicked(){
        cc.log("returnClicked");
        Game.AudioManager.playButtonSound();

        Game.SceneMgr.switchScene(Game.SceneType.StartScene);
    },

    leftBtnClicked(){
        cc.log("leftBtnClicked");
        Game.AudioManager.playButtonSound();

        this.pageView.scrollToTopLeft(0.2);
    },

    rightBtnClicked(){
        cc.log("rightBtnClicked");
        Game.AudioManager.playButtonSound();

        this.pageView.scrollToRight(0.2);
    },

    frameOnMove(dt){

    },

    onDestroy(){
    }
});
