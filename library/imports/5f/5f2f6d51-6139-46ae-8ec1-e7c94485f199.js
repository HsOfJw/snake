"use strict";
cc._RF.push(module, '5f2f61RYTlGro7B58lEhfGZ', 'ConstDefine');
// scripts/ConstDefine.js

"use strict";

//用户的操作方向
var MoveDirection = {
    MD_Left: 1, //左
    MD_Right: 2, //右
    MD_Up: 3, //上
    MD_Down: 4 //下
};

//蛇的指向
var SnakeDirection = {
    SD_Left: 1,
    SD_Right: 2,
    SD_Up: 3,
    SD_Down: 4,
    SD_Left_Up: 5,
    SD_Left_Down: 6,
    SD_Right_Up: 7,
    SD_Right_Down: 8
};

module.exports = {
    MoveDirection: MoveDirection,
    SnakeDirection: SnakeDirection
};

cc._RF.pop();