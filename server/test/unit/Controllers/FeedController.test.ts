import "reflect-metadata";
import FeedController from "../../../src/Controllers/FeedController";
import container from "../../../src/bootstrap";
import { Mock } from "moq.ts";
import IUser from "../../../src/Entities/User/IUser";
import User from "../../../src/Entities/User/User";
import Types from "../../../src/@Types/Types";
import IFeedService from "../../../src/Services/Feed/IFeedService";
import { Request } from "express";
import PostMessage from "../../../src/Messages/Posts/PostMessage";
import { expect } from "chai";

describe("Authentication Controller Suite", () => {
    let mockFeedService: Mock<IFeedService>;
    let controller: FeedController;
    let user: IUser;

    beforeEach(() => {
        user = new User("", "", "", "", false, [], false, []);
        mockFeedService = new Mock<IFeedService>();

        container.rebind<IFeedService>(Types.FeedService).toConstantValue(mockFeedService.object());

        controller = new FeedController(container.get<IFeedService>(Types.FeedService));
    });

    describe("Gets users feed", () => {
        it("Should get users feed", async () => {
            mockFeedService
                .setup((feedService) => feedService.getUsersFeed)
                .returns(() => Promise.resolve([]));

            const message = await controller.getUsersFeed({
                user: () => user,
                query: {
                    offset: "0"
                } as unknown
            } as Request);

            expect(message).to.deep.equal(new PostMessage([]).toJson());
        });
    });

    describe("Gets users posts", () => {
        it("Should get users posts", async () => {
            mockFeedService
                .setup((feedService) => feedService.getCreatorsPosts)
                .returns(() => Promise.resolve([]));

            const message = await controller.getUsersPosts(user.id(), "0");

            expect(message).to.deep.equal(new PostMessage([]).toJson());
        });
    });
});
