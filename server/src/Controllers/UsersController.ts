import { Request, RequestHandler } from "express";
import { inject } from "inversify";
import { controller, httpDelete, httpGet, httpPut, requestParam } from "inversify-express-utils";
import Types from "../@Types/Types";
import container from "../bootstrap";
import IsFollowingMessage from "../Messages/Following/IsFollowingMessage";
import DeletedUserMessage from "../Messages/Users/DeletedUserMessage";
import UsersMessage from "../Messages/Users/UsersMessage";
import IMessageJSONSchema from "../Schemas/JSON/Message/IMessageJSONSchema";
import IUserService from "../Services/User/IUserService";
import IUpdateUserBody from "./RequestBodies/IUpdateUserBody";

const AuthenticationMiddleware = container.get<RequestHandler>(Types.RequiresAuthentication);

@controller("/api/users")
export default class UserController {
    constructor(@inject(Types.UserService) private userService: IUserService) {}

    @httpGet("/id/:id")
    async getUserById(@requestParam("id") userId: string): Promise<IMessageJSONSchema> {
        const userWithId = await this.userService.getUserById(userId);
        return new UsersMessage([userWithId]).toJson();
    }

    @httpDelete("/:id", AuthenticationMiddleware)
    async deleteUser(@requestParam("id") userId: string): Promise<IMessageJSONSchema> {
        const userToDelete = await this.userService.getUserById(userId);
        await this.userService.deleteUser(userToDelete);
        return new DeletedUserMessage(userId).toJson();
    }

    @httpGet("/username/:username")
    async getUserByUsername(
        @requestParam("username") username: string
    ): Promise<IMessageJSONSchema> {
        const userWithUsername = await this.userService.getUserByUsername(username);
        return new UsersMessage([userWithUsername]).toJson();
    }

    @httpPut("/follow/:userToFollowId", AuthenticationMiddleware)
    async followUser(request: Request): Promise<IMessageJSONSchema> {
        const userWithNewFollower = await this.userService.follow(
            request.user(),
            request.params.userToFollowId
        );
        return new UsersMessage([userWithNewFollower]).toJson();
    }

    @httpPut("/unfollow/:userToUnfollowId", AuthenticationMiddleware)
    async unfollowUser(request: Request): Promise<IMessageJSONSchema> {
        const userWithoutFollower = await this.userService.unfollow(
            request.user(),
            request.params.userToUnfollowId
        );
        return new UsersMessage([userWithoutFollower]).toJson();
    }

    @httpGet("/is-following/:followingUsername", AuthenticationMiddleware)
    async isFollowingUser(request: Request): Promise<IMessageJSONSchema> {
        return new IsFollowingMessage(
            await this.userService.isFollowing(request.user(), request.params.followingUsername)
        ).toJson();
    }

    @httpPut("/update", AuthenticationMiddleware)
    async updateUser(request: Request): Promise<IMessageJSONSchema> {
        const updateBody = request.body as IUpdateUserBody;
        const updatedUser = await this.userService.updateUser(request.user(), updateBody);
        return new UsersMessage([updatedUser]).toJson();
    }
}
