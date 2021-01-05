import IPost from "../Entities/Post/IPost";
import PostJSONSerializer from "../Serializer/PostJSONSerializer";
import IMessage from "./IMessage";
import IMessageStructure from "./IMessageStructure";
import MessageType from "./MessageType";

export default class FeedMessage implements IMessage {
    constructor(private posts: IPost[]) {}

    create(): IMessageStructure {
        return {
            metadata: {
                success: true,
                type: MessageType.FeedMessage
            },
            data: {
                posts: this.posts.map((post) => PostJSONSerializer(post))
            }
        };
    }
}
