import { Request, RequestHandler } from "express";
import { Container, inject } from "inversify";
import { controller, httpDelete } from "inversify-express-utils";
import Types from "../@Types/Types";
import UserService from "../Services/UserService";

// TODO: find way to resolve type
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function AuthenticationControllerFactory(container: Container) {
    const AuthenticationMiddleware = container.get<RequestHandler>(Types.RequiresAuthentication);

    @controller("/api/auth")
    class AuthenticationController {
        @inject(Types.UserService)
        private userService: UserService;

        @httpDelete("/", AuthenticationMiddleware)
        async deleteAuthenticatedUser(request: Request) {
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
    }

    return AuthenticationController;
}
