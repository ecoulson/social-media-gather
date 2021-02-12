import { inject } from "inversify";
import { controller } from "inversify-express-utils";
import Types from "../@Types/Types";
import IMediaPlatformService from "../Services/MediaChannel/IMediaPlatformService";
import MediaPlatformChannelController from "./MediaPlatformChannelController";

@controller("/api/channel/twitch")
export default class TwitchChannelController extends MediaPlatformChannelController {
    constructor(
        @inject(Types.TwitchChannelService) twitchChannelService: IMediaPlatformService
    ) {
        super(twitchChannelService);
    }
}
