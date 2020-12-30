import { inject } from "inversify";
import { controller, httpGet, requestParam } from "inversify-express-utils";
import Types from "../@Types/Types";
import IMessageStructure from "../Messages/IMessageStructure";
import UsersMessage from "../Messages/UsersMessage";
import IUserService from "../Services/IUserService";

@controller("/api/users")
export default class UserController {
    constructor(@inject(Types.UserService) private userService: IUserService) {}

    @httpGet("/:id")
    async getUserById(@requestParam("id") userId: string): Promise<IMessageStructure> {
        const user = await this.userService.getUserById(userId);
        return new UsersMessage([user]).create();
    }
}
