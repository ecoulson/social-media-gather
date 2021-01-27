import IPost from "../../Entities/Post/IPost";

export default interface IPostsService {
    getPost(postId: string): Promise<IPost>;
    getPosts(postIds: string[]): Promise<IPost[]>;
}
