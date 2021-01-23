import ISubscriber from "./ISubscriber";
import Topic from "./Topic";

export default interface IMessageChannel {
    topic(): Topic;
    subscribers(): ISubscriber[];
    subscribe(subscriber: ISubscriber): void;
    unsubscribe(subscriber: ISubscriber): void;
}
