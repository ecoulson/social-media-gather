import TwitchStreamBuilder from "../../../Entities/TwitchStream/TwitchStreamBuilder";
import { Transformer } from "../../../@Types";
import Image from "../../../Entities/Media/Image";
import ITwitchStream from "../../../Entities/TwitchStream/ITwitchStream";
import IPostDocument from "../../../Schemas/Mongo/Post/IPostDocument";

const TwitchStreamEntityTransform: Transformer<IPostDocument, ITwitchStream> = (post) => {
    const twitchStreamBuilder = new TwitchStreamBuilder();
    twitchStreamBuilder
        .setId(post.id)
        .setViewers(post.twitchStream.viewers)
        .setStatus(post.twitchStream.live)
        .setThumbnail(new Image("", post.twitchStream.thumbnailUrl, 0, 0))
        .setScreenName(post.twitchStream.userName)
        .setStartedAt(post.twitchStream.startedAt)
        .setUrl(post.twitchStream.url)
        .setTitle(post.twitchStream.title)
        .setChannelId(post.channelId)
        .setGameName(post.twitchStream.gameName)
        .setStreamId(post.twitchStream.streamId)
        .setEndedAt(post.twitchStream.endedAt);

    return twitchStreamBuilder.build();
};

export default TwitchStreamEntityTransform;
