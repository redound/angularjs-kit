"use strict";
var _ = require("underscore");
var Bootstrap = (function () {
    function Bootstrap() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        this._executables = args;
    }
    Bootstrap.prototype.run = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        _.each(this._executables, function (executable) {
            executable.run.apply(executable, args);
        });
    };
    return Bootstrap;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Bootstrap;
