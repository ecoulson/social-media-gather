import ITweet from "../../../Entities/Tweet/ITweet";
import IPostDocument from "../../../Schemas/Mongo/Post/IPostDocument";
import PostModel from "../../../Schemas/Mongo/Post/PostModel";
import MongoDataStore from "../MongoDataStore";
import TweetEntityTransform from "./TweetEntityTransform";
import TweetDocumentTransform from "./TweetUpdateQueryTransform";

export default class TweetMongoDataStore extends MongoDataStore<IPostDocument, ITweet> {
    constructor() {
        super(PostModel, TweetEntityTransform, TweetDocumentTransform);
    }
}
