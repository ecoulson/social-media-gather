export default interface ITwitchStreamDocument {
    url: string;
    live: boolean;
    gameName: string;
    startedAt: Date;
    endedAt: Date;
    username: string;
    thumbnailUrl: string;
    title: string;
    streamId: string;
}