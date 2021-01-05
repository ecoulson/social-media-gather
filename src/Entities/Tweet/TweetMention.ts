import ITweetMention from "./ITweetMentions";

export default class TweetMention implements ITweetMention {
    constructor(private screenName_: string, private id_: string) {}

    id(): string {
        return this.id_;
    }

    screenName(): string {
        return this.screenName_;
    }
}
