import { Transformer } from "../../../@Types";
import IUserDocument from "../Models/User/IUserDocument";
import User from "../../../Entities/User/User";
import IUser from "../../../Entities/User/IUser";

const UserEntityTransform: Transformer<IUserDocument, IUser> = (userDocument) => {
    return new User(
        userDocument.id,
        userDocument.twitterId,
        userDocument.youtubeId,
        userDocument.twitchId,
        userDocument.instagramId,
        userDocument.email,
        userDocument.username,
        userDocument.password,
        userDocument.verified,
        userDocument.following
    );
};

export default UserEntityTransform;
