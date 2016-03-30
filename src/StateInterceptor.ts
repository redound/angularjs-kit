import EventEmitter from "../typings/browser/definitions/ts-auth/index";

export const UIRouterEvents = {
    STATE_CHANGE_START: '$stateChangeStart',
    STATE_CHANGE_SUCCESS: '$stateChangeSuccess',
    STATE_CHANGE_ERROR: '$stateChangeError',
    STATE_NOT_FOUND: '$stateNotFound'
};

export const StateInterceptorEvents = {
    FIRST_ROUTE: 'firstRoute',
    STATE_CHANGE_START: 'stateChangeStart',
    ENTERING_AUTHORIZED_AREA: 'enteringAuthorizedArea',
    ENTERING_UNAUTHORIZED_AREA: 'enteringUnauthorizedArea',
    ENTERING_PUBLIC_AREA: 'enteringPublicArea'
};

export const StateAccessLevels = {
    PUBLIC: 'public',
    UNAUTHORIZED: 'unauthorized',
    AUTHORIZED: 'authorized'
};

export interface StateChangeEventParamsInterface {
    event:any,
    toState:any,
    toParams:any,
    fromState:any,
    fromParams:any
}

export default class StateInterceptor {

    static $inject = ['$rootScope'];

    public events:EventEmitter = new EventEmitter();
    private _firstRoute:any = null;
    private _lastRoute:any = null;

    constructor(protected $rootScope:ng.IRootScopeService) {

    }

    public init() {
        this._attachRouterEvents();
    }

    private _attachRouterEvents() {
        this.$rootScope.$on(UIRouterEvents.STATE_CHANGE_START, _.bind(this._$stateChangeStart, this));
    }

    private _$stateChangeStart(event, toState:any, toParams, fromState:any, fromParams) {

        var params:StateChangeEventParamsInterface = {
            event: event,
            toState: toState,
            toParams: toParams,
            fromState: fromState,
            fromParams: fromParams
        };

        if (!fromState || fromState.accessLevel !== toState.accessLevel) {

            var eventName;

            /**
             * Here we trigger events based on which
             * area the user is going to enter
             */
            switch (toState.accessLevel) {

                case StateAccessLevels.AUTHORIZED:
                    eventName = StateInterceptorEvents.ENTERING_AUTHORIZED_AREA;
                    break;
                case StateAccessLevels.PUBLIC:
                    eventName = StateInterceptorEvents.ENTERING_PUBLIC_AREA;
                    break;
                default:
                case StateAccessLevels.UNAUTHORIZED:
                    eventName = StateInterceptorEvents.ENTERING_UNAUTHORIZED_AREA;
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
            this.events.trigger(StateInterceptorEvents.FIRST_ROUTE, params);
        }

        this.events.trigger(StateInterceptorEvents.STATE_CHANGE_START, params);
    }

    public getFirstRoute() {
        return this._firstRoute;
    }
