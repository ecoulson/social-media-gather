import IPost from "../../Entities/Post/IPost";
import PostJSONSerializer from "../../Serializers/PostJSONSerializer";
import IPostsBody from "../Bodies/IPostsBody";
import Message from "../Message";
import MessageType from "../MessageType";
import MetaData from "../MetaData";
import { v4 as uuid } from "uuid";

export default class PostMessage extends Message<IPostsBody> {
    constructor(posts: IPost[]) {
        super(new MetaData(uuid(), true, MessageType.PostsMessage), {
            posts: posts.map((post) => PostJSONSerializer(post))
        });
    }
}
