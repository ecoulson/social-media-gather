import { inject } from "inversify";
import { controller, httpGet, httpPost, queryParam, requestBody } from "inversify-express-utils";
import Types from "../@Types/Types";
import IMessageStructure from "../Messages/IMessageStructure";
import SuccessMessage from "../Messages/SuccessMessage";
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
        @queryParam("user_id") userId: string,
        @requestBody() twitchCallbackData: ITwitchCallbackBody
    ): IMessageStructure {
        this.twitchWebhookCallbackService.handleCallback({
            userId,
            streams: twitchCallbackData.data
        });
        return new SuccessMessage().create();
    }
}
