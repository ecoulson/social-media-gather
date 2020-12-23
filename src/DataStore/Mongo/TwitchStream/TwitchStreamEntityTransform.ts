import { Transformer } from "../../../@Types";
import Image from "../../../Entities/Media/Image";
import ITwitchStream from "../../../Entities/TwitchStream/ITwitchStream";
import TwitchStream from "../../../Entities/TwitchStream/TwitchStream";
import IPostDocument from "../Models/Post/IPostDocument";
import UserRecord from "../../../Records/User/UserRecord";
import UserMongoDataStore from "../User/UserMongoDataStore";

const TwitchStreamEntityTransform : Transformer<IPostDocument, ITwitchStream> = (post) => {
    return new TwitchStream(
        0,
        post.twitchStream.live,
        new Image("", post.twitchStream.thumbnailUrl, 0, 0),
        post.twitchStream.startedAt,
        post.twitchStream.url,
        post.twitchStream.title,
        post.userId,
        post._id,
        post.twitchStream.gameName,
        post.twitchStream.streamId,
        post.twitchStream.username,
        new UserRecord(new UserMongoDataStore()),
        post.twitchStream.endedAt
    );
}

export default TwitchStreamEntityTransform;