import IUser from "../User/IUser";
import IEntity from "../IEntity";
import IImage from "../Media/IImage";

export default interface ITwitchStream extends IEntity {
    viewers() : number;
    updateViewers(viewers: number) : void;
    isLive(): boolean;
    thumbnail(): IImage;
    startedAt(): Date;
    endedAt(): Date;
    url(): string;
    title(): string;
    userId() : string;
    screenName() : string;
    user(): Promise<IUser>;
    gameName(): string;
    streamId(): string;
    endStream(): void;
}