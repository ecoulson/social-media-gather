import IPost from "../../Entities/Post/IPost";
import PostJSONSerializer from "../../Serializers/JSON/PostJSONSerializer";
import IPostsBody from "../Bodies/IPostsBody";
import MessageType from "../MessageType";
import { v4 as uuid } from "uuid";
import ResponseMessage from "../ResponseMessage";
import IMessage from "../IMessage";
import PostJSONDeserializer from "../../Serializers/JSON/PostJSONDeserializer";

export default class PostMessage extends ResponseMessage<IPostsBody> {
    constructor(posts: IPost[], originalMessage?: IMessage<unknown>) {
        super(
            uuid(),
            MessageType.Posts,
            {
                posts: posts.map((post) => PostJSONSerializer(post))
            },
            originalMessage
        );
    }

    deserialize<T>(): T {
        return (this.body().posts.map((postSchema) =>
            PostJSONDeserializer(postSchema)
        ) as unknown) as T;
    }
}
