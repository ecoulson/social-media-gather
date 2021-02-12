import { Transformer } from "../../@Types";
import IPost from "../../Entities/Post/IPost";
import PostType from "../../Entities/Post/PostType";
import IPostJSONSchema from "../../Schemas/JSON/Post/IPostJSONSchema";
import InstagramPostJSONDeserializer from "./InstagramPostJSONDeserializer";
import TweetJSONDeserializer from "./TweetJSONDeserializer";
import YouTubeVideoJSONDeserializer from "./YouTubeVideoJSONDeserializer";

const PostJSONDeserializer: Transformer<IPostJSONSchema, IPost> = (schema) => {
    switch (schema.type) {
        case PostType.YOUTUBE_VIDEO:
            return YouTubeVideoJSONDeserializer(schema);
        case PostType.INSTAGRAM_POST:
            return InstagramPostJSONDeserializer(schema);
        case PostType.TWEET:
            return TweetJSONDeserializer(schema);
        default:
            throw new Error("Unrecognized post to deserialize");
    }
};

export default PostJSONDeserializer;
