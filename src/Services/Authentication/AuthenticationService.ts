import { inject, injectable } from "inversify";
import Types from "../../@Types/Types";
import IUser from "../../Entities/User/IUser";
import UserBuilder from "../../Entities/User/UserBuilder";
import IllegalLoginException from "../../Exceptions/IllegalLoginException";
import UserExistsException from "../../Exceptions/UserExistsExceptions";
import IPasswordManager from "../../Security/PasswordManagers/IPasswordManager";
import IToken from "../../Security/Tokens/IToken";
import ITokenFactory from "../../Security/Tokens/ITokenFactory";
import TokenType from "../../Security/Tokens/TokenType";
import IAuthenticationService from "./IAuthenticationService";
import IUserService from "../User/IUserService";
import IUserTokenPayload from "../User/IUserTokenPayload";
import UserTokenPayload from "../User/UserTokenPayload";

@injectable()
export default class AuthenticationService implements IAuthenticationService {
    constructor(
        @inject(Types.UserService)
        private userService: IUserService,
        @inject(Types.PasswordManager)
        private passwordManager: IPasswordManager,
        @inject(Types.TokenFactory)
        private tokenFactory: ITokenFactory<IUserTokenPayload>
    ) {}

    async login(
        username: string,
        plainTextPassword: string,
        rememberMe?: boolean
    ): Promise<IToken<IUserTokenPayload>> {
        const user = await this.userService.getUserByUsername(username);
        if (await this.passwordManager.compare(plainTextPassword, user.password())) {
            const tokenPayload = new UserTokenPayload(user);
            if (!rememberMe) {
                return this.tokenFactory.create(TokenType.JWT, tokenPayload, "1d");
            } else {
                return this.tokenFactory.create(TokenType.JWT, tokenPayload);
            }
        } else {
            throw new IllegalLoginException(user);
        }
    }

    async register(username: string, email: string, password: string): Promise<IUser> {
        if (await this.userService.doesUserExist(email, username)) {
            throw new UserExistsException(username, email);
        }
        const hashedPassword = await this.passwordManager.hash(password, 10);
        const user = await this.userService.createUser(
            new UserBuilder()
                .setEmail(email)
                .setUsername(username)
                .setPassword(hashedPassword)
                .build()
        );
        console.log(user);
        user.addFollower(user);
        return await this.userService.updateUser(user);
    }
}
