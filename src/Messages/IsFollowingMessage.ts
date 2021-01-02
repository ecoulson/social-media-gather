import IMessage from "./IMessage";
import IMessageStructure from "./IMessageStructure";
import MessageType from "./MessageType";

export default class IsFollowingMessage implements IMessage {
    constructor(private isFollowing: boolean) {}

    create(): IMessageStructure {
        return {
            metadata: {
                success: true,
                type: MessageType.IsFollowingMessage
            },
            data: {
                isFollowing: this.isFollowing
            }
        };
    }
}
