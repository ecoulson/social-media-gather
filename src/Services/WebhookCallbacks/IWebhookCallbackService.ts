export default interface IWebhookCallbackService<T> {
    handleChallenge(challenge: string): string;
    handleCallback(callbackData: T): Promise<void>;
}
