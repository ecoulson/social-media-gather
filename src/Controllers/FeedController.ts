import { Request, RequestHandler } from "express";
import { inject } from "inversify";
import { controller, httpGet, requestParam } from "inversify-express-utils";
import Types from "../@Types/Types";
import container from "../bootstrap";
import FeedMessage from "../Messages/FeedMessage";
import IMessageStructure from "../Messages/IMessageStructure";
import IFeedService from "../Services/IFeedService";

const AuthenticationMiddleware = container.get<RequestHandler>(Types.RequiresAuthentication);

@controller("/api/feed")
export default class FeedController {
    constructor(@inject(Types.FeedService) private feedService: IFeedService) {}

    @httpGet("/", AuthenticationMiddleware)
    async getFeedForUser(request: Request): Promise<IMessageStructure> {
        const feed = await this.feedService.getFeed(request.userEntity());
        return new FeedMessage(feed).create();
    }

    @httpGet("/:userId")
    async getUsersFeed(@requestParam("userId") userId: string): Promise<IMessageStructure> {
        const usersPosts = await this.feedService.getUsersPosts(userId);
        return new FeedMessage(usersPosts).create();
    }
}
