import { IImage } from "../Image/IImage";

export default interface ITwitchStreamDTO {
    viewers: number;
    isLive: boolean;
    thumbnails: IImage[];
    timeStarted: Date;
    url: string;
    title: string;
    creator: any;
    id: string;
    gameId: string;
    streamId: string;
}