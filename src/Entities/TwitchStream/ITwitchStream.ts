import IImage from "../Media/IImage";
import IPost from "../Post/IPost";

export default interface ITwitchStream extends IPost {
    viewers(): number;
    updateViewers(viewers: number): void;
    isLive(): boolean;
    thumbnail(): IImage;
    startedAt(): Date;
    endedAt(): Date;
    url(): string;
    title(): string;
    userId(): string;
    screenName(): string;
    gameName(): string;
    streamId(): string;
    endStream(): void;
}
