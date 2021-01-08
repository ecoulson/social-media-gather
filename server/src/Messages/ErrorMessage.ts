import IMessage from "./IMessage";
import IMessageStructure from "./IMessageStructure";
import MessageType from "./MessageType";

export default class ErrorMessage implements IMessage {
    constructor(private error: Error) {}

    create(): IMessageStructure {
        return {
            metadata: {
                type: MessageType.Error,
                success: false
            },
            data: {
                error: {
                    message: this.error.message,
                    stack: this.error.stack,
                    name: this.error.name
                }
            }
        };
    }
}
