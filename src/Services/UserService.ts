import { inject, injectable, tagged } from "inversify";
import Tags from "../@Types/Tags";
import Types from "../@Types/Types";
import IUser from "../Entities/User/IUser";
import UserRecord from "../Records/User/UserRecord";
import IUserService from "./IUserService";

@injectable()
export default class UserService implements IUserService {
    constructor(
        @inject(Types.UserRecord)
        @tagged(Tags.MONGO, true)
        private userRecord: InstanceType<typeof UserRecord>
    ) {}

    deleteUser(user: IUser): Promise<IUser> {
        // do any clean up
        // should emit that this user has been deleted
        return this.userRecord.delete(user);
    }
}
