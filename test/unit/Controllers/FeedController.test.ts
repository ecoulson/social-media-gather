import "reflect-metadata";
import FeedController from "../../../src/Controllers/FeedController";
import container from "../../../src/bootstrap";
import { Mock } from "moq.ts";
import IUser from "../../../src/Entities/User/IUser";
import User from "../../../src/Entities/User/User";
import Types from "../../../src/@Types/Types";
import IFeedService from "../../../src/Services/IFeedService";
import { Request } from "express";
import FeedMessage from "../../../src/Messages/FeedMessage";

describe("Authentication Controller Suite", () => {
    let mockFeedService: Mock<IFeedService>;
    let controller: FeedController;
    let user: IUser;

    beforeEach(() => {
        user = new User("", "", "", "", "", "", "", "", false, []);
        mockFeedService = new Mock<IFeedService>();

        container.rebind<IFeedService>(Types.FeedService).toConstantValue(mockFeedService.object());

        controller = new FeedController(container.get<IFeedService>(Types.FeedService));
    });

    describe("Gets users feed", () => {
        test("Should get users feed", async () => {
            mockFeedService
                .setup((feedService) => feedService.getUsersFeed)
                .returns(() => Promise.resolve([]));

            const message = await controller.getUsersFeed({
                userEntity: () => user,
                query: {
                    offset: "0"
                } as unknown
            } as Request);

            expect(message).toEqual(new FeedMessage([]).create());
        });
    });

    describe("Gets users posts", () => {
        test("Should get users posts", async () => {
            mockFeedService
                .setup((feedService) => feedService.getUsersPosts)
                .returns(() => Promise.resolve([]));

            const message = await controller.getUsersPosts(user.id(), "0");

            expect(message).toEqual(new FeedMessage([]).create());
        });
    });
});
