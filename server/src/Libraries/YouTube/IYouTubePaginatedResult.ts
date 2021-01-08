export default interface IYouTubePaginatedResult<T> {
    hasNextPage(): boolean;
    hasPrevious(): boolean;
    items(): T;
    getNextPage(): Promise<IYouTubePaginatedResult<T>>;
    getPreviousPage(): Promise<IYouTubePaginatedResult<T>>;
}
