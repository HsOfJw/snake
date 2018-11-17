(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/Util.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'c6271/ZpBFIlIqz+FIKsc9f', 'Util', __filename);
// scripts/Util.js

"use strict";

//查找数组里是否包含某个元素
function IsContainElement(arr, item) {
    if (arr) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] == item) {
                return true;
            }
        }
    }
    return false;
};

//设置精灵节点的图片
function SetNodeTexture(node, filename) {
    cc.loader.loadRes(filename, function (err, texture) {
        if (err) {
            cc.log(err);
        } else {
            var sprite = node.getComponent(cc.Sprite);
            if (sprite) {
                sprite.spriteFrame = new cc.SpriteFrame(texture);
            }
        }
    });
};

//
function SetNodeSprteFrame(node, spriteFrame) {
    var sprite = node.getComponent(cc.Sprite);
    if (sprite) {
        sprite.spriteFrame = spriteFrame;
    }
}

//设置文本节点的内容
function SetNodeText(node, text) {
    var label = node.getComponent(cc.Label);
    if (label) {
        label.string = text;
    }
};

function CreateSprite(name, texture) {
    var node = new cc.Node(name);
    if (node) {
        var sprite = node.addComponent(cc.Sprite);
        sprite.spriteFrame = new cc.SpriteFrame(texture);
    }
    return node;
}

function CreateSpriteWithFrame(name, spriteFrame) {
    var node = new cc.Node(name);
    if (node) {
        var sprite = node.addComponent(cc.Sprite);
        sprite.spriteFrame = spriteFrame;
        return node;
    }
    return null;
}

//获取指定节点的指定组件
function GetComponent(node, component) {
    if (node && component) {
        return node.getComponent(component);
    }
    return null;
}

//注册按钮点击事件
function RegBtnClickEvent(button, callback) {
    // cc.assert(button, "button is null");
    // cc.assert(callback, "callback is null");

    if (button && callback) {
        button.on("click", callback);
    }
}

//注册键盘按下事件
function RegKeyUpEvent(callback) {
    if (callback) {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, callback);
    }
}

function RegBtnTouchBeginEvent(button, callback) {
    if (button && callback) {
        button.on(cc.Node.EventType.TOUCH_START, callback);
    }
}

function RegBtnTouchEndEvent(button, callback) {
    if (button && callback) {
        button.on(cc.Node.EventType.TOUCH_END, callback);
    }
}

//屏幕适配
function ScreenAdaptation(node) {
    if (node) {
        if (cc.director.getWinSize().width / cc.director.getWinSize().height - 16 / 9 > 0.1) {
            node.scaleX = cc.director.getWinSize().width / 1334;
        }
    }
}

function Sort(arr) {
    var compare = function compare(x, y) {
        if (x < y) {
            return 1;
        } else if (x > y) {
            return -1;
        } else {
            return 0;
        }
    };

    arr.sort(compare);
}

//根据gid对节点进行排序
function NodeSort(arr) {
    var compare = function compare(node_a, node_b) {
        if (node_a.gid < node_b.gid) {
            return 1;
        } else if (node_a.gid > node_b.gid) {
            return -1;
        } else {
            return 0;
        }
    };

    arr.sort(compare);
};

function loadRemoteImg(node, url) {
    cc.loader.load({
        url: url, type: 'jpg'
    }, function (err, texture) {
        node.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture);
    });
};

module.exports = {
    IsContainElement: IsContainElement,
    SetNodeTexture: SetNodeTexture,
    CreateSprite: CreateSprite,
    NodeSort: NodeSort,
    Sort: Sort,
    SetNodeText: SetNodeText,
    RegBtnClickEvent: RegBtnClickEvent,
    RegBtnTouchEndEvent: RegBtnTouchEndEvent,
    RegKeyUpEvent: RegKeyUpEvent,
    RegBtnTouchBeginEvent: RegBtnTouchBeginEvent,
    ScreenAdaptation: ScreenAdaptation,
    GetComponent: GetComponent,
    CreateSpriteWithFrame: CreateSpriteWithFrame,
    SetNodeSprteFrame: SetNodeSprteFrame,
    loadRemoteImg: loadRemoteImg
};

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
        //# sourceMappingURL=Util.js.map
        