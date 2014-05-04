var test = require('tape')
var setImmediate = require('timers').setImmediate

var dispatchEvent = require('./lib/dispatch-event.js')
var Keyboard = require('../index.js')

test('wasd', function (assert) {
    var keyboard = Keyboard()

    var wasd = keyboard.wasd

    assert.deepEqual(wasd(), { x: 0, y: 0 })

    dispatchEvent('keydown', { keyCode: 87 })
    setImmediate(function () {
        assert.deepEqual(wasd(), { y: 1, x: 0 })

        dispatchEvent('keyup', { keyCode: 87 })
        dispatchEvent('keydown', { keyCode: 83 })

        setImmediate(function () {
            assert.deepEqual(wasd(), { x: 0, y: -1 })

            dispatchEvent('keydown', { keyCode: 65 })

            setImmediate(function () {
                assert.deepEqual(wasd(), { x: -1, y: -1 })

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

    assert.deepEqual(arrows(), { x: 0, y: 0 })

    dispatchEvent('keydown', { keyCode: 38 })
    dispatchEvent('keydown', { keyCode: 38 })

    setImmediate(function () {

        assert.deepEqual(arrows(), { x: 0, y: 1 })

        dispatchEvent('keyup', { keyCode: 38 })
        dispatchEvent('keyup', { keyCode: 38 })

        assert.end()
    })
})
