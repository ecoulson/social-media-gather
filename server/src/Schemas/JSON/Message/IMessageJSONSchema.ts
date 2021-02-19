import MessageType from "../../../Messages/MessageType";

export default interface IMessageJSONSchema {
    metadata: {
        success: boolean;
        type: MessageType;
    };
    data: any;
}
