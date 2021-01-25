import IMessage from "../Messages/IMessage";
import MessageType from "../Messages/MessageType";
import ISubscribition from "./ISubscription";
import Topic from "./Topic";

export default interface IMessageQueue {
    subscribe(topic: Topic, subscription: ISubscribition): ISubscribition;
    unsubcribe(topic: Topic, subscription: ISubscribition): void;
    publish<T>(topic: Topic, message: IMessage<T>): void;
}
