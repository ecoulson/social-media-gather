import { Transformer } from "../@Types";
import IPost from "../Entities/Post/IPost";
import { IPostJSONSchema } from "../Schemas/JSON/IPostJSONSchema";

const PostJSONSerializer: Transformer<IPost, IPostJSONSchema> = (postEntity) => {
    return {
        id: postEntity.id(),
        type: postEntity.type()
    };
};

export default PostJSONSerializer;
