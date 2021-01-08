export default interface IRegisterWebhookOptions {
    mode: "subscribe" | "unsubscribe";
    callback: string;
    verify: "async";
    topic: string;
}
