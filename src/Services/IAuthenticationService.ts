import IUser from "../Entities/User/IUser";

export default interface IAuthenticationService {
    register(username: string, email: string, password: string): Promise<IUser>;
}
