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