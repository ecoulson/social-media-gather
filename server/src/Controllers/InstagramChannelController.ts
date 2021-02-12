import { Request, RequestHandler } from "express";
import { inject } from "inversify";
import { controller } from "inversify-express-utils";
import Types from "../@Types/Types";
import IMediaPlatformService from "../Services/MediaChannel/IMediaPlatformService";
import MediaPlatformChannelController from "./MediaPlatformChannelController";

@controller("/api/channel/instagram")
export default class InstagramChannelController extends MediaPlatformChannelController {
    constructor(
        @inject(Types.InstagramChannelService)
        instagramChannelService: IMediaPlatformService
    ) {
        super(instagramChannelService);
    }
}
