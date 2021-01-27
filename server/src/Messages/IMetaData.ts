import MessageType from "./MessageType";

export default interface IMetaData {
    success(): boolean;
    type(): MessageType;
    id(): string;
    isResponse(): boolean;
}
