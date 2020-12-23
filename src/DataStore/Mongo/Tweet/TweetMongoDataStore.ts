import ITweet from "../../../Entities/Tweet/ITweet";
import IPostDocument from "../Models/Post/IPostDocument";
import PostModel from "../Models/Post/PostModel";
import MongoDataStore from "../MongoDataStore";
import TweetEntityTransform from "./TweetEntityTransform";
import TweetUpdateQueryTransform from "./TweetUpdateQueryTransform";

export default class TweetMongoDataStore extends MongoDataStore<IPostDocument, ITweet> {
    constructor() {
        super(PostModel, TweetEntityTransform, TweetUpdateQueryTransform)
    }
}