import IYouTubeLocalizationSchema from "./IYouTubeLocalizationSchema";
import IYouTubeThumbnailSchema from "./IYouTubeThumbnailSchema";

export default interface IYouTubeVideoSnippetSchema {
    publishedAt?: string;
    channelId?: string;
    title?: string;
    description?: string;
    thumbnails?: IYouTubeThumbnailSchema;
    channelTitle?: string;
    tags?: string[];
    categoryId?: string;
    liveBroadcastContent?: string;
    defaultLanguage?: string;
    localized?: IYouTubeLocalizationSchema;
    defaultAudioLanguage?: string;
}
