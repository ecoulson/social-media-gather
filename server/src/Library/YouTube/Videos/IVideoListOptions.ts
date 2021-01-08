import IYouTubeOptions from "../IYouTubeOptions";

export default interface IVideoListOptions extends IYouTubeOptions {
    ids?: string[];
    parts: string[];
}
