var test = require('tape');
var setImmediate = require('timers').setImmediate;

var dispatchEvent = require('./lib/dispatch-event.js');
var Keyboard = require('../index.js');
var Position = require('../native.js').Position;

test('isDown for keyCode=50', function (assert) {
    var keyboard = Keyboard();
    var keyCode = 50;

    var keyDown = keyboard.isDown(keyCode);

    assert.equal(keyDown(), false);

    dispatchEvent('keydown', { keyCode: keyCode });

    setImmediate(function () {
        assert.equal(keyDown(), true);

        dispatchEvent('keyup', { keyCode: keyCode });

        setImmediate(function () {
            assert.equal(keyDown(), false);

            assert.end();
        });
    });
});

test('isDown for keyCode=51', function (assert) {
    var keyboard = Keyboard();
    var keyCode = 51;

    var keyDown = keyboard.isDown(50);

    assert.equal(keyDown(), false);

    dispatchEvent('keydown', { keyCode: keyCode });

    setImmediate(function () {
        assert.equal(keyDown(), false);

        dispatchEvent('keyup', { keyCode: keyCode });

        setImmediate(function () {
            assert.equal(keyDown(), false);

            assert.end();
        });
    });
});

test('keysDown', function (assert) {
    var keyboard = Keyboard();

    var keysDown = keyboard.keysDown;

    assert.deepEqual(keysDown(), []);

    dispatchEvent('keydown', { keyCode: 50 });
    dispatchEvent('keydown', { keyCode: 51 });


    setImmediate(function () {
        assert.deepEqual(keysDown(), [50, 51]);

        dispatchEvent('keydown', { keyCode: 52 });

        setImmediate(function () {
            assert.deepEqual(keysDown(), [50, 51, 52]);

            dispatchEvent('keyup', { keyCode: 51 });

            setImmediate(function () {
                assert.deepEqual(keysDown(), [50, 52]);

                dispatchEvent('keyup', { keyCode: 50 });
                dispatchEvent('keyup', { keyCode: 52 });


                setImmediate(function () {
                    assert.deepEqual(keysDown(), []);

                    assert.end();
                });
            });
        });
    });
});

test('lastPressed', function (assert) {
    var keyboard = Keyboard();

    var lastPressed = keyboard.lastPressed;

    dispatchEvent('keydown', { keyCode: 102 });

    setImmediate(function () {
        assert.equal(lastPressed(), 102);

        dispatchEvent('keydown', { keyCode: 105 });

        setImmediate(function () {
            assert.equal(lastPressed(), 105);

            dispatchEvent('keyup', { keyCode: 102 });
            dispatchEvent('keyup', { keyCode: 105 });

            setImmediate(function () {
                assert.end();
            });
        });
    });
});

test('directions', function (assert) {
    var keyboard = Keyboard();

    var dirs = keyboard.directions(1, 2, 3, 4);

    assert.deepEqual(dirs(), new Position(0, 0, 'void'));

    dispatchEvent('keydown', { keyCode: 1 });

    setImmediate(function () {
        assert.deepEqual(dirs(), new Position(0, 1, 'up'));

        dispatchEvent('keyup', { keyCode: 1 });
        dispatchEvent('keydown', { keyCode: 2 });

        setImmediate(function () {
            assert.deepEqual(dirs(), new Position(0, -1, 'down'));

            dispatchEvent('keydown', { keyCode: 4 });

            setImmediate(function () {
                assert.deepEqual(dirs(), new Position(1, -1, 'right'));

                dispatchEvent('keyup', { keyCode: 4 });
                dispatchEvent('keyup', { keyCode: 2 });

                setImmediate(function () {
                    assert.deepEqual(dirs(), new Position(0, 0, 'void'));

                    assert.end();
                });
            });
        });
    });
});
