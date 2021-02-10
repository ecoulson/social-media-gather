import { Transformer } from "../../@Types";
import Image from "../../Entities/Media/Image";
import IMedia from "../../Entities/Media/IMedia";
import Video from "../../Entities/Media/Video";
import ITweetMention from "../../Entities/Tweet/ITweetMentions";
import ITweetUrl from "../../Entities/Tweet/ITweetUrl";
import TweetBuilder from "../../Entities/Tweet/TweetBuilder";
import TweetMention from "../../Entities/Tweet/TweetMention";
import TweetUrl from "../../Entities/Tweet/TweetUrl";
import IPostJSONSchema from "../../Schemas/JSON/Post/IPostJSONSchema";
import ITweetMediaJSONSchema from "../../Schemas/JSON/Tweet/ITweetMediaJSONSchema";
import ITweetMentionJSONSchema from "../../Schemas/JSON/Tweet/ITweetMentionJSONSchema";
import ITweetUrlJSONSchema from "../../Schemas/JSON/Tweet/ITweetUrlJSONSchema";

const IMAGE_TYPE = "IMAGE";

export default function TweetJSONDeserializer(schema: IPostJSONSchema) {
    const tweetBuilder = new TweetBuilder();
    tweetBuilder
        .setId(schema.id)
        .setText(schema.tweet.text)
        .setCreatorId(schema.creatorId)
        .setPublishedAt(schema.tweet.publishedAt)
        .setScreenName(schema.tweet.screenName)
        .setHashtags(schema.tweet.hashtags)
        .setUrls(schema.tweet.urls.map((url) => transformTweetUrls(url)))
        .setMentions(schema.tweet.userMentions.map((mention) => transformMentions(mention)))
        .setMedia(schema.tweet.media.map((mediaItem) => transformMedia(mediaItem)))
        .setTweetId(schema.tweet.id)
        .setChannelId(schema.channelId)
        .setRetweets(schema.tweet.retweetCount)
        .setFavorites(schema.tweet.favorites)
        .setCommentCount(schema.tweet.commentCount);
    return tweetBuilder.build();
}

const transformTweetUrls: Transformer<ITweetUrlJSONSchema, ITweetUrl> = (url) =>
    new TweetUrl(url.url, url.displayUrl, url.expandedUrl);

const transformMentions: Transformer<ITweetMentionJSONSchema, ITweetMention> = (mention) =>
    new TweetMention(mention.screenName, mention.id);

const transformMedia: Transformer<ITweetMediaJSONSchema, IMedia> = (media) =>
    isImage(media.type)
        ? new Image(media.id, media.url, 0, 0)
        : new Video(media.id, media.url, 0, 0, new Image("", media.thumbnailUrl, 0, 0));

const isImage: Transformer<string, boolean> = (type: string) => {
    return type === IMAGE_TYPE;
};
