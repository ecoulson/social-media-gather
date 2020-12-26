import IDataStore from "../../DataStore/IDataStore";
import ITwitchStream from "../../Entities/TwitchStream/ITwitchStream";
import ITwitchStreamRecord from "./ITwitchStreamRecord";
import BasicRecord from "../BasicRecord";
import RecordMixin from "../RecordMixin";

class TwitchStreamRecord extends BasicRecord<ITwitchStream> implements ITwitchStreamRecord {
    constructor(dataStore: IDataStore<ITwitchStream>) {
        super(dataStore);
    }

    async getAllLiveBroadcasts(): Promise<ITwitchStream[]> {
        return await this.dataStore.find({
            "twitchStream.live": true
        });
    }
}

export default RecordMixin<ITwitchStream>()(TwitchStreamRecord);
