import VideoClient from "./Videos/VideoClient";

export default class YouTubeAPIClient {
    private videoClient: VideoClient;

    constructor(private _apiKey: string) {
        this.videoClient = new VideoClient(this);
    }

    apiKey(): string {
        return this._apiKey;
    }

    get videos(): VideoClient {
        return this.videoClient;
    }
}
