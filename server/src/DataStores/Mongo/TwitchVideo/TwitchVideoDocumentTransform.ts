import { Transformer } from "../../../@Types";
import ITwitchVideo from "../../../Entities/TwitchVideo/ITwitchVideo";
import IPostDocument from "../../../Schemas/Mongo/Post/IPostDocument";

const TwitchVideoDocumentTransform: Transformer<ITwitchVideo, Partial<IPostDocument>> = (video) => {
    return {
        type: "TWITCH_VIDEO",
        channelId: video.channelId(),
        timeCreated: video.publishedAt(),
        creatorId: video.creatorId(),
        twitchVideo: {
            gameName: video.gameName(),
            description: video.description(),
            publishedAt: video.publishedAt(),
            url: video.url(),
            title: video.title(),
            thumbnailUrl: video.thumbnail().url(),
            userName: video.screenName(),
            views: video.views()
        }
    };
};

export default TwitchVideoDocumentTransform;
