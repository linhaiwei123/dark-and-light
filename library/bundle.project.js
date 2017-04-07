require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"box-script":[function(require,module,exports){
"use strict";
cc._RFpush(module, '17cb9bZm+pF/7dDlZh73Mzj', 'box-script');
// script\box-script.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {

        _leftBlock: 0,
        _rightBlock: 0,
        _upBlock: 0,
        _downBlock: 0,
        _moveAble: true
    },

    onLoad: function onLoad() {
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        this.node.on('touchmove', this.onTouchMove, this);
    },

    onTouchMove: function onTouchMove(e) {
        if (!this._moveAble) {
            return;
        }
        var diff = e.getDelta();
        if (this._leftBlock && diff.x < 0) {
            diff.x = 0;
        }
        if (this._rightBlock && diff.x > 0) {
            diff.x = 0;
        }
        if (this._upBlock && diff.y > 0) {
            diff.y = 0;
        }
        if (this._downBlock && diff.y < 0) {
            diff.y = 0;
        }
        this.node.position = cc.pAdd(this.node.position, diff);
    },

    onCollisionEnter: function onCollisionEnter(other, self) {
        if (other.node.group == 'player-render' || other.node.group == 'player' || other.node.parent == this.node) {
            return;
        }
        var selfAabb = self.world.aabb;
        var otherAabb = other.world.aabb;
        var selfPreAabb = self.world.preAabb;
        var otherPreAabb = other.world.preAabb;

        var localBlockArray = [];

        if (selfPreAabb.xMin >= otherPreAabb.xMax && selfAabb.xMin <= otherAabb.xMax) {
            //left block
            this._leftBlock++;
            localBlockArray.push('_leftBlock');
            this.node.x += Math.abs(selfAabb.xMin - otherAabb.xMax);
        }
        if (selfPreAabb.xMax <= otherPreAabb.xMin && selfAabb.xMax >= otherAabb.xMin) {
            //right block
            this._rightBlock++;
            localBlockArray.push('_rightBlock');
            this.node.x -= Math.abs(selfAabb.xMax - otherAabb.xMin);
        }
        if (selfPreAabb.yMax <= otherPreAabb.yMin && selfAabb.yMax >= otherAabb.yMin) {
            //up block
            this._upBlock++;
            localBlockArray.push('_upBlock');
            this.node.y -= Math.abs(selfAabb.yMax - otherAabb.yMin);
        }
        if (selfPreAabb.yMin >= otherPreAabb.yMax && selfAabb.yMin <= otherAabb.yMax) {
            //down block
            this._downBlock++;
            localBlockArray.push('_downBlock');
            this.node.x += Math.abs(selfAabb.yMin - otherAabb.yMax);
        }
        if (other.blockArray == undefined) {
            other.blockArray = [];
        }
        other.blockArray[self.node.uuid] = localBlockArray;
    },

    onCollisionExit: function onCollisionExit(other, self) {
        if (other.blockArray != undefined && other.blockArray[self.node.uuid] != undefined) {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = other.blockArray[self.node.uuid][Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var item = _step.value;

                    this[item]--;
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            delete other.blockArray[self.node.uuid];
        }
    }

});

cc._RFpop();
},{}],"clear-color-module":[function(require,module,exports){
"use strict";
cc._RFpush(module, '58144PmIFVBrLLxtLGeW4dO', 'clear-color-module');
// global\clear-color-module.js

'use strict';

module.exports = {
    clearColor: cc.hexToColor('#CA6DE0')
};

cc._RFpop();
},{}],"clear-color-script":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'e0391SSN/9Ak6rz5ZEU6mbe', 'clear-color-script');
// script\clear-color-script.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {},

    onLoad: function onLoad() {
        cc.director.setClearColor(require('clear-color-module').clearColor);
    }

});

cc._RFpop();
},{"clear-color-module":"clear-color-module"}],"player-fsm":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'ca0aalfjBlI46JPu0auK0Fx', 'player-fsm');
// lib\player-fsm.js

'use strict';

var StateMachine = require('state-machine');
var fsmData = {
  initial: 'nope',
  //please select the enter-state here ↓
  events: [{ "name": "startup", "from": "nope", "to": "flying" }, { "name": "ready", "from": "idling", "to": "readying" }, { "name": "fly", "from": "readying", "to": "flying" }, { "name": "idle", "from": "flying", "to": "idling" }, { "name": "idle", "from": "readying", "to": "idling" }]
};
var create = function create() {
  var fsm = StateMachine.create(fsmData);
  fsm.ASYNC = StateMachine.ASYNC;
  return fsm;
};
module.exports = { create: create };

cc._RFpop();
},{"state-machine":"state-machine"}],"player-render-script":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'a238aA50L9DfqJHirTQtv7N', 'player-render-script');
// script\player-render-script.js

'use strict';

cc.Class({
    extends: cc.Component,

    editor: {
        requireComponent: cc.Graphics
    },

    properties: {
        _leftOriginPoint: cc.v2(0, 0),
        leftOriginPoint: {
            get: function get() {
                return this._leftOriginPoint;
            },
            set: function set(value) {
                this._leftOriginPoint = value;
                //this.updateRender();
            }
        },
        _rightOriginPoint: cc.v2(0, 0),
        rightOriginPoint: {
            get: function get() {
                return this._rightOriginPoint;
            },
            set: function set(value) {
                this._rightOriginPoint = value;
                //this.updateRender();
            }
        },
        _upOriginPoint: cc.v2(0, 0),
        upOriginPoint: {
            get: function get() {
                return this._upOriginPoint;
            },
            set: function set(value) {
                this._upOriginPoint = value;
                //this.updateRender();
            }
        },
        _downOriginPoint: cc.v2(0, 0),
        downOriginPoint: {
            get: function get() {
                return this._downOriginPoint;
            },
            set: function set(value) {
                this._downOriginPoint = value;
                //this.updateRender();
            }
        },
        _ctrlRate: 0.5,
        ctrlRate: {
            get: function get() {
                return this._ctrlRate;
            },
            set: function set(value) {
                this._ctrlRate = value;
                //this.updateRender();
            }
        },

        toggleUpdateRender: {
            get: function get() {
                return false;
            },
            set: function set() {
                this.updateRender();
            }
        },

        _collisionArray: [],
        _backUpOriginPointArray: [],
        _release: false
    },

    updateRender: function updateRender() {
        var ctx = this.getComponent(cc.Graphics);
        ctx.clear();
        // let upPoint = this._upOriginPoint;
        // let rightPoint = this._rightOriginPoint;
        // let rightUpCtrlPoint = cc.v2(this._rightOriginPoint.x,this._upOriginPoint.y);
        // let downPoint = this._downOriginPoint;
        // let rightDownCtrlPoint = cc.v2(this._rightOriginPoint.x,this._downOriginPoint.y);
        // let leftPoint = this._leftOriginPoint;
        // let leftDownPoint = cc.v2(this._leftOriginPoint.x,this._downOriginPoint.y);
        // let leftUpPoint = cc.v2(this._leftOriginPoint.x,this._upOriginPoint.y);

        var offset = cc.v2(this.node.width * this.node.anchorX, this.node.height * this.node.anchorY);
        //Editor.log(offset.x,offset.y);

        //up
        ctx.moveTo(this._upOriginPoint.x + offset.x, this._upOriginPoint.y + offset.y);
        //up right 
        ctx.bezierCurveTo(this._rightOriginPoint.x * this._ctrlRate + offset.x, this._upOriginPoint.y + offset.y, this._rightOriginPoint.x + offset.x, this._upOriginPoint.y * this._ctrlRate + offset.y, this._rightOriginPoint.x + offset.x, this._rightOriginPoint.y + offset.y);
        //right down
        ctx.bezierCurveTo(this._rightOriginPoint.x + offset.x, this._downOriginPoint.y * this._ctrlRate + offset.y, this._rightOriginPoint.x * this._ctrlRate + offset.x, this._downOriginPoint.y + offset.y, this._downOriginPoint.x + offset.x, this._downOriginPoint.y + offset.y);
        //down left
        ctx.bezierCurveTo(this._leftOriginPoint.x * this._ctrlRate + offset.x, this._downOriginPoint.y + offset.y, this._leftOriginPoint.x + offset.x, this._downOriginPoint.y * this._ctrlRate + offset.y, this._leftOriginPoint.x + offset.x, this._leftOriginPoint.y + offset.y);
        //left up
        ctx.bezierCurveTo(this._leftOriginPoint.x + offset.x, this._upOriginPoint.y * this._ctrlRate + offset.y, this._leftOriginPoint.x * this._ctrlRate + offset.x, this._upOriginPoint.y + offset.y, this._upOriginPoint.x + offset.x, this._upOriginPoint.y + offset.y);
        ctx.fill();
        ctx.stroke();
    },

    onLoad: function onLoad() {
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        this.updateRender();
        //this.node.runAction(cc.moveBy(1,30,0));
        //this.node.on('touchmove',this.onTouchMove,this)
        this.node.parent.on('position-changed', this.onPositionChanged, this);
        this._backUpOriginPointArray['_leftOriginPoint'] = this._leftOriginPoint.clone();
        this._backUpOriginPointArray['_rightOriginPoint'] = this._rightOriginPoint.clone();
        this._backUpOriginPointArray['_upOriginPoint'] = this._upOriginPoint.clone();
        this._backUpOriginPointArray['_downOriginPoint'] = this._downOriginPoint.clone();
    },

    // onTouchMove: function(e){
    //       this.node.parent.position = this.node.parent.parent.convertToNodeSpaceAR(e.getLocation());
    // },
    onPositionChanged: function onPositionChanged() {
        //console.log('p-changed-child');
        if (Object.keys(this._collisionArray).length == 0 && !this._release) {
            this._release = true;
            for (var idx in this._backUpOriginPointArray) {
                this[idx] = this._backUpOriginPointArray[idx];
            }
            this.updateRender();
            return;
        } else {
            this._release = false;
        }
        for (var _idx in this._collisionArray) {
            var other = this._collisionArray[_idx];
            this.updateData(other, this.getComponent(cc.BoxCollider));
        }
    },

    updateData: function updateData(other, self) {
        var selfAabb = self.world.aabb;
        var otherAabb = other.world.aabb;
        //let selfPreAabb = self.world.preAabb;
        //let otherPreAabb = other.world.preAabb;
        var selfPreAabb = self.node.enterAabb[other.node.uuid];
        var otherPreAabb = other.world.enterAabb;

        var updateNum = 0;

        if (selfPreAabb.xMin >= otherPreAabb.xMax && selfAabb.xMin <= otherAabb.xMax) {
            //left block
            //this.node.x += Math.abs(selfAabb.xMin - otherAabb.xMax);
            this._leftOriginPoint = cc.v2(-this.node.width / 2 + Math.abs(selfAabb.xMin - otherAabb.xMax), 0);
            updateNum++;
        }
        if (selfPreAabb.xMax <= otherPreAabb.xMin && selfAabb.xMax >= otherAabb.xMin) {
            //right block

            //this.node.x -= Math.abs(selfAabb.xMax - otherAabb.xMin);
            this._rightOriginPoint = cc.v2(this.node.width / 2 - Math.abs(selfAabb.xMax - otherAabb.xMin), 0);
            updateNum++;
        }
        if (selfPreAabb.yMax <= otherPreAabb.yMin && selfAabb.yMax >= otherAabb.yMin) {
            //up block

            //this.node.y -= Math.abs(selfAabb.yMax - otherAabb.yMin);
            this._upOriginPoint = cc.v2(0, this.node.height / 2 - Math.abs(selfAabb.yMax - otherAabb.yMin));
            updateNum++;
        }
        if (selfPreAabb.yMin >= otherPreAabb.yMax && selfAabb.yMin <= otherAabb.yMax) {
            //down block
            //this.node.x += Math.abs(selfAabb.yMin - otherAabb.yMax);
            this._downOriginPoint = cc.v2(0, -this.node.height / 2 + Math.abs(selfAabb.yMin - otherAabb.yMax));
            updateNum++;
        }
        if (updateNum != 0) {
            this.updateRender();
        }
    },

    onCollisionEnter: function onCollisionEnter(other, self) {
        if (other.node.group == 'black' && this.node.parent.getComponent('player-script')._currentColor == 0 || other.node.group == 'white' && this.node.parent.getComponent('player-script')._currentColor == 1) {
            return;
        }
        if (other.node.group == 'star') {
            return;
        }
        if (other.node.group == 'red') {
            cc.find('Canvas').emit('restart');
        }
        other.world.enterAabb = other.world.preAabb.clone();
        if (self.node.enterAabb == undefined) {
            self.node.enterAabb = [];
        }
        self.node.enterAabb[other.node.uuid] = self.world.preAabb.clone();
        //this.updateDate(other,self);
        this._collisionArray[other.node.uuid] = other;
    },

    onCollisionExit: function onCollisionExit(other, self) {
        if (other.node.group == 'black' && this.node.parent.getComponent('player-script')._currentColor == 0 || other.node.group == 'white' && this.node.parent.getComponent('player-script')._currentColor == 1) {
            return;
        }
        if (other.node.group == 'star') {
            return;
        }
        delete other.world.enterAabb;
        delete self.node.enterAabb[other.node.uuid];
        delete this._collisionArray[other.node.uuid];
    }

});

cc._RFpop();
},{}],"player-script":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'b0bdeFKGbJHSbMTBrIm8t21', 'player-script');
// script\player-script.js

'use strict';

