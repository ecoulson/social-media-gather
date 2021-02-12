import TwitchVideoBuilder from "../../../Entities/TwitchVideo/TwitchVideoBuilder";
import { Transformer } from "../../../@Types";
import Image from "../../../Entities/Media/Image";
import ITwitchVideo from "../../../Entities/TwitchVideo/ITwitchVideo";
import IPostDocument from "../../../Schemas/Mongo/Post/IPostDocument";

const TwitchVideoEntityTransform: Transformer<IPostDocument, ITwitchVideo> = (post) => {
    const twitchVideoBuilder = new TwitchVideoBuilder();
    twitchVideoBuilder
        .setId(post.id)
        .setUrl(post.twitchVideo.url)
        .setCreatorId(post.creatorId)
        .setGameName(post.twitchVideo.gameName)
        .setPublishedAt(post.twitchVideo.publishedAt)
        .setTitle(post.twitchVideo.title)
        .setDescription(post.twitchVideo.description)
        .setThumbnail(new Image("", post.twitchVideo.thumbnailUrl, 0, 0))
        .setScreenName(post.twitchVideo.userName)
        .setChannelId(post.channelId)
        .setViews(post.twitchVideo.views);
    return twitchVideoBuilder.build();
};

export default TwitchVideoEntityTransform;
