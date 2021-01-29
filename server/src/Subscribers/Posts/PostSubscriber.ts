import { inject, injectable } from "inversify";
import Types from "../../@Types/Types";
import IPost from "../../Entities/Post/IPost";
import IMessageQueue from "../../MessageQueue/IMessageQueue";
import Subscriber from "../../MessageQueue/Subscriber";
import Topic from "../../MessageQueue/Topic";
import MessageType from "../../Messages/MessageType";
import GetPostsMessage from "../../Messages/Posts/GetPostsMessage";
import PostMessage from "../../Messages/Posts/PostMessage";
import IPostsService from "../../Services/Posts/IPostsService";

@injectable()
export default class PostSubscriber extends Subscriber {
    constructor(
        @inject(Types.MessageQueue) messageQueue: IMessageQueue,
        @inject(Types.PostsService) private postsService: IPostsService
    ) {
        super(messageQueue);

        this.subscribe(Topic.Posts, MessageType.GetPosts, this.getPosts);
        this.subscribe(Topic.Posts, MessageType.UpdatePosts, this.updatePosts);
    }

    async getPosts(message: GetPostsMessage) {
        const posts = await this.postsService.getPosts(message.body().ids);
        this.publish(Topic.Posts, new PostMessage(posts, message));
    }

    async updatePosts(message: PostMessage) {
        const posts = await this.postsService.updatePosts(message.deserialize<IPost[]>());
        this.publish(Topic.Posts, new PostMessage(posts, message));
    }
}
