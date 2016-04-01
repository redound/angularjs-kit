"use strict";
var Dictionary_1 = require("ts-core/lib/Data/Dictionary");
var SvgIcon_1 = require("./SvgIcon");
var _ = require("underscore");
var SvgIconService = (function () {
    function SvgIconService(iconRegistry, $http, $q, $log, $templateCache) {
        this.iconRegistry = iconRegistry;
        this.$http = $http;
        this.$q = $q;
        this.$log = $log;
        this.$templateCache = $templateCache;
        this.iconCache = new Dictionary_1.default();
    }
    SvgIconService.prototype.preloadIcons = function (ids) {
        var _this = this;
        var promises = _.map(ids, function (id) {
            return _this.getIcon(id);
        });
        return this.$q.all(promises);
    };
    SvgIconService.prototype.getIcon = function (id) {
        var _this = this;
        if (this.iconCache.contains(id)) {
            return this.$q.when(this.iconCache.get(id));
        }
        var url;
        if (this.iconRegistry.contains(id)) {
            url = this.iconRegistry.get(id);
        }
        if (SvgIconService.URL_REGEX.test(url)) {
            return this.loadByURL(url).then(function (icon) {
                _this.cacheIcon(id, icon);
                return icon;
            });
        }
        return this.$q.reject();
    };
    SvgIconService.prototype.instant = function (id) {
        if (this.iconCache.contains(id)) {
            return this.iconCache.get(id);
        }
        return null;
    };
    SvgIconService.prototype.loadByURL = function (url) {
        return this.$http
            .get(url, {
            cache: this.$templateCache
        })
            .then(function (response) {
            return angular.element('<div>').append(response.data).find('svg')[0];
        }).catch(this.announceNotFound);
    };
    SvgIconService.prototype.announceNotFound = function (err) {
        var msg = angular.isString(err) ? err : (err.message || err.data || err.statusText);
        this.$log.warn(msg);
        return this.$q.reject(msg);
    };
    SvgIconService.prototype.cacheIcon = function (id, icon) {
        var svgIcon = new SvgIcon_1.default(icon);
        svgIcon.prepareAndStyle();
        var cloned = svgIcon.cloneSVG();
        this.iconCache.set(id, cloned);
        return cloned;
    };
    SvgIconService.URL_REGEX = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/i;
    return SvgIconService;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SvgIconService;
