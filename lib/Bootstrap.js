"use strict";
var Bootstrap = (function () {
    function Bootstrap() {
        this._executables = arguments;
    }
    Bootstrap.prototype.run = function () {
        var args = arguments;
        _.each(this._executables, function (executable) {
            executable.run.apply(executable, args);
        });
    };
    return Bootstrap;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Bootstrap;
