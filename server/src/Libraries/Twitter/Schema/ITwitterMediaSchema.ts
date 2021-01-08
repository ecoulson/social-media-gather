import ITwitterMediaSizeSchema from "./ITwitterMediaSizeSchema";
import ITwitterVideoInfoSchema from "./ITwitterVideoInfoSchema";

export default interface ITwitterMediaSchema {
    display_url: string;
    expanded_url: string;
    id: number;
    id_str: string;
    indices: [number, number];
    media_url: string;
    media_url_https: string;
    sizes: ITwitterMediaSizeSchema;
    source_status_id: number | null;
    source_status_id_str: string | null;
    type: "photo" | "video" | "animated_gif";
    url: string;
    video_info?: ITwitterVideoInfoSchema;
}
