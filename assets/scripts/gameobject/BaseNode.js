
cc.Class({
    extends: cc.Node,

    myDropDirtyFlag: null,
    myChangedDirtyFlag : null,
    myDeleteDirtyFlag : null,

    ctor(){
        this.setName("BaseNode");

        this.myDropDirtyFlag = false;
        this.myChangedDirtyFlag = false;
        this.myDeleteDirtyFlag = false;
    },

    setMyDropDirtyFlag(dirtyFlag){
        this.myDropDirtyFlag = dirtyFlag;
    },

    setMyChangedDirtyFlag(dirtyFlag){
        this.myChangedDirtyFlag = dirtyFlag;
    },

    setMyDeleteDirtyFlag(dirtyFlag){
        this.myDeleteDirtyFlag = dirtyFlag;
    },

    doEnter(){

    },

    doExit(){

    },
});
