import { Transformer } from "../../../@Types";
import Image from "../../../Entities/Media/Image";
import IMedia from "../../../Entities/Media/IMedia";
import Video from "../../../Entities/Media/Video";
import ITweet from "../../../Entities/Tweet/ITweet";
import ITweetMention from "../../../Entities/Tweet/ITweetMentions";
import ITweetUrl from "../../../Entities/Tweet/ITweetUrl";
import Tweet from "../../../Entities/Tweet/Tweet";
import TweetMention from "../../../Entities/Tweet/TweetMention";
import TweetUrl from "../../../Entities/Tweet/TweetUrl";
import IPostDocument from "../../../Schemas/Mongo/Post/IPostDocument";
import ITweetMediaDocument from "../../../Schemas/Mongo/Post/ITweetMediaDocument";
import ITweetUrlDocument from "../../../Schemas/Mongo/Post/ITweetUrlDocument";
import ITweetMentionDocument from "../../../Schemas/Mongo/Post/ITweetMentionDocument";

const IMAGE_TYPE = "photo";

const TweetEntityTransform: Transformer<IPostDocument, ITweet> = (post) =>
    new Tweet(
        post.id,
        post.tweet.text,
        post.tweet.publishedAt,
        post.tweet.screenName,
        post.tweet.hashtags,
        post.tweet.urls.map((url) => transformTweetUrls(url)),
        post.tweet.userMentions.map((mention) => transformMentions(mention)),
        post.tweet.media.map((mediaItem) => transformMedia(mediaItem)),
        post.tweet.id,
        post.userId
    );

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
