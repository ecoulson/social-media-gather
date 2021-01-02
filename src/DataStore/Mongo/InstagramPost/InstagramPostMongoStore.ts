import IInstagramPost from "../../../Entities/InstagramPost/IInstagramPost";
import IPostDocument from "../../../Schemas/Mongo/Post/IPostDocument";
import PostModel from "../../../Schemas/Mongo/Post/PostModel";
import MongoDataStore from "../MongoDataStore";
import InstagramPostEntityTransform from "./InstagramPostEntityTransform";
import InstagramPostDocumentTransform from "./InstagramPostDocumentTransform";

export default class InstagramPostMongoStore extends MongoDataStore<IPostDocument, IInstagramPost> {
    constructor() {
        super(PostModel, InstagramPostEntityTransform, InstagramPostDocumentTransform);
    }
}
