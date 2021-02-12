import PostType from "../../../Entities/Post/PostType";
import IInstagramJSONSchema from "../Instagram/IInstagramJSONSchema";
import ITweetJSONSchema from "../Tweet/ITweetJSONSchema";
import ITwitchStreamJSONSchema from "../TwitchStream/ITwitchStreamJSONSchema";
import ITwitchVideoJSONSchema from "../TwitchVideo/ITwitchVideoJSONSchema";
import IYouTubeVideoJSONSchema from "../YouTubeVideo/IYouTubeVideoJSONSchema";

export default interface IPostJSONSchema {
    type: PostType;
    id: string;
    timeCreated: Date;
    channelId: string;
    creatorId: string;
    twitchStream?: ITwitchStreamJSONSchema;
    twitchVideo?: ITwitchVideoJSONSchema;
    youtubeVideo?: IYouTubeVideoJSONSchema;
    tweet?: ITweetJSONSchema;
    instagram?: IInstagramJSONSchema;
}
