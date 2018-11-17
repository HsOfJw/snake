"use strict";
cc._RF.push(module, '64a3d6dckBL9ox/iuD56Fsw', 'GameRes');
// scripts/GameRes.js

"use strict";

var GameRes = {
    StartSceneRes: ["EffectOff", "EffectOn", "VibrationOff", "VibrationOn", "VibrationOn", "cishu", "music/bgmusic", "music/btnclick", "prefab/RankListScene", "prefab/SelectScene", "prefab/StartScene"],

    GameSceneRes: ["gamescene/body", "gamescene/body_a", "gamescene/head1", "gamescene/head2", "gamescene/head3", "gamescene/head4", "gamescene/head5", "gamescene/head_a", "gamescene/head_a", "gamescene/chonghzi", "music/beici", "music/daojishi", "music/directionclicked", "music/eatApple", "music/fail", "music/getMoney", "music/pushStone", "music/win"],

    GameMapRes: []
};

for (var i = 1; i <= 30; i++) {
    var res = 'map/level_' + i;
    GameRes.GameSceneRes.push(res);
}

module.exports = GameRes;

cc._RF.pop();