cc.Class({
    extends: cc.Component,

    properties: {

        _leftBlock: 0,
        _rightBlock: 0,
        _upBlock: 0,
        _downBlock: 0,
        _moveAble: true,
    },

    onLoad: function () {
        let manager = cc.director.getCollisionManager();
        manager.enabled = true;
        this.node.on('touchmove',this.onTouchMove,this)
    },

    onTouchMove: function(e){
        if(!this._moveAble){return;}
        let diff = e.getDelta();
        if(this._leftBlock && diff.x < 0){diff.x = 0}
        if(this._rightBlock && diff.x > 0){diff.x = 0}
        if(this._upBlock && diff.y > 0){diff.y = 0}
        if(this._downBlock && diff.y < 0){diff.y = 0}
        this.node.position = cc.pAdd(this.node.position,diff);
    },

    onCollisionEnter: function(other,self){
        if(other.node.group == 'player-render' || other.node.group == 'player' || other.node.parent == this.node){return;}
        let selfAabb = self.world.aabb;
        let otherAabb = other.world.aabb;
        let selfPreAabb = self.world.preAabb;
        let otherPreAabb = other.world.preAabb;

        let localBlockArray = [];

        if(selfPreAabb.xMin >= otherPreAabb.xMax && selfAabb.xMin <= otherAabb.xMax){
            //left block
            this._leftBlock++;
            localBlockArray.push('_leftBlock');
            this.node.x += Math.abs(selfAabb.xMin - otherAabb.xMax);
        }
        if(selfPreAabb.xMax <= otherPreAabb.xMin && selfAabb.xMax >= otherAabb.xMin){
            //right block
            this._rightBlock++;
            localBlockArray.push('_rightBlock');
            this.node.x -= Math.abs(selfAabb.xMax - otherAabb.xMin);
        }
        if(selfPreAabb.yMax <= otherPreAabb.yMin && selfAabb.yMax >= otherAabb.yMin){
            //up block
            this._upBlock++;
            localBlockArray.push('_upBlock');
            this.node.y -= Math.abs(selfAabb.yMax - otherAabb.yMin);
        }
        if(selfPreAabb.yMin >= otherPreAabb.yMax && selfAabb.yMin <= otherAabb.yMax){
            //down block
            this._downBlock++;
            localBlockArray.push('_downBlock');
            this.node.x += Math.abs(selfAabb.yMin - otherAabb.yMax);
        }
        if(other.blockArray == undefined){
            other.blockArray = [];
        }
        other.blockArray[self.node.uuid] = localBlockArray;
        
    },

    onCollisionExit: function(other,self){
        if(other.blockArray != undefined && other.blockArray[self.node.uuid] != undefined){
            for(let item of other.blockArray[self.node.uuid]){
                this[item]--;
            }
            delete other.blockArray[self.node.uuid];
        }
    }

});
