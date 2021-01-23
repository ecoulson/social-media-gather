import {
    IgApiClient,
    UserFeedResponseCarouselMediaItem,
    UserFeedResponseItemsItem
} from "instagram-private-api";
import { inject, injectable, tagged } from "inversify";
import InstagramPostBuilder from "../../../Entities/InstagramPost/InstagramPostBuilder";
import Tags from "../../../@Types/Tags";
import Types from "../../../@Types/Types";
import Image from "../../../Entities/Media/Image";
import Video from "../../../Entities/Media/Video";
import IUser from "../../../Entities/User/IUser";
import InstagramPostRepository from "../../../Repositories/InstagramPost/InstagramPostRepository";
import UserRepository from "../../../Repositories/User/UserRepository";
import IMediaPlatformChannelService from "../IMediaChannelService";
import IMediaPlatformChannelSearchResult from "../IMediaPlatformChannelSearchResult";

@injectable()
export default class InstagramChannelService implements IMediaPlatformChannelService {
    constructor(
        @inject(Types.InstagramAPIClient) private instagramApi: IgApiClient,
        @inject(Types.UserRepository)
        @tagged(Tags.MONGO, true)
        private userRepository: InstanceType<typeof UserRepository>,
        @inject(Types.InstagramPostRepository)
        @tagged(Tags.MONGO, true)
        private instagramPostRepository: InstanceType<typeof InstagramPostRepository>
    ) {}

    async searchPlatformForChannel(username: string): Promise<IMediaPlatformChannelSearchResult> {
        const searchResults = await this.instagramApi.search.users(username);
        return {
            channels: searchResults.map((user) => {
                return {
                    username: user.username,
                    id: user.pk.toString(),
                    profilePicture: user.profile_pic_url,
                    subscriberCount: user.follower_count
                };
            })
        };
    }

    async linkChannelWithUserId(userId: string, instagramAccountId: string): Promise<void> {
        const user = await this.userRepository.findById(userId);
        this.linkChannel(user, instagramAccountId);
    }

    async linkChannel(user: IUser, instagramAccountId: string): Promise<void> {
        user.setInstagramId(instagramAccountId);
        if (user.id() === "") {
            await this.userRepository.add(user);
        } else {
            await this.userRepository.update(user);
        }
        const igUser = await this.instagramApi.user.info(instagramAccountId);
        const userFeed = this.instagramApi.feed.user(instagramAccountId);
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
                                .setUserId(user.id())
                                .setPostId(postItem.id)
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
                                .setUserId(user.id())
                                .setPostId(postItem.id)
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
                                .setUserId(user.id())
                                .setPostId(postItem.id)
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
