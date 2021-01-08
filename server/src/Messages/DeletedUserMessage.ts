import IMessage from "./IMessage";
import IMessageStructure from "./IMessageStructure";
import MessageType from "./MessageType";

export default class DeletedUserMessage implements IMessage {
    constructor(private id: string) {}

    create(): IMessageStructure {
        return {
            metadata: {
                type: MessageType.DeletedUserMessage,
                success: true
            },
            data: {
                message: `Deleted user@${this.id}`
            }
        };
    }
}
