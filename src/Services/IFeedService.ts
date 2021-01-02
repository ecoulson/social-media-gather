import IPost from "../Entities/Post/IPost";
import IUser from "../Entities/User/IUser";

export default interface IFeedService {
    getFeed(user: IUser): Promise<IPost[]>;
    getUsersPosts(userId: string): Promise<IPost[]>;
}
