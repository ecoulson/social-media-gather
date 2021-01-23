import MessageType from "../../../Messages/MessageType";

export default interface IMessageJSONSchema {
    metadata: {
        succes: boolean;
        type: MessageType;
    };
    data: any;
}
