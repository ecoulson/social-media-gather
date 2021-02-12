import { Transformer } from "../../../@Types";
import IChannel from "../../../Entities/Channel/IChannel";
import IChannelDocument from "../../../Schemas/Mongo/Channel/IChannelDocument";

const ChannelDocumentTransform: Transformer<IChannel, Partial<IChannelDocument>> = (entity) => {
    return {
        name: entity.name(),
        platform: entity.platform(),
        platformId: entity.platformId(),
        subscriberCount: entity.subscriberCount()
    };
};

export default ChannelDocumentTransform;
