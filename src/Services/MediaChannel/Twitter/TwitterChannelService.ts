import { inject, injectable, tagged } from "inversify";
import Tags from "../../../@Types/Tags";
import Types from "../../../@Types/Types";
import IUser from "../../../Entities/User/IUser";
import TweetRepository from "../../../Repositories/Tweet/TweetRepository";
import UserRepository from "../../../Repositories/User/UserRepository";
import IMediaPlatformChannelService from "../IMediaChannelService";
import IMediaPlatformChannelSearchResult from "../IMediaPlatformChannelSearchResult";
import TwitterAPIClient from "../../../Library/Twitter/TwitterAPIClient";
import ITweetSchema from "../../../Library/Twitter/Schema/ITweetSchema";
import IPost from "../../../Entities/Post/IPost";
import Tweet from "../../../Entities/Tweet/Tweet";
import ITweet from "../../../Entities/Tweet/ITweet";
import ITweetUrl from "../../../Entities/Tweet/ITweetUrl";
import TweetUrl from "../../../Entities/Tweet/TweetUrl";
import ITweetMention from "../../../Entities/Tweet/ITweetMentions";
import TweetMention from "../../../Entities/Tweet/TweetMention";
import Video from "../../../Entities/Media/Video";
import Image from "../../../Entities/Media/Image";
import ITwitterVideoVariant from "../../../Library/Twitter/Schema/ITwitterVideoVariant";

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
                    profilePicture: user.profile_image_url
                };
            })
        };
    }

    async registerChannel(user: IUser, twitterId: string): Promise<void> {
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
        const tweetPost = new Tweet(
            "",
            tweetSchema.full_text,
            new Date(tweetSchema.created_at),
            tweetSchema.user.screen_name,
            tweetSchema.entities.hashtags.map((hashtag) => hashtag.text),
            this.getUrls(tweetSchema),
            this.getUserMentions(tweetSchema),
            this.getMedia(tweetSchema),
            tweetSchema.id_str,
            userId
        );
        return this.tweetRepository.add(tweetPost);
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
        if (this.hasVideos(tweet)) {
            return this.createVideosFromTweet(tweet);
        } else if (this.hasPhotos(tweet)) {
            return this.createImagesFromTweet(tweet);
        } else {
            return [];
        }
    }

    private hasVideos(tweet: ITweetSchema) {
        return tweet.extended_entities && tweet.extended_entities.media;
    }

    private createVideosFromTweet(tweet: ITweetSchema): Video[] {
        return tweet.extended_entities.media
            .map((media) => {
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
                    return new Video(
                        media.id_str,
                        variant.url,
                        0,
                        0,
                        new Image("", media.media_url, 0, 0)
                    );
                } else {
                    return null;
                }
            })
            .filter((media) => media !== null);
    }

    private hasPhotos(tweet: ITweetSchema) {
        return tweet.entities && tweet.entities.media;
    }

    private createImagesFromTweet(tweet: ITweetSchema): Image[] {
        return tweet.entities.media.map((media) => new Image(media.id_str, media.media_url, 0, 0));
    }

    async registerChannelForUserId(userId: string, twitterId: string): Promise<void> {
        const user = await this.userRepository.findById(userId);
        this.registerChannel(user, twitterId);
    }
}
