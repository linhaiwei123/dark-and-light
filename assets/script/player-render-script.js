
cc.Class({
        extends: cc.Component,

        editor: {
            requireComponent: cc.Graphics,
            executeInEditMode: true,
        },

        properties: {
            _leftOriginPoint: cc.v2(0,0),
            leftOriginPoint: {
                get: function(){ return this._leftOriginPoint},
                set: function(value){ this._leftOriginPoint = value;
                    if(cc.EDITOR){
                        this.updateRender();
                    }
                }
            },
            _rightOriginPoint: cc.v2(0,0),
            rightOriginPoint: {
                get: function(){ return this._rightOriginPoint},
                set: function(value){ this._rightOriginPoint = value;
                    if(cc.EDITOR){
                        this.updateRender();
                    }
                }
            },
            _upOriginPoint: cc.v2(0,0),
            upOriginPoint: {
                get: function(){ return this._upOriginPoint},
                set: function(value){ this._upOriginPoint = value;
                    if(cc.EDITOR){
                        this.updateRender();
                    }
                }
            },
            _downOriginPoint: cc.v2(0,0),
            downOriginPoint: {
                get: function(){ return this._downOriginPoint},
                set: function(value){ this._downOriginPoint = value;
                    if(cc.EDITOR){
                        this.updateRender();
                    }
                }
            },
            _ctrlRate: 0.5,
            ctrlRate: {
                get: function(){
                    return this._ctrlRate;
                },
                set: function(value){
                    this._ctrlRate = value;
                   if(cc.EDITOR){
                        this.updateRender();
                    }
                }
            },

            // toggleUpdateRender:{
            //     get: function(){return false},
            //     set: function(){this.updateRender()}
            // },

            _collisionArray: [],
            _backUpOriginPointArray: [],
            _release: false,
        },

        updateRender: function(){
            let ctx = this.getComponent(cc.Graphics);
            ctx.clear();
            // let upPoint = this._upOriginPoint;
            // let rightPoint = this._rightOriginPoint;
            // let rightUpCtrlPoint = cc.v2(this._rightOriginPoint.x,this._upOriginPoint.y);
            // let downPoint = this._downOriginPoint;
            // let rightDownCtrlPoint = cc.v2(this._rightOriginPoint.x,this._downOriginPoint.y);
            // let leftPoint = this._leftOriginPoint;
            // let leftDownPoint = cc.v2(this._leftOriginPoint.x,this._downOriginPoint.y);
            // let leftUpPoint = cc.v2(this._leftOriginPoint.x,this._upOriginPoint.y);

            let offset = cc.v2(this.node.width * this.node.anchorX,this.node.height * this.node.anchorY);
            //Editor.log(offset.x,offset.y);
            
            //up
            ctx.moveTo(this._upOriginPoint.x + offset.x,this._upOriginPoint.y + offset.y);
            //up right 
            ctx.bezierCurveTo(this._rightOriginPoint.x*this._ctrlRate + offset.x,this._upOriginPoint.y + offset.y,this._rightOriginPoint.x + offset.x,this._upOriginPoint.y*this._ctrlRate + offset.y,this._rightOriginPoint.x + offset.x,this._rightOriginPoint.y + offset.y);
            //right down
            ctx.bezierCurveTo(this._rightOriginPoint.x + offset.x,this._downOriginPoint.y*this._ctrlRate + offset.y,this._rightOriginPoint.x*this._ctrlRate + offset.x,this._downOriginPoint.y + offset.y,this._downOriginPoint.x + offset.x,this._downOriginPoint.y + offset.y);
            //down left
            ctx.bezierCurveTo(this._leftOriginPoint.x*this._ctrlRate + offset.x,this._downOriginPoint.y + offset.y,this._leftOriginPoint.x + offset.x,this._downOriginPoint.y*this._ctrlRate + offset.y,this._leftOriginPoint.x + offset.x,this._leftOriginPoint.y + offset.y);
            //left up
            ctx.bezierCurveTo(this._leftOriginPoint.x + offset.x,this._upOriginPoint.y*this._ctrlRate + offset.y,this._leftOriginPoint.x*this._ctrlRate + offset.x,this._upOriginPoint.y + offset.y,this._upOriginPoint.x + offset.x,this._upOriginPoint.y + offset.y);
            ctx.fill();
            ctx.stroke();
        },

        onLoad: function () {
            if(cc.EDITOR){
                this.updateRender();
            }else{
                let manager = cc.director.getCollisionManager();
                manager.enabled = true;
                this.updateRender();
                //this.node.runAction(cc.moveBy(1,30,0));
                //this.node.on('touchmove',this.onTouchMove,this)
                this.node.parent.on('position-changed',this.onPositionChanged,this);
                this._backUpOriginPointArray['_leftOriginPoint'] = this._leftOriginPoint.clone();
                this._backUpOriginPointArray['_rightOriginPoint'] = this._rightOriginPoint.clone();
                this._backUpOriginPointArray['_upOriginPoint'] = this._upOriginPoint.clone();
                this._backUpOriginPointArray['_downOriginPoint'] = this._downOriginPoint.clone(); 
            }
        },

        // onTouchMove: function(e){
        //       this.node.parent.position = this.node.parent.parent.convertToNodeSpaceAR(e.getLocation());
        // },
        onPositionChanged: function(){
            //console.log('p-changed-child');
            if(Object.keys(this._collisionArray).length == 0 && !this._release){
                this._release = true;
                for(let idx in this._backUpOriginPointArray){
                    this[idx] = this._backUpOriginPointArray[idx];
                }
                this.updateRender();
                return;
            }else{
                this._release = false;
            }
            for(let idx in this._collisionArray){
                let other = this._collisionArray[idx];
                this.updateData(other,this.getComponent(cc.BoxCollider));
            }
            
        },

        updateData: function(other,self){
            let selfAabb = self.world.aabb;
            let otherAabb = other.world.aabb;
            //let selfPreAabb = self.world.preAabb;
            //let otherPreAabb = other.world.preAabb;
            let selfPreAabb = self.node.enterAabb[other.node.uuid];
            let otherPreAabb = other.world.enterAabb;

            let updateNum = 0;

            if(selfPreAabb.xMin >= otherPreAabb.xMax && selfAabb.xMin <= otherAabb.xMax){
                //left block
                //this.node.x += Math.abs(selfAabb.xMin - otherAabb.xMax);
                this._leftOriginPoint = cc.v2(-this.node.width/2 + Math.abs(selfAabb.xMin - otherAabb.xMax),0)
                updateNum++;
            }
            if(selfPreAabb.xMax <= otherPreAabb.xMin && selfAabb.xMax >= otherAabb.xMin){
                //right block

                //this.node.x -= Math.abs(selfAabb.xMax - otherAabb.xMin);
                this._rightOriginPoint = cc.v2(this.node.width/2 - Math.abs(selfAabb.xMax - otherAabb.xMin),0)
                updateNum++;
            }
            if(selfPreAabb.yMax <= otherPreAabb.yMin && selfAabb.yMax >= otherAabb.yMin){
                //up block

                //this.node.y -= Math.abs(selfAabb.yMax - otherAabb.yMin);
                this._upOriginPoint = cc.v2(0,this.node.height/2 - Math.abs(selfAabb.yMax - otherAabb.yMin))
                updateNum++;
            }
            if(selfPreAabb.yMin >= otherPreAabb.yMax && selfAabb.yMin <= otherAabb.yMax){
                //down block
                //this.node.x += Math.abs(selfAabb.yMin - otherAabb.yMax);
                this._downOriginPoint = cc.v2(0,-this.node.height/2 + Math.abs(selfAabb.yMin - otherAabb.yMax));
                updateNum++;
            }
            if(updateNum!=0){
                this.updateRender();
            }
        },

        onCollisionEnter: function(other,self){
            if(other.node.group == 'black' && this.node.parent.getComponent('player-script')._currentColor == 0 || other.node.group == 'white' && this.node.parent.getComponent('player-script')._currentColor == 1 ){
                return;
            }
            if(other.node.group == 'star'){
                return;
            }
            if(other.node.group == 'red'){
                cc.find('Canvas').emit('restart');
            }
            other.world.enterAabb = other.world.preAabb.clone();
            if(self.node.enterAabb == undefined){self.node.enterAabb = []}
            self.node.enterAabb[other.node.uuid] = self.world.preAabb.clone();
            //this.updateDate(other,self);
            this._collisionArray[other.node.uuid] = other;
        },

        onCollisionExit: function(other,self){
            if(other.node.group == 'black' && this.node.parent.getComponent('player-script')._currentColor == 0 || other.node.group == 'white' && this.node.parent.getComponent('player-script')._currentColor == 1 ){
                return;
            }
            if(other.node.group == 'star'){
                return;
            }
            delete other.world.enterAabb;
            delete self.node.enterAabb[other.node.uuid];
            delete this._collisionArray[other.node.uuid];
        }


});
