cc.Class({
    extends: cc.Component,

    properties: {
        //_levelMask: null,
        _sceneLoading: false,
        level: 0,
    },

    onLoad: function () {
        this.node.on('touchstart',this.onTouchStart,this)
        if(window.levelRecord == undefined){
            window.levelRecord = {};
        }
        if(this.node.name == 'level-9-btn' && Object.keys(window.levelRecord).length >= 9){
            //this.node.active = true;
            this.node.scaleX = 1;
        }
        if(window.levelRecord['level-' + this.level] == true){
            this.node.color = cc.Color.BLACK;
        }
        // if(Object.keys(window.levelRecord).length >= 10){
        //     //彩蛋？
        // }

        
    },

    onTouchStart: function(){
        //cc.find('Canvas').emit('level-loading');
        //this.loadingMask.active = true;
        console.log('loading' + this.level);
        if(!this._sceneLoading){
            this._sceneLoading = true;
            
            // this.scheduleOnce(function(){
                 cc.director.loadScene('level-' +this.level+ '-scene');
            // }.bind(this),0);
            
        }
    }

});
