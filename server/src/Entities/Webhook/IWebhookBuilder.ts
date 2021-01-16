import IWebhook from "./IWebhook";

export default interface IWebhookBuilder {
    build(): IWebhook;
}
