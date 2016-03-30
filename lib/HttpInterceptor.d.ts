import EventEmitter from "ts-core/lib/Events/EventEmitter";
export declare const HTTP_INTERCEPTOR_EVENTS: {
    REQUEST: string;
    REQUEST_ERROR: string;
    RESPONSE: string;
    RESPONSE_ERROR: string;
    RESPONSE_500_ERRORS: string;
    RESPONSE_401_ERROR: string;
};
export interface HttpErrorParamsInterface {
    rejection: any;
}
export interface HttpRequestParamsInterface {
    config: any;
}
export interface HttpResponseParamsInterface {
    response: any;
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
    protected $q: any;
    static $inject: string[];
    events: EventEmitter;
    constructor($q: any);
    request: (config: any) => any;
    requestError: (rejection: any) => any;
    response: (response: any) => any;
    responseError: (rejection: any) => any;
}
