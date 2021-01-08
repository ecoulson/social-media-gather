import IYouTubeLocalizationSchema from "./IYouTubeLocalizationSchema";
import IYouTubeThumbnailSchema from "./IYouTubeThumbnailSchema";

export default interface IYouTubeChannelSnippetSchema {
    title: string;
    description: string;
    customUrl: string;
    publishedAt: string;
    thumbnails: IYouTubeThumbnailSchema;
    defaultLanguage: string;
    localized: IYouTubeLocalizationSchema;
    country: string;
}
