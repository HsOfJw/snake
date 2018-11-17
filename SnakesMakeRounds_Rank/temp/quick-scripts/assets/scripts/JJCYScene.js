(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/JJCYScene.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'd69f6c6t7lHibXDdG6C9vk9', 'JJCYScene', __filename);
// scripts/JJCYScene.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        jjcybg: cc.Node,
        jjcyheadImg: cc.Sprite,
        jjcyname: cc.Label,
        jjcytime: cc.Label
    },

    onLoad: function onLoad() {
        if (cc.director.getWinSize().width / cc.director.getWinSize().height - 16 / 9 > 0.1) {
            this.node.scaleX = cc.director.getWinSize().width / 1334;
        }
        // this.node.width = cc.director.getWinSize().width;
        // this.node.height = cc.director.getWinSize().height;
    },
    show: function show() {
        var self = this;

        wx.getFriendCloudStorage({
            keyList: ['level_num', 'pass_time'],
            success: function success(res) {
                console.log("wx.getFriendCloudStorage success", res);
                var data = res.data;

                var dataItem = self.findData(data, GlobalVar.curLevel);
                self.initView(dataItem);
            },
            fail: function fail(res) {
                console.log("wx.getFriendCloudStorage fail", res);
                self.loadingLabel.getComponent(cc.Label).string = "数据加载失败，请检测网络，谢谢。";
            }
        });
    },
    clearCanvas: function clearCanvas() {
        this.jjcybg.active = false;
    },
    findData: function findData(data, level_id) {
        var nextID = level_id + 1;

        //首先找出符合要求的玩家数据(通关下一关卡用时最短的玩家)
        var minTime = Number.MAX_VALUE;
        var minIndex = -1;
        for (var i = 0; i < data.length; i++) {
            var item = data[i];

            var level_data = JSON.parse(item.KVDataList[0].value);
            var passtime_data = JSON.parse(item.KVDataList[1].value);

            if (level_data.length < nextID - 1 || passtime_data.length < nextID - 1 || passtime_data[nextID - 1] == 0) {
                continue;
            }

            if (passtime_data[nextID - 1] < minTime) {
                minTime = passtime_data[nextID - 1];
                minIndex = i;
            }
        }

        if (minIndex >= 0) {
            data[minIndex].mintime = minTime;
            return data[minIndex];
        }

        return null;
    },
    initView: function initView(data) {
        if (data) {
            this.createImage(data.avatarUrl);
            this.setNodeText(this.jjcyname, data.nickname);
            this.setNodeText(this.jjcytime, data.mintime);

            this.jjcybg.active = true;
        } else {
            this.jjcybg.active = false;
        }

        //不显示时间了
        this.jjcytime.active = false;
    },
    setNodeText: function setNodeText(node, text) {
        var label = node.getComponent(cc.Label);
        if (label) {
            label.string = text;
        }
    },
    createImage: function createImage(avatarUrl) {
        var self = this;

        if (CC_WECHATGAME) {
            try {
                var image = wx.createImage();
                image.onload = function () {
                    try {
                        var texture = new cc.Texture2D();
                        texture.initWithElement(image);
                        texture.handleLoadedTexture();
                        self.jjcyheadImg.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture);
                    } catch (e) {
                        cc.log(e);
                        self.jjcyheadImg.active = false;
                    }
                };
                image.src = avatarUrl;
            } catch (e) {
                cc.log(e);
                self.node.active = false;
            }
        } else {
            cc.loader.load({
                url: avatarUrl, type: 'jpg'
            }, function (err, texture) {
                self.jjcyheadImg.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture);
            });
        }
    }
    // update (dt) {},

});

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
        //# sourceMappingURL=JJCYScene.js.map
        