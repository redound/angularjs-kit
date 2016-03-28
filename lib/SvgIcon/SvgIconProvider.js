"use strict";
var Dictionary_1 = require("ts-core/lib/Data/Dictionary");
var SvgIconService_1 = require("./SvgIconService");
var SvgIconProvider = (function () {
    function SvgIconProvider() {
        var _this = this;
        this.defaultViewBoxSize = 24;
        this.iconRegistry = new Dictionary_1.default();
        this.$get = ['$http', '$q', '$log', '$templateCache', function ($http, $q, $log, $templateCache) {
                return new SvgIconService_1.default(_this.iconRegistry, $http, $q, $log, $templateCache);
            }];
    }
    SvgIconProvider.prototype.icon = function (id, path) {
        this.iconRegistry.set(id, path);
        return this;
    };
    return SvgIconProvider;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SvgIconProvider;
