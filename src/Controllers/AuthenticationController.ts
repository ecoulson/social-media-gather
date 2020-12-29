import { Request, RequestHandler } from "express";
import { inject } from "inversify";
import { controller, httpDelete, httpGet, httpPost, requestBody } from "inversify-express-utils";
import Types from "../@Types/Types";
import IUserService from "../Services/UserService";
import container from "../bootstrap";
import UserExistsMessage from "../Messages/UserExistsMessage";
import IUserRegistrationBody from "./RequestBodies/IUserRegistrationBody";
import IAuthenticationService from "../Services/IAuthenticationService";
import UserExistsException from "../Exceptions/UserExistsExceptions";
import ErrorMessage from "../Messages/ErrorMessage";
import IMessageStructure from "../Messages/IMessageStructure";
import UsersMessage from "../Messages/UsersMessage";
import ILoginBody from "./RequestBodies/ILoginBody";
import UserDoesNotExistsException from "../Exceptions/UserDoesNotExistException";
import UserDoesNotExistMessage from "../Messages/UserDoesNotExistMessage";
import IllegalLoginException from "../Exceptions/IllegalLoginException";
import UnauthenticatedMessage from "../Messages/UnauthenticatedMessage";
import TokenMessage from "../Messages/TokenMessage";
import AuthenticatedMessage from "../Messages/AuthenticatedMessage";

const AuthenticationMiddleware = container.get<RequestHandler>(Types.RequiresAuthentication);

@controller("/api/auth")
export default class AuthenticationController {
    constructor(
        @inject(Types.UserService)
        private userService: IUserService,
        @inject(Types.AuthenticationService)
        private authenticationService: IAuthenticationService
    ) {}

    @httpGet("/me", AuthenticationMiddleware)
    getAuthenticatedUser(request: Request): IMessageStructure {
        return new UsersMessage([request.userEntity()]).create();
    }

    @httpDelete("/", AuthenticationMiddleware)
    async deleteAuthenticatedUser(
        request: Request
    ): Promise<{
        message: string;
    }> {
        try {
            await this.userService.deleteUser(request.userEntity());
            return {
                message: "deleted"
            };
        } catch (error) {
            return {
                message: "failed to delete"
            };
        }
    }

    @httpPost("/login")
    async login(@requestBody() body: ILoginBody): Promise<IMessageStructure> {
        try {
            const token = await this.authenticationService.login(body.username, body.password);
            return new TokenMessage(token).create();
        } catch (error) {
            if (error instanceof IllegalLoginException) {
                return new UnauthenticatedMessage().create();
            }
            if (error instanceof UserDoesNotExistsException) {
                return new UserDoesNotExistMessage(body.username).create();
            }
            return new ErrorMessage(error).create();
        }
    }

    @httpPost("/register")
    async register(@requestBody() body: IUserRegistrationBody): Promise<IMessageStructure> {
        try {
            const user = await this.authenticationService.register(
                body.username,
                body.email,
                body.password
            );
            return new UsersMessage([user]).create();
        } catch (error) {
            if (error instanceof UserExistsException) {
                return new UserExistsMessage(body.username, body.email).create();
            }
            return new ErrorMessage(error).create();
        }
    }

    @httpPost("/verify", AuthenticationMiddleware)
    async verifyUser(request: Request): Promise<IMessageStructure> {
        const user = await this.userService.verifyUser(request.userEntity());
        return new UsersMessage([user]).create();
    }

    @httpGet("/is-authenticated", AuthenticationMiddleware)
    isAuthenticated(request: Request): IMessageStructure {
        return new AuthenticatedMessage(
            request.userEntity !== undefined && request.userEntity() !== null
        ).create();
    }
}
