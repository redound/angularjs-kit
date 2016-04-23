"use strict";
var RequestHelper = (function () {
    function RequestHelper() {
        this._total = 0;
        this._loading = false;
        this._conditions = [];
        this._sorters = [];
        this._offset = 0;
        this._limit = 10;
    }
    Object.defineProperty(RequestHelper.prototype, "loading", {
        get: function () {
            return this._loading;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RequestHelper.prototype, "items", {
        get: function () {
            return this._items;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RequestHelper.prototype, "total", {
        get: function () {
            return this._total;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RequestHelper.prototype, "numPages", {
        get: function () {
            return Math.ceil(this.total / this.limit);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RequestHelper.prototype, "limit", {
        get: function () {
            return this._limit;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RequestHelper.prototype, "offset", {
        get: function () {
            return this._offset;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RequestHelper.prototype, "currentPage", {
        get: function () {
            return (this._offset / this._limit) + 1;
        },
        set: function (page) {
            this.page(page);
        },
        enumerable: true,
        configurable: true
    });
    RequestHelper.prototype.fetchItemsCallback = function (callback) {
        this._fetchItemsCallback = callback;
        this.reload();
        return this;
    };
    RequestHelper.prototype.page = function (page) {
        if (page !== this.currentPage && page > 0 && page <= this.numPages) {
            this._requestPage(page);
        }
    };
    RequestHelper.prototype.reload = function () {
        this._requestPage(this.currentPage);
    };
    RequestHelper.prototype.setLoading = function (loading) {
        if (loading === void 0) { loading = true; }
        this._loading = true;
    };
    RequestHelper.prototype.startLoading = function () {
        this.setLoading(true);
        return this;
    };
    RequestHelper.prototype.stopLoading = function () {
        this.setLoading(false);
        return this;
    };
    RequestHelper.prototype._requestPage = function (page) {
        var _this = this;
        this.startLoading();
        var offset = (page - 1) * this.limit;
        var options = {
            offset: offset,
            limit: this._limit,
            conditions: this._conditions,
            sorters: this._sorters
        };
        return this._fetchItemsCallback(options).then(function (items) {
            _this._offset = offset;
            _this._items = items;
            _this.stopLoading();
            if (_this.total > 0 && _this.currentPage > _this.numPages) {
                _this.page(_this.numPages);
            }
        });
    };
    RequestHelper.prototype.setTotal = function (total) {
        this._total = total;
        return this;
    };
    RequestHelper.prototype.setOffset = function (offset) {
        this._offset = offset;
    };
    RequestHelper.prototype.setLimit = function (limit) {
        this._limit = limit;
    };
    RequestHelper.prototype.setMultipleConditions = function (conditions) {
        this._conditions = conditions;
        return this;
    };
    RequestHelper.prototype.setMultipleSorters = function (sorters) {
        this._sorters = sorters;
        return this;
    };
    RequestHelper.prototype.prevPage = function () {
        this.page(this.currentPage - 1);
    };
    RequestHelper.prototype.nextPage = function () {
        this.page(this.currentPage + 1);
    };
    return RequestHelper;
}());
exports.RequestHelper = RequestHelper;
