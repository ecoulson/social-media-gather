import { injectable } from "inversify";
import IPost from "../../../Entities/Post/IPost";
import IPostDocument from "../../../Schemas/Mongo/Post/IPostDocument";
import PostModel from "../../../Schemas/Mongo/Post/PostModel";
import MongoDataStore from "../MongoDataStore";
import PostDocumentTransform from "./PostDocumentTransform";
import PostEntityTransform from "./PostEntityTransform";

@injectable()
export default class PostMongoDataStore extends MongoDataStore<IPostDocument, IPost> {
    constructor() {
        super(PostModel, PostEntityTransform, PostDocumentTransform);
    }
}
