import { Request, RequestHandler } from "express";
import { injectable } from "inversify";
import { httpGet, httpPut, queryParam, requestParam } from "inversify-express-utils";
import Types from "../@Types/Types";
import container from "../bootstrap";
import ChannelSearchResultMessage from "../Messages/ChannelSearchResultMessage";
import IMessageStructure from "../Messages/IMessageStructure";
import SuccessMessage from "../Messages/SuccessMessage";
import IMediaPlatformChannelService from "../Services/MediaChannel/IMediaChannelService";

const AuthenticationMiddleware = container.get<RequestHandler>(Types.RequiresAuthentication);

@injectable()
export default abstract class MediaPlatformChannelController {
    constructor(private mediaPlatformService: IMediaPlatformChannelService) {}

    @httpGet("/search")
    async searchForAccount(@queryParam("username") username: string): Promise<IMessageStructure> {
        const results = await this.mediaPlatformService.searchPlatformForChannel(username);
        return new ChannelSearchResultMessage(results).create();
    }

    @httpPut("/link/:instagramAccountId", AuthenticationMiddleware)
    async linkAccountWithAuthenticatedUser(request: Request): Promise<IMessageStructure> {
        this.mediaPlatformService.linkChannel(
            request.userEntity(),
            request.params.instagramAccountId
        );
        return new SuccessMessage().create();
    }

    @httpPut("/link/:instagramAccountId/with/:userId", AuthenticationMiddleware)
    async linksAccountWithUserId(
        @requestParam("instagramAccountId") instagramAccountId: string,
        @requestParam("userId") userId: string
    ): Promise<IMessageStructure> {
        this.mediaPlatformService.linkChannelWithUserId(userId, instagramAccountId);
        return new SuccessMessage().create();
    }
}
