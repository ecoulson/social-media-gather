import IYouTubeOptions from "../IYouTubeOptions";

export default interface IListPlaylistOptions extends IYouTubeOptions {
    part: string[];
    playlistId?: string;
    maxResults?: number;
}
