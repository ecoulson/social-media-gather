import { inject, injectable, tagged } from "inversify";
import Tags from "../../../@Types/Tags";
import Types from "../../../@Types/Types";
import TweetRepository from "../../../Repositories/Tweet/TweetRepository";
import IMediaPlatformService from "../IMediaPlatformService";
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
import Subscriber from "../../../MessageQueue/Subscriber";
import IMessageQueue from "../../../MessageQueue/IMessageQueue";
import CreateChannelMessage from "../../../Messages/Channel/CreateChannelMessage";
import ICreateChannelBody from "../../../Messages/Bodies/ICreateChannelBody";
import Topic from "../../../MessageQueue/Topic";
import ChannelJSONDeserializer from "../../../Serializers/JSON/ChannelJSONDeserializer";
import IChannel from "../../../Entities/Channel/IChannel";
import IChannelsBody from "../../../Messages/Bodies/IChannelsBody";
import ICreatorJSONSchema from "../../../Schemas/JSON/Creator/ICreatorJSONSchema";
import MessageType from "../../../Messages/MessageType";
import SearchServiceV1 from "../../../Libraries/Twitter/Services/v1/Search/SearchServiceV1";
import TwitterServiceType from "../../../Libraries/Twitter/TwitterServiceType";
import UserServiceV1 from "../../../Libraries/Twitter/Services/v1/Users/UserServiceV1";

@injectable()
export default class TwitterChannelService extends Subscriber implements IMediaPlatformService {
    constructor(
        @inject(Types.TwitterAPIClient)
        @tagged(Tags.V1, true)
        private twitterAPIClient: TwitterAPIClient,
        @inject(Types.TweetRepository)
        @tagged(Tags.MONGO, true)
        private tweetRepository: InstanceType<typeof TweetRepository>,
        @inject(Types.MessageQueue) messageQueue: IMessageQueue
    ) {
        super(messageQueue);
    }

    async searchPlatformForChannel(userHandle: string): Promise<IMediaPlatformChannelSearchResult> {
        const searchService = this.twitterAPIClient.getService<SearchServiceV1>(
            TwitterServiceType.Search
        );
        const users = await searchService.searchUsers({
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

    async createChannel(createChannelBody: ICreateChannelBody, creator: ICreatorJSONSchema) {
        const channelResponse = await this.query<IChannelsBody>(
            Topic.Channel,
            MessageType.Channels,
            new CreateChannelMessage(createChannelBody)
        );
        const channel = ChannelJSONDeserializer(channelResponse.body().channels[0]);
        this.createPosts(channel, creator);
        return channel;
    }

    async createPosts(channel: IChannel, creator: ICreatorJSONSchema): Promise<IPost[]> {
        const usersService = this.twitterAPIClient.getService<UserServiceV1>(
            TwitterServiceType.Users
        );
        const tweets = await usersService.timeline({
            ids: [channel.platformId()]
        });
        return await Promise.all(
            tweets.map((tweet) => this.createPostFromTweet(tweet, channel, creator))
        );
    }

    async createPostFromTweet(
        tweetSchema: ITweetSchema,
        channel: IChannel,
        creator: ICreatorJSONSchema
    ): Promise<ITweet> {
        const tweetBuilder = new TweetBuilder();
        tweetBuilder
            .setId("")
            .setCreatorId(creator.id)
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
            .setChannelId(channel.id())
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
}
