cc.Class({
    extends: cc.Component,

    doCtor(){
        cc.log(this.name, "------------->>>doCtor");
    },

    doEnter(){
        cc.log(this.name, "------------->>>doEnter");

        this.node.active = true;
    },

    doExit(){
        cc.log(this.name, "------------->>>doExit");

        this.node.x = 0;
        this.node.y = 0;

        this.node.active = false;

        this.node.stopAllActions();
    },

    frameOnMove(dt){
    },
});
