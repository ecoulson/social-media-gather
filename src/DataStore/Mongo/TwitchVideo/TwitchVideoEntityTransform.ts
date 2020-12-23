import { Transformer } from "../../../@Types";
import Image from "../../../Entities/Media/Image";
import ITwitchVideo from "../../../Entities/TwitchVideo/ITwitchVideo";
import TwitchVideo from "../../../Entities/TwitchVideo/TwitchVideo";
import UserRecord from "../../../Records/User/UserRecord";
import IPostDocument from "../Models/Post/IPostDocument";
import UserMongoDataStore from "../User/UserMongoDataStore";

const TwitchVideoEntityTransform : Transformer<IPostDocument, ITwitchVideo> = 
    (post) => new TwitchVideo(
        post.id,
        post.twitchVideo.url,
        post.twitchVideo.gameName,
        post.twitchVideo.publishedAt,
        post.twitchVideo.title,
        post.twitchVideo.description,
        new Image("", post.twitchVideo.thumbnailUrl, 0, 0),
        post.twitchVideo.userName,
        post.userId,
        new UserRecord(new UserMongoDataStore())
    )

export default TwitchVideoEntityTransform;