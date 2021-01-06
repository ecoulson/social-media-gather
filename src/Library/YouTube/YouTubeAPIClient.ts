import { google, youtube_v3 } from "googleapis";
import YouTubeChannelClient from "./Channels/YouTubeChannelClient";
import VideoClient from "./Videos/VideoClient";

export default class YouTubeAPIClient {
    private videoClient: VideoClient;
    private channelClient: YouTubeChannelClient;
    private youtubeAPIService: youtube_v3.Youtube;

    constructor(private _apiKey: string) {
        this.videoClient = new VideoClient(this);
        this.channelClient = new YouTubeChannelClient(this);
        this.youtubeAPIService = google.youtube("v3");
    }

    apiKey(): string {
        return this._apiKey;
    }

    service(): youtube_v3.Youtube {
        return this.youtubeAPIService;
    }

    get videos(): VideoClient {
        return this.videoClient;
    }

    get channels(): YouTubeChannelClient {
        return this.channelClient;
    }
}
