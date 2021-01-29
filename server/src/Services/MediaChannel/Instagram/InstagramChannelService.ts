import {
    UserFeedResponseCarouselMediaItem,
    UserFeedResponseItemsItem
} from "instagram-private-api";
import { inject, injectable, tagged } from "inversify";
import InstagramPostBuilder from "../../../Entities/InstagramPost/InstagramPostBuilder";
import Tags from "../../../@Types/Tags";
import Types from "../../../@Types/Types";
import Image from "../../../Entities/Media/Image";
import Video from "../../../Entities/Media/Video";
import InstagramPostRepository from "../../../Repositories/InstagramPost/InstagramPostRepository";
import IMediaPlatformService from "../IMediaPlatformService";
import IMediaPlatformChannelSearchResult from "../IMediaPlatformChannelSearchResult";
import IChannel from "../../../Entities/Channel/IChannel";
import Subscriber from "../../../MessageQueue/Subscriber";
import IMessageQueue from "../../../MessageQueue/IMessageQueue";
import Topic from "../../../MessageQueue/Topic";
import CreateChannelMessage from "../../../Messages/Channel/CreateChannelMessage";
import ICreateChannelBody from "../../../Messages/Bodies/ICreateChannelBody";
import ChannelJSONDeserializer from "../../../Serializers/JSON/ChannelJSONDeserializer";
import IChannelsBody from "../../../Messages/Bodies/IChannelsBody";
import InstagramAPIClient from "../../../Libraries/Instagram/InstagramAPIClient";
import ICreatorJSONSchema from "../../../Schemas/JSON/Creator/ICreatorJSONSchema";
import MessageType from "../../../Messages/MessageType";

@injectable()
export default class InstagramChannelService extends Subscriber implements IMediaPlatformService {
    constructor(
        @inject(Types.InstagramAPIClient) private instagramApi: InstagramAPIClient,
        @inject(Types.InstagramPostRepository)
        @tagged(Tags.MONGO, true)
        private instagramPostRepository: InstanceType<typeof InstagramPostRepository>,
        @inject(Types.MessageQueue)
        messageQueue: IMessageQueue
    ) {
        super(messageQueue);
    }

    async searchPlatformForChannel(username: string): Promise<IMediaPlatformChannelSearchResult> {
        const searchResults = await this.instagramApi.client().search.users(username);
        return {
            channels: await Promise.all(
                searchResults.map(async (user) => {
                    const details = await this.instagramApi.client().user.info(user.pk);
                    return {
                        username: user.username,
                        id: user.pk.toString(),
                        profilePicture: user.profile_pic_url,
                        subscriberCount: details.follower_count
                    };
                })
            )
        };
    }

    async createChannel(
        createChannelBody: ICreateChannelBody,
        creator: ICreatorJSONSchema
    ): Promise<IChannel> {
        const channelResponse = await this.query<IChannelsBody>(
            Topic.Channel,
            MessageType.Channels,
            new CreateChannelMessage(createChannelBody)
        );
        const channel = ChannelJSONDeserializer(channelResponse.body().channels[0]);
        this.createPosts(channel, creator);
        return channel;
    }

    private async createPosts(channel: IChannel, creator: ICreatorJSONSchema): Promise<void> {
        const igUser = await this.instagramApi.client().user.info(channel.platformId());
        const userFeed = this.instagramApi.client().feed.user(channel.platformId());
        let count = 0;
        let page = await userFeed.items();
        const instagramIds = new Set();
        const builder = new InstagramPostBuilder();
        while (count < igUser.media_count) {
            count += page.length;
            await Promise.all(
                page
                    .map(async (postItem) => {
                        if (instagramIds.has(postItem.id)) {
                            return null;
                        }
                        instagramIds.add(postItem.id);
                        if (postItem.media_type === 8) {
                            builder
                                .setId("")
                                .setChannelId(channel.id())
                                .setPostId(postItem.id)
                                .setCreatorId(creator.id)
                                .setLikes(postItem.like_count)
                                .setTakenAt(new Date(postItem.taken_at * 1000))
                                .setCaption(this.getCaption(postItem))
                                .setMedia(
                                    postItem.carousel_media.map((slide) => this.createImage(slide))
                                )
                                .setThumbnail(this.createImage(postItem.carousel_media[0]))
                                .setCommentCount(postItem.comment_count);
                            return this.instagramPostRepository.add(builder.build());
                        } else if (postItem.media_type === 2) {
                            builder
                                .setId("")
                                .setChannelId(channel.id())
                                .setPostId(postItem.id)
                                .setCreatorId(creator.id)
                                .setLikes(postItem.like_count)
                                .setTakenAt(new Date(postItem.taken_at * 1000))
                                .setCaption(this.getCaption(postItem))
                                .setMedia([this.createVideo(postItem)])
                                .setThumbnail(this.createImage(postItem))
                                .setCommentCount(postItem.comment_count);
                            return this.instagramPostRepository.add(builder.build());
                        } else {
                            builder
                                .setId("")
                                .setChannelId(channel.id())
                                .setPostId(postItem.id)
                                .setCreatorId(creator.id)
                                .setLikes(postItem.like_count)
                                .setTakenAt(new Date(postItem.taken_at * 1000))
                                .setCaption(this.getCaption(postItem))
                                .setMedia([this.createImage(postItem)])
                                .setThumbnail(this.createImage(postItem))
                                .setCommentCount(postItem.comment_count);
                            return this.instagramPostRepository.add(builder.build());
                        }
                    })
                    .filter((postItem) => postItem !== null)
            );
            page = await userFeed.items();
            await this.wait(5000 + Math.random() * 500);
        }
    }

    private createImage(
        mediaItem: UserFeedResponseCarouselMediaItem | UserFeedResponseItemsItem
    ): Image {
        return new Image(
            mediaItem.id,
            mediaItem.image_versions2.candidates[0].url,
            mediaItem.image_versions2.candidates[0].width,
            mediaItem.image_versions2.candidates[0].height
        );
    }

    private createVideo(post: UserFeedResponseItemsItem): Video {
        return new Video(
            post.video_versions[0].id,
            post.video_versions[0].url,
            post.video_versions[0].height,
            post.video_versions[0].width,
            this.createImage(post)
        );
    }

    private getCaption(post: {
        caption: {
            text: string;
        };
    }) {
        if (post.caption) {
            return post.caption.text;
        }
        return "";
    }

    private async wait(time: number) {
        return new Promise((resolve) => {
            setTimeout(resolve, time);
        });
    }
}
