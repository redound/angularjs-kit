export interface BootstrapInterface {
    run(module: ng.IModule): void;
}

export default class Bootstrap {

    protected _executables: BootstrapInterface[];

    public constructor() {
        this._executables = <any>arguments;
    }

    public run(...args) {
        _.each(this._executables, (executable: BootstrapInterface) => {
            executable.run.apply(executable, args);
        });
    }
}
