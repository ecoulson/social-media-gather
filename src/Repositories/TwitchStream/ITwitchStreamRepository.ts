import ITwitchStream from "../../Entities/TwitchStream/ITwitchStream";

export default interface ITwitchStreamRepository {
    getAllLiveBroadcasts(): Promise<ITwitchStream[]>;
}
