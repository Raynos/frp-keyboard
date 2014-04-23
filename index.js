var Individual = require('individual');
var Delegator = require('dom-delegator');

var Keyboard = require('./keyboard.js');

var keyboardCache = Individual('__FRP_KEYBOARD_CACHE@1', {});

module.exports = CachedKeyboard;

function CachedKeyboard() {
    var keyboard = keyboardCache.keyboard;

    if (!keyboard) {
        var delegator = Delegator();
        keyboard = keyboardCache.keyboard = Keyboard(delegator);
    }

    return keyboard;
}
