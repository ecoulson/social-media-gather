import MessageType from "./MessageType";

export default interface IMessageStructure {
    metadata: {
        type: MessageType;
        success: boolean;
    };
    data: unknown;
}
