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
        return this.userRepository.create(user);
    }

    updateUser(user: IUser): Promise<IUser> {
        return this.userRepository.update(user);
    }

    async getUserByUsername(username: string): Promise<IUser> {
        const users = await this.userRepository.find({ username });
        if (!this.hasFoundUsers(users)) {
            throw new UserDoesNotExistsException(username);
        }
        return users[0];
    }

    private hasFoundUsers(users: IUser[]) {
        return users.length >= 1;
    }

    async doesUserExist(email: string, username: string): Promise<boolean> {
        const users = await this.userRepository.find({
            $or: [{ email }, { username }]
        });
        return users.length !== 0;
    }

    async verifyUser(user: IUser): Promise<IUser> {
        user.verify();
        return await this.updateUser(user);
    }
}
