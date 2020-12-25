import { inject, injectable } from "inversify";
import Types from "../@Types/Types";
import IUser from "../Entities/User/IUser";
import UserRecord from "../Records/User/UserRecord";
import IUserService from "./IUserService";

@injectable()
export default class UserService implements IUserService {
    constructor(
        @inject(Types.UserRecord) private userRecord : InstanceType<typeof UserRecord>
    ) {}

    deleteUser(user : IUser) {
        return this.userRecord.delete(user);
    }
}