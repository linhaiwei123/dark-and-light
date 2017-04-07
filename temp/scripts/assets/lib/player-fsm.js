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