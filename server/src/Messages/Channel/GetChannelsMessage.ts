import IGetChannelsBody from "../Bodies/IGetChannelsBody";
import Message from "../Message";
import { v4 as uuid } from "uuid";
import MessageType from "../MessageType";
import MetaData from "../MetaData";

export default class GetChannelsMessage extends Message<IGetChannelsBody> {
    constructor(ids: string[]) {
        super(new MetaData(uuid(), true, MessageType.GetChannels), {
            ids
        });
    }
}
