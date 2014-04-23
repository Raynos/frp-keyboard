var value = require('observ');
var computed = require('observ/computed');

var Blurred = {};

module.exports = NativeKeyboard;

function NativeKeyboard(delegator) {
    var downEvents = value(-1);
    var upEvents = value(-1);
    var blurEvents = value(null);

    delegator.addGlobalEventListener('keydown', function (ev) {
        downEvents.set(ev.keyCode);
    });
    delegator.addGlobalEventListener('keyup', function (ev) {
        upEvents.set(ev.keyCode);
    });
    delegator.addGlobalEventListener('blur', function () {
        blurEvents.set(Blurred);
    });

    var keysDown = KeysDown(downEvents, upEvents, blurEvents);

    return {
        isDown: isDown,
        keysDown: keysDown,
        lastPressed: keysDown,
        directions: directions
    };

    function isDown(keyCode) {
        return computed([keysDown], function (keys) {
            return keys.indexOf(keyCode) !== -1;
        });
    }

    function directions(up, down, left, right) {
        return computed([keysDown], function (keys) {
            var x = 0;
            var y = 0;

            for (var i = 0; i < keys.length; i++) {
                var keyCode = keys[i];
                if (keyCode === left) {
                    --x;
                } else if (keyCode === right) {
                    ++x;
                } else if (keyCode === up) {
                    ++y;
                } else if (keyCode === down) {
                    --y;
                }
            }

            return new Position(x, y);
        });
    }
}

function Position(x, y) {
    this.x = x;
    this.y = y;
}

function KeysDown(down, up, blur) {
    var keysDown = value([]);

    down(function (keyCode) {
        var list = keysDown();
        if (list.indexOf(keyCode) !== -1) {
            return;
        }

        list = list.slice();
        list.push(keyCode);
        keysDown.set(list);
    });

    up(function (keyCode) {
        var list = keysDown();
        var index = list.indexOf(keyCode);
        if (index === -1) {
            return;
        }

        list = list.slice();
        list.splice(index, 1);
        keysDown.set(list);
    });

    blur(function () {
        keysDown.set([]);
    });
}
