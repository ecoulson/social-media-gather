import ITwitchVideo from "../../../Entities/TwitchVideo/ITwitchVideo";
import IPostDocument from "../../../Schemas/Mongo/Post/IPostDocument";
import PostModel from "../../../Schemas/Mongo/Post/PostModel";
import MongoDataStore from "../MongoDataStore";
import TwitchVideoEntityTransform from "./TwitchVideoEntityTransform";
import TwitchVideoDocumentTransform from "./TwitchVideoDocumentTransform";

export default class TwitchVideoMongoDataStore extends MongoDataStore<IPostDocument, ITwitchVideo> {
    constructor() {
        super(PostModel, TwitchVideoEntityTransform, TwitchVideoDocumentTransform);
    }
}
