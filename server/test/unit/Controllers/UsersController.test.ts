import "reflect-metadata";
import UserController from "../../../src/Controllers/UsersController";
import container from "../../../src/bootstrap";
import IUserService from "../../../src/Services/User/UserService";
import { Mock } from "moq.ts";
import IUser from "../../../src/Entities/User/IUser";
import User from "../../../src/Entities/User/User";
import Types from "../../../src/@Types/Types";
import UsersMessage from "../../../src/Messages/Users/UsersMessage";
import DeletedUserMessage from "../../../src/Messages/Users/DeletedUserMessage";
import { Request } from "express";
import IsFollowingMessage from "../../../src/Messages/Following/IsFollowingMessage";
import { expect } from "chai";

describe("Authentication Controller Suite", () => {
    let mockUserService: Mock<IUserService>;
    let controller: UserController;
    let user: IUser;

    beforeEach(() => {
        user = new User("", "", "", "", false, [], false, []);
        mockUserService = new Mock<IUserService>();

        container.rebind<IUserService>(Types.UserService).toConstantValue(mockUserService.object());

        controller = new UserController(mockUserService.object());
    });

    describe("Get User By Id", () => {
        it("Should get user by id", async () => {
            mockUserService
                .setup((userService) => userService.getUserById)
                .returns(() => Promise.resolve(user));

            const message = await controller.getUserById(user.id());

            expect(message).to.deep.equal(new UsersMessage([user]).toJson());
        });
    });

    describe("Delete User With Id", () => {
        it("Should delete user by id", async () => {
            mockUserService
                .setup((userService) => userService.getUserById)
                .returns(() => Promise.resolve(user))
                .setup((userService) => userService.deleteUser)
                .returns(() => Promise.resolve(user));

            const message = await controller.deleteUser(user.id());

            expect(message).to.deep.equal(new DeletedUserMessage(user.id()).toJson());
        });
    });

    describe("Get User With Username", () => {
        it("Should get user with username", async () => {
            mockUserService
                .setup((userService) => userService.getUserByUsername)
                .returns(() => Promise.resolve(user));

            const message = await controller.getUserByUsername(user.username());

            expect(message).to.deep.equal(new UsersMessage([user]).toJson());
        });
    });

    describe("Follow User", () => {
        it("Should follow user", async () => {
            const userToFollow = new User("followerId", "", "", "", false, [], false, []);
            mockUserService
                .setup((userService) => userService.follow)
                .returns((actingUser) => Promise.resolve(actingUser));
            mockUserService
                .setup((userService) => userService.getUserById)
                .returns(() => Promise.resolve(userToFollow));

            const message = await controller.followUser({
                user: () => user,
                params: {
                    userToFollowId: userToFollow.id()
                } as unknown
            } as Request);

            expect(message).to.deep.equal(new UsersMessage([user]).toJson());
        });
    });

    describe("Unfollow User", () => {
        it("Should unfollow user", async () => {
            const userToUnfollow = new User("followerId", "", "", "", false, [], false, []);
            user.addFollower(userToUnfollow);
            mockUserService
                .setup((userService) => userService.unfollow)
                .returns((actingUser) => Promise.resolve(actingUser));
            mockUserService
                .setup((userService) => userService.getUserById)
                .returns(() => Promise.resolve(userToUnfollow));

            const message = await controller.unfollowUser({
                user: () => user,
                params: {
                    userToUnfollowId: userToUnfollow.id()
                } as unknown
            } as Request);

            expect(message).to.deep.equal(new UsersMessage([user]).toJson());
        });
    });

    describe("Is following", () => {
        it("Is following user", async () => {
            const userToUnfollow = new User("followerId", "", "", "", false, [], false, []);
            user.addFollower(userToUnfollow);
            mockUserService
                .setup((userService) => userService.isFollowing)
                .returns(() => Promise.resolve(true));

            const message = await controller.isFollowingUser({
                user: () => user,
                params: {
                    followingUsername: userToUnfollow.username()
                } as unknown
            } as Request);

            expect(message).to.deep.equal(new IsFollowingMessage(true).toJson());
        });
    });

    describe("Update user", () => {
        it("Should update user", async () => {
            mockUserService
                .setup((userService) => userService.updateUser)
                .returns((user) => Promise.resolve(user));

            const message = await controller.updateUser({
                user: () => user
            } as Request);

            expect(message).to.deep.equal(new UsersMessage([user]).toJson());
        });
    });
});
