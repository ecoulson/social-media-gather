import IUser from "../User/IUser";

export default interface ICreator extends IUser {
    channels(): string[];
    addChannel(channelId: string): void;
    removeChannel(channelId: string): void;
}
