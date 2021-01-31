import { controller, httpGet, queryParam, requestParam } from "inversify-express-utils";
import Platform from "../Entities/Platform/Platform";
import Subscriber from "../MessageQueue/Subscriber";
import Topic from "../MessageQueue/Topic";
import ICommentsBody from "../Messages/Bodies/ICommentsBody";
import GetCommentsMessage from "../Messages/Comments/GetCommentsMessage";
import MessageType from "../Messages/MessageType";

@controller("/api/comments")
export default class CommentsController extends Subscriber {
    @httpGet("/youtube/:postId")
    async getYouTubeComments(
        @queryParam("offset") offset: string,
        @requestParam("postId") postId: string
    ) {
        return (
            await this.query<ICommentsBody>(
                Topic.Comments,
                MessageType.Comments,
                new GetCommentsMessage(Platform.YOUTUBE, postId, parseInt(offset))
            )
        ).toJson();
    }

    @httpGet("/instagram/:postId")
    async getInstagramComments(
        @queryParam("offset") offset: string,
        @requestParam("postId") postId: string
    ) {
        return (
            await this.query<ICommentsBody>(
                Topic.Comments,
                MessageType.Comments,
                new GetCommentsMessage(Platform.INSTAGRAM, postId, parseInt(offset))
            )
        ).toJson();
    }
}
