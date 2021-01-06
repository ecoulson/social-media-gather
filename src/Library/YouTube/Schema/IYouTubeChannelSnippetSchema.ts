import IYouTubeLocalizedSchema from "./IYouTubeLocalizedSchema";
import IYouTubeThumbnailSchema from "./IYouTubeThumbnailSchema";

export default interface IYouTubeChannelSnippetSchema {
    title: string;
    description: string;
    customUrl: string;
    publishedAt: Date;
    thumbnails: IYouTubeThumbnailSchema[];
    defaultLanguage: string;
    localized: IYouTubeLocalizedSchema;
    country: string;
}
