cc.Class({
    extends: cc.Component,

    properties: {
        _sceneLoading: false,
    },

    onLoad: function () {
        if(window.levelRecord == undefined){
            window.levelRecord = {};
        }
        if(Object.keys(window.levelRecord).length >= 10){
            //彩蛋
            this.node.scaleX = 1;
        }

        this.node.on('touchstart',this.onTouchStart,this)
    },

    onTouchStart: function(){
        if(!this._sceneLoading){
            this._sceneLoading = true;
            cc.director.loadScene('c-scene');
        }
    }

});
