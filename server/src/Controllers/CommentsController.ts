import { controller, httpGet, queryParam, requestParam } from "inversify-express-utils";
import Platform from "../Entities/Platform/Platform";
import Subscriber from "../MessageQueue/Subscriber";
import Topic from "../MessageQueue/Topic";
import ICommentsBody from "../Messages/Bodies/ICommentsBody";
import GetCommentsMessage from "../Messages/Comments/GetCommentsMessage";
import MessageType from "../Messages/MessageType";
import ErrorMessage from "../Messages/Status/ErrorMessage";

@controller("/api/comments")
export default class CommentsController extends Subscriber {
    @httpGet("/:platform/:postId")
    async getYouTubeComments(
        @queryParam("offset") offset: string,
        @requestParam("postId") postId: string,
        @requestParam("platform") platform: string
    ) {
        switch (platform) {
            case "youtube":
                return this.getComments(Platform.YOUTUBE, postId, offset);
            case "instagram":
                return this.getComments(Platform.INSTAGRAM, postId, offset);
            case "twitter":
                return this.getComments(Platform.TWITTER, postId, offset);
            default:
                return new ErrorMessage(new Error(`Unrecognized platform ${platform}`)).toJson();
        }
    }

    private async getComments(platform: Platform, postId: string, offset: string) {
        return (
            await this.query<ICommentsBody>(
                Topic.Comments,
                MessageType.Comments,
                new GetCommentsMessage(platform, postId, parseInt(offset))
            )
        ).toJson();
    }
}
