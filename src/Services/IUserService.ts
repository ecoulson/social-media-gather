import IUser from "../Entities/User/IUser";

export default interface IUserService {
    deleteUser(user: IUser): Promise<IUser>;
}
