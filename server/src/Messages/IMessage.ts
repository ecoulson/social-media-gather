import IMessageJSONSchema from "../Schemas/JSON/Message/IMessageJSONSchema";
import IMetaData from "./IMetaData";

export default interface IMessage<Body> {
    metadata(): IMetaData;
    body(): Body;
    toJson(): IMessageJSONSchema;
    deserialize<Data>(): Data;
}
