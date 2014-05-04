var NativeKeyboard = require('./native.js');

var ARROW_UP = 38;
var ARROW_DOWN = 40;
var ARROW_LEFT = 37;
var ARROW_RIGHT = 39;
var W_KEY = 87;
var S_KEY = 83;
var A_KEY = 65;
var D_KEY = 68;
var CTRL_KEY = 17;
var SHIFT_KEY = 16;

module.exports = Keyboard;

function Keyboard(delegator) {
    var native = NativeKeyboard(delegator);

    return {
        isDown: native.isDown,
        keysDown: native.keysDown,
        lastPressed: native.lastPressed,
        keyDown: native.keyDown,
        directions: native.directions,
        arrows: native.directions(
            ARROW_UP, ARROW_DOWN, ARROW_LEFT, ARROW_RIGHT),
        wasd: native.directions(W_KEY, S_KEY, A_KEY, D_KEY),
        ctrl: native.isDown(CTRL_KEY),
        shift: native.isDown(SHIFT_KEY)
    };
}
