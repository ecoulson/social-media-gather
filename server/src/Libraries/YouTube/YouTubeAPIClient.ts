import { google, youtube_v3 } from "googleapis";
import IConfig from "../../Config/IConfig";
import YouTubeChannelClient from "./Channels/YouTubeChannelClient";
import PlaylistClient from "./Playlist/PlaylistClient";
import VideoClient from "./Videos/VideoClient";
import WebhookClient from "./Webhooks/WebhookClient";

export default class YouTubeAPIClient {
    private videoClient: VideoClient;
    private channelClient: YouTubeChannelClient;
    private playlistClient: PlaylistClient;
    private webhookClient: WebhookClient;
    private youtubeAPIService: youtube_v3.Youtube;

    constructor(private config: IConfig) {
        this.videoClient = new VideoClient(this);
        this.channelClient = new YouTubeChannelClient(this);
        this.playlistClient = new PlaylistClient(this);
        this.webhookClient = new WebhookClient();
        this.youtubeAPIService = google.youtube("v3");
    }

    apiKey(): Promise<string> {
        return this.config.getValue("YOUTUBE_API_KEY");
    }

    baseUrl(): Promise<string> {
        return this.config.getValue("BASE_URL");
    }

    get service(): youtube_v3.Youtube {
        return this.youtubeAPIService;
    }

    get videos(): VideoClient {
        return this.videoClient;
    }

    get playlist(): PlaylistClient {
        return this.playlistClient;
    }

    get channels(): YouTubeChannelClient {
        return this.channelClient;
    }

    get webhooks(): WebhookClient {
        return this.webhookClient;
    }
}
