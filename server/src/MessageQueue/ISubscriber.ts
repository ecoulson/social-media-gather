import IMessage from "../Messages/IMessage";
import MessageType from "../Messages/MessageType";
import ISubscribition from "./ISubscription";
import Topic from "./Topic";

export default interface ISubscriber {
    publish<T>(topic: Topic, message: IMessage<T>): void;
    subscribe<T>(
        topic: Topic,
        type: MessageType,
        handler: (message: IMessage<T>) => void
    ): ISubscribition;
    query<T>(
        topic: Topic,
        type: MessageType,
        originalMessage: IMessage<unknown>
    ): Promise<IMessage<T>>;
    unsubscribe(topic: Topic, subscriber: ISubscribition): void;
}
