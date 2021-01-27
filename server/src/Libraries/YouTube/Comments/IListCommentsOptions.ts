export default interface IListCommentsOptions {
    part?: string[];
    id?: string[];
    parentId?: string;
    maxResults?: number;
    pageToken?: string;
    textFromat?: string;
}
