import IMessageChannel from "./IMessageChannel";
import ISubscribition from "./ISubscription";
import Topic from "./Topic";

export default class MessageChannel implements IMessageChannel {
    private subscriptionMap: Map<string, ISubscribition>;

    constructor(private _topic: Topic) {
        this.subscriptionMap = new Map<string, ISubscribition>();
    }

    topic(): Topic {
        return this._topic;
    }

    subscriptions(): ISubscribition[] {
        const iterator = this.subscriptionMap.values();
        const subscriptions = [];
        for (const subscription of iterator) {
            subscriptions.push(subscription);
        }
        return subscriptions;
    }

    subscribe(subscription: ISubscribition): void {
        this.subscriptionMap.set(subscription.id(), subscription);
    }

    unsubscribe(subscription: ISubscribition): void {
        this.subscriptionMap.delete(subscription.id());
    }
}
