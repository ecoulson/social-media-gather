import { Transformer } from "../@Types";
import ITwitchStream from "../Entities/TwitchStream/ITwitchStream";
import ITwitchStreamJSONSchema from "../Schemas/JSON/TwitchStream/ITwitchStreamJSONSchema";

const TwitchStreamJSONSerializer: Transformer<ITwitchStream, ITwitchStreamJSONSchema> = (
    twitchStream
) => {
    return {
        url: twitchStream.url(),
        gameName: twitchStream.gameName(),
        title: twitchStream.title(),
        thumbnailUrl: twitchStream.thumbnail().url(),
        publishedAt: twitchStream.startedAt(),
        live: twitchStream.isLive(),
        startedAt: twitchStream.startedAt(),
        endedAt: twitchStream.endedAt(),
        username: twitchStream.screenName(),
        streamId: twitchStream.streamId()
    };
};

export default TwitchStreamJSONSerializer;
