import "reflect-metadata";
import container from "../../../src/bootstrap";
import { Mock } from "moq.ts";
import IUser from "../../../src/Entities/User/IUser";
import User from "../../../src/Entities/User/User";
import Types from "../../../src/@Types/Types";
import IWebhookCallbackService from "../../../src/Services/IWebhookCallbackService";
import ITwitchWebhookCallbackData from "../../../src/Services/ITwitchWebhookCallbackData";
import TwitchWebhookCallbackService from "../../../src/Services/TwitchWebhookCallbackService";
import TwitchAPIClient from "../../../src/Library/Twitch/TwitchAPIClient";
import TwitchStreamRepository from "../../../src/Repositories/TwitchStream/TwitchStreamRepository";

describe("Authentication Controller Suite", () => {
    let mockTwitchStreamRepository: Mock<InstanceType<typeof TwitchStreamRepository>>;
    let mockTwitchClient: Mock<TwitchAPIClient>;
    let service: IWebhookCallbackService<ITwitchWebhookCallbackData>;
    let user: IUser;

    beforeEach(() => {
        user = new User("", "", "", "", "", "", "", "", false, []);
        mockTwitchClient = new Mock<TwitchAPIClient>();
        mockTwitchStreamRepository = new Mock<InstanceType<typeof TwitchStreamRepository>>();

        container
            .rebind<InstanceType<typeof TwitchStreamRepository>>(Types.TwitchStreamRepository)
            .toConstantValue(mockTwitchStreamRepository.object());
        container
            .rebind<TwitchAPIClient>(Types.TwitchAPIClient)
            .toConstantValue(mockTwitchClient.object());

        service = new TwitchWebhookCallbackService(
            container.get<InstanceType<typeof TwitchStreamRepository>>(
                Types.TwitchStreamRepository
            ),
            container.get<TwitchAPIClient>(Types.TwitchAPIClient)
        );
    });

    describe("Handle Challenge", () => {
        test("Should return the challenge", () => {
            expect(service.handleChallenge("challenge")).toEqual("challenge");
        });
    });

    describe("Handle Callback", () => {
        test("Should handle the callback", async () => {
            mockTwitchStreamRepository
                .setup(
                    (twitchStreamRepository) => twitchStreamRepository.findAllLiveBroadcastsForUser
                )
                .returns(() => Promise.resolve([]));

            await service.handleCallback({
                streams: [],
                userId: user.id()
            });
        });
    });
});
