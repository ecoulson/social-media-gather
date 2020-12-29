import "reflect-metadata";
import UserRepository from "../../../src/Repositories/User/UserRepository";
import UserService from "../../../src/Services/UserService";
import { Mock } from "moq.ts";
import container from "../../../src/bootstrap";
import Types from "../../../src/@Types/Types";
import IUser from "../../../src/Entities/User/IUser";
import User from "../../../src/Entities/User/User";

describe("User Service Suite", () => {
    let service: UserService;
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
            .setup((userRepository) => userRepository.create)
            .returns(() => Promise.resolve(user))
            .setup((userRepository) => userRepository.find)
            .returns(() => Promise.resolve([user]));

        container
            .rebind<InstanceType<typeof UserRepository>>(Types.UserRepository)
            .toConstantValue(mockUserRepository.object());

        service = container.get<UserService>(Types.UserService);
    });

    describe("Does user exist", () => {
        test("User does exist", async () => {
            const userExists = await service.doesUserExist("", "");

            expect(userExists).toBeTruthy();
        });

        test("User does not exist", async () => {
            mockUserRepository
                .setup((userRepository) => userRepository.find)
                .returns(() => Promise.resolve([]));
            const userExists = await service.doesUserExist("", "");

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
            const userWithUsername = await service.getUserByUsername("");

            expect(userWithUsername).toEqual(user);
        });
    });
});
