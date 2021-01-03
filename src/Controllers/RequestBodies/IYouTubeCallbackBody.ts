export default interface IYouTubeCallbackBody {
    feed: {
        entry: {
            "yt:videoid": string;
        };
    };
}
