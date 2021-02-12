import IPostJSONSchema from "../../Schemas/JSON/Post/IPostJSONSchema";

export default interface IPostsBody {
    posts: IPostJSONSchema[];
}
