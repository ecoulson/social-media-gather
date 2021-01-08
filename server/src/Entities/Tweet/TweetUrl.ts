import ITweetUrl from "./ITweetUrl";

export default class TweetUrl implements ITweetUrl {
    constructor(private url_: string, private displayUrl_: string, private expandedUrl_: string) {}

    url(): string {
        return this.url_;
    }

    displayUrl(): string {
        return this.displayUrl_;
    }

    expandedUrl(): string {
        return this.expandedUrl_;
    }
}
