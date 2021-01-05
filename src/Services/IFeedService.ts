import IPost from "../Entities/Post/IPost";
import IUser from "../Entities/User/IUser";

export default interface IFeedService {
    getUsersFeed(user: IUser, postOffset: number): Promise<IPost[]>;
    getUsersPosts(userId: string, postOffset: number): Promise<IPost[]>;
}
