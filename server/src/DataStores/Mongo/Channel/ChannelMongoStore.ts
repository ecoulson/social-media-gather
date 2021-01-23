import IChannel from "../../../Entities/Channel/IChannel";
import ChannelModel from "../../../Schemas/Mongo/Channel/ChannelModel";
import IChannelDocument from "../../../Schemas/Mongo/Channel/IChannelDocument";
import MongoDataStore from "../MongoDataStore";
import ChannelDocumentTransform from "./ChannelDocumentTransform";
import ChannelEntityTransform from "./ChannelEntityTransform";

export default class ChannelMongoStore extends MongoDataStore<IChannelDocument, IChannel> {
    constructor() {
        super(ChannelModel, ChannelEntityTransform, ChannelDocumentTransform);
    }
}
