import { Transformer } from "../@Types";
import ITwitchVideo from "../Entities/TwitchVideo/ITwitchVideo";
import ITwitchVideoJSONSchema from "../Schemas/JSON/TwitchVideo/ITwitchVideoJSONSchema";

const TwitchVideoJSONSerializer: Transformer<ITwitchVideo, ITwitchVideoJSONSchema> = (
    twitchVideo
) => {
    return {
        url: twitchVideo.url(),
        gameName: twitchVideo.gameName(),
        id: twitchVideo.id(),
        publishedAt: twitchVideo.publishedAt(),
        title: twitchVideo.title(),
        description: twitchVideo.description(),
        thumbnailUrl: twitchVideo.thumbnail().url(),
        userName: twitchVideo.screenName()
    };
};

export default TwitchVideoJSONSerializer;
