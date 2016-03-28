"use strict";
var SvgIconDirective = (function () {
    function SvgIconDirective(svgIconService) {
        var _this = this;
        this.svgIconService = svgIconService;
        this.restrict = 'A';
        this.link = function (scope, element, attr) {
            var attrName = attr.$normalize(attr.$attr.svgIcon || '');
            if (attrName) {
                attr.$observe(attrName, function (attrVal) {
                    element.empty();
                    if (attrVal) {
                        _this.svgIconService.getIcon(attrVal)
                            .then(function (svg) {
                            element.empty();
                            element.append(svg);
                        });
                    }
                });
            }
        };
    }
    return SvgIconDirective;
}());
exports.SvgIconDirective = SvgIconDirective;
