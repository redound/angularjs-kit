import EventEmitter from "ts-core/lib/Events/EventEmitter";
export declare const UI_ROUTER_EVENTS: {
    STATE_CHANGE_START: string;
    STATE_CHANGE_SUCCESS: string;
    STATE_CHANGE_ERROR: string;
    STATE_NOT_FOUND: string;
};
export declare const STATE_INTERCEPTOR_EVENTS: {
    FIRST_ROUTE: string;
    STATE_CHANGE_START: string;
    ENTERING_AUTHORIZED_AREA: string;
    ENTERING_UNAUTHORIZED_AREA: string;
    ENTERING_PUBLIC_AREA: string;
};
export declare const STATE_ACCESS_LEVELS: {
    PUBLIC: string;
    UNAUTHORIZED: string;
    AUTHORIZED: string;
};
export interface StateChangeEventParamsInterface {
    event: any;
    toState: any;
    toParams: any;
    fromState: any;
    fromParams: any;
}
export default class StateInterceptor {
    protected $rootScope: ng.IRootScopeService;
    static $inject: string[];
    events: EventEmitter;
    private _firstRoute;
    private _lastRoute;
    constructor($rootScope: ng.IRootScopeService);
    init(): void;
    private _attachRouterEvents();
    private _$stateChangeStart(event, toState, toParams, fromState, fromParams);
    getFirstRoute(): any;
}
