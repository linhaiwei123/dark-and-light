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