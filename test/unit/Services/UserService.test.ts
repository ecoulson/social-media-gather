import "reflect-metadata";
import UserRepository from "../../../src/Repositories/User/UserRepository";
import UserService from "../../../src/Services/UserService";
import { Mock } from "moq.ts";
import container from "../../../src/bootstrap";
import Types from "../../../src/@Types/Types";
import IUser from "../../../src/Entities/User/IUser";
import User from "../../../src/Entities/User/User";
import IUserService from "../../../src/Services/IUserService";

describe("User Service Suite", () => {
    let service: IUserService;
    let mockUserRepository: Mock<InstanceType<typeof UserRepository>>;
    let user: IUser;

    beforeEach(() => {
        user = new User("", "", "", "", "", "", "", "", false, []);
        mockUserRepository = new Mock<InstanceType<typeof UserRepository>>();
        mockUserRepository
            .setup((userRepository) => userRepository.delete)
            .returns(() => Promise.resolve(user))
            .setup((userRepository) => userRepository.update)
            .returns(() => Promise.resolve(user))
            .setup((userRepository) => userRepository.add)
            .returns(() => Promise.resolve(user))
            .setup((userRepository) => userRepository.find)
            .returns(() => Promise.resolve([user]));

        container
            .rebind<InstanceType<typeof UserRepository>>(Types.UserRepository)
            .toConstantValue(mockUserRepository.object());

        service = container.get<UserService>(Types.UserService);
    });

    describe("Verify user", () => {
        test("Verifies user", async () => {
            await service.verifyUser(user);

            expect(user.verified()).toBeTruthy();
        });
    });

    describe("Does user exist", () => {
        test("User does exist", async () => {
            mockUserRepository
                .setup((userRepository) => userRepository.findByUsernameOrEmail)
                .returns(() => Promise.resolve(user));

            const userExists = await service.doesUserExist(user.email(), user.username());

            expect(userExists).toBeTruthy();
        });

        test("User does not exist", async () => {
            mockUserRepository
                .setup((userRepository) => userRepository.findByUsernameOrEmail)
                .returns(() => Promise.resolve(null));

            const userExists = await service.doesUserExist(user.email(), user.username());

            expect(userExists).toBeFalsy();
        });
    });

    describe("Create user", () => {
        test("Should create user", async () => {
            const newUser = await service.createUser(user);

            expect(newUser).toEqual(user);
        });
    });

    describe("Update User", () => {
        test("Should update user", async () => {
            const savedUser = await service.updateUser(user);

            expect(savedUser).toEqual(user);
        });
    });

    describe("Delete User", () => {
        test("Should delete user", async () => {
            await service.deleteUser(user);
        });
    });

    describe("Finds user by username", () => {
        test("Should find user", async () => {
            mockUserRepository
                .setup((userRepository) => userRepository.findByUsername)
                .returns(() => Promise.resolve(user));

            const userWithUsername = await service.getUserByUsername(user.username());

            expect(userWithUsername).toEqual(user);
        });
    });

    describe("Gets user by id", () => {
        test("Should get user by id", async () => {
            mockUserRepository
                .setup((userRepository) => userRepository.findById)
                .returns(() => Promise.resolve(user));

            const userWithId = await service.getUserById(user.id());

            expect(userWithId).toEqual(user);
        });
    });
});
