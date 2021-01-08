import IYouTubePlaylistContentDetails from "./IYouTubePlaylistContentDetails";
import IYouTubePlaylistStatusSchema from "./IYouTubePlaylistStatusSchema";

export default interface IYouTubePlaylistSchema {
    contentDetails?: IYouTubePlaylistContentDetails;
    etag?: string | null;
    id?: string | null;
    kind?: string | null;
    snippet?: IYouTubePlaylistSchema;
    status?: IYouTubePlaylistStatusSchema;
}
