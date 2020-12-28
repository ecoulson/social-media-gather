import "reflect-metadata";
import AuthenticationController from "../../../src/Controllers/AuthenticationController";
import container from "../../../src/bootstrap";
import IUserService from "../../../src/Services/UserService";
import { Mock } from "moq.ts";
import IUser from "../../../src/Entities/User/IUser";
import User from "../../../src/Entities/User/User";
import Types from "../../../src/@Types/Types";
import { Request } from "express";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
jest.mock("bcrypt");
jest.mock("jsonwebtoken");

describe("Authentication Controller Suite", () => {
    let mockUserService: Mock<IUserService>;
    let controller: AuthenticationController;
    let user: IUser;

    beforeEach(() => {
        user = new User("", "", "", "", "", "", "", "", false, []);
        mockUserService = new Mock<IUserService>();

        container.rebind<IUserService>(Types.UserService).toConstantValue(mockUserService.object());
        controller = new AuthenticationController(mockUserService.object());
    });

    describe("Logs in user", () => {
        test("Should fail to find user", async () => {
            mockUserService
                .setup((user) => user.getUserByUsername)
                .returns(() => Promise.resolve(null));

            expect(
                await controller.login({
                    rememberMe: false,
                    username: "",
                    password: ""
                })
            ).toEqual({
                error: "No user with the provided username"
            });
        });

        test("Password does not match", async () => {
            bcrypt.compare = jest
                .fn()
                .mockImplementation((actualPassword, expectedPassword) =>
                    Promise.resolve(actualPassword === expectedPassword)
                );
            mockUserService
                .setup((userRepository) => userRepository.getUserByUsername)
                .returns(() => Promise.resolve(user));

            expect(
                await controller.login({
                    rememberMe: false,
                    username: "",
                    password: "wrong"
                })
            ).toEqual({
                error: "Passwords do not match"
            });
        });

        test("Password matches", async () => {
            bcrypt.compare = jest
                .fn()
                .mockImplementation((actualPassword, expectedPassword) =>
                    Promise.resolve(actualPassword === expectedPassword)
                );
            jsonwebtoken.sign = jest.fn().mockReturnValue("");
            mockUserService
                .setup((userRepository) => userRepository.getUserByUsername)
                .returns(() => Promise.resolve(user));

            expect(
                await controller.login({
                    rememberMe: false,
                    username: "",
                    password: ""
                })
            ).toEqual({
                token: "",
                expiresIn: "1d"
            });
        });
    });

    describe("Verify Authenticated User", () => {
        test("Verifies user", async () => {
            mockUserService
                .setup((userRepository) => userRepository.saveUser)
                .returns((user: IUser) => Promise.resolve(user));

            expect(
                await controller.verifyUser({
                    userEntity: () => user
                } as Request)
            ).toEqual({
                id: "",
                email: "",
                twitchId: "",
                following: [],
                instagramId: "",
                twitterId: "",
                username: "",
                verified: true,
                youtubeId: ""
            });
        });
    });

    describe("Get Authenticated User", () => {
        test("Gets user", () => {
            expect(
                controller.getAuthenticatedUser({
                    userEntity: () => user
                } as Request)
            ).toEqual({
                id: "",
                email: "",
                twitchId: "",
                following: [],
                instagramId: "",
                twitterId: "",
                username: "",
                verified: false,
                youtubeId: ""
            });
        });
    });

    describe("Is Authenticated", () => {
        test("No user entity", () => {
            expect(controller.isAuthenticated({} as Request)).toEqual({
                isAuthenticated: false
            });
        });

        test("Null user", () => {
            expect(
                controller.isAuthenticated({
                    userEntity: () => null
                } as Request)
            ).toEqual({
                isAuthenticated: false
            });
        });

        test("Authenticated User", () => {
            expect(
                controller.isAuthenticated({
                    userEntity: () => user
                } as Request)
            ).toEqual({
                isAuthenticated: true
            });
        });
    });

    describe("Delete User", () => {
        test("Deletes user", async () => {
            mockUserService
                .setup((userRepository) => userRepository.deleteUser)
                .returns((user: IUser) => Promise.resolve(user));

            const message = await controller.deleteAuthenticatedUser({
                userEntity: () => user
            } as Request);

            expect(message).toEqual({
                message: "deleted"
            });
        });

        test("Fails to delete user", async () => {
            mockUserService
                .setup((userRepository) => userRepository.deleteUser)
                .returns(() => Promise.reject("Failure"));

            const message = await controller.deleteAuthenticatedUser({
                userEntity: () => user
            } as Request);

            expect(message).toEqual({
                message: "failed to delete"
            });
        });
    });
});
