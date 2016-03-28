import Dictionary from "ts-core/lib/Data/Dictionary";
import SvgIconService from "./SvgIconService";
export default class SvgIconProvider {
    defaultViewBoxSize: number;
    iconRegistry: Dictionary<string, string>;
    $get: (string | (($http: any, $q: any, $log: any, $templateCache: any) => SvgIconService))[];
    icon(id: string, path: string): SvgIconProvider;
}
