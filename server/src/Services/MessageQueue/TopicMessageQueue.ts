import IMessage from "../../Messages/IMessage";
import IMessageChannel from "./IMessageChannel";
import IMessageQueue from "./IMessageQueue";
import ISubscriber from "./ISubscriber";
import MessageChannel from "./MessageChannel";
import Topic from "./Topic";

export default class TopicMessageQueue implements IMessageQueue {
    private routingTable: Map<string, IMessageChannel>;

    constructor() {
        this.routingTable = new Map<string, IMessageChannel>();
    }

    unsubcribe(topic: Topic, subscriber: ISubscriber): void {
        this.routingTable.get(topic).unsubscribe(subscriber);
    }

    subscribe(topic: Topic, subscriber: ISubscriber): ISubscriber {
        if (!this.routingTable.has(topic)) {
            this.routingTable.set(topic, new MessageChannel(topic));
        }
        this.routingTable.get(topic).subscribe(subscriber);
        return subscriber;
    }

    publish<T>(topic: Topic, message: IMessage<T>): void {
        const channel = this.routingTable.get(topic);
        const subscribers = channel.subscribers();
        subscribers.forEach((subscriber) => {
            subscriber.call(message);
        });
    }
}
