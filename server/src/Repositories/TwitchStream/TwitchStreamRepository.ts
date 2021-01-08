import IDataStore from "../../DataStore/IDataStore";
import ITwitchStream from "../../Entities/TwitchStream/ITwitchStream";
import ITwitchStreamRepository from "./ITwitchStreamRepository";
import CoreRepository from "../CoreRepository";
import RepositoryMixin from "../RepositoryMixin";

class TwitchStreamRepository
    extends CoreRepository<ITwitchStream>
    implements ITwitchStreamRepository {
    constructor(dataStore: IDataStore<ITwitchStream>) {
        super(dataStore);
    }

    async findAllLiveBroadcastsForUser(userId: string): Promise<ITwitchStream[]> {
        return await this.dataStore.find({
            where: {
                userId,
                "twitchStream.live": true
            }
        });
    }
}

export default RepositoryMixin<ITwitchStream>()(TwitchStreamRepository);
