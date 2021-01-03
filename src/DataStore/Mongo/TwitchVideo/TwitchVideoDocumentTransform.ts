import { UpdateQuery } from "mongoose";
import { Transformer } from "../../../@Types";
import ITwitchVideo from "../../../Entities/TwitchVideo/ITwitchVideo";
import IPostDocument from "../../../Schemas/Mongo/Post/IPostDocument";

const TwitchVideoDocumentTransform: Transformer<ITwitchVideo, UpdateQuery<IPostDocument>> = (
    video
) => {
    return {
        type: "TWITCH_VIDEO",
        userId: video.userId(),
        timeCreated: video.publishedAt(),
        twitchVideo: {
            gameName: video.gameName(),
            description: video.description(),
            publishedAt: video.publishedAt(),
            url: video.url(),
            title: video.title(),
            thumbnailUrl: video.thumbnail().url(),
            userName: video.screenName()
        }
    };
};

export default TwitchVideoDocumentTransform;