import IComment from "../../Entities/Comment/IComment";

export default interface ICreateCommentService {
    createComment(): Promise<IComment>;
}
