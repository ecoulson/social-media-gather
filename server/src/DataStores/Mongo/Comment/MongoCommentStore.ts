import IComment from "../../../Entities/Comment/IComment";
import CommentModel from "../../../Schemas/Mongo/Comment/CommentModel";
import ICommentDocument from "../../../Schemas/Mongo/Comment/ICommentDocument";
import MongoDataStore from "../MongoDataStore";
import CommentDocumentTransform from "./CommentDocumentTransform";
import CommentEntityTransform from "./CommentEntityTransform";

export default class MongoCommentStore extends MongoDataStore<ICommentDocument, IComment> {
    constructor() {
        super(CommentModel, CommentEntityTransform, CommentDocumentTransform);
    }
}
