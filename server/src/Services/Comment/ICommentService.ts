import IComment from "../../Entities/Comment/IComment";

export default interface ICommentService {
    getComments(postId: string, offset: number): Promise<IComment[]>;
    loadCommentsFromMedia(postId: string): Promise<IComment[]>;
}
