import IChannel from "../../Entities/Channel/IChannel";
import ICreateChannelOptions from "./ICreateChannelOptions";

export default interface IChannelService {
    create(options: ICreateChannelOptions): Promise<IChannel>;
}
