import "reflect-metadata";
import container from "../../../src/bootstrap";
import { Mock } from "moq.ts";
import IUser from "../../../src/Entities/User/IUser";
import User from "../../../src/Entities/User/User";
import Types from "../../../src/@Types/Types";
import IWebhookCallbackService from "../../../src/Services/WebhookCallbacks/IWebhookCallbackService";
import ITwitchWebhookCallbackData from "../../../src/Services/WebhookCallbacks/ITwitchWebhookCallbackData";
import TwitchWebhookCallbackService from "../../../src/Services/WebhookCallbacks/TwitchWebhookCallbackService";
import TwitchAPIClient from "../../../src/Libraries/Twitch/TwitchAPIClient";
import TwitchStreamRepository from "../../../src/Repositories/TwitchStream/TwitchStreamRepository";
import IChannel from "../../../src/Entities/Channel/IChannel";
import Channel from "../../../src/Entities/Channel/Channel";
import Platform from "../../../src/Entities/Platform/Platform";
import { expect } from "chai";

describe("Authentication Controller Suite", () => {
    let mockTwitchStreamRepository: Mock<InstanceType<typeof TwitchStreamRepository>>;
    let mockTwitchClient: Mock<TwitchAPIClient>;
    let service: IWebhookCallbackService<ITwitchWebhookCallbackData>;
    let user: IUser;
    let channel: IChannel;

    beforeEach(() => {
        user = new User("", "", "", "", false, [], false, []);
        channel = new Channel("", "", "", Platform.TIKTOK, 0);
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
        it("Should return the challenge", () => {
            expect(service.handleChallenge("challenge")).to.deep.equal("challenge");
        });
    });

    describe("Handle Callback", () => {
        it("Should handle the callback", async () => {
            mockTwitchStreamRepository
                .setup(
                    (twitchStreamRepository) => twitchStreamRepository.findAllLiveBroadcastsForUser
                )
                .returns(() => Promise.resolve([]));

            await service.handleCallback({
                streams: [],
                creatorId: user.id(),
                channelId: channel.id()
            });
        });
    });
});
