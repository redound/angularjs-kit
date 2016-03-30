import EventEmitter from "ts-core/lib/Events/EventEmitter";

export const HttpInterceptorEvents = {
    REQUEST: 'httpRequest',
    REQUEST_ERROR: 'httpRequestError',
    RESPONSE: 'httpResponse',
    RESPONSE_ERROR: 'httpResponseError',
    RESPONSE_500_ERRORS: 'httpResponse500Errors',
    RESPONSE_401_ERROR: 'httpResponseError404'
};

export interface HttpErrorParamsInterface {
    rejection:any;
}

export interface HttpRequestParamsInterface {
    config:any;
}

export interface HttpResponseParamsInterface {
    response:any;
}

export interface HttpRequestErrorParamsInterface extends HttpErrorParamsInterface {
}

export interface HttpResponseErrorParamsInterface extends HttpErrorParamsInterface {
}

export interface HttpResponse500ErrorsParamsInterface extends HttpErrorParamsInterface {
}

export interface HttpResponseError401Interface extends HttpErrorParamsInterface {
}

export default class HttpInterceptor {

    public static $inject = ['$q'];

    public events:EventEmitter = new EventEmitter();

    constructor(protected $q:any) {

    }

    public request = (config) => {

        this.events.trigger(HttpInterceptorEvents.REQUEST, {config: config});
        return config;
    };

    public requestError = (rejection) => {

        this.events.trigger(HttpInterceptorEvents.REQUEST_ERROR, {rejection: rejection});
        return this.$q.reject(rejection);
    };

    public response = (response) => {

        this.events.trigger(HttpInterceptorEvents.RESPONSE, {response: response});
        return response;
    };

    public responseError = (rejection) => {

        this.events.trigger(HttpInterceptorEvents.RESPONSE_ERROR, {rejection: rejection});

        /**
         * eg 503, 501, etc. server errors.
         */
        if (rejection.status === 0 || String(rejection.status).charAt(0) === '5') {
            this.events.trigger(HttpInterceptorEvents.RESPONSE_500_ERRORS, {rejection: rejection});
        }

        /**
         * Handle the case where the user is not authenticated
         */
        if (rejection.status === 401) {
            this.events.trigger(HttpInterceptorEvents.RESPONSE_401_ERROR, {rejection: rejection});
        }

        return this.$q.reject(rejection);
    };
}
