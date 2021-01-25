import IEntity from "../IEntity";

export default interface IWebhook extends IEntity {
    expirationDate(): Date;
    dateCreated(): Date;
    platform(): string;
    topicUrl(): string;
    callbackUrl(): string;
    platformChannelId(): string;
    channelId(): string;
}
