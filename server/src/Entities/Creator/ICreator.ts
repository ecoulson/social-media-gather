import IUser from "../User/IUser";

export default interface ICreator extends IUser {
    addChannel(channelId: string): void;
    removeChannel(channelId: string): void;
}
