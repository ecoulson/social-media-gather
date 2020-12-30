import { inject, injectable, tagged } from "inversify";
import Tags from "../@Types/Tags";
import Types from "../@Types/Types";
import IUser from "../Entities/User/IUser";
import UserDoesNotExistsException from "../Exceptions/UserDoesNotExistException";
import UserRepository from "../Repositories/User/UserRepository";
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

    updateUser(user: IUser): Promise<IUser> {
        return this.userRepository.update(user);
    }

    async getUserByUsername(username: string): Promise<IUser> {
        const user = await this.userRepository.findByUsername(username);
        if (!this.hasFoundUsers(user)) {
            throw new UserDoesNotExistsException(username);
        }
        return user;
    }

    private hasFoundUsers(user: IUser) {
        return user !== null;
    }

    async doesUserExist(email: string, username: string): Promise<boolean> {
        const user = await this.userRepository.findByUsernameOrEmail(username, email);
        return this.hasFoundUsers(user);
    }

    async verifyUser(user: IUser): Promise<IUser> {
        user.verify();
        return await this.updateUser(user);
    }

    async getUserById(userId: string): Promise<IUser> {
        return await this.userRepository.findById(userId);
    }
}
