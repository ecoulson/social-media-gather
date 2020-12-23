import ITwitchVideo from "../../../Entities/TwitchVideo/ITwitchVideo";
import IPostDocument from "../Models/Post/IPostDocument";
import PostModel from "../Models/Post/PostModel";
import MongoDataStore from "../MongoDataStore";
import TwitchVideoEntityTransform from "./TwitchVideoEntityTransform";
import TwitchVideoUpdateQueryTransform from "./TwitchVideoUpdateQueryTransform";

export default class TwitchVideoMongoDataStore extends MongoDataStore<IPostDocument, ITwitchVideo> {
    constructor() {
        super(PostModel, TwitchVideoEntityTransform, TwitchVideoUpdateQueryTransform);
    }
}