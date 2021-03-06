cc.Class({
    extends: cc.Component,

    properties: {
        _destroying: false,
    },

    onLoad: function () {
        let manager = cc.director.getCollisionManager();
        manager.enabled = true;
        this.node.runAction(cc.repeatForever(cc.rotateBy(1,180).easing(cc.easeSineInOut(3))));
        cc.find('Canvas').emit('star-init');
    },

    onCollisionEnter: function(other,self){
        if(other.node.group == 'player-render'){
            if(!this._destroying){
                this._destroying = true;
                cc.find('Canvas').emit('touch-star');
                this.node.destroy();
            }
        }
    }

});
