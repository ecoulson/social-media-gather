import { Request, RequestHandler } from "express";
import { inject } from "inversify";
import { controller, httpDelete, httpGet, httpPost, requestBody } from "inversify-express-utils";
import Types from "../@Types/Types";
import IUserService from "../Services/User/UserService";
import container from "../bootstrap";
import IUserRegistrationBody from "./RequestBodies/IUserRegistrationBody";
import IAuthenticationService from "../Services/Authentication/IAuthenticationService";
import UserExistsException from "../Exceptions/UserExistsExceptions";
import ILoginBody from "./RequestBodies/ILoginBody";
import UserDoesNotExistsException from "../Exceptions/UserDoesNotExistException";
import IMessageJSONSchema from "../Schemas/JSON/Message/IMessageJSONSchema";
import UsersMessage from "../Messages/Users/UsersMessage";
import DeletedUserMessage from "../Messages/Users/DeletedUserMessage";
import UnauthenticatedMessage from "../Messages/Security/UnauthenticatedMessage";
import IllegalLoginException from "../Exceptions/IllegalLoginException";
import UserDoesNotExistMessage from "../Messages/Users/UserDoesNotExistMessage";
import TokenMessage from "../Messages/Token/TokenMessage";
import ErrorMessage from "../Messages/Status/ErrorMessage";
import UserExistsMessage from "../Messages/Users/UserExistsMessage";
import AuthenticatedMessage from "../Messages/Security/AuthenticatedMessage";

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
    getAuthenticatedUser(request: Request): IMessageJSONSchema {
        return new UsersMessage([request.user()]).toJson();
    }

    @httpDelete("/", AuthenticationMiddleware)
    async deleteAuthenticatedUser(request: Request): Promise<IMessageJSONSchema> {
        return new DeletedUserMessage(request.user().id()).toJson();
    }

    @httpPost("/login")
    async login(@requestBody() body: ILoginBody): Promise<IMessageJSONSchema> {
        try {
            const token = await this.authenticationService.login(body.username, body.password);
            return new TokenMessage(token).toJson();
        } catch (error) {
            if (error instanceof IllegalLoginException) {
                return new UnauthenticatedMessage().toJson();
            }
            if (error instanceof UserDoesNotExistsException) {
                return new UserDoesNotExistMessage(body.username).toJson();
            }
            return new ErrorMessage(error).toJson();
        }
    }

    @httpPost("/register")
    async register(@requestBody() body: IUserRegistrationBody): Promise<IMessageJSONSchema> {
        try {
            const user = await this.authenticationService.register(
                body.username,
                body.email,
                body.password
            );
            return new UsersMessage([user]).toJson();
        } catch (error) {
            if (error instanceof UserExistsException) {
                return new UserExistsMessage(body.username, body.email).toJson();
            }
            return new ErrorMessage(error).toJson();
        }
    }

    @httpPost("/verify", AuthenticationMiddleware)
    async verifyUser(request: Request): Promise<IMessageJSONSchema> {
        const user = await this.userService.verifyUser(request.user());
        return new UsersMessage([user]).toJson();
    }

    @httpGet("/is-authenticated", AuthenticationMiddleware)
    isAuthenticated(): IMessageJSONSchema {
        return new AuthenticatedMessage().toJson();
    }
}
