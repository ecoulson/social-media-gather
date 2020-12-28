import IMedia from "../Media/IMedia";
import ITweet from "./ITweet";
import ITweetMention from "./ITweetMentions";
import ITweetUrl from "./ITweetUrl";

export default class Tweet implements ITweet {
    constructor(
        private id_: string,
        private text_: string,
        private publishedAt_: Date,
        private screenName_: string,
        private hashtags_: string[],
        private urls_: ITweetUrl[],
        private mentions_: ITweetMention[],
        private media_: IMedia[],
        private tweetId_: string,
        private userId_: string
    ) {}

    id(): string {
        return this.id_;
    }

    text(): string {
        return this.text_;
    }

    publishedAt(): Date {
        return this.publishedAt_;
    }

    screenName(): string {
        return this.screenName_;
    }

    hashtags(): string[] {
        return this.hashtags_;
    }

    urls(): ITweetUrl[] {
        return this.urls_;
    }

    mentions(): ITweetMention[] {
        return this.mentions_;
    }

    media(): IMedia[] {
        return this.media_;
    }

    userId(): string {
        return this.userId_;
    }

    tweetId(): string {
        return this.tweetId_;
    }
}
