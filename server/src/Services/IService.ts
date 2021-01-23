import IMessage from "../Messages/IMessage";
import Topic from "./MessageQueue/Topic";

export default interface IService {
    emit<T>(topic: Topic, message: IMessage<T>): void;
}
