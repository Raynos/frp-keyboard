var DOMEvent = require('synthetic-dom-events');
var document = require('global/document');

module.exports = dispatchEvent;

function dispatchEvent(type, attrs) {
    attrs = attrs || {};
    attrs.bubbles = true;

    var ev = DOMEvent(type, attrs);
    document.documentElement.dispatchEvent(ev);
}
