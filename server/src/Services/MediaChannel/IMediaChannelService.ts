import IUser from "../../Entities/User/IUser";
import IMediaPlatformChannelSearchResult from "./IMediaPlatformChannelSearchResult";

export default interface IMediaPlatformChannelService {
    searchPlatformForChannel(username: string): Promise<IMediaPlatformChannelSearchResult>;
    linkChannel(user: IUser, mediaChannelId: string): Promise<void>;
    linkChannelWithUserId(userId: string, mediaChannelId: string): Promise<void>;
}
