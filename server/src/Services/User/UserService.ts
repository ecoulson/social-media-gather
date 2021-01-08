import { inject, injectable, tagged } from "inversify";
import Tags from "../../@Types/Tags";
import Types from "../../@Types/Types";
import IUpdateUserBody from "../../Controllers/RequestBodies/IUpdateUserBody";
import IUser from "../../Entities/User/IUser";
import UserDoesNotExistsException from "../../Exceptions/UserDoesNotExistException";
import UserRepository from "../../Repositories/User/UserRepository";
import IUserService from "./IUserService";

@injectable()
export default class UserService implements IUserService {
    constructor(
        @inject(Types.UserRepository)
        @tagged(Tags.MONGO, true)
        private userRepository: InstanceType<typeof UserRepository>
    ) {}

    deleteUser(user: IUser): Promise<IUser> {
        return this.userRepository.delete(user);
    }

    createUser(user: IUser): Promise<IUser> {
        return this.userRepository.add(user);
    }

    updateUser(user: IUser, updateInformation?: IUpdateUserBody): Promise<IUser> {
        if (updateInformation) {
            user.setEmail(updateInformation.email);
        }
        return this.userRepository.update(user);
    }

    async getUserByUsername(username: string): Promise<IUser> {
        const user = await this.userRepository.findByUsername(username);
        if (!this.userExists(user)) {
            throw new UserDoesNotExistsException(username);
        }
        return user;
    }

    private userExists(user: IUser) {
        return user !== null;
    }

    async doesUserExist(email: string, username: string): Promise<boolean> {
        const users = await this.userRepository.findByUsernameOrEmail(username, email);
        return this.hasFoundUsers(users);
    }

    private hasFoundUsers(users: IUser[]) {
        return users.length > 0;
    }

    async verifyUser(user: IUser): Promise<IUser> {
        user.verify();
        return await this.updateUser(user);
    }

    async getUserById(userId: string): Promise<IUser> {
        return await this.userRepository.findById(userId);
    }

    async follow(actingUser: IUser, userToFollowId: string): Promise<IUser> {
        const userToFollow = await this.getUserById(userToFollowId);
        actingUser.addFollower(userToFollow);
        return await this.updateUser(actingUser);
    }

    async unfollow(actingUser: IUser, userToUnfollowId: string): Promise<IUser> {
        const userToUnfollow = await this.getUserById(userToUnfollowId);
        actingUser.removeFollower(userToUnfollow);
        return await this.updateUser(actingUser);
    }

    async isFollowing(userToCheck: IUser, followerUsername: string): Promise<boolean> {
        const userWithUsername = await this.getUserByUsername(followerUsername);
        return userToCheck.following().includes(userWithUsername.id());
    }
}
