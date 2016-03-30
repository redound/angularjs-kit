export interface BootstrapInterface {
    run(module: ng.IModule): void;
}
export default class Bootstrap {
    protected _executables: BootstrapInterface[];
    constructor();
    run(...args: any[]): void;
}
