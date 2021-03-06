import IMedia from "../Media/IMedia";
import Post from "../Post/Post";
import PostType from "../Post/PostType";
import ITweet from "./ITweet";
import ITweetCommentPagination from "./ITweetCommentPagination";
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
        _channelId: string,
        private _favorites: number,
        private _retweetCount: number,
        private _commentCount: number,
        _creatorId: string,
        private _pagination: ITweetCommentPagination
    ) {
        super(PostType.TWEET, _id, _channelId, _creatorId);
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

    tweetId(): string {
        return this._tweetId;
    }

    favorites(): number {
        return this._favorites;
    }

    retweetCount(): number {
        return this._retweetCount;
    }

    commentCount(): number {
        return this._commentCount;
    }

    setCommentCount(commentCount: number) {
        this._commentCount = commentCount;
    }

    pagination(): ITweetCommentPagination {
        return this._pagination;
    }

    setPagination(pagination: ITweetCommentPagination) {
        this._pagination = pagination;
    }
}
