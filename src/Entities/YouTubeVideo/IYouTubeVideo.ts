import IEntity from "../IEntity";
import IUser from "../User/IUser";

export default interface IYouTubeVideo extends IEntity {
    publishedAt() : Date;
    thumbnailUrl() : string;
    title() : string;
    videoId() : string;
    user() : Promise<IUser>;
    userId() : string;
}