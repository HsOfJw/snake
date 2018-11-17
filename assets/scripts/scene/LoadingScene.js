var SceneCom = require("SceneCom");
var GameRes = require("GameRes");

cc.Class({
    extends: SceneCom,

    properties: {
       loadingBar: cc.Node,
       appleNode: cc.Node,
       snakeNode: cc.Node,
    },

    //加载资源
    loadIndex: null,
    isLoading: null,
    isLoadFinish: null,

    progress: null,

    snakeRunDistance: null,

    comingLoadingRes: null,

    onLoad () {
        this.snakeRunDistance = this.loadingBar.width - this.snakeNode.width;
    },

    start(){
        this.comingLoadingRes = [];
        //设置即将加载的资源
        // if(Game.SceneMgr.getCurSceneType() == null){
            // this.comingLoadingRes = GameRes.StartSceneRes;
        // }else if(Game.SceneMgr.getCurSceneType() == Game.SceneType.SelectScene){
            this.comingLoadingRes = GameRes.GameSceneRes;
        // }

        this.loadIndex = 0;
        this.isLoading = false;
        this.isLoadFinish = false;

        this.progress = 0;

        this.loadRes();
    },

    onDestroy(){
        this.comingLoadingRes = null;
    },

    loadRes(){
        if(this.loadIndex >= this.comingLoadingRes.length)
        {
            this.isLoadFinish = true;

            Game.SceneMgr.switchScene(Game.SceneType.GameScene);
            return;
        }

        var temp = 100 / this.comingLoadingRes.length;
        
        var self = this;
        var res = this.comingLoadingRes[this.loadIndex];
        self.isLoading = true;
        // 加载 Texture，不需要后缀名
        cc.loader.loadRes(res, function (err, texture) {
            if(err){
                cc.log(err);
            }else{
                self.progress += temp;
                self.isLoading = false;
            }
        });
        this.loadIndex ++;
    },

    update(dt){

        //加载资源
        if(!this.isLoadFinish){
            if(!this.isLoading){
                this.loadRes();
            }

            if(this.loadingBar){
                this.loadingBar.getComponent(cc.ProgressBar).progress = this.progress / 100;
            }
    
            if(this.snakeNode){
                this.snakeNode.x = this.progress * (this.snakeRunDistance / 100) ;
            }
        }
    }

});
