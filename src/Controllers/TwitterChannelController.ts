import { inject } from "inversify";
import { controller } from "inversify-express-utils";
import Types from "../@Types/Types";
import TwitterChannelService from "../Services/MediaChannel/Twitter/TwitterChannelService";
import MediaPlatformChannelController from "./MediaPlatformChannelController";

@controller("/api/channel/twitter")
export default class TwitterChannelController extends MediaPlatformChannelController {
    constructor(@inject(Types.TwitterChannelService) twitterChannelService: TwitterChannelService) {
        super(twitterChannelService);
    }
}
