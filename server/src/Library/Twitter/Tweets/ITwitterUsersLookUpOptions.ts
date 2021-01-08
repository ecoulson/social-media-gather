export default interface ITwitterTweetsLookUpOptions {
    userId?: string;
    screenName?: string;
    sinceId?: string;
    count?: number;
    maxId?: number | string;
    trimUser?: boolean;
    excludeReplies?: boolean;
    includeRTs?: boolean;
}
