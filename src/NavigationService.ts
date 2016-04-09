import Logger from "ts-core/lib/Logger/Logger";
import AuthManager from "ts-auth/lib/Manager";
import HttpInterceptor, {HttpRequestParamsInterface, HTTP_INTERCEPTOR_EVENTS} from "./HttpInterceptor";
import {Event} from "ts-core/lib/Events/EventEmitter";
import {
    STATE_INTERCEPTOR_EVENTS,
    StateChangeEventParamsInterface,
    default as StateInterceptor
} from "./StateInterceptor";

export default class NavigationService {

    protected redirectUnauthorizedState:string;
    protected redirectAuthorizedState:string;

    public static $inject = ['$rootScope', '$state', '$translate', 'config', 'logger', 'toastrService', 'httpInterceptor', 'stateInterceptor', 'authManager'];

    public constructor(protected $rootScope,
                       protected $state,
                       protected $translate,
                       protected config,
                       protected logger:Logger,
                       protected toastrService,
                       protected httpInterceptor:HttpInterceptor,
                       protected stateInterceptor:StateInterceptor,
                       protected authManager:AuthManager) {

        this.logger = this.logger.child('NavigationService');
    }

    public init() {

        this._attachEvents();
    }

    public setRedirectUnauthorizedState(state:string):this {
        this.redirectUnauthorizedState = state;
        return this;
    }

    public setRedirectAuthorizedState(state:string):this {
        this.redirectAuthorizedState = state;
        return this;
    }

    protected _attachEvents() {

        this.httpInterceptor.events.on(HTTP_INTERCEPTOR_EVENTS.REQUEST, this._httpRequest, this);
        this.httpInterceptor.events.on(HTTP_INTERCEPTOR_EVENTS.RESPONSE_401_ERROR, this._httpResponse401Error, this);

        this.stateInterceptor.events.on(STATE_INTERCEPTOR_EVENTS.STATE_CHANGE_START, this._stateChangeStart, this);
        this.stateInterceptor.events.on(STATE_INTERCEPTOR_EVENTS.FIRST_ROUTE, this._firstRoute, this);
        this.stateInterceptor.events.on(STATE_INTERCEPTOR_EVENTS.ENTERING_UNAUTHORIZED_AREA, this._enteringUnauthorizedArea, this);
        this.stateInterceptor.events.on(STATE_INTERCEPTOR_EVENTS.ENTERING_AUTHORIZED_AREA, this._enteringAuthorizedArea, this);
    }

    protected _firstRoute() {

        /**
         * User refreshed but still has a session
         */
        if (this.stateInterceptor.getFirstRoute() && this.authManager.loggedIn()) {
            this.toastrService.info(this.$translate.instant('NOTIFICATIONS.SESSION_RESUMED'));
        }
    }

    protected _stateChangeStart(evt:Event<StateChangeEventParamsInterface>) {

        /**
         * If this route has a redirect specified
         * we redirect the user to the give state
         */
        if (evt.params.toState.redirectTo) {

            evt.params.event.preventDefault();

            this.logger.warn('Performing redirect to ' + evt.params.toState.redirectTo);
            this.$state.transitionTo(evt.params.toState.redirectTo);
        }
    }

    /**
     * Log requests for debugging purpose
     * @param evt
     * @protected
     */
    protected _httpRequest(evt:Event<HttpRequestParamsInterface>) {
        this.logger.log('Requesting ' + evt.params.config.method + ' ' + evt.params.config.url, evt.params.config);
    }

    /**
     * There has been an 401 response
     * indicating the user is trying to access
     * unauthorized data. Here we want to logout the user redirect
     * to the login page.
     * @protected
     */
    protected _httpResponse401Error() {

        this.authManager.logout().then(() => {

            this.toastrService.info(this.$translate.instant('NOTIFICATIONS.SESSION_EXPIRED'));

            // Redirect unauthorized
            this.$state.go(this.redirectUnauthorizedState);
        });
    }

    /**
     * Prevent users going to areas like
     * login area when already logged in.
     *
     * @param event
     * @protected
     */
    protected _enteringUnauthorizedArea(event:Event<StateChangeEventParamsInterface>) {

        this.logger.warn('Entering unauthorized area');

        if (this.authManager.loggedIn()) {

            // Prevent going to state
            event.params.event.preventDefault();

            // Redirect authorized
            this.$state.transitionTo(this.redirectAuthorizedState);
        }
    }

    /**
     * Prevents users going to restricted
     * areas when they haven't logged in yet.
     *
     * @param event
     * @protected
     */
    protected _enteringAuthorizedArea(event:Event<StateChangeEventParamsInterface>) {

        this.logger.warn('Entering authorized area');

        if (!this.authManager.loggedIn()) {

            // Prevent going to state
            event.params.event.preventDefault();

            // Remember the toState
            var requestedUrl = this.$state.href(event.params.toState, event.params.toParams);

            // Redirect unauthorized
            this.$state.transitionTo(this.redirectUnauthorizedState, {
                requestedUrl: requestedUrl
            });
        }
    }
}
