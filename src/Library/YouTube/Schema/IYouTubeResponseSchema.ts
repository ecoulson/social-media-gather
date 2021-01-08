export default interface IYouTubeResponseSchema<T> {
    nextPageToken?: string | null;
    previousPageToken?: string | null;
    items: T;
}
