import IYouTubeVideo from "../../../Entities/YouTubeVideo/IYouTubeVideo";
import IPostDocument from "../../../Schemas/Mongo/Post/IPostDocument";
import PostModel from "../../../Schemas/Mongo/Post/PostModel";
import MongoDataStore from "../MongoDataStore";
import YouTubeVideoEntityTransform from "./YouTubeVideoEntityTransform";
import YouTubeVideoDocumentTransform from "./YouTubeVideoDocumentTransform";

export default class YouTubeVideoMongoDataStore extends MongoDataStore<
    IPostDocument,
    IYouTubeVideo
> {
    constructor() {
        super(PostModel, YouTubeVideoEntityTransform, YouTubeVideoDocumentTransform);
    }
}
