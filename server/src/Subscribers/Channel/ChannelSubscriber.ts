import { inject } from "inversify";
import Types from "../../@Types/Types";
import Topic from "../../MessageQueue/Topic";
import IChannelService from "../../Services/Channel/IChannelService";
import IMessageQueue from "../../MessageQueue/IMessageQueue";
import ChannelCreatedMessage from "../../Messages/Channel/ChannelCreatedMessage";
import MessageType from "../../Messages/MessageType";
import Subscriber from "../../MessageQueue/Subscriber";
import GetChannelsMessage from "../../Messages/Channel/GetChannelsMessage";
import CreateChannelMessage from "../../Messages/Channel/CreateChannelMessage";
import ChannelsMessage from "../../Messages/Channel/ChannelsMessage";

export default class ChannelSubscriber extends Subscriber {
    constructor(
        @inject(Types.ChannelService) private channelService: IChannelService,
        @inject(Types.MessageQueue) messageQueue: IMessageQueue
    ) {
        super(messageQueue);
        this.subscribe(Topic.Channel, MessageType.CreateChannel, this.handleCreate);
        this.subscribe(Topic.Channel, MessageType.GetChannels, this.handleGetChannels);
    }

    async handleCreate(message: CreateChannelMessage) {
        const channel = await this.channelService.create(message.body());
        this.publish(Topic.Channel, new ChannelCreatedMessage(channel, message));
    }

    async handleGetChannels(message: GetChannelsMessage) {
        const channels = await this.channelService.getChannels(message.body().ids);
        this.publish(Topic.Channel, new ChannelsMessage(channels, message));
    }
}
