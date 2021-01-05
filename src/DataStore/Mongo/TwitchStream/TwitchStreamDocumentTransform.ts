import { Transformer } from "../../../@Types";
import { UpdateQuery } from "mongoose";
import ITwitchStream from "../../../Entities/TwitchStream/ITwitchStream";
import IPostDocument from "../../../Schemas/Mongo/Post/IPostDocument";

const TwitchStreamDocumentTransform: Transformer<ITwitchStream, UpdateQuery<IPostDocument>> = (
    stream
) => {
    return {
        userId: stream.userId(),
        twitchStream: {
            endedAt: stream.endedAt(),
            startedAt: stream.startedAt(),
            streamId: stream.streamId(),
            gameName: stream.gameName(),
            live: stream.isLive(),
            thumbnailUrl: stream.thumbnail().url(),
            title: stream.title(),
            url: stream.url(),
            username: stream.screenName()
        }
    };
};

export default TwitchStreamDocumentTransform;
