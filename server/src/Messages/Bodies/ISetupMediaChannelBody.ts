import ICreatorJSONSchema from "../../Schemas/JSON/Creator/ICreatorJSONSchema";
import ICreateChannelBody from "./ICreateChannelBody";

export default interface ISetupMediaChannelBody {
    channelBody: ICreateChannelBody;
    creator: ICreatorJSONSchema;
}
