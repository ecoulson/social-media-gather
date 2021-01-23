import IMessage from "../../Messages/IMessage";
import MessageType from "../../Messages/MessageType";
import ISubscriber from "./ISubscriber";
import Topic from "./Topic";

export default interface IMessageQueue {
    subscribe(topic: Topic, subscriber: ISubscriber): ISubscriber;
    unsubcribe(topic: Topic, subscriber: ISubscriber): void;
    publish<T>(topic: Topic, message: IMessage<T>): void;
}
