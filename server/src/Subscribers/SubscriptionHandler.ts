import IMessage from "../Messages/IMessage";
import IMessageQueue from "../Services/MessageQueue/IMessageQueue";
import Subscriber from "../Services/MessageQueue/Subscriber";
import Topic from "../Services/MessageQueue/Topic";
import ISubscriptionHandler from "./ISubscriptionHandler";
import { v4 as uuid } from "uuid";

export default abstract class SubscriptionHandler implements ISubscriptionHandler {
    constructor(private _messageQueue: IMessageQueue) {}

    addHandler<T>(topic: Topic, handler: (message: IMessage<T>) => void): void {
        this._messageQueue.subscribe(topic, new Subscriber(uuid(), handler, this));
    }
}
