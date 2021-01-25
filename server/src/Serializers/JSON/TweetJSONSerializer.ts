import { Transformer } from "../../@Types";
import Image from "../../Entities/Media/Image";
import IMedia from "../../Entities/Media/IMedia";
import MediaType from "../../Entities/Media/MediaType";
import Video from "../../Entities/Media/Video";
import ITweet from "../../Entities/Tweet/ITweet";
import ITweetMention from "../../Entities/Tweet/ITweetMentions";
import ITweetUrl from "../../Entities/Tweet/ITweetUrl";
import ITweetJSONSchema from "../../Schemas/JSON/Tweet/ITweetJSONSchema";
import ITweetMediaJSONSchema from "../../Schemas/JSON/Tweet/ITweetMediaJSONSchema";
import ITweetMentionJSONSchema from "../../Schemas/JSON/Tweet/ITweetMentionJSONSchema";
import ITweetUrlJSONSchema from "../../Schemas/JSON/Tweet/ITweetUrlJSONSchema";

const TweetJSONSerializer: Transformer<ITweet, ITweetJSONSchema> = (tweetEntity) => {
    return {
        id: tweetEntity.tweetId(),
        text: tweetEntity.text(),
        hashtags: tweetEntity.hashtags(),
        publishedAt: tweetEntity.publishedAt(),
        screenName: tweetEntity.screenName(),
        urls: tweetEntity.urls().map((url) => TweetUrlJSONSerializer(url)),
        userMentions: tweetEntity.mentions().map((mention) => TweetMentionsJSONSerializer(mention)),
        media: tweetEntity.media().map((media) => TweetMediaJSONSerializer(media)),
        favorites: tweetEntity.favorites(),
        retweetCount: tweetEntity.retweetCount(),
        commentCount: tweetEntity.commentCount()
    };
};

const TweetUrlJSONSerializer: Transformer<ITweetUrl, ITweetUrlJSONSchema> = (tweetUrl) => {
    return {
        expandedUrl: tweetUrl.expandedUrl(),
        url: tweetUrl.url(),
        displayUrl: tweetUrl.displayUrl()
    };
};

const TweetMentionsJSONSerializer: Transformer<ITweetMention, ITweetMentionJSONSchema> = (
    tweetMention
) => {
    return {
        screenName: tweetMention.screenName(),
        id: tweetMention.id()
    };
};

const TweetMediaJSONSerializer: Transformer<IMedia, ITweetMediaJSONSchema> = (media) => {
    return {
        id: media.id(),
        url: media.isType(MediaType.IMAGE) ? (media as Image).url() : (media as Video).url(),
        thumbnailUrl: media.isType(MediaType.VIDEO) ? (media as Video).thumbnail().url() : "",
        type: media.type()
    };
};

export default TweetJSONSerializer;
