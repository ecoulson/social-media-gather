import { UpdateQuery } from "mongoose";
import { Transformer } from "../../../@Types";
import ITwitchVideo from "../../../Entities/TwitchVideo/ITwitchVideo";
import IPostDocument from "../Models/Post/IPostDocument";

const TwitchVideoUpdateQueryTransform : Transformer<ITwitchVideo, UpdateQuery<IPostDocument>> = (video) => {
    return {
        _id: video.id(),
        userId: video.userId(),
        twitchVideo: {
            gameName: video.gameName(),
            description: video.description(),
            publishedAt: video.publishedAt(),
            url: video.url(),
            title: video.title(),
            thumbnailUrl: video.thumbnail().url(),
            userName: video.screenName()
        }
    }
}

export default TwitchVideoUpdateQueryTransform;