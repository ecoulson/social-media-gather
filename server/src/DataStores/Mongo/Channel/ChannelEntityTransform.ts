import { Transformer } from "../../../@Types";
import ChannelBuilder from "../../../Entities/Channel/ChannelBuilder";
import IChannel from "../../../Entities/Channel/IChannel";
import IChannelDocument from "../../../Schemas/Mongo/Channel/IChannelDocument";

const ChannelEntityTransform: Transformer<IChannelDocument, IChannel> = (document) => {
    const entityBuilder = new ChannelBuilder();
    return entityBuilder
        .setId(document.id)
        .setName(document.name)
        .setPlatform(document.platform)
        .setPlatformId(document.platformId)
        .setSubscriberCount(document.subscriberCount)
        .build();
};

export default ChannelEntityTransform;
