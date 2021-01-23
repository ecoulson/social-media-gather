import IMessage from "../../Messages/IMessage";

export default interface ISubscriber {
    id(): string;
    call<T>(message: IMessage<T>): void;
}
