import { inject } from "inversify";
import { controller } from "inversify-express-utils";
import Types from "../@Types/Types";
import YouTubeChannelService from "../Services/MediaChannel/YouTube/YouTubeChannelService";
import MediaPlatformChannelController from "./MediaPlatformChannelController";

@controller("/api/channel/youtube")
export default class YouTubeChannelController extends MediaPlatformChannelController {
    constructor(@inject(Types.YouTubeChannelService) youTubeChannelService: YouTubeChannelService) {
        super(youTubeChannelService);
    }
}
