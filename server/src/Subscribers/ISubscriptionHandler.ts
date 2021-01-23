import IMessage from "../Messages/IMessage";
import Topic from "../Services/MessageQueue/Topic";

export default interface ISubscriptionHandler {
    addHandler<T>(topic: Topic, handler: (message: IMessage<T>) => void): void;
}
