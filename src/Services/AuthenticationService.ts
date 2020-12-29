import { inject, injectable } from "inversify";
import Types from "../@Types/Types";
import IUser from "../Entities/User/IUser";
import UserBuilder from "../Entities/User/UserBuilder";
import UserExistsException from "../Exceptions/UserExistsExceptions";
import IPasswordManager from "../Security/PasswordManagers/IPasswordManager";
import IAuthenticationService from "./IAuthenticationService";
import IUserService from "./IUserService";

@injectable()
export default class AuthenticationService implements IAuthenticationService {
    constructor(
        @inject(Types.UserService)
        private userService: IUserService,
        @inject(Types.PasswordManager)
        private passwordManager: IPasswordManager
    ) {}

    async register(username: string, email: string, password: string): Promise<IUser> {
        const hashedPassword = await this.passwordManager.hash(password, 10);
        if (await this.userService.doesUserExist(email, username)) {
            throw new UserExistsException(username, email);
        }
        const user = await this.userService.createUser(
            new UserBuilder()
                .setEmail(email)
                .setUsername(username)
                .setPassword(hashedPassword)
                .build()
        );
        user.addFollower(user);
        await this.userService.updateUser(user);
        return user;
    }
}
