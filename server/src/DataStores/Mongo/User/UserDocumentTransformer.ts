import { Transformer } from "../../../@Types";
import IUser from "../../../Entities/User/IUser";
import IUserDocument from "../../../Schemas/Mongo/User/IUserDocument";

const UserDocumentTransform: Transformer<IUser, Partial<IUserDocument>> = (user) => {
    return {
        email: user.email(),
        verified: user.verified(),
        username: user.username(),
        following: user.following(),
        password: user.password(),
        isCreator: user.isCreator()
    };
};

export default UserDocumentTransform;
