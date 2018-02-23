'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var selector = _interopDefault(require('hast-util-select'));

var selectAll = selector.selectAll;


var index = (function (additions) {
    var adders = Object.entries(additions).map(adder);
    return function (node) {
        return adders.forEach(function (a) {
            return a(node);
        });
    };
});

var adder = function adder(_ref) {
    var selector$$1 = _ref[0],
        className = _ref[1];

    var writer = write(className);
    return function (node) {
        return selectAll(selector$$1, node).forEach(writer);
    };
};

var write = function write(className) {
    return function (_ref2) {
        var properties = _ref2.properties;

        if (!properties.className) properties.className = className;else properties.className += ' ' + className;
    };
};

module.exports = index;
