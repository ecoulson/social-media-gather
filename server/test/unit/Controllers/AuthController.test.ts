import "reflect-metadata";
import AuthenticationController from "../../../src/Controllers/AuthenticationController";
import container from "../../../src/bootstrap";
import IUserService from "../../../src/Services/User/UserService";
import { Mock } from "moq.ts";
import IUser from "../../../src/Entities/User/IUser";
import User from "../../../src/Entities/User/User";
import Types from "../../../src/@Types/Types";
import { Request } from "express";
import IAuthenticationService from "../../../src/Services/Authentication/IAuthenticationService";
import UserExistsException from "../../../src/Exceptions/UserExistsExceptions";
import UserDoesNotExistsException from "../../../src/Exceptions/UserDoesNotExistException";
import IllegalLoginException from "../../../src/Exceptions/IllegalLoginException";
import IUserTokenPayload from "../../../src/Services/User/IUserTokenPayload";
import IToken from "../../../src/Security/Tokens/IToken";
import UserExistsMessage from "../../../src/Messages/UserExistsMessage";
import UsersMessage from "../../../src/Messages/UsersMessage";
import UnauthenticatedMessage from "../../../src/Messages/UnauthenticatedMessage";
import TokenMessage from "../../../src/Messages/TokenMessage";
import UserDoesNotExistMessage from "../../../src/Messages/UserDoesNotExistMessage";
import AuthenticatedMessage from "../../../src/Messages/AuthenticatedMessage";
import DeletedUserMessage from "../../../src/Messages/DeletedUserMessage";

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
                    password: user.password(),
                    email: user.email(),
                    username: user.username()
                })
            ).toEqual(new UserExistsMessage(user.username(), user.email()).create());
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
            ).toEqual(new UsersMessage([user]).create());
        });
    });

    describe("Logs in user", () => {
        test("Should fail to find user", async () => {
            mockAuthenticationService
                .setup((authenticationService) => authenticationService.login)
                .returns(() => Promise.reject(new UserDoesNotExistsException(user.username())));

            expect(
                await controller.login({
                    rememberMe: false,
                    username: user.username(),
                    password: user.password()
                })
            ).toEqual(new UserDoesNotExistMessage(user.username()).create());
        });

        test("Password does not match", async () => {
            mockAuthenticationService
                .setup((authenticationService) => authenticationService.login)
                .returns(() => Promise.reject(new IllegalLoginException(user)));

            expect(
                await controller.login({
                    rememberMe: false,
                    username: "",
                    password: "wrong"
                })
            ).toEqual(new UnauthenticatedMessage().create());
        });

        test("Password matches", async () => {
            const token = new Mock<IToken<IUserTokenPayload>>();
            token.setup((token) => token.sign).returns(() => "token");
            mockAuthenticationService
                .setup((authenticationService) => authenticationService.login)
                .returns(() => Promise.resolve(token.object()));

            expect(
                await controller.login({
                    rememberMe: false,
                    username: user.username(),
                    password: user.password()
                })
            ).toEqual(new TokenMessage(token.object()).create());
        });
    });

    describe("Verify Authenticated User", () => {
        test("Verifies user", async () => {
            mockUserService
                .setup((userService) => userService.verifyUser)
                .returns((user: IUser) => Promise.resolve(user));

            expect(
                await controller.verifyUser({
                    userEntity: () => user
                } as Request)
            ).toEqual(new UsersMessage([user]).create());
        });
    });

    describe("Get Authenticated User", () => {
        test("Gets user", () => {
            expect(
                controller.getAuthenticatedUser({
                    userEntity: () => user
                } as Request)
            ).toEqual(new UsersMessage([user]).create());
        });
    });

    describe("Is Authenticated", () => {
        test("No user entity", () => {
            expect(controller.isAuthenticated({} as Request)).toEqual(
                new AuthenticatedMessage(false).create()
            );
        });

        test("Null user", () => {
            expect(
                controller.isAuthenticated({
                    userEntity: () => null
                } as Request)
            ).toEqual(new AuthenticatedMessage(false).create());
        });

        test("Authenticated User", () => {
            expect(
                controller.isAuthenticated({
                    userEntity: () => user
                } as Request)
            ).toEqual(new AuthenticatedMessage(true).create());
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

            expect(message).toEqual(new DeletedUserMessage(user.id()).create());
        });
    });
});
