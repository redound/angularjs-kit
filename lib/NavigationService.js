"use strict";
var HttpInterceptor_1 = require("./HttpInterceptor");
var StateInterceptor_1 = require("./StateInterceptor");
var NavigationService = (function () {
    function NavigationService($rootScope, $state, $translate, config, logger, toastrService, httpInterceptor, stateInterceptor, authManager) {
        this.$rootScope = $rootScope;
        this.$state = $state;
        this.$translate = $translate;
        this.config = config;
        this.logger = logger;
        this.toastrService = toastrService;
        this.httpInterceptor = httpInterceptor;
        this.stateInterceptor = stateInterceptor;
        this.authManager = authManager;
        this.logger = this.logger.child('NavigationService');
    }
    NavigationService.prototype.init = function () {
        this._attachEvents();
    };
    NavigationService.prototype.setRedirectUnauthorizedState = function (state) {
        this.redirectUnauthorizedState = state;
        return this;
    };
    NavigationService.prototype.setRedirectAuthorizedState = function (state) {
        this.redirectAuthorizedState = state;
        return this;
    };
    NavigationService.prototype._attachEvents = function () {
        this.httpInterceptor.events.on(HttpInterceptor_1.HTTP_INTERCEPTOR_EVENTS.REQUEST, this._httpRequest, this);
        this.httpInterceptor.events.on(HttpInterceptor_1.HTTP_INTERCEPTOR_EVENTS.RESPONSE_401_ERROR, this._httpResponse401Error, this);
        this.stateInterceptor.events.on(StateInterceptor_1.STATE_INTERCEPTOR_EVENTS.STATE_CHANGE_START, this._stateChangeStart, this);
        this.stateInterceptor.events.on(StateInterceptor_1.STATE_INTERCEPTOR_EVENTS.FIRST_ROUTE, this._firstRoute, this);
        this.stateInterceptor.events.on(StateInterceptor_1.STATE_INTERCEPTOR_EVENTS.ENTERING_UNAUTHORIZED_AREA, this._enteringUnauthorizedArea, this);
        this.stateInterceptor.events.on(StateInterceptor_1.STATE_INTERCEPTOR_EVENTS.ENTERING_AUTHORIZED_AREA, this._enteringAuthorizedArea, this);
    };
    NavigationService.prototype._firstRoute = function () {
        if (this.stateInterceptor.getFirstRoute() && this.authManager.loggedIn()) {
            this.toastrService.info(this.$translate.instant('NOTIFICATIONS.SESSION_RESUMED'));
        }
    };
    NavigationService.prototype._stateChangeStart = function (evt) {
        if (evt.params.toState.redirectTo) {
            evt.params.event.preventDefault();
            this.logger.warn('Performing redirect to ' + evt.params.toState.redirectTo);
            this.$state.transitionTo(evt.params.toState.redirectTo);
        }
    };
    NavigationService.prototype._httpRequest = function (evt) {
        this.logger.log('Requesting ' + evt.params.config.method + ' ' + evt.params.config.url, evt.params.config);
    };
    NavigationService.prototype._httpResponse401Error = function () {
        var _this = this;
        this.authManager.logout().then(function () {
            _this.toastrService.info(_this.$translate.instant('NOTIFICATIONS.SESSION_EXPIRED'));
            _this.$state.go(_this.redirectUnauthorizedState);
        });
    };
    NavigationService.prototype._enteringUnauthorizedArea = function (event) {
        this.logger.warn('Entering unauthorized area');
        if (this.authManager.loggedIn()) {
            event.params.event.preventDefault();
            this.$state.transitionTo(this.redirectAuthorizedState);
        }
    };
    NavigationService.prototype._enteringAuthorizedArea = function (event) {
        this.logger.warn('Entering authorized area');
        if (!this.authManager.loggedIn()) {
            event.params.event.preventDefault();
            var requestedUrl = this.$state.href(event.params.toState, event.params.toParams);
            this.$state.transitionTo(this.redirectUnauthorizedState, {
                requestedUrl: requestedUrl
            });
        }
    };
    NavigationService.$inject = ['$rootScope', '$state', '$translate', 'config', 'logger', 'toastrService', 'httpInterceptor', 'stateInterceptor', 'authManager'];
    return NavigationService;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = NavigationService;
