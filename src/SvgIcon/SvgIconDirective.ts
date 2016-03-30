import SvgIconService from "./SvgIconService";

export default class SvgIconDirective {

    public restrict:string = 'A';

    public constructor(protected svgIconService:SvgIconService) {

    }

    public link = (scope, element, attr) => {

        var attrName = attr.$normalize(attr.$attr.svgIcon || '');

        if (attrName) {

            // Use either pre-configured SVG or URL source, respectively.
            attr.$observe(attrName, (attrVal) => {

                element.empty();
                if (attrVal) {
                    this.svgIconService.getIcon(attrVal)
                        .then(function (svg) {
                            element.empty();
                            element.append(svg);
                        });
                }

            });
        }
    }
}
