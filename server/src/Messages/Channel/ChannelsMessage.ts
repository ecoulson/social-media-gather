import IChannel from "../../Entities/Channel/IChannel";
import IChannelsBody from "../Bodies/IChannelsBody";
import { v4 as uuid } from "uuid";
import ChannelJSONSerializer from "../../Serializers/JSON/ChannelJSONSerializer";
import ResponseMessage from "../Users/ResponseMessage";

export default class ChannelsMessage extends ResponseMessage<IChannelsBody> {
    constructor(channels: IChannel[], originalMessageId: string) {
        super(uuid(), originalMessageId, {
            channels: channels.map((channel) => ChannelJSONSerializer(channel))
        });
    }
}
