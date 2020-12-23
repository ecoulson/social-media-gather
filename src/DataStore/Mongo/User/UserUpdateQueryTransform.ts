import { UpdateQuery } from "mongoose";
import { Transformer } from "../../../@Types";
import IUser from "../../../Entities/User/IUser";
import IUserDocument from "../Models/User/IUserDocument";

const UserUpdateQueryTransform : Transformer<IUser, UpdateQuery<IUserDocument>> = (user) => {
    return {
        _id: user.id(),
        email: user.email(),
        verified: user.verified(),
        username: user.username(),
        following: user.followingIds(),
        twitterId: user.twitterId(),
        twitchId: user.twitchId(),
        instagramId: user.instagramId(),
        youtubeId: user.youTubeId(),
    }
}

export default UserUpdateQueryTransform;