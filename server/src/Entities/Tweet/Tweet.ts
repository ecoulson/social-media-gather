import IMedia from "../Media/IMedia";
import Post from "../Post/Post";
import PostType from "../Post/PostType";
import ITweet from "./ITweet";
import ITweetMention from "./ITweetMentions";
import ITweetUrl from "./ITweetUrl";

export default class Tweet extends Post implements ITweet {
    constructor(
        _id: string,
        private _text: string,
        private _publishedAt: Date,
        private _screenName: string,
        private _hashtags: string[],
        private _urls: ITweetUrl[],
        private _mentions: ITweetMention[],
        private _media: IMedia[],
        private _tweetId: string,
        private _userId: string,
        private _favorites: number,
        private _retweetCount: number,
        private _commentCount: number
    ) {
        super(PostType.TWEET, _id);
    }

    text(): string {
        return this._text;
    }

    publishedAt(): Date {
        return this._publishedAt;
    }

    screenName(): string {
        return this._screenName;
    }

    hashtags(): string[] {
        return this._hashtags;
    }

    urls(): ITweetUrl[] {
        return this._urls;
    }

    mentions(): ITweetMention[] {
        return this._mentions;
    }

    media(): IMedia[] {
        return this._media;
    }

    userId(): string {
        return this._userId;
    }

    tweetId(): string {
        return this._tweetId;
    }

    favorites(): number {
        return this._favorites;
    }

    retweets(): number {
        return this._retweetCount;
    }

    commentCount(): number {
        return this._commentCount;
    }
}
