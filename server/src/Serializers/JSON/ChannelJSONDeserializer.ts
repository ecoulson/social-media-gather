import { Transformer } from "../../@Types";
import ChannelBuilder from "../../Entities/Channel/ChannelBuilder";
import IChannel from "../../Entities/Channel/IChannel";
import IChannelJSONSchema from "../../Schemas/JSON/Channel/IChannelJSONSchema";

const ChannelJSONDeserializer: Transformer<IChannelJSONSchema, IChannel> = (schema) => {
    const channelBuilder = new ChannelBuilder();
    channelBuilder
        .setId(schema.id)
        .setName(schema.name)
        .setPlatform(schema.platform)
        .setPlatformId(schema.platformId)
        .setSubscriberCount(schema.subscriberCount);
    return channelBuilder.build();
};

export default ChannelJSONDeserializer;
