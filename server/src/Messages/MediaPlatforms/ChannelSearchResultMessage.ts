import IMediaPlatformChannelSearchResult from "../../Services/MediaChannel/IMediaPlatformChannelSearchResult";
import IChannelSearchResultBody from "../Bodies/IChannelSearchResultBody";
import Message from "../Message";
import MessageType from "../MessageType";
import MetaData from "../MetaData";
import { v4 as uuid } from "uuid";

export default class ChannelSearchResultMessage extends Message<IChannelSearchResultBody> {
    constructor(results: IMediaPlatformChannelSearchResult) {
        super(new MetaData(uuid(), true, MessageType.ChannelSearchResult), {
            results
        });
    }

    deserialize<T>(): T {
        return (this.body().results as unknown) as T;
    }
}
