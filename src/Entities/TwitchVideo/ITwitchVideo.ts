import IEntity from "../IEntity";
import IImage from "../Media/IImage";
import IUser from "../User/IUser";

export default interface ITwitchVideo extends IEntity {
    url(): string;
    gameName(): string;
    publishedAt(): Date;
    title(): string;
    description(): string;
    thumbnail(): IImage;
    screenName(): string;
    userId(): string;
    user(): Promise<IUser>;
}
