let ColorEnum = cc.Enum({
    'white':0,
    'black':1
});
cc.Class({
    extends: cc.Component,

    editor: {
        requireComponent: cc.Graphics,
    },

    properties: {
        _leftBlock: 0,
        _rightBlock: 0,
        _upBlock: 0,
        _downBlock: 0,
        _speed: null,
        g: 0,
        _fsm: null,
        _sUp:true,
        _currentColor:ColorEnum.white,
        currentColor:{
            type: ColorEnum,
            get: function(){
                return this._currentColor;
            },
            set: function(value){
                this._currentColor = value;
                if(value == ColorEnum.white){
                    this.node.getChildByName('player-render').getComponent(cc.Graphics).fillColor = cc.Color.WHITE;
                    this.node.getChildByName('player-render').getComponent(cc.Graphics).strokeColor = cc.Color.BLACK;
                }else{
                    this.node.getChildByName('player-render').getComponent(cc.Graphics).fillColor = cc.Color.BLACK;
                    this.node.getChildByName('player-render').getComponent(cc.Graphics).strokeColor = cc.Color.WHITE;
                }
            }
        },
        _touchColorNum: 0,
    },

    onLoad: function () {
        this._speed = cc.v2(0,0);
        let manager = cc.director.getCollisionManager();
        manager.enabled = true;
        this._fsm = require('player-fsm').create();
        this._fsm.startup();
        this.node.on('touchstart',this.onTouchStart,this);
        this.node.on('touchend',this.onTouchEnd,this);
        this.node.on('touchmove',this.onTouchMove,this);
        this.node.on('touchcancel',this.onTouchEnd,this);

        cc.systemEvent.on('keydown',this.onKeyDown,this);
        cc.systemEvent.on('keyup',this.onKeyUp,this);
        //this.node.on('position-changed',this.onPositionChanged,this)
    },

    // onPositionChanged: function(){
    //     console.log('p-changed');

    // },

    onTouchStart: function(e){
        if(this._fsm.can('ready')){
            this._fsm.ready();
            if(this.node.parent.group == 'box'){
                this.node.parent.getComponent('box-script')._moveAble = false;
            }
            let ctx = this.getComponent(cc.Graphics);
            ctx.clear();
            let offset = cc.v2(this.node.width * this.node.anchorX,this.node.height * this.node.anchorY);
            ctx.moveTo(offset.x,offset.y);
            let targetDir = cc.pNeg(this.node.convertToNodeSpaceAR(e.getLocation()));
            ctx.lineTo(targetDir.x + offset.x,targetDir.y + offset.y);
            ctx.stroke();
        }
    },

    onTouchMove: function(e){
        
        //draw the throw helper line
        if(this._fsm.current == 'readying'){
            let ctx = this.getComponent(cc.Graphics);
            ctx.clear();
            let offset = cc.v2(this.node.width * this.node.anchorX,this.node.height * this.node.anchorY);
            ctx.moveTo(offset.x,offset.y);
            let targetDir = cc.pNeg(this.node.convertToNodeSpaceAR(e.getLocation()));
            ctx.lineTo(targetDir.x + offset.x,targetDir.y + offset.y);
            ctx.stroke();
        }
    },
    

    onTouchEnd: function(e){
        if(this._fsm.can('fly')){
            this._fsm.fly();
            if(this.node.parent.group == 'box'){
                this.node.parent.getComponent('box-script')._moveAble = true;
            }
            window.throwTime++;
            this._speed = cc.pNeg(this.node.convertToNodeSpaceAR(e.getLocation()));
            let ctx = this.getComponent(cc.Graphics);
            ctx.clear();
        }
    },

    onKeyDown: function(e){
        if(e.keyCode == cc.KEY.d){
            if(this._fsm.current == 'readying'){
                this._fsm.idle();
                if(this.node.parent.group == 'box'){
                    this.node.parent.getComponent('box-script')._moveAble = true;
                }
                let ctx = this.getComponent(cc.Graphics);
                ctx.clear();
            }
        }
        if(e.keyCode == cc.KEY.s){
            if(this._touchColorNum == 0 && this._sUp){
                this._sUp = false;
                if(this.currentColor == ColorEnum.white){
                    this.currentColor = ColorEnum.black;
                }else{
                    this.currentColor = ColorEnum.white;
                }
            }
        }
    },

    onKeyUp: function(e){
        if(e.keyCode == cc.KEY.s){
            this._sUp = true;
        }
    },
    

    onCollisionEnter: function(other,self){
        if(other.node.group == 'box'){
                let targetPosition = other.node.convertToNodeSpaceAR(this.node.parent.convertToWorldSpaceAR(this.node.position));
                this.node.parent = other.node;
                this.node.position = targetPosition;
                return;
        }
        if(other.node.group == 'black' || other.node.group == 'white'){
            this._touchColorNum++;
        }
        if(other.node.group == 'black' && this._currentColor == ColorEnum.white || other.node.group == 'white' && this._currentColor == ColorEnum.black ){
            return;
        }
        if(other.node.group == 'star'){
            return;
        }
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
            if(this._fsm.can('idle')){
                this._fsm.idle();
            }
        }
        if(other.blockArray == undefined){
            other.blockArray = [];
        }
        other.blockArray[self.node.uuid] = localBlockArray;
        
    },

    onCollisionExit: function(other,self){
        if(other.node.group == 'box' && other.node.uuid == this.node.parent.uuid){
                let canvas = cc.find('Canvas');
                let targetPosition = canvas.convertToNodeSpaceAR(this.node.parent.convertToWorldSpaceAR(this.node.position));
                this.node.parent = canvas;
                this.node.position = targetPosition;
                return;
        }
        if(other.node.group == 'black' || other.node.group == 'white'){
            this._touchColorNum--;
        }
        if(other.node.group == 'black' && this._currentColor == ColorEnum.white || other.node.group == 'white' && this._currentColor == ColorEnum.black){
            return;
        }
        if(other.node.group == 'star'){
            return;
        }
        if(other.blockArray != undefined && other.blockArray[self.node.uuid] != undefined){
            for(let item of other.blockArray[self.node.uuid]){
                this[item]--;
            }
            delete other.blockArray[self.node.uuid];
        }
    },

    update: function(dt){
        if(!this._downBlock){this._speed.y = this._speed.y + this.g * dt;}
        if(!!this._upBlock && this._speed.y > 0){
            this._speed.y = -Math.abs(this._speed.y);
        }
        if(!!this._leftBlock && this._speed.x < 0){
            this._speed.x = Math.abs(this._speed.x);
        }
        if(!!this._rightBlock && this._speed.x > 0){
            this._speed.x = -Math.abs(this._speed.x);
        }
        if(!!this._downBlock && this._speed.y < 0){
            this._speed.y = 0;
            this._speed.x = 0;
            if(this._fsm.can('idle')){
                this._fsm.idle();
            }
        }
        this.node.position = cc.pAdd(this.node.position,cc.pMult(this._speed,dt));
        
    }

});
