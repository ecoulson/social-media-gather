import IMessage from "./IMessage";
import IMessageStructure from "./IMessageStructure";
import MessageType from "./MessageType";

export default class UnauthenticatedMessage implements IMessage {
    create(): IMessageStructure {
        return {
            metadata: {
                type: MessageType.Unauthenticated,
                success: false
            },
            data: {
                message: `Unauthenticated`
            }
        };
    }
}
