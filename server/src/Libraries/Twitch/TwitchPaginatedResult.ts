import ITwitchPaginatedResult from "./ITwitchPaginatedResult";
import ITwitchPaginationSchema from "./Schemas/ITwitchPaginationSchema";
import { URL } from "url";
import Axios from "axios";
import TwitchAPIClient from "./TwitchAPIClient";
import ITwitchResult from "./ITwitchResult";

export default class TwitchPaginatedResult<T>
    implements ITwitchPaginatedResult<T>, ITwitchResult<T> {
    constructor(
        private _client: TwitchAPIClient,
        private _baseUrl: URL,
        private _rateLimitRemaining: number,
        private _rateLimitResetDateTime: Date,
        private _pagination: ITwitchPaginationSchema,
        private _data: T
    ) {}

    async nextPage(): Promise<ITwitchPaginatedResult<T>> {
        if (this._baseUrl.searchParams.has("after")) {
            this._baseUrl.searchParams.delete("after");
        }
        this._baseUrl.searchParams.append("after", this._pagination.cursor);
        const token = await this._client.token.getAppAccessToken();
        const response = await Axios.get(this._baseUrl.toString(), {
            headers: {
                Authorization: `Bearer ${token.accessToken}`,
                "Client-Id": await this._client.clientId()
            }
        });
        this._rateLimitRemaining = parseInt(response.headers["ratelimit-remaining"]);
        this._rateLimitResetDateTime = new Date(
            parseInt(response.headers["ratelimit-reset"]) * 1000
        );
        return new TwitchPaginatedResult<T>(
            this._client,
            this._baseUrl,
            this._rateLimitRemaining,
            this._rateLimitResetDateTime,
            response.data.pagination,
            response.data.data
        );
    }

    rateLimitRemaining(): number {
        return this._rateLimitRemaining;
    }

    rateLimitResetDateTime(): Date {
        return this._rateLimitResetDateTime;
    }

    async previousPage(): Promise<ITwitchPaginatedResult<T>> {
        if (this._baseUrl.searchParams.has("before")) {
            this._baseUrl.searchParams.delete("before");
        }
        this._baseUrl.searchParams.append("before", this._pagination.cursor);
        const token = await this._client.token.getAppAccessToken();
        const response = await Axios.get(this._baseUrl.toString(), {
            headers: {
                Authorization: `Bearer ${token.accessToken}`,
                "Client-Id": await this._client.clientId()
            }
        });
        this._rateLimitRemaining = parseInt(response.headers["ratelimit-remaining"]);
        this._rateLimitResetDateTime = new Date(
            parseInt(response.headers["ratelimit-reset"]) * 1000
        );
        return new TwitchPaginatedResult<T>(
            this._client,
            this._baseUrl,
            this._rateLimitRemaining,
            this._rateLimitResetDateTime,
            response.data.pagination,
            response.data.data
        );
    }

    results(): T {
        return this._data;
    }

    hasNext(): boolean {
        return this._pagination !== null && this._pagination.cursor !== undefined;
    }
}
