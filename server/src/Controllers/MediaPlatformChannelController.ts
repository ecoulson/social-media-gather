import { injectable } from "inversify";
import { httpGet, queryParam } from "inversify-express-utils";
import ChannelSearchResultMessage from "../Messages/MediaPlatforms/ChannelSearchResultMessage";
import IMessageJSONSchema from "../Schemas/JSON/Message/IMessageJSONSchema";
import IMediaPlatformService from "../Services/MediaChannel/IMediaPlatformService";

@injectable()
export default abstract class MediaPlatformChannelController {
    constructor(private mediaPlatformService: IMediaPlatformService) {}

    @httpGet("/search")
    async searchForAccount(@queryParam("username") username: string): Promise<IMessageJSONSchema> {
        const results = await this.mediaPlatformService.searchPlatformForChannel(username);
        return new ChannelSearchResultMessage(results).toJson();
    }
}
