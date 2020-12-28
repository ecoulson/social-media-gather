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
            .setup((userRepository) => userRepository.save)
            .returns(() => Promise.resolve(user))
            .setup((userRepository) => userRepository.find)
            .returns(() => Promise.resolve([user]));

        container
            .rebind<InstanceType<typeof UserRepository>>(Types.UserRepository)
            .toConstantValue(mockUserRepository.object());

        service = container.get<UserService>(Types.UserService);
    });

    describe("Save User", () => {
        test("Should save user", async () => {
            await service.saveUser(user);
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
