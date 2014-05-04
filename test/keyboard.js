var test = require('tape')
var setImmediate = require('timers').setImmediate

var dispatchEvent = require('./lib/dispatch-event.js')
var Keyboard = require('../index.js')
var Position = require('../native.js').Position

test('wasd', function (assert) {
    var keyboard = Keyboard()

    var wasd = keyboard.wasd

    assert.deepEqual(wasd(), new Position(0, 0, 'void'))

    dispatchEvent('keydown', { keyCode: 87 })
    setImmediate(function () {
        assert.deepEqual(wasd(), new Position(0, 1, 'up'))

        dispatchEvent('keyup', { keyCode: 87 })
        dispatchEvent('keydown', { keyCode: 83 })

        setImmediate(function () {
            assert.deepEqual(wasd(), new Position(0, -1, 'down'))

            dispatchEvent('keydown', { keyCode: 65 })

            setImmediate(function () {
                assert.deepEqual(wasd(), new Position(-1, -1, 'left'))

                dispatchEvent('keyup', { keyCode: 65 })
                dispatchEvent('keyup', { keyCode: 83 })

                assert.end()
            })
        })
    })
})

test('arrows', function (assert) {
    var keyboard = Keyboard()

    var arrows = keyboard.arrows

    assert.deepEqual(arrows(), new Position(0, 0, 'void'))

    dispatchEvent('keydown', { keyCode: 38 })
    dispatchEvent('keydown', { keyCode: 38 })

    setImmediate(function () {

        assert.deepEqual(arrows(), new Position(0, 1, 'up'))

        dispatchEvent('keyup', { keyCode: 38 })
        dispatchEvent('keyup', { keyCode: 38 })

        assert.end()
    })
})
