import SvgIconService from "./SvgIconService";
export default class SvgIconDirective {
    protected svgIconService: SvgIconService;
    restrict: string;
    constructor(svgIconService: SvgIconService);
    link: (scope: any, element: any, attr: any) => void;
}
