import { inject } from "inversify";
import Types from "../../@Types/Types";
import Platform from "../../Entities/Platform/Platform";
import IMessageQueue from "../../MessageQueue/IMessageQueue";
import Subscriber from "../../MessageQueue/Subscriber";
import Topic from "../../MessageQueue/Topic";
import IChannelsBody from "../../Messages/Bodies/IChannelsBody";
import ChannelsMessage from "../../Messages/Channel/ChannelsMessage";
import SetupMediaChannelMessage from "../../Messages/MediaChannel/SetupMediaChannelMessage";
import MessageType from "../../Messages/MessageType";
import IMediaPlatformService from "../../Services/MediaChannel/IMediaPlatformService";

export default class MediaChannelSubscriber extends Subscriber {
    constructor(
        @inject(Types.MessageQueue) messageQueue: IMessageQueue,
        @inject(Types.MediaPlatformMap)
        private mediaPlatformMap: Map<Platform, IMediaPlatformService>
    ) {
        super(messageQueue);
        this.subscribe(Topic.Channel, MessageType.SetupMediaChannel, this.setupMediaChannel);
    }

    async setupMediaChannel(message: SetupMediaChannelMessage) {
        const mediaPlatformService = this.mediaPlatformMap.get(message.data().platform);
        const channel = await mediaPlatformService.createChannel(message.data());
        this.publish<IChannelsBody>(
            Topic.Channel,
            new ChannelsMessage([channel], message.metadata().id())
        );
    }
}
