(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/PanelItem.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '319e4ZE9glCCKtCLjmx8q87', 'PanelItem', __filename);
// scripts/PanelItem.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        imgSp: { displayName: "图表icon", default: null, type: cc.Sprite }
    },

    onLoad: function onLoad() {},
    setItemData: function setItemData(directInfo) {
        this.directInfo = directInfo;
        this.createImage(directInfo.img_url, this.imgSp.node);

        this.tryCutGameName(directInfo.name);
    },
    tryCutGameName: function tryCutGameName(name) {
        var newName = name;
        if (name.length > 4) {
            newName = name.substring(0, 4) + "...";
        }
        this.node.getChildByName("name").getComponent(cc.Label).string = newName;
    },


    //执行跳转逻辑
    onBtnClickItem: function onBtnClickItem() {
        var that = this;
        if (window.wx != undefined) {
            wx.navigateToMiniProgram({
                appId: that.directInfo.app_id,
                path: that.directInfo.path,
                extraData: {
                    gameId: that.directInfo.game_id
                },
                envVersion: 'release',
                success: function success() {
                    //console.log("跳转成功");
                },
                fail: function fail(res) {
                    //console.log("跳转失败", res);
                }
            });
        }
    },
    createImage: function createImage(avatarUrl, spNode) {
        if (window.wx != undefined) {
            try {
                var image = wx.createImage();
                image.onload = function () {
                    try {
                        var texture = new cc.Texture2D();
                        texture.initWithElement(image);
                        texture.handleLoadedTexture();
                        var sp = new cc.SpriteFrame(texture);
                        spNode.getComponent(cc.Sprite).spriteFrame = sp;
                    } catch (e) {
                        console.log("load image error");
                    }
                };
                image.src = avatarUrl;
            } catch (e) {
                console.log("createImage error");
            }
        } else {
            cc.loader.load({
                url: avatarUrl, type: 'jpg'
            }, function (err, texture) {
                var sp = new cc.SpriteFrame(texture);
                spNode.getComponent(cc.Sprite).spriteFrame = sp;
            });
        }
    }
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
        //# sourceMappingURL=PanelItem.js.map
        