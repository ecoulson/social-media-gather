import { Transformer } from "../@Types";
import IUser from "../Entities/User/IUser";
import { IUserJSONSchema } from "../Schemas/JSON/User/IUserJSONSchema";

const UserJSONSerializer: Transformer<IUser, IUserJSONSchema> = (user) => {
    return {
        id: user.id(),
        username: user.username(),
        email: user.email(),
        verified: user.verified(),
        following: user.following()
    };
};

export default UserJSONSerializer;
