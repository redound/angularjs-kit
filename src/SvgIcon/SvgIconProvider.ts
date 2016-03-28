import Dictionary from "ts-core/lib/Data/Dictionary";
import SvgIconService from "./SvgIconService";

export default class SvgIconProvider {

    public defaultViewBoxSize:number = 24;

    public iconRegistry:Dictionary<string, string> = new Dictionary<string, string>();

    public $get = ['$http', '$q', '$log', '$templateCache', ($http, $q, $log, $templateCache) => {
        return new SvgIconService(this.iconRegistry, $http, $q, $log, $templateCache);
    }];

    public icon(id:string, path:string):SvgIconProvider {
        this.iconRegistry.set(id, path);
        return this;
    }
}
