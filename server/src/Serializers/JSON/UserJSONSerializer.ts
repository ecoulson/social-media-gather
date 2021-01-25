import { Transformer } from "../../@Types";
import IUser from "../../Entities/User/IUser";
import { IUserJSONSchema } from "../../Schemas/JSON/User/IUserJSONSchema";

const UserJSONSerializer: Transformer<IUser, IUserJSONSchema> = (user) => {
    return {
        id: user.id(),
        username: user.username(),
        email: user.email(),
        verified: user.verified(),
        following: user.following(),
        isCreator: user.isCreator(),
        channels: user.channels()
    };
};

export default UserJSONSerializer;
