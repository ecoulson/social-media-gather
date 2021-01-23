import IMessage from "../../Messages/IMessage";
import ISubscriber from "./ISubscriber";

type MessageCallback = (message: IMessage<any>) => void;

export default class Subscriber implements ISubscriber {
    private _callback: MessageCallback;

    constructor(private _id: string, callback: MessageCallback, context: any) {
        this._callback = callback.bind(context);
    }

    id(): string {
        return this._id;
    }

    call<T>(message: IMessage<T>): void {
        this._callback(message);
    }
}
