import { inject, injectable } from "inversify";
import Types from "../@Types/Types";
import IMessage from "../Messages/IMessage";
import ISubscriber from "./ISubscriber";
import IMessageQueue from "./IMessageQueue";
import Subscription from "./Subscription";
import Topic from "./Topic";
import { v4 as uuid } from "uuid";
import MessageType from "../Messages/MessageType";
import ISubscribition from "./ISubscription";
import IResponseMessage from "../Messages/IResponseMessage";

@injectable()
export default abstract class Subscriber implements ISubscriber {
    constructor(@inject(Types.MessageQueue) private messageQueue: IMessageQueue) {}

    query<T>(
        topic: Topic,
        messageType: MessageType,
        originalMessage: IMessage<unknown>
    ): Promise<IMessage<T>> {
        return new Promise((resolve: (message: IMessage<T>) => void) => {
            this.publish(topic, originalMessage);
            const subscription = this.subscribe(
                topic,
                messageType,
                (message: IResponseMessage<T>) => {
                    if (
                        message.originalMessageId() !== null &&
                        originalMessage.metadata().id() === message.originalMessageId()
                    ) {
                        this.unsubscribe(topic, subscription);
                        return resolve(message);
                    }
                }
            );
        });
    }

    unsubscribe(topic: Topic, subscription: ISubscribition): void {
        this.messageQueue.unsubcribe(topic, subscription);
    }

    subscribe<T>(
        topic: Topic,
        type: MessageType,
        handler: (message: IMessage<T>) => void
    ): ISubscribition {
        const subscription = new Subscription(uuid(), type, handler, this);
        this.messageQueue.subscribe(topic, subscription);
        return subscription;
    }

    publish<T>(topic: Topic, message: IMessage<T>): void {
        this.messageQueue.publish(topic, message);
    }
}
