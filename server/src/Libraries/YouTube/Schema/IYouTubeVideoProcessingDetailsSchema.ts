import IYouTubeVideoProcessingProgressSchema from "./IYouTubeVideoProcessingProgressSchema";

export default interface IYouTubeVideoProcessingDetailsSchema {
    processingStatus?: string;
    processingProgress?: IYouTubeVideoProcessingProgressSchema;
    processingFailureReason?: string;
    fileDetailsAvailability?: string;
    processingIssuesAvailability?: string;
    tagSuggestionsAvailability?: string;
    editorSuggestionsAvailability?: string;
    thumbnailsAvailability?: string;
}
