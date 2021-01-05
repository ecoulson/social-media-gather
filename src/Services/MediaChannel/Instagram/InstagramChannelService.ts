import { IgApiClient } from "instagram-private-api";
import { inject, injectable, tagged } from "inversify";
import Tags from "../../../@Types/Tags";
import Types from "../../../@Types/Types";
import InstagramPost from "../../../Entities/InstagramPost/InstagramPost";
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
                    profilePicture: user.profile_pic_url
                };
            })
        };
    }

    async registerChannelForUserId(userId: string, instagramAccountId: string): Promise<void> {
        const user = await this.userRepository.findById(userId);
        this.registerChannel(user, instagramAccountId);
    }

    async registerChannel(user: IUser, instagramAccountId: string): Promise<void> {
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
        while (count < igUser.media_count) {
            count += page.length;
            await Promise.all(
                page.map(async (postItem) => {
                    if (postItem.media_type === 8) {
                        const post = new InstagramPost(
                            "",
                            user.id(),
                            postItem.id,
                            postItem.like_count,
                            new Date(postItem.taken_at * 1000),
                            this.getCaption(postItem),
                            postItem.carousel_media.map((slide) => {
                                return new Image(
                                    slide.id,
                                    slide.image_versions2.candidates[0].url,
                                    slide.image_versions2.candidates[0].width,
                                    slide.image_versions2.candidates[0].height
                                );
                            }),
                            new Image(
                                postItem.carousel_media[0].id,
                                postItem.carousel_media[0].image_versions2.candidates[0].url,
                                postItem.carousel_media[0].image_versions2.candidates[0].width,
                                postItem.carousel_media[0].image_versions2.candidates[0].height
                            )
                        );
                        return this.instagramPostRepository.add(post);
                    } else if (postItem.media_type === 2) {
                        const post = new InstagramPost(
                            "",
                            user.id(),
                            postItem.id,
                            postItem.like_count,
                            new Date(postItem.taken_at * 1000),
                            this.getCaption(postItem),
                            [
                                new Video(
                                    postItem.video_versions[0].id,
                                    postItem.video_versions[0].url,
                                    postItem.video_versions[0].height,
                                    postItem.video_versions[0].width,
                                    new Image(
                                        postItem.id,
                                        postItem.image_versions2.candidates[0].url,
                                        postItem.image_versions2.candidates[0].width,
                                        postItem.image_versions2.candidates[0].height
                                    )
                                )
                            ],
                            new Image(
                                postItem.id,
                                postItem.image_versions2.candidates[0].url,
                                postItem.image_versions2.candidates[0].width,
                                postItem.image_versions2.candidates[0].height
                            )
                        );
                        return this.instagramPostRepository.add(post);
                    } else {
                        const post = new InstagramPost(
                            "",
                            user.id(),
                            postItem.id,
                            postItem.like_count,
                            new Date(postItem.taken_at * 1000),
                            this.getCaption(postItem),
                            [
                                new Image(
                                    postItem.id,
                                    postItem.image_versions2.candidates[0].url,
                                    postItem.image_versions2.candidates[0].width,
                                    postItem.image_versions2.candidates[0].height
                                )
                            ],
                            new Image(
                                postItem.id,
                                postItem.image_versions2.candidates[0].url,
                                postItem.image_versions2.candidates[0].width,
                                postItem.image_versions2.candidates[0].height
                            )
                        );
                        return this.instagramPostRepository.add(post);
                    }
                })
            );
            page = await userFeed.items();
            await this.wait(5000 + Math.random() * 500);
        }
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