var ColorEnum = cc.Enum({
    'white': 0,
    'black': 1
});
cc.Class({
    extends: cc.Component,

    editor: {
        requireComponent: cc.Graphics
    },

    properties: {
        _leftBlock: 0,
        _rightBlock: 0,
        _upBlock: 0,
        _downBlock: 0,
        _speed: null,
        g: 0,
        _fsm: null,
        _sUp: true,
        _currentColor: ColorEnum.white,
        currentColor: {
            type: ColorEnum,
            get: function get() {
                return this._currentColor;
            },
            set: function set(value) {
                this._currentColor = value;
                if (value == ColorEnum.white) {
                    this.node.getChildByName('player-render').getComponent(cc.Graphics).fillColor = cc.Color.WHITE;
                    this.node.getChildByName('player-render').getComponent(cc.Graphics).strokeColor = cc.Color.BLACK;
                } else {
                    this.node.getChildByName('player-render').getComponent(cc.Graphics).fillColor = cc.Color.BLACK;
                    this.node.getChildByName('player-render').getComponent(cc.Graphics).strokeColor = cc.Color.WHITE;
                }
            }
        },
        _touchColorNum: 0
    },

    onLoad: function onLoad() {
        this._speed = cc.v2(0, 0);
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        this._fsm = require('player-fsm').create();
        this._fsm.startup();
        this.node.on('touchstart', this.onTouchStart, this);
        this.node.on('touchend', this.onTouchEnd, this);
        this.node.on('touchmove', this.onTouchMove, this);
        this.node.on('touchcancel', this.onTouchEnd, this);

        cc.systemEvent.on('keydown', this.onKeyDown, this);
        cc.systemEvent.on('keyup', this.onKeyUp, this);
        //this.node.on('position-changed',this.onPositionChanged,this)
    },

    // onPositionChanged: function(){
    //     console.log('p-changed');

    // },

    onTouchStart: function onTouchStart(e) {
        if (this._fsm.can('ready')) {
            this._fsm.ready();
            if (this.node.parent.group == 'box') {
                this.node.parent.getComponent('box-script')._moveAble = false;
            }
            var ctx = this.getComponent(cc.Graphics);
            ctx.clear();
            var offset = cc.v2(this.node.width * this.node.anchorX, this.node.height * this.node.anchorY);
            ctx.moveTo(offset.x, offset.y);
            var targetDir = cc.pNeg(this.node.convertToNodeSpaceAR(e.getLocation()));
            ctx.lineTo(targetDir.x + offset.x, targetDir.y + offset.y);
            ctx.stroke();
        }
    },

    onTouchMove: function onTouchMove(e) {

        //draw the throw helper line
        if (this._fsm.current == 'readying') {
            var ctx = this.getComponent(cc.Graphics);
            ctx.clear();
            var offset = cc.v2(this.node.width * this.node.anchorX, this.node.height * this.node.anchorY);
            ctx.moveTo(offset.x, offset.y);
            var targetDir = cc.pNeg(this.node.convertToNodeSpaceAR(e.getLocation()));
            ctx.lineTo(targetDir.x + offset.x, targetDir.y + offset.y);
            ctx.stroke();
        }
    },

    onTouchEnd: function onTouchEnd(e) {
        if (this._fsm.can('fly')) {
            this._fsm.fly();
            if (this.node.parent.group == 'box') {
                this.node.parent.getComponent('box-script')._moveAble = true;
            }
            window.throwTime++;
            this._speed = cc.pNeg(this.node.convertToNodeSpaceAR(e.getLocation()));
            var ctx = this.getComponent(cc.Graphics);
            ctx.clear();
        }
    },

    onKeyDown: function onKeyDown(e) {
        if (e.keyCode == cc.KEY.d) {
            if (this._fsm.current == 'readying') {
                this._fsm.idle();
                if (this.node.parent.group == 'box') {
                    this.node.parent.getComponent('box-script')._moveAble = true;
                }
                var ctx = this.getComponent(cc.Graphics);
                ctx.clear();
            }
        }
        if (e.keyCode == cc.KEY.s) {
            if (this._touchColorNum == 0 && this._sUp) {
                this._sUp = false;
                if (this.currentColor == ColorEnum.white) {
                    this.currentColor = ColorEnum.black;
                } else {
                    this.currentColor = ColorEnum.white;
                }
            }
        }
    },

    onKeyUp: function onKeyUp(e) {
        if (e.keyCode == cc.KEY.s) {
            this._sUp = true;
        }
    },

    onCollisionEnter: function onCollisionEnter(other, self) {
        if (other.node.group == 'box') {
            var targetPosition = other.node.convertToNodeSpaceAR(this.node.parent.convertToWorldSpaceAR(this.node.position));
            this.node.parent = other.node;
            this.node.position = targetPosition;
            return;
        }
        if (other.node.group == 'black' || other.node.group == 'white') {
            this._touchColorNum++;
        }
        if (other.node.group == 'black' && this._currentColor == ColorEnum.white || other.node.group == 'white' && this._currentColor == ColorEnum.black) {
            return;
        }
        if (other.node.group == 'star') {
            return;
        }
        var selfAabb = self.world.aabb;
        var otherAabb = other.world.aabb;
        var selfPreAabb = self.world.preAabb;
        var otherPreAabb = other.world.preAabb;

        var localBlockArray = [];

        if (selfPreAabb.xMin >= otherPreAabb.xMax && selfAabb.xMin <= otherAabb.xMax) {
            //left block
            this._leftBlock++;
            localBlockArray.push('_leftBlock');
            this.node.x += Math.abs(selfAabb.xMin - otherAabb.xMax);
        }
        if (selfPreAabb.xMax <= otherPreAabb.xMin && selfAabb.xMax >= otherAabb.xMin) {
            //right block
            this._rightBlock++;
            localBlockArray.push('_rightBlock');
            this.node.x -= Math.abs(selfAabb.xMax - otherAabb.xMin);
        }
        if (selfPreAabb.yMax <= otherPreAabb.yMin && selfAabb.yMax >= otherAabb.yMin) {
            //up block
            this._upBlock++;
            localBlockArray.push('_upBlock');
            this.node.y -= Math.abs(selfAabb.yMax - otherAabb.yMin);
        }
        if (selfPreAabb.yMin >= otherPreAabb.yMax && selfAabb.yMin <= otherAabb.yMax) {
            //down block
            this._downBlock++;
            localBlockArray.push('_downBlock');
            this.node.x += Math.abs(selfAabb.yMin - otherAabb.yMax);
            if (this._fsm.can('idle')) {
                this._fsm.idle();
            }
        }
        if (other.blockArray == undefined) {
            other.blockArray = [];
        }
        other.blockArray[self.node.uuid] = localBlockArray;
    },

    onCollisionExit: function onCollisionExit(other, self) {
        if (other.node.group == 'box' && other.node.uuid == this.node.parent.uuid) {
            var canvas = cc.find('Canvas');
            var targetPosition = canvas.convertToNodeSpaceAR(this.node.parent.convertToWorldSpaceAR(this.node.position));
            this.node.parent = canvas;
            this.node.position = targetPosition;
            return;
        }
        if (other.node.group == 'black' || other.node.group == 'white') {
            this._touchColorNum--;
        }
        if (other.node.group == 'black' && this._currentColor == ColorEnum.white || other.node.group == 'white' && this._currentColor == ColorEnum.black) {
            return;
        }
        if (other.node.group == 'star') {
            return;
        }
        if (other.blockArray != undefined) {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = other.blockArray[self.node.uuid][Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var item = _step.value;

                    this[item]--;
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        }
    },

    update: function update(dt) {
        if (!this._downBlock) {
            this._speed.y = this._speed.y + this.g * dt;
        }
        if (!!this._upBlock && this._speed.y > 0) {
            this._speed.y = -Math.abs(this._speed.y);
        }
        if (!!this._leftBlock && this._speed.x < 0) {
            this._speed.x = Math.abs(this._speed.x);
        }
        if (!!this._rightBlock && this._speed.x > 0) {
            this._speed.x = -Math.abs(this._speed.x);
        }
        if (!!this._downBlock && this._speed.y < 0) {
            this._speed.y = 0;
            this._speed.x = 0;
            if (this._fsm.can('idle')) {
                this._fsm.idle();
            }
        }
        this.node.position = cc.pAdd(this.node.position, cc.pMult(this._speed, dt));
    }

});

cc._RFpop();
},{"player-fsm":"player-fsm"}],"readme":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'b07ccpj0I9BXYrUAroIR+8h', 'readme');
// docs\readme.js

'use strict';

var docs = {
    '注意': 'Canvas会有两个组件，一个是clear-color-script,用于设置背景颜色,一个是scene-mgr，用于管理关卡，level参数是当前关卡',
    '红块': '碰到重新开这一关',
    '白块': '只和白色状态的玩家碰撞',
    '黑块': '只和黑色状态的玩家碰撞',
    '灰块': '永远和玩家碰撞',
    '橙块': '不和玩家碰撞，但是拖拽橙块会修改玩家运动轨迹',
    '星星': '吃完所有星星会过关',
    '提示': '所有积木在prefab可以找到',
    '换色': '按s键换色',
    '取消投掷': '按d键取消投掷'
};
//BGM怎么了

cc._RFpop();
},{}],"scene-mgr":[function(require,module,exports){
"use strict";
cc._RFpush(module, '50d32pVe0pNDIRhqf6Ll7K1', 'scene-mgr');
// script\scene-mgr.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        level: 0,
        _starNum: 0,
        _sceneLoading: false
    },

    // use this for initialization
    onLoad: function onLoad() {
        if (window.throwTime == undefined) {
            window.throwTime = 0;
        }
        this.node.on('star-init', this.onStarInit, this);
        this.node.on('restart', this.onRestart, this);
        this.node.on('touch-star', this.onTouchStar, this);
    },

    onStarInit: function onStarInit() {
        this._starNum++;
    },

    onTouchStar: function onTouchStar() {
        this._starNum--;
        if (this._starNum <= 0 && !this._sceneLoading) {
            this._sceneLoading = true;
            cc.director.loadScene('level-' + (this.level + 1) + '-scene');
        }
    },

    onRestart: function onRestart() {
        if (!this._sceneLoading) {
            this._sceneLoading = true;
            cc.director.loadScene('level-' + this.level + '-scene');
        }
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});

cc._RFpop();
},{}],"star-script":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'e126cmXH8VPzr1T+N7OwgxJ', 'star-script');
// script\star-script.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        _destroying: false
    },

    onLoad: function onLoad() {
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        this.node.runAction(cc.repeatForever(cc.rotateBy(1, 180).easing(cc.easeSineInOut(3))));
        cc.find('Canvas').emit('star-init');
    },

    onCollisionEnter: function onCollisionEnter(other, self) {
        if (other.node.group == 'player-render') {
            if (!this._destroying) {
                this._destroying = true;
                cc.find('Canvas').emit('touch-star');
                this.node.destroy();
            }
        }
    }

});

cc._RFpop();
},{}],"state-machine":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'ae7d51TFElPTJFvq6fkal1+', 'state-machine');
// lib\state-machine.js

'use strict';

/*

  Javascript State Machine Library - https://github.com/jakesgordon/javascript-state-machine

  Copyright (c) 2012, 2013, 2014, 2015, Jake Gordon and contributors
  Released under the MIT license - https://github.com/jakesgordon/javascript-state-machine/blob/master/LICENSE

*/

(function () {

  var StateMachine = {

    //---------------------------------------------------------------------------

    VERSION: "2.4.0",

    //---------------------------------------------------------------------------

    Result: {
      SUCCEEDED: 1, // the event transitioned successfully from one state to another
      NOTRANSITION: 2, // the event was successfull but no state transition was necessary
      CANCELLED: 3, // the event was cancelled by the caller in a beforeEvent callback
      PENDING: 4 // the event is asynchronous and the caller is in control of when the transition occurs
    },

    Error: {
      INVALID_TRANSITION: 100, // caller tried to fire an event that was innapropriate in the current state
      PENDING_TRANSITION: 200, // caller tried to fire an event while an async transition was still pending
      INVALID_CALLBACK: 300 // caller provided callback function threw an exception
    },

    WILDCARD: '*',
    ASYNC: 'async',

    //---------------------------------------------------------------------------

    create: function create(cfg, target) {

      var initial = typeof cfg.initial == 'string' ? { state: cfg.initial } : cfg.initial; // allow for a simple string, or an object with { state: 'foo', event: 'setup', defer: true|false }
      var terminal = cfg.terminal || cfg['final'];
      var fsm = target || cfg.target || {};
      var events = cfg.events || [];
      var callbacks = cfg.callbacks || {};
      var map = {}; // track state transitions allowed for an event { event: { from: [ to ] } }
      var transitions = {}; // track events allowed from a state            { state: [ event ] }

      var add = function add(e) {
        var from = Array.isArray(e.from) ? e.from : e.from ? [e.from] : [StateMachine.WILDCARD]; // allow 'wildcard' transition if 'from' is not specified
        map[e.name] = map[e.name] || {};
        for (var n = 0; n < from.length; n++) {
          transitions[from[n]] = transitions[from[n]] || [];
          transitions[from[n]].push(e.name);

          map[e.name][from[n]] = e.to || from[n]; // allow no-op transition if 'to' is not specified
        }
        if (e.to) transitions[e.to] = transitions[e.to] || [];
      };

      if (initial) {
        initial.event = initial.event || 'startup';
        add({ name: initial.event, from: 'none', to: initial.state });
      }

      for (var n = 0; n < events.length; n++) {
        add(events[n]);
      }for (var name in map) {
        if (map.hasOwnProperty(name)) fsm[name] = StateMachine.buildEvent(name, map[name]);
      }

      for (var name in callbacks) {
        if (callbacks.hasOwnProperty(name)) fsm[name] = callbacks[name];
      }

      fsm.current = 'none';
      fsm.is = function (state) {
        return Array.isArray(state) ? state.indexOf(this.current) >= 0 : this.current === state;
      };
      fsm.can = function (event) {
        return !this.transition && map[event] !== undefined && (map[event].hasOwnProperty(this.current) || map[event].hasOwnProperty(StateMachine.WILDCARD));
      };
      fsm.cannot = function (event) {
        return !this.can(event);
      };
      fsm.transitions = function () {
        return (transitions[this.current] || []).concat(transitions[StateMachine.WILDCARD] || []);
      };
      fsm.isFinished = function () {
        return this.is(terminal);
      };
      fsm.error = cfg.error || function (name, from, to, args, error, msg, e) {
        throw e || msg;
      }; // default behavior when something unexpected happens is to throw an exception, but caller can override this behavior if desired (see github issue #3 and #17)
      fsm.states = function () {
        return Object.keys(transitions).sort();
      };

      if (initial && !initial.defer) fsm[initial.event]();

      return fsm;
    },

    //===========================================================================

    doCallback: function doCallback(fsm, func, name, from, to, args) {
      if (func) {
        try {
          return func.apply(fsm, [name, from, to].concat(args));
        } catch (e) {
          return fsm.error(name, from, to, args, StateMachine.Error.INVALID_CALLBACK, "an exception occurred in a caller-provided callback function", e);
        }
      }
    },

    beforeAnyEvent: function beforeAnyEvent(fsm, name, from, to, args) {
      return StateMachine.doCallback(fsm, fsm['onbeforeevent'], name, from, to, args);
    },
    afterAnyEvent: function afterAnyEvent(fsm, name, from, to, args) {
      return StateMachine.doCallback(fsm, fsm['onafterevent'] || fsm['onevent'], name, from, to, args);
    },
    leaveAnyState: function leaveAnyState(fsm, name, from, to, args) {
      return StateMachine.doCallback(fsm, fsm['onleavestate'], name, from, to, args);
    },
    enterAnyState: function enterAnyState(fsm, name, from, to, args) {
      return StateMachine.doCallback(fsm, fsm['onenterstate'] || fsm['onstate'], name, from, to, args);
    },
    changeState: function changeState(fsm, name, from, to, args) {
      return StateMachine.doCallback(fsm, fsm['onchangestate'], name, from, to, args);
    },

    beforeThisEvent: function beforeThisEvent(fsm, name, from, to, args) {
      return StateMachine.doCallback(fsm, fsm['onbefore' + name], name, from, to, args);
    },
    afterThisEvent: function afterThisEvent(fsm, name, from, to, args) {
      return StateMachine.doCallback(fsm, fsm['onafter' + name] || fsm['on' + name], name, from, to, args);
    },
    leaveThisState: function leaveThisState(fsm, name, from, to, args) {
      return StateMachine.doCallback(fsm, fsm['onleave' + from], name, from, to, args);
    },
    enterThisState: function enterThisState(fsm, name, from, to, args) {
      return StateMachine.doCallback(fsm, fsm['onenter' + to] || fsm['on' + to], name, from, to, args);
    },

    beforeEvent: function beforeEvent(fsm, name, from, to, args) {
      if (false === StateMachine.beforeThisEvent(fsm, name, from, to, args) || false === StateMachine.beforeAnyEvent(fsm, name, from, to, args)) return false;
    },

    afterEvent: function afterEvent(fsm, name, from, to, args) {
      StateMachine.afterThisEvent(fsm, name, from, to, args);
      StateMachine.afterAnyEvent(fsm, name, from, to, args);
    },

    leaveState: function leaveState(fsm, name, from, to, args) {
      var specific = StateMachine.leaveThisState(fsm, name, from, to, args),
          general = StateMachine.leaveAnyState(fsm, name, from, to, args);
      if (false === specific || false === general) return false;else if (StateMachine.ASYNC === specific || StateMachine.ASYNC === general) return StateMachine.ASYNC;
    },

    enterState: function enterState(fsm, name, from, to, args) {
      StateMachine.enterThisState(fsm, name, from, to, args);
      StateMachine.enterAnyState(fsm, name, from, to, args);
    },

    //===========================================================================

    buildEvent: function buildEvent(name, map) {
      return function () {

        var from = this.current;
        var to = map[from] || (map[StateMachine.WILDCARD] != StateMachine.WILDCARD ? map[StateMachine.WILDCARD] : from) || from;
        var args = Array.prototype.slice.call(arguments); // turn arguments into pure array

        if (this.transition) return this.error(name, from, to, args, StateMachine.Error.PENDING_TRANSITION, "event " + name + " inappropriate because previous transition did not complete");

        if (this.cannot(name)) return this.error(name, from, to, args, StateMachine.Error.INVALID_TRANSITION, "event " + name + " inappropriate in current state " + this.current);

        if (false === StateMachine.beforeEvent(this, name, from, to, args)) return StateMachine.Result.CANCELLED;

        if (from === to) {
          StateMachine.afterEvent(this, name, from, to, args);
          return StateMachine.Result.NOTRANSITION;
        }

        // prepare a transition method for use EITHER lower down, or by caller if they want an async transition (indicated by an ASYNC return value from leaveState)
        var fsm = this;
        this.transition = function () {
          fsm.transition = null; // this method should only ever be called once
          fsm.current = to;
          StateMachine.enterState(fsm, name, from, to, args);
          StateMachine.changeState(fsm, name, from, to, args);
          StateMachine.afterEvent(fsm, name, from, to, args);
          return StateMachine.Result.SUCCEEDED;
        };
        this.transition.cancel = function () {
          // provide a way for caller to cancel async transition if desired (issue #22)
          fsm.transition = null;
          StateMachine.afterEvent(fsm, name, from, to, args);
        };

        var leave = StateMachine.leaveState(this, name, from, to, args);
        if (false === leave) {
          this.transition = null;
          return StateMachine.Result.CANCELLED;
        } else if (StateMachine.ASYNC === leave) {
          return StateMachine.Result.PENDING;
        } else {
          if (this.transition) // need to check in case user manually called transition() but forgot to return StateMachine.ASYNC
            return this.transition();
        }
      };
    }

  }; // StateMachine

  //===========================================================================

  //======
  // NODE
  //======
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = StateMachine;
    }
    exports.StateMachine = StateMachine;
  }
  //============
  // AMD/REQUIRE
  //============
  else if (typeof define === 'function' && define.amd) {
      define(function (require) {
        return StateMachine;
      });
    }
    //========
    // BROWSER
    //========
    else if (typeof window !== 'undefined') {
        window.StateMachine = StateMachine;
      }
      //===========
      // WEB WORKER
      //===========
      else if (typeof self !== 'undefined') {
          self.StateMachine = StateMachine;
        }
})();

