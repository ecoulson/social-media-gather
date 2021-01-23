import MessageType from "./MessageType";
import IMetaData from "./IMetaData";

export default class MetaData implements IMetaData {
    constructor(private _id: string, private _success: boolean, private _type: MessageType) {}

    id(): string {
        return this._id;
    }

    success(): boolean {
        return this._success;
    }

    type(): MessageType {
        return this._type;
    }
}
