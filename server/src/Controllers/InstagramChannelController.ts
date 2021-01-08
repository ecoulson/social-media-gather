import { Request, RequestHandler } from "express";
import { inject } from "inversify";
import { controller } from "inversify-express-utils";
import Types from "../@Types/Types";
import IMediaPlatformChannelService from "../Services/MediaChannel/IMediaChannelService";
import MediaPlatformChannelController from "./MediaPlatformChannelController";

@controller("/api/channel/instagram")
export default class InstagramChannelController extends MediaPlatformChannelController {
    constructor(
        @inject(Types.InstagramChannelService)
        instagramChannelService: IMediaPlatformChannelService
    ) {
        super(instagramChannelService);
    }
}
