import ITwitterPagination from "./ITwitterPagination";

export default class TwitterPaginatedResult<T> {
    constructor(
        private _data: T,
        private _pagination: ITwitterPagination,
        private _options: any,
        private _callback: (options: any) => Promise<TwitterPaginatedResult<T>>
    ) {}

    data(): T {
        return this._data;
    }

    async nextPage(): Promise<TwitterPaginatedResult<T>> {
        return await this._callback({
            ...this._options,
            oldestId: this._pagination.oldest_id
        });
    }

    pagination() {
        return this._pagination;
    }
}
