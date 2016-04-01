"use strict";
var EventEmitter_1 = require("ts-core/lib/Events/EventEmitter");
var _ = require("underscore");
exports.UI_ROUTER_EVENTS = {
    STATE_CHANGE_START: '$stateChangeStart',
    STATE_CHANGE_SUCCESS: '$stateChangeSuccess',
    STATE_CHANGE_ERROR: '$stateChangeError',
    STATE_NOT_FOUND: '$stateNotFound'
};
exports.STATE_INTERCEPTOR_EVENTS = {
    FIRST_ROUTE: 'firstRoute',
    STATE_CHANGE_START: 'stateChangeStart',
    ENTERING_AUTHORIZED_AREA: 'enteringAuthorizedArea',
    ENTERING_UNAUTHORIZED_AREA: 'enteringUnauthorizedArea',
    ENTERING_PUBLIC_AREA: 'enteringPublicArea'
};
exports.STATE_ACCESS_LEVELS = {
    PUBLIC: 'public',
    UNAUTHORIZED: 'unauthorized',
    AUTHORIZED: 'authorized'
};
var StateInterceptor = (function () {
    function StateInterceptor($rootScope) {
        this.$rootScope = $rootScope;
        this.events = new EventEmitter_1.default();
        this._firstRoute = null;
        this._lastRoute = null;
    }
    StateInterceptor.prototype.init = function () {
        this._attachRouterEvents();
    };
    StateInterceptor.prototype._attachRouterEvents = function () {
        this.$rootScope.$on(exports.UI_ROUTER_EVENTS.STATE_CHANGE_START, _.bind(this._$stateChangeStart, this));
    };
    StateInterceptor.prototype._$stateChangeStart = function (event, toState, toParams, fromState, fromParams) {
        var params = {
            event: event,
            toState: toState,
            toParams: toParams,
            fromState: fromState,
            fromParams: fromParams
        };
        if (!fromState || fromState.accessLevel !== toState.accessLevel) {
            var eventName;
            switch (toState.accessLevel) {
                case exports.STATE_ACCESS_LEVELS.AUTHORIZED:
                    eventName = exports.STATE_INTERCEPTOR_EVENTS.ENTERING_AUTHORIZED_AREA;
                    break;
                case exports.STATE_ACCESS_LEVELS.PUBLIC:
                    eventName = exports.STATE_INTERCEPTOR_EVENTS.ENTERING_PUBLIC_AREA;
                    break;
                default:
                case exports.STATE_ACCESS_LEVELS.UNAUTHORIZED:
                    eventName = exports.STATE_INTERCEPTOR_EVENTS.ENTERING_UNAUTHORIZED_AREA;
                    break;
            }
            this.events.trigger(eventName, params);
        }
        this._lastRoute = {
            toState: toState,
            toParams: toParams
        };
        if (!this._firstRoute) {
            this._firstRoute = this._lastRoute;
            this.events.trigger(exports.STATE_INTERCEPTOR_EVENTS.FIRST_ROUTE, params);
        }
        this.events.trigger(exports.STATE_INTERCEPTOR_EVENTS.STATE_CHANGE_START, params);
    };
    StateInterceptor.prototype.getFirstRoute = function () {
        return this._firstRoute;
    };
    StateInterceptor.$inject = ['$rootScope'];
    return StateInterceptor;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = StateInterceptor;
