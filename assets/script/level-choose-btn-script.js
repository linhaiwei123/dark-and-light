cc.Class({
    extends: cc.Component,

    properties: {
        _levelMask: null,
        _sceneLoading: false,
        level: 0,
    },

    onLoad: function () {
        if(window.levelRecord == undefined){
            window.levelRecord = {};
        }
        if(Object.keys(window.levelRecord).length >= 9 && this.node.name == 'level-9-btn'){
            //this.node.active = true;
            this.node.scaleX = 1;
        }
        // if(Object.keys(window.levelRecord).length >= 10){
        //     //彩蛋？
        // }

        this.node.on('touchstart',this.onTouchStart,this)
    },

    onTouchStart: function(){
        if(!this._sceneLoading){
            this._sceneLoading = true;
            cc.director.loadScene('level-' +this.level+ '-scene');
        }
    }

});
