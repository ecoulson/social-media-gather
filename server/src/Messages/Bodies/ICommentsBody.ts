import ICommentJSONSchema from "../../Schemas/JSON/Comments/ICommentJSONSchema";

export default interface ICommentsBody {
    comments: ICommentJSONSchema[];
}
