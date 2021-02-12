import IPostsBody from "../Bodies/IPostsBody";
import ResponseMessage from "../ResponseMessage";
import { v4 as uuid } from "uuid";
import MessageType from "../MessageType";
import IPost from "../../Entities/Post/IPost";
import IMessage from "../IMessage";
import PostJSONSerializer from "../../Serializers/JSON/PostJSONSerializer";
import PostJSONDeserializer from "../../Serializers/JSON/PostJSONDeserializer";

export default class UpdatePostsMessage extends ResponseMessage<IPostsBody> {
    constructor(posts: IPost[], originalMessage?: IMessage<unknown>) {
        super(
            uuid(),
            MessageType.UpdatePosts,
            {
                posts: posts.map((post) => PostJSONSerializer(post))
            },
            originalMessage
        );
    }

    deserialize<T>(): T {
        return (this.body().posts.map((post) => PostJSONDeserializer(post)) as unknown) as T;
    }
}
