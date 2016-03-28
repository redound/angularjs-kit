import Dictionary from "ts-core/lib/Data/Dictionary";
export default class SvgIconService {
    protected iconRegistry: Dictionary<string, string>;
    protected $http: ng.IHttpService;
    protected $q: ng.IQService;
    protected $log: ng.ILogService;
    protected $templateCache: ng.ITemplateCacheService;
    protected static URL_REGEX: RegExp;
    protected iconCache: Dictionary<string, HTMLElement>;
    constructor(iconRegistry: Dictionary<string, string>, $http: ng.IHttpService, $q: ng.IQService, $log: ng.ILogService, $templateCache: ng.ITemplateCacheService);
    preloadIcons(ids: string[]): ng.IPromise<any>;
    getIcon(id: string): ng.IPromise<HTMLElement>;
    instant(id: string): HTMLElement;
    loadByURL(url: string): ng.IPromise<HTMLElement>;
    announceNotFound(err: any): ng.IPromise<any>;
    cacheIcon(id: string, icon: HTMLElement): HTMLElement;
}
