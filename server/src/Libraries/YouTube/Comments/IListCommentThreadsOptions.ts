export default interface IListCommentThreadsOptions {
    part?: string[];
    allThreadsRelatedToChannelId?: string;
    channelId?: string;
    id?: string[];
    videoId?: string;
    maxResults?: number;
    moderationStatus?: string;
    order?: string;
    pageToken?: string;
    searchTerms?: string;
    textFormat?: string;
}
