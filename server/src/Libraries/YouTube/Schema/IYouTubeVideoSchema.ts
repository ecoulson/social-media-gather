import IYouTubeLocalizationSchema from "./IYouTubeLocalizationSchema";
import IYouTubeSuggestionsSchema from "./IYouTubeSuggestionsSchema";
import IYouTubeVideoContentDetailsSchema from "./IYouTubeVideoContentDetailsSchema";
import IYouTubeVideoFileDetailsSchema from "./IYouTubeVideoFileDetailsSchema";
import IYouTubeVideoLiveStreamingDetailsSchema from "./IYouTubeVideoLiveStreamingDetailsSchema";
import IYouTubeVideoPlayerSchema from "./IYouTubeVideoPlayerSchema";
import IYouTubeVideoProcessingDetailsSchema from "./IYouTubeVideoProcessingDetailsSchema";
import IYouTubeVideoRecordingDetailsSchema from "./IYouTubeVideoRecordingDetailsSchema";
import IYouTubeVideoSnippetSchema from "./IYouTubeVideoSnippetSchema";
import IYouTubeVideoStatisticsSchema from "./IYouTubeVideoStatisticsSchema";
import IYouTubeVideoStatusSchema from "./IYouTubeVideoStatusSchema";
import IYouTubeVideoTopicDetailsSchema from "./IYouTubeVideoTopicDetailsSchema";

export default interface IYouTubeVideoSchema {
    kind?: string;
    etag?: string;
    id?: string;
    snippet?: IYouTubeVideoSnippetSchema;
    contentDetails?: IYouTubeVideoContentDetailsSchema;
    status?: IYouTubeVideoStatusSchema;
    statistics?: IYouTubeVideoStatisticsSchema;
    player?: IYouTubeVideoPlayerSchema;
    topicDetails?: IYouTubeVideoTopicDetailsSchema;
    recordingDetails?: IYouTubeVideoRecordingDetailsSchema;
    fileDetails?: IYouTubeVideoFileDetailsSchema;
    processingDetails?: IYouTubeVideoProcessingDetailsSchema;
    suggestions?: IYouTubeSuggestionsSchema;
    liveStreamingDetails?: IYouTubeVideoLiveStreamingDetailsSchema;
    localizations?: { [key: string]: IYouTubeLocalizationSchema };
}
