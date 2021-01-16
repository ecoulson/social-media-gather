import IImage from "../Media/IImage";
import IPost from "../Post/IPost";

export default interface ITwitchVideo extends IPost {
    url(): string;
    gameName(): string;
    publishedAt(): Date;
    title(): string;
    description(): string;
    thumbnail(): IImage;
    screenName(): string;
    userId(): string;
    views(): number;
}
