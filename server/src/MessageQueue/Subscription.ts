import IMessage from "../Messages/IMessage";
import MessageType from "../Messages/MessageType";
import ISubscribition from "./ISubscription";

type MessageCallback = (message: IMessage<any>) => void;

export default class Subscription implements ISubscribition {
    private _callback: MessageCallback;

    constructor(
        private _id: string,
        private _type: MessageType,
        callback: MessageCallback,
        context: any
    ) {
        this._callback = callback.bind(context);
    }

    type(): MessageType {
        return this._type;
    }

    id(): string {
        return this._id;
    }

    call<T>(message: IMessage<T>): void {
        this._callback(message);
    }
}
