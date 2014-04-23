var test = require('tape');

var frpKeyboard = require('../index.js');

test('frpKeyboard is a function', function (assert) {
    assert.equal(typeof frpKeyboard, 'function');
    assert.end();
});
