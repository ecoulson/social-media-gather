export default interface IRegisterWebhookOptions {
    callbackURL: string;
    mode: "subscribe" | "unsubscribe";
    topicURL: string;
    leaseSeconds: number;
    secret?: string;
}
