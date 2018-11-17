(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/RankListScene.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '93ba9MFQmJGfpic8EWbFI/7', 'RankListScene', __filename);
// scripts/RankListScene.js

'use strict';

// var Util = require("Util");
// var GameConfig = require("ConstDefine").GameConfig;

cc.Class({
    extends: cc.Component,

    properties: {
        rankingScrollView: cc.ScrollView,
        scrollViewContent: cc.Node,
        prefabRankItem: cc.Prefab
    },

    // onLoad () {},

    myrank: null,

    show: function show() {
        this.fetchFriendData();
    },
    clearCanvas: function clearCanvas() {
        this.removeChild();
    },
    removeChild: function removeChild() {
        this.node.removeChildByTag(1000);
        this.scrollViewContent.removeAllChildren();
        this.rankingScrollView.node.active = false;
    },
    fetchFriendData: function fetchFriendData() {
        var self = this;

        this.rankingScrollView.node.active = true;

        wx.getUserInfo({
            openIdList: ['selfOpenId'],
            success: function success(userRes) {
                console.log('success', userRes.data);
                var userData = userRes.data[0];
                //取出所有好友数据
                wx.getFriendCloudStorage({
                    keyList: ['level_num', 'pass_time'],
                    success: function success(res) {
                        console.log("wx.getFriendCloudStorage success", res);
                        var data = res.data;

                        var sortData = self.dataSort(data);

                        for (var i = 0; i < data.length; i++) {
                            if (i >= 10) {
                                break;
                            }
                            var playerInfo = data[i];
                            var item = cc.instantiate(self.prefabRankItem);
                            var rankItem = item.getComponent('RankItem');
                            if (rankItem) {
                                rankItem.initView(i + 1, playerInfo);
                            }
                            self.scrollViewContent.addChild(item);
                            item.y = -(i * 140);
                        }

                        var selfData = self.getSelfData(data, userData);
                        if (selfData) {
                            var userItem = cc.instantiate(self.prefabRankItem);
                            userItem.getComponent('RankItem').initView(self.myrank, selfData, true);
                            userItem.y = -200;
                            self.node.addChild(userItem, 1, 1000);
                        }

                        // if (data.length <= 8) {
                        //     let layout = self.scrollViewContent.getComponent(cc.Layout);
                        //     layout.resizeMode = cc.Layout.ResizeMode.NONE;
                        // }
                    },
                    fail: function fail(res) {
                        console.log("wx.getFriendCloudStorage fail", res);
                        self.loadingLabel.getComponent(cc.Label).string = "数据加载失败，请检测网络，谢谢。";
                    }
                });
            },
            fail: function fail(res) {
                self.loadingLabel.getComponent(cc.Label).string = "数据加载失败，请检测网络，谢谢。";
            }
        });
    },
    dataSort: function dataSort(data) {
        for (var i = 0; i < data.length; i++) {
            var item = data[i];

            var level_data = JSON.parse(item.KVDataList[0].value);
            var passtime_data = JSON.parse(item.KVDataList[1].value);

            item.level_num = level_data.length;

            item.total_pass_time = 0;
            for (var j = 0; j < passtime_data.length; j++) {
                item.total_pass_time += passtime_data[j];
            }
        }

        data.sort(function (a, b) {
            if (a.KVDataList.length == 0 && b.KVDataList.length == 0) {
                return 0;
            }
            if (a.KVDataList.length == 0) {
                return 1;
            }
            if (b.KVDataList.length == 0) {
                return -1;
            }

            if (b.level_num != a.level_num) {
                return b.level_num - a.level_num;
            } else {
                return a.total_pass_time - b.total_pass_time;
            }
        });
    },
    getSelfData: function getSelfData(alldata, userData) {
        for (var i = 0; i < alldata.length; i++) {
            if (alldata[i].avatarUrl == userData.avatarUrl) {
                this.myrank = i + 1;
                return alldata[i];
            }
        }
        return null;
    }
}

// update (dt) {},
);

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=RankListScene.js.map
        