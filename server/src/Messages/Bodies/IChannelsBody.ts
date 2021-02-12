import IChannelJSONSchema from "../../Schemas/JSON/Channel/IChannelJSONSchema";

export default interface IChannelsBody {
    channels: IChannelJSONSchema[];
}
