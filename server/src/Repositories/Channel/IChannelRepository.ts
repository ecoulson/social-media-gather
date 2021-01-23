import IChannel from "../../Entities/Channel/IChannel";

export default interface IChannelRepository {
    findByPlatformId(platformId: string): Promise<IChannel>;
}
