var test = require('tape');

var Keyboard = require('../index.js');

test('Keyboard is a function', function (assert) {
    assert.equal(typeof Keyboard, 'function');
    assert.end();
});

test('isDown', function (assert) {
    var keyboard = Keyboard();
    var keyCode = 50;

    var keyDown = keyboard.isDown(keyCode);

    assert.equal(keyDown(), false);

    assert.end();
});
