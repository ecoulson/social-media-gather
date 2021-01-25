import PostType from "../../../Entities/Post/PostType";
import IInstagramJSONSchema from "../Instagram/IInstagramJSONSchema";
import ITweetJSONSchema from "../Tweet/ITweetJSONSchema";
import ITwitchStreamJSONSchema from "../TwitchStream/ITwitchStreamJSONSchema";
import ITwitchVideoJSONSchema from "../TwitchVideo/ITwitchVideoJSONSchema";
import IYouTubeVideoJSONSchema from "../YouTubeVideo/IYouTubeVideoJSONSchema";

export interface IPostJSONSchema {
    type: PostType;
    id: string;
    timeCreated: Date;
    channelId: string;
    twitchStream?: ITwitchStreamJSONSchema;
    twitchVideo?: ITwitchVideoJSONSchema;
    youtubeVideo?: IYouTubeVideoJSONSchema;
    tweet?: ITweetJSONSchema;
    instagram?: IInstagramJSONSchema;
}
