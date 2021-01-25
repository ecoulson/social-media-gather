import IMedia from "../Media/IMedia";
import IPost from "../Post/IPost";
import ITweetMention from "./ITweetMentions";
import ITweetUrl from "./ITweetUrl";

export default interface ITweet extends IPost {
    text(): string;
    publishedAt(): Date;
    screenName(): string;
    hashtags(): string[];
    urls(): ITweetUrl[];
    mentions(): ITweetMention[];
    media(): IMedia[];
    tweetId(): string;
    favorites(): number;
    retweetCount(): number;
    commentCount(): number;
}
