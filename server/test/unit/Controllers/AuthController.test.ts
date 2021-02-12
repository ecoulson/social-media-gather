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
import UserExistsMessage from "../../../src/Messages/Users/UserExistsMessage";
import UsersMessage from "../../../src/Messages/Users/UsersMessage";
import UnauthenticatedMessage from "../../../src/Messages/Security/UnauthenticatedMessage";
import TokenMessage from "../../../src/Messages/Token/TokenMessage";
import UserDoesNotExistMessage from "../../../src/Messages/Users/UserDoesNotExistMessage";
import AuthenticatedMessage from "../../../src/Messages/Security/AuthenticatedMessage";
import DeletedUserMessage from "../../../src/Messages/Users/DeletedUserMessage";
import { expect } from "chai";

describe("Authentication Controller Suite", () => {
    let mockUserService: Mock<IUserService>;
    let mockAuthenticationService: Mock<IAuthenticationService>;
    let controller: AuthenticationController;
    let user: IUser;

    beforeEach(() => {
        user = new User("", "", "", "", false, [], false, []);
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
        it("User already exists", async () => {
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
            ).to.deep.equal(new UserExistsMessage(user.username(), user.email()).toJson());
        });

        it("Should register user", async () => {
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
            ).to.deep.equal(new UsersMessage([user]).toJson());
        });
    });

    describe("Logs in user", () => {
        it("Should fail to find user", async () => {
            mockAuthenticationService
                .setup((authenticationService) => authenticationService.login)
                .returns(() => Promise.reject(new UserDoesNotExistsException(user.username())));

            expect(
                await controller.login({
                    rememberMe: false,
                    username: user.username(),
                    password: user.password()
                })
            ).to.deep.equal(new UserDoesNotExistMessage(user.username()).toJson());
        });

        it("Password does not match", async () => {
            mockAuthenticationService
                .setup((authenticationService) => authenticationService.login)
                .returns(() => Promise.reject(new IllegalLoginException(user)));

            expect(
                await controller.login({
                    rememberMe: false,
                    username: "",
                    password: "wrong"
                })
            ).to.deep.equal(new UnauthenticatedMessage().toJson());
        });

        it("Password matches", async () => {
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
            ).to.deep.equal(new TokenMessage(token.object()).toJson());
        });
    });

    describe("Verify Authenticated User", () => {
        it("Verifies user", async () => {
            mockUserService
                .setup((userService) => userService.verifyUser)
                .returns((user: IUser) => Promise.resolve(user));

            expect(
                await controller.verifyUser({
                    user: () => user
                } as Request)
            ).to.deep.equal(new UsersMessage([user]).toJson());
        });
    });

    describe("Get Authenticated User", () => {
        it("Gets user", () => {
            expect(
                controller.getAuthenticatedUser({
                    user: () => user
                } as Request)
            ).to.deep.equal(new UsersMessage([user]).toJson());
        });
    });

    describe("Is Authenticated", () => {
        it("No user entity", () => {
            expect(controller.isAuthenticated()).to.deep.equal(new AuthenticatedMessage().toJson());
        });

        it("Null user", () => {
            expect(controller.isAuthenticated()).to.deep.equal(new AuthenticatedMessage().toJson());
        });

        it("Authenticated User", () => {
            expect(controller.isAuthenticated()).to.deep.equal(new AuthenticatedMessage().toJson());
        });
    });

    describe("Delete User", () => {
        it("Deletes user", async () => {
            mockUserService
                .setup((userService) => userService.deleteUser)
                .returns((user: IUser) => Promise.resolve(user));

            const message = await controller.deleteAuthenticatedUser({
                user: () => user
            } as Request);

            expect(message).to.deep.equal(new DeletedUserMessage(user.id()).toJson());
        });
    });
});
