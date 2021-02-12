import Platform from "../../Entities/Platform/Platform";

export default interface ICreateCommentBody {
    postId: string;
    platform: Platform;
}
