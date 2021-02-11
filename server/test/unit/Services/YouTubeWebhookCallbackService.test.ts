import "reflect-metadata";
import container from "../../../src/bootstrap";
import { Mock } from "moq.ts";
import IUser from "../../../src/Entities/User/IUser";
import User from "../../../src/Entities/User/User";
import Types from "../../../src/@Types/Types";
import IWebhookCallbackService from "../../../src/Services/WebhookCallbacks/IWebhookCallbackService";
import IYouTubeWebhookCallbackData from "../../../src/Services/WebhookCallbacks/IYouTubeWebhookCallbackData";
import YouTubeRepository from "../../../src/Repositories/YouTubeVideo/YouTubeRepository";
import YouTubeWebhookCallbackService from "../../../src/Services/WebhookCallbacks/YouTubeWebhookCallbackService";
import VideoClient from "../../../src/Libraries/YouTube/Videos/VideoClient";
import YouTubeAPIClient from "../../../src/Libraries/YouTube/YouTubeAPIClient";
import IChannel from "../../../src/Entities/Channel/IChannel";
import Channel from "../../../src/Entities/Channel/Channel";
import Platform from "../../../src/Entities/Platform/Platform";
import { expect } from "chai";

describe("Authentication Controller Suite", () => {
    let mockYouTubeVideoRepository: Mock<InstanceType<typeof YouTubeRepository>>;
    let mockVideoClient: Mock<VideoClient>;
    let mockYouTubeClient: Mock<YouTubeAPIClient>;
    let service: IWebhookCallbackService<IYouTubeWebhookCallbackData>;
    let user: IUser;
    let channel: IChannel;

    beforeEach(() => {
        user = new User("", "", "", "", false, [], false, []);
        channel = new Channel("", "", "", Platform.TIKTOK, 0);
        mockYouTubeClient = new Mock<YouTubeAPIClient>();
        mockVideoClient = new Mock<VideoClient>();
        mockYouTubeVideoRepository = new Mock<InstanceType<typeof YouTubeRepository>>();

        container
            .rebind<InstanceType<typeof YouTubeRepository>>(Types.YouTubeVideoRepository)
            .toConstantValue(mockYouTubeVideoRepository.object());
        container
            .rebind<YouTubeAPIClient>(Types.YouTubeAPIClient)
            .toConstantValue(mockYouTubeClient.object());

        service = new YouTubeWebhookCallbackService(
            container.get<InstanceType<typeof YouTubeRepository>>(Types.YouTubeVideoRepository),
            container.get<YouTubeAPIClient>(Types.YouTubeAPIClient)
        );
    });

    describe("Handle Challenge", () => {
        it("Should return the challenge", () => {
            expect(service.handleChallenge("challenge")).to.equal("challenge");
        });
    });

    describe("Handle Callback", () => {
        it("Should handle the callback", async () => {
            mockYouTubeVideoRepository
                .setup((youTubeVideoRepository) => youTubeVideoRepository.find)
                .returns(() => Promise.resolve([]));
            mockYouTubeVideoRepository
                .setup((youTubeVideoRepository) => youTubeVideoRepository.add)
                .returns((video) => Promise.resolve(video));
            mockVideoClient
                .setup((videoClient) => videoClient.list)
                .returns(() =>
                    Promise.resolve([
                        {
                            id: "",
                            title: "",
                            snippet: {
                                publishedAt: new Date().toDateString(),
                                thumbnails: {
                                    standard: {
                                        url: "",
                                        width: 0,
                                        height: 0
                                    }
                                }
                            },
                            statistics: {
                                likeCount: "0",
                                dislikeCount: "0",
                                commentCount: "0",
                                viewCount: "0"
                            }
                        }
                    ])
                );
            mockYouTubeClient
                .setup((youtubeClient) => youtubeClient.videos)
                .returns(mockVideoClient.object());

            await service.handleCallback({
                feed: {
                    entry: {
                        "yt:videoid": "id"
                    }
                },
                creatorId: user.id(),
                channelId: channel.id()
            });
        });
    });
});
