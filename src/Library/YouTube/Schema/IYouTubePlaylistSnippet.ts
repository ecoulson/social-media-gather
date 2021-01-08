import IYouTubeResourceIdSchema from "./IYouTubeResourceIdSchema";
import IYouTubeThumbnailSchema from "./IYouTubeThumbnailSchema";

export default interface IYouTubePlaylistSnippet {
    /**
     * The ID that YouTube uses to uniquely identify the user that added the item to the playlist.
     */
    channelId?: string | null;
    /**
     * Channel title for the channel that the playlist item belongs to.
     */
    channelTitle?: string | null;
    /**
     * The item&#39;s description.
     */
    description?: string | null;
    /**
     * The ID that YouTube uses to uniquely identify thGe playlist that the playlist item is in.
     */
    playlistId?: string | null;
    /**
     * The order in which the item appears in the playlist. The value uses a zero-based index, so the first item has a position of &lt;code&gt;0&lt;/code&gt;, the second item has a position of &lt;code&gt;1&lt;/code&gt;, and so forth.
     */
    position?: number | null;
    /**
     * The date and time that the item was added to the playlist. The value is specified in &lt;a href=&quot;//www.w3.org/TR/NOTE-datetime&quot;&gt;ISO 8601&lt;/a&gt; format.
     */
    publishedAt?: string | null;
    /**
     * The &lt;code&gt;id&lt;/code&gt; object contains information that can be used to uniquely identify the resource that is included in the playlist as the playlist item.
     */
    resourceId?: IYouTubeResourceIdSchema;
    /**
     * A map of thumbnail images associated with the playlist item. For each object in the map, the key is the name of the thumbnail image, and the value is an object that contains other information about the thumbnail.
     */
    thumbnails?: IYouTubeThumbnailSchema;
    /**
     * The item&#39;s title.
     */
    title?: string | null;
}
