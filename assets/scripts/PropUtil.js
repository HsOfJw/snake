var GlobalVar = require("GlobalVar");

var RedPacketList = {
    1: "0.2",
    2: "0.3"
};


var PropList = {
    1: "99",
    2: "10",
    3: "5",
    4: "2",
    5: "随机红包",
    6: "0.2",
    7: "0.1",
    8: "继续努力"
};

var propProbability = {
    1: 10,
    2: 15,
    3: 20,
    4: 20,
    5: 35,
    6: 3900,
    7: 6000,
    8: 90000,
}

var PropRotate = {
    1: 135,
    2: 90, 
    3: 180,
    4: 225,
    5: 45, 
    6: 0,
    7: 270,
    8: 315,
};

//1:钱, 2:红包 3: 啥也没
var PropType = {
    1: 1,
    2: 1, 
    3: 1,
    4: 1,
    5: 2, 
    6: 1,
    7: 1,
    8: 3,
};

var GetPropID = function(){
    return 7;

    if(Game.GlobalVar.curLevel == 1){
        return 7;
    }

    var propID = 0;

    //定义中奖率分母 百分之
    var probabilityCount = 100000;  
    //最小概率值
    var min = "min";  
    //最大概率值
    var max = "max";  
    var tempInt = 0;  
    //待中奖商品数组
    var prizesMap = {};
    for(var prize in propProbability){
        var oddsMap = {};
        oddsMap[min] = tempInt;
        tempInt += propProbability[prize];
        oddsMap[max] = tempInt;

        prizesMap[prize] = oddsMap;
    }

    //随机一个数字
    var index = parseInt(Math.random() * probabilityCount);  

    for(var prize in propProbability){  
        var oddsMap = prizesMap[prize];
        var minNum = oddsMap[min];
        var maxNum = oddsMap[max];
        //校验index 再哪个商品概率中间
        if(minNum <= index && maxNum > index){
            propID = parseInt(prize);
            break;
        }
    }

    return propID;
};

module.exports = {
    GetPropID: GetPropID,
    PropRotate: PropRotate,
    PropList: PropList,
    PropType: PropType,
    RedPacketList: RedPacketList,
};

