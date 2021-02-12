import IYouTubeTagSchema from "./IYouTubeTagSchema";

export default interface IYouTubeSuggestionsSchema {
    processingErrors?: string[];
    processingWarnings?: string[];
    processingHints?: string[];
    tagSuggestions?: IYouTubeTagSchema[];
    editorSuggestions?: string[];
}
