import IMessage from "../Messages/IMessage";
import IMessageChannel from "./IMessageChannel";
import IMessageQueue from "./IMessageQueue";
import ISubscribition from "./ISubscription";
import MessageChannel from "./MessageChannel";
import Topic from "./Topic";

export default class TopicMessageQueue implements IMessageQueue {
    private routingTable: Map<string, IMessageChannel>;

    constructor() {
        this.routingTable = new Map<string, IMessageChannel>();
    }

    unsubcribe(topic: Topic, subscription: ISubscribition): void {
        this.routingTable.get(topic).unsubscribe(subscription);
    }

    subscribe(topic: Topic, subscription: ISubscribition): ISubscribition {
        if (!this.routingTable.has(topic)) {
            this.routingTable.set(topic, new MessageChannel(topic));
        }
        this.routingTable.get(topic).subscribe(subscription);
        return subscription;
    }

    publish<T>(topic: Topic, message: IMessage<T>): void {
        const channel = this.routingTable.get(topic);
        const subscribers = channel.subscriptions();
        subscribers.forEach((subscription) => {
            if (subscription.type() === message.metadata().type()) {
                subscription.call(message);
            }
        });
    }
}
