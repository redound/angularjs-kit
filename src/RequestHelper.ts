import Condition from "ts-data/lib/Query/Condition";
import Sorter from "ts-data/lib/Query/Sorter";

export interface IRequestOptions {
    offset: number,
    limit: number,
    conditions: Condition[],
    sorters: Sorter[]
}

export class RequestHelper {

    private _fetchItemsCallback: any;
    private _total: number = 0;
    private _items: any;
    private _loading: boolean = false;
    private _conditions: Condition[] = [];
    private _sorters: Sorter[] = [];
    private _offset: number = 0;
    private _limit: number = 10;

    public get loading() {
        return this._loading;
    }

    public get items() {
        return this._items;
    }

    public get total() {
        return this._total;
    }

    public get numPages() {
        return Math.ceil(this.total / this.limit);
    }

    public get limit() {
        return this._limit;
    }

    public get offset() {
        return this._offset;
    }

    public get currentPage() {
        return (this._offset / this._limit) + 1;
    }

    public set currentPage(page) {
        this.page(page);
    }

    public fetchItemsCallback(callback): RequestHelper {

        this._fetchItemsCallback = callback;
        this.reload();
        return this;
    }

    public page(page: number) {

        if (page !== this.currentPage && page > 0 && page <= this.numPages) {
            this._requestPage(page);
        }
    }

    public reload() {

        this._requestPage(this.currentPage);
    }

    public setLoading(loading: boolean = true) {
        this._loading = true;
    }

    public startLoading():this {
        this.setLoading(true);
        return this;
    }

    public stopLoading():this {
        this.setLoading(false);
        return this;
    }

    private _requestPage(page: number): ng.IPromise<any> {

        this.startLoading();

        var offset = (page - 1) * this.limit;

        var options: IRequestOptions = {
            offset: offset,
            limit: this._limit,
            conditions: this._conditions,
            sorters: this._sorters
        };

        return this._fetchItemsCallback(options).then(items => {
            this._offset = offset;
            this._items = items;
            this.stopLoading();

            if (this.total > 0 && this.currentPage > this.numPages) {
                this.page(this.numPages);
            }
        });
    }

    public setTotal(total: number): RequestHelper {
        this._total = total;
        return this;
    }

    public setOffset(offset: number) {
        this._offset = offset;
    }

    public setLimit(limit: number) {
        this._limit = limit;
    }

    public setMultipleConditions(conditions: Condition[]): RequestHelper {
        this._conditions = conditions;
        return this;
    }

    public setMultipleSorters(sorters: Sorter[]): RequestHelper {
        this._sorters = sorters;
        return this;
    }

    public prevPage() {
        this.page(this.currentPage - 1);
    }

    public nextPage() {
        this.page(this.currentPage + 1);
    }
}
