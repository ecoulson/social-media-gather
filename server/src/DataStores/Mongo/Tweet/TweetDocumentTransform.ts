import { UpdateQuery } from "mongoose";
import { Transformer } from "../../../@Types";
import IMedia from "../../../Entities/Media/IMedia";
import MediaType from "../../../Entities/Media/MediaType";
import ITweet from "../../../Entities/Tweet/ITweet";
import ITweetMention from "../../../Entities/Tweet/ITweetMentions";
import ITweetUrl from "../../../Entities/Tweet/ITweetUrl";
import IPostDocument from "../../../Schemas/Mongo/Post/IPostDocument";
import ITweetMediaDocument from "../../../Schemas/Mongo/Post/ITweetMediaDocument";
import ITweetUrlDocument from "../../../Schemas/Mongo/Post/ITweetUrlDocument";
import ITweetMentionDocument from "../../../Schemas/Mongo/Post/ITweetMentionDocument";
import IImage from "../../../Entities/Media/IImage";
import IVideo from "../../../Entities/Media/IVideo";

const TweetDocumentTransform: Transformer<ITweet, UpdateQuery<IPostDocument>> = (tweet) => {
    return {
        type: "TWEET",
        userId: tweet.userId(),
        timeCreated: tweet.publishedAt(),
        tweet: {
            publishedAt: tweet.publishedAt(),
            hashtags: tweet.hashtags(),
            text: tweet.text(),
            screenName: tweet.screenName(),
            id: tweet.tweetId(),
            media: tweet.media().map((mediaItem) => transformMedia(mediaItem)),
            userMentions: tweet.mentions().map((mention) => transformMention(mention)),
            urls: tweet.urls().map((url) => transformUrl(url))
        }
    };
};

const transformMedia: Transformer<IMedia, ITweetMediaDocument> = (media) => {
    if (media.isType(MediaType.IMAGE)) {
        const image: IImage = media as IImage;
        return {
            url: image.url(),
            type: image.type(),
            thumbnailUrl: "",
            id: image.id()
        };
    } else {
        const video: IVideo = media as IVideo;
        return {
            url: video.url(),
            type: video.type(),
            thumbnailUrl: video.thumbnail().url(),
            id: video.id()
        };
    }
};

const transformMention: Transformer<ITweetMention, ITweetMentionDocument> = (mention) => {
    return {
        screenName: mention.screenName(),
        id: mention.id()
    };
};

const transformUrl: Transformer<ITweetUrl, ITweetUrlDocument> = (url) => {
    return {
        expandedUrl: url.expandedUrl(),
        displayUrl: url.displayUrl(),
        url: url.url()
    };
};

export default TweetDocumentTransform;
