import ITwitchStream from "../../Entities/TwitchStream/ITwitchStream";

export default interface ITwitchStreamRepository {
    findAllLiveBroadcastsForUser(userId: string): Promise<ITwitchStream[]>;
}
