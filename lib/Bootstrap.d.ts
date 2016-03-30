export interface BootstrapInterface {
    run(module: ng.IModule): void;
}
export default class Bootstrap {
    protected _executables: BootstrapInterface[];
    constructor(...args: any[]);
    run(...args: any[]): void;
}
