import { ITweetResponseMedia } from "./ITweetResponseMedia";

export interface ITweetResponseVideo extends ITweetResponseMedia {
    variants: {
        bitrate: number;
        url: string;
    }[];
}
