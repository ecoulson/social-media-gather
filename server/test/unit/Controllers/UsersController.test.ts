import "reflect-metadata";
import UserController from "../../../src/Controllers/UsersController";
import container from "../../../src/bootstrap";
import IUserService from "../../../src/Services/UserService";
import { Mock } from "moq.ts";
import IUser from "../../../src/Entities/User/IUser";
import User from "../../../src/Entities/User/User";
import Types from "../../../src/@Types/Types";
import UsersMessage from "../../../src/Messages/UsersMessage";
import DeletedUserMessage from "../../../src/Messages/DeletedUserMessage";
import { Request } from "express";
import IsFollowingMessage from "../../../src/Messages/IsFollowingMessage";

describe("Authentication Controller Suite", () => {
    let mockUserService: Mock<IUserService>;
    let controller: UserController;
    let user: IUser;

    beforeEach(() => {
        user = new User("", "", "", "", "", "", "", "", false, []);
        mockUserService = new Mock<IUserService>();

        container.rebind<IUserService>(Types.UserService).toConstantValue(mockUserService.object());

        controller = new UserController(mockUserService.object());
    });

    describe("Get User By Id", () => {
        test("Should get user by id", async () => {
            mockUserService
                .setup((userService) => userService.getUserById)
                .returns(() => Promise.resolve(user));

            const message = await controller.getUserById(user.id());

            expect(message).toEqual(new UsersMessage([user]).create());
        });
    });

    describe("Delete User With Id", () => {
        test("Should delete user by id", async () => {
            mockUserService
                .setup((userService) => userService.getUserById)
                .returns(() => Promise.resolve(user))
                .setup((userService) => userService.deleteUser)
                .returns(() => Promise.resolve(user));

            const message = await controller.deleteUser(user.id());

            expect(message).toEqual(new DeletedUserMessage(user.id()).create());
        });
    });

    describe("Get User With Username", () => {
        test("Should get user with username", async () => {
            mockUserService
                .setup((userService) => userService.getUserByUsername)
                .returns(() => Promise.resolve(user));

            const message = await controller.getUserByUsername(user.username());

            expect(message).toEqual(new UsersMessage([user]).create());
        });
    });

    describe("Follow User", () => {
        test("Should follow user", async () => {
            const userToFollow = new User("followerId", "", "", "", "", "", "", "", false, []);
            mockUserService
                .setup((userService) => userService.follow)
                .returns((actingUser) => Promise.resolve(actingUser));
            mockUserService
                .setup((userService) => userService.getUserById)
                .returns(() => Promise.resolve(userToFollow));

            const message = await controller.followUser({
                userEntity: () => user,
                params: {
                    userToFollowId: userToFollow.id()
                } as unknown
            } as Request);

            expect(message).toEqual(new UsersMessage([user]).create());
        });
    });

    describe("Unfollow User", () => {
        test("Should unfollow user", async () => {
            const userToUnfollow = new User("followerId", "", "", "", "", "", "", "", false, []);
            user.addFollower(userToUnfollow);
            mockUserService
                .setup((userService) => userService.unfollow)
                .returns((actingUser) => Promise.resolve(actingUser));
            mockUserService
                .setup((userService) => userService.getUserById)
                .returns(() => Promise.resolve(userToUnfollow));

            const message = await controller.unfollowUser({
                userEntity: () => user,
                params: {
                    userToUnfollowId: userToUnfollow.id()
                } as unknown
            } as Request);

            expect(message).toEqual(new UsersMessage([user]).create());
        });
    });

    describe("Is following", () => {
        test("Is following user", async () => {
            const userToUnfollow = new User("followerId", "", "", "", "", "", "", "", false, []);
            user.addFollower(userToUnfollow);
            mockUserService
                .setup((userService) => userService.isFollowing)
                .returns(() => Promise.resolve(true));

            const message = await controller.isFollowingUser({
                userEntity: () => user,
                params: {
                    followingUsername: userToUnfollow.username()
                } as unknown
            } as Request);

            expect(message).toEqual(new IsFollowingMessage(true).create());
        });
    });

    describe("Update user", () => {
        test("Should update user", async () => {
            mockUserService
                .setup((userService) => userService.updateUser)
                .returns((user) => Promise.resolve(user));

            const message = await controller.updateUser({
                userEntity: () => user
            } as Request);

            expect(message).toEqual(new UsersMessage([user]).create());
        });
    });
});
