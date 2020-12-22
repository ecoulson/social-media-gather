import ITwitchStream from "../../Entities/TwitchStream/ITwitchStream";

export default interface ITwitchStreamRecord {
    getLiveStreams() : Promise<ITwitchStream[]>;
}