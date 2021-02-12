import IChannel from "../../Entities/Channel/IChannel";
import ICreateChannelBody from "../../Messages/Bodies/ICreateChannelBody";
import ICreatorJSONSchema from "../../Schemas/JSON/Creator/ICreatorJSONSchema";
import IMediaPlatformChannelSearchResult from "./IMediaPlatformChannelSearchResult";

export default interface IMediaPlatformService {
    searchPlatformForChannel(username: string): Promise<IMediaPlatformChannelSearchResult>;
    createChannel(
        createChannelBody: ICreateChannelBody,
        creator: ICreatorJSONSchema
    ): Promise<IChannel>;
}
