cc.Class({
    extends: cc.Component,

    properties: {
        cupImg: cc.Node,
        headImg: cc.Node, 
        playerName: cc.Node,
        time: cc.Node,
        rankNum: cc.Node,
        bg: cc.Node,
    },

    start () {

    },

    initView(rank, data, isme){
        if(rank <= 3){
            this.cupImg.active = true;
            this.rankNum.active = false;
            cc.loader.load({
                url: cc.url.raw( "resources/winlayer_cup_" + rank + ".png"), type: 'png'
            }, (err, texture) => {
                this.cupImg.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture);
            });
        }else{
            this.rankNum.active = true;
            this.cupImg.active = false;
            this.setNodeText(this.rankNum, rank);
        }

        this.bg.active = isme;

        this.createImage(data.avatarUrl);
        this.setNodeText(this.playerName, data.nickname);
        this.setNodeText(this.time, data.curLevelMinTime);
    },

    setNodeText(node, text){
        var label = node.getComponent(cc.Label);
        if(label){
            label.string = text;
        }
    },

    setNodeTexture(node, filename){
        var sprite = node.getComponent(cc.Sprite);
        if(sprite){
            sprite.spriteFrame.setTexture(cc.url.raw(filename));
        }
    },

    createImage(avatarUrl) {
        if (CC_WECHATGAME) {
            try {
                let image = wx.createImage();
                image.onload = () => {
                    try {
                        let texture = new cc.Texture2D();
                        texture.initWithElement(image);
                        texture.handleLoadedTexture();
                        this.headImg.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture);
                    } catch (e) {
                        cc.log(e);
                        this.headImg.active = false;
                    }
                };
                image.src = avatarUrl;
            }catch (e) {
                cc.log(e);
                this.node.active = false;
            }
        } else {
            cc.loader.load({
                url: avatarUrl, type: 'jpg'
            }, (err, texture) => {
                this.headImg.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture);
            });
        }
    }

    // update (dt) {},
});
