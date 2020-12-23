import IEntity from "../IEntity";
import IMedia from "../Media/IMedia";
import IUser from "../User/IUser";
import ITweetMention from "./ITweetMentions";
import ITweetUrl from "./ITweetUrl";

export default interface ITweet extends IEntity {
    text() : string;
    publishedAt() : Date,
    screenName() : string,
    hashtags() : string[];
    urls() : ITweetUrl[],
    mentions() : ITweetMention[],
    media(): IMedia[],
    tweetId() : string,
    userId() : string,
    user() : Promise<IUser>
}