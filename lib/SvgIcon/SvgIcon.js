"use strict";
var SvgIcon = (function () {
    function SvgIcon(el) {
        this.viewBoxSize = 24;
        this.setElement(el);
    }
    SvgIcon.prototype.setElement = function (el) {
        if (el && el.tagName != 'svg') {
            el = angular.element('<svg xmlns="http://www.w3.org/2000/svg">').append(el)[0];
        }
        if (!el.getAttribute('xmlns')) {
            el.setAttribute('xmlns', "http://www.w3.org/2000/svg");
        }
        this.element = el;
        return this;
    };
    SvgIcon.prototype.setViewBoxSize = function (viewBoxSize) {
        this.viewBoxSize = viewBoxSize;
        return this;
    };
    SvgIcon.prototype.prepareAndStyle = function () {
        angular.forEach({
            'fit': '',
            'height': '100%',
            'width': '100%',
            'preserveAspectRatio': 'xMidYMid meet',
            'viewBox': this.element.getAttribute('viewBox') || ('0 0 ' + this.viewBoxSize + ' ' + this.viewBoxSize)
        }, function (val, attr) {
            this.element.setAttribute(attr, val);
        }, this);
    };
    SvgIcon.prototype.cloneSVG = function () {
        return this.element.cloneNode(true);
    };
    return SvgIcon;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SvgIcon;
