import { Request, RequestHandler } from "express";
import { inject } from "inversify";
import { controller, httpDelete, httpGet, httpPost, requestBody } from "inversify-express-utils";
import Types from "../@Types/Types";
import IUserService from "../Services/UserService";
import container from "../bootstrap";
import UserTransformer from "./ResponseTransforms/UserTransformer";
import { IUserResponse } from "./ResponseTransforms/IUserResponse";
import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcrypt";
import UserExistsMessage from "../Messages/UserExistsMessage";
import IUserRegistrationBody from "./RequestBodies/IUserRegistrationBody";
import IAuthenticationService from "../Services/IAuthenticationService";
import UserExistsException from "../Exceptions/UserExistsExceptions";
import ErrorMessage from "../Messages/ErrorMessage";
import IMessageStructure from "../Messages/IMessageStructure";
import RetrievedUsersMessage from "../Messages/RetrievedUsersMessage";

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
    getAuthenticatedUser(request: Request): IUserResponse {
        return UserTransformer(request.userEntity());
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
    async login(
        @requestBody() body: { rememberMe: boolean; username: string; password: string }
    ): Promise<
        | {
              error: string;
          }
        | {
              token: string;
              expiresIn: string | number;
          }
    > {
        const user = await this.userService.getUserByUsername(body.username);
        if (!user) {
            return {
                error: "No user with the provided username"
            };
        }
        if (await bcrypt.compare(body.password, user.password())) {
            const options = {
                expiresIn: undefined as string | number
            };
            if (!body.rememberMe) {
                options.expiresIn = "1d";
            }
            const token = jsonwebtoken.sign({ id: user.id() }, process.env.AUTH_SECRET, options);
            return {
                token,
                expiresIn: options.expiresIn
            };
        } else {
            return {
                error: "Passwords do not match"
            };
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
            return new RetrievedUsersMessage([user]).create();
        } catch (error) {
            if (error instanceof UserExistsException) {
                return new UserExistsMessage(body.username, body.email).create();
            }
            return new ErrorMessage(error).create();
        }
    }

    @httpPost("/verify", AuthenticationMiddleware)
    async verifyUser(request: Request): Promise<IUserResponse> {
        const user = request.userEntity();
        user.verify();
        await this.userService.updateUser(user);
        return UserTransformer(user);
    }

    @httpGet("/is-authenticated", AuthenticationMiddleware)
    isAuthenticated(
        request: Request
    ): {
        isAuthenticated: boolean;
    } {
        return {
            isAuthenticated: request.userEntity !== undefined && request.userEntity() !== null
        };
    }
}
