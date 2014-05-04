# frp-keyboard

<!--
    [![build status][build-png]][build]
    [![Coverage Status][cover-png]][cover]
    [![Davis Dependency status][dep-png]][dep]
-->

<!-- [![NPM][npm-png]][npm] -->

<!-- [![browser support][test-png]][test] -->

An FRP implementation of Elm.Keyboard in JS

## Example

```js
var Keyboard = require("frp-keyboard");

var keyboard = Keyboard()

keyboard.wasd(function (coords) {
  console.log('x', coords.x, 'y', coords.y)
})

// keys is an Array<Number>
keyboard.keysDown(function (keys) {
  console.log('keys down', keys)
})
```

## Docs

### `var keyboard = Keyboard()`

```ocaml
import { Observ } from 'observ'

type KeyCode := Number
type Direction = 'left' | 'right' | 'up' | 'down' | 'void'
type Coord := {
    x: Number,
    y: Number,
    lastPressed: Direction
}

frp-keyboard := () => {
    arrows: Observ<Coord>,
    wasd: Observ<Coord>,
    ctrl: Observ<Boolean>,
    shift: Observ<Boolean>,
    isDown: (keyCode: KeyCode) => Observ<Boolean>,
    keysDown: Observ<Array<keyCode: KeyCode>>,
    lastPressed: Observ<keyCode: KeyCode>,
    directions: (
        up: KeyCode, down: KeyCode, left: KeyCode, right: KeyCode
    ) => Observ<Coord>
}
```

`Keyboard()` returns a `keyboard` object with a set of
  observables and functions over observables.

A lot of the values in `frp-keyboard` are instances of `Observ`
  from the [`'observ'`][observ] module

#### `keyboard.arrows`

`keyboard.arrows` is an observable that contains the state of
  the arrow keys as a tuple `{ x: Number, y: Number }`

You can read from `keyboard.arrows` by calling it as a function
  with an optional listener function

```js
var currentX = keyboard.arrows().x

keyboard.arrows(function (tuple) {
  console.log('x', tuple.x)
})
```

`keyboard.arrows` also has a `.lastPressed` property on the
  returned co-ordinate so you can determine whether a diagonal
  state of `{ x: 1, y: 1 }` was up, right or right, up

#### `keyboard.wasd`

Just like `keyboard.arrows`, it allows you to read the state of
  the `wasd` keys instead.

#### `keyboard.directions(up, down, left, right)`

If you want to define your own set of direction keys you can
  use the `directions()`. This will return an observable that
  returns the `{ x: Number, y: Number }` tuple.

```js
var hjkl = keyboard.directions(
  74, // j
  75, // k
  72, // h
  76  // l
)

hjkl(function (coords) {
  console.log('coords.x', coords.x, 'coords.y', coords.y)
})
```

#### `keyboard.ctrl` and `keyboard.shift`

`keyboard.ctrl` and `keyboard.shift` are observable booleans
  that tell you whether ctrl and shift are pressed down.

#### `var xDown = keyboard.keyDown(Number)`

`keyDown()` returns an observable boolean that tells you whether
  said key is down.

You pass `keyDown` a numeric value that matches the `keyCode`

You can find a list of what the numeric key codes are 
  [on MDN][mdn]

#### `keyboard.keysDown`

`keysDown` is an observable containing an array of key codes.

The `keysDown` observable represents the lists of keys that
  are currently being pressed down.

```js
var computed = require('observ/computed')
var Keyboard = require('frp-keyboard')
var keyboard = Keyboard()

var keysDown = keyboard.keysDown

var isEnter = computed([keysDown], function (keysDown) {
  return keysDown.some(function (keyCode) {
    return keyCode === 13 // ENTER
  })
})
```

#### `keyboard.lastPressed`

`lastPressed` is an observable that contains the last keycode
  that was pressed by the user.

## Installation

`npm install frp-keyboard`

## Tests

`npm test`

## Contributors

 - Raynos

## MIT Licenced

  [build-png]: https://secure.travis-ci.org/uber/frp-keyboard.png
  [build]: https://travis-ci.org/uber/frp-keyboard
  [cover-png]: https://coveralls.io/repos/uber/frp-keyboard/badge.png
  [cover]: https://coveralls.io/r/uber/frp-keyboard
  [dep-png]: https://david-dm.org/uber/frp-keyboard.png
  [dep]: https://david-dm.org/uber/frp-keyboard
  [test-png]: https://ci.testling.com/uber/frp-keyboard.png
  [tes]: https://ci.testling.com/uber/frp-keyboard
  [npm-png]: https://nodei.co/npm/frp-keyboard.png?stars&downloads
  [npm]: https://nodei.co/npm/frp-keyboard
  [observ]: https://github.com/Raynos/observ
  [mdn]: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent
