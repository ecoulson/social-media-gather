import { Transformer } from "../@Types";
import IUser from "../Entities/User/IUser";
import { IUserJSONSchema } from "../Schemas/JSON/User/IUserJSONSchema";

const UserSerializer: Transformer<IUser, IUserJSONSchema> = (user) => {
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

export default UserSerializer;
