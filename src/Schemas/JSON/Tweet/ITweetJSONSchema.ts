import ITweetMediaJSONSchema from "./ITweetMediaJSONSchema";
import ITweetMentionJSONSchema from "./ITweetMentionJSONSchema";
import ITweetUrlJSONSchema from "./ITweetUrlJSONSchema";

export default interface ITweetJSONSchema {
    id: string;
    text: string;
    publishedAt: Date;
    screenName: string;
    hashtags: string[];
    urls: ITweetUrlJSONSchema[];
    userMentions: ITweetMentionJSONSchema[];
    media: ITweetMediaJSONSchema[];
}
