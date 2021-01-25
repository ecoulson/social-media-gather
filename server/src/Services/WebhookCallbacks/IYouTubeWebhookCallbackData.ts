export default interface IYouTubeWebhookCallbackData {
    channelId: string;
    creatorId: string;
    feed: {
        entry: {
            "yt:videoid": string;
        };
    };
}
