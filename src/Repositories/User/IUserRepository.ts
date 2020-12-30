import IUser from "../../Entities/User/IUser";

export default interface IUserRepository {
    findByUsername(username: string): Promise<IUser>;
    findNthUser(offset: number): Promise<IUser>;
    findByUsernameOrEmail(username: string, email: string): Promise<IUser>;
    searchForUser(username: string): Promise<IUser[]>;
}
