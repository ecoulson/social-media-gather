import { Request, RequestHandler } from "express";
import { injectable } from "inversify";
import { httpGet, httpPut, queryParam, requestParam } from "inversify-express-utils";
import Types from "../@Types/Types";
import container from "../bootstrap";
import ChannelSearchResultMessage from "../Messages/MediaPlatforms/ChannelSearchResultMessage";
import SuccessMessage from "../Messages/Status/SuccessMessage";
import IMessageJSONSchema from "../Schemas/JSON/Message/IMessageJSONSchema";
import IMediaPlatformChannelService from "../Services/MediaChannel/IMediaChannelService";

const AuthenticationMiddleware = container.get<RequestHandler>(Types.RequiresAuthentication);

@injectable()
export default abstract class MediaPlatformChannelController {
    constructor(private mediaPlatformService: IMediaPlatformChannelService) {}

    @httpGet("/search")
    async searchForAccount(@queryParam("username") username: string): Promise<IMessageJSONSchema> {
        const results = await this.mediaPlatformService.searchPlatformForChannel(username);
        return new ChannelSearchResultMessage(results).toJson();
    }

    @httpPut("/link/:mediaChannelPlatformId", AuthenticationMiddleware)
    async linkAccountWithAuthenticatedUser(request: Request): Promise<IMessageJSONSchema> {
        this.mediaPlatformService.linkChannel(request.user(), request.params.mediaPlatformId);
        return new SuccessMessage().toJson();
    }

    @httpPut("/link/:mediaChannelPlatformId/with/:userId", AuthenticationMiddleware)
    async linksAccountWithUserId(
        @requestParam("mediaChannelPlatformId") mediaChannelPlatformId: string,
        @requestParam("userId") userId: string
    ): Promise<IMessageJSONSchema> {
        this.mediaPlatformService.linkChannelWithUserId(userId, mediaChannelPlatformId);
        return new SuccessMessage().toJson();
    }
}
