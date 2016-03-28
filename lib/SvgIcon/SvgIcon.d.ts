export default class SvgIcon {
    element: HTMLElement;
    viewBoxSize: number;
    constructor(el: HTMLElement);
    setElement(el: HTMLElement): SvgIcon;
    setViewBoxSize(viewBoxSize: number): SvgIcon;
    prepareAndStyle(): void;
    cloneSVG(): HTMLElement;
}
