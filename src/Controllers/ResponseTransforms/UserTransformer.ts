import { Transformer } from "../../@Types";
import IUser from "../../Entities/User/IUser";
import { IUserResponse } from "./IUserResponse";

const UserTransformer: Transformer<IUser, IUserResponse> = (user) => {
    return {
        id: user.id(),
        twitchId: user.twitchId(),
        twitterId: user.twitterId(),
        instagramId: user.instagramId(),
        youtubeId: user.youTubeId(),
        username: user.username(),
        email: user.email(),
        verified: user.verified(),
        following: user.following()
    };
};

export default UserTransformer;
