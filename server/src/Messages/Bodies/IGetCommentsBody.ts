import Platform from "../../Entities/Platform/Platform";

export default interface IGetCommentsBody {
    postId: string;
    offset: number;
    platform: Platform;
}
