export default interface ITwitchStreamDocument {
    url: string;
    live: boolean;
    gameName: string;
    startedAt: Date;
    endedAt: Date;
    userName: string;
    thumbnailUrl: string;
    title: string;
    streamId: string;
    viewers: number;
}
