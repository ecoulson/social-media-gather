import ITwitchResult from "./ITwitchResult";

export default interface ITwitchPaginatedResult<T> extends ITwitchResult<T> {
    nextPage(): Promise<ITwitchPaginatedResult<T>>;
    previousPage(): Promise<ITwitchPaginatedResult<T>>;
    hasNext(): boolean;
    results(): T;
}
