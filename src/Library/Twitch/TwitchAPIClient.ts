import ChannelClient from "./Channels/ChannelClient";
import GameClient from "./Games/GameClient";
import StreamClient from "./Streams/StreamClient";
import TokenClient from "./Tokens/TokenClient";
import VideosClient from "./Videos/VideosClient";
import WebhookClient from "./Webhooks/WebhookClient";

export default class TwitchAPIClient {
    private gameClient: GameClient;
    private tokenClient: TokenClient;
    private channelClient: ChannelClient;
    private streamClient: StreamClient;
    private videosClient: VideosClient;
    private webhookClient: WebhookClient;

    constructor(
        private _clientId: string,
        private _clientSecret: string,
        private _webhookBaseURL: string
    ) {
        this.gameClient = new GameClient(this);
        this.tokenClient = new TokenClient(this);
        this.channelClient = new ChannelClient(this);
        this.streamClient = new StreamClient(this);
        this.videosClient = new VideosClient(this);
        this.webhookClient = new WebhookClient(this);
    }

    public clientId(): string {
        return this._clientId;
    }

    public clientSecret(): string {
        return this._clientSecret;
    }

    public baseURL(): string {
        return this._webhookBaseURL;
    }

    get games(): GameClient {
        return this.gameClient;
    }

    get token(): TokenClient {
        return this.tokenClient;
    }

    get channels(): ChannelClient {
        return this.channelClient;
    }

    get stream(): StreamClient {
        return this.streamClient;
    }

    get videos(): VideosClient {
        return this.videosClient;
    }

    get webhooks(): WebhookClient {
        return this.webhookClient;
    }
}
