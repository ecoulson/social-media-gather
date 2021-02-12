import "reflect-metadata";
import UserRepository from "../../../src/Repositories/User/UserRepository";
import UserService from "../../../src/Services/User/UserService";
import { Mock } from "moq.ts";
import container from "../../../src/bootstrap";
import Types from "../../../src/@Types/Types";
import IUser from "../../../src/Entities/User/IUser";
import User from "../../../src/Entities/User/User";
import IUserService from "../../../src/Services/User/IUserService";
import { expect } from "chai";

describe("User Service Suite", () => {
    let service: IUserService;
    let mockUserRepository: Mock<InstanceType<typeof UserRepository>>;
    let user: IUser;

    beforeEach(() => {
        user = new User("", "", "", "", false, [], false, []);
        mockUserRepository = new Mock<InstanceType<typeof UserRepository>>();
        mockUserRepository
            .setup((userRepository) => userRepository.delete)
            .returns(() => Promise.resolve(user))
            .setup((userRepository) => userRepository.update)
            .returns((user) => Promise.resolve(user))
            .setup((userRepository) => userRepository.add)
            .returns(() => Promise.resolve(user))
            .setup((userRepository) => userRepository.find)
            .returns(() => Promise.resolve([user]));

        container
            .rebind<InstanceType<typeof UserRepository>>(Types.UserRepository)
            .toConstantValue(mockUserRepository.object());

        service = new UserService(mockUserRepository.object());
    });

    describe("Verify user", () => {
        it("Verifies user", async () => {
            await service.verifyUser(user);

            expect(user.verified()).true;
        });
    });

    describe("Does user exist", () => {
        it("User does exist", async () => {
            mockUserRepository
                .setup((userRepository) => userRepository.findByUsernameOrEmail)
                .returns(() => Promise.resolve([user]));

            const userExists = await service.doesUserExist(user.email(), user.username());

            expect(userExists).true;
        });

        it("User does not exist", async () => {
            mockUserRepository
                .setup((userRepository) => userRepository.findByUsernameOrEmail)
                .returns(() => Promise.resolve([]));

            const userExists = await service.doesUserExist(user.email(), user.username());

            expect(userExists).false;
        });
    });

    describe("Create user", () => {
        it("Should create user", async () => {
            const newUser = await service.createUser(user);

            expect(newUser).to.deep.equal(user);
        });
    });

    describe("Update User", () => {
        it("Should update user", async () => {
            const newEmail = "test@test.com";
            const savedUser = await service.updateUser(user, {
                email: newEmail
            });

            expect(savedUser.email()).to.deep.equal(newEmail);
        });
    });

    describe("Delete User", () => {
        it("Should delete user", async () => {
            await service.deleteUser(user);
        });
    });

    describe("Finds user by username", () => {
        it("Should find user", async () => {
            mockUserRepository
                .setup((userRepository) => userRepository.findByUsername)
                .returns(() => Promise.resolve(user));

            const userWithUsername = await service.getUserByUsername(user.username());

            expect(userWithUsername).to.deep.equal(user);
        });
    });

    describe("Gets user by id", () => {
        it("Should get user by id", async () => {
            mockUserRepository
                .setup((userRepository) => userRepository.findById)
                .returns(() => Promise.resolve(user));

            const userWithId = await service.getUserById(user.id());

            expect(userWithId).to.deep.equal(user);
        });
    });

    describe("Follow user", () => {
        it("Should follow a user", async () => {
            const userToFollow = new User("followerId", "", "", "", false, [], false, []);
            mockUserRepository
                .setup((userRepository) => userRepository.update)
                .returns((user) => Promise.resolve(user));
            mockUserRepository
                .setup((userRepository) => userRepository.findById)
                .returns(() => Promise.resolve(userToFollow));

            await service.follow(user, userToFollow.id());

            expect(user.following()).to.deep.equal(["followerId"]);
        });
    });

    describe("Unfollow user", () => {
        it("Should unfollow a user", async () => {
            const userToUnfollow = new User("followerId", "", "", "", false, [], false, []);
            user.addFollower(userToUnfollow);
            mockUserRepository
                .setup((userRepository) => userRepository.update)
                .returns((user) => Promise.resolve(user));
            mockUserRepository
                .setup((userRepository) => userRepository.findById)
                .returns(() => Promise.resolve(userToUnfollow));
            expect(user.following()).to.deep.equal(["followerId"]);

            await service.unfollow(user, userToUnfollow.id());

            expect(user.following()).to.deep.equal([]);
        });
    });

    describe("Is following", () => {
        it("Should be following a user", async () => {
            const followedUser = new User("followerId", "", "", "", false, [], false, []);
            mockUserRepository
                .setup((userRepository) => userRepository.findByUsername)
                .returns(() => Promise.resolve(followedUser));
            user.addFollower(followedUser);

            const isFollowing = await service.isFollowing(user, followedUser.username());

            expect(isFollowing).true;
        });
    });
});
