import ITweetUrlDocument from "./ITweetUrlDocument";
import ITweetMentionDocument from "./ITweetMentionDocument";
import ITweetMediaDocument from "./ITweetMediaDocument";

export default interface ITweetDocument {
    id: string;
    text: string;
    publishedAt: Date;
    screenName: string;
    hashtags: string[];
    favorites: number;
    commentCount: number;
    retweets: number;
    urls: ITweetUrlDocument[];
    userMentions: ITweetMentionDocument[];
    media: ITweetMediaDocument[];
}
