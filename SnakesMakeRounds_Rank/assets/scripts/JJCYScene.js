cc.Class({
    extends: cc.Component,

    properties: {
        jjcybg: cc.Node,
        jjcyheadImg: cc.Sprite,
        jjcyname: cc.Label,
        jjcytime: cc.Label
    },

    onLoad () {
        if(cc.director.getWinSize().width / cc.director.getWinSize().height - 16 / 9 > 0.1){ 
            this.node.scaleX = cc.director.getWinSize().width / 1334;
        }
        // this.node.width = cc.director.getWinSize().width;
        // this.node.height = cc.director.getWinSize().height;
    },

    show(){
        var self = this;

        wx.getFriendCloudStorage({
            keyList: ['level_num', 'pass_time'],
            success: res => {
                console.log("wx.getFriendCloudStorage success", res);
                let data = res.data;

                var dataItem = self.findData(data, GlobalVar.curLevel);
                self.initView(dataItem);
            },
            fail: res => {
                console.log("wx.getFriendCloudStorage fail", res);
                self.loadingLabel.getComponent(cc.Label).string = "数据加载失败，请检测网络，谢谢。";
            },
        });
    },

    clearCanvas(){
        this.jjcybg.active = false;
    },

    findData(data, level_id){
        var nextID = level_id + 1;

        //首先找出符合要求的玩家数据(通关下一关卡用时最短的玩家)
        var minTime = Number.MAX_VALUE;
        var minIndex = -1;
        for(var i = 0;i < data.length; i ++){
            var item = data[i];

            var level_data = JSON.parse(item.KVDataList[0].value);
            var passtime_data = JSON.parse(item.KVDataList[1].value);

            if(level_data.length < nextID - 1 || passtime_data.length < nextID - 1 || passtime_data[nextID - 1] == 0){
                continue;
            }

            if(passtime_data[nextID - 1] < minTime){
                minTime = passtime_data[nextID - 1];
                minIndex = i;
            }
        }

        if(minIndex >= 0){
            data[minIndex].mintime = minTime;
            return data[minIndex];
        }

        return null;
    },

    initView(data){
        if(data){
            this.createImage(data.avatarUrl);
            this.setNodeText(this.jjcyname, data.nickname);
            this.setNodeText(this.jjcytime, data.mintime);

            this.jjcybg.active = true;
        }else{
            this.jjcybg.active = false;
        }

        //不显示时间了
        this.jjcytime.active = false;
    },

    setNodeText(node, text){
        var label = node.getComponent(cc.Label);
        if(label){
            label.string = text;
        }
    },

    createImage(avatarUrl) {
        var self = this;

        if (CC_WECHATGAME) {
            try {
                let image = wx.createImage();
                image.onload = () => {
                    try {
                        let texture = new cc.Texture2D();
                        texture.initWithElement(image);
                        texture.handleLoadedTexture();
                        self.jjcyheadImg.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture);
                    } catch (e) {
                        cc.log(e);
                        self.jjcyheadImg.active = false;
                    }
                };
                image.src = avatarUrl;
            }catch (e) {
                cc.log(e);
                self.node.active = false;
            }
        } else {
            cc.loader.load({
                url: avatarUrl, type: 'jpg'
            }, (err, texture) => {
                self.jjcyheadImg.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture);
            });
        }
    }
    // update (dt) {},
});
