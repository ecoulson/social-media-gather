import IEntity from "../IEntity";
import IUser from "../User/IUser";

export default interface IWebhook extends IEntity {
    expirationDate() : Date;
    dateCreated() : Date;
    platform() : string;
    topicUrl() : string;
    callbackUrl(): string;
    channelId() : string;
    user() : Promise<IUser>
    userId() : string;
}