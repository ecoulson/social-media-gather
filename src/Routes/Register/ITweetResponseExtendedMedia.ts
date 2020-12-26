import { ITweetResponseMedia } from "./ITweetResponseMedia";
import { ITweetResponseVideo } from "./ITweetResponseVideo";

export interface ITweetResponseExtendedMedia extends ITweetResponseMedia {
    video_info: ITweetResponseVideo;
}
