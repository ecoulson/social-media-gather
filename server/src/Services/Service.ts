import { inject, injectable } from "inversify";
import Types from "../@Types/Types";
import IMessage from "../Messages/IMessage";
import IService from "./IService";
import IMessageQueue from "./MessageQueue/IMessageQueue";
import Topic from "./MessageQueue/Topic";

@injectable()
export default abstract class Service implements IService {
    constructor(@inject(Types.MessageQueue) private messageQueue: IMessageQueue) {}

    emit<T>(topic: Topic, message: IMessage<T>): void {
        this.messageQueue.publish(topic, message);
    }
}
