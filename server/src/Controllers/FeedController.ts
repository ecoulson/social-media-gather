import { Request, RequestHandler } from "express";
import { inject } from "inversify";
import { controller, httpGet, queryParam, requestParam } from "inversify-express-utils";
import Types from "../@Types/Types";
import container from "../bootstrap";
import FeedMessage from "../Messages/FeedMessage";
import IMessageStructure from "../Messages/IMessageStructure";
import IFeedService from "../Services/Feed/IFeedService";

const AuthenticationMiddleware = container.get<RequestHandler>(Types.RequiresAuthentication);

@controller("/api/feed")
export default class FeedController {
    constructor(@inject(Types.FeedService) private feedService: IFeedService) {}

    @httpGet("/", AuthenticationMiddleware)
    async getUsersFeed(request: Request): Promise<IMessageStructure> {
        const feed = await this.feedService.getUsersFeed(
            request.userEntity(),
            parseInt(request.query.offset as string)
        );
        return new FeedMessage(feed).create();
    }

    @httpGet("/:userId")
    async getUsersPosts(
        @requestParam("userId") userId: string,
        @queryParam("offset") offset: string
    ): Promise<IMessageStructure> {
        const usersPosts = await this.feedService.getUsersPosts(userId, parseInt(offset));
        return new FeedMessage(usersPosts).create();
    }
}
