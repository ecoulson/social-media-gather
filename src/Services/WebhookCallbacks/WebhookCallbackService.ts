import { injectable } from "inversify";
import IWebhookCallbackService from "./IWebhookCallbackService";

@injectable()
export default abstract class WebhookCallbackService<T> implements IWebhookCallbackService<T> {
    handleChallenge(challenge: string): string {
        return challenge;
    }

    abstract handleCallback(callbackData: T): Promise<void>;
}
