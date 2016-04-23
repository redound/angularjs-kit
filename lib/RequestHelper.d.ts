import Condition from "ts-data/lib/Query/Condition";
import Sorter from "ts-data/lib/Query/Sorter";
export interface IRequestOptions {
    offset: number;
    limit: number;
    conditions: Condition[];
    sorters: Sorter[];
}
export declare class RequestHelper {
    private _fetchItemsCallback;
    private _total;
    private _items;
    private _loading;
    private _conditions;
    private _sorters;
    private _offset;
    private _limit;
    loading: boolean;
    items: any;
    total: number;
    numPages: number;
    limit: number;
    offset: number;
    currentPage: number;
    fetchItemsCallback(callback: any): RequestHelper;
    page(page: number): void;
    reload(): void;
    setLoading(loading?: boolean): void;
    startLoading(): this;
    stopLoading(): this;
    private _requestPage(page);
    setTotal(total: number): RequestHelper;
    setOffset(offset: number): void;
    setLimit(limit: number): void;
    setMultipleConditions(conditions: Condition[]): RequestHelper;
    setMultipleSorters(sorters: Sorter[]): RequestHelper;
    prevPage(): void;
    nextPage(): void;
}
