import { Transformer } from "../../../@Types";
import Image from "../../../Entities/Media/Image";
import IMedia from "../../../Entities/Media/IMedia";
import Video from "../../../Entities/Media/Video";
import ITweet from "../../../Entities/Tweet/ITweet";
import ITweetMention from "../../../Entities/Tweet/ITweetMentions";
import ITweetUrl from "../../../Entities/Tweet/ITweetUrl";
import TweetMention from "../../../Entities/Tweet/TweetMention";
import TweetUrl from "../../../Entities/Tweet/TweetUrl";
import IPostDocument from "../../../Schemas/Mongo/Post/IPostDocument";
import ITweetMediaDocument from "../../../Schemas/Mongo/Post/ITweetMediaDocument";
import ITweetUrlDocument from "../../../Schemas/Mongo/Post/ITweetUrlDocument";
import ITweetMentionDocument from "../../../Schemas/Mongo/Post/ITweetMentionDocument";
import TweetBuilder from "../../../Entities/Tweet/TweetBuilder";

const IMAGE_TYPE = "IMAGE";

const TweetEntityTransform: Transformer<IPostDocument, ITweet> = (post) => {
    const tweetBuilder = new TweetBuilder();
    tweetBuilder
        .setId(post.id)
        .setText(post.tweet.text)
        .setCreatorId(post.creatorId)
        .setPublishedAt(post.tweet.publishedAt)
        .setScreenName(post.tweet.screenName)
        .setHashtags(post.tweet.hashtags)
        .setUrls(post.tweet.urls.map((url) => transformTweetUrls(url)))
        .setMentions(post.tweet.userMentions.map((mention) => transformMentions(mention)))
        .setMedia(post.tweet.media.map((mediaItem) => transformMedia(mediaItem)))
        .setTweetId(post.tweet.id)
        .setChannelId(post.channelId)
        .setRetweets(post.tweet.retweetCount)
        .setFavorites(post.tweet.favorites)
        .setPagination(post.tweet.pagination)
        .setCommentCount(post.tweet.commentCount);
    return tweetBuilder.build();
};

const transformTweetUrls: Transformer<ITweetUrlDocument, ITweetUrl> = (url) =>
    new TweetUrl(url.url, url.displayUrl, url.expandedUrl);

const transformMentions: Transformer<ITweetMentionDocument, ITweetMention> = (mention) =>
    new TweetMention(mention.screenName, mention.id);

const transformMedia: Transformer<ITweetMediaDocument, IMedia> = (media) =>
    isImage(media.type)
        ? new Image(media.id, media.url, 0, 0)
        : new Video(media.id, media.url, 0, 0, new Image("", media.thumbnailUrl, 0, 0));

const isImage: Transformer<string, boolean> = (type: string) => {
    return type === IMAGE_TYPE;
};

export default TweetEntityTransform;
