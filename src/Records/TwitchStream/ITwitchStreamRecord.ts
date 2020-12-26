import ITwitchStream from "../../Entities/TwitchStream/ITwitchStream";

export default interface ITwitchStreamRecord {
    getAllLiveBroadcasts(): Promise<ITwitchStream[]>;
}
