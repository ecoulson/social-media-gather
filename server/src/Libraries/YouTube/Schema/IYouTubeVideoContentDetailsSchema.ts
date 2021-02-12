import IYouTubeRegionRestrictionSchema from "./IYouTubeRegionRestrictionSchema";
import IYouTubeVideoRatingsSchema from "./IYouTubeVideoRatingsSchema";

export default interface IYouTubeVideoContentDetailsSchema {
    duration?: string;
    dimension?: string;
    definition?: string;
    caption?: string;
    licensedContent?: boolean;
    regionRestriction?: IYouTubeRegionRestrictionSchema;
    contentRating?: IYouTubeVideoRatingsSchema;
    projection?: string;
    hasCustomThumbnail?: boolean;
}
