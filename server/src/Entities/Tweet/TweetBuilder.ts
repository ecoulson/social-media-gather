import Builder from "../../Libraries/Builder/Builder";
import IMedia from "../Media/IMedia";
import ITweet from "./ITweet";
import ITweetCommentPagination from "./ITweetCommentPagination";
import ITweetMention from "./ITweetMentions";
import ITweetUrl from "./ITweetUrl";
import Tweet from "./Tweet";

export default class TweetBuilder extends Builder<ITweet> {
    private _id: string;
    private _text: string;
    private _publishedAt: Date;
    private _screenName: string;
    private _hashtags: string[];
    private _urls: ITweetUrl[];
    private _mentions: ITweetMention[];
    private _media: IMedia[];
    private _tweetId: string;
    private _userId: string;
    private _favorites: number;
    private _retweets: number;
    private _commentCount: number;
    private _creatorId: string;
    private _pagination: ITweetCommentPagination;

    reset(): void {
        this._id = null;
        this._text = null;
        this._publishedAt = null;
        this._screenName = null;
        this._hashtags = [];
        this._urls = [];
        this._mentions = [];
        this._media = [];
        this._tweetId = null;
        this._userId = null;
        this._favorites = null;
        this._retweets = null;
        this._commentCount = null;
        this._creatorId = null;
        this._pagination = null;
    }

    construct(): ITweet {
        const tweet = new Tweet(
            this._id,
            this._text,
            this._publishedAt,
            this._screenName,
            this._hashtags,
            this._urls,
            this._mentions,
            this._media,
            this._tweetId,
            this._userId,
            this._favorites,
            this._retweets,
            this._commentCount,
            this._creatorId,
            this._pagination
        );
        this.reset();
        return tweet;
    }

    setCreatorId(creatorId: string): TweetBuilder {
        this._creatorId = creatorId;
        return this;
    }

    setId(id: string): TweetBuilder {
        this._id = id;
        return this;
    }

    setText(text: string): TweetBuilder {
        this._text = text;
        return this;
    }

    setPublishedAt(publishedAt: Date): TweetBuilder {
        this._publishedAt = publishedAt;
        return this;
    }
    setScreenName(screenName: string): TweetBuilder {
        this._screenName = screenName;
        return this;
    }

    setHashtags(hashtags: string[]): TweetBuilder {
        this._hashtags = hashtags;
        return this;
    }

    setUrls(urls: ITweetUrl[]): TweetBuilder {
        this._urls = urls;
        return this;
    }

    setMentions(mentions: ITweetMention[]): TweetBuilder {
        this._mentions = mentions;
        return this;
    }

    setMedia(media: IMedia[]): TweetBuilder {
        this._media = media;
        return this;
    }

    setTweetId(tweetId: string): TweetBuilder {
        this._tweetId = tweetId;
        return this;
    }

    setChannelId(userId: string): TweetBuilder {
        this._userId = userId;
        return this;
    }

    setFavorites(favorites: number): TweetBuilder {
        this._favorites = favorites;
        return this;
    }

    setRetweets(retweets: number): TweetBuilder {
        this._retweets = retweets;
        return this;
    }

    setCommentCount(commentCount: number): TweetBuilder {
        this._commentCount = commentCount;
        return this;
    }

    setPagination(pagination: ITweetCommentPagination) {
        this._pagination = pagination;
        return this;
    }
}
