import { Transformer } from "../../../@Types";
import IUserDocument from "../../../Schemas/Mongo/User/IUserDocument";
import IUser from "../../../Entities/User/IUser";
import UserBuilder from "../../../Entities/User/UserBuilder";

const UserEntityTransform: Transformer<IUserDocument, IUser> = (user) => {
    const userBuilder = new UserBuilder();
    userBuilder
        .setId(user.id)
        .setTwitchId(user.twitchId)
        .setTwitterId(user.twitterId)
        .setYouTubeId(user.youtubeId)
        .setInstagramId(user.instagramId)
        .setEmail(user.email)
        .setUsername(user.username)
        .setPassword(user.password)
        .setVerified(user.verified)
        .setFollowers(user.following);
    return userBuilder.build();
};

export default UserEntityTransform;
