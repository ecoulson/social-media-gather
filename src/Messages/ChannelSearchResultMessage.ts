import IMediaPlatformChannelSearchResult from "../Services/MediaChannel/IMediaPlatformChannelSearchResult";
import IMessage from "./IMessage";
import IMessageStructure from "./IMessageStructure";
import MessageType from "./MessageType";

export default class ChannelSearchResultMessage implements IMessage {
    constructor(private searchResults: IMediaPlatformChannelSearchResult) {}

    create(): IMessageStructure {
        return {
            metadata: {
                type: MessageType.ChannelSearchResultMessage,
                success: true
            },
            data: {
                results: this.searchResults
            }
        };
    }
}
