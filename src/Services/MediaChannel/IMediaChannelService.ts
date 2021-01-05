import IUser from "../../Entities/User/IUser";
import IMediaPlatformChannelSearchResult from "./IMediaPlatformChannelSearchResult";

export default interface IMediaPlatformChannelService {
    searchPlatformForChannel(username: string): Promise<IMediaPlatformChannelSearchResult>;
    registerChannel(user: IUser, mediaChannelId: string): Promise<void>;
    registerChannelForUser(userId: string, mediaChannelId: string): Promise<void>;
}
