import { inject } from "inversify";
import Types from "../@Types/Types";
import Topic from "../Services/MessageQueue/Topic";
import ICreateChannelBody from "../Messages/Bodies/ICreateChannelBody";
import IMessage from "../Messages/IMessage";
import IChannelService from "../Services/Channel/IChannelService";
import IMessageQueue from "../Services/MessageQueue/IMessageQueue";
import ChannelCreatedMessage from "../Messages/Channel/ChannelCreatedMessage";
import MessageType from "../Messages/MessageType";
import SubscriptionHandler from "./SubscriptionHandler";

export default class ChannelSubscriber extends SubscriptionHandler {
    constructor(
        @inject(Types.ChannelService) private channelService: IChannelService,
        @inject(Types.MessageQueue) private messageQueue: IMessageQueue
    ) {
        super(messageQueue);
        this.addHandler(Topic.Channel, this.handleCreate);
    }

    async handleCreate(message: IMessage<ICreateChannelBody>) {
        if (message.metadata().type() === MessageType.CreateChannelMessage) {
            const channel = await this.channelService.create(message.data());
            this.messageQueue.publish(
                Topic.Channel,
                new ChannelCreatedMessage(channel, message.metadata().id())
            );
        }
    }
}
