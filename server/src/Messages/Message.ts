import IMessageJSONSchema from "../Schemas/JSON/Message/IMessageJSONSchema";
import IMessage from "./IMessage";
import IMetaData from "./IMetaData";

export default class Message<T> implements IMessage<T> {
    constructor(private _metadata: IMetaData, private _data: T) {}

    metadata(): IMetaData {
        return this._metadata;
    }

    data(): T {
        return this._data;
    }

    toJson(): IMessageJSONSchema {
        return {
            metadata: {
                succes: this._metadata.success(),
                type: this._metadata.type()
            },
            data: this._data
        };
    }
}
