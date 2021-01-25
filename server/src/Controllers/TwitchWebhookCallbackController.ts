import { inject } from "inversify";
import { controller, httpGet, httpPost, queryParam, requestBody } from "inversify-express-utils";
import Types from "../@Types/Types";
import SuccessMessage from "../Messages/Status/SuccessMessage";
import IMessageJSONSchema from "../Schemas/JSON/Message/IMessageJSONSchema";
import ITwitchWebhookCallbackData from "../Services/WebhookCallbacks/ITwitchWebhookCallbackData";
import IWebhookCallbackService from "../Services/WebhookCallbacks/IWebhookCallbackService";
import ITwitchCallbackBody from "./RequestBodies/ITwitchCallbackBody";

@controller("/api/webhook/twitch/callback")
export default class TwitchWebhookCallbackController {
    constructor(
        @inject(Types.TwitchWebhookCallbackService)
        private twitchWebhookCallbackService: IWebhookCallbackService<ITwitchWebhookCallbackData>
    ) {}

    @httpGet("/")
    handleChallenge(@queryParam("hub.challenge") hubChallenge: string): string {
        return this.twitchWebhookCallbackService.handleChallenge(hubChallenge);
    }

    @httpPost("/")
    handleCallback(
        @queryParam("channelId") channelId: string,
        @requestBody() twitchCallbackData: ITwitchCallbackBody
    ): IMessageJSONSchema {
        this.twitchWebhookCallbackService.handleCallback({
            channelId: channelId,
            streams: twitchCallbackData.data
        });
        return new SuccessMessage().toJson();
    }
}
