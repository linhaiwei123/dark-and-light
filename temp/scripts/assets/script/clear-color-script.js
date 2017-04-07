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