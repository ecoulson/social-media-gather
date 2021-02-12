import IMessageJSONSchema from "../Schemas/JSON/Message/IMessageJSONSchema";
import IMessage from "./IMessage";
import IMetaData from "./IMetaData";

export default abstract class Message<Body> implements IMessage<Body> {
    constructor(private _metadata: IMetaData, private _data: Body) {}

    metadata(): IMetaData {
        return this._metadata;
    }

    body(): Body {
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

    abstract deserialize<Data>(): Data;
}
