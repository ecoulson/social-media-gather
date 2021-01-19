import Builder from "../../Libraries/Builder/Builder";
import IMedia from "../Media/IMedia";
import ITweet from "./ITweet";
import ITweetMention from "./ITweetMentions";
import ITweetUrl from "./ITweetUrl";
import Tweet from "./Tweet";

export default class TweetBuilder extends Builder<ITweet> {
    _id: string;
    _text: string;
    _publishedAt: Date;
    _screenName: string;
    _hashtags: string[];
    _urls: ITweetUrl[];
    _mentions: ITweetMention[];
    _media: IMedia[];
    _tweetId: string;
    _userId: string;
    _favorites: number;
    _retweets: number;
    _commentCount: number;

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
            this._commentCount
        );
        this.reset();
        return tweet;
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

    setUserId(userId: string): TweetBuilder {
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
}