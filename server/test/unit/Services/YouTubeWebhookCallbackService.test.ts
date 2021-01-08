import "reflect-metadata";
import container from "../../../src/bootstrap";
import { Mock } from "moq.ts";
import IUser from "../../../src/Entities/User/IUser";
import User from "../../../src/Entities/User/User";
import Types from "../../../src/@Types/Types";
import IWebhookCallbackService from "../../../src/Services/WebhookCallbacks/IWebhookCallbackService";
import IYouTubeWebhookCallbackData from "../../../src/Services/WebhookCallbacks/IYouTubeWebhookCallbackData";
import YouTubeRepository from "../../../src/Repositories/YouTubeVideo/YouTubeRepository";
import YouTubeAPIClient from "../../../src/Library/YouTube/YouTubeAPIClient";
import YouTubeWebhookCallbackService from "../../../src/Services/WebhookCallbacks/YouTubeWebhookCallbackService";
import VideoClient from "../../../src/Library/YouTube/Videos/VideoClient";

describe("Authentication Controller Suite", () => {
    let mockYouTubeVideoRepository: Mock<InstanceType<typeof YouTubeRepository>>;
    let mockVideoClient: Mock<VideoClient>;
    let mockYouTubeClient: Mock<YouTubeAPIClient>;
    let service: IWebhookCallbackService<IYouTubeWebhookCallbackData>;
    let user: IUser;

    beforeEach(() => {
        user = new User("", "", "", "", "", "", "", "", false, []);
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
        test("Should return the challenge", () => {
            expect(service.handleChallenge("challenge")).toEqual("challenge");
        });
    });

    describe("Handle Callback", () => {
        test("Should handle the callback", async () => {
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
                            thumbnails: {
                                default: {
                                    url: ""
                                }
                            },
                            publishedAt: new Date()
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
                userId: user.id()
            });
        });
    });
});
