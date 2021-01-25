import IPost from "../../Entities/Post/IPost";
import IUser from "../../Entities/User/IUser";

export default interface IFeedService {
    getUsersFeed(user: IUser, postOffset: number): Promise<IPost[]>;
    getCreatorsPosts(creatorId: string, postOffset: number): Promise<IPost[]>;
}
