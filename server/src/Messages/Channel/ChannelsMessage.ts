import IChannel from "../../Entities/Channel/IChannel";
import IChannelsBody from "../Bodies/IChannelsBody";
import { v4 as uuid } from "uuid";
import ChannelJSONSerializer from "../../Serializers/JSON/ChannelJSONSerializer";
import ResponseMessage from "../ResponseMessage";
import MessageType from "../MessageType";
import IMessage from "../IMessage";

export default class ChannelsMessage extends ResponseMessage<IChannelsBody> {
    constructor(channels: IChannel[], originalMessage: IMessage<unknown>) {
        super(
            uuid(),
            MessageType.Channels,
            {
                channels: channels.map((channel) => ChannelJSONSerializer(channel))
            },
            originalMessage
        );
    }
}
