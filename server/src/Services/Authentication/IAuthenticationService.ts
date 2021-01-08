import IUser from "../../Entities/User/IUser";
import IToken from "../../Security/Tokens/IToken";
import IUserTokenPayload from "../User/IUserTokenPayload";

export default interface IAuthenticationService {
    register(username: string, email: string, password: string): Promise<IUser>;
    login(
        username: string,
        password: string,
        rememberMe?: boolean
    ): Promise<IToken<IUserTokenPayload>>;
}
