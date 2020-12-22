import IEntity from "../IEntity";
import { IImage } from "../Image/IImage";

export default interface ITwitchStream extends IEntity {
    viewers() : number;
    updateViewers(viewers: number) : void;
    isLive(): boolean;
    thumbnails(): IImage[];
    timeStarted(): Date;
    url(): string;
    title(): string;
    streamerName(): string;
    creator(): any;
    id(): string;
    gameId(): string;
    streamId(): string;
    endStream(): void;
}