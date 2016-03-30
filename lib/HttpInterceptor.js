"use strict";
var EventEmitter_1 = require("ts-core/lib/Events/EventEmitter");
exports.HTTP_INTERCEPTOR_EVENTS = {
    REQUEST: 'httpRequest',
    REQUEST_ERROR: 'httpRequestError',
    RESPONSE: 'httpResponse',
    RESPONSE_ERROR: 'httpResponseError',
    RESPONSE_500_ERRORS: 'httpResponse500Errors',
    RESPONSE_401_ERROR: 'httpResponseError404'
};
var HttpInterceptor = (function () {
    function HttpInterceptor($q) {
        var _this = this;
        this.$q = $q;
        this.events = new EventEmitter_1.default();
        this.request = function (config) {
            _this.events.trigger(exports.HTTP_INTERCEPTOR_EVENTS.REQUEST, { config: config });
            return config;
        };
        this.requestError = function (rejection) {
            _this.events.trigger(exports.HTTP_INTERCEPTOR_EVENTS.REQUEST_ERROR, { rejection: rejection });
            return _this.$q.reject(rejection);
        };
        this.response = function (response) {
            _this.events.trigger(exports.HTTP_INTERCEPTOR_EVENTS.RESPONSE, { response: response });
            return response;
        };
        this.responseError = function (rejection) {
            _this.events.trigger(exports.HTTP_INTERCEPTOR_EVENTS.RESPONSE_ERROR, { rejection: rejection });
            if (rejection.status === 0 || String(rejection.status).charAt(0) === '5') {
                _this.events.trigger(exports.HTTP_INTERCEPTOR_EVENTS.RESPONSE_500_ERRORS, { rejection: rejection });
            }
            if (rejection.status === 401) {
                _this.events.trigger(exports.HTTP_INTERCEPTOR_EVENTS.RESPONSE_401_ERROR, { rejection: rejection });
            }
            return _this.$q.reject(rejection);
        };
    }
    HttpInterceptor.$inject = ['$q'];
    return HttpInterceptor;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = HttpInterceptor;
