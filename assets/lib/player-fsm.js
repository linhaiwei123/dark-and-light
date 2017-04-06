let StateMachine = require('state-machine');
let fsmData = {
initial: 'nope',
//please select the enter-state here ↓
events: [
{"name":"startup","from":"nope","to":"flying"},
{"name":"ready","from":"idling","to":"readying"},
{"name":"fly","from":"readying","to":"flying"},
{"name":"idle","from":"flying","to":"idling"},
{"name":"idle","from":"readying","to":"idling"},
]
};
let create = function(){
let fsm = StateMachine.create(fsmData);
fsm.ASYNC = StateMachine.ASYNC;
return fsm;
}
module.exports = {create}