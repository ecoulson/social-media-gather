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
import IAuthenticationService from "../../../src/Services/IAuthenticationService";
import UserExistsException from "../../../src/Exceptions/UserExistsExceptions";
import MessageType from "../../../src/Messages/MessageType";
jest.mock("bcrypt");
jest.mock("jsonwebtoken");

describe("Authentication Controller Suite", () => {
    let mockUserService: Mock<IUserService>;
    let mockAuthenticationService: Mock<IAuthenticationService>;
    let controller: AuthenticationController;
    let user: IUser;

    beforeEach(() => {
        user = new User("", "", "", "", "", "", "", "", false, []);
        mockUserService = new Mock<IUserService>();
        mockAuthenticationService = new Mock<IAuthenticationService>();

        container.rebind<IUserService>(Types.UserService).toConstantValue(mockUserService.object());
        container
            .rebind<IAuthenticationService>(Types.AuthenticationService)
            .toConstantValue(mockAuthenticationService.object());

        controller = new AuthenticationController(
            mockUserService.object(),
            mockAuthenticationService.object()
        );
    });

    describe("Register", () => {
        test("User already exists", async () => {
            mockUserService
                .setup((userService) => userService.doesUserExist)
                .returns(() => Promise.resolve(true));
            mockAuthenticationService
                .setup((authenticationService) => authenticationService.register)
                .returns(() =>
                    Promise.reject(new UserExistsException(user.username(), user.email()))
                );

            expect(
                await controller.register({
                    password: "",
                    email: "",
                    username: ""
                })
            ).toEqual({
                metadata: {
                    success: false,
                    type: MessageType.UserExistsMessage
                },
                data: {
                    message: `A user with either the username '' or the email '' already exists`
                }
            });
        });

        test("Should register user", async () => {
            mockUserService
                .setup((userService) => userService.doesUserExist)
                .returns(() => Promise.resolve(false))
                .setup((userService) => userService.createUser)
                .returns((user) => Promise.resolve(user))
                .setup((userService) => userService.updateUser)
                .returns((user) => Promise.resolve(user));
            mockAuthenticationService
                .setup((authenticationService) => authenticationService.register)
                .returns(() => Promise.resolve(user));

            expect(
                await controller.register({
                    password: user.password(),
                    email: user.email(),
                    username: user.username()
                })
            ).toEqual({
                metadata: {
                    type: MessageType.RetrievedUsersMessage,
                    success: true
                },
                data: {
                    users: [
                        {
                            id: user.id(),
                            twitchId: user.twitchId(),
                            twitterId: user.twitterId(),
                            instagramId: user.instagramId(),
                            youtubeId: user.youTubeId(),
                            username: user.username(),
                            email: user.email(),
                            verified: user.verified(),
                            following: []
                        }
                    ]
                }
            });
        });
    });

    describe("Logs in user", () => {
        test("Should fail to find user", async () => {
            mockUserService
                .setup((userService) => userService.getUserByUsername)
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
                .setup((userService) => userService.getUserByUsername)
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
                .setup((userRepository) => userRepository.updateUser)
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
                .setup((userService) => userService.deleteUser)
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
                .setup((userService) => userService.deleteUser)
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
