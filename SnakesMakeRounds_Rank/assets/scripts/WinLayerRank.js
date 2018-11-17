// var Util = require("Util");
// var GameConfig = require("ConstDefine").GameConfig;

cc.Class({
    extends: cc.Component,

    properties: {
        rankingScrollView: cc.ScrollView,
        scrollViewContent: cc.Node,
        prefabRankItem: cc.Prefab
    },

    myrank: null,

    // onLoad () {},

    show () {
        this.fetchFriendData();
    },

    clearCanvas(){
        this.removeChild();
    },

    removeChild() {
        this.node.removeChildByTag(1000);
        this.scrollViewContent.removeAllChildren();

        this.rankingScrollView.node.active = false;
    },

    fetchFriendData(){
        var self = this;

        self.rankingScrollView.node.active = true;

        wx.getUserInfo({
            openIdList: ['selfOpenId'],
            success: (userRes) => {
                console.log('getUserInfo success', userRes.data)
                let userData = userRes.data[0];
                //取出所有好友数据
                wx.getFriendCloudStorage({
                    keyList: ['level_num', 'pass_time'],
                    success: res => {
                        console.log("所有好友的托管数据", res);
                        let data = res.data;

                        var sortedData = self.dataSort(data);

                        console.log("排序后的数据", sortedData);

                        for (var i = 0; i < sortedData.length; i++) {
                            if(i >= 10){
                                break;
                            }
                            var playerInfo = sortedData[i];
                            var item = cc.instantiate(self.prefabRankItem);
                            var rankItem = item.getComponent('WinLayerRankItem');
                            if(rankItem){
                                rankItem.initView(i + 1, playerInfo, false);
                            }
                            self.scrollViewContent.addChild(item);
                            item.y = -(i * 60);
                        }

                        var selfData = self.getSelfData(sortedData, userData);
                        if(selfData){
                            let userItem = cc.instantiate(self.prefabRankItem);
                            userItem.getComponent('WinLayerRankItem').initView(self.myrank, selfData, true);
                            userItem.y = -170;
                            self.node.addChild(userItem, 1, 1000);
                        }

                        // if (data.length <= 8) {
                        //     let layout = self.scrollViewContent.getComponent(cc.Layout);
                        //     layout.resizeMode = cc.Layout.ResizeMode.NONE;
                        // }
                    },
                    fail: res => {
                        console.log("wx.getFriendCloudStorage fail", res);
                        self.loadingLabel.getComponent(cc.Label).string = "数据加载失败，请检测网络，谢谢。";
                    },
                });
            },
            fail: (res) => {
                self.loadingLabel.getComponent(cc.Label).string = "数据加载失败，请检测网络，谢谢。";
            }
        });
    },

    dataSort(data){
        var arr = [];

        for(var i = 0;i < data.length;i ++){
            var item = data[i];

            var level_data = JSON.parse(item.KVDataList[0].value);
            var passtime_data = JSON.parse(item.KVDataList[1].value);

            if(passtime_data[GlobalVar.curLevel - 1] == 0){
                continue;
            }

            if(passtime_data.length >= GlobalVar.curLevel){
                item.curLevelMinTime = passtime_data[GlobalVar.curLevel - 1];
                arr.push(item);
            }
        }

        arr.sort((a, b) => {
            if (a.KVDataList.length == 0 && b.KVDataList.length == 0) {
                return 0;
            }
            if (a.KVDataList.length == 0) {
                return 1;
            }
            if (b.KVDataList.length == 0) {
                return -1;
            }

            return a.curLevelMinTime - b.curLevelMinTime;
        });

        return arr;
    },
    
    getSelfData(alldata, userData){
        for(var i = 0; i < alldata.length; i++){ 
            if(alldata[i].avatarUrl == userData.avatarUrl){
                this.myrank = i + 1;
                return alldata[i];
            }
        }
        return null;
    },

    // update (dt) {},
});
