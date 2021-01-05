import { Request, RequestHandler } from "express";
import { inject } from "inversify";
import { controller, httpGet, httpPut, queryParam, requestParam } from "inversify-express-utils";
import Types from "../@Types/Types";
import container from "../bootstrap";
import ChannelSearchResultMessage from "../Messages/ChannelSearchResultMessage";
import IMessageStructure from "../Messages/IMessageStructure";
import SuccessMessage from "../Messages/SuccessMessage";
import IMediaPlatformChannelService from "../Services/MediaChannel/IMediaChannelService";

const AuthenticationMiddleware = container.get<RequestHandler>(Types.RequiresAuthentication);

@controller("/api/channel/instagram")
export default class InstagramChannelController {
    constructor(
        @inject(Types.InstagramChannelService)
        private instagramChannelService: IMediaPlatformChannelService
    ) {}

    @httpGet("/search")
    async searchForInstagramAccount(
        @queryParam("username") username: string
    ): Promise<IMessageStructure> {
        const results = await this.instagramChannelService.searchPlatformForChannel(username);
        return new ChannelSearchResultMessage(results).create();
    }

    @httpPut("/link/:instagramAccountId", AuthenticationMiddleware)
    async linkInstagramAccountWithAuthenticatedUser(request: Request): Promise<IMessageStructure> {
        this.instagramChannelService.registerChannel(
            request.userEntity(),
            request.params.instagramAccountId
        );
        return new SuccessMessage().create();
    }

    @httpPut("/link/:instagramAccountId/with/:userId", AuthenticationMiddleware)
    async linkInstagramAccountWithUser(
        @requestParam("instagramAccountId") instagramAccountId: string,
        @requestParam("userId") userId: string
    ): Promise<IMessageStructure> {
        this.instagramChannelService.registerChannelForUser(userId, instagramAccountId);
        return new SuccessMessage().create();
    }
}
