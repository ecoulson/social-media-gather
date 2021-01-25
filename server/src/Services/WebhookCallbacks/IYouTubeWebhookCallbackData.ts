export default interface IYouTubeWebhookCallbackData {
    channelId: string;
    feed: {
        entry: {
            "yt:videoid": string;
        };
    };
}
