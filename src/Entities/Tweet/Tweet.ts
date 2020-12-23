import UserRecord from "../../Records/User/UserRecord";
import IMedia from "../Media/IMedia";
import ITweet from "./ITweet";
import ITweetMention from "./ITweetMentions";
import ITweetUrl from "./ITweetUrl";

export default class Tweet implements ITweet {
    constructor(
        private id_: string,
        private text_ : string,
        private publishedAt_ : Date,
        private screenName_ : string,
        private hashtags_ : string[],
        private urls_ : ITweetUrl[],
        private mentions_ : ITweetMention[],
        private media_ : IMedia[],
        private tweetId_ : string,
        private userId_ : string,
        private userRecord : InstanceType<typeof UserRecord>
    ) {}

    id() {
        return this.id_;
    }

    text() {
        return this.text_;
    }

    publishedAt() {
        return this.publishedAt_;
    }

    screenName() {
        return this.screenName_;
    }

    hashtags() {
        return this.hashtags_;
    }

    urls() {
        return this.urls_;
    }

    mentions() {
        return this.mentions_;
    }

    media() {
        return this.media_;
    }

    userId() {
        return this.userId_;
    }

    user() {
        return this.userRecord.findById(this.userId_);
    }

    tweetId() {
        return this.tweetId_;
    }
}