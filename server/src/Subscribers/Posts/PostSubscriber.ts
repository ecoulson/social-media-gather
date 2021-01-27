import { inject, injectable } from "inversify";
import Types from "../../@Types/Types";
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
    }

    async getPosts(message: GetPostsMessage) {
        const posts = await this.postsService.getPosts(message.data().ids);
        this.publish(Topic.Posts, new PostMessage(posts, message));
    }
}
