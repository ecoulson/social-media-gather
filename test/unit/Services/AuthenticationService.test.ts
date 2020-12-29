import "reflect-metadata";
import { Mock } from "moq.ts";
import container from "../../../src/bootstrap";
import Types from "../../../src/@Types/Types";
import User from "../../../src/Entities/User/User";
import IUser from "../../../src/Entities/User/IUser";
import IUserService from "../../../src/Services/IUserService";
import IAuthenticationService from "../../../src/Services/IAuthenticationService";
import UserExistsException from "../../../src/Exceptions/UserExistsExceptions";
import IPasswordManager from "../../../src/Security/PasswordManagers/IPasswordManager";
import ComparisonFailureException from "../../../src/Exceptions/ComparisonFailureException";
import IllegalLoginException from "../../../src/Exceptions/IllegalLoginException";
import ITokenFactory from "../../../src/Security/Tokens/ITokenFactory";
import IUserTokenPayload from "../../../src/Services/IUserTokenPayload";
import IToken from "../../../src/Security/Tokens/IToken";

describe("Authentication Service Suite", () => {
    let service: IAuthenticationService;
    let mockUserService: Mock<IUserService>;
    let mockPasswordManager: Mock<IPasswordManager>;
    let mockTokenFactory: Mock<ITokenFactory<IUserTokenPayload>>;
    let user: IUser;

    beforeEach(() => {
        user = new User("", "", "", "", "", "", "", "", false, []);
        mockUserService = new Mock<IUserService>();
        mockPasswordManager = new Mock<IPasswordManager>();
        mockTokenFactory = new Mock<ITokenFactory<IUserTokenPayload>>();

        container.rebind<IUserService>(Types.UserService).toConstantValue(mockUserService.object());
        container
            .rebind<IPasswordManager>(Types.PasswordManager)
            .toConstantValue(mockPasswordManager.object());
        container
            .rebind<ITokenFactory<IUserTokenPayload>>(Types.TokenFactory)
            .toConstantValue(mockTokenFactory.object());

        service = container.get<IAuthenticationService>(Types.AuthenticationService);
    });

    describe("Login user", () => {
        test("Password comparison failure", async () => {
            mockUserService
                .setup((userService) => userService.getUserByUsername)
                .returns(() => Promise.resolve(user));
            mockPasswordManager
                .setup((passwordManager) => passwordManager.compare)
                .returns(() => Promise.reject(new ComparisonFailureException(new Error())));

            try {
                await service.login(user.username(), user.password());
            } catch (error) {
                expect(error).toBeInstanceOf(ComparisonFailureException);
            }
        });

        test("Passwords do no match", async () => {
            mockUserService
                .setup((userService) => userService.getUserByUsername)
                .returns(() => Promise.resolve(user));
            mockPasswordManager
                .setup((passwordManager) => passwordManager.compare)
                .returns(() => Promise.resolve(false));

            try {
                await service.login(user.username(), user.password());
            } catch (error) {
                expect(error).toBeInstanceOf(IllegalLoginException);
            }
        });

        test("Successful login", async () => {
            const expectedToken = new Mock<IToken<IUserTokenPayload>>().object();
            mockTokenFactory
                .setup((tokenFactor) => tokenFactor.create)
                .returns(() => expectedToken);
            mockUserService
                .setup((userService) => userService.getUserByUsername)
                .returns(() => Promise.resolve(user));
            mockPasswordManager
                .setup((passwordManager) => passwordManager.compare)
                .returns(() => Promise.resolve(true));

            const token = await service.login(user.username(), user.password());

            expect(token).toEqual(expectedToken);
        });
    });

    describe("Register user", () => {
        test("User exists", async () => {
            mockUserService
                .setup((userService) => userService.doesUserExist)
                .returns(() => Promise.resolve(true));
            mockPasswordManager
                .setup((passwordManager) => passwordManager.hash)
                .returns(() => Promise.resolve(user.password()));

            try {
                await service.register(user.username(), user.email(), user.password());
            } catch (error) {
                expect(error).toBeInstanceOf(UserExistsException);
            }
        });

        test("User does not exist", async () => {
            const expectedUser = new User("", "", "", "", "", "", "", "", false, []);
            expectedUser.addFollower(expectedUser);
            mockUserService
                .setup((userService) => userService.doesUserExist)
                .returns(() => Promise.resolve(false))
                .setup((userService) => userService.createUser)
                .returns(() => Promise.resolve(user))
                .setup((userService) => userService.updateUser)
                .returns((user) => Promise.resolve(user));
            mockPasswordManager
                .setup((passwordManager) => passwordManager.hash)
                .returns(() => Promise.resolve(user.password()));

            const registeredUser = await service.register(
                user.username(),
                user.email(),
                user.password()
            );

            expect(registeredUser.following()).toHaveLength(1);
            expect(registeredUser.following()).toEqual(expectedUser.following());
            expect(registeredUser).toEqual(expectedUser);
        });
    });
});
