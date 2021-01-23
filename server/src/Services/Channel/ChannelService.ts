import { inject, injectable, tagged } from "inversify";
import Tags from "../../@Types/Tags";
import Types from "../../@Types/Types";
import ChannelBuilder from "../../Entities/Channel/ChannelBuilder";
import IChannel from "../../Entities/Channel/IChannel";
import ChannelRepository from "../../Repositories/Channel/ChannelRepository";
import IMessageQueue from "../MessageQueue/IMessageQueue";
import Service from "../Service";
import IChannelService from "./IChannelService";
import ICreateChannelOptions from "./ICreateChannelOptions";

@injectable()
export default class ChannelService extends Service implements IChannelService {
    constructor(
        @inject(Types.ChannelRepository)
        @tagged(Tags.MONGO, true)
        private channelRepository: InstanceType<typeof ChannelRepository>,
        @inject(Types.MessageQueue)
        messageQueue: IMessageQueue
    ) {
        super(messageQueue);
    }

    async create(options: ICreateChannelOptions): Promise<IChannel> {
        console.log(options);
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
