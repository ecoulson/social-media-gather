import "reflect-metadata";
import container from "../../../src/bootstrap";
import { Mock } from "moq.ts";
import IUser from "../../../src/Entities/User/IUser";
import User from "../../../src/Entities/User/User";
import Types from "../../../src/@Types/Types";
import IFeedService from "../../../src/Services/Feed/IFeedService";
import UserRepository from "../../../src/Repositories/User/UserRepository";
import PostRepository from "../../../src/Repositories/Post/PostRepository";
import FeedService from "../../../src/Services/Feed/FeedService";
import { expect } from "chai";

describe("Feed Service Suite", () => {
    let mockUserRepository: Mock<InstanceType<typeof UserRepository>>;
    let mockPostRepository: Mock<InstanceType<typeof PostRepository>>;
    let service: IFeedService;
    let user: IUser;

    beforeEach(() => {
        user = new User("", "", "", "", false, [], false, []);
        mockUserRepository = new Mock<InstanceType<typeof UserRepository>>();
        mockPostRepository = new Mock<InstanceType<typeof PostRepository>>();

        container
            .rebind<InstanceType<typeof UserRepository>>(Types.UserRepository)
            .toConstantValue(mockUserRepository.object());
        container
            .rebind<InstanceType<typeof PostRepository>>(Types.PostRepository)
            .toConstantValue(mockPostRepository.object());

        service = new FeedService(
            container.get<InstanceType<typeof PostRepository>>(Types.PostRepository),
            container.get<InstanceType<typeof UserRepository>>(Types.UserRepository)
        );
    });

    describe("Should get users feed", () => {
        it("Gets users feed", async () => {
            mockPostRepository
                .setup((postRepository) => postRepository.find)
                .returns(() => Promise.resolve([]));

            const posts = await service.getUsersFeed(user, 0);

            expect(posts).to.deep.equal([]);
        });
    });

    describe("Should get creators posts", () => {
        it("Gets creators posts", async () => {
            mockUserRepository
                .setup((userRepository) => userRepository.findById)
                .returns(() => Promise.resolve(user));
            mockPostRepository
                .setup((postRepository) => postRepository.find)
                .returns(() => Promise.resolve([]));

            const posts = await service.getCreatorsPosts(user.id(), 0);

            expect(posts).to.deep.equal([]);
        });
    });
});
