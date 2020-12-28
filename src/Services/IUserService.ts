import IUser from "../Entities/User/IUser";

export default interface IUserService {
    deleteUser(user: IUser): Promise<IUser>;
    saveUser(user: IUser): Promise<IUser>;
    createUser(user: IUser): Promise<IUser>;
    getUserByUsername(username: string): Promise<IUser>;
    doesUserExist(email: string, username: string): Promise<boolean>;
}
