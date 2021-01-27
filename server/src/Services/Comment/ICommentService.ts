import IComment from "../../Entities/Comment/IComment";

export default interface ICommentService {
    getComments(offset: number): Promise<IComment[]>;
    loadCommentsFromMedia(postId: string): Promise<IComment[]>;
}
