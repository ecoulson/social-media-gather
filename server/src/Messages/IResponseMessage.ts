import IMessage from "./IMessage";

export default interface IResponseMessage<T> extends IMessage<T> {
    originalMessageId(): string;
}
