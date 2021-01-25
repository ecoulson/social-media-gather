import IChannel from "../../Entities/Channel/IChannel";
import ChannelJSONSerializer from "../../Serializers/JSON/ChannelJSONSerializer";
import { v4 as uuid } from "uuid";
import ResponseMessage from "../Users/ResponseMessage";
import IChannelsBody from "../Bodies/IChannelsBody";

export default class ChannelCreatedMessage extends ResponseMessage<IChannelsBody> {
    constructor(channel: IChannel, originalMessageId: string) {
        super(uuid(), originalMessageId, {
            channels: [ChannelJSONSerializer(channel)]
        });
    }
}
