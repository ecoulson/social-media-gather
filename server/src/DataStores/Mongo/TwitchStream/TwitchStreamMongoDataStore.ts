import ITwitchStream from "../../../Entities/TwitchStream/ITwitchStream";
import IPostDocument from "../../../Schemas/Mongo/Post/IPostDocument";
import Post from "../../../Schemas/Mongo/Post/PostModel";
import MongoDataStore from "../MongoDataStore";
import TwitchStreamEntityTransform from "./TwitchStreamEntityTransform";
import TwitchStreamDocumentTransform from "./TwitchStreamDocumentTransform";

export default class TwitchStreamMongoDataStore extends MongoDataStore<
    IPostDocument,
    ITwitchStream
> {
    constructor() {
        super(Post, TwitchStreamEntityTransform, TwitchStreamDocumentTransform);
    }
}
