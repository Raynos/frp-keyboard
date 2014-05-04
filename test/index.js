var test = require('tape');

var Keyboard = require('../index.js');

test('Keyboard is a function', function (assert) {
    assert.equal(typeof Keyboard, 'function');
    assert.end();
});

require('./native.js');
require('./keyboard.js')
