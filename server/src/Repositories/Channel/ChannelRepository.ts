import IChannel from "../../Entities/Channel/IChannel";
import CoreRepository from "../CoreRepository";
import RepositoryMixin from "../RepositoryMixin";
import IChannelRepository from "./IChannelRepository";

class ChannelRepository extends CoreRepository<IChannel> implements IChannelRepository {
    async findByPlatformId(platformId: string): Promise<IChannel> {
        const channels = await this.dataStore.find({
            where: {
                platformId
            }
        });
        return channels[0];
    }
}

export default RepositoryMixin<IChannel>()(ChannelRepository);
