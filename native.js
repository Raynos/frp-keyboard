var value = require('observ');
// var computed = require('observ/computed');

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
        lastPressed: downEvents,
        directions: directions
    };

    function isDown(keyCode) {
        var isDownNow = keysDown().indexOf(keyCode) !== -1;
        var down = value(isDownNow)

        keysDown(function (keys) {
            var isDown = keys.indexOf(keyCode) !== -1
            if (isDown !== down()) {
                down.set(isDown)
            }
        })

        return down
    }

    function directions(up, down, left, right) {
        function computePosition(keys) {
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
        }

        var dir = value(computePosition(keysDown()))

        keysDown(function (keys) {
            var pos = computePosition(keys)
            var currPos = dir()

            if (pos.x !== currPos.x || pos.y !== currPos.y) {
                dir.set(pos)
            }
        })

        return dir
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

    return keysDown;
}
