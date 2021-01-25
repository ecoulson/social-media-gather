import IChannel from "../../Entities/Channel/IChannel";
import ICreateChannelBody from "../../Messages/Bodies/ICreateChannelBody";

export default interface IChannelService {
    create(options: ICreateChannelBody): Promise<IChannel>;
    getChannels(id: string[]): Promise<IChannel[]>;
}
