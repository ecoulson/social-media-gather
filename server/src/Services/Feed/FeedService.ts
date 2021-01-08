import { inject, injectable, tagged } from "inversify";
import Tags from "../../@Types/Tags";
import Types from "../../@Types/Types";
import IPost from "../../Entities/Post/IPost";
import IUser from "../../Entities/User/IUser";
import PostRepository from "../../Repositories/Post/PostRepository";
import UserRepository from "../../Repositories/User/UserRepository";
import IFeedService from "./IFeedService";
const BATCH_SIZE = 20;

@injectable()
export default class FeedService implements IFeedService {
    constructor(
        @inject(Types.PostRepository)
        @tagged(Tags.MONGO, true)
        private postRepository: InstanceType<typeof PostRepository>,
        @inject(Types.UserRepository)
        @tagged(Tags.MONGO, true)
        private userRepository: InstanceType<typeof UserRepository>
    ) {}

    async getUsersFeed(user: IUser, postOffset: number): Promise<IPost[]> {
        return await this.postRepository.find({
            where: {
                userId: {
                    $in: user.following()
                }
            },
            limit: BATCH_SIZE,
            skip: postOffset,
            sort: { timeCreated: -1 }
        });
    }

    async getUsersPosts(userId: string, postOffset: number): Promise<IPost[]> {
        const userToGetPostsFor = await this.userRepository.findById(userId);
        return await this.postRepository.find({
            where: {
                userId: userToGetPostsFor.id()
            },
            limit: BATCH_SIZE,
            skip: postOffset,
            sort: { timeCreated: -1 }
        });
    }
}
