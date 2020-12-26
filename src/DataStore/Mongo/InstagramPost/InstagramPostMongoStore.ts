import IInstagramPost from "../../../Entities/InstagramPost/IInstagramPost";
import IPostDocument from "../Models/Post/IPostDocument";
import PostModel from "../Models/Post/PostModel";
import MongoDataStore from "../MongoDataStore";
import InstagramPostEntityTransform from "./InstagramPostEntityTransform";
import InstagramPostUpdateQueryTransform from "./InstagramPostUpdateQueryTransform";

export default class InstagramPostMongoStore extends MongoDataStore<IPostDocument, IInstagramPost> {
    constructor() {
        super(PostModel, InstagramPostEntityTransform, InstagramPostUpdateQueryTransform);
    }
}
