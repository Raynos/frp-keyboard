import { Observ } from 'observ'
import { Delegator } from 'dom-delegator'

type KeyCode := Number

type NativeKeyboard := {
    isDown: (keyCode: KeyCode) => Observ<Boolean>,
    keysDown: Observ<Array<keyCode: KeyCode>>,
    lastPressed: Observ<keyCode: KeyCode>,
    directions: (
        up: KeyCode, down: KeyCode, left: KeyCode, right: KeyCode
    ) => Observ<{ x: Number, y: Number }>
}

type Keyboard := NativeKeyboard & {
    arrows: Observ<{ x: Number, y: Number }>,
    wasd: Observ<{ x: Number, y: Number }>,
    ctrl: Observ<Boolean>,
    shift: Observ<Boolean>
}

frp-keyboard := () => cachedKeyboard: Keyboard

frp-keyboard/keyboard := (Delegator) => Keyboard

frp-keyboard/native := (Delegator) => NativeKeyboard
