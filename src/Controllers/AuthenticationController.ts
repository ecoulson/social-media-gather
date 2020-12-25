import { Request, RequestHandler } from "express";
import { Container, inject, tagged } from "inversify";
import { controller, httpDelete } from "inversify-express-utils";
import Tags from "../@Types/Tags";
import Types from "../@Types/Types";
import UserRecord from "../Records/User/UserRecord";

export default function AuthenticationControllerFactory(container : Container) {
    const AuthenticationMiddleware = container.get<RequestHandler>(Types.RequiresAuthentication);

    @controller("/api/auth")
    class AuthenticationController {
        @inject(Types.UserRecord) @tagged(Tags.MONGO, true)
        private userRecord : InstanceType<typeof UserRecord>

        @httpDelete("/", AuthenticationMiddleware)
        async deleteAuthenticatedUser(request : Request) {
            try {
                await this.userRecord.delete(request.userEntity());
                return {
                    message: "deleted"
                };
            } catch (error) {
                return {
                    message: "failed to delete"
                }
            }
        }
    }

    return AuthenticationController;
}