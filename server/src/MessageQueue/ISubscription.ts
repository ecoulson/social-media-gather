import IMessage from "../Messages/IMessage";
import MessageType from "../Messages/MessageType";

export default interface ISubscribition {
    id(): string;
    type(): MessageType;
    call<T>(message: IMessage<T>): void;
}
