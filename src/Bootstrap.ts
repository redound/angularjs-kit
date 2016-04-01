import * as _ from "underscore";

export interface BootstrapInterface {
    run(module: ng.IModule): void;
}

export default class Bootstrap {

    protected _executables: BootstrapInterface[];

    public constructor(...args) {
        this._executables = <any>args;
    }

    public run(...args) {
        _.each(this._executables, (executable: BootstrapInterface) => {
            executable.run.apply(executable, args);
        });
    }
}
