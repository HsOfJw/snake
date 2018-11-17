var MoveDirection = require('ConstDefine').MoveDirection;
var Util = require('Util');
var WXHelper = require("WXHelper");
var LevelData = require("LevelData");
var Snakes = require("Snakes");
var JJCYView = require('JJCYView');
var SceneCom = require("SceneCom");
var GameRes = require("GameRes");
var AdvertiseMgr = require("AdvertiseMgr");
var AdvertiseConfig = require("AdvertiseConfig");
var LevelData = require("LevelData");


/**
 * 游戏的核心逻辑
 */


cc.Class({
    extends: cc.Component,

    properties: {
        winLayerNode: {
            default: null,
            type: cc.Node
        },

        failLayerNode: {
            default: null,
            type: cc.Node
        },

        lockydrawLayerNode: cc.Node,

        levelNum: {
            default: null,
            type: cc.Node
        },

        bctimeText: {
            default: null,
            type: cc.Node
        },

        selectBtn: {
            default: null,
            type: cc.Node
        },

        replayBtn: {
            default: null,
            type: cc.Node
        },

        popUpPrefab: {
            default: null,
            type: cc.Prefab,
        },
    },

    isStart: false,
    lockydrawLayer: null,

    openDoorNode: null,
    closeDoorNode: null,

    isOver: false,
    curTime: null,

    moveLogic: null,

    shelterTileVec: null,
    isMoving: null,

    outLevelMaskNode: null,

    jjcyView: null,

    stoneMgr: null,
    appleMgr: null,
    diciMgr: null,

    onLoad() {
        var self = this;

        this.moveLogic = Util.GetComponent(this.node, "MoveLogic");
        this.lockydrawLayer = Util.GetComponent(this.lockydrawLayerNode, "LockydrawLayer");
        this.stoneMgr = Util.GetComponent(this.node, "StoneMgr");
        this.appleMgr = Util.GetComponent(this.node, "AppleMgr");
        this.diciMgr = Util.GetComponent(this.node, "DiCiMgr");

        Util.RegBtnClickEvent(this.selectBtn, this.selectLevelClicked.bind(this));
        Util.RegBtnClickEvent(this.replayBtn, this.replayBtnClicked.bind(this));

        var self = this;

        //注册游戏事件监听
        this.initEventListen();

        this.moveLogic.init();

        this.init();
    },

    start() {
        // var self = this;

        // //注册游戏事件监听
        // this.initEventListen();

        // this.init();

        // this.moveLogic.init();

        if (LevelData.IsPlayedLevel(Game.GlobalVar.curLevel) == false) {
            //已解锁但未通关

            //添加挑战次数
            LevelData.UseChallengeCount();
        }
    },

    reset() {
        //清除所有定时器
        this.unscheduleAllCallbacks();

        this.closeReplayEffect();

        if (this.shelterTileVec) {
            this.shelterTileVec.length = 0;
        }

        this.outLevelMaskNode = null;
        this.openDoorNode = null;
        this.closeDoorNode = null;

        if (this.jjcyView) {
            this.jjcyView = null;
        }

        if (this.stoneMgr) {
            this.stoneMgr.Clear();
        }

        if (this.appleMgr) {
            this.appleMgr.Clear();
        }

        if (this.diciMgr) {
            this.diciMgr.Clear();
        }

        if (this.snakes) {
            this.snakes.doExit();
            this.snakes.destroy();
        }

        if (this.moveLogic) {
            this.moveLogic.reset();
        }

        WXHelper.ClearSharedCanvas();
        Game.MapUtil.Reset();
    },

    init() {
        var self = this;

        if (this.levelNum) {
            Util.SetNodeText(this.levelNum, Game.GlobalVar.curLevel);
        }
        this.snakes = new Snakes();
        this.isOver = false;
        this.loadIndex = 0;
        this.isLoading = false;
        this.curTime = 0;
        this.isLoadFinish = false;
        this.isStart = false;
        this.isMoving = false;
        Game.GlobalVar.isGameOver = false;

        if (this.winLayerNode) {
            var gameOverLayer = this.winLayerNode.getComponent("GameOverLayer");
            gameOverLayer.hide();
        }

        if (this.failLayerNode) {
            var gameOverLayer = this.failLayerNode.getComponent("GameOverLayer");
            gameOverLayer.hide();
        }

        if (this.bctimeText) {
            Util.SetNodeText(this.bctimeText, 0);
        }

        //获取当前关卡的最短过关时间
        this.getPassLevelMinTime();

        this.schedule(function () {
            self.refreshUI();
        }, 1, "RefreshUI");

        LevelData.UpdateDaojishiData();

        this.initGame();
    },

    resetGame() {
        this.reset();
        this.init();
    },

    joinNextLevel() {
        if (Game.GlobalVar.curLevel == GameConfig.LevelNum) {
            return;
        }

        var self = this;

        if (LevelData.GetChallengeCount() >= 5) {
            if (self.popUpPrefab) {
                var popUpNode = cc.instantiate(self.popUpPrefab);
                popUpNode.getComponent("PopUpLayer").addContext(1);
                popUpNode.getComponent("PopUpLayer").show(function () {
                    if (WXHelper.IsWXContext()) {
                        //创建视频广告
                        AdvertiseMgr.CreateVideoAd(AdvertiseConfig.ADConfig_Relive_Video, function (isFinish) {
                            if (isFinish) {
                                LevelData.SetChallengeCount(0);

                                //添加挑战次数
                                LevelData.UseChallengeCount();

                                self.reset();
                                Game.GlobalVar.curLevel++;
                                self.init();
                            }
                        });
                    } else {
                        LevelData.SetChallengeCount(0);

                        //添加挑战次数
                        LevelData.UseChallengeCount();

                        self.reset();
                        Game.GlobalVar.curLevel++;
                        self.init();
                    }
                });
                self.node.addChild(popUpNode, 1000);
            }
            return;
        } else {
            self.reset();
            Game.GlobalVar.curLevel++;
            self.init();
        }
    },

    //初始化地图信息
    initMap(level_id) {
        var self = this;

        // 获取 TiledMap 组件
        var mapNode = new cc.Node();
        var theMap = mapNode.addComponent(cc.TiledMap);

        var tmxAsset = cc.loader.getRes('map/level_' + level_id, cc.TiledMapAsset);
        theMap.tmxAsset = tmxAsset

        Game.MapUtil.Init(theMap);

        //重新创建地图块
        this.recreateTiled();

        mapNode = null;

        Game.MapUtil.InitEnd();
    },

    //释放资源
    releaseRes() {
        for (var i = 0; i < GameRes.GameSceneRes.length; i++) {
            var res = GameRes.GameSceneRes[i];
            cc.loader.releaseRes(res);
        }
    },

    initGame() {
        var self = this;

        //初始化地图信息
        this.initMap(Game.GlobalVar.curLevel);

        //生成蛇
        this.generateSnake();
        //生成苹果
        this.appleMgr.GenerateApple(this.snakes);
        //生成过关的门
        this.generateDoor();
        //生成地刺
        this.diciMgr.GenerateDiCi(this.snakes);
        //生成石头
        this.stoneMgr.GenerateStone(this.snakes);
        //所有所有对象的层级
        this.refreshZIndex();
        // //显示即将超越的玩家
        this.showJJCYView();

        this.moveLogic.snakeNode = this.snakes;
        this.moveLogic.stoneNode = this.stoneMgr;

        this.startCountdown();
    },

    //显示即将超越的玩家
    showJJCYView() {
        var self = this;

        var jjcyNode = this.node.getChildByName("JJCYSprite");
        if (jjcyNode) {
            this.jjcyView = new JJCYView();
            this.jjcyView.setView(jjcyNode);
            this.jjcyView.show();
        }
    },

    initEventListen() {
        var self = this;

        //控制蛇的移动
        Game.EventCenter.RegisterEvent(this.uuid, Game.MessageType.Ctr_Snake_Move_To_Left, function () {
            self.move(MoveDirection.MD_Left);
        });
        Game.EventCenter.RegisterEvent(this.uuid, Game.MessageType.Ctr_Snake_Move_To_Right, function () {
            self.move(MoveDirection.MD_Right);
        });
        Game.EventCenter.RegisterEvent(this.uuid, Game.MessageType.Ctr_Snake_Move_To_Up, function () {
            self.move(MoveDirection.MD_Up);
        });
        Game.EventCenter.RegisterEvent(this.uuid, Game.MessageType.Ctr_Snake_Move_To_Down, function () {
            self.move(MoveDirection.MD_Down);
        });

        Game.EventCenter.RegisterEvent(this.uuid, Game.MessageType.Snake_Move_Finish, function () {
            if (self.isOver)
                return;

            self.updateSnakeGID();

            self.updateStoneGID();

            if (self.isDeatch()) {
                //被刺死了
                self.snakes.doDespairFace();
                self.gameOver(false);
            }

            if (self.isAdjacentToApple()) {
                //蛇头与苹果同边相邻
                self.snakes.doAtTheMouthFace();
            }

            self.isMoving = false;
        });

        Game.EventCenter.RegisterEvent(this.uuid, Game.MessageType.Snake_Drop_Finish, function () {
            if (Game.GlobalVar.isGameOver)
                return;

            if (self.moveLogic.isNotMove()) {
                //不能动了, 提示重玩
                self.replayEffect();
            }

            if (self.isDeatch()) {
                //被刺死了
                self.snakes.doDespairFace();
                self.gameOver(false);
            }

            if (self.isAdjacentToApple()) {
                //蛇头与苹果同边相邻
                self.snakes.doAtTheMouthFace();
            }

            self.updateSnakeGID();
        });

        Game.EventCenter.RegisterEvent(this.uuid, Game.MessageType.Stone_Drop_Finish, function () {
            if (Game.GlobalVar.isGameOver)
                return;

            self.updateStoneGID();

            if (self.moveLogic.isNotMove()) {
                //提示重玩
                self.replayEffect();
            }
        });

        Game.EventCenter.RegisterEvent(this.uuid, Game.MessageType.CheckIsNotMove, function () {
            if (Game.GlobalVar.isStoneDroping || Game.GlobalVar.isGameOver || Game.GlobalVar.isWin) {
                return;
            }

            if (self.snakes.isStatic() == false) {
                return;
            }

            if (self.moveLogic.isNotMove()) {
                //提示重玩
                self.replayEffect();
            }
        });

        Game.EventCenter.RegisterEvent(this.uuid, Game.MessageType.ClickedLockydrawBtn, function () {
            if (self.lockydrawLayer) {
                self.lockydrawLayer.show();
            }
        });


        //获取到当前关卡通关用时最少的时间成功
        Game.EventCenter.RegisterEvent(this.uuid, Game.MessageType.Game_MIN_TIME_REP, function (time) {
            self.refreshMinTimeUI(time);
        });

        //获取到当前关卡通关用时最少的时间失败 没有数据
        Game.EventCenter.RegisterEvent(this.uuid, Game.MessageType.Game_MIN_TIME_REP_NO_DATA, function () {
            self.refreshMinTimeUI(0);
        });

        //进入下一关
        Game.EventCenter.RegisterEvent(this.uuid, Game.MessageType.Join_Next_Level, function () {
            self.joinNextLevel(true);
        });

        //重新开始
        Game.EventCenter.RegisterEvent(this.uuid, Game.MessageType.Reset_Start_Game, function () {
            self.resetGame(true);
        });

        //过关了
        Game.EventCenter.RegisterEvent(this.uuid, Game.MessageType.GAME_WIN, function () {
            self.gameOver(true);
        });

        //失败了
        Game.EventCenter.RegisterEvent(this.uuid, Game.MessageType.GAME_FAIL, function () {
            self.gameOver(false);
        });

        //刷新游戏对象的层级
        Game.EventCenter.RegisterEvent(this.uuid, Game.MessageType.Update_Game_Object_ZIndex, function () {
            self.refreshZIndex();
        });

        //检查石头是否掉落
        Game.EventCenter.RegisterEvent(this.uuid, Game.MessageType.Check_Stone_Drop, function () {
            self.stoneMgr.SetMyDropDirtyFlag();
        });
    },

    clearEventListen() {
        Game.EventCenter.RemoveEvent(this.uuid);
    },

    //上传玩家本次通关时间
    sendPassLevelTime() {
        Game.SendMessage.SendPassLevelTime(Game.GlobalVar.curLevel, this.curTime);
    },

    //获取当前关卡通关的最短时间
    getPassLevelMinTime() {
        Game.SendMessage.SendGetPassLevelMinTime(Game.GlobalVar.curLevel);
    },

    //生成苹果
    generateApple() {
        var allAppleGID = Game.MapUtil.GetAppleGID();
        for (var i = 0; i < allAppleGID.length; i++) {
            var gid = allAppleGID[i];
            if (gid > 0) {
                var pos = Game.MapUtil.ConvertGIDToPos(gid);
                var posx = pos.x - cc.winSize.width * 0.5;
                var posy = pos.y - cc.winSize.height * 0.5;

                var node = new cc.Node('AppleNode');
                var sprite = node.addComponent(cc.Sprite);
                sprite.spriteFrame = new cc.SpriteFrame();
                sprite.spriteFrame.setTexture(cc.url.raw('resources/gamescene/apple.png'));
                node.setPosition(pos);
                node.gid = gid;
                this.snakes.addChild(node, 10);
            }
        }
    },

    //生成蛇
    generateSnake() {
        //创建蛇
        this.snakes.create();
        this.node.addChild(this.snakes);
    },

    //生成门
    generateDoor() {
        var gid = Game.MapUtil.GetDoorGID();
        var pos = Game.MapUtil.ConvertGIDToPos(gid);

        pos.y -= Game.MapUtil.GetMapBlockSize().height * 0.5;

        var opendoorNode = Util.CreateSprite("opendoorNode", cc.url.raw('resources/gamescene/open_door.png'));
        opendoorNode.setAnchorPoint(cc.p(0.5, 0));
        opendoorNode.setPosition(pos);
        opendoorNode.gid = gid;

        var closedoorNode = Util.CreateSprite('closedoorNode', cc.url.raw('resources/gamescene/close_door.png'));
        closedoorNode.setAnchorPoint(cc.p(0.5, 0));
        closedoorNode.setPosition(pos);
        closedoorNode.gid = gid - 1;

        this.snakes.addChild(opendoorNode, 5);
        this.snakes.addChild(closedoorNode, 20);

        this.closeDoorNode = closedoorNode;
        this.openDoorNode = opendoorNode;
    },

    //重新创建地图块(移除Tiled编辑器里拼好的，为了处理层级问题)
    recreateTiled() {
        if (!this.shelterTileVec) {
            this.shelterTileVec = [];
        }

        var terrainGID = Game.MapUtil.GetMapTerrainGID();

        if (this.shelterTileVec.length == 0) {
            for (var i = 0; i < terrainGID.length; i++) {
                var terrain = terrainGID[i];
                var obj = Game.MapUtil.GetTiledSpriteFrame(terrain);
                if (obj) {
                    var node = new cc.Node("node");
                    var sprite = node.addComponent(cc.Sprite);
                    sprite.spriteFrame = obj.spriteFrame;
                    node.gid = terrain;
                    // node.color = new cc.Color(0,0,0,255);
                    node.setPosition(obj.pos);
                    this.snakes.addChild(node, 20);
                    this.shelterTileVec.push(node);
                } else {
                    var tid = Game.MapUtil.ConvertGIDToTID(terrain);
                    cc.log('terrain:(' + tid.x + "," + tid.y + ")" + "not find");
                }
            }
        }
    },

    //刷新所有对象的层级
    refreshZIndex() {
        var newarr = this.shelterTileVec.concat(this.snakes.getAllNode());
        newarr = newarr.concat(this.stoneMgr.GetAllStoneNode());
        newarr = newarr.concat(this.closeDoorNode);
        newarr = newarr.concat(this.openDoorNode);
        newarr = newarr.concat(this.appleMgr.GetAllAppleNode());
        newarr = newarr.concat(this.diciMgr.GetAllDiCiNode());
        // if(this.outLevelMaskNode){
        //     this.outLevelMaskNode.gid = this.snakes.getHeadCurGID();
        //     newarr.push(this.outLevelMaskNode);
        // }

        Util.NodeSort(newarr);

        for (var i = 0; i < newarr.length; i++) {
            var node = newarr[i];
            // node.setGlobalZOrder(i+10);
            node.zIndex = i + 10;
        }
        // this.snakes.refreshZIndex();
    },

    //刷新石头的GID
    updateStoneGID() {
        Game.MapUtil.UpdateStoneGID(this.stoneMgr.GetAllStoneGID());
    },

    //刷新蛇的GID
    updateSnakeGID() {
        Game.MapUtil.UpdateSnakeGID(this.snakes.getAllGID());
    },

    //倒计时
    startCountdown() {
        if (!GameConfig.isOpenDaojishi || LevelData.IsPlayDaojishi()) {
            this.isStart = true;
            return;
        }

        var self = this;

        var countDownCom = Util.GetComponent(this.node, "ComCountDown");
        if (countDownCom) {
            countDownCom.play(function () {
                self.isStart = true;
            });
        }
    },

    move(moveDirection) {
        if (this.isMoving) {
            return;
        }


        if (this.moveLogic.isCanMove(moveDirection)) {
            this.isMoving = true;
            Game.AudioManager.playDirectionSound();

            if (this.isWin(moveDirection)) {
                this.outLevel(moveDirection);
                return;
            }

            if (this.isTouchDiCi(moveDirection)) {
                Game.AudioManager.playBeiCiSound();
            }

            var appleGID = this.isEatingApple(moveDirection);

            if (appleGID >= 0) {
                this.eatApple(moveDirection, appleGID);
            } else {
                this.moveLogic.moveLogic(moveDirection);
            }
        }
    },

    //判断蛇头是否与苹果同边相邻
    isAdjacentToApple() {
        if (this.snakes == null || this.snakes.isStatic() == false) {
            return false;
        }

        if (!this.appleMgr) {
            return;
        }

        var curGID = this.snakes.getHeadCurGID();
        var upGid = Game.MapUtil.GetUpGID(curGID);
        var downGid = Game.MapUtil.GetDownGID(curGID);
        var leftGid = Game.MapUtil.GetLeftGID(curGID);
        var rightGid = Game.MapUtil.GetRightGID(curGID);

        var appleGIDVec = this.appleMgr.GetAllAppleGID();

        for (var i = 0; i < appleGIDVec.length; i++) {
            var appleGID = appleGIDVec[i];
            if (appleGID) {
                if (upGid === appleGID) {
                    return true;
                } else if (downGid === appleGID) {
                    return true;
                } else if (leftGid === appleGID) {
                    return true;
                } else if (rightGid === appleGID) {
                    return true;
                }
            }
        }
        return false;
    },

    //判断蛇头是否与地刺同边相邻
    isAdjacentToDici() {
        cc.assert(this.diciMgr, "this.diciMgr is null.");

        var curGID = this.snakes.getHeadCurGID();
        var upGid = Game.MapUtil.GetUpGID(curGID);
        var downGid = Game.MapUtil.GetDownGID(curGID);
        var leftGid = Game.MapUtil.GetLeftGID(curGID);
        var rightGid = Game.MapUtil.GetRightGID(curGID);

        var allDiCiGID = this.diciMgr.GetAllDiCiGID();

        for (var i = 0; i < allDiCiGID.length; i++) {
            var diciGID = allDiCiGID[i];
            if (diciGID) {
                if (upGid === diciGID) {
                    return true;
                } else if (downGid === diciGID) {
                    return true;
                } else if (leftGid === diciGID) {
                    return true;
                } else if (rightGid === diciGID) {
                    return true;
                }
            }
        }
        return false;
    },

    isEatingApple(moveDirection) {
        if (moveDirection == MoveDirection.MD_Up) {
            if (this.snakes.isVertical()) {
                return -1;
            }
        }

        if (!this.appleMgr) {
            return -1;
        }

        var curGID = this.snakes.getHeadCurGID();
        var nextGid = Game.MapUtil.GetNextGID(moveDirection, curGID);

        var appleGIDVec = this.appleMgr.GetAllAppleGID();

        for (var i = 0; i < appleGIDVec.length; i++) {
            var appleGID = appleGIDVec[i];
            if (appleGID == nextGid) {
                return appleGID;
            }
        }
        return -1;
    },

    //吃苹果
    eatApple(direction, appleGID) {
        this.isMoving = true;

        if (this.appleMgr) {
            this.appleMgr.RemoveAppleByGID(appleGID);
        }

        if (this.snakes) {
            this.snakes.eatApple(direction, appleGID);
        }

        Game.GlobalVar.isEatedApple = true;
        Game.AudioManager.playEatAppleSound();
    },

    //判断是否被刺死了
    isDeatch(direction) {
        if (Game.GlobalVar.isDroping)
            return false;

        var diciGID = Game.MapUtil.GetDiCiGID();
        var snakesGID = this.snakes.getAllGID();
        for (var i = 0; i < diciGID.length; i++) {
            var gidobj = diciGID[i];
            for (var j = 0; j < snakesGID.length; j++) {
                var snakeGID = snakesGID[j];

                if (gidobj.gid == snakeGID) {
                    return true;
                }
            }
        }

        return false;
    },

    //是否碰到了地刺
    isTouchDiCi(direction) {
        var diciGID = Game.MapUtil.GetDiCiGID();
        var curGID = this.snakes.getHeadCurGID();
        var nextGID = Game.MapUtil.GetNextGID(direction);
        for (var i = 0; i < diciGID.length; i++) {
            var gidobj = diciGID[i];
            if (gidobj.gid == nextGID) {
                return true;
            }
        }

        return false;
    },

    //判断下一个操作是否胜利
    isWin(direction) {

        if (direction == MoveDirection.MD_Up) {
            if (this.snakes.isVertical()) {
                return false;
            }
        }

        var doorGID = Game.MapUtil.GetDoorGID();

        var curGID = this.snakes.getHeadCurGID();
        var nextGid = Game.MapUtil.GetNextGID(direction, curGID);
        if (nextGid == doorGID) {
            return true;
        }
        return false;
    },

    //刷新UI
    refreshUI() {
        if (this.isStart == false)
            return;

        this.curTime++;

        if (this.bctimeText) {
            Util.SetNodeText(this.bctimeText, this.curTime);
        }

    },

    //刷新最短时间
    refreshMinTimeUI(time) {
        var minTimeImg = this.node.getChildByName("ZDTimeImg");
        var minTimeText = this.node.getChildByName("ZDTimeText");

        if (minTimeImg) {
            minTimeImg.active = (time <= 0);
        }

        if (minTimeText) {
            minTimeText.active = (time > 0);
            if (minTimeText.active) {
                minTimeText.getComponent(cc.Label).string = time;
            }
        }
    },

    //过关
    outLevel(direction) {
        Game.GlobalVar.isWin = true;
        this.closeDoorNode.active = false;
        this.snakes.isWin = true;
        this.snakes.outLevel(direction);
        this.outLevelMask(direction);
        this.snakes.changeParent(this.outLevelMaskNode);
        this.moveLogic.isWin = true;
        this.moveLogic.winDirection = direction;

        this.moveLogic.moveLogic(direction);
    },

    //生成过关遮罩
    outLevelMask(direction) {
        var maskNode = new cc.Node("OutLevelMask");
        if (maskNode) {
            this.snakes.addChild(maskNode);
            var maskCom = maskNode.addComponent(cc.Mask);
            if (maskCom) {
                maskCom.inverted = true;
            }
            maskNode.zIndex = 1000;
            var size = 60;
            var gid = Game.MapUtil.GetDoorGID();
            var pos = Game.MapUtil.ConvertGIDToPos(gid);
            switch (direction) {
                case MoveDirection.MD_Left:
                    maskNode.setAnchorPoint(cc.p(1, 0.5));
                    maskNode.width = cc.winSize.width;
                    maskNode.height = size;
                    break;
                case MoveDirection.MD_Right:
                    maskNode.setAnchorPoint(cc.p(0, 0.5));
                    maskNode.width = cc.winSize.width;
                    maskNode.height = size;
                    break;
                case MoveDirection.MD_Up:
                    maskNode.setAnchorPoint(cc.p(0.5, 0));
                    maskNode.width = size;
                    maskNode.height = cc.winSize.height;
                    break;
                case MoveDirection.MD_Down:
                    maskNode.setAnchorPoint(cc.p(0.5, 1));
                    maskNode.width = size;
                    maskNode.height = cc.winSize.height;
                    break;
            }

            maskNode.position = pos;
            this.outLevelMaskNode = maskNode;
        }
    },

    //选择关卡按钮点击
    selectLevelClicked() {
        if (this.isStart == false)
            return;

        Game.AudioManager.playButtonSound();

        Game.SceneMgr.switchScene(Game.SceneType.SelectScene);
    },

    //重玩按钮点击
    replayBtnClicked() {
        if (this.isStart == false)
            return;

        Game.AudioManager.playButtonSound();

        this.closeReplayEffect();

        if (LevelData.GetResetCount(Game.GlobalVar.curLevel) == 5) {

            var self = this;

            if (this.popUpPrefab) {
                var popUpNode = cc.instantiate(this.popUpPrefab);
                popUpNode.getComponent("PopUpLayer").addContext(2);
                popUpNode.getComponent("PopUpLayer").show(function () {
                    if (WXHelper.IsWXContext()) {
                        //创建视频广告
                        AdvertiseMgr.CreateVideoAd(AdvertiseConfig.ADConfig_Relive_Video, function (isFinish) {
                            if (isFinish) {
                                LevelData.ClearResetCount(Game.GlobalVar.curLevel);
                                //记录重置次数
                                LevelData.AddResetCount(Game.GlobalVar.curLevel);
                                self.resetGame();
                            }
                        });
                    } else {
                        LevelData.ClearResetCount(Game.GlobalVar.curLevel);
                        //记录重置次数
                        LevelData.AddResetCount(Game.GlobalVar.curLevel);
                        self.resetGame();
                    }
                });

                this.node.addChild(popUpNode, 1000);
            }
            return;
        }

        //记录重置次数
        LevelData.AddResetCount(Game.GlobalVar.curLevel);

        this.resetGame();
    },

    //提示重玩动画
    replayEffect() {
        // this.replayBtn.runAction(new cc.repeatForever(new cc.blink(0.3, 1)));
    },

    //取消提示重玩
    closeReplayEffect() {
        if (this.replayBtn) {
            this.replayBtn.stopAllActions();
            this.replayBtn.opacity = 255;
        }
    },

    //每帧调用
    update(dt) {

        if (this.isOver) {
            return;
        }

        //刷新即将超越视图
        if (this.jjcyView) {
            this.jjcyView.update(dt);
        }

        if (this.stoneMgr) {
            this.stoneMgr.FrameOnMove(dt);
        }

        if (this.snakes) {
            this.snakes.frameOnMove(dt);
        }

        Game.EventCenter.FrameOnMove(dt);
    },

    //游戏结束
    gameOver(isWin) {

        Game.GlobalVar.isGameOver = true;
        Game.GlobalVar.isStoneDroping = false;
        Game.GlobalVar.isEatedApple = false;
        Game.GlobalVar.isWin = isWin;
        Game.GlobalVar.isDroping = false;

        this.unscheduleAllCallbacks();
        WXHelper.ClearSharedCanvas();

        if (isWin) {
            this.win();
        } else {
            this.failed();
        }

        this.snakes.gameOver();
        this.isOver = true;

        // Game.MapUtil.Reset();
    },

    //胜利
    win() {
        Game.AudioManager.playWinSound();

        var isNewRecrod = false;

        if (LevelData.IsPlayedCurLevel()) {
            var beforeTime = LevelData.GetCurPassTime();
            if (this.curTime < beforeTime) {
                //刷新过关记录
                LevelData.UpdateCurPassTime(this.curTime);
                isNewRecrod = true;
            }
        } else {
            //刷新过关记录
            LevelData.UpdateCurPassTime(this.curTime);
            isNewRecrod = true;
        }


        // this.snakes.destroy();

        var gameOverLayer = this.winLayerNode.getComponent("GameOverLayer");
        gameOverLayer.show(isNewRecrod);

        //解锁下一关卡
        LevelData.UpdateNextLockstateData(true);

        //上传用户托管数据
        WXHelper.UploadUserCloudStorage(LevelData.GenerateUserCloudData());

        //发送通关时间给服务器
        this.sendPassLevelTime();
    },

    //失败
    failed() {
        Game.AudioManager.playFailSound();


        var gameOverLayer = this.failLayerNode.getComponent("GameOverLayer");
        gameOverLayer.show(false, true);
    },

    onDestroy() {
        cc.log("Game-->>>onDestroy");

        //移除游戏事件监听
        this.clearEventListen();

        this.releaseRes();
    }
});
