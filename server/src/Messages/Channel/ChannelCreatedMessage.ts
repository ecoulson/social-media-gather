import IChannel from "../../Entities/Channel/IChannel";
import ChannelJSONSerializer from "../../Serializers/ChannelJSONSerializer";
import IChannelCreatedBody from "../Bodies/IChannelCreatedBody";
import Message from "../Message";
import MessageType from "../MessageType";
import MetaData from "../MetaData";
import { v4 as uuid } from "uuid";

export default class ChannelCreatedMessage extends Message<IChannelCreatedBody> {
    constructor(channel: IChannel, responseId: string) {
        super(new MetaData(uuid(), true, MessageType.ChannelCreatedMessage), {
            originalId: responseId,
            channel: ChannelJSONSerializer(channel)
        });
    }
}
