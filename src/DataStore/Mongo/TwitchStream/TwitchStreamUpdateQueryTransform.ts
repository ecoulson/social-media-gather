import { Transformer } from "../../../@Types";
import { UpdateQuery } from "mongoose";
import ITwitchStream from "../../../Entities/TwitchStream/ITwitchStream";
import IPostDocument from "../Models/Post/IPostDocument";

const TwitchStreamUpdateQueryTransform: Transformer<ITwitchStream, UpdateQuery<IPostDocument>> = (
    stream
) => {
    return {
        _id: stream.id(),
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

export default TwitchStreamUpdateQueryTransform;
