import { Document } from "mongoose";
import IInstagramPostDocument from "./IInstagramPostDocument";
import ITweetDocument from "./ITweetDocument";
import ITwitchStreamDocument from "./ITwitchStreamDocument";
import ITwitchVideoDocument from "./ITwitchVideoDocument";
import IYouTubeVideoDocument from "./IYouTubeVideoDocument";

export default interface IPostDocument extends Document {
    type: string;
    timeCreated: Date;
    userId: string;
    twitchStream: ITwitchStreamDocument;
    twitchVideo: ITwitchVideoDocument;
    youtubeVideo: IYouTubeVideoDocument;
    tweet: ITweetDocument;
    instagram: IInstagramPostDocument;
}
