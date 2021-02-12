import { Request, RequestHandler } from "express";
import { inject } from "inversify";
import { controller, httpGet, queryParam, requestParam } from "inversify-express-utils";
import Types from "../@Types/Types";
import container from "../bootstrap";
import PostMessage from "../Messages/Posts/PostMessage";
import IMessageJSONSchema from "../Schemas/JSON/Message/IMessageJSONSchema";
import IFeedService from "../Services/Feed/IFeedService";

const AuthenticationMiddleware = container.get<RequestHandler>(Types.RequiresAuthentication);

@controller("/api/feed")
export default class FeedController {
    constructor(@inject(Types.FeedService) private feedService: IFeedService) {}

    @httpGet("/", AuthenticationMiddleware)
    async getUsersFeed(request: Request): Promise<IMessageJSONSchema> {
        const feed = await this.feedService.getUsersFeed(
            request.user(),
            parseInt(request.query.offset as string)
        );
        return new PostMessage(feed).toJson();
    }

    @httpGet("/:userId")
    async getUsersPosts(
        @requestParam("userId") userId: string,
        @queryParam("offset") offset: string
    ): Promise<IMessageJSONSchema> {
        const usersPosts = await this.feedService.getCreatorsPosts(userId, parseInt(offset));
        return new PostMessage(usersPosts).toJson();
    }
}
