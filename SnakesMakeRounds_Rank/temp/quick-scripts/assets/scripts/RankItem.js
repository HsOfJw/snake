(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/RankItem.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '3ca90WQYmlN/rZa9aXTzoZa', 'RankItem', __filename);
// scripts/RankItem.js

"use strict";

// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        bgImg: cc.Node,
        cupImg: cc.Node,
        headImg: cc.Node,
        playerName: cc.Node,
        time: cc.Node,
        cgNum: cc.Node,
        rankNum: cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start: function start() {},
    initView: function initView(rank, data, isme) {
        var _this = this;

        if (rank <= 3) {
            this.cupImg.active = true;
            this.rankNum.active = false;
            cc.loader.load({
                url: cc.url.raw("resources/cup_" + rank + ".png"), type: 'png'
            }, function (err, texture) {
                _this.cupImg.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture);
            });
            // this.cupImg.active = true;
            // this.setNodeTexture(this.cupImg, "resources/cup_" + rank + ".png")
        } else {
            this.rankNum.active = true;
            this.cupImg.active = false;
            this.setNodeText(this.rankNum, rank);
        }

        if (isme) {
            cc.loader.load({
                url: cc.url.raw("resources/mybar.png"), type: 'png'
            }, function (err, texture) {
                _this.bgImg.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture);
            });
        }

        this.createImage(data.avatarUrl);
        this.setNodeText(this.playerName, data.nickname);
        this.setNodeText(this.time, data.total_pass_time);
        this.setNodeText(this.cgNum, data.level_num);
    },
    setNodeText: function setNodeText(node, text) {
        var label = node.getComponent(cc.Label);
        if (label) {
            label.string = text;
        }
    },
    setNodeTexture: function setNodeTexture(node, filename) {
        var sprite = node.getComponent(cc.Sprite);
        if (sprite) {
            sprite.spriteFrame.setTexture(cc.url.raw(filename));
        }
    },
    createImage: function createImage(avatarUrl) {
        var _this2 = this;

        if (CC_WECHATGAME) {
            try {
                var image = wx.createImage();
                image.onload = function () {
                    try {
                        var texture = new cc.Texture2D();
                        texture.initWithElement(image);
                        texture.handleLoadedTexture();
                        _this2.headImg.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture);
                    } catch (e) {
                        cc.log(e);
                        _this2.headImg.active = false;
                    }
                };
                image.src = avatarUrl;
            } catch (e) {
                cc.log(e);
                this.node.active = false;
            }
        } else {
            cc.loader.load({
                url: avatarUrl, type: 'jpg'
            }, function (err, texture) {
                _this2.headImg.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture);
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
        //# sourceMappingURL=RankItem.js.map
        