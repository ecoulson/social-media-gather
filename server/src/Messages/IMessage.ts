import IMessageJSONSchema from "../Schemas/JSON/Message/IMessageJSONSchema";
import IMetaData from "./IMetaData";

export default interface IMessage<T> {
    metadata(): IMetaData;
    data(): T;
    toJson(): IMessageJSONSchema;
}
