import xmlparser from "express-xml-bodyparser";
import { inject } from "inversify";
import { controller, httpGet, httpPost, queryParam, requestBody } from "inversify-express-utils";
import Types from "../@Types/Types";
import SuccessMessage from "../Messages/Status/SuccessMessage";
import IMessageJSONSchema from "../Schemas/JSON/Message/IMessageJSONSchema";
import IWebhookCallbackService from "../Services/WebhookCallbacks/IWebhookCallbackService";
import IYouTubeWebhookCallbackData from "../Services/WebhookCallbacks/IYouTubeWebhookCallbackData";
import IYouTubeCallbackBody from "./RequestBodies/IYouTubeCallbackBody";

@controller("/api/webhook/youtube/callback")
export default class YouTubeWebhookCallbackController {
    constructor(
        @inject(Types.YouTubeWebhookCallbackService)
        private youTubeWebhookCallbackService: IWebhookCallbackService<IYouTubeWebhookCallbackData>
    ) {}

    @httpGet("/")
    handleChallenge(@queryParam("hub.challenge") hubChallenge: string): string {
        return this.youTubeWebhookCallbackService.handleChallenge(hubChallenge);
    }

    @httpPost("/", xmlparser({ trim: false, explicitArray: false }))
    handleCallback(
        @queryParam("userId") userId: string,
        @requestBody() youTubeCallbackBody: IYouTubeCallbackBody
    ): IMessageJSONSchema {
        this.youTubeWebhookCallbackService.handleCallback({
            userId,
            feed: youTubeCallbackBody.feed
        });
        return new SuccessMessage().toJson();
    }
}
