import { Transformer } from "../@Types";
import IChannel from "../Entities/Channel/IChannel";
import IChannelJSONSchema from "../Schemas/JSON/Channel/IChannelJSONSchema";

const ChannelJSONSerializer: Transformer<IChannel, IChannelJSONSchema> = (entity) => {
    return {
        id: entity.id(),
        name: entity.name(),
        platform: entity.platform(),
        platformId: entity.platformId(),
        subscriberCount: entity.subscriberCount()
    };
};

export default ChannelJSONSerializer;
