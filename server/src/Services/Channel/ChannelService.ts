import { inject, injectable, tagged } from "inversify";
import Tags from "../../@Types/Tags";
import Types from "../../@Types/Types";
import ChannelBuilder from "../../Entities/Channel/ChannelBuilder";
import IChannel from "../../Entities/Channel/IChannel";
import ICreateChannelBody from "../../Messages/Bodies/ICreateChannelBody";
import ChannelRepository from "../../Repositories/Channel/ChannelRepository";
import IChannelService from "./IChannelService";

@injectable()
export default class ChannelService implements IChannelService {
    constructor(
        @inject(Types.ChannelRepository)
        @tagged(Tags.MONGO, true)
        private channelRepository: InstanceType<typeof ChannelRepository>
    ) {}

    async getChannels(id: string[]): Promise<IChannel[]> {
        return await this.channelRepository.find({
            where: {
                _id: {
                    $in: id
                }
            }
        });
    }

    async create(options: ICreateChannelBody): Promise<IChannel> {
        const channelBuilder = new ChannelBuilder();
        channelBuilder
            .setId("")
            .setName(options.name)
            .setPlatformId(options.platformId)
            .setPlatform(options.platform)
            .setSubscriberCount(options.subscriberCount);
        return await this.channelRepository.add(channelBuilder.build());
    }
}
