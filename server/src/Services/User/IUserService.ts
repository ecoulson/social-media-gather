import IUpdateUserBody from "../../Controllers/RequestBodies/IUpdateUserBody";
import IUser from "../../Entities/User/IUser";

export default interface IUserService {
    deleteUser(user: IUser): Promise<IUser>;
    updateUser(user: IUser, updateInfo?: IUpdateUserBody): Promise<IUser>;
    createUser(user: IUser): Promise<IUser>;
    verifyUser(user: IUser): Promise<IUser>;
    getUserByUsername(username: string): Promise<IUser>;
    getUserById(id: string): Promise<IUser>;
    isFollowing(userToCheck: IUser, followerUsername: string): Promise<boolean>;
    follow(actingUser: IUser, userToFollowId: string): Promise<IUser>;
    unfollow(actingUser: IUser, userToUnfollowId: string): Promise<IUser>;
    doesUserExist(email: string, username: string): Promise<boolean>;
}
