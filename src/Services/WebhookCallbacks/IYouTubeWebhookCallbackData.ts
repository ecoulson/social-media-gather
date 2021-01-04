export default interface IYouTubeWebhookCallbackData {
    userId: string;
    feed: {
        entry: {
            "yt:videoid": string;
        };
    };
}
