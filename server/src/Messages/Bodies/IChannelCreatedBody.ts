import IChannelJSONSchema from "../../Schemas/JSON/Channel/IChannelJSONSchema";

export default interface IChannelCreatedBody {
    originalId: string;
    channel: IChannelJSONSchema;
}
