import IMessageChannel from "./IMessageChannel";
import ISubscriber from "./ISubscriber";
import Topic from "./Topic";

export default class MessageChannel implements IMessageChannel {
    private subscriberMap: Map<string, ISubscriber>;

    constructor(private _topic: Topic) {
        this.subscriberMap = new Map<string, ISubscriber>();
    }

    topic(): Topic {
        return this._topic;
    }

    subscribers(): ISubscriber[] {
        const iterator = this.subscriberMap.values();
        const subscribers = [];
        for (const subscriber of iterator) {
            subscribers.push(subscriber);
        }
        return subscribers;
    }

    subscribe(subscriber: ISubscriber): void {
        this.subscriberMap.set(subscriber.id(), subscriber);
    }

    unsubscribe(subscriber: ISubscriber): void {
        this.subscriberMap.delete(subscriber.id());
    }
}
