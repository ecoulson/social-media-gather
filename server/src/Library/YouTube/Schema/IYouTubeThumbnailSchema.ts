import IYouTubeImageSchema from "./IYouTubeImageSchema";

export default interface IYouTubeThumbnailSchema {
    maxres?: IYouTubeImageSchema;
    high?: IYouTubeImageSchema;
    medium?: IYouTubeImageSchema;
    standard?: IYouTubeImageSchema;
    default?: IYouTubeImageSchema;
}
