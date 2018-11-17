cc.Class({
    extends: cc.Component,

    properties: {
        content: {displayName: "内容节点", default: null, type: cc.Node},
        leftPanelItem: {displayName: "侧拉板子节点", default: null, type: cc.Prefab},
    },


    onLoad() {
        this._initPage();
    },
    //初始化页面信息
    _initPage() {
        var self = this;

        this.loadingDisPlay();

        let out = this.node.parent.getChildByName("cblBtn");
        let bgWid = this.node.getChildByName("bg").width;
        this.node.setPosition(960, 0);
        let moveAction = cc.moveTo(0.2, out.x - bgWid / 3, 0);
        this.node.runAction(moveAction);
        this.content.removeAllChildren();

        Game.SendMessage.SendGetGameListMessage(GameConfig.GameListID, function(data){
            self._showData(data);
        });
    },

    //遍历展示数据
    _showData(recData) {

        this.node.getChildByName("loadingLabel").active = false;

        if (recData.state === "10") {
            console.log("游戏列表审核中，不进行遍历展示")
        } else {
            let gameList = recData.redirect;
            for (let i = 0; i < gameList.length; i++) {
                let item = cc.instantiate(this.leftPanelItem);
                let script = item.getComponent("PanelItem");
                if (script) {
                    let directInfo = {
                        img_url: gameList[i].img_url,
                        game_id: gameList[i].game_id,
                        name: gameList[i].name,
                        app_id: recData.hz_app_id,
                        path: recData.hz_path
                    };
                    script.setItemData(directInfo);
                }
                this.content.addChild(item);
            }
        }
    },
    onBtnClickBack() {
        let func = cc.callFunc(() => {
            this.node.destroy();
        })

        let moveAction = cc.moveTo(0.2, cc.p(960, 0));
        let seq2 = cc.sequence(moveAction, func);
        this.node.runAction(seq2);
    },

    
    //显示正在加载中文字
    loadingDisPlay() {
        let loadingLabel = this.node.getChildByName("loadingLabel").getComponent(cc.Label);//文本的Label组件
        loadingLabel.string = "正在加载中";
        let index = 0; 
        loadingLabel.schedule(() => {
        if(index > 3) {
        index = 0;
        }
        loadingLabel.string = `正在加载中${".".repeat(index)}`;
        index++;
        } , 0.5 , cc.macro.REPEAT_FOREVER , 0);
        },
    // update (dt) {},
});
