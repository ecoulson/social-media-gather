import { Request, RequestHandler } from "express";
import { inject } from "inversify";
import { controller, httpDelete, httpGet, httpPut, requestParam } from "inversify-express-utils";
import Types from "../@Types/Types";
import container from "../bootstrap";
import DeletedUserMessage from "../Messages/DeletedUserMessage";
import IMessageStructure from "../Messages/IMessageStructure";
import IsFollowingMessage from "../Messages/IsFollowingMessage";
import UsersMessage from "../Messages/UsersMessage";
import IUserService from "../Services/IUserService";
import IUpdateUserBody from "./RequestBodies/IUpdateUserBody";

const AuthenticationMiddleware = container.get<RequestHandler>(Types.RequiresAuthentication);

@controller("/api/users")
export default class UserController {
    constructor(@inject(Types.UserService) private userService: IUserService) {}

    @httpGet("/id/:id")
    async getUserById(@requestParam("id") userId: string): Promise<IMessageStructure> {
        const userWithId = await this.userService.getUserById(userId);
        return new UsersMessage([userWithId]).create();
    }

    @httpDelete("/:id", AuthenticationMiddleware)
    async deleteUser(@requestParam("id") userId: string): Promise<IMessageStructure> {
        const userToDelete = await this.userService.getUserById(userId);
        await this.userService.deleteUser(userToDelete);
        return new DeletedUserMessage(userId).create();
    }

    @httpGet("/username/:username")
    async getUserByUsername(
        @requestParam("username") username: string
    ): Promise<IMessageStructure> {
        const userWithUsername = await this.userService.getUserByUsername(username);
        return new UsersMessage([userWithUsername]).create();
    }

    @httpPut("/follow/:userToFollowId", AuthenticationMiddleware)
    async followUser(request: Request): Promise<IMessageStructure> {
        const userWithNewFollower = await this.userService.follow(
            request.userEntity(),
            request.params.userToFollowId
        );
        return new UsersMessage([userWithNewFollower]).create();
    }

    @httpPut("/unfollow/:userToUnfollowId", AuthenticationMiddleware)
    async unfollowUser(request: Request): Promise<IMessageStructure> {
        const userWithoutFollower = await this.userService.unfollow(
            request.userEntity(),
            request.params.userToUnfollowId
        );
        return new UsersMessage([userWithoutFollower]).create();
    }

    @httpGet("/is-following/:followingUsername", AuthenticationMiddleware)
    async isFollowingUser(request: Request): Promise<IMessageStructure> {
        return new IsFollowingMessage(
            await this.userService.isFollowing(
                request.userEntity(),
                request.params.followingUsername
            )
        ).create();
    }

    @httpPut("/update", AuthenticationMiddleware)
    async updateUser(request: Request): Promise<IMessageStructure> {
        const updateBody = request.body as IUpdateUserBody;
        const updatedUser = await this.userService.updateUser(request.userEntity(), updateBody);
        return new UsersMessage([updatedUser]).create();
    }
}