cc._RFpop();
},{}]},{},["readme","clear-color-module","player-fsm","state-machine","box-script","clear-color-script","player-render-script","player-script","scene-mgr","star-script"])

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvYm94LXNjcmlwdC5qcyIsImFzc2V0cy9nbG9iYWwvY2xlYXItY29sb3ItbW9kdWxlLmpzIiwiYXNzZXRzL3NjcmlwdC9jbGVhci1jb2xvci1zY3JpcHQuanMiLCJhc3NldHMvbGliL3BsYXllci1mc20uanMiLCJhc3NldHMvc2NyaXB0L3BsYXllci1yZW5kZXItc2NyaXB0LmpzIiwiYXNzZXRzL3NjcmlwdC9wbGF5ZXItc2NyaXB0LmpzIiwiYXNzZXRzL2RvY3MvcmVhZG1lLmpzIiwiYXNzZXRzL3NjcmlwdC9zY2VuZS1tZ3IuanMiLCJhc3NldHMvc2NyaXB0L3N0YXItc2NyaXB0LmpzIiwiYXNzZXRzL2xpYi9zdGF0ZS1tYWNoaW5lLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTtBQUNJOztBQUVBOztBQUVJO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFOUTs7QUFTWjtBQUNJO0FBQ0E7QUFDQTtBQUNIOztBQUVEO0FBQ0k7QUFBb0I7QUFBUTtBQUM1QjtBQUNBO0FBQWtDO0FBQVc7QUFDN0M7QUFBbUM7QUFBVztBQUM5QztBQUFnQztBQUFXO0FBQzNDO0FBQWtDO0FBQVc7QUFDN0M7QUFDSDs7QUFFRDtBQUNJO0FBQTBHO0FBQVE7QUFDbEg7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDSTtBQUNBO0FBQ0E7QUFDQTtBQUNIO0FBQ0Q7QUFDSTtBQUNBO0FBQ0E7QUFDQTtBQUNIO0FBQ0Q7QUFDSTtBQUNBO0FBQ0E7QUFDQTtBQUNIO0FBQ0Q7QUFDSTtBQUNBO0FBQ0E7QUFDQTtBQUNIO0FBQ0Q7QUFDSTtBQUNIO0FBQ0Q7QUFFSDs7QUFFRDtBQUNJO0FBQWtGO0FBQUE7QUFBQTs7QUFBQTtBQUM5RTtBQUFpRDs7QUFDN0M7QUFDSDtBQUg2RTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUk5RTtBQUNIO0FBQ0o7O0FBM0VJOzs7Ozs7Ozs7O0FDQVQ7QUFDSTtBQURhOzs7Ozs7Ozs7O0FDQWpCO0FBQ0k7O0FBRUE7O0FBS0E7QUFDSTtBQUNIOztBQVZJOzs7Ozs7Ozs7O0FDQVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUhjO0FBV2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQztBQUNEOzs7Ozs7Ozs7O0FDakJBO0FBQ0k7O0FBRUE7QUFDSTtBQURJOztBQUlSO0FBQ0s7QUFDRDtBQUNJO0FBQWlCO0FBQTZCO0FBQzlDO0FBQXNCO0FBQ2xCO0FBQ0g7QUFKWTtBQU1oQjtBQUNEO0FBQ0k7QUFBaUI7QUFBOEI7QUFDL0M7QUFBc0I7QUFDbEI7QUFDSDtBQUphO0FBTWpCO0FBQ0Q7QUFDSTtBQUFpQjtBQUEyQjtBQUM1QztBQUFzQjtBQUNsQjtBQUNIO0FBSlU7QUFNZDtBQUNEO0FBQ0k7QUFBaUI7QUFBNkI7QUFDOUM7QUFBc0I7QUFDbEI7QUFDSDtBQUpZO0FBTWpCO0FBQ0E7QUFDSTtBQUNJO0FBQ0g7QUFDRDtBQUNJO0FBQ0E7QUFDSDtBQVBLOztBQVVWO0FBQ0k7QUFBZ0I7QUFBYTtBQUM3QjtBQUFnQjtBQUFvQjtBQUZyQjs7QUFLbkI7QUFDQTtBQUNBO0FBL0NROztBQWtEWjtBQUNJO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSUg7O0FBRUQ7QUFDSTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNIOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0k7QUFDQTtBQUNJO0FBQ0E7QUFDSTtBQUNIO0FBQ0Q7QUFDQTtBQUNIO0FBQ0c7QUFDSDtBQUNEO0FBQ0k7QUFDQTtBQUNIO0FBRUo7O0FBRUQ7QUFDSTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDSTtBQUNBO0FBQ0E7QUFDQTtBQUNIO0FBQ0Q7QUFDSTs7QUFFQTtBQUNBO0FBQ0E7QUFDSDtBQUNEO0FBQ0k7O0FBRUE7QUFDQTtBQUNBO0FBQ0g7QUFDRDtBQUNJO0FBQ0E7QUFDQTtBQUNBO0FBQ0g7QUFDRDtBQUNJO0FBQ0g7QUFDSjs7QUFFRDtBQUNJO0FBQ0k7QUFDSDtBQUNEO0FBQ0k7QUFDSDtBQUNEO0FBQ0k7QUFDSDtBQUNEO0FBQ0E7QUFBcUM7QUFBeUI7QUFDOUQ7QUFDQTtBQUNBO0FBQ0g7O0FBRUQ7QUFDSTtBQUNJO0FBQ0g7QUFDRDtBQUNJO0FBQ0g7QUFDRDtBQUNBO0FBQ0E7QUFDSDs7QUFoTUk7Ozs7Ozs7Ozs7QUNBVDtBQUNJO0FBQ0E7QUFGb0I7QUFJeEI7QUFDSTs7QUFFQTtBQUNJO0FBREk7O0FBSVI7QUFDSTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNJO0FBQ0E7QUFDSTtBQUNIO0FBQ0Q7QUFDSTtBQUNBO0FBQ0k7QUFDQTtBQUNIO0FBQ0c7QUFDQTtBQUNIO0FBQ0o7QUFkUTtBQWdCYjtBQTFCUTs7QUE2Qlo7QUFDSTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0g7O0FBRUQ7QUFDQTs7QUFFQTs7QUFFQTtBQUNJO0FBQ0k7QUFDQTtBQUNJO0FBQ0g7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNIO0FBQ0o7O0FBRUQ7O0FBRUk7QUFDQTtBQUNJO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0g7QUFDSjs7QUFHRDtBQUNJO0FBQ0k7QUFDQTtBQUNJO0FBQ0g7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNIO0FBQ0o7O0FBRUQ7QUFDSTtBQUNJO0FBQ0k7QUFDQTtBQUNJO0FBQ0g7QUFDRDtBQUNBO0FBQ0g7QUFDSjtBQUNEO0FBQ0k7QUFDSTtBQUNBO0FBQ0k7QUFDSDtBQUNHO0FBQ0g7QUFDSjtBQUNKO0FBQ0o7O0FBRUQ7QUFDSTtBQUNJO0FBQ0g7QUFDSjs7QUFHRDtBQUNJO0FBQ1E7QUFDQTtBQUNBO0FBQ0E7QUFDUDtBQUNEO0FBQ0k7QUFDSDtBQUNEO0FBQ0k7QUFDSDtBQUNEO0FBQ0k7QUFDSDtBQUNEO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0k7QUFDQTtBQUNBO0FBQ0E7QUFDSDtBQUNEO0FBQ0k7QUFDQTtBQUNBO0FBQ0E7QUFDSDtBQUNEO0FBQ0k7QUFDQTtBQUNBO0FBQ0E7QUFDSDtBQUNEO0FBQ0k7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNJO0FBQ0g7QUFDSjtBQUNEO0FBQ0k7QUFDSDtBQUNEO0FBRUg7O0FBRUQ7QUFDSTtBQUNRO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDUDtBQUNEO0FBQ0k7QUFDSDtBQUNEO0FBQ0k7QUFDSDtBQUNEO0FBQ0k7QUFDSDtBQUNEO0FBQWlDO0FBQUE7QUFBQTs7QUFBQTtBQUM3QjtBQUFpRDs7QUFDN0M7QUFDSDtBQUg0QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBSWhDO0FBQ0o7O0FBRUQ7QUFDSTtBQUFxQjtBQUE2QztBQUNsRTtBQUNJO0FBQ0g7QUFDRDtBQUNJO0FBQ0g7QUFDRDtBQUNJO0FBQ0g7QUFDRDtBQUNJO0FBQ0E7QUFDQTtBQUNJO0FBQ0g7QUFDSjtBQUNEO0FBRUg7O0FBeE9JOzs7Ozs7Ozs7O0FDSlQ7QUFDSTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVZPO0FBWVg7Ozs7Ozs7Ozs7QUNaQTtBQUNJOztBQUVBO0FBQ0c7QUFDQTtBQUNBO0FBSFM7O0FBTVo7QUFDQTtBQUNJO0FBQ0k7QUFDSDtBQUNEO0FBQ0E7QUFDQTtBQUNIOztBQUVEO0FBQ0k7QUFDSDs7QUFFRDtBQUNJO0FBQ0E7QUFDSTtBQUNBO0FBQ0g7QUFDSjs7QUFFRDtBQUNLO0FBQ0c7QUFDQTtBQUNIO0FBQ0o7O0FBSUQ7QUFDQTs7QUFFQTtBQTNDSzs7Ozs7Ozs7OztBQ0FUO0FBQ0k7O0FBRUE7QUFDSTtBQURROztBQUlaO0FBQ0k7QUFDQTtBQUNBO0FBQ0E7QUFDSDs7QUFFRDtBQUNJO0FBQ0k7QUFDSTtBQUNBO0FBQ0E7QUFDSDtBQUNKO0FBQ0o7O0FBdEJJOzs7Ozs7Ozs7O0FDQVQ7Ozs7Ozs7OztBQVNDOztBQUVDOztBQUVFOztBQUVBOztBQUVBOztBQUVBO0FBQ0U7QUFDQTtBQUNBO0FBQ0E7QUFKTTs7QUFPUjtBQUNFO0FBQ0E7QUFDQTtBQUhLOztBQU1QO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDRTtBQUNBO0FBQ0E7QUFDRTtBQUNBOztBQUVBO0FBQ0Q7QUFDRDtBQUVEOztBQUVEO0FBQ0U7QUFDQTtBQUNEOztBQUVEO0FBQ0U7QUFERjtBQUlFO0FBRUQ7O0FBRUQ7QUFDRTtBQUVEOztBQUVEO0FBQ0E7QUFBb0M7QUFBOEY7QUFDbEk7QUFBb0M7QUFBeUo7QUFDN0w7QUFBb0M7QUFBMEI7QUFDOUQ7QUFBb0M7QUFBNEY7QUFDaEk7QUFBb0M7QUFBMkI7QUFDL0Q7QUFBK0U7QUFBaUI7QUFDaEc7QUFBK0I7QUFBd0M7O0FBRXZFOztBQUdBO0FBRUQ7O0FBRUQ7O0FBRUE7QUFDRTtBQUNFO0FBQ0U7QUFDRDtBQUVDO0FBQ0Q7QUFDRjtBQUNGOztBQUVEO0FBQXVEO0FBQXdHO0FBQy9KO0FBQXVEO0FBQXdHO0FBQy9KO0FBQXVEO0FBQXdHO0FBQy9KO0FBQXVEO0FBQXdHO0FBQy9KO0FBQXVEO0FBQXdHOztBQUUvSjtBQUF1RDtBQUF3RztBQUMvSjtBQUF1RDtBQUF3RztBQUMvSjtBQUF1RDtBQUF3RztBQUMvSjtBQUF1RDtBQUF3Rzs7QUFFL0o7QUFDRTtBQUdEOztBQUVEO0FBQ0U7QUFDQTtBQUNEOztBQUVEO0FBQ0U7QUFBQTtBQUVBO0FBSUQ7O0FBRUQ7QUFDRTtBQUNBO0FBQ0Q7O0FBRUQ7O0FBRUE7QUFDRTs7QUFFRTtBQUNBO0FBQ0E7O0FBRUE7O0FBR0E7O0FBR0E7O0FBR0E7QUFDRTtBQUNBO0FBQ0Q7O0FBRUQ7QUFDQTtBQUNBO0FBQ0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Q7QUFDRDtBQUFzQztBQUNwQztBQUNBO0FBQ0Q7O0FBRUQ7QUFDQTtBQUNFO0FBQ0E7QUFDRDtBQUVDO0FBQ0Q7QUFFQztBQUNFO0FBQ0g7QUFFRjtBQUNGOztBQXhMZ0I7O0FBNExuQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNFO0FBQ0U7QUFDRDtBQUNEO0FBQ0Q7QUFDRDtBQUNBO0FBQ0E7QUFSQTtBQVVFO0FBQTJCO0FBQXNCO0FBQ2xEO0FBQ0Q7QUFDQTtBQUNBO0FBTEs7QUFPSDtBQUNEO0FBQ0Q7QUFDQTtBQUNBO0FBTEs7QUFPSDtBQUNEO0FBRUYiLCJzb3VyY2VzQ29udGVudCI6WyJjYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG5cclxuICAgICAgICBfbGVmdEJsb2NrOiAwLFxyXG4gICAgICAgIF9yaWdodEJsb2NrOiAwLFxyXG4gICAgICAgIF91cEJsb2NrOiAwLFxyXG4gICAgICAgIF9kb3duQmxvY2s6IDAsXHJcbiAgICAgICAgX21vdmVBYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuXHJcbiAgICBvbkxvYWQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBsZXQgbWFuYWdlciA9IGNjLmRpcmVjdG9yLmdldENvbGxpc2lvbk1hbmFnZXIoKTtcclxuICAgICAgICBtYW5hZ2VyLmVuYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMubm9kZS5vbigndG91Y2htb3ZlJyx0aGlzLm9uVG91Y2hNb3ZlLHRoaXMpXHJcbiAgICB9LFxyXG5cclxuICAgIG9uVG91Y2hNb3ZlOiBmdW5jdGlvbihlKXtcclxuICAgICAgICBpZighdGhpcy5fbW92ZUFibGUpe3JldHVybjt9XHJcbiAgICAgICAgbGV0IGRpZmYgPSBlLmdldERlbHRhKCk7XHJcbiAgICAgICAgaWYodGhpcy5fbGVmdEJsb2NrICYmIGRpZmYueCA8IDApe2RpZmYueCA9IDB9XHJcbiAgICAgICAgaWYodGhpcy5fcmlnaHRCbG9jayAmJiBkaWZmLnggPiAwKXtkaWZmLnggPSAwfVxyXG4gICAgICAgIGlmKHRoaXMuX3VwQmxvY2sgJiYgZGlmZi55ID4gMCl7ZGlmZi55ID0gMH1cclxuICAgICAgICBpZih0aGlzLl9kb3duQmxvY2sgJiYgZGlmZi55IDwgMCl7ZGlmZi55ID0gMH1cclxuICAgICAgICB0aGlzLm5vZGUucG9zaXRpb24gPSBjYy5wQWRkKHRoaXMubm9kZS5wb3NpdGlvbixkaWZmKTtcclxuICAgIH0sXHJcblxyXG4gICAgb25Db2xsaXNpb25FbnRlcjogZnVuY3Rpb24ob3RoZXIsc2VsZil7XHJcbiAgICAgICAgaWYob3RoZXIubm9kZS5ncm91cCA9PSAncGxheWVyLXJlbmRlcicgfHwgb3RoZXIubm9kZS5ncm91cCA9PSAncGxheWVyJyB8fCBvdGhlci5ub2RlLnBhcmVudCA9PSB0aGlzLm5vZGUpe3JldHVybjt9XHJcbiAgICAgICAgbGV0IHNlbGZBYWJiID0gc2VsZi53b3JsZC5hYWJiO1xyXG4gICAgICAgIGxldCBvdGhlckFhYmIgPSBvdGhlci53b3JsZC5hYWJiO1xyXG4gICAgICAgIGxldCBzZWxmUHJlQWFiYiA9IHNlbGYud29ybGQucHJlQWFiYjtcclxuICAgICAgICBsZXQgb3RoZXJQcmVBYWJiID0gb3RoZXIud29ybGQucHJlQWFiYjtcclxuXHJcbiAgICAgICAgbGV0IGxvY2FsQmxvY2tBcnJheSA9IFtdO1xyXG5cclxuICAgICAgICBpZihzZWxmUHJlQWFiYi54TWluID49IG90aGVyUHJlQWFiYi54TWF4ICYmIHNlbGZBYWJiLnhNaW4gPD0gb3RoZXJBYWJiLnhNYXgpe1xyXG4gICAgICAgICAgICAvL2xlZnQgYmxvY2tcclxuICAgICAgICAgICAgdGhpcy5fbGVmdEJsb2NrKys7XHJcbiAgICAgICAgICAgIGxvY2FsQmxvY2tBcnJheS5wdXNoKCdfbGVmdEJsb2NrJyk7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS54ICs9IE1hdGguYWJzKHNlbGZBYWJiLnhNaW4gLSBvdGhlckFhYmIueE1heCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHNlbGZQcmVBYWJiLnhNYXggPD0gb3RoZXJQcmVBYWJiLnhNaW4gJiYgc2VsZkFhYmIueE1heCA+PSBvdGhlckFhYmIueE1pbil7XHJcbiAgICAgICAgICAgIC8vcmlnaHQgYmxvY2tcclxuICAgICAgICAgICAgdGhpcy5fcmlnaHRCbG9jaysrO1xyXG4gICAgICAgICAgICBsb2NhbEJsb2NrQXJyYXkucHVzaCgnX3JpZ2h0QmxvY2snKTtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLnggLT0gTWF0aC5hYnMoc2VsZkFhYmIueE1heCAtIG90aGVyQWFiYi54TWluKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoc2VsZlByZUFhYmIueU1heCA8PSBvdGhlclByZUFhYmIueU1pbiAmJiBzZWxmQWFiYi55TWF4ID49IG90aGVyQWFiYi55TWluKXtcclxuICAgICAgICAgICAgLy91cCBibG9ja1xyXG4gICAgICAgICAgICB0aGlzLl91cEJsb2NrKys7XHJcbiAgICAgICAgICAgIGxvY2FsQmxvY2tBcnJheS5wdXNoKCdfdXBCbG9jaycpO1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUueSAtPSBNYXRoLmFicyhzZWxmQWFiYi55TWF4IC0gb3RoZXJBYWJiLnlNaW4pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihzZWxmUHJlQWFiYi55TWluID49IG90aGVyUHJlQWFiYi55TWF4ICYmIHNlbGZBYWJiLnlNaW4gPD0gb3RoZXJBYWJiLnlNYXgpe1xyXG4gICAgICAgICAgICAvL2Rvd24gYmxvY2tcclxuICAgICAgICAgICAgdGhpcy5fZG93bkJsb2NrKys7XHJcbiAgICAgICAgICAgIGxvY2FsQmxvY2tBcnJheS5wdXNoKCdfZG93bkJsb2NrJyk7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS54ICs9IE1hdGguYWJzKHNlbGZBYWJiLnlNaW4gLSBvdGhlckFhYmIueU1heCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKG90aGVyLmJsb2NrQXJyYXkgPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgb3RoZXIuYmxvY2tBcnJheSA9IFtdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBvdGhlci5ibG9ja0FycmF5W3NlbGYubm9kZS51dWlkXSA9IGxvY2FsQmxvY2tBcnJheTtcclxuICAgICAgICBcclxuICAgIH0sXHJcblxyXG4gICAgb25Db2xsaXNpb25FeGl0OiBmdW5jdGlvbihvdGhlcixzZWxmKXtcclxuICAgICAgICBpZihvdGhlci5ibG9ja0FycmF5ICE9IHVuZGVmaW5lZCAmJiBvdGhlci5ibG9ja0FycmF5W3NlbGYubm9kZS51dWlkXSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBmb3IobGV0IGl0ZW0gb2Ygb3RoZXIuYmxvY2tBcnJheVtzZWxmLm5vZGUudXVpZF0pe1xyXG4gICAgICAgICAgICAgICAgdGhpc1tpdGVtXS0tO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGRlbGV0ZSBvdGhlci5ibG9ja0FycmF5W3NlbGYubm9kZS51dWlkXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59KTtcclxuIiwibW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgICBjbGVhckNvbG9yOiBjYy5oZXhUb0NvbG9yKCcjQ0E2REUwJylcclxufSIsImNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgXHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICBvbkxvYWQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBjYy5kaXJlY3Rvci5zZXRDbGVhckNvbG9yKHJlcXVpcmUoJ2NsZWFyLWNvbG9yLW1vZHVsZScpLmNsZWFyQ29sb3IpO1xyXG4gICAgfSxcclxuXHJcbn0pO1xyXG4iLCJsZXQgU3RhdGVNYWNoaW5lID0gcmVxdWlyZSgnc3RhdGUtbWFjaGluZScpO1xyXG5sZXQgZnNtRGF0YSA9IHtcclxuaW5pdGlhbDogJ25vcGUnLFxyXG4vL3BsZWFzZSBzZWxlY3QgdGhlIGVudGVyLXN0YXRlIGhlcmUg4oaTXHJcbmV2ZW50czogW1xyXG57XCJuYW1lXCI6XCJzdGFydHVwXCIsXCJmcm9tXCI6XCJub3BlXCIsXCJ0b1wiOlwiZmx5aW5nXCJ9LFxyXG57XCJuYW1lXCI6XCJyZWFkeVwiLFwiZnJvbVwiOlwiaWRsaW5nXCIsXCJ0b1wiOlwicmVhZHlpbmdcIn0sXHJcbntcIm5hbWVcIjpcImZseVwiLFwiZnJvbVwiOlwicmVhZHlpbmdcIixcInRvXCI6XCJmbHlpbmdcIn0sXHJcbntcIm5hbWVcIjpcImlkbGVcIixcImZyb21cIjpcImZseWluZ1wiLFwidG9cIjpcImlkbGluZ1wifSxcclxue1wibmFtZVwiOlwiaWRsZVwiLFwiZnJvbVwiOlwicmVhZHlpbmdcIixcInRvXCI6XCJpZGxpbmdcIn0sXHJcbl1cclxufTtcclxubGV0IGNyZWF0ZSA9IGZ1bmN0aW9uKCl7XHJcbmxldCBmc20gPSBTdGF0ZU1hY2hpbmUuY3JlYXRlKGZzbURhdGEpO1xyXG5mc20uQVNZTkMgPSBTdGF0ZU1hY2hpbmUuQVNZTkM7XHJcbnJldHVybiBmc207XHJcbn1cclxubW9kdWxlLmV4cG9ydHMgPSB7Y3JlYXRlfSIsImNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgICBlZGl0b3I6IHtcclxuICAgICAgICByZXF1aXJlQ29tcG9uZW50OiBjYy5HcmFwaGljcyxcclxuICAgIH0sXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgICBfbGVmdE9yaWdpblBvaW50OiBjYy52MigwLDApLFxyXG4gICAgICAgIGxlZnRPcmlnaW5Qb2ludDoge1xyXG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCl7IHJldHVybiB0aGlzLl9sZWZ0T3JpZ2luUG9pbnR9LFxyXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKXsgdGhpcy5fbGVmdE9yaWdpblBvaW50ID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICAvL3RoaXMudXBkYXRlUmVuZGVyKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgICBfcmlnaHRPcmlnaW5Qb2ludDogY2MudjIoMCwwKSxcclxuICAgICAgICByaWdodE9yaWdpblBvaW50OiB7XHJcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKXsgcmV0dXJuIHRoaXMuX3JpZ2h0T3JpZ2luUG9pbnR9LFxyXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKXsgdGhpcy5fcmlnaHRPcmlnaW5Qb2ludCA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgLy90aGlzLnVwZGF0ZVJlbmRlcigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICAgX3VwT3JpZ2luUG9pbnQ6IGNjLnYyKDAsMCksXHJcbiAgICAgICAgdXBPcmlnaW5Qb2ludDoge1xyXG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCl7IHJldHVybiB0aGlzLl91cE9yaWdpblBvaW50fSxcclxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbih2YWx1ZSl7IHRoaXMuX3VwT3JpZ2luUG9pbnQgPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIC8vdGhpcy51cGRhdGVSZW5kZXIoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgIF9kb3duT3JpZ2luUG9pbnQ6IGNjLnYyKDAsMCksXHJcbiAgICAgICAgZG93bk9yaWdpblBvaW50OiB7XHJcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKXsgcmV0dXJuIHRoaXMuX2Rvd25PcmlnaW5Qb2ludH0sXHJcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24odmFsdWUpeyB0aGlzLl9kb3duT3JpZ2luUG9pbnQgPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIC8vdGhpcy51cGRhdGVSZW5kZXIoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgX2N0cmxSYXRlOiAwLjUsXHJcbiAgICAgICAgY3RybFJhdGU6IHtcclxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2N0cmxSYXRlO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2N0cmxSYXRlID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICAvL3RoaXMudXBkYXRlUmVuZGVyKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICB0b2dnbGVVcGRhdGVSZW5kZXI6e1xyXG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCl7cmV0dXJuIGZhbHNlfSxcclxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbigpe3RoaXMudXBkYXRlUmVuZGVyKCl9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgX2NvbGxpc2lvbkFycmF5OiBbXSxcclxuICAgICAgICBfYmFja1VwT3JpZ2luUG9pbnRBcnJheTogW10sXHJcbiAgICAgICAgX3JlbGVhc2U6IGZhbHNlLFxyXG4gICAgfSxcclxuXHJcbiAgICB1cGRhdGVSZW5kZXI6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgbGV0IGN0eCA9IHRoaXMuZ2V0Q29tcG9uZW50KGNjLkdyYXBoaWNzKTtcclxuICAgICAgICBjdHguY2xlYXIoKTtcclxuICAgICAgICAvLyBsZXQgdXBQb2ludCA9IHRoaXMuX3VwT3JpZ2luUG9pbnQ7XHJcbiAgICAgICAgLy8gbGV0IHJpZ2h0UG9pbnQgPSB0aGlzLl9yaWdodE9yaWdpblBvaW50O1xyXG4gICAgICAgIC8vIGxldCByaWdodFVwQ3RybFBvaW50ID0gY2MudjIodGhpcy5fcmlnaHRPcmlnaW5Qb2ludC54LHRoaXMuX3VwT3JpZ2luUG9pbnQueSk7XHJcbiAgICAgICAgLy8gbGV0IGRvd25Qb2ludCA9IHRoaXMuX2Rvd25PcmlnaW5Qb2ludDtcclxuICAgICAgICAvLyBsZXQgcmlnaHREb3duQ3RybFBvaW50ID0gY2MudjIodGhpcy5fcmlnaHRPcmlnaW5Qb2ludC54LHRoaXMuX2Rvd25PcmlnaW5Qb2ludC55KTtcclxuICAgICAgICAvLyBsZXQgbGVmdFBvaW50ID0gdGhpcy5fbGVmdE9yaWdpblBvaW50O1xyXG4gICAgICAgIC8vIGxldCBsZWZ0RG93blBvaW50ID0gY2MudjIodGhpcy5fbGVmdE9yaWdpblBvaW50LngsdGhpcy5fZG93bk9yaWdpblBvaW50LnkpO1xyXG4gICAgICAgIC8vIGxldCBsZWZ0VXBQb2ludCA9IGNjLnYyKHRoaXMuX2xlZnRPcmlnaW5Qb2ludC54LHRoaXMuX3VwT3JpZ2luUG9pbnQueSk7XHJcblxyXG4gICAgICAgIGxldCBvZmZzZXQgPSBjYy52Mih0aGlzLm5vZGUud2lkdGggKiB0aGlzLm5vZGUuYW5jaG9yWCx0aGlzLm5vZGUuaGVpZ2h0ICogdGhpcy5ub2RlLmFuY2hvclkpO1xyXG4gICAgICAgIC8vRWRpdG9yLmxvZyhvZmZzZXQueCxvZmZzZXQueSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy91cFxyXG4gICAgICAgIGN0eC5tb3ZlVG8odGhpcy5fdXBPcmlnaW5Qb2ludC54ICsgb2Zmc2V0LngsdGhpcy5fdXBPcmlnaW5Qb2ludC55ICsgb2Zmc2V0LnkpO1xyXG4gICAgICAgIC8vdXAgcmlnaHQgXHJcbiAgICAgICAgY3R4LmJlemllckN1cnZlVG8odGhpcy5fcmlnaHRPcmlnaW5Qb2ludC54KnRoaXMuX2N0cmxSYXRlICsgb2Zmc2V0LngsdGhpcy5fdXBPcmlnaW5Qb2ludC55ICsgb2Zmc2V0LnksdGhpcy5fcmlnaHRPcmlnaW5Qb2ludC54ICsgb2Zmc2V0LngsdGhpcy5fdXBPcmlnaW5Qb2ludC55KnRoaXMuX2N0cmxSYXRlICsgb2Zmc2V0LnksdGhpcy5fcmlnaHRPcmlnaW5Qb2ludC54ICsgb2Zmc2V0LngsdGhpcy5fcmlnaHRPcmlnaW5Qb2ludC55ICsgb2Zmc2V0LnkpO1xyXG4gICAgICAgIC8vcmlnaHQgZG93blxyXG4gICAgICAgIGN0eC5iZXppZXJDdXJ2ZVRvKHRoaXMuX3JpZ2h0T3JpZ2luUG9pbnQueCArIG9mZnNldC54LHRoaXMuX2Rvd25PcmlnaW5Qb2ludC55KnRoaXMuX2N0cmxSYXRlICsgb2Zmc2V0LnksdGhpcy5fcmlnaHRPcmlnaW5Qb2ludC54KnRoaXMuX2N0cmxSYXRlICsgb2Zmc2V0LngsdGhpcy5fZG93bk9yaWdpblBvaW50LnkgKyBvZmZzZXQueSx0aGlzLl9kb3duT3JpZ2luUG9pbnQueCArIG9mZnNldC54LHRoaXMuX2Rvd25PcmlnaW5Qb2ludC55ICsgb2Zmc2V0LnkpO1xyXG4gICAgICAgIC8vZG93biBsZWZ0XHJcbiAgICAgICAgY3R4LmJlemllckN1cnZlVG8odGhpcy5fbGVmdE9yaWdpblBvaW50LngqdGhpcy5fY3RybFJhdGUgKyBvZmZzZXQueCx0aGlzLl9kb3duT3JpZ2luUG9pbnQueSArIG9mZnNldC55LHRoaXMuX2xlZnRPcmlnaW5Qb2ludC54ICsgb2Zmc2V0LngsdGhpcy5fZG93bk9yaWdpblBvaW50LnkqdGhpcy5fY3RybFJhdGUgKyBvZmZzZXQueSx0aGlzLl9sZWZ0T3JpZ2luUG9pbnQueCArIG9mZnNldC54LHRoaXMuX2xlZnRPcmlnaW5Qb2ludC55ICsgb2Zmc2V0LnkpO1xyXG4gICAgICAgIC8vbGVmdCB1cFxyXG4gICAgICAgIGN0eC5iZXppZXJDdXJ2ZVRvKHRoaXMuX2xlZnRPcmlnaW5Qb2ludC54ICsgb2Zmc2V0LngsdGhpcy5fdXBPcmlnaW5Qb2ludC55KnRoaXMuX2N0cmxSYXRlICsgb2Zmc2V0LnksdGhpcy5fbGVmdE9yaWdpblBvaW50LngqdGhpcy5fY3RybFJhdGUgKyBvZmZzZXQueCx0aGlzLl91cE9yaWdpblBvaW50LnkgKyBvZmZzZXQueSx0aGlzLl91cE9yaWdpblBvaW50LnggKyBvZmZzZXQueCx0aGlzLl91cE9yaWdpblBvaW50LnkgKyBvZmZzZXQueSk7XHJcbiAgICAgICAgY3R4LmZpbGwoKTtcclxuICAgICAgICBjdHguc3Ryb2tlKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgXHJcbiAgICAgICAgXHJcbiAgICB9LFxyXG5cclxuICAgIG9uTG9hZDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGxldCBtYW5hZ2VyID0gY2MuZGlyZWN0b3IuZ2V0Q29sbGlzaW9uTWFuYWdlcigpO1xyXG4gICAgICAgIG1hbmFnZXIuZW5hYmxlZCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy51cGRhdGVSZW5kZXIoKTtcclxuICAgICAgICAvL3RoaXMubm9kZS5ydW5BY3Rpb24oY2MubW92ZUJ5KDEsMzAsMCkpO1xyXG4gICAgICAgIC8vdGhpcy5ub2RlLm9uKCd0b3VjaG1vdmUnLHRoaXMub25Ub3VjaE1vdmUsdGhpcylcclxuICAgICAgICB0aGlzLm5vZGUucGFyZW50Lm9uKCdwb3NpdGlvbi1jaGFuZ2VkJyx0aGlzLm9uUG9zaXRpb25DaGFuZ2VkLHRoaXMpO1xyXG4gICAgICAgIHRoaXMuX2JhY2tVcE9yaWdpblBvaW50QXJyYXlbJ19sZWZ0T3JpZ2luUG9pbnQnXSA9IHRoaXMuX2xlZnRPcmlnaW5Qb2ludC5jbG9uZSgpO1xyXG4gICAgICAgIHRoaXMuX2JhY2tVcE9yaWdpblBvaW50QXJyYXlbJ19yaWdodE9yaWdpblBvaW50J10gPSB0aGlzLl9yaWdodE9yaWdpblBvaW50LmNsb25lKCk7XHJcbiAgICAgICAgdGhpcy5fYmFja1VwT3JpZ2luUG9pbnRBcnJheVsnX3VwT3JpZ2luUG9pbnQnXSA9IHRoaXMuX3VwT3JpZ2luUG9pbnQuY2xvbmUoKTtcclxuICAgICAgICB0aGlzLl9iYWNrVXBPcmlnaW5Qb2ludEFycmF5WydfZG93bk9yaWdpblBvaW50J10gPSB0aGlzLl9kb3duT3JpZ2luUG9pbnQuY2xvbmUoKTsgXHJcbiAgICB9LFxyXG5cclxuICAgIC8vIG9uVG91Y2hNb3ZlOiBmdW5jdGlvbihlKXtcclxuICAgIC8vICAgICAgIHRoaXMubm9kZS5wYXJlbnQucG9zaXRpb24gPSB0aGlzLm5vZGUucGFyZW50LnBhcmVudC5jb252ZXJ0VG9Ob2RlU3BhY2VBUihlLmdldExvY2F0aW9uKCkpO1xyXG4gICAgLy8gfSxcclxuICAgIG9uUG9zaXRpb25DaGFuZ2VkOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coJ3AtY2hhbmdlZC1jaGlsZCcpO1xyXG4gICAgICAgIGlmKE9iamVjdC5rZXlzKHRoaXMuX2NvbGxpc2lvbkFycmF5KS5sZW5ndGggPT0gMCAmJiAhdGhpcy5fcmVsZWFzZSl7XHJcbiAgICAgICAgICAgIHRoaXMuX3JlbGVhc2UgPSB0cnVlO1xyXG4gICAgICAgICAgICBmb3IobGV0IGlkeCBpbiB0aGlzLl9iYWNrVXBPcmlnaW5Qb2ludEFycmF5KXtcclxuICAgICAgICAgICAgICAgIHRoaXNbaWR4XSA9IHRoaXMuX2JhY2tVcE9yaWdpblBvaW50QXJyYXlbaWR4XTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVJlbmRlcigpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuX3JlbGVhc2UgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yKGxldCBpZHggaW4gdGhpcy5fY29sbGlzaW9uQXJyYXkpe1xyXG4gICAgICAgICAgICBsZXQgb3RoZXIgPSB0aGlzLl9jb2xsaXNpb25BcnJheVtpZHhdO1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZURhdGEob3RoZXIsdGhpcy5nZXRDb21wb25lbnQoY2MuQm94Q29sbGlkZXIpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICB9LFxyXG5cclxuICAgIHVwZGF0ZURhdGE6IGZ1bmN0aW9uKG90aGVyLHNlbGYpe1xyXG4gICAgICAgIGxldCBzZWxmQWFiYiA9IHNlbGYud29ybGQuYWFiYjtcclxuICAgICAgICBsZXQgb3RoZXJBYWJiID0gb3RoZXIud29ybGQuYWFiYjtcclxuICAgICAgICAvL2xldCBzZWxmUHJlQWFiYiA9IHNlbGYud29ybGQucHJlQWFiYjtcclxuICAgICAgICAvL2xldCBvdGhlclByZUFhYmIgPSBvdGhlci53b3JsZC5wcmVBYWJiO1xyXG4gICAgICAgIGxldCBzZWxmUHJlQWFiYiA9IHNlbGYubm9kZS5lbnRlckFhYmJbb3RoZXIubm9kZS51dWlkXTtcclxuICAgICAgICBsZXQgb3RoZXJQcmVBYWJiID0gb3RoZXIud29ybGQuZW50ZXJBYWJiO1xyXG5cclxuICAgICAgICBsZXQgdXBkYXRlTnVtID0gMDtcclxuXHJcbiAgICAgICAgaWYoc2VsZlByZUFhYmIueE1pbiA+PSBvdGhlclByZUFhYmIueE1heCAmJiBzZWxmQWFiYi54TWluIDw9IG90aGVyQWFiYi54TWF4KXtcclxuICAgICAgICAgICAgLy9sZWZ0IGJsb2NrXHJcbiAgICAgICAgICAgIC8vdGhpcy5ub2RlLnggKz0gTWF0aC5hYnMoc2VsZkFhYmIueE1pbiAtIG90aGVyQWFiYi54TWF4KTtcclxuICAgICAgICAgICAgdGhpcy5fbGVmdE9yaWdpblBvaW50ID0gY2MudjIoLXRoaXMubm9kZS53aWR0aC8yICsgTWF0aC5hYnMoc2VsZkFhYmIueE1pbiAtIG90aGVyQWFiYi54TWF4KSwwKVxyXG4gICAgICAgICAgICB1cGRhdGVOdW0rKztcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoc2VsZlByZUFhYmIueE1heCA8PSBvdGhlclByZUFhYmIueE1pbiAmJiBzZWxmQWFiYi54TWF4ID49IG90aGVyQWFiYi54TWluKXtcclxuICAgICAgICAgICAgLy9yaWdodCBibG9ja1xyXG5cclxuICAgICAgICAgICAgLy90aGlzLm5vZGUueCAtPSBNYXRoLmFicyhzZWxmQWFiYi54TWF4IC0gb3RoZXJBYWJiLnhNaW4pO1xyXG4gICAgICAgICAgICB0aGlzLl9yaWdodE9yaWdpblBvaW50ID0gY2MudjIodGhpcy5ub2RlLndpZHRoLzIgLSBNYXRoLmFicyhzZWxmQWFiYi54TWF4IC0gb3RoZXJBYWJiLnhNaW4pLDApXHJcbiAgICAgICAgICAgIHVwZGF0ZU51bSsrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihzZWxmUHJlQWFiYi55TWF4IDw9IG90aGVyUHJlQWFiYi55TWluICYmIHNlbGZBYWJiLnlNYXggPj0gb3RoZXJBYWJiLnlNaW4pe1xyXG4gICAgICAgICAgICAvL3VwIGJsb2NrXHJcblxyXG4gICAgICAgICAgICAvL3RoaXMubm9kZS55IC09IE1hdGguYWJzKHNlbGZBYWJiLnlNYXggLSBvdGhlckFhYmIueU1pbik7XHJcbiAgICAgICAgICAgIHRoaXMuX3VwT3JpZ2luUG9pbnQgPSBjYy52MigwLHRoaXMubm9kZS5oZWlnaHQvMiAtIE1hdGguYWJzKHNlbGZBYWJiLnlNYXggLSBvdGhlckFhYmIueU1pbikpXHJcbiAgICAgICAgICAgIHVwZGF0ZU51bSsrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihzZWxmUHJlQWFiYi55TWluID49IG90aGVyUHJlQWFiYi55TWF4ICYmIHNlbGZBYWJiLnlNaW4gPD0gb3RoZXJBYWJiLnlNYXgpe1xyXG4gICAgICAgICAgICAvL2Rvd24gYmxvY2tcclxuICAgICAgICAgICAgLy90aGlzLm5vZGUueCArPSBNYXRoLmFicyhzZWxmQWFiYi55TWluIC0gb3RoZXJBYWJiLnlNYXgpO1xyXG4gICAgICAgICAgICB0aGlzLl9kb3duT3JpZ2luUG9pbnQgPSBjYy52MigwLC10aGlzLm5vZGUuaGVpZ2h0LzIgKyBNYXRoLmFicyhzZWxmQWFiYi55TWluIC0gb3RoZXJBYWJiLnlNYXgpKTtcclxuICAgICAgICAgICAgdXBkYXRlTnVtKys7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHVwZGF0ZU51bSE9MCl7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlUmVuZGVyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBvbkNvbGxpc2lvbkVudGVyOiBmdW5jdGlvbihvdGhlcixzZWxmKXtcclxuICAgICAgICBpZihvdGhlci5ub2RlLmdyb3VwID09ICdibGFjaycgJiYgdGhpcy5ub2RlLnBhcmVudC5nZXRDb21wb25lbnQoJ3BsYXllci1zY3JpcHQnKS5fY3VycmVudENvbG9yID09IDAgfHwgb3RoZXIubm9kZS5ncm91cCA9PSAnd2hpdGUnICYmIHRoaXMubm9kZS5wYXJlbnQuZ2V0Q29tcG9uZW50KCdwbGF5ZXItc2NyaXB0JykuX2N1cnJlbnRDb2xvciA9PSAxICl7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYob3RoZXIubm9kZS5ncm91cCA9PSAnc3Rhcicpe1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKG90aGVyLm5vZGUuZ3JvdXAgPT0gJ3JlZCcpe1xyXG4gICAgICAgICAgICBjYy5maW5kKCdDYW52YXMnKS5lbWl0KCdyZXN0YXJ0Jyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIG90aGVyLndvcmxkLmVudGVyQWFiYiA9IG90aGVyLndvcmxkLnByZUFhYmIuY2xvbmUoKTtcclxuICAgICAgICBpZihzZWxmLm5vZGUuZW50ZXJBYWJiID09IHVuZGVmaW5lZCl7c2VsZi5ub2RlLmVudGVyQWFiYiA9IFtdfVxyXG4gICAgICAgIHNlbGYubm9kZS5lbnRlckFhYmJbb3RoZXIubm9kZS51dWlkXSA9IHNlbGYud29ybGQucHJlQWFiYi5jbG9uZSgpO1xyXG4gICAgICAgIC8vdGhpcy51cGRhdGVEYXRlKG90aGVyLHNlbGYpO1xyXG4gICAgICAgIHRoaXMuX2NvbGxpc2lvbkFycmF5W290aGVyLm5vZGUudXVpZF0gPSBvdGhlcjtcclxuICAgIH0sXHJcblxyXG4gICAgb25Db2xsaXNpb25FeGl0OiBmdW5jdGlvbihvdGhlcixzZWxmKXtcclxuICAgICAgICBpZihvdGhlci5ub2RlLmdyb3VwID09ICdibGFjaycgJiYgdGhpcy5ub2RlLnBhcmVudC5nZXRDb21wb25lbnQoJ3BsYXllci1zY3JpcHQnKS5fY3VycmVudENvbG9yID09IDAgfHwgb3RoZXIubm9kZS5ncm91cCA9PSAnd2hpdGUnICYmIHRoaXMubm9kZS5wYXJlbnQuZ2V0Q29tcG9uZW50KCdwbGF5ZXItc2NyaXB0JykuX2N1cnJlbnRDb2xvciA9PSAxICl7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYob3RoZXIubm9kZS5ncm91cCA9PSAnc3Rhcicpe1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGRlbGV0ZSBvdGhlci53b3JsZC5lbnRlckFhYmI7XHJcbiAgICAgICAgZGVsZXRlIHNlbGYubm9kZS5lbnRlckFhYmJbb3RoZXIubm9kZS51dWlkXTtcclxuICAgICAgICBkZWxldGUgdGhpcy5fY29sbGlzaW9uQXJyYXlbb3RoZXIubm9kZS51dWlkXTtcclxuICAgIH1cclxuXHJcblxyXG59KTtcclxuIiwibGV0IENvbG9yRW51bSA9IGNjLkVudW0oe1xyXG4gICAgJ3doaXRlJzowLFxyXG4gICAgJ2JsYWNrJzoxXHJcbn0pO1xyXG5jYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgZWRpdG9yOiB7XHJcbiAgICAgICAgcmVxdWlyZUNvbXBvbmVudDogY2MuR3JhcGhpY3MsXHJcbiAgICB9LFxyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBfbGVmdEJsb2NrOiAwLFxyXG4gICAgICAgIF9yaWdodEJsb2NrOiAwLFxyXG4gICAgICAgIF91cEJsb2NrOiAwLFxyXG4gICAgICAgIF9kb3duQmxvY2s6IDAsXHJcbiAgICAgICAgX3NwZWVkOiBudWxsLFxyXG4gICAgICAgIGc6IDAsXHJcbiAgICAgICAgX2ZzbTogbnVsbCxcclxuICAgICAgICBfc1VwOnRydWUsXHJcbiAgICAgICAgX2N1cnJlbnRDb2xvcjpDb2xvckVudW0ud2hpdGUsXHJcbiAgICAgICAgY3VycmVudENvbG9yOntcclxuICAgICAgICAgICAgdHlwZTogQ29sb3JFbnVtLFxyXG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fY3VycmVudENvbG9yO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRDb2xvciA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgaWYodmFsdWUgPT0gQ29sb3JFbnVtLndoaXRlKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3BsYXllci1yZW5kZXInKS5nZXRDb21wb25lbnQoY2MuR3JhcGhpY3MpLmZpbGxDb2xvciA9IGNjLkNvbG9yLldISVRFO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgncGxheWVyLXJlbmRlcicpLmdldENvbXBvbmVudChjYy5HcmFwaGljcykuc3Ryb2tlQ29sb3IgPSBjYy5Db2xvci5CTEFDSztcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgncGxheWVyLXJlbmRlcicpLmdldENvbXBvbmVudChjYy5HcmFwaGljcykuZmlsbENvbG9yID0gY2MuQ29sb3IuQkxBQ0s7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdwbGF5ZXItcmVuZGVyJykuZ2V0Q29tcG9uZW50KGNjLkdyYXBoaWNzKS5zdHJva2VDb2xvciA9IGNjLkNvbG9yLldISVRFO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBfdG91Y2hDb2xvck51bTogMCxcclxuICAgIH0sXHJcblxyXG4gICAgb25Mb2FkOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5fc3BlZWQgPSBjYy52MigwLDApO1xyXG4gICAgICAgIGxldCBtYW5hZ2VyID0gY2MuZGlyZWN0b3IuZ2V0Q29sbGlzaW9uTWFuYWdlcigpO1xyXG4gICAgICAgIG1hbmFnZXIuZW5hYmxlZCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5fZnNtID0gcmVxdWlyZSgncGxheWVyLWZzbScpLmNyZWF0ZSgpO1xyXG4gICAgICAgIHRoaXMuX2ZzbS5zdGFydHVwKCk7XHJcbiAgICAgICAgdGhpcy5ub2RlLm9uKCd0b3VjaHN0YXJ0Jyx0aGlzLm9uVG91Y2hTdGFydCx0aGlzKTtcclxuICAgICAgICB0aGlzLm5vZGUub24oJ3RvdWNoZW5kJyx0aGlzLm9uVG91Y2hFbmQsdGhpcyk7XHJcbiAgICAgICAgdGhpcy5ub2RlLm9uKCd0b3VjaG1vdmUnLHRoaXMub25Ub3VjaE1vdmUsdGhpcyk7XHJcbiAgICAgICAgdGhpcy5ub2RlLm9uKCd0b3VjaGNhbmNlbCcsdGhpcy5vblRvdWNoRW5kLHRoaXMpO1xyXG5cclxuICAgICAgICBjYy5zeXN0ZW1FdmVudC5vbigna2V5ZG93bicsdGhpcy5vbktleURvd24sdGhpcyk7XHJcbiAgICAgICAgY2Muc3lzdGVtRXZlbnQub24oJ2tleXVwJyx0aGlzLm9uS2V5VXAsdGhpcyk7XHJcbiAgICAgICAgLy90aGlzLm5vZGUub24oJ3Bvc2l0aW9uLWNoYW5nZWQnLHRoaXMub25Qb3NpdGlvbkNoYW5nZWQsdGhpcylcclxuICAgIH0sXHJcblxyXG4gICAgLy8gb25Qb3NpdGlvbkNoYW5nZWQ6IGZ1bmN0aW9uKCl7XHJcbiAgICAvLyAgICAgY29uc29sZS5sb2coJ3AtY2hhbmdlZCcpO1xyXG5cclxuICAgIC8vIH0sXHJcblxyXG4gICAgb25Ub3VjaFN0YXJ0OiBmdW5jdGlvbihlKXtcclxuICAgICAgICBpZih0aGlzLl9mc20uY2FuKCdyZWFkeScpKXtcclxuICAgICAgICAgICAgdGhpcy5fZnNtLnJlYWR5KCk7XHJcbiAgICAgICAgICAgIGlmKHRoaXMubm9kZS5wYXJlbnQuZ3JvdXAgPT0gJ2JveCcpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLnBhcmVudC5nZXRDb21wb25lbnQoJ2JveC1zY3JpcHQnKS5fbW92ZUFibGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgY3R4ID0gdGhpcy5nZXRDb21wb25lbnQoY2MuR3JhcGhpY3MpO1xyXG4gICAgICAgICAgICBjdHguY2xlYXIoKTtcclxuICAgICAgICAgICAgbGV0IG9mZnNldCA9IGNjLnYyKHRoaXMubm9kZS53aWR0aCAqIHRoaXMubm9kZS5hbmNob3JYLHRoaXMubm9kZS5oZWlnaHQgKiB0aGlzLm5vZGUuYW5jaG9yWSk7XHJcbiAgICAgICAgICAgIGN0eC5tb3ZlVG8ob2Zmc2V0Lngsb2Zmc2V0LnkpO1xyXG4gICAgICAgICAgICBsZXQgdGFyZ2V0RGlyID0gY2MucE5lZyh0aGlzLm5vZGUuY29udmVydFRvTm9kZVNwYWNlQVIoZS5nZXRMb2NhdGlvbigpKSk7XHJcbiAgICAgICAgICAgIGN0eC5saW5lVG8odGFyZ2V0RGlyLnggKyBvZmZzZXQueCx0YXJnZXREaXIueSArIG9mZnNldC55KTtcclxuICAgICAgICAgICAgY3R4LnN0cm9rZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgb25Ub3VjaE1vdmU6IGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vZHJhdyB0aGUgdGhyb3cgaGVscGVyIGxpbmVcclxuICAgICAgICBpZih0aGlzLl9mc20uY3VycmVudCA9PSAncmVhZHlpbmcnKXtcclxuICAgICAgICAgICAgbGV0IGN0eCA9IHRoaXMuZ2V0Q29tcG9uZW50KGNjLkdyYXBoaWNzKTtcclxuICAgICAgICAgICAgY3R4LmNsZWFyKCk7XHJcbiAgICAgICAgICAgIGxldCBvZmZzZXQgPSBjYy52Mih0aGlzLm5vZGUud2lkdGggKiB0aGlzLm5vZGUuYW5jaG9yWCx0aGlzLm5vZGUuaGVpZ2h0ICogdGhpcy5ub2RlLmFuY2hvclkpO1xyXG4gICAgICAgICAgICBjdHgubW92ZVRvKG9mZnNldC54LG9mZnNldC55KTtcclxuICAgICAgICAgICAgbGV0IHRhcmdldERpciA9IGNjLnBOZWcodGhpcy5ub2RlLmNvbnZlcnRUb05vZGVTcGFjZUFSKGUuZ2V0TG9jYXRpb24oKSkpO1xyXG4gICAgICAgICAgICBjdHgubGluZVRvKHRhcmdldERpci54ICsgb2Zmc2V0LngsdGFyZ2V0RGlyLnkgKyBvZmZzZXQueSk7XHJcbiAgICAgICAgICAgIGN0eC5zdHJva2UoKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgXHJcblxyXG4gICAgb25Ub3VjaEVuZDogZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgaWYodGhpcy5fZnNtLmNhbignZmx5Jykpe1xyXG4gICAgICAgICAgICB0aGlzLl9mc20uZmx5KCk7XHJcbiAgICAgICAgICAgIGlmKHRoaXMubm9kZS5wYXJlbnQuZ3JvdXAgPT0gJ2JveCcpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLnBhcmVudC5nZXRDb21wb25lbnQoJ2JveC1zY3JpcHQnKS5fbW92ZUFibGUgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHdpbmRvdy50aHJvd1RpbWUrKztcclxuICAgICAgICAgICAgdGhpcy5fc3BlZWQgPSBjYy5wTmVnKHRoaXMubm9kZS5jb252ZXJ0VG9Ob2RlU3BhY2VBUihlLmdldExvY2F0aW9uKCkpKTtcclxuICAgICAgICAgICAgbGV0IGN0eCA9IHRoaXMuZ2V0Q29tcG9uZW50KGNjLkdyYXBoaWNzKTtcclxuICAgICAgICAgICAgY3R4LmNsZWFyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBvbktleURvd246IGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgIGlmKGUua2V5Q29kZSA9PSBjYy5LRVkuZCl7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuX2ZzbS5jdXJyZW50ID09ICdyZWFkeWluZycpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fZnNtLmlkbGUoKTtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMubm9kZS5wYXJlbnQuZ3JvdXAgPT0gJ2JveCcpe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5wYXJlbnQuZ2V0Q29tcG9uZW50KCdib3gtc2NyaXB0JykuX21vdmVBYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGxldCBjdHggPSB0aGlzLmdldENvbXBvbmVudChjYy5HcmFwaGljcyk7XHJcbiAgICAgICAgICAgICAgICBjdHguY2xlYXIoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZihlLmtleUNvZGUgPT0gY2MuS0VZLnMpe1xyXG4gICAgICAgICAgICBpZih0aGlzLl90b3VjaENvbG9yTnVtID09IDAgJiYgdGhpcy5fc1VwKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3NVcCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5jdXJyZW50Q29sb3IgPT0gQ29sb3JFbnVtLndoaXRlKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRDb2xvciA9IENvbG9yRW51bS5ibGFjaztcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudENvbG9yID0gQ29sb3JFbnVtLndoaXRlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBvbktleVVwOiBmdW5jdGlvbihlKXtcclxuICAgICAgICBpZihlLmtleUNvZGUgPT0gY2MuS0VZLnMpe1xyXG4gICAgICAgICAgICB0aGlzLl9zVXAgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcclxuXHJcbiAgICBvbkNvbGxpc2lvbkVudGVyOiBmdW5jdGlvbihvdGhlcixzZWxmKXtcclxuICAgICAgICBpZihvdGhlci5ub2RlLmdyb3VwID09ICdib3gnKXtcclxuICAgICAgICAgICAgICAgIGxldCB0YXJnZXRQb3NpdGlvbiA9IG90aGVyLm5vZGUuY29udmVydFRvTm9kZVNwYWNlQVIodGhpcy5ub2RlLnBhcmVudC5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIodGhpcy5ub2RlLnBvc2l0aW9uKSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUucGFyZW50ID0gb3RoZXIubm9kZTtcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5wb3NpdGlvbiA9IHRhcmdldFBvc2l0aW9uO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihvdGhlci5ub2RlLmdyb3VwID09ICdibGFjaycgfHwgb3RoZXIubm9kZS5ncm91cCA9PSAnd2hpdGUnKXtcclxuICAgICAgICAgICAgdGhpcy5fdG91Y2hDb2xvck51bSsrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihvdGhlci5ub2RlLmdyb3VwID09ICdibGFjaycgJiYgdGhpcy5fY3VycmVudENvbG9yID09IENvbG9yRW51bS53aGl0ZSB8fCBvdGhlci5ub2RlLmdyb3VwID09ICd3aGl0ZScgJiYgdGhpcy5fY3VycmVudENvbG9yID09IENvbG9yRW51bS5ibGFjayApe1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKG90aGVyLm5vZGUuZ3JvdXAgPT0gJ3N0YXInKXtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgc2VsZkFhYmIgPSBzZWxmLndvcmxkLmFhYmI7XHJcbiAgICAgICAgbGV0IG90aGVyQWFiYiA9IG90aGVyLndvcmxkLmFhYmI7XHJcbiAgICAgICAgbGV0IHNlbGZQcmVBYWJiID0gc2VsZi53b3JsZC5wcmVBYWJiO1xyXG4gICAgICAgIGxldCBvdGhlclByZUFhYmIgPSBvdGhlci53b3JsZC5wcmVBYWJiO1xyXG5cclxuICAgICAgICBsZXQgbG9jYWxCbG9ja0FycmF5ID0gW107XHJcblxyXG4gICAgICAgIGlmKHNlbGZQcmVBYWJiLnhNaW4gPj0gb3RoZXJQcmVBYWJiLnhNYXggJiYgc2VsZkFhYmIueE1pbiA8PSBvdGhlckFhYmIueE1heCl7XHJcbiAgICAgICAgICAgIC8vbGVmdCBibG9ja1xyXG4gICAgICAgICAgICB0aGlzLl9sZWZ0QmxvY2srKztcclxuICAgICAgICAgICAgbG9jYWxCbG9ja0FycmF5LnB1c2goJ19sZWZ0QmxvY2snKTtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLnggKz0gTWF0aC5hYnMoc2VsZkFhYmIueE1pbiAtIG90aGVyQWFiYi54TWF4KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoc2VsZlByZUFhYmIueE1heCA8PSBvdGhlclByZUFhYmIueE1pbiAmJiBzZWxmQWFiYi54TWF4ID49IG90aGVyQWFiYi54TWluKXtcclxuICAgICAgICAgICAgLy9yaWdodCBibG9ja1xyXG4gICAgICAgICAgICB0aGlzLl9yaWdodEJsb2NrKys7XHJcbiAgICAgICAgICAgIGxvY2FsQmxvY2tBcnJheS5wdXNoKCdfcmlnaHRCbG9jaycpO1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUueCAtPSBNYXRoLmFicyhzZWxmQWFiYi54TWF4IC0gb3RoZXJBYWJiLnhNaW4pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihzZWxmUHJlQWFiYi55TWF4IDw9IG90aGVyUHJlQWFiYi55TWluICYmIHNlbGZBYWJiLnlNYXggPj0gb3RoZXJBYWJiLnlNaW4pe1xyXG4gICAgICAgICAgICAvL3VwIGJsb2NrXHJcbiAgICAgICAgICAgIHRoaXMuX3VwQmxvY2srKztcclxuICAgICAgICAgICAgbG9jYWxCbG9ja0FycmF5LnB1c2goJ191cEJsb2NrJyk7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS55IC09IE1hdGguYWJzKHNlbGZBYWJiLnlNYXggLSBvdGhlckFhYmIueU1pbik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHNlbGZQcmVBYWJiLnlNaW4gPj0gb3RoZXJQcmVBYWJiLnlNYXggJiYgc2VsZkFhYmIueU1pbiA8PSBvdGhlckFhYmIueU1heCl7XHJcbiAgICAgICAgICAgIC8vZG93biBibG9ja1xyXG4gICAgICAgICAgICB0aGlzLl9kb3duQmxvY2srKztcclxuICAgICAgICAgICAgbG9jYWxCbG9ja0FycmF5LnB1c2goJ19kb3duQmxvY2snKTtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLnggKz0gTWF0aC5hYnMoc2VsZkFhYmIueU1pbiAtIG90aGVyQWFiYi55TWF4KTtcclxuICAgICAgICAgICAgaWYodGhpcy5fZnNtLmNhbignaWRsZScpKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2ZzbS5pZGxlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYob3RoZXIuYmxvY2tBcnJheSA9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBvdGhlci5ibG9ja0FycmF5ID0gW107XHJcbiAgICAgICAgfVxyXG4gICAgICAgIG90aGVyLmJsb2NrQXJyYXlbc2VsZi5ub2RlLnV1aWRdID0gbG9jYWxCbG9ja0FycmF5O1xyXG4gICAgICAgIFxyXG4gICAgfSxcclxuXHJcbiAgICBvbkNvbGxpc2lvbkV4aXQ6IGZ1bmN0aW9uKG90aGVyLHNlbGYpe1xyXG4gICAgICAgIGlmKG90aGVyLm5vZGUuZ3JvdXAgPT0gJ2JveCcgJiYgb3RoZXIubm9kZS51dWlkID09IHRoaXMubm9kZS5wYXJlbnQudXVpZCl7XHJcbiAgICAgICAgICAgICAgICBsZXQgY2FudmFzID0gY2MuZmluZCgnQ2FudmFzJyk7XHJcbiAgICAgICAgICAgICAgICBsZXQgdGFyZ2V0UG9zaXRpb24gPSBjYW52YXMuY29udmVydFRvTm9kZVNwYWNlQVIodGhpcy5ub2RlLnBhcmVudC5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIodGhpcy5ub2RlLnBvc2l0aW9uKSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUucGFyZW50ID0gY2FudmFzO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLnBvc2l0aW9uID0gdGFyZ2V0UG9zaXRpb247XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKG90aGVyLm5vZGUuZ3JvdXAgPT0gJ2JsYWNrJyB8fCBvdGhlci5ub2RlLmdyb3VwID09ICd3aGl0ZScpe1xyXG4gICAgICAgICAgICB0aGlzLl90b3VjaENvbG9yTnVtLS07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKG90aGVyLm5vZGUuZ3JvdXAgPT0gJ2JsYWNrJyAmJiB0aGlzLl9jdXJyZW50Q29sb3IgPT0gQ29sb3JFbnVtLndoaXRlIHx8IG90aGVyLm5vZGUuZ3JvdXAgPT0gJ3doaXRlJyAmJiB0aGlzLl9jdXJyZW50Q29sb3IgPT0gQ29sb3JFbnVtLmJsYWNrKXtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihvdGhlci5ub2RlLmdyb3VwID09ICdzdGFyJyl7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYob3RoZXIuYmxvY2tBcnJheSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBmb3IobGV0IGl0ZW0gb2Ygb3RoZXIuYmxvY2tBcnJheVtzZWxmLm5vZGUudXVpZF0pe1xyXG4gICAgICAgICAgICAgICAgdGhpc1tpdGVtXS0tO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICB1cGRhdGU6IGZ1bmN0aW9uKGR0KXtcclxuICAgICAgICBpZighdGhpcy5fZG93bkJsb2NrKXt0aGlzLl9zcGVlZC55ID0gdGhpcy5fc3BlZWQueSArIHRoaXMuZyAqIGR0O31cclxuICAgICAgICBpZighIXRoaXMuX3VwQmxvY2sgJiYgdGhpcy5fc3BlZWQueSA+IDApe1xyXG4gICAgICAgICAgICB0aGlzLl9zcGVlZC55ID0gLU1hdGguYWJzKHRoaXMuX3NwZWVkLnkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZighIXRoaXMuX2xlZnRCbG9jayAmJiB0aGlzLl9zcGVlZC54IDwgMCl7XHJcbiAgICAgICAgICAgIHRoaXMuX3NwZWVkLnggPSBNYXRoLmFicyh0aGlzLl9zcGVlZC54KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoISF0aGlzLl9yaWdodEJsb2NrICYmIHRoaXMuX3NwZWVkLnggPiAwKXtcclxuICAgICAgICAgICAgdGhpcy5fc3BlZWQueCA9IC1NYXRoLmFicyh0aGlzLl9zcGVlZC54KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoISF0aGlzLl9kb3duQmxvY2sgJiYgdGhpcy5fc3BlZWQueSA8IDApe1xyXG4gICAgICAgICAgICB0aGlzLl9zcGVlZC55ID0gMDtcclxuICAgICAgICAgICAgdGhpcy5fc3BlZWQueCA9IDA7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuX2ZzbS5jYW4oJ2lkbGUnKSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9mc20uaWRsZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubm9kZS5wb3NpdGlvbiA9IGNjLnBBZGQodGhpcy5ub2RlLnBvc2l0aW9uLGNjLnBNdWx0KHRoaXMuX3NwZWVkLGR0KSk7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG59KTtcclxuIiwibGV0IGRvY3MgPSB7XHJcbiAgICAn5rOo5oSPJzonQ2FudmFz5Lya5pyJ5Lik5Liq57uE5Lu277yM5LiA5Liq5pivY2xlYXItY29sb3Itc2NyaXB0LOeUqOS6juiuvue9ruiDjOaZr+minOiJsizkuIDkuKrmmK9zY2VuZS1tZ3LvvIznlKjkuo7nrqHnkIblhbPljaHvvIxsZXZlbOWPguaVsOaYr+W9k+WJjeWFs+WNoScsXHJcbiAgICAn57qi5Z2XJzon56Kw5Yiw6YeN5paw5byA6L+Z5LiA5YWzJyxcclxuICAgICfnmb3lnZcnOiflj6rlkoznmb3oibLnirbmgIHnmoTnjqnlrrbnorDmkp4nLFxyXG4gICAgJ+m7keWdlyc6J+WPquWSjOm7keiJsueKtuaAgeeahOeOqeWutueisOaSnicsXHJcbiAgICAn54Gw5Z2XJzon5rC46L+c5ZKM546p5a6256Kw5pKeJyxcclxuICAgICfmqZnlnZcnOifkuI3lkoznjqnlrrbnorDmkp7vvIzkvYbmmK/mi5bmi73mqZnlnZfkvJrkv67mlLnnjqnlrrbov5Dliqjovajov7knLFxyXG4gICAgJ+aYn+aYnyc6J+WQg+WujOaJgOacieaYn+aYn+S8mui/h+WFsycsXHJcbiAgICAn5o+Q56S6Jzon5omA5pyJ56ev5pyo5ZyocHJlZmFi5Y+v5Lul5om+5YiwJyxcclxuICAgICfmjaLoibInOifmjIlz6ZSu5o2i6ImyJyxcclxuICAgICflj5bmtojmipXmjrcnOifmjIlk6ZSu5Y+W5raI5oqV5o63JyxcclxufVxyXG4vL0JHTeaAjuS5iOS6hiIsImNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICBsZXZlbDogMCxcclxuICAgICAgIF9zdGFyTnVtOjAsXHJcbiAgICAgICBfc2NlbmVMb2FkaW5nOiBmYWxzZSxcclxuICAgIH0sXHJcblxyXG4gICAgLy8gdXNlIHRoaXMgZm9yIGluaXRpYWxpemF0aW9uXHJcbiAgICBvbkxvYWQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZih3aW5kb3cudGhyb3dUaW1lID09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHdpbmRvdy50aHJvd1RpbWUgPSAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm5vZGUub24oJ3N0YXItaW5pdCcsdGhpcy5vblN0YXJJbml0LHRoaXMpO1xyXG4gICAgICAgIHRoaXMubm9kZS5vbigncmVzdGFydCcsdGhpcy5vblJlc3RhcnQsdGhpcyk7XHJcbiAgICAgICAgdGhpcy5ub2RlLm9uKCd0b3VjaC1zdGFyJyx0aGlzLm9uVG91Y2hTdGFyLHRoaXMpO1xyXG4gICAgfSxcclxuXHJcbiAgICBvblN0YXJJbml0OiBmdW5jdGlvbigpe1xyXG4gICAgICAgIHRoaXMuX3N0YXJOdW0rKztcclxuICAgIH0sXHJcblxyXG4gICAgb25Ub3VjaFN0YXI6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdGhpcy5fc3Rhck51bS0tO1xyXG4gICAgICAgIGlmKHRoaXMuX3N0YXJOdW0gPD0gMCAmJiAhdGhpcy5fc2NlbmVMb2FkaW5nKXtcclxuICAgICAgICAgICAgdGhpcy5fc2NlbmVMb2FkaW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKCdsZXZlbC0nKyAodGhpcy5sZXZlbCArIDEpICsnLXNjZW5lJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBvblJlc3RhcnQ6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgIGlmKCF0aGlzLl9zY2VuZUxvYWRpbmcpe1xyXG4gICAgICAgICAgICB0aGlzLl9zY2VuZUxvYWRpbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoJ2xldmVsLScrICh0aGlzLmxldmVsKSArJy1zY2VuZScpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBcclxuXHJcbiAgICAvLyBjYWxsZWQgZXZlcnkgZnJhbWUsIHVuY29tbWVudCB0aGlzIGZ1bmN0aW9uIHRvIGFjdGl2YXRlIHVwZGF0ZSBjYWxsYmFja1xyXG4gICAgLy8gdXBkYXRlOiBmdW5jdGlvbiAoZHQpIHtcclxuXHJcbiAgICAvLyB9LFxyXG59KTtcclxuIiwiY2MuQ2xhc3Moe1xyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBfZGVzdHJveWluZzogZmFsc2UsXHJcbiAgICB9LFxyXG5cclxuICAgIG9uTG9hZDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGxldCBtYW5hZ2VyID0gY2MuZGlyZWN0b3IuZ2V0Q29sbGlzaW9uTWFuYWdlcigpO1xyXG4gICAgICAgIG1hbmFnZXIuZW5hYmxlZCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5ub2RlLnJ1bkFjdGlvbihjYy5yZXBlYXRGb3JldmVyKGNjLnJvdGF0ZUJ5KDEsMTgwKS5lYXNpbmcoY2MuZWFzZVNpbmVJbk91dCgzKSkpKTtcclxuICAgICAgICBjYy5maW5kKCdDYW52YXMnKS5lbWl0KCdzdGFyLWluaXQnKTtcclxuICAgIH0sXHJcblxyXG4gICAgb25Db2xsaXNpb25FbnRlcjogZnVuY3Rpb24ob3RoZXIsc2VsZil7XHJcbiAgICAgICAgaWYob3RoZXIubm9kZS5ncm91cCA9PSAncGxheWVyLXJlbmRlcicpe1xyXG4gICAgICAgICAgICBpZighdGhpcy5fZGVzdHJveWluZyl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9kZXN0cm95aW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGNjLmZpbmQoJ0NhbnZhcycpLmVtaXQoJ3RvdWNoLXN0YXInKTtcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59KTtcclxuIiwiLypcclxuXHJcbiAgSmF2YXNjcmlwdCBTdGF0ZSBNYWNoaW5lIExpYnJhcnkgLSBodHRwczovL2dpdGh1Yi5jb20vamFrZXNnb3Jkb24vamF2YXNjcmlwdC1zdGF0ZS1tYWNoaW5lXHJcblxyXG4gIENvcHlyaWdodCAoYykgMjAxMiwgMjAxMywgMjAxNCwgMjAxNSwgSmFrZSBHb3Jkb24gYW5kIGNvbnRyaWJ1dG9yc1xyXG4gIFJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSAtIGh0dHBzOi8vZ2l0aHViLmNvbS9qYWtlc2dvcmRvbi9qYXZhc2NyaXB0LXN0YXRlLW1hY2hpbmUvYmxvYi9tYXN0ZXIvTElDRU5TRVxyXG5cclxuKi9cclxuXHJcbihmdW5jdGlvbiAoKSB7XHJcblxyXG4gIHZhciBTdGF0ZU1hY2hpbmUgPSB7XHJcblxyXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbiAgICBWRVJTSU9OOiBcIjIuNC4wXCIsXHJcblxyXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbiAgICBSZXN1bHQ6IHtcclxuICAgICAgU1VDQ0VFREVEOiAgICAxLCAvLyB0aGUgZXZlbnQgdHJhbnNpdGlvbmVkIHN1Y2Nlc3NmdWxseSBmcm9tIG9uZSBzdGF0ZSB0byBhbm90aGVyXHJcbiAgICAgIE5PVFJBTlNJVElPTjogMiwgLy8gdGhlIGV2ZW50IHdhcyBzdWNjZXNzZnVsbCBidXQgbm8gc3RhdGUgdHJhbnNpdGlvbiB3YXMgbmVjZXNzYXJ5XHJcbiAgICAgIENBTkNFTExFRDogICAgMywgLy8gdGhlIGV2ZW50IHdhcyBjYW5jZWxsZWQgYnkgdGhlIGNhbGxlciBpbiBhIGJlZm9yZUV2ZW50IGNhbGxiYWNrXHJcbiAgICAgIFBFTkRJTkc6ICAgICAgNCAgLy8gdGhlIGV2ZW50IGlzIGFzeW5jaHJvbm91cyBhbmQgdGhlIGNhbGxlciBpcyBpbiBjb250cm9sIG9mIHdoZW4gdGhlIHRyYW5zaXRpb24gb2NjdXJzXHJcbiAgICB9LFxyXG5cclxuICAgIEVycm9yOiB7XHJcbiAgICAgIElOVkFMSURfVFJBTlNJVElPTjogMTAwLCAvLyBjYWxsZXIgdHJpZWQgdG8gZmlyZSBhbiBldmVudCB0aGF0IHdhcyBpbm5hcHJvcHJpYXRlIGluIHRoZSBjdXJyZW50IHN0YXRlXHJcbiAgICAgIFBFTkRJTkdfVFJBTlNJVElPTjogMjAwLCAvLyBjYWxsZXIgdHJpZWQgdG8gZmlyZSBhbiBldmVudCB3aGlsZSBhbiBhc3luYyB0cmFuc2l0aW9uIHdhcyBzdGlsbCBwZW5kaW5nXHJcbiAgICAgIElOVkFMSURfQ0FMTEJBQ0s6ICAgMzAwIC8vIGNhbGxlciBwcm92aWRlZCBjYWxsYmFjayBmdW5jdGlvbiB0aHJldyBhbiBleGNlcHRpb25cclxuICAgIH0sXHJcblxyXG4gICAgV0lMRENBUkQ6ICcqJyxcclxuICAgIEFTWU5DOiAnYXN5bmMnLFxyXG5cclxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4gICAgY3JlYXRlOiBmdW5jdGlvbihjZmcsIHRhcmdldCkge1xyXG5cclxuICAgICAgdmFyIGluaXRpYWwgICAgICA9ICh0eXBlb2YgY2ZnLmluaXRpYWwgPT0gJ3N0cmluZycpID8geyBzdGF0ZTogY2ZnLmluaXRpYWwgfSA6IGNmZy5pbml0aWFsOyAvLyBhbGxvdyBmb3IgYSBzaW1wbGUgc3RyaW5nLCBvciBhbiBvYmplY3Qgd2l0aCB7IHN0YXRlOiAnZm9vJywgZXZlbnQ6ICdzZXR1cCcsIGRlZmVyOiB0cnVlfGZhbHNlIH1cclxuICAgICAgdmFyIHRlcm1pbmFsICAgICA9IGNmZy50ZXJtaW5hbCB8fCBjZmdbJ2ZpbmFsJ107XHJcbiAgICAgIHZhciBmc20gICAgICAgICAgPSB0YXJnZXQgfHwgY2ZnLnRhcmdldCAgfHwge307XHJcbiAgICAgIHZhciBldmVudHMgICAgICAgPSBjZmcuZXZlbnRzIHx8IFtdO1xyXG4gICAgICB2YXIgY2FsbGJhY2tzICAgID0gY2ZnLmNhbGxiYWNrcyB8fCB7fTtcclxuICAgICAgdmFyIG1hcCAgICAgICAgICA9IHt9OyAvLyB0cmFjayBzdGF0ZSB0cmFuc2l0aW9ucyBhbGxvd2VkIGZvciBhbiBldmVudCB7IGV2ZW50OiB7IGZyb206IFsgdG8gXSB9IH1cclxuICAgICAgdmFyIHRyYW5zaXRpb25zICA9IHt9OyAvLyB0cmFjayBldmVudHMgYWxsb3dlZCBmcm9tIGEgc3RhdGUgICAgICAgICAgICB7IHN0YXRlOiBbIGV2ZW50IF0gfVxyXG5cclxuICAgICAgdmFyIGFkZCA9IGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICB2YXIgZnJvbSA9IEFycmF5LmlzQXJyYXkoZS5mcm9tKSA/IGUuZnJvbSA6IChlLmZyb20gPyBbZS5mcm9tXSA6IFtTdGF0ZU1hY2hpbmUuV0lMRENBUkRdKTsgLy8gYWxsb3cgJ3dpbGRjYXJkJyB0cmFuc2l0aW9uIGlmICdmcm9tJyBpcyBub3Qgc3BlY2lmaWVkXHJcbiAgICAgICAgbWFwW2UubmFtZV0gPSBtYXBbZS5uYW1lXSB8fCB7fTtcclxuICAgICAgICBmb3IgKHZhciBuID0gMCA7IG4gPCBmcm9tLmxlbmd0aCA7IG4rKykge1xyXG4gICAgICAgICAgdHJhbnNpdGlvbnNbZnJvbVtuXV0gPSB0cmFuc2l0aW9uc1tmcm9tW25dXSB8fCBbXTtcclxuICAgICAgICAgIHRyYW5zaXRpb25zW2Zyb21bbl1dLnB1c2goZS5uYW1lKTtcclxuXHJcbiAgICAgICAgICBtYXBbZS5uYW1lXVtmcm9tW25dXSA9IGUudG8gfHwgZnJvbVtuXTsgLy8gYWxsb3cgbm8tb3AgdHJhbnNpdGlvbiBpZiAndG8nIGlzIG5vdCBzcGVjaWZpZWRcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGUudG8pXHJcbiAgICAgICAgICB0cmFuc2l0aW9uc1tlLnRvXSA9IHRyYW5zaXRpb25zW2UudG9dIHx8IFtdO1xyXG4gICAgICB9O1xyXG5cclxuICAgICAgaWYgKGluaXRpYWwpIHtcclxuICAgICAgICBpbml0aWFsLmV2ZW50ID0gaW5pdGlhbC5ldmVudCB8fCAnc3RhcnR1cCc7XHJcbiAgICAgICAgYWRkKHsgbmFtZTogaW5pdGlhbC5ldmVudCwgZnJvbTogJ25vbmUnLCB0bzogaW5pdGlhbC5zdGF0ZSB9KTtcclxuICAgICAgfVxyXG5cclxuICAgICAgZm9yKHZhciBuID0gMCA7IG4gPCBldmVudHMubGVuZ3RoIDsgbisrKVxyXG4gICAgICAgIGFkZChldmVudHNbbl0pO1xyXG5cclxuICAgICAgZm9yKHZhciBuYW1lIGluIG1hcCkge1xyXG4gICAgICAgIGlmIChtYXAuaGFzT3duUHJvcGVydHkobmFtZSkpXHJcbiAgICAgICAgICBmc21bbmFtZV0gPSBTdGF0ZU1hY2hpbmUuYnVpbGRFdmVudChuYW1lLCBtYXBbbmFtZV0pO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBmb3IodmFyIG5hbWUgaW4gY2FsbGJhY2tzKSB7XHJcbiAgICAgICAgaWYgKGNhbGxiYWNrcy5oYXNPd25Qcm9wZXJ0eShuYW1lKSlcclxuICAgICAgICAgIGZzbVtuYW1lXSA9IGNhbGxiYWNrc1tuYW1lXVxyXG4gICAgICB9XHJcblxyXG4gICAgICBmc20uY3VycmVudCAgICAgPSAnbm9uZSc7XHJcbiAgICAgIGZzbS5pcyAgICAgICAgICA9IGZ1bmN0aW9uKHN0YXRlKSB7IHJldHVybiBBcnJheS5pc0FycmF5KHN0YXRlKSA/IChzdGF0ZS5pbmRleE9mKHRoaXMuY3VycmVudCkgPj0gMCkgOiAodGhpcy5jdXJyZW50ID09PSBzdGF0ZSk7IH07XHJcbiAgICAgIGZzbS5jYW4gICAgICAgICA9IGZ1bmN0aW9uKGV2ZW50KSB7IHJldHVybiAhdGhpcy50cmFuc2l0aW9uICYmIChtYXBbZXZlbnRdICE9PSB1bmRlZmluZWQpICYmIChtYXBbZXZlbnRdLmhhc093blByb3BlcnR5KHRoaXMuY3VycmVudCkgfHwgbWFwW2V2ZW50XS5oYXNPd25Qcm9wZXJ0eShTdGF0ZU1hY2hpbmUuV0lMRENBUkQpKTsgfVxyXG4gICAgICBmc20uY2Fubm90ICAgICAgPSBmdW5jdGlvbihldmVudCkgeyByZXR1cm4gIXRoaXMuY2FuKGV2ZW50KTsgfTtcclxuICAgICAgZnNtLnRyYW5zaXRpb25zID0gZnVuY3Rpb24oKSAgICAgIHsgcmV0dXJuICh0cmFuc2l0aW9uc1t0aGlzLmN1cnJlbnRdIHx8IFtdKS5jb25jYXQodHJhbnNpdGlvbnNbU3RhdGVNYWNoaW5lLldJTERDQVJEXSB8fCBbXSk7IH07XHJcbiAgICAgIGZzbS5pc0ZpbmlzaGVkICA9IGZ1bmN0aW9uKCkgICAgICB7IHJldHVybiB0aGlzLmlzKHRlcm1pbmFsKTsgfTtcclxuICAgICAgZnNtLmVycm9yICAgICAgID0gY2ZnLmVycm9yIHx8IGZ1bmN0aW9uKG5hbWUsIGZyb20sIHRvLCBhcmdzLCBlcnJvciwgbXNnLCBlKSB7IHRocm93IGUgfHwgbXNnOyB9OyAvLyBkZWZhdWx0IGJlaGF2aW9yIHdoZW4gc29tZXRoaW5nIHVuZXhwZWN0ZWQgaGFwcGVucyBpcyB0byB0aHJvdyBhbiBleGNlcHRpb24sIGJ1dCBjYWxsZXIgY2FuIG92ZXJyaWRlIHRoaXMgYmVoYXZpb3IgaWYgZGVzaXJlZCAoc2VlIGdpdGh1YiBpc3N1ZSAjMyBhbmQgIzE3KVxyXG4gICAgICBmc20uc3RhdGVzICAgICAgPSBmdW5jdGlvbigpIHsgcmV0dXJuIE9iamVjdC5rZXlzKHRyYW5zaXRpb25zKS5zb3J0KCkgfTtcclxuXHJcbiAgICAgIGlmIChpbml0aWFsICYmICFpbml0aWFsLmRlZmVyKVxyXG4gICAgICAgIGZzbVtpbml0aWFsLmV2ZW50XSgpO1xyXG5cclxuICAgICAgcmV0dXJuIGZzbTtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG4gICAgZG9DYWxsYmFjazogZnVuY3Rpb24oZnNtLCBmdW5jLCBuYW1lLCBmcm9tLCB0bywgYXJncykge1xyXG4gICAgICBpZiAoZnVuYykge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICByZXR1cm4gZnVuYy5hcHBseShmc20sIFtuYW1lLCBmcm9tLCB0b10uY29uY2F0KGFyZ3MpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY2F0Y2goZSkge1xyXG4gICAgICAgICAgcmV0dXJuIGZzbS5lcnJvcihuYW1lLCBmcm9tLCB0bywgYXJncywgU3RhdGVNYWNoaW5lLkVycm9yLklOVkFMSURfQ0FMTEJBQ0ssIFwiYW4gZXhjZXB0aW9uIG9jY3VycmVkIGluIGEgY2FsbGVyLXByb3ZpZGVkIGNhbGxiYWNrIGZ1bmN0aW9uXCIsIGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBiZWZvcmVBbnlFdmVudDogIGZ1bmN0aW9uKGZzbSwgbmFtZSwgZnJvbSwgdG8sIGFyZ3MpIHsgcmV0dXJuIFN0YXRlTWFjaGluZS5kb0NhbGxiYWNrKGZzbSwgZnNtWydvbmJlZm9yZWV2ZW50J10sICAgICAgICAgICAgICAgICAgICAgICBuYW1lLCBmcm9tLCB0bywgYXJncyk7IH0sXHJcbiAgICBhZnRlckFueUV2ZW50OiAgIGZ1bmN0aW9uKGZzbSwgbmFtZSwgZnJvbSwgdG8sIGFyZ3MpIHsgcmV0dXJuIFN0YXRlTWFjaGluZS5kb0NhbGxiYWNrKGZzbSwgZnNtWydvbmFmdGVyZXZlbnQnXSB8fCBmc21bJ29uZXZlbnQnXSwgICAgICBuYW1lLCBmcm9tLCB0bywgYXJncyk7IH0sXHJcbiAgICBsZWF2ZUFueVN0YXRlOiAgIGZ1bmN0aW9uKGZzbSwgbmFtZSwgZnJvbSwgdG8sIGFyZ3MpIHsgcmV0dXJuIFN0YXRlTWFjaGluZS5kb0NhbGxiYWNrKGZzbSwgZnNtWydvbmxlYXZlc3RhdGUnXSwgICAgICAgICAgICAgICAgICAgICAgICBuYW1lLCBmcm9tLCB0bywgYXJncyk7IH0sXHJcbiAgICBlbnRlckFueVN0YXRlOiAgIGZ1bmN0aW9uKGZzbSwgbmFtZSwgZnJvbSwgdG8sIGFyZ3MpIHsgcmV0dXJuIFN0YXRlTWFjaGluZS5kb0NhbGxiYWNrKGZzbSwgZnNtWydvbmVudGVyc3RhdGUnXSB8fCBmc21bJ29uc3RhdGUnXSwgICAgICBuYW1lLCBmcm9tLCB0bywgYXJncyk7IH0sXHJcbiAgICBjaGFuZ2VTdGF0ZTogICAgIGZ1bmN0aW9uKGZzbSwgbmFtZSwgZnJvbSwgdG8sIGFyZ3MpIHsgcmV0dXJuIFN0YXRlTWFjaGluZS5kb0NhbGxiYWNrKGZzbSwgZnNtWydvbmNoYW5nZXN0YXRlJ10sICAgICAgICAgICAgICAgICAgICAgICBuYW1lLCBmcm9tLCB0bywgYXJncyk7IH0sXHJcblxyXG4gICAgYmVmb3JlVGhpc0V2ZW50OiBmdW5jdGlvbihmc20sIG5hbWUsIGZyb20sIHRvLCBhcmdzKSB7IHJldHVybiBTdGF0ZU1hY2hpbmUuZG9DYWxsYmFjayhmc20sIGZzbVsnb25iZWZvcmUnICsgbmFtZV0sICAgICAgICAgICAgICAgICAgICAgbmFtZSwgZnJvbSwgdG8sIGFyZ3MpOyB9LFxyXG4gICAgYWZ0ZXJUaGlzRXZlbnQ6ICBmdW5jdGlvbihmc20sIG5hbWUsIGZyb20sIHRvLCBhcmdzKSB7IHJldHVybiBTdGF0ZU1hY2hpbmUuZG9DYWxsYmFjayhmc20sIGZzbVsnb25hZnRlcicgICsgbmFtZV0gfHwgZnNtWydvbicgKyBuYW1lXSwgbmFtZSwgZnJvbSwgdG8sIGFyZ3MpOyB9LFxyXG4gICAgbGVhdmVUaGlzU3RhdGU6ICBmdW5jdGlvbihmc20sIG5hbWUsIGZyb20sIHRvLCBhcmdzKSB7IHJldHVybiBTdGF0ZU1hY2hpbmUuZG9DYWxsYmFjayhmc20sIGZzbVsnb25sZWF2ZScgICsgZnJvbV0sICAgICAgICAgICAgICAgICAgICAgbmFtZSwgZnJvbSwgdG8sIGFyZ3MpOyB9LFxyXG4gICAgZW50ZXJUaGlzU3RhdGU6ICBmdW5jdGlvbihmc20sIG5hbWUsIGZyb20sIHRvLCBhcmdzKSB7IHJldHVybiBTdGF0ZU1hY2hpbmUuZG9DYWxsYmFjayhmc20sIGZzbVsnb25lbnRlcicgICsgdG9dICAgfHwgZnNtWydvbicgKyB0b10sICAgbmFtZSwgZnJvbSwgdG8sIGFyZ3MpOyB9LFxyXG5cclxuICAgIGJlZm9yZUV2ZW50OiBmdW5jdGlvbihmc20sIG5hbWUsIGZyb20sIHRvLCBhcmdzKSB7XHJcbiAgICAgIGlmICgoZmFsc2UgPT09IFN0YXRlTWFjaGluZS5iZWZvcmVUaGlzRXZlbnQoZnNtLCBuYW1lLCBmcm9tLCB0bywgYXJncykpIHx8XHJcbiAgICAgICAgICAoZmFsc2UgPT09IFN0YXRlTWFjaGluZS5iZWZvcmVBbnlFdmVudCggZnNtLCBuYW1lLCBmcm9tLCB0bywgYXJncykpKVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH0sXHJcblxyXG4gICAgYWZ0ZXJFdmVudDogZnVuY3Rpb24oZnNtLCBuYW1lLCBmcm9tLCB0bywgYXJncykge1xyXG4gICAgICBTdGF0ZU1hY2hpbmUuYWZ0ZXJUaGlzRXZlbnQoZnNtLCBuYW1lLCBmcm9tLCB0bywgYXJncyk7XHJcbiAgICAgIFN0YXRlTWFjaGluZS5hZnRlckFueUV2ZW50KCBmc20sIG5hbWUsIGZyb20sIHRvLCBhcmdzKTtcclxuICAgIH0sXHJcblxyXG4gICAgbGVhdmVTdGF0ZTogZnVuY3Rpb24oZnNtLCBuYW1lLCBmcm9tLCB0bywgYXJncykge1xyXG4gICAgICB2YXIgc3BlY2lmaWMgPSBTdGF0ZU1hY2hpbmUubGVhdmVUaGlzU3RhdGUoZnNtLCBuYW1lLCBmcm9tLCB0bywgYXJncyksXHJcbiAgICAgICAgICBnZW5lcmFsICA9IFN0YXRlTWFjaGluZS5sZWF2ZUFueVN0YXRlKCBmc20sIG5hbWUsIGZyb20sIHRvLCBhcmdzKTtcclxuICAgICAgaWYgKChmYWxzZSA9PT0gc3BlY2lmaWMpIHx8IChmYWxzZSA9PT0gZ2VuZXJhbCkpXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICBlbHNlIGlmICgoU3RhdGVNYWNoaW5lLkFTWU5DID09PSBzcGVjaWZpYykgfHwgKFN0YXRlTWFjaGluZS5BU1lOQyA9PT0gZ2VuZXJhbCkpXHJcbiAgICAgICAgcmV0dXJuIFN0YXRlTWFjaGluZS5BU1lOQztcclxuICAgIH0sXHJcblxyXG4gICAgZW50ZXJTdGF0ZTogZnVuY3Rpb24oZnNtLCBuYW1lLCBmcm9tLCB0bywgYXJncykge1xyXG4gICAgICBTdGF0ZU1hY2hpbmUuZW50ZXJUaGlzU3RhdGUoZnNtLCBuYW1lLCBmcm9tLCB0bywgYXJncyk7XHJcbiAgICAgIFN0YXRlTWFjaGluZS5lbnRlckFueVN0YXRlKCBmc20sIG5hbWUsIGZyb20sIHRvLCBhcmdzKTtcclxuICAgIH0sXHJcblxyXG4gICAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcbiAgICBidWlsZEV2ZW50OiBmdW5jdGlvbihuYW1lLCBtYXApIHtcclxuICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICB2YXIgZnJvbSAgPSB0aGlzLmN1cnJlbnQ7XHJcbiAgICAgICAgdmFyIHRvICAgID0gbWFwW2Zyb21dIHx8IChtYXBbU3RhdGVNYWNoaW5lLldJTERDQVJEXSAhPSBTdGF0ZU1hY2hpbmUuV0lMRENBUkQgPyBtYXBbU3RhdGVNYWNoaW5lLldJTERDQVJEXSA6IGZyb20pIHx8IGZyb207XHJcbiAgICAgICAgdmFyIGFyZ3MgID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKTsgLy8gdHVybiBhcmd1bWVudHMgaW50byBwdXJlIGFycmF5XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnRyYW5zaXRpb24pXHJcbiAgICAgICAgICByZXR1cm4gdGhpcy5lcnJvcihuYW1lLCBmcm9tLCB0bywgYXJncywgU3RhdGVNYWNoaW5lLkVycm9yLlBFTkRJTkdfVFJBTlNJVElPTiwgXCJldmVudCBcIiArIG5hbWUgKyBcIiBpbmFwcHJvcHJpYXRlIGJlY2F1c2UgcHJldmlvdXMgdHJhbnNpdGlvbiBkaWQgbm90IGNvbXBsZXRlXCIpO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5jYW5ub3QobmFtZSkpXHJcbiAgICAgICAgICByZXR1cm4gdGhpcy5lcnJvcihuYW1lLCBmcm9tLCB0bywgYXJncywgU3RhdGVNYWNoaW5lLkVycm9yLklOVkFMSURfVFJBTlNJVElPTiwgXCJldmVudCBcIiArIG5hbWUgKyBcIiBpbmFwcHJvcHJpYXRlIGluIGN1cnJlbnQgc3RhdGUgXCIgKyB0aGlzLmN1cnJlbnQpO1xyXG5cclxuICAgICAgICBpZiAoZmFsc2UgPT09IFN0YXRlTWFjaGluZS5iZWZvcmVFdmVudCh0aGlzLCBuYW1lLCBmcm9tLCB0bywgYXJncykpXHJcbiAgICAgICAgICByZXR1cm4gU3RhdGVNYWNoaW5lLlJlc3VsdC5DQU5DRUxMRUQ7XHJcblxyXG4gICAgICAgIGlmIChmcm9tID09PSB0bykge1xyXG4gICAgICAgICAgU3RhdGVNYWNoaW5lLmFmdGVyRXZlbnQodGhpcywgbmFtZSwgZnJvbSwgdG8sIGFyZ3MpO1xyXG4gICAgICAgICAgcmV0dXJuIFN0YXRlTWFjaGluZS5SZXN1bHQuTk9UUkFOU0lUSU9OO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gcHJlcGFyZSBhIHRyYW5zaXRpb24gbWV0aG9kIGZvciB1c2UgRUlUSEVSIGxvd2VyIGRvd24sIG9yIGJ5IGNhbGxlciBpZiB0aGV5IHdhbnQgYW4gYXN5bmMgdHJhbnNpdGlvbiAoaW5kaWNhdGVkIGJ5IGFuIEFTWU5DIHJldHVybiB2YWx1ZSBmcm9tIGxlYXZlU3RhdGUpXHJcbiAgICAgICAgdmFyIGZzbSA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy50cmFuc2l0aW9uID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICBmc20udHJhbnNpdGlvbiA9IG51bGw7IC8vIHRoaXMgbWV0aG9kIHNob3VsZCBvbmx5IGV2ZXIgYmUgY2FsbGVkIG9uY2VcclxuICAgICAgICAgIGZzbS5jdXJyZW50ID0gdG87XHJcbiAgICAgICAgICBTdGF0ZU1hY2hpbmUuZW50ZXJTdGF0ZSggZnNtLCBuYW1lLCBmcm9tLCB0bywgYXJncyk7XHJcbiAgICAgICAgICBTdGF0ZU1hY2hpbmUuY2hhbmdlU3RhdGUoZnNtLCBuYW1lLCBmcm9tLCB0bywgYXJncyk7XHJcbiAgICAgICAgICBTdGF0ZU1hY2hpbmUuYWZ0ZXJFdmVudCggZnNtLCBuYW1lLCBmcm9tLCB0bywgYXJncyk7XHJcbiAgICAgICAgICByZXR1cm4gU3RhdGVNYWNoaW5lLlJlc3VsdC5TVUNDRUVERUQ7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLnRyYW5zaXRpb24uY2FuY2VsID0gZnVuY3Rpb24oKSB7IC8vIHByb3ZpZGUgYSB3YXkgZm9yIGNhbGxlciB0byBjYW5jZWwgYXN5bmMgdHJhbnNpdGlvbiBpZiBkZXNpcmVkIChpc3N1ZSAjMjIpXHJcbiAgICAgICAgICBmc20udHJhbnNpdGlvbiA9IG51bGw7XHJcbiAgICAgICAgICBTdGF0ZU1hY2hpbmUuYWZ0ZXJFdmVudChmc20sIG5hbWUsIGZyb20sIHRvLCBhcmdzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBsZWF2ZSA9IFN0YXRlTWFjaGluZS5sZWF2ZVN0YXRlKHRoaXMsIG5hbWUsIGZyb20sIHRvLCBhcmdzKTtcclxuICAgICAgICBpZiAoZmFsc2UgPT09IGxlYXZlKSB7XHJcbiAgICAgICAgICB0aGlzLnRyYW5zaXRpb24gPSBudWxsO1xyXG4gICAgICAgICAgcmV0dXJuIFN0YXRlTWFjaGluZS5SZXN1bHQuQ0FOQ0VMTEVEO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChTdGF0ZU1hY2hpbmUuQVNZTkMgPT09IGxlYXZlKSB7XHJcbiAgICAgICAgICByZXR1cm4gU3RhdGVNYWNoaW5lLlJlc3VsdC5QRU5ESU5HO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgIGlmICh0aGlzLnRyYW5zaXRpb24pIC8vIG5lZWQgdG8gY2hlY2sgaW4gY2FzZSB1c2VyIG1hbnVhbGx5IGNhbGxlZCB0cmFuc2l0aW9uKCkgYnV0IGZvcmdvdCB0byByZXR1cm4gU3RhdGVNYWNoaW5lLkFTWU5DXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnRyYW5zaXRpb24oKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICB9O1xyXG4gICAgfVxyXG5cclxuICB9OyAvLyBTdGF0ZU1hY2hpbmVcclxuXHJcbiAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcbiAgLy89PT09PT1cclxuICAvLyBOT0RFXHJcbiAgLy89PT09PT1cclxuICBpZiAodHlwZW9mIGV4cG9ydHMgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICBpZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgJiYgbW9kdWxlLmV4cG9ydHMpIHtcclxuICAgICAgZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gU3RhdGVNYWNoaW5lO1xyXG4gICAgfVxyXG4gICAgZXhwb3J0cy5TdGF0ZU1hY2hpbmUgPSBTdGF0ZU1hY2hpbmU7XHJcbiAgfVxyXG4gIC8vPT09PT09PT09PT09XHJcbiAgLy8gQU1EL1JFUVVJUkVcclxuICAvLz09PT09PT09PT09PVxyXG4gIGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xyXG4gICAgZGVmaW5lKGZ1bmN0aW9uKHJlcXVpcmUpIHsgcmV0dXJuIFN0YXRlTWFjaGluZTsgfSk7XHJcbiAgfVxyXG4gIC8vPT09PT09PT1cclxuICAvLyBCUk9XU0VSXHJcbiAgLy89PT09PT09PVxyXG4gIGVsc2UgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICB3aW5kb3cuU3RhdGVNYWNoaW5lID0gU3RhdGVNYWNoaW5lO1xyXG4gIH1cclxuICAvLz09PT09PT09PT09XHJcbiAgLy8gV0VCIFdPUktFUlxyXG4gIC8vPT09PT09PT09PT1cclxuICBlbHNlIGlmICh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgIHNlbGYuU3RhdGVNYWNoaW5lID0gU3RhdGVNYWNoaW5lO1xyXG4gIH1cclxuXHJcbn0oKSk7XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=