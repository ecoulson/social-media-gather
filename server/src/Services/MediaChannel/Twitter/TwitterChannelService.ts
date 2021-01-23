import { inject, injectable, tagged } from "inversify";
import Tags from "../../../@Types/Tags";
import Types from "../../../@Types/Types";
import IUser from "../../../Entities/User/IUser";
import TweetRepository from "../../../Repositories/Tweet/TweetRepository";
import UserRepository from "../../../Repositories/User/UserRepository";
import IMediaPlatformChannelService from "../IMediaChannelService";
import IMediaPlatformChannelSearchResult from "../IMediaPlatformChannelSearchResult";
import TwitterAPIClient from "../../../Libraries/Twitter/TwitterAPIClient";
import ITweetSchema from "../../../Libraries/Twitter/Schema/ITweetSchema";
import IPost from "../../../Entities/Post/IPost";
import ITweet from "../../../Entities/Tweet/ITweet";
import ITweetUrl from "../../../Entities/Tweet/ITweetUrl";
import TweetUrl from "../../../Entities/Tweet/TweetUrl";
import ITweetMention from "../../../Entities/Tweet/ITweetMentions";
import TweetMention from "../../../Entities/Tweet/TweetMention";
import Video from "../../../Entities/Media/Video";
import Image from "../../../Entities/Media/Image";
import ITwitterVideoVariant from "../../../Libraries/Twitter/Schema/ITwitterVideoVariant";
import TweetBuilder from "../../../Entities/Tweet/TweetBuilder";
import ITwitterMediaSchema from "../../../Libraries/Twitter/Schema/ITwitterMediaSchema";
import IMedia from "../../../Entities/Media/IMedia";

@injectable()
export default class TwitterChannelService implements IMediaPlatformChannelService {
    constructor(
        @inject(Types.TwitterAPIClient)
        private twitterAPIClient: TwitterAPIClient,
        @inject(Types.UserRepository)
        @tagged(Tags.MONGO, true)
        private userRepository: InstanceType<typeof UserRepository>,
        @inject(Types.TweetRepository)
        @tagged(Tags.MONGO, true)
        private tweetRepository: InstanceType<typeof TweetRepository>
    ) {}

    async searchPlatformForChannel(userHandle: string): Promise<IMediaPlatformChannelSearchResult> {
        const users = await this.twitterAPIClient.users.lookup({
            screenNames: [userHandle]
        });
        return {
            channels: users.map((user) => {
                return {
                    id: user.id_str,
                    username: user.screen_name,
                    profilePicture: user.profile_image_url,
                    subscriberCount: user.followers_count
                };
            })
        };
    }

    async linkChannel(user: IUser, twitterId: string): Promise<void> {
        user.setTwitterId(twitterId);
        this.createTwitterPostsForUser(twitterId, user.id());
        if (user.id() === "") {
            await this.userRepository.add(user);
        } else {
            await this.userRepository.update(user);
        }
    }

    async createTwitterPostsForUser(twitterId: string, userId: string): Promise<IPost[]> {
        const tweets = await this.twitterAPIClient.tweets.lookup({
            ids: [twitterId]
        });
        return await Promise.all(tweets.map((tweet) => this.createPostFromTweet(tweet, userId)));
    }

    async createPostFromTweet(tweetSchema: ITweetSchema, userId: string): Promise<ITweet> {
        const tweetBuilder = new TweetBuilder();
        tweetBuilder
            .setId("")
            .setText(
                tweetSchema.full_text.substring(
                    tweetSchema.display_text_range[0],
                    tweetSchema.display_text_range[1]
                )
            )
            .setPublishedAt(new Date(tweetSchema.created_at))
            .setScreenName(tweetSchema.user.screen_name)
            .setHashtags(tweetSchema.entities.hashtags.map((hashtag) => hashtag.text))
            .setUrls(this.getUrls(tweetSchema))
            .setMentions(this.getUserMentions(tweetSchema))
            .setMedia(this.getMedia(tweetSchema))
            .setTweetId(tweetSchema.id_str)
            .setUserId(userId)
            .setFavorites(tweetSchema.favorite_count)
            .setRetweets(tweetSchema.retweet_count)
            .setCommentCount(tweetSchema.reply_count);
        return this.tweetRepository.add(tweetBuilder.build());
    }

    private getUrls(tweet: ITweetSchema): ITweetUrl[] {
        if (!tweet.entities.urls) {
            return [];
        }
        return tweet.entities.urls.map(
            (url) => new TweetUrl(url.url, url.display_url, url.expanded_url)
        );
    }

    private getUserMentions(tweet: ITweetSchema): ITweetMention[] {
        if (!tweet.entities.user_mentions) {
            return [];
        }
        return tweet.entities.user_mentions.map(
            (userMention) => new TweetMention(userMention.screen_name, userMention.id_str)
        );
    }

    private getMedia(tweet: ITweetSchema) {
        let media: IMedia[] = [];
        if (this.hasMedia(tweet)) {
            media = media.concat(
                tweet.extended_entities.media
                    .filter(
                        (mediaItem) =>
                            mediaItem.type === "photo" || mediaItem.type === "animated_gif"
                    )
                    .map((mediaItem) => this.createImageFromMediaItem(mediaItem))
            );
        }
        if (this.hasMedia(tweet)) {
            media = media.concat(
                tweet.extended_entities.media
                    .filter((mediaItem) => mediaItem.type === "video")
                    .map((mediaItem) => this.createVideoFromMediaItem(mediaItem))
                    .filter((mediaItem) => mediaItem !== null)
            );
        }
        return media;
    }

    private createVideoFromMediaItem(media: ITwitterMediaSchema): Video {
        let variant: ITwitterVideoVariant = null;
        if (media.video_info) {
            const sortedVariants = media.video_info.variants
                .filter((variant) => variant.bitrate)
                .sort((a, b) => a.bitrate - b.bitrate);
            if (sortedVariants[sortedVariants.length - 1]) {
                variant = sortedVariants[sortedVariants.length - 1];
            }
        }
        if (variant) {
            return new Video(media.id_str, variant.url, 0, 0, new Image("", media.media_url, 0, 0));
        } else {
            return null;
        }
    }

    private hasMedia(tweet: ITweetSchema): boolean {
        return tweet.extended_entities !== undefined && tweet.extended_entities.media !== undefined;
    }

    private createImageFromMediaItem(media: ITwitterMediaSchema): Image {
        return new Image(media.id_str, media.media_url, 0, 0);
    }

    async linkChannelWithUserId(userId: string, twitterId: string): Promise<void> {
        const user = await this.userRepository.findById(userId);
        this.linkChannel(user, twitterId);
    }
}
