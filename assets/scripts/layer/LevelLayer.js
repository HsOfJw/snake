var GlobalVar = require("GlobalVar");
var LevelData = require("LevelData");
var AdvertiseMgr = require("AdvertiseMgr");
var AdvertiseConfig = require("AdvertiseConfig");
var WXHelper = require("WXHelper");

cc.Class({
    extends: cc.Component,

    properties: {
        btnPrefab: cc.Prefab,

        popUpPrefab: cc.Prefab,
    },

    allBtn: null,

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.active = true;

        //读取剩余挑战次数
        LevelData.ReadChallengeCount();

        this.createBtn();

        this.refreshView();
    },

    createBtn(){
        var view = this.node.getChildByName("view");
        var context = view.getChildByName("content");

        var children = context.children;

        var level_id = 1;

        this.allBtn = [];

        var self = this;
        for(var i = 0; i < children.length; i++){
            var child = children[i];

            for(var j = 1; j <= 15; j++){
                var btn = cc.instantiate(self.btnPrefab);
                btn.setTag(level_id);
                // btn.getComponent(cc.Button).transition = cc.Button.Transition.NONE;
                btn.on(cc.Node.EventType.TOUCH_END,function(event){
                    self.levelBtnClicked(event);
                });
                child.addChild(btn);
                level_id ++;

                this.allBtn.push(btn);
            }
        }
    },

    refreshView(){
        if(!this.allBtn || this.allBtn.length <= 0){
            return;
        }

        for(var i = 0;i < this.allBtn.length;i ++){
            var btn = this.allBtn[i];

            if(!btn){
                continue;
            }

            var level_id = btn.getTag();

            var btnSprte = btn.getComponent(cc.Sprite);
            var level_num = btn.getChildByName("level_num");
            var level_num_label = level_num.getComponent(cc.Label);

            if(LevelData.IsLockedLevel(level_id) == false){
                level_num.active = false;
                btnSprte.spriteFrame = new cc.SpriteFrame(cc.url.raw('resources/unlock.png'));
            }else{
                level_num.active = true;
                level_num_label.string = level_id;
            }
        }
    },

    //点击单个关卡
    levelBtnClicked(event){
        Game.AudioManager.playButtonSound();

        var curTarget = event.currentTarget;

        var level_id = curTarget.tag;

        if(level_id > 15){
            var selectSceneCom = this.node.parent.getComponent("SelectScene");
            if(selectSceneCom){
                selectSceneCom.pageView.scrollToRight(0);
            }
        }

        if(LevelData.IsLockedLevel(level_id) == false){
            cc.log("关卡未解锁");
            return;
        }

        if(LevelData.IsPlayedLevel(level_id) == false){
            //已解锁但未通关
            
            if(LevelData.GetChallengeCount() >= 5){
                if(this.popUpPrefab){
                    var popUpNode = cc.instantiate(this.popUpPrefab);
                    popUpNode.getComponent("PopUpLayer").addContext(1);
                    popUpNode.getComponent("PopUpLayer").show(function(){
                        if(WXHelper.IsWXContext()){
                            //创建视频广告
                            AdvertiseMgr.CreateVideoAd(AdvertiseConfig.ADConfig_Relive_Video, function(isFinish){
                                if(isFinish){
                                    LevelData.SetChallengeCount(0);
                                    
                                    //添加挑战次数
                                    LevelData.UseChallengeCount();
                                    Game.GlobalVar.curLevel = level_id;
                                    Game.SceneMgr.switchScene(Game.SceneType.LoadingScene);
                                }
                            });
                        }else{
                            LevelData.SetChallengeCount(0);
                                    
                            //添加挑战次数
                            LevelData.UseChallengeCount();
                            Game.GlobalVar.curLevel = level_id;
                            Game.SceneMgr.switchScene(Game.SceneType.LoadingScene);
                        }
                        
                    });
                    this.node.addChild(popUpNode, 1000);
                }
                return;
            }
        }
        
        Game.GlobalVar.curLevel = level_id;
        Game.SceneMgr.switchScene(Game.SceneType.LoadingScene);
    },

    onDestroy(){
        if(this.allBtn){
            this.allBtn.length = 0;
        }
    }
    
    // update (dt) {},
});
