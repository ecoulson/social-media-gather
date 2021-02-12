import { inject, injectable, tagged } from "inversify";
import Tags from "../../@Types/Tags";
import Types from "../../@Types/Types";
import IPost from "../../Entities/Post/IPost";
import PostRepository from "../../Repositories/Post/PostRepository";
import IPostsService from "./IPostsService";

@injectable()
export default class PostsService implements IPostsService {
    constructor(
        @inject(Types.PostRepository)
        @tagged(Tags.MONGO, true)
        private postRepository: InstanceType<typeof PostRepository>
    ) {}

    getPost(postId: string): Promise<IPost> {
        return this.postRepository.findById(postId);
    }

    getPosts(postIds: string[]): Promise<IPost[]> {
        return this.postRepository.find({
            where: {
                _id: {
                    $in: postIds
                }
            }
        });
    }

    updatePosts(posts: IPost[]): Promise<IPost[]> {
        return this.postRepository.updateAll(posts);
    }
}
