import IMessage from "./IMessage";
import IMessageStructure from "./IMessageStructure";
import MessageType from "./MessageType";

export default class SuccessMessage implements IMessage {
    create(): IMessageStructure {
        return {
            metadata: {
                success: true,
                type: MessageType.Success
            },
            data: null
        };
    }
}
