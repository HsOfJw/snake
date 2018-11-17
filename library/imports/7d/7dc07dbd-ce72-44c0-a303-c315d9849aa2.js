"use strict";
cc._RF.push(module, '7dc0729znJEwKMDwxXZhJqi', 'SceneMgr');
// scripts/scene/SceneMgr.js

"use strict";

window.Game = window.Game || {};

cc.Class({

    extends: cc.Component,

    properties: {},

    curScene: null,

    onLoad: function onLoad() {
        Game.SceneMgr = this;
        cc.game.addPersistRootNode(this.node);
    },
    start: function start() {},


    //直接显示某个场景(没有切换效果)
    switchScene: function switchScene(sceneType) {
        var nextScene = this.getSceneByType(sceneType);

        cc.director.loadScene(nextScene);
    },


    //隐藏所有场景
    hideAllScene: function hideAllScene() {},
    getSceneByType: function getSceneByType(sceneType) {
        var scene = null;

        switch (sceneType) {
            case Game.SceneType.StartScene:
                scene = "StartScene";
                break;
            case Game.SceneType.SelectScene:
                scene = "SelectScene";
                break;
            case Game.SceneType.RanklistScene:
                scene = "RankListScene";
                break;
            case Game.SceneType.GameScene:
                scene = "GameScene";
                break;
            case Game.SceneType.LoadingScene:
                scene = "LoadingScene";
                break;
        }
        return scene;
    }
});

Game.SceneType = {
    StartScene: 1,
    SelectScene: 2,
    RanklistScene: 3,
    GameScene: 4,
    LoadingScene: 5
};

cc._RF.pop();