import { inject } from "inversify";
import { controller } from "inversify-express-utils";
import Types from "../@Types/Types";
import IMediaPlatformChannelService from "../Services/MediaChannel/IMediaChannelService";
import MediaPlatformChannelController from "./MediaPlatformChannelController";

@controller("/api/channel/twitch")
export default class TwitchChannelController extends MediaPlatformChannelController {
    constructor(
        @inject(Types.TwitchChannelService) twitchChannelService: IMediaPlatformChannelService
    ) {
        super(twitchChannelService);
    }
}
