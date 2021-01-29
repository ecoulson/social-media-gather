import IChannel from "../../Entities/Channel/IChannel";
import ChannelJSONSerializer from "../../Serializers/JSON/ChannelJSONSerializer";
import { v4 as uuid } from "uuid";
import ResponseMessage from "../ResponseMessage";
import IChannelsBody from "../Bodies/IChannelsBody";
import MessageType from "../MessageType";
import IMessage from "../IMessage";
import ChannelJSONDeserializer from "../../Serializers/JSON/ChannelJSONDeserializer";

export default class ChannelCreatedMessage extends ResponseMessage<IChannelsBody> {
    constructor(channel: IChannel, originalMessage: IMessage<unknown>) {
        super(
            uuid(),
            MessageType.Channels,
            {
                channels: [ChannelJSONSerializer(channel)]
            },
            originalMessage
        );
    }

    deserialize<T>(): T {
        return (this.body().channels.map((channel) =>
            ChannelJSONDeserializer(channel)
        ) as unknown) as T;
    }
}
