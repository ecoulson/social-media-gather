import IYouTubeAudioStreamSchema from "./IYouTubeAudioStreamSchema";
import IYouTubeVideoStreamSchema from "./IYouTubeVideoStreamSchema";

export default interface IYouTubeVideoFileDetailsSchema {
    fileName?: string;
    fileSize?: string;
    fileType?: string;
    container?: string;
    videoStreams?: IYouTubeVideoStreamSchema[];
    audioStreams?: IYouTubeAudioStreamSchema[];
    durationMs?: string;
    bitrateBps?: string;
    creationTime?: string;
}
