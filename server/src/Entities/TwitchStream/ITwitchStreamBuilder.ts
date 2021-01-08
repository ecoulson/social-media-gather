import ITwitchStream from "./ITwitchStream";

export default interface ITwitchStreamBuilder {
    setViewers(viewers: number): ITwitchStreamBuilder;
    setStatus(isLive: boolean): ITwitchStreamBuilder;
    setThumbnail(url: string): ITwitchStreamBuilder;
    setStartedAt(startedAt: Date): ITwitchStreamBuilder;
    setEndedAt(endedAt: Date): ITwitchStreamBuilder;
    setUrl(url: string): ITwitchStreamBuilder;
    setTitle(title: string): ITwitchStreamBuilder;
    setUserId(userId: string): ITwitchStreamBuilder;
    setScreenName(screenName: string): ITwitchStreamBuilder;
    setGameName(gameName: string): ITwitchStreamBuilder;
    setStreamId(streamId: string): ITwitchStreamBuilder;
    setId(id: string): ITwitchStreamBuilder;
    build(): ITwitchStream;
}
