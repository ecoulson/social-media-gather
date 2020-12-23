import ITweetUrl from "./ITweetUrl";

export default class TweetUrl implements ITweetUrl {
    constructor(
        private url_ : string,
        private displayUrl_ : string,
        private expandedUrl_ : string,
    ) {}

    url() {
        return this.url_;
    }

    displayUrl() {
        return this.displayUrl_;
    }
    
    expandedUrl() {
        return this.expandedUrl_;
    }
}