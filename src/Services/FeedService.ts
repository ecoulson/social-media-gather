import { inject, injectable, tagged } from "inversify";
import Tags from "../@Types/Tags";
import Types from "../@Types/Types";
import IPost from "../Entities/Post/IPost";
import IUser from "../Entities/User/IUser";
import PostRepository from "../Repositories/Post/PostRepository";
import UserRepository from "../Repositories/User/UserRepository";
import IFeedService from "./IFeedService";

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

    async getFeed(user: IUser): Promise<IPost[]> {
        return await this.postRepository.find({
            query: {
                userId: {
                    $in: user.following()
                }
            }
        });
    }

    async getUsersPosts(userId: string): Promise<IPost[]> {
        const userToGetPostsFor = await this.userRepository.findById(userId);
        return await this.postRepository.find({
            query: {
                userId: userToGetPostsFor.id()
            }
        });
    }
}
