import ISubscribition from "./ISubscription";
import Topic from "./Topic";

export default interface IMessageChannel {
    topic(): Topic;
    subscriptions(): ISubscribition[];
    subscribe(subscriber: ISubscribition): void;
    unsubscribe(subscriber: ISubscribition): void;
}
