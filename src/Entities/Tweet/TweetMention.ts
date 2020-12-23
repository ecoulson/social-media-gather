import ITweetMention from "./ITweetMentions";

export default class TweetMention implements ITweetMention {
    constructor(
        private screenName_ : string,
        private id_ : string,
    ) {}

    id() {
        return this.id_;
    }

    screenName() {
        return this.screenName_;
    }
}