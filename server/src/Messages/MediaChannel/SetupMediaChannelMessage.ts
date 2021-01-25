import ICreateChannelBody from "../Bodies/ICreateChannelBody";
import Message from "../Message";
import MetaData from "../MetaData";
import { v4 as uuid } from "uuid";
import MessageType from "../MessageType";
import ISetupMediaChannelBody from "../Bodies/ISetupMediaChannelBody";
import CreatorJSONSerializer from "../../Serializers/JSON/CreatorJSONSerializer";
import ICreator from "../../Entities/Creator/ICreator";

export default class SetupMediaChannelMessage extends Message<ISetupMediaChannelBody> {
    constructor(channelBody: ICreateChannelBody, creator: ICreator) {
        super(new MetaData(uuid(), true, MessageType.SetupMediaChannel), {
            channelBody,
            creator: CreatorJSONSerializer(creator)
        });
    }
}
