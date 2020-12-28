import { UpdateQuery } from "mongoose";
import { Transformer } from "../../../@Types";
import IUser from "../../../Entities/User/IUser";
import IUserDocument from "../Models/User/IUserDocument";

const UserDocumentTransform: Transformer<IUser, UpdateQuery<IUserDocument>> = (user) => {
    return {
        email: user.email(),
        verified: user.verified(),
        username: user.username(),
        following: user.following(),
        twitterId: user.twitterId(),
        twitchId: user.twitchId(),
        password: user.password(),
        instagramId: user.instagramId(),
        youtubeId: user.youTubeId()
    };
};

export default UserDocumentTransform;
