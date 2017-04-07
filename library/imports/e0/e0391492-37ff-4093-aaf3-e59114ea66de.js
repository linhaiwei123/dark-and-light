'use strict';

cc.Class({
    extends: cc.Component,

    properties: {},

    onLoad: function onLoad() {
        cc.director.setClearColor(require('clear-color-module').clearColor);
    }

});