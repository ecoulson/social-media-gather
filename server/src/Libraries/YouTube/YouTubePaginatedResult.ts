import IYouTubeOptions from "./IYouTubeOptions";
import IYouTubePaginatedResult from "./IYouTubePaginatedResult";
import IYouTubeResponseSchema from "./Schema/IYouTubeResponseSchema";

type YouTubeAPICallback<T> = (options: IYouTubeOptions) => Promise<IYouTubePaginatedResult<T>>;

export default class YouTubePaginatedResult<T> implements IYouTubePaginatedResult<T> {
    constructor(
        private callback: YouTubeAPICallback<T>,
        private options: IYouTubeOptions,
        private response: IYouTubeResponseSchema<T>
    ) {}

    hasPrevious(): boolean {
        return (
            this.response.previousPageToken !== undefined &&
            this.response.previousPageToken !== null
        );
    }

    hasNextPage(): boolean {
        return this.response.nextPageToken !== undefined && this.response.nextPageToken !== null;
    }

    items(): T {
        return this.response.items;
    }

    async getNextPage(): Promise<IYouTubePaginatedResult<T>> {
        this.options.pageToken = this.response.nextPageToken;
        return await this.callback(this.options);
    }

    getNextPageToken() {
        return this.response.nextPageToken;
    }

    async getPreviousPage(): Promise<IYouTubePaginatedResult<T>> {
        this.options.pageToken = this.response.previousPageToken;
        return await this.callback(this.options);
    }

    getPreviousPageToken() {
        return this.response.previousPageToken;
    }
}
